import os

from app.config import SCHEMA_NAME
from .db import Base, sessionmaker
from sqlalchemy_utils import database_exists, create_database, drop_database
from sqlalchemy.schema import CreateSchema

print(SCHEMA_NAME)


def get_core_tables():
    """Fetches tables that belong to the 'mylittledinkers' schema."""
    core_tables = []
    for _, table in Base.metadata.tables.items():
        if table.schema == SCHEMA_NAME:
            core_tables.append(table)

    return core_tables


DATABASE_URL = os.getenv("DATABASE_URL")


def create_schema(engine):
    schema_name = SCHEMA_NAME
    if not engine.dialect.has_schema(engine, schema_name):
        with engine.connect() as connection:
            connection.execute(CreateSchema(schema_name))


def create_tables(engine):
    tables = get_core_tables()

    Base.metadata.create_all(engine, tables=tables)


def init_database(engine, url=str(DATABASE_URL)):
    # testing

    if database_exists(url):
        drop_database(url)

    if not database_exists(url):
        create_database(url)

    create_schema(engine)
    create_tables(engine)
