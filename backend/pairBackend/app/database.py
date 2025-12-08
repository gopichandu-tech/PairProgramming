from sqlalchemy import create_engine, MetaData
from databases import Database
from app import models
import os

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:gopi%40123@localhost:5432/postgres")

database = Database(DATABASE_URL)
metadata = MetaData()

engine = create_engine(DATABASE_URL)
metadata.create_all(engine)

