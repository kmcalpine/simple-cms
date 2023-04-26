from typing import Optional
from pydantic import Field, validator
from pydantic.networks import EmailStr
import bcrypt
from sqlalchemy import DateTime, Column, String, LargeBinary, Integer, Boolean
from datetime import datetime, timedelta
from jose import jwt
from app.database.db import Base
from app.models import CustomBase, PrimaryKey
from app.config import JWT_SECRET
import uuid


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
    result: Optional[str] = Field(None, nullable=True)


class UserRegisterResponse(CustomBase):
    token: Optional[str] = Field(None, nullable=True)


class User(Base):
    __table_args__ = {"schema": "mylittledinkers"}
    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True)
    password = Column(LargeBinary, nullable=False)

    def check_password(self, password):
        return bcrypt.checkpw(password.encode("utf-8"), self.password)

    @property
    def token(self):
        now = datetime.utcnow()
        exp = now + timedelta(seconds=86400)
        csrf_token = uuid.uuid4()
        data = {"exp": exp, "email": self.email, "csrf_token": str(csrf_token)}
        access_token = jwt.encode(data, JWT_SECRET, algorithm="HS256")
        return access_token


class AccessTokens:
    access_token: str
    csrf_token: Optional[str]
