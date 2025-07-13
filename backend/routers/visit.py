from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from models.models import Visit
from schemas.schemas import VisitCreate, VisitRead
from models.database import get_session
from auth.auth import get_current_user

router = APIRouter(prefix="/visits", tags=["Visits"])

@router.post("/", response_model=VisitRead)
def create_visit(visit: VisitCreate, session: Session = Depends(get_session), user=Depends(get_current_user)):
    new_visit = Visit(**visit.dict())
    session.add(new_visit)
    session.commit()
    session.refresh(new_visit)
    return new_visit

@router.get("/", response_model=list[VisitRead])
def list_visits(session: Session = Depends(get_session), user=Depends(get_current_user)):
    return session.exec(select(Visit)).all()

@router.get("/{visit_id}", response_model=VisitRead)
def get_visit(visit_id: int, session: Session = Depends(get_session), user=Depends(get_current_user)):
    visit = session.get(Visit, visit_id)
    if not visit:
        raise HTTPException(status_code=404, detail="Visit not found")
    return visit

@router.put("/{visit_id}", response_model=VisitRead)
def update_visit(visit_id: int, visit: VisitCreate, session: Session = Depends(get_session), user=Depends(get_current_user)):
    db_visit = session.get(Visit, visit_id)
    if not db_visit:
        raise HTTPException(status_code=404, detail="Visit not found")
    for key, value in visit.dict().items():
        setattr(db_visit, key, value)
    session.commit()
    session.refresh(db_visit)
    return db_visit

@router.delete("/{visit_id}")
def delete_visit(visit_id: int, session: Session = Depends(get_session), user=Depends(get_current_user)):
    db_visit = session.get(Visit, visit_id)
    if not db_visit:
        raise HTTPException(status_code=404, detail="Visit not found")
    session.delete(db_visit)
    session.commit()
    return {"ok": True}
