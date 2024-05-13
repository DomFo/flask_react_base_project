from .util import login


def test_login_admin(client, admin_user):
    response = login(client, 'admin', 'admin')
    assert response.status_code == 200
    assert response.json['id'] is not None
    assert response.json['role'] == 'ADMIN'
    assert response.json['username'] == 'admin'


def test_login_regular(client, regular_user):
    response = login(client, 'regular.user', 'password')
    assert response.status_code == 200
    assert response.json['id'] is not None
    assert response.json['role'] == 'USER'
    assert response.json['username'] == 'regular.user'


def test_login_wrong_password(client, regular_user):
    response = login(client, 'regular.user', 'wrongpassword')
    assert response.status_code == 401
    assert response.json['message'] == 'Invalid username or password'


def test_login_wrong_username(client, regular_user):
    response = login(client, 'wrongusername', 'password')
    assert response.status_code == 401
    assert response.json['message'] == 'Invalid username or password'


def test_logout(client, regular_user):
    response = login(client, 'regular.user', 'password')
    assert response.status_code == 200
    response = client.post('/users/logout')
    assert response.status_code == 200
    response = client.get('/users/me')
    assert response.status_code == 401
    assert response.json['message'] == 'No active session'


def test_user_session(client, regular_user):
    response = login(client, 'regular.user', 'password')
    assert response.status_code == 200
    response = client.get('/users/me')
    assert response.status_code == 200
    assert response.json['id'] is not None
    assert response.json['role'] == 'USER'
    assert response.json['username'] == 'regular.user'
