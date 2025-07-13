from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import user, properties, client, visit, negotiation
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="CRM Imobiliário SaaS", description="API para gestão imobiliária", version="1.0.0")

# CORS - Permitindo múltiplas portas para desenvolvimento
origins = [
    "http://localhost:5173",  # Porta padrão do Vite
    "http://localhost:5174",  # Porta alternativa
    "http://localhost:5175",  # Porta alternativa 2
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174", 
    "http://127.0.0.1:5175",
    os.getenv("FRONTEND_URL", "http://localhost:5173")
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(user.router)
app.include_router(properties.router)
app.include_router(client.router)
app.include_router(visit.router)
app.include_router(negotiation.router)

# Healthcheck
@app.get("/ping", tags=["Health"])
def ping():
    return {"status": "ok"}
