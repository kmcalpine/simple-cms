from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic.error_wrappers import ValidationError
from starlette.middleware.base import BaseHTTPMiddleware, RequestResponseEndpoint
from starlette.requests import Request
from starlette.responses import StreamingResponse, Response

from .api import api_router
from .database.db import engine, sessionmaker
from .database.manage import init_database

app = FastAPI()


@app.exception_handler
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


class ExceptionMiddleware(BaseHTTPMiddleware):
    async def dispatch(
        self, request: Request, call_next: RequestResponseEndpoint
    ) -> StreamingResponse:
        try:
            response = await call_next(request)

        except ValidationError as e:
            response = JSONResponse(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                content={"detail": e.errors()},
            )
        except ValueError as e:
            print(2)
            response = JSONResponse(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                content={
                    "detail": [
                        {"msg": "Unknown", "loc": ["Unknown"], "type": "Unknown"}
                    ]
                },
            )
        except Exception as e:
            print(3)
            response = JSONResponse(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                content={
                    "detail": [
                        {"msg": "Unknown", "loc": ["Unknown"], "type": "Unknown"}
                    ]
                },
            )
        print(response.headers)
        return response


app.add_middleware(ExceptionMiddleware)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
)

app.include_router(api_router)

init_database(engine=engine)
