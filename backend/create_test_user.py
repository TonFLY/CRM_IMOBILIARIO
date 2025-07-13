"""
Script para criar um usuário de teste no CRM
Execute este script para ter credenciais de login para testar o sistema
"""
import sys
import os
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from models.database import get_session, create_db_and_tables
from models.models import User
from auth.auth import get_password_hash
from sqlmodel import Session

def create_test_user():
    """Cria um usuário de teste para login"""
    create_db_and_tables()
    
    # Dados do usuário de teste
    test_username = "admin"
    test_email = "admin@crm.com"
    test_password = "123456"
    
    with Session(bind=get_session().__next__().bind) as session:
        # Verifica se o usuário já existe
        from sqlmodel import select
        existing_user = session.exec(select(User).where(User.username == test_username)).first()
        
        if existing_user:
            print(f"✅ Usuário '{test_username}' já existe!")
        else:
            # Cria o usuário
            hashed_password = get_password_hash(test_password)
            test_user = User(
                username=test_username,
                email=test_email,
                hashed_password=hashed_password,
                is_active=True
            )
            
            session.add(test_user)
            session.commit()
            session.refresh(test_user)
            print(f"✅ Usuário de teste criado com sucesso!")
    
    print("\n" + "="*50)
    print("🔑 CREDENCIAIS DE TESTE:")
    print("="*50)
    print(f"Usuário: {test_username}")
    print(f"Senha: {test_password}")
    print(f"Email: {test_email}")
    print("="*50)
    print("\n🌐 Acesse: http://localhost:5173/login")
    print("🚀 API: http://localhost:8000/docs")

if __name__ == "__main__":
    create_test_user()
