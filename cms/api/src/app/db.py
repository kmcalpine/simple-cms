import os

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

from databases import Database

DATABASE_URL = os.getenv("DATABASE_URL")

# SQLAlchemy
engine = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(bind=engine)

def get_db(request: Request):
    return request.state.db

DbSession = Annotated[Session, Depends(get_db)]