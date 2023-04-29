from typing import Optional

from app.config import SCHEMA_NAME
from app.database.db import Base
from app.models import CustomBase, PrimaryKey
from sqlalchemy import (
    DECIMAL,
    Boolean,
    Column,
    DateTime,
    ForeignKey,
    Integer,
    LargeBinary,
    String,
)
from sqlalchemy.orm import relationship
from typing import List


class Product(Base):
    __table_args__ = {"schema": SCHEMA_NAME}
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey(f"{SCHEMA_NAME}.user.id"))
    info = relationship("ProductInfo", backref="product")
    images = relationship("ProductImages", backref="product")
    tags = relationship("ProductTags", backref="product")


class ProductCreateResponse(CustomBase):
    id: PrimaryKey


class ProductInfo(Base):
    __table_args__ = {"schema": SCHEMA_NAME}
    id = Column(Integer, primary_key=True)
    product_id = Column(Integer, ForeignKey(f"{SCHEMA_NAME}.product.id"))
    name = Column(String, nullable=False)
    description = Column(String, nullable=False)
    price = Column(DECIMAL, nullable=False)


class ProductImages(Base):
    __table_args__ = {"schema": SCHEMA_NAME}
    id = Column(Integer, primary_key=True)
    product_id = Column(Integer, ForeignKey(f"{SCHEMA_NAME}.product.id"))
    tag = Column(String, nullable=False)
    url = Column(String, nullable=False)


class ProductTags(Base):
    __table_args__ = {"schema": SCHEMA_NAME}
    id = Column(Integer, primary_key=True)
    product_id = Column(Integer, ForeignKey(f"{SCHEMA_NAME}.product.id"))
    tag = Column(String, nullable=False, unique=True)


class ProductBase(CustomBase):
    id: Optional[PrimaryKey]
    name: str
    description: str


class ProductImage(CustomBase):
    tag: str
    url: str


class ProductTag(CustomBase):
    tag: str


class ProductCreate(ProductBase):
    price: float
    images: List[ProductImage]
    tags: List[ProductTag]


class ProductUpdate(CustomBase):
    name: Optional[str]
    description: Optional[str]
    price: Optional[float]
    images: Optional[List[ProductImage]]
    tags: Optional[List[ProductTag]]
