from sqlalchemy import MetaData
from sqlalchemy.ext.asyncio import create_async_engine
from databases import Database
import os

# Read environment variable or use local DB (password URL encoded)
db_url = os.getenv(
    "DATABASE_URL",
    "postgresql+asyncpg://postgres:gopi%40123@localhost:5432/postgres"
)

# Convert "postgres://" to async-compatible
if db_url.startswith("postgres://"):
    db_url = db_url.replace("postgres://", "postgresql+asyncpg://", 1)

DATABASE_URL = db_url

# ASYNC database instance for FastAPI
database = Database(DATABASE_URL)

# SQLAlchemy metadata + async engine
metadata = MetaData()
engine = create_async_engine(DATABASE_URL, echo=False)
