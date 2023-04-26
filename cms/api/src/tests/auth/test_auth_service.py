def test_create(session):
    from app.auth.service import create
    from app.auth.models import UserRegister

    user_in = UserRegister(email="test@email.com", password="test123")

    user = create(db_session=session, user_in=user_in)
    assert user


def test_get(session, user, monkeypatch):
    from app.auth.service import get

    t_user = get(db_session=session, user_in=user)
    assert t_user.email == user.email


def test_decode(user):
    from app.auth.service import decode_token

    t_token = decode_token(access_token=user.token)
    assert t_token
    assert {"exp", "email", "csrf_token"} <= t_token.keys()
