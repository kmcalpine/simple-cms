from datetime import datetime, timedelta
from typing import Optional

import bcrypt
from app.config import JWT_SECRET, SCHEMA_NAME
from app.database.db import Base
from app.models import CustomBase, PrimaryKey
from app.products.models import Product
from jose import jwt
from pydantic import Field, validator
from pydantic.networks import EmailStr
from sqlalchemy import Boolean, Column, DateTime, Integer, LargeBinary, String
from sqlalchemy.orm import relationship


def hash_password(password: str):
    pw = bytes(password, "utf-8")
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(pw, salt)


class UserBase(CustomBase):
    email: EmailStr

    @validator("email")
    def email_required(cls, v):
        if not v:
            raise ValueError("Must not be empty string and must be an email")
        return v


class UserRead(UserBase):
    id: PrimaryKey


class UserLogin(UserBase):
    password: str

    @validator("password")
    def password_required(cls, v):
        if not v:
            raise ValueError("Must not be empty string")
        return v


class UserRegister(UserLogin):
    password: Optional[str] = Field(None, nullable=True)

    @validator("password", pre=True, always=True)
    def password_required(cls, v):
        return hash_password(v)


class UserLoginResponse(CustomBase):
    token: Optional[str] = Field(None, nullable=True)


class UserRegisterResponse(CustomBase):
    token: Optional[str] = Field(None, nullable=True)


class User(Base):
    __table_args__ = {"schema": SCHEMA_NAME}
    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True)
    password = Column(LargeBinary, nullable=False)

    products = relationship("Product", backref="user")

    def check_password(self, password):
        return bcrypt.checkpw(password.encode("utf-8"), self.password)

    @property
    def token(self):
        now = datetime.utcnow()
        exp = now + timedelta(seconds=86400)
        data = {"exp": exp, "email": self.email}
        access_token = jwt.encode(data, JWT_SECRET, algorithm="HS256")
        print(jwt.decode(access_token, JWT_SECRET, algorithms=["HS256"]))
        return access_token
