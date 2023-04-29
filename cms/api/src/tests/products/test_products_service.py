def test_create(session, user):
    from app.products.models import ProductCreate
    from app.products.service import create

    name = "name"
    description = "description"
    price = 13.99

    images = [{"tag": "tag", "url": "url"}] * 4
    tags = [{"tag": f"{n}"} for n in range(4)]

    product_in = ProductCreate(
        name=name, description=description, price=price, images=images, tags=tags
    )

    t_product = create(db_session=session, product_in=product_in, current_user=user)
    assert t_product


def test_get(session, product):
    from app.products.service import get

    t_product = get(db_session=session, product_id=product.id, user_id=product.user_id)
    assert t_product.user_id == product.user_id
    assert t_product.id == product.id


def test_get_all(session, user):
    from app.products.service import get_all

    t_products = get_all(db_session=session, current_user=user)
    assert t_products


def test_update(session, product):
    from app.products.models import ProductUpdate
    from app.products.service import update

    name = "updated name"
    description = "updated description"
    price = 25.50

    product_in = ProductUpdate(name=name, description=description, price=price)

    t_product = update(db_session=session, product=product, product_in=product_in)

    assert t_product.name == name


def test_delete(session, product):
    from app.products.service import delete, get

    delete(db_session=session, product_id=product.id)
    assert not get(db_session=session, product_id=product.id, user_id=product.user_id)
