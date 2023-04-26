def test_create(monkeypatch):
    from app.products import service

    def mock_create():
        return 1

    monkeypatch.setattr(service, "create", mock_create)
    t_product = service.create()

    assert t_product
