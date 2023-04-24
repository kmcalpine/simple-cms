from typing import Annotated, Optional
from .models import User, UserRegister
from starlette.requests import Request
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

def get_current_user(request: Request, **kwargs):

    token = request.cookies.get("mld-at")
    print(token)

    try:
        data = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        print(data)
    except (JWTError) as e:
        raise HTTPException(
            status_code=HTTP_401_UNAUTHORIZED, detail=[{"msg": str(e)}]
        ) from None
    return data["email"]