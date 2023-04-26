import pytest
from starlette.config import environ

environ["TESTING"] = "TRUE"


from starlette.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy_utils import database_exists, create_database, drop_database
from sqlalchemy.orm import scoped_session, sessionmaker
from app.database.db import get_db, engine
from app.database.manage import create_schema, create_tables, init_database
from .db import Session

from .factories import UserFactory


from app.config import DATABASE_URL
from app.main import app


@pytest.fixture(autouse=True, scope="session")
def test_db():
    if database_exists(str(DATABASE_URL)):
        drop_database(str(DATABASE_URL))
    init_database(engine=engine, url=str(DATABASE_URL))
    schema_engine = engine.execution_options(
        schema_translate_map={"test_mylittledinkers": "mylittledinkers"}
    )
    Session.configure(bind=schema_engine)
    yield
    drop_database(str(DATABASE_URL))


@pytest.fixture(scope="function", autouse=True)
def session(test_db):
    session = Session()
    session.begin_nested()
    yield session
    session.rollback()


@pytest.fixture(scope="module")
def test_app():
    client = TestClient(app)
    yield client


@pytest.fixture
def user(session):
    return UserFactory()
