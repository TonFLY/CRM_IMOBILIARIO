"""
Script para inicializar o banco de dados
Cria todas as tabelas necessárias para o CRM
"""
from models.database import create_db_and_tables

if __name__ == "__main__":
    print("Criando tabelas do banco de dados...")
    create_db_and_tables()
    print("✅ Tabelas criadas com sucesso!")
