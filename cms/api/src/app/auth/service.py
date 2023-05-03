from typing import Annotated, Optional

from app.config import JWT_SECRET
from fastapi import Depends, Header
from fastapi.exceptions import HTTPException
from fastapi.security.utils import get_authorization_scheme_param
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


def decode_token(*, access_token: str):
    try:
        data = jwt.decode(access_token, JWT_SECRET, algorithms=["HS256"])
    except JWTError as e:
        raise HTTPException(
            status_code=HTTP_401_UNAUTHORIZED, detail=[{"msg": str(e)}]
        ) from None

    return data


def get_current_user(
    request: Request,
    authorization: Annotated[str | None, Header()] = None,
) -> User:
    scheme, param = get_authorization_scheme_param(authorization)

    if not authorization or scheme.lower() != "bearer":
        print(
            f"Malformed authorization header. Scheme: {scheme} Param: {param} Authorization: {authorization}"
        )
        return

    token = authorization.split()[1]
    data = decode_token(access_token=token)
    return get(db_session=request.state.db, user_in=UserBase(email=data["email"]))


CurrentUser = Annotated[User, Depends(get_current_user)]
