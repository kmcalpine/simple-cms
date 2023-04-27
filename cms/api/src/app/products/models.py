from app.config import SCHEMA_NAME
from sqlalchemy import (
    DateTime,
    Column,
    String,
    LargeBinary,
    Integer,
    Boolean,
    ForeignKey,
    DECIMAL,
)
from app.database.db import Base
from sqlalchemy.orm import relationship
from app.models import CustomBase, PrimaryKey
from typing import Optional


class Product(Base):
    __table_args__ = {"schema": SCHEMA_NAME}
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey(f"{SCHEMA_NAME}.user.id"))
    user = relationship("User", backref="product")
    # info = relationship("ProductInfo")
    # images = relationship("ProductImages")


class ProductCreateResponse(CustomBase):
    id: PrimaryKey


class ProductInfo(Base):
    __table_args__ = {"schema": SCHEMA_NAME}
    id = Column(Integer, primary_key=True)
    product_id = Column(Integer, ForeignKey(f"{SCHEMA_NAME}.product.id"))
    product = relationship("Product", backref="info")
    name = Column(String, nullable=False)
    description = Column(String, nullable=False)
    price = Column(DECIMAL, nullable=False)


class ProductImages(Base):
    __table_args__ = {"schema": SCHEMA_NAME}
    id = Column(Integer, primary_key=True)
    product_id = Column(Integer, ForeignKey(f"{SCHEMA_NAME}.product.id"))
    product = relationship("Product", backref="images")
    url = Column(String, nullable=False)


class ProductBase(CustomBase):
    id: Optional[PrimaryKey]
    name: str
    description: str


class ProductCreate(ProductBase):
    user_id: int
