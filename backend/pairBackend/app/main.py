from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import rooms, autocomplete
from app.websocket_manager import router as ws_router
from app.database import database, engine, metadata

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(rooms.router)
app.include_router(autocomplete.router)
app.include_router(ws_router)

# ---------- FIXED STARTUP ----------
@app.on_event("startup")
async def startup():
    # Create tables if not exist
    metadata.create_all(engine)
    # Connect to database
    await database.connect()

# ---------- SHUTDOWN ----------
@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()

@app.get("/")
def home():
    return {"message": "Backend is running!"}
