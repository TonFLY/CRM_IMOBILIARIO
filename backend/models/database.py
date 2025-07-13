from sqlmodel import SQLModel, create_engine, Session
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./crm.db")
engine = create_engine(DATABASE_URL, echo=True)

# Função para criar as tabelas
def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

# Função para obter sessão
def get_session():
    with Session(engine) as session:
        yield session
