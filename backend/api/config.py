import os

from dotenv import load_dotenv
from redis import Redis


class BaseConfig(object):
    load_dotenv(dotenv_path="/backend/api/.env", override=False)

    SECRET_KEY = os.environ.get('SECRET_KEY')
    SECURITY_PASSWORD_SALT = os.environ.get('SECURITY_PASSWORD_SALT')
    FRONTEND_URL = os.environ.get('FRONTEND_URL')

    # constants
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQL_ALCHEMY_ECHO = True
    PROPAGATE_EXCEPTIONS = True
    SESSION_TYPE = 'redis'
    SESSION_PERMANENT = False
    SESSION_USE_SIGNER = True
    SESSION_REDIS = Redis(host='redis', port=6379)
    RQ_REDIS_URL = 'redis://redis:6379/0'


class DevelopmentConfig(BaseConfig):
    load_dotenv(dotenv_path="/backend/api/.env.dev", override=True)

    FLASK_ASYNC_MODE = os.environ.get('FLASK_ASYNC_MODE', 'threading')
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')
    FRONTEND_URL = os.environ.get('FRONTEND_URL')
    FLASK_ENV = os.environ.get('FLASK_ENV')
    ADMIN_EMAIL = os.environ.get('ADMIN_EMAIL')
    ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD')
    API_MAIN_ENTRYPOINT = os.environ.get('API_MAIN_ENTRYPOINT')

    DEBUG = True


class MigrationConfig(BaseConfig):
    load_dotenv(dotenv_path="/backend/api/.env.dev", override=True)

    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')

    DEBUG = True


class TestingConfig(BaseConfig):
    load_dotenv(dotenv_path="/backend/api/.env.test", override=True)

    FLASK_ASYNC_MODE = os.environ.get('FLASK_ASYNC_MODE', 'threading')
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')
    FRONTEND_URL = os.environ.get('FRONTEND_URL')
    FLASK_ENV = os.environ.get('FLASK_ENV')
    TESTING = True


class ProductionConfig(BaseConfig):
    load_dotenv(dotenv_path="/backend/api/.env.prod", override=True)

    FLASK_ASYNC_MODE = os.environ.get('FLASK_ASYNC_MODE', 'gevent')
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')
    FRONTEND_URL = os.environ.get('FRONTEND_URL')
    FLASK_ENV = os.environ.get('FLASK_ENV')
    API_MAIN_ENTRYPOINT = os.environ.get('API_MAIN_ENTRYPOINT')
    DEBUG = False
    SQL_ALCHEMY_ECHO = False
