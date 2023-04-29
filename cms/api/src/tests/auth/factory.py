from app.auth.models import User, hash_password
from factory import (
    RelatedFactoryList,
    Sequence,
)
from tests.factory import BaseFactory


class UserFactory(BaseFactory):
    email = Sequence(lambda n: f"user{n}@example.com")
    password = hash_password("password")
    products = RelatedFactoryList(
        "tests.products.factory.ProductFactory", "user", size=2, user=None
    )

    class Meta:
        model = User
