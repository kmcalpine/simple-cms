import pytest
from starlette.config import environ

environ["TESTING"] = "TRUE"


from app.config import DATABASE_URL, TESTING
from app.database.db import engine
from app.database.manage import init_database
from app.main import app
from sqlalchemy_utils import database_exists, drop_database
from starlette.testclient import TestClient
from tests.auth.factory import UserFactory
from tests.products.factory import (
    ProductFactory,
    ProductImagesFactory,
    ProductTagFactory,
)

from .db import Session


@pytest.fixture(autouse=True, scope="session")
def test_db():
    if database_exists(str(DATABASE_URL)):
        drop_database(str(DATABASE_URL))

    init_database(engine=engine, url=str(DATABASE_URL))
    schema_translation = "test_mylittledinkers" if TESTING else "mylittledinkers"
    schema_engine = engine.execution_options(
        schema_translate_map={"mylittledinkers": schema_translation}
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
def user():
    return UserFactory()


@pytest.fixture
def product():
    return ProductFactory()


@pytest.fixture
def images():
    return ProductImagesFactory()


@pytest.fixture
def tags():
    return ProductTagFactory()
