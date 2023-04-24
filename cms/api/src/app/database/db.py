import os
import re

from fastapi import Depends
from typing import Annotated
from starlette.requests import Request
from sqlalchemy import (
    Column,
    DateTime,
    Integer,
    MetaData,
    String,
    Table,
    create_engine,
)

from sqlalchemy.orm import object_session, sessionmaker, Session
from sqlalchemy.ext.declarative import declarative_base, declared_attr

from databases import Database

DATABASE_URL = os.getenv("DATABASE_URL")

# SQLAlchemy
engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(bind=engine)

def get_db():
    with Session(engine) as session:
        yield session

DbSession = Annotated[Session, Depends(get_db)]

def resolve_table_name(name):
    """Resolves table names to their mapped names."""
    names = re.split("(?=[A-Z])", name)  # noqa
    return "_".join([x.lower() for x in names if x])

class CustomBase:
    @declared_attr
    def __tablename__(self):
        return resolve_table_name(self.__name__)

Base = declarative_base(cls=CustomBase)