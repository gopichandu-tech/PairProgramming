from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from  backend.pairBackend.app.services.room_service import get_room_code, update_room_code

router = APIRouter(tags=["WebSocket"])
connections = {}  # room_id → list of WebSocket connections

@router.websocket("/ws/{room_id}")
async def websocket_endpoint(websocket: WebSocket, room_id: str):
    await websocket.accept()

    if room_id not in connections:
        connections[room_id] = []

    connections[room_id].append(websocket)

    # Get current code from DB
    current_code = await get_room_code(room_id)
    await websocket.send_text(current_code)

    try:
        while True:
            data = await websocket.receive_text()

            # Update DB
            await update_room_code(room_id, data)

            # Broadcast to other clients
            for conn in connections[room_id]:
                if conn != websocket:
                    await conn.send_text(data)

    except WebSocketDisconnect:
        connections[room_id].remove(websocket)
