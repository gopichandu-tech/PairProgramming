from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from  backend.pairBackend.app.routers import rooms, autocomplete
from  backend.pairBackend.app.websocket_manager import router as ws_router
from  backend.pairBackend.app.database import database, engine, metadata

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://pair-programming-pxank74oq-gopichandutechs-projects.vercel.app",
        "https://pair-programming.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(rooms.router)
app.include_router(autocomplete.router)
app.include_router(ws_router)

# ---------- FIXED STARTUP (ASYNC SAFE) ----------
@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(metadata.create_all)

    await database.connect()

# ---------- SHUTDOWN ----------
@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()


@app.get("/")
def home():
    return {"message": "Backend is running!"}
