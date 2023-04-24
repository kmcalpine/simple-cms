from typing import Optional
from pydantic import Field, BaseModel, validator
from pydantic.networks import EmailStr
import bcrypt
from sqlalchemy import DateTime, Column, String, LargeBinary, Integer, Boolean
from datetime import datetime, timedelta
from jose import jwt


def hash_password(password: str):
    pw = bytes(password, "utf-8")
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(pw, salt)


class UserBase(BaseModel):
    email: EmailStr

    @validator("email")
    def email_required(cls, v):
        if not v:
            raise ValueError("Must not be empty string and must be an email")
        return v

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

class UserLoginResponse(BaseModel):
    token: Optional[str] = Field(None, nullable=True)

class UserRegisterResponse(BaseModel):
    token: Optional[str] = Field(None, nullable=True)

class User():
    id = Column(Integer, primary_key=True)
    email = Column(String, unique=True)
    password = Column(LargeBinary, nullable=False)

    def check_password(self, password):
        return bcrypt.checkpw(password.encode("utf-8"), self.password)

    @property
    def token(self):
        now = datetime.utcnow()
        exp = (now + timedelta(seconds=86400))
        data = {
            "exp": exp,
            "email": self.email
        }
        return jwt.encode(data, "SECRET", algorithm="HS256")