from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api import api_router
from .database.db import engine, sessionmaker
from .database.manage import init_database
from starlette.requests import Request

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True
)

@app.middleware("http")
async def db_session_middleware(request: Request, call_next):
    try:
        session = sessionmaker(bind=engine)
        request.state.db = session()
        response = await call_next(request)
    except Exception as e:
        raise e from None
    finally:
        request.state.db.close()

    return response

app.include_router(api_router)

init_database(engine=engine)