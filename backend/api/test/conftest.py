import pytest
from api.app_factory import create_app, db
from api.models.user import UserModel, UserRole


@pytest.fixture(scope='module')
def app():
    app = create_app()
    yield app


@pytest.fixture(scope='module')
def client(app):
    return app.test_client()


@pytest.fixture(scope='module')
def test_db(app):
    with app.app_context():
        db.create_all()
        yield db
        db.session.remove()
        db.drop_all()


@pytest.fixture(scope='function')
def admin_user(test_db, request):
    user = UserModel(username='admin', role=UserRole.ADMIN)
    user.set_password('admin')
    user.save_to_db()

    def teardown():
        user.delete_from_db()

    request.addfinalizer(teardown)
    return user


@pytest.fixture(scope='function')
def regular_user(test_db, request):
    admin = UserModel(username='regular.user', role=UserRole.USER)
    admin.set_password('password')
    admin.save_to_db()

    def teardown():
        admin.delete_from_db()

    request.addfinalizer(teardown)
    return admin
