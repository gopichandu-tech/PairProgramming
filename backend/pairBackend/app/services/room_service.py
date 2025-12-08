import uuid
from app.models import rooms
from app.database import database

async def create_room() -> str:
    room_id = uuid.uuid4().hex[:8]
    query = rooms.insert().values(id=room_id, code="")
    await database.execute(query)
    return room_id

async def get_room_code(room_id: str) -> str:
    query = rooms.select().where(rooms.c.id == room_id)
    room = await database.fetch_one(query)
    return room["code"] if room else ""

async def update_room_code(room_id: str, code: str):
    query = rooms.update().where(rooms.c.id == room_id).values(code=code)
    await database.execute(query)
