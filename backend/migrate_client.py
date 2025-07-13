from models.database import create_db_and_tables
import sqlite3

# Conectar ao banco
conn = sqlite3.connect('crm.db')
cursor = conn.cursor()

# Adicionar as novas colunas à tabela client
try:
    cursor.execute('ALTER TABLE client ADD COLUMN status TEXT DEFAULT "Lead"')
    print('Coluna status adicionada com sucesso')
except Exception as e:
    print(f'Erro ao adicionar coluna status: {e}')

try:
    cursor.execute('ALTER TABLE client ADD COLUMN preferences TEXT')
    print('Coluna preferences adicionada com sucesso')
except Exception as e:
    print(f'Erro ao adicionar coluna preferences: {e}')

# Atualizar clientes existentes para ter status 'Lead'
cursor.execute('UPDATE client SET status = "Lead" WHERE status IS NULL OR status = ""')
print('Clientes existentes atualizados com status Lead')

conn.commit()
conn.close()
print('Migração concluída!')
