from typing import Annotated, Optional
from .models import User, UserRegister

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