def test_create(session, user):
    from app.products.service import create

    t_product = create(db_session=session, current_user=user)
    assert t_product


def test_get(session, product):
    assert product
