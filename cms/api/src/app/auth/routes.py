from fastapi import APIRouter
from .models import (
    UserLoginResponse,
    UserLogin,
    UserRegister,
    UserRegisterResponse
)
from .service import get_by_email

from app.db import DbSession

auth_router = APIRouter()

AUTH_REGISTRATION_ENABLED = True

@auth_router.get("/test")
def auth_test():
    return {"result": "success"}

@auth_router.post("/login", response_model=UserLoginResponse)
def login_user(user_in: UserLogin, db_session: DbSession):
    return {}

def register_user(user_in: UserRegister, db_session: DbSession):
    user = get_by_email(db_session=db_session, email=user_in.email)

if AUTH_REGISTRATION_ENABLED:
    register_user = auth_router.post("/register", response_model=UserRegisterResponse)(register_user)