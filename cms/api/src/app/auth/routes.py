from fastapi import APIRouter, Response
from .models import (
    UserLoginResponse,
    UserLogin,
    UserRegister,
    UserRegisterResponse,
    UserRead,
)
from .service import get_by_email, create, CurrentUser, set_access_cookies
from pydantic.error_wrappers import ValidationError, ErrorWrapper
from app.database.db import DbSession
from app.exceptions import (
    InvalidPasswordError,
    InvalidUsernameError,
    InvalidConfigurationError,
)

auth_router = APIRouter()

AUTH_REGISTRATION_ENABLED = True


@auth_router.get("/me", response_model=UserRead)
def me(current_user: CurrentUser):
    return current_user


@auth_router.post("/login", response_model=UserLoginResponse)
def login_user(response: Response, user_in: UserLogin, db_session: DbSession):
    user = get_by_email(db_session=db_session, email=user_in.email)
    if user and user.check_password(user_in.password):
        set_access_cookies(response, user.token)
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

    return {"result": "failure"}


def register_user(user_in: UserRegister, db_session: DbSession):
    user = get_by_email(db_session=db_session, email=user_in.email)
    if user:
        raise ValidationError(
            [
                ErrorWrapper(
                    InvalidConfigurationError(
                        msg="A user with this email already exists."
                    ),
                    loc="email",
                )
            ],
            model=UserRegister,
        )

    user = create(db_session=db_session, user_in=user_in)
    return user


if AUTH_REGISTRATION_ENABLED:
    register_user = auth_router.post("/register", response_model=UserRegisterResponse)(
        register_user
    )
