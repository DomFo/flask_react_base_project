
from datetime import timedelta

from flask import request, session
from flask_login import login_user, logout_user, current_user, login_required
from flask_restful import Resource

from api.logger import logger
from api.models.user import UserModel, UserRole


class User(Resource):
    @classmethod
    @login_required
    def get(cls, user_id):
        user = UserModel.find_by_id(user_id)
        if not user:
            return {'message': 'User not found'}, 404
        return user.to_dict()

    @classmethod
    @login_required
    def patch(cls, user_id):
        data = request.get_json()
        user = UserModel.find_by_id(user_id)
        if not user:
            return {'message': 'User not found'}, 404

        updated = False

        if data.get('username') is not None:
            user.username = data['username']
            updated = True
        if data.get('password') is not None:
            user.set_password(data['password'])
            updated = True

        if updated:
            user.save_to_db()
            return {'message': 'User updated successfully'}, 200
        else:
            return {'message': 'No valid fields provided for update'}, 400

    @classmethod
    @login_required
    def delete(cls, user_id):
        user = UserModel.find_by_id(user_id)
        if not user:
            return {'message': 'User not found'}, 404
        if current_user.role != UserRole.ADMIN:
            return {'message': 'Unauthorized'}, 401
        user.delete_from_db()
        logger.info(f'User {user.username} deleted from db.')
        return {'message': 'User deleted'}, 200


class UserCollection(Resource):
    @classmethod
    @login_required
    def post(cls):
        data = request.get_json()
        if not data.get('username'):
            return {'message': 'Username is required'}, 400
        if not data.get('password'):
            return {'message': 'Password is required'}, 400
        if UserModel.find_by_username(data['username']):
            return {'message': 'User with this username already exists'}, 409
        try:
            user = UserModel(username=data['username'],
                             role=UserRole.USER)
            user.set_password(data['password'])
            user.save_to_db()
            return user.to_dict(), 201
        except Exception as e:
            logger.error(f'Error saving user: {e}')
            return {'message': 'Error saving user'}, 500

    @classmethod
    @login_required
    def get(cls):
        return {'users': [user.to_dict() for user in UserModel.query.all()]}


class UserSession(Resource):
    @classmethod
    def get(cls):
        if current_user.is_authenticated:
            return current_user.to_dict(), 200
        else:
            return {"message": 'No active session'}, 401


class UserLogin(Resource):
    @classmethod
    def post(cls):
        data = request.get_json()
        if not data.get('username'):
            return {'message': 'Username is required'}, 400
        if not data.get('password'):
            return {'message': 'Password is required'}, 400
        user = UserModel.find_by_username(data['username'])
        if not user:
            logger.error(f'Invalid username.')
            return {'message': 'Invalid username or password'}, 401
        if not user.check_password(data['password']):
            logger.error(f'Invalid password.')
            return {'message': 'Invalid username or password'}, 401
        logger.info(
            f'User {user.username} logged in. Remember me: {data.get("remember_me", "False")}')
        try:
            login_user(user,
                       remember=data.get('remember_me', False),
                       duration=timedelta(days=60))
        except Exception as e:
            logger.error(f'Error logging in: {e}')
            return {'message': 'Error logging in'}, 500
        user.update_last_login()
        # session['user_id'] = user.id
        session['user_id'] = str(user.id)

        return user.to_dict(), 200


class UserLogout(Resource):
    @classmethod
    def post(cls):
        try:
            logout_user()
        except Exception as e:
            logger.error(f'Error logging out: {e}')
            return {'message': 'Error logging out'}, 500
        if 'user_id' in session:
            del session['user_id']
            logger.info(f'User {current_user} logged out.')
        return {'message': 'Successfully logged out.'}, 200
