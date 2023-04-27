from fastapi import APIRouter
from app.auth.routes import auth_router
from app.products.routes import product_router

api_router = APIRouter()
authenticated_api_router = APIRouter()

api_router.include_router(auth_router, prefix="/auth", tags=["auth"])
api_router.include_router(product_router, prefix="/product", tags=["product"])
