from fastapi import APIRouter, Request, Response
from .models import (
    UserLoginResponse,
    UserLogin,
    UserRegister,
    UserRegisterResponse
)
from .service import get_by_email, create, get_current_user
from pydantic.error_wrappers import ValidationError, ErrorWrapper
from app.database.db import DbSession
from app.exceptions import InvalidPasswordError, InvalidUsernameError, InvalidConfigurationError

auth_router = APIRouter()

AUTH_REGISTRATION_ENABLED = True

@auth_router.get("/me")
def me(request: Request):
    get_current_user(request=request)
    return {"result": "success"}

@auth_router.post("/login", response_model=UserLoginResponse)
def login_user(user_in: UserLogin, db_session: DbSession, response: Response):
    user = get_by_email(db_session=db_session, email=user_in.email)
    if user and user.check_password(user_in.password):
        response.set_cookie(key="mld-at", value=user.token, httponly=True, secure=True)
        return {"result": "success"}

    raise ValidationError(
        [
            ErrorWrapper(
                InvalidUsernameError(msg="Invalid username."),
                loc="username",
            ),
            ErrorWrapper(
                InvalidPasswordError(msg="Invalid password."),
                loc="password",
            ),
        ],
        model=UserLogin,
    )

def register_user(user_in: UserRegister, db_session: DbSession):
    user = get_by_email(db_session=db_session, email=user_in.email)
    if user:
        raise ValidationError(
            [
                ErrorWrapper(
                    InvalidConfigurationError(msg="A user with this email already exists."),
                    loc="email"
                )
            ],
            model=UserRegister
        )

    user = create(db_session=db_session, user_in=user_in)
    return user

if AUTH_REGISTRATION_ENABLED:
    register_user = auth_router.post("/register", response_model=UserRegisterResponse)(register_user)