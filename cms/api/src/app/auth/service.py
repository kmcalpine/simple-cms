from typing import Annotated, Optional
from .models import User

def get_by_email(*, db_session, email: str):
    return db_session.query(User).filter(User.email == email).one_or_none()