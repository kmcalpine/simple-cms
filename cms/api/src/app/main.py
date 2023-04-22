from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
import time

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.post("/ping")
def pong(payload: dict = Body(...)):
    print(payload)
    time.sleep(3)
    return {"ping": "pong!"}