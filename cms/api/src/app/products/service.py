from typing import List

from .models import (
    Product,
    ProductCreate,
    ProductInfo,
    ProductImages,
    ProductTags,
    ProductUpdate,
)


def create(*, db_session, product_in, current_user) -> Product:
    product = Product(user_id=current_user.id)

    db_session.add(product)
    db_session.flush()

    product_info = ProductInfo(
        **product_in.dict(exclude={"images", "tags"}), product_id=product.id
    )

    db_session.add(product_info)
    db_session.flush()

    images = product_in.dict().get("images")

    for image in images:
        product_image = ProductImages(**image, product_id=product.id)
        db_session.add(product_image)
        db_session.flush()

    tags = product_in.dict().get("tags")

    for tag in tags:
        product_tag = ProductTags(**tag, product_id=product.id)
        db_session.add(product_tag)
        db_session.flush()

    db_session.commit()
    return product


def get(*, db_session, product_id, user_id) -> Product:
    product = (
        db_session.query(Product)
        .filter(Product.id == product_id)
        .filter(Product.user_id == user_id)
    ).first()

    return product


def get_all(*, db_session, current_user) -> List[Product]:
    products = (
        db_session.query(Product).filter(Product.user_id == current_user.id).all()
    )
    return products


def update(*, db_session, product, product_in: ProductUpdate):
    update_data = product_in.dict(exclude_unset=True)

    for field, value in update_data.items():
        setattr(product, field, value)

    db_session.commit()
    return product


def delete(*, db_session, product_id):
    product = db_session.query(Product).filter(Product.id == product_id).first()
    db_session.delete(product)
    db_session.commit()
