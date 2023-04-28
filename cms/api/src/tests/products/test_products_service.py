def test_create(session, user):
    from app.products.service import create
    from app.products.models import ProductCreate

    name = "name"
    description = "description"
    price = 13.99

    product_in = ProductCreate(name=name, description=description, price=price)

    t_product = create(db_session=session, product_in=product_in, current_user=user)
    assert t_product


def test_get(session, product):
    from app.products.service import get

    t_product = get(
        db_session=session, product_id=product.id, current_user=product.user
    )

    assert t_product.id == product.id


def test_get_all(session, user):
    assert 1
