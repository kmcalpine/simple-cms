from factory import Sequence, SubFactory, RelatedFactory, Iterator, post_generation
from factory.alchemy import SQLAlchemyModelFactory
from .db import Session

from app.auth.models import hash_password, User
from app.products.models import Product


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


class ProductFactory(BaseFactory):
    user = SubFactory(UserFactory)

    class Meta:
        model = Product
