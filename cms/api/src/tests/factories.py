from factory import Sequence
from factory.alchemy import SQLAlchemyModelFactory
from .db import Session

from app.auth.models import hash_password, User


class BaseFactory(SQLAlchemyModelFactory):
    class Meta:
        abstract = True
        sqlalchemy_session = Session
        sqlalchemy_session_persistence = "commit"


class UserFactory(BaseFactory):
    email = Sequence(lambda n: f"user{n}@example.com")
    password = hash_password("password")

    class Meta:
        model = User
