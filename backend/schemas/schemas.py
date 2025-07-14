from pydantic import BaseModel, EmailStr, validator
from typing import Optional
from datetime import datetime

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
    """
    Schema para criação de uma nova visita.
    
    Valida os dados necessários para agendar uma visita,
    incluindo validação de data/hora futura.
    """
    client_id: int
    property_id: int
    scheduled_datetime: str  # Formato: "YYYY-MM-DD HH:MM"
    status: str = "Agendada"
    notes: Optional[str] = None
    duration_minutes: Optional[int] = 60
    agent_notes: Optional[str] = None
    
    @validator('scheduled_datetime')
    def validate_datetime_format(cls, v):
        """
        Valida se a data/hora está no formato correto e é futura.
        """
        try:
            # Tenta converter para datetime para validar formato
            scheduled_dt = datetime.fromisoformat(v.replace('T', ' '))
            
            # Verifica se a data é futura (pelo menos 1 hora a partir de agora)
            now = datetime.now()
            if scheduled_dt <= now:
                raise ValueError("Data da visita deve ser futura")
                
            return v
        except ValueError as e:
            if "Data da visita deve ser futura" in str(e):
                raise e
            raise ValueError("Formato de data inválido. Use: YYYY-MM-DD HH:MM")
    
    @validator('status')
    def validate_status(cls, v):
        """
        Valida se o status é válido.
        """
        valid_statuses = ["Agendada", "Realizada", "Cancelada", "Reagendada"]
        if v not in valid_statuses:
            raise ValueError(f"Status deve ser um dos: {', '.join(valid_statuses)}")
        return v
    
    @validator('duration_minutes')
    def validate_duration(cls, v):
        """
        Valida se a duração está dentro de limites razoáveis.
        """
        if v is not None and (v < 15 or v > 480):  # 15 min a 8 horas
            raise ValueError("Duração deve estar entre 15 minutos e 8 horas")
        return v

class VisitRead(BaseModel):
    """
    Schema para leitura de dados de visita.
    
    Inclui todos os campos da visita mais dados relacionados
    do cliente e imóvel para facilitar a exibição.
    """
    id: int
    client_id: int
    property_id: int
    scheduled_datetime: str
    status: str
    notes: Optional[str]
    created_at: str
    updated_at: Optional[str]
    duration_minutes: Optional[int]
    agent_notes: Optional[str]
    client_feedback: Optional[str]
    
    # Campos calculados (serão preenchidos pela API)
    client_name: Optional[str] = None
    client_phone: Optional[str] = None
    property_location: Optional[str] = None
    property_type: Optional[str] = None

class VisitUpdate(BaseModel):
    """
    Schema para atualização de visita.
    
    Permite atualizar todos os campos exceto IDs de cliente e imóvel.
    """
    scheduled_datetime: Optional[str] = None
    status: Optional[str] = None
    notes: Optional[str] = None
    duration_minutes: Optional[int] = None
    agent_notes: Optional[str] = None
    client_feedback: Optional[str] = None
    
    @validator('scheduled_datetime')
    def validate_datetime_format(cls, v):
        if v is not None:
            try:
                datetime.fromisoformat(v.replace('T', ' '))
                return v
            except ValueError:
                raise ValueError("Formato de data inválido. Use: YYYY-MM-DD HH:MM")
        return v
    
    @validator('status')
    def validate_status(cls, v):
        if v is not None:
            valid_statuses = ["Agendada", "Realizada", "Cancelada", "Reagendada"]
            if v not in valid_statuses:
                raise ValueError(f"Status deve ser um dos: {', '.join(valid_statuses)}")
        return v

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
