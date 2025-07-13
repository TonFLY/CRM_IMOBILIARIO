from pydantic import BaseModel, EmailStr
from typing import Optional

class UserCreate(BaseModel):
    username: str
    email: EmailStr
    password: str

class UserRead(BaseModel):
    id: int
    username: str
    email: EmailStr
    is_active: bool

class UserLogin(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class PropertyCreate(BaseModel):
    type: str
    location: str
    value: float
    description: Optional[str] = None
    status: str

class PropertyRead(BaseModel):
    id: int
    type: str
    location: str
    value: float
    description: Optional[str]
    status: str

class ClientCreate(BaseModel):
    name: str
    phone: str
    email: EmailStr
    interest_type: str
    status: str = "Lead"
    preferences: Optional[str] = None

class ClientRead(BaseModel):
    id: int
    name: str
    phone: str
    email: EmailStr
    interest_type: str
    status: str
    preferences: Optional[str]

class VisitCreate(BaseModel):
    client_id: int
    property_id: int
    datetime: str
    notes: Optional[str] = None

class VisitRead(BaseModel):
    id: int
    client_id: int
    property_id: int
    datetime: str
    notes: Optional[str]

class NegotiationCreate(BaseModel):
    client_id: int
    property_id: int
    status: str

class NegotiationRead(BaseModel):
    id: int
    client_id: int
    property_id: int
    status: str
    created_at: str
    updated_at: Optional[str]
