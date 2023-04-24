import pytest
from starlette.config import environ
from starlette.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy_utils import database_exists, create_database, drop_database
from sqlalchemy.orm import Session
from app.database.db import get_db
from app.database.manage import create_schema, create_tables

environ["TESTING"] = "TRUE"

from app.config import (
    DATABASE_URL
)
from app.main import app

engine = create_engine(str(DATABASE_URL))

def override_get_db():
    try:
        db_session = Session(engine)
        yield db_session
    finally:
        db_session.close()

@pytest.fixture(autouse=True, scope="session")
def test_db():
    assert not database_exists(str(DATABASE_URL))
    create_database(str(DATABASE_URL))
    create_schema(engine=engine)
    create_tables(engine)
    yield
    drop_database(str(DATABASE_URL))

app.dependency_overrides[get_db] = override_get_db

@pytest.fixture(scope="module")
def test_app():
    client = TestClient(app)
    yield client