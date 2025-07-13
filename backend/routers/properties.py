from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from models.models import Property
from schemas.schemas import PropertyCreate, PropertyRead
from models.database import get_session
from auth.auth import get_current_user

router = APIRouter(prefix="/properties", tags=["Properties"])

@router.post("/", response_model=PropertyRead)
def create_property(property: PropertyCreate, session: Session = Depends(get_session), user=Depends(get_current_user)):
    new_property = Property(**property.dict())
    session.add(new_property)
    session.commit()
    session.refresh(new_property)
    return new_property

@router.get("/", response_model=list[PropertyRead])
def list_properties(session: Session = Depends(get_session), user=Depends(get_current_user)):
    return session.exec(select(Property)).all()

@router.get("/{property_id}", response_model=PropertyRead)
def get_property(property_id: int, session: Session = Depends(get_session), user=Depends(get_current_user)):
    property = session.get(Property, property_id)
    if not property:
        raise HTTPException(status_code=404, detail="Property not found")
    return property

@router.put("/{property_id}", response_model=PropertyRead)
def update_property(property_id: int, property: PropertyCreate, session: Session = Depends(get_session), user=Depends(get_current_user)):
    db_property = session.get(Property, property_id)
    if not db_property:
        raise HTTPException(status_code=404, detail="Property not found")
    for key, value in property.dict().items():
        setattr(db_property, key, value)
    session.commit()
    session.refresh(db_property)
    return db_property

@router.delete("/{property_id}")
def delete_property(property_id: int, session: Session = Depends(get_session), user=Depends(get_current_user)):
    db_property = session.get(Property, property_id)
    if not db_property:
        raise HTTPException(status_code=404, detail="Property not found")
    session.delete(db_property)
    session.commit()
    return {"ok": True}
