from typing import TypeVar, Generic, Optional

from api.db import db

T = TypeVar('T', bound='BaseModel')


class BaseModel(db.Model, Generic[T]):
    __abstract__ = True

    # Instance methods
    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def delete_from_db(self):
        db.session.delete(self)
        db.session.commit()

    # Class methods
    @classmethod
    def find_by_id(cls, _id: int) -> Optional[T]:
        return cls.query.filter_by(id=_id).first()

    @classmethod
    def find_all(cls) -> Optional[list[T]]:
        return cls.query.all()
