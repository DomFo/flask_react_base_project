import json
from .util import login


# # # # # # # # # # # # # # # #
# login_required decorator
# # # # # # # # # # # # # # # #

def test_get_users_no_auth(client):
    response = client.get('/users')
    assert response.status_code == 401
    assert response.json['message'] == 'Unauthorized'


def test_get_user_no_auth(client, regular_user):
    response = client.get(f'/users/{regular_user.id}')
    assert response.status_code == 401
    assert response.json['message'] == 'Unauthorized'


def test_delete_users_no_auth(client):
    response = client.delete('/users/999')
    assert response.status_code == 401
    assert response.json['message'] == 'Unauthorized'


def test_create_user_no_auth(client):
    response = client.post('/users',
                           data=json.dumps(
                               {'username': 'new.user', 'password': 'password'}),
                           content_type='application/json')
    assert response.status_code == 401
    assert response.json['message'] == 'Unauthorized'


# # # # # # # # # # # # # # # #
# GET
# # # # # # # # # # # # # # # #

def test_get_user(client, regular_user):
    login(client, 'regular.user', 'password')
    response = client.get(f'/users/{regular_user.id}')
    assert response.status_code == 200
    assert response.json['username'] == 'regular.user'
    assert response.json['role'] == 'USER'


def test_admin_get_users(client, admin_user, regular_user):
    login(client, 'admin', 'admin')
    response = client.get('/users')
    assert response.status_code == 200
    assert len(response.json['users']) == 2
    assert response.json['users'][0]['username'] == 'admin'
    assert response.json['users'][0]['role'] == 'ADMIN'
    assert response.json['users'][1]['username'] == 'regular.user'
    assert response.json['users'][1]['role'] == 'USER'


# # # # # # # # # # # # # # # #
# POST
# # # # # # # # # # # # # # # #

def test_admin_create_user(client, admin_user):
    login(client, 'admin', 'admin')
    response = client.post('/users',
                           data=json.dumps(
                               {'username': 'new.user', 'password': 'password'}),
                           content_type='application/json')
    assert response.status_code == 201
    assert response.json['username'] == 'new.user'
    assert response.json['role'] == 'USER'


def test_admin_create_user_no_username(client, admin_user):
    login(client, 'admin', 'admin')
    response = client.post('/users',
                           data=json.dumps({'password': 'password'}),
                           content_type='application/json')
    assert response.status_code == 400
    assert response.json['message'] == 'Username is required'


def test_admin_create_user_no_password(client, admin_user):
    login(client, 'admin', 'admin')
    response = client.post('/users',
                           data=json.dumps({'username': 'new.user'}),
                           content_type='application/json')
    assert response.status_code == 400
    assert response.json['message'] == 'Password is required'


def test_admin_create_user_duplicate(client, admin_user):
    login(client, 'admin', 'admin')
    response = client.post('/users',
                           data=json.dumps(
                               {'username': 'admin', 'password': 'password'}),
                           content_type='application/json')
    assert response.status_code == 409
    assert response.json['message'] == 'User with this username already exists'


# # # # # # # # # # # # # # # #
# DELETE
# # # # # # # # # # # # # # # #

def test_admin_delete_user(client, admin_user, regular_user):
    login(client, 'admin', 'admin')
    response = client.delete(f'/users/{regular_user.id}')
    assert response.status_code == 200
    assert response.json['message'] == 'User deleted'


def test_admin_delete_user_not_found(client, admin_user):
    login(client, 'admin', 'admin')
    response = client.delete('/users/999')
    assert response.status_code == 404
    assert response.json['message'] == 'User not found'


# # # # # # # # # # # # # # # #
# PATCH
# # # # # # # # # # # # # # # #


def test_admin_update_user(client, admin_user, regular_user):
    login(client, 'admin', 'admin')
    response = client.patch(f'/users/{regular_user.id}',
                            data=json.dumps({'username': 'new.username'}),
                            content_type='application/json')
    assert response.status_code == 200
    assert response.json['message'] == 'User updated successfully'
    response = client.get(f'/users/{regular_user.id}')
    assert response.json['username'] == 'new.username'


def test_user_update_password(client, regular_user):
    login(client, 'regular.user', 'password')
    response = client.patch(f'/users/{regular_user.id}',
                            data=json.dumps({'password': 'new.password'}),
                            content_type='application/json')
    assert response.status_code == 200
    assert response.json['message'] == 'User updated successfully'
    response_2 = login(client, 'regular.user', 'new.password')
    assert response_2.status_code == 200
