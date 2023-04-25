from typing import Annotated, Optional
from .models import User, UserRegister
from starlette.requests import Request
from fastapi import Cookie, Depends
from starlette.status import HTTP_401_UNAUTHORIZED
from fastapi.security.utils import get_authorization_scheme_param
from jose import JWTError, jwt
from jose.exceptions import JWKError
from jose.utils import base64url_encode
from fastapi.exceptions import HTTPException
from app.config import JWT_SECRET

def get_by_email(*, db_session, email: str):
    return db_session.query(User).filter(User.email == email).one_or_none()

def create(*, db_session, user_in: UserRegister) -> User:
    password = bytes(user_in.password, "utf-8")

    user = User(
        **user_in.dict(exclude={"password"}), password=password
    )

    db_session.add(user)
    db_session.commit()
    return user

def get(*, db_session, user_in) -> User:
    user = get_by_email(db_session=db_session, email=user_in)
    return user

def get_current_user(request: Request, mld_at: Optional[str] = Cookie(None)) -> User:

    try:
        data = jwt.decode(mld_at, JWT_SECRET, algorithms=["HS256"])
    except (JWTError) as e:
        raise HTTPException(
            status_code=HTTP_401_UNAUTHORIZED, detail=[{"msg": str(e)}]
        ) from None
    print(data)
    return get(
        db_session=request.state.db,
        user_in=data["email"]
    )

CurrentUser = Annotated[User, Depends(get_current_user)]