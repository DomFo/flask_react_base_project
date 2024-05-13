import json


def login(client, username, password):
    return client.post('/users/login',
                       data=json.dumps(
                           {'username': username,
                            'password': password}
                       ), content_type='application/json')
