from factory import Sequence, SubFactory, RelatedFactory
from factory.fuzzy import FuzzyDecimal
from tests.db import Session
from tests.auth.factory import UserFactory
from tests.factory import BaseFactory
from app.products.models import Product, ProductInfo


class ProductInfoFactory(BaseFactory):
    name = Sequence(lambda n: f"Product {n}")
    description = Sequence(lambda n: f"Description {n}")
    price = FuzzyDecimal(1.00, 100.00, 2)

    class Meta:
        model = ProductInfo


class ProductFactory(BaseFactory):
    user = SubFactory(UserFactory)
    info = SubFactory(ProductInfoFactory)

    class Meta:
        model = Product
