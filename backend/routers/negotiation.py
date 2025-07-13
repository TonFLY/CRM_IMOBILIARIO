from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from models.models import Negotiation
from schemas.schemas import NegotiationCreate, NegotiationRead
from models.database import get_session
from auth.auth import get_current_user
from datetime import datetime

router = APIRouter(prefix="/negotiations", tags=["Negotiations"])

@router.post("/", response_model=NegotiationRead)
def create_negotiation(negotiation: NegotiationCreate, session: Session = Depends(get_session), user=Depends(get_current_user)):
    new_negotiation = Negotiation(**negotiation.dict(), created_at=datetime.utcnow().isoformat(), status=negotiation.status)
    session.add(new_negotiation)
    session.commit()
    session.refresh(new_negotiation)
    return new_negotiation

@router.get("/", response_model=list[NegotiationRead])
def list_negotiations(session: Session = Depends(get_session), user=Depends(get_current_user)):
    return session.exec(select(Negotiation)).all()

@router.get("/{negotiation_id}", response_model=NegotiationRead)
def get_negotiation(negotiation_id: int, session: Session = Depends(get_session), user=Depends(get_current_user)):
    negotiation = session.get(Negotiation, negotiation_id)
    if not negotiation:
        raise HTTPException(status_code=404, detail="Negotiation not found")
    return negotiation

@router.put("/{negotiation_id}", response_model=NegotiationRead)
def update_negotiation(negotiation_id: int, negotiation: NegotiationCreate, session: Session = Depends(get_session), user=Depends(get_current_user)):
    db_negotiation = session.get(Negotiation, negotiation_id)
    if not db_negotiation:
        raise HTTPException(status_code=404, detail="Negotiation not found")
    for key, value in negotiation.dict().items():
        setattr(db_negotiation, key, value)
    db_negotiation.updated_at = datetime.utcnow().isoformat()
    session.commit()
    session.refresh(db_negotiation)
    return db_negotiation

@router.delete("/{negotiation_id}")
def delete_negotiation(negotiation_id: int, session: Session = Depends(get_session), user=Depends(get_current_user)):
    db_negotiation = session.get(Negotiation, negotiation_id)
    if not db_negotiation:
        raise HTTPException(status_code=404, detail="Negotiation not found")
    session.delete(db_negotiation)
    session.commit()
    return {"ok": True}
