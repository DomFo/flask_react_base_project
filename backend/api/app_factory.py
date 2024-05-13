import os

from flask import Flask, jsonify
from flask_migrate import Migrate
from flask_restful import Api
from rq import Queue
from rq.connections import Redis

from api.config import DevelopmentConfig, TestingConfig, ProductionConfig, MigrationConfig
from api.db import db
from api.extensions import cors, server_session, login_manager
from api.logger import logger
from api.models.user import UserModel
from api.routes import register_routes

from api.dev_seed import seed_all

migrate = Migrate()


@login_manager.user_loader
def load_user(user_id):
    return db.session.get(UserModel, int(user_id))


def create_app():
    env_type = os.environ.get('ENV_TYPE', 'dev').lower()
    config_class = {
        'dev': DevelopmentConfig,
        'test': TestingConfig,
        'prod': ProductionConfig,
        'migrate': MigrationConfig,
    }.get(env_type, DevelopmentConfig)

    app = Flask(__name__)
    app.config.from_object(config_class)
    db.init_app(app)
    migrate.init_app(app, db)
    cors.init_app(app, resources={
                  r"/*": {"origins": "*"}}, supports_credentials=True)

    api = Api(app)
    register_routes(api)

    server_session.init_app(app)
    login_manager.init_app(app)
    async_mode = app.config['FLASK_ASYNC_MODE']
    logger.debug(f'async_mode: {async_mode}')

    redis_conn = Redis.from_url(app.config['RQ_REDIS_URL'])
    app.queue = Queue('default', connection=redis_conn)

    # Initialize login manager
    login_manager.init_app(app)

    @login_manager.unauthorized_handler
    def unauthorized_callback():
        return {'message': 'Unauthorized'}, 401

    with app.app_context():
        # db.drop_all()
        db.create_all()
        if config_class == DevelopmentConfig:
            seed_all()

    logger.info('# # # # # # # #')
    logger.info('App created')
    logger.info('# # # # # # # #')

    return app
