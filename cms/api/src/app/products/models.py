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
    info_id = Column(Integer, ForeignKey(f"{SCHEMA_NAME}.product_info.id"))
    info = relationship("ProductInfo", backref="product")


class ProductCreateResponse(CustomBase):
    id: PrimaryKey


class ProductInfo(Base):
    __table_args__ = {"schema": SCHEMA_NAME}
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    description = Column(String, nullable=False)
    price = Column(DECIMAL, nullable=False)


class ProductBase(CustomBase):
    id: Optional[PrimaryKey]
    name: str
    description: str


class ProductCreate(ProductBase):
    name: str
    description: str
    price: float
