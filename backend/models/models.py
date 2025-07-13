from sqlmodel import SQLModel, Field
from typing import Optional

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str = Field(index=True, unique=True)
    email: str = Field(index=True, unique=True)
    hashed_password: str
    is_active: bool = Field(default=True)

class Property(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    type: str
    location: str
    value: float
    description: Optional[str] = None
    status: str

class Client(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    phone: str
    email: str
    interest_type: str
    status: str = Field(default="Lead")
    preferences: Optional[str] = None

class Visit(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    client_id: int = Field(foreign_key="client.id")
    property_id: int = Field(foreign_key="property.id")
    datetime: str
    notes: Optional[str] = None

class Negotiation(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    client_id: int = Field(foreign_key="client.id")
    property_id: int = Field(foreign_key="property.id")
    status: str # Novo, Em contato, Visita, Proposta, Fechado, Perdido
    created_at: str
    updated_at: Optional[str] = None
