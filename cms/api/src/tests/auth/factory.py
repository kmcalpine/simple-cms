from factory import Sequence, SubFactory, RelatedFactory, Iterator, post_generation
from factory.alchemy import SQLAlchemyModelFactory
from factory.fuzzy import FuzzyDecimal
from tests.db import Session
from tests.factory import BaseFactory

from app.auth.models import hash_password, User
from app.products.models import Product, ProductInfo


class UserFactory(BaseFactory):
    email = Sequence(lambda n: f"user{n}@example.com")
    password = hash_password("password")

    class Meta:
        model = User
