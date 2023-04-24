from pydantic import BaseModel

class CustomBase(BaseModel):
    class Config:
        orm_mode = True