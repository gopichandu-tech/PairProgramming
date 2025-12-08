from fastapi import APIRouter
from app.services.room_service import create_room

router = APIRouter(prefix="/rooms", tags=["Rooms"])

@router.post("")
async def create_room_endpoint():
    room_id = await create_room()
    return {"roomId": room_id}
