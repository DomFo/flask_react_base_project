import enum
from datetime import datetime
from typing import Type


def convert_sql_type_to_json(value):
    if isinstance(value, datetime):
        return value.isoformat()
    elif isinstance(value, enum.Enum):
        return value.name
    else:
        return value


def string_to_enum(enum_class: Type[enum.Enum], string: str):
    try:
        return enum_class(string.lower())
    except ValueError:
        raise ValueError(f"{string} is not a valid {enum_class.__name__}")
