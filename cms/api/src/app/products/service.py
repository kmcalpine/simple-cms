from .models import Product, ProductCreate, ProductInfo
from typing import List


def create(*, db_session, product_in: ProductCreate, current_user) -> Product:
    product_info = ProductInfo(**product_in.dict())
    db_session.add(product_info)
    db_session.flush()

    product = Product(user_id=current_user.id, info_id=product_info.id)

    db_session.add(product)
    db_session.commit()
    return product


def get(*, db_session, product_id, current_user) -> Product:
    product = (
        db_session.query(Product)
        .filter(Product.id == product_id)
        .filter(Product.user_id == current_user.id)
    ).one_or_none()

    return product


def get_all(*, db_session, current_user) -> List[Product]:
    products = (
        db_session.query(Product).filter(Product.user_id == current_user.id).all()
    )

    return products


def update():
    return


def delete(*, db_session, product_id):
    return
