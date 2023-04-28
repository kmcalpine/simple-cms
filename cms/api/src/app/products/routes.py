from app.models import PrimaryKey
from .models import Product, ProductCreate, ProductCreateResponse, ProductUpdate
from .service import create
from fastapi import APIRouter, HTTPException, Response, status
from app.auth.service import CurrentUser
from .service import get, update
from app.database.db import DbSession

product_router = APIRouter()


@product_router.post("/", response_model=ProductCreateResponse)
def create_product(db_session: DbSession, current_user: CurrentUser):
    product = create(db_session=db_session, current_user=current_user)
    return product


@product_router.put("/update/{product_id}")
def update_product(
    db_session: DbSession,
    product_id: PrimaryKey,
    product_in: ProductUpdate,
    current_user: CurrentUser,
):
    product = get(
        db_session=db_session, product_id=product_id, current_user=current_user
    )

    if not product:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=[{"msg": "A user with this id does not exist."}],
        )

    return update(db_session=db_session, product=product, product_in=product_in)
