from api.resources.user import User, UserCollection, UserLogin, UserLogout, UserSession


def register_routes(api):
    api.add_resource(UserCollection, '/users')
    api.add_resource(User, '/users/<int:user_id>')
    api.add_resource(UserLogin, '/users/login')
    api.add_resource(UserLogout, '/users/logout')
    api.add_resource(UserSession, '/users/me')
