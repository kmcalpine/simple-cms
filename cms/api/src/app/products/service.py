from .models import Product, ProductCreate


def create(*, db_session, current_user) -> Product:
    product = Product(user_id=current_user.id)

    db_session.add(product)
    db_session.commit()
    return product
