from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from models.models import Client
from schemas.schemas import ClientCreate, ClientRead
from models.database import get_session
from auth.auth import get_current_user

router = APIRouter(prefix="/clients", tags=["Clients"])

@router.post("/", response_model=ClientRead)
def create_client(client: ClientCreate, session: Session = Depends(get_session), user=Depends(get_current_user)):
    new_client = Client(**client.dict())
    session.add(new_client)
    session.commit()
    session.refresh(new_client)
    return new_client

@router.get("/", response_model=list[ClientRead])
def list_clients(session: Session = Depends(get_session), user=Depends(get_current_user)):
    return session.exec(select(Client)).all()

@router.get("/{client_id}", response_model=ClientRead)
def get_client(client_id: int, session: Session = Depends(get_session), user=Depends(get_current_user)):
    client = session.get(Client, client_id)
    if not client:
        raise HTTPException(status_code=404, detail="Client not found")
    return client

@router.put("/{client_id}", response_model=ClientRead)
def update_client(client_id: int, client: ClientCreate, session: Session = Depends(get_session), user=Depends(get_current_user)):
    db_client = session.get(Client, client_id)
    if not db_client:
        raise HTTPException(status_code=404, detail="Client not found")
    for key, value in client.dict().items():
        setattr(db_client, key, value)
    session.commit()
    session.refresh(db_client)
    return db_client

@router.delete("/{client_id}")
def delete_client(client_id: int, session: Session = Depends(get_session), user=Depends(get_current_user)):
    db_client = session.get(Client, client_id)
    if not db_client:
        raise HTTPException(status_code=404, detail="Client not found")
    session.delete(db_client)
    session.commit()
    return {"ok": True}
