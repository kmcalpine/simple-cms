from fastapi import APIRouter, Depends
from app.auth.routes import auth_router
from app.auth.service import CurrentUser
from app.products.routes import product_router

api_router = APIRouter()
authenticated_api_router = APIRouter()

api_router.include_router(auth_router, prefix="/auth", tags=["auth"])
authenticated_api_router.include_router(
    product_router, prefix="/products", tags=["products"]
)

api_router.include_router(authenticated_api_router)
