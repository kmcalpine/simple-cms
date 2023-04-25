from pydantic import BaseModel
from pydantic.types import conint

PrimaryKey = conint(gt=0, lt=2147483647)

class CustomBase(BaseModel):
    class Config:
        orm_mode = True