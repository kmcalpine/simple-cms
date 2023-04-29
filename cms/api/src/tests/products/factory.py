from app.products.models import Product, ProductImages, ProductInfo, ProductTags
from factory import RelatedFactory, RelatedFactoryList, Sequence, SubFactory
from factory.fuzzy import FuzzyDecimal
from tests.auth.factory import UserFactory
from tests.db import Session
from tests.factory import BaseFactory


class ProductImagesFactory(BaseFactory):
    tag = Sequence(lambda n: f"Tag {n}")
    url = Sequence(lambda n: f"URL {n}")

    class Meta:
        model = ProductImages


class ProductTagFactory(BaseFactory):
    tag = Sequence(lambda n: f"Tag {n}")

    class Meta:
        model = ProductTags


class ProductInfoFactory(BaseFactory):
    name = Sequence(lambda n: f"Product {n}")
    description = Sequence(lambda n: f"Description {n}")
    price = FuzzyDecimal(1.00, 100.00, 2)

    class Meta:
        model = ProductInfo


class ProductFactory(BaseFactory):
    user = SubFactory(UserFactory)
    info = RelatedFactory(ProductInfoFactory)
    images = RelatedFactoryList(ProductImagesFactory, "product", size=3)
    tags = RelatedFactoryList(ProductTagFactory, "product", size=3)

    class Meta:
        model = Product
