# CRM SaaS Imobiliário - Backend (FastAPI)

Este backend implementa um CRM SaaS para o setor imobiliário, usando FastAPI, SQLModel, JWT, OAuth2, e segue as melhores práticas de segurança e modularização.

## Tecnologias
- Python 3.11+
- FastAPI
- SQLModel
- SQLite (dev) / PostgreSQL (prod)
- JWT + OAuth2
- Docker

## Estrutura de Pastas
- `routers/` - Rotas da API
- `schemas/` - Modelos Pydantic
- `models/` - Modelos SQLModel
- `services/` - Lógica de negócio
- `auth/` - Autenticação e tokens

## Como rodar localmente
```bash
# Crie e ative o ambiente virtual
python -m venv .venv
.venv\Scripts\activate

# Instale as dependências
pip install -r requirements.txt

# Execute o servidor
uvicorn main:app --reload
```

## Como rodar com Docker
```bash
docker build -t crm-backend .
docker run -p 8000:8000 crm-backend
```

## Documentação
- Swagger: http://localhost:8000/docs

## Segurança
- Senhas criptografadas (bcrypt)
- JWT expira em curto prazo
- Middleware de proteção de rotas
- CORS configurado
- Variáveis de ambiente para chaves e banco

## Deploy
- Produção: PostgreSQL, Gunicorn/Uvicorn, Docker

## Manutenção
- Código modular e comentado
- Fácil extensão para novos módulos

---

Para dúvidas, consulte os comentários no código ou abra uma issue.
