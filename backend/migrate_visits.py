"""
Script de migração para atualizar a tabela Visit com novos campos.

Este script adiciona os novos campos ao modelo Visit:
- scheduled_datetime (renomeia de datetime)
- status (novo campo)
- created_at, updated_at (timestamps)
- duration_minutes, agent_notes, client_feedback (campos extras)

Execute este script depois de atualizar o modelo Visit.
"""

import sqlite3
from datetime import datetime
import sys
import os

# Adiciona o diretório pai ao path para importar modelos
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

def migrate_visit_table():
    """
    Migra a tabela visit para a nova estrutura.
    """
    print("🔄 Iniciando migração da tabela Visit...")
    
    try:
        # Conecta ao banco
        conn = sqlite3.connect('crm.db')
        cursor = conn.cursor()
        
        # Verifica se a tabela existe
        cursor.execute("""
            SELECT name FROM sqlite_master 
            WHERE type='table' AND name='visit'
        """)
        
        if not cursor.fetchone():
            print("❌ Tabela 'visit' não existe. Execute init_db.py primeiro.")
            return False
        
        # Verifica se já tem os novos campos
        cursor.execute("PRAGMA table_info(visit)")
        columns = [column[1] for column in cursor.fetchall()]
        print(f"📋 Colunas atuais: {columns}")
        
        # Lista de colunas que devem existir
        new_columns = [
            ("status", "TEXT DEFAULT 'Agendada'"),
            ("created_at", "TEXT"),
            ("updated_at", "TEXT"),
            ("duration_minutes", "INTEGER DEFAULT 60"),
            ("agent_notes", "TEXT"),
            ("client_feedback", "TEXT")
        ]
        
        # Adiciona colunas que não existem
        for column_name, column_def in new_columns:
            if column_name not in columns:
                print(f"➕ Adicionando coluna: {column_name}")
                cursor.execute(f"ALTER TABLE visit ADD COLUMN {column_name} {column_def}")
        
        # Renomeia datetime para scheduled_datetime se necessário
        if "datetime" in columns and "scheduled_datetime" not in columns:
            print("🔄 Renomeando coluna 'datetime' para 'scheduled_datetime'...")
            
            # Cria tabela temporária com nova estrutura
            cursor.execute("""
                CREATE TABLE visit_new (
                    id INTEGER PRIMARY KEY,
                    client_id INTEGER,
                    property_id INTEGER,
                    scheduled_datetime TEXT,
                    status TEXT DEFAULT 'Agendada',
                    notes TEXT,
                    created_at TEXT,
                    updated_at TEXT,
                    duration_minutes INTEGER DEFAULT 60,
                    agent_notes TEXT,
                    client_feedback TEXT,
                    FOREIGN KEY (client_id) REFERENCES client (id),
                    FOREIGN KEY (property_id) REFERENCES property (id)
                )
            """)
            
            # Copia dados da tabela antiga
            cursor.execute("""
                INSERT INTO visit_new (
                    id, client_id, property_id, scheduled_datetime, 
                    notes, created_at, status, duration_minutes
                )
                SELECT 
                    id, client_id, property_id, datetime, 
                    notes, ?, 'Agendada', 60
                FROM visit
            """, (datetime.now().isoformat(),))
            
            # Remove tabela antiga e renomeia nova
            cursor.execute("DROP TABLE visit")
            cursor.execute("ALTER TABLE visit_new RENAME TO visit")
            
            print("✅ Coluna renomeada com sucesso!")
        
        # Atualiza registros sem created_at
        cursor.execute("""
            UPDATE visit 
            SET created_at = ? 
            WHERE created_at IS NULL
        """, (datetime.now().isoformat(),))
        
        # Commit das mudanças
        conn.commit()
        print("✅ Migração concluída com sucesso!")
        
        # Mostra estrutura final
        cursor.execute("PRAGMA table_info(visit)")
        final_columns = cursor.fetchall()
        print("\n📋 Estrutura final da tabela 'visit':")
        for col in final_columns:
            print(f"   - {col[1]} ({col[2]})")
        
        return True
        
    except Exception as e:
        print(f"❌ Erro durante a migração: {e}")
        conn.rollback()
        return False
        
    finally:
        conn.close()

def verify_migration():
    """
    Verifica se a migração foi bem-sucedida.
    """
    print("\n🔍 Verificando migração...")
    
    try:
        conn = sqlite3.connect('crm.db')
        cursor = conn.cursor()
        
        # Verifica estrutura da tabela
        cursor.execute("PRAGMA table_info(visit)")
        columns = [column[1] for column in cursor.fetchall()]
        
        required_columns = [
            'id', 'client_id', 'property_id', 'scheduled_datetime', 
            'status', 'notes', 'created_at', 'updated_at', 
            'duration_minutes', 'agent_notes', 'client_feedback'
        ]
        
        missing_columns = [col for col in required_columns if col not in columns]
        
        if missing_columns:
            print(f"❌ Colunas faltando: {missing_columns}")
            return False
        
        # Conta registros
        cursor.execute("SELECT COUNT(*) FROM visit")
        count = cursor.fetchone()[0]
        
        print(f"✅ Tabela visit migrada com sucesso!")
        print(f"📊 Total de registros: {count}")
        
        return True
        
    except Exception as e:
        print(f"❌ Erro na verificação: {e}")
        return False
        
    finally:
        conn.close()

if __name__ == "__main__":
    print("=" * 50)
    print("🏠 MIGRAÇÃO DO SISTEMA DE VISITAS - VMP CRM")
    print("=" * 50)
    
    if migrate_visit_table():
        if verify_migration():
            print("\n🎉 Migração concluída com sucesso!")
            print("Agora você pode usar o sistema de visitas atualizado.")
        else:
            print("\n❌ Falha na verificação da migração.")
    else:
        print("\n❌ Falha na migração.")
    
    print("\n" + "=" * 50)
