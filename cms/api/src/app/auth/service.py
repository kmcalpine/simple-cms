from hmac import compare_digest
from typing import Annotated, Optional

from app.config import CSRF_PROTECT, JWT_SECRET
from app.exceptions import CSRFError
from fastapi import Cookie, Depends, Header, Response
from fastapi.exceptions import HTTPException
from jose import JWTError, jwt
from starlette.requests import Request
from starlette.status import HTTP_401_UNAUTHORIZED

from .models import User, UserBase, UserRegister


def get_by_email(*, db_session, email: str):
    return db_session.query(User).filter(User.email == email).first()


def create(*, db_session, user_in: UserRegister) -> User:
    password = bytes(user_in.password, "utf-8")

    user = User(**user_in.dict(exclude={"password"}), password=password)

    db_session.add(user)
    db_session.commit()
    return user


def get(*, db_session, user_in: UserBase) -> User:
    user = get_by_email(db_session=db_session, email=user_in.email)
    return user


def decode_token(*, access_token: str, csrf_token: Optional[str] = None):
    try:
        data = jwt.decode(access_token, JWT_SECRET, algorithms=["HS256"])
    except JWTError as e:
        raise HTTPException(
            status_code=HTTP_401_UNAUTHORIZED, detail=[{"msg": str(e)}]
        ) from None

    if csrf_token:
        if "csrf_token" not in data:
            raise CSRFError("Missing CSRF token")
        if not compare_digest(data["csrf_token"], csrf_token):
            raise CSRFError("CSRF double submit tokens do not match")

    return data


def get_encoded_token(
    mld_at: Annotated[str | None, Cookie()] = None,
    csrf_token: Annotated[str | None, Header(convert_underscores=False)] = None,
):
    if CSRF_PROTECT:
        if not csrf_token:
            raise CSRFError("Missing CSRF token")

    return {"access_token": mld_at, "csrf_token": csrf_token}


EncodedToken = Annotated[dict, Depends(get_encoded_token)]


def get_current_user(
    request: Request,
    encoded_token: EncodedToken,
) -> User:
    data = decode_token(
        access_token=encoded_token["access_token"],
        csrf_token=encoded_token["csrf_token"],
    )
    return get(db_session=request.state.db, user_in=UserBase(email=data["email"]))


CurrentUser = Annotated[User, Depends(get_current_user)]


def get_csrf_token(access_token):
    data = decode_token(access_token=access_token)
    return data["csrf_token"]


def set_access_cookies(response: Response, access_token):
    response.set_cookie(key="mld_at", value=access_token, httponly=True, secure=True)

    if CSRF_PROTECT:
        response.set_cookie(
            key="csrf_token",
            value=get_csrf_token(access_token),
            httponly=False,
            secure=True,
        )
