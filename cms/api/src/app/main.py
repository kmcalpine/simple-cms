from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api import api_router
from .database.db import engine
from .database.manage import init_database

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(api_router)

init_database(engine=engine)