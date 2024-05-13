import enum

from flask_login import UserMixin
from sqlalchemy import Enum
from sqlalchemy.sql import func
from werkzeug.security import generate_password_hash, check_password_hash

from api.db import db
from api.models.base_model import BaseModel
from api.util.converters import convert_sql_type_to_json


class UserRole(enum.Enum):
    USER = 'user'
    ADMIN = 'admin'


class UserModel(UserMixin, BaseModel):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True,
                   nullable=False, autoincrement=True)
    username = db.Column(db.String(100), index=True,
                         unique=True, nullable=False)
    password_hash = db.Column(db.String(300), nullable=False)
    role = db.Column(Enum(UserRole), default=UserRole.USER, nullable=False)
    created_at = db.Column(db.DateTime, default=func.now(), nullable=False)
    failed_login_attempts = db.Column(db.Integer, nullable=False, default=0)
    # nullable=True smart?
    updated_at = db.Column(db.DateTime, onupdate=func.now(), nullable=True)
    last_login = db.Column(db.DateTime, nullable=True)
    confirmed_on = db.Column(db.DateTime, nullable=True)

    def __init__(self, username: str, **kwargs):
        super(UserModel, self).__init__(username=username, **kwargs)

    def set_password(self, password):
        self.password_hash = generate_password_hash(
            password, method='pbkdf2:sha256:150000')

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'role': self.role.name,
        }

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()

    def update_last_login(self):
        self.last_login = func.now()
        db.session.commit()

    @classmethod
    def find_by_id(cls, _id):
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def find_by_username(cls, username):
        return cls.query.filter_by(username=username).first()
