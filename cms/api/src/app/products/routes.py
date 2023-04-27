from .models import Product, ProductCreate, ProductCreateResponse
from .service import create
from fastapi import APIRouter, Response
from app.auth.service import CurrentUser
from app.database.db import DbSession

product_router = APIRouter()


@product_router.post("/", response_model=ProductCreateResponse)
def create_product(db_session: DbSession, current_user: CurrentUser):
    product = create(db_session=db_session, current_user=current_user)
    return product
