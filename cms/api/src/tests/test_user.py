import json

def test_create_user(test_app, test_db):
    test_request_payload = {"email": "test@gmail.com", "password": "password"}

    response = test_app.post(
        "/auth/register",
        content=json.dumps(test_request_payload)
    )

    assert response.status_code == 200
    assert 'token' in response.json()
    assert isinstance(response.json()['token'], str)

def test_login_user(test_app, test_db):
    test_request_payload = {"email": "test@gmail.com", "password": "password"}

    response = test_app.post(
        "/auth/login",
        content=json.dumps(test_request_payload)
    )

    assert response.status_code == 200
    assert 'token' in response.json()
    assert isinstance(response.json()['token'], str)