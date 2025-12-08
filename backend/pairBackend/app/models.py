from sqlalchemy import Table, Column, String, Text
from .database import metadata

rooms = Table(
    "rooms",
    metadata,
    Column("id", String, primary_key=True),
    Column("code", Text, default=""),
)

users = Table(
    "users",
    metadata,
    Column("id", String, primary_key=True),
    Column("name", String, nullable=True),
    Column("room_id", String),
)
