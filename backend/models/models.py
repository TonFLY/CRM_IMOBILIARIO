from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime

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
    """
    Modelo para agendamento de visitas a imóveis.
    
    Representa o agendamento de uma visita entre um cliente e um imóvel,
    incluindo data/hora, status da visita e observações.
    """
    id: Optional[int] = Field(default=None, primary_key=True)
    client_id: int = Field(foreign_key="client.id", description="ID do cliente que fará a visita")
    property_id: int = Field(foreign_key="property.id", description="ID do imóvel a ser visitado")
    scheduled_datetime: str = Field(description="Data e hora agendada para a visita (YYYY-MM-DD HH:MM)")
    status: str = Field(default="Agendada", description="Status da visita: Agendada, Realizada, Cancelada, Reagendada")
    notes: Optional[str] = Field(default=None, description="Observações sobre a visita")
    created_at: str = Field(default_factory=lambda: datetime.now().isoformat(), description="Data de criação do agendamento")
    updated_at: Optional[str] = Field(default=None, description="Data da última atualização")
    
    # Campos opcionais para melhor controle
    duration_minutes: Optional[int] = Field(default=60, description="Duração estimada da visita em minutos")
    agent_notes: Optional[str] = Field(default=None, description="Notas internas do corretor")
    client_feedback: Optional[str] = Field(default=None, description="Feedback do cliente após a visita")

class Negotiation(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    client_id: int = Field(foreign_key="client.id")
    property_id: int = Field(foreign_key="property.id")
    status: str # Novo, Em contato, Visita, Proposta, Fechado, Perdido
    created_at: str
    updated_at: Optional[str] = None
