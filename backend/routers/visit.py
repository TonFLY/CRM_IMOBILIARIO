from fastapi import APIRouter, Depends, HTTPException, Query
from sqlmodel import Session, select, and_, or_
from typing import Optional, List
from datetime import datetime, timedelta
from models.models import Visit, Client, Property
from schemas.schemas import VisitCreate, VisitRead, VisitUpdate
from models.database import get_session
from auth.auth import get_current_user

router = APIRouter(prefix="/visits", tags=["Visits"])

@router.post("/", response_model=VisitRead)
def create_visit(
    visit: VisitCreate, 
    session: Session = Depends(get_session), 
    user=Depends(get_current_user)
):
    """
    Cria uma nova visita agendada.
    
    Valida se o cliente e imóvel existem antes de criar a visita.
    Adiciona timestamp de criação automaticamente.
    """
    # Verifica se cliente existe
    client = session.get(Client, visit.client_id)
    if not client:
        raise HTTPException(status_code=404, detail="Cliente não encontrado")
    
    # Verifica se imóvel existe
    property_obj = session.get(Property, visit.property_id)
    if not property_obj:
        raise HTTPException(status_code=404, detail="Imóvel não encontrado")
    
    # Verifica conflitos de horário (opcional - para evitar duplo agendamento)
    existing_visit = session.exec(
        select(Visit).where(
            and_(
                Visit.scheduled_datetime == visit.scheduled_datetime,
                Visit.status.in_(["Agendada", "Reagendada"])
            )
        )
    ).first()
    
    if existing_visit:
        raise HTTPException(
            status_code=400, 
            detail="Já existe uma visita agendada para este horário"
        )
    
    # Cria a visita
    visit_data = visit.dict()
    visit_data["created_at"] = datetime.now().isoformat()
    
    new_visit = Visit(**visit_data)
    session.add(new_visit)
    session.commit()
    session.refresh(new_visit)
    
    # Retorna com dados enriquecidos
    return enrich_visit_data(new_visit, session)

@router.get("/", response_model=List[VisitRead])
def list_visits(
    status: Optional[str] = Query(None, description="Filtrar por status: Agendada, Realizada, Cancelada, Reagendada"),
    client_id: Optional[int] = Query(None, description="Filtrar por ID do cliente"),
    property_id: Optional[int] = Query(None, description="Filtrar por ID do imóvel"),
    date_from: Optional[str] = Query(None, description="Data início (YYYY-MM-DD)"),
    date_to: Optional[str] = Query(None, description="Data fim (YYYY-MM-DD)"),
    limit: int = Query(100, ge=1, le=1000, description="Limite de resultados"),
    offset: int = Query(0, ge=0, description="Offset para paginação"),
    session: Session = Depends(get_session), 
    user=Depends(get_current_user)
):
    """
    Lista visitas com filtros opcionais.
    
    Permite filtrar por status, cliente, imóvel, período de datas.
    Suporta paginação com limit e offset.
    """
    query = select(Visit)
    
    # Aplica filtros
    if status:
        query = query.where(Visit.status == status)
    
    if client_id:
        query = query.where(Visit.client_id == client_id)
    
    if property_id:
        query = query.where(Visit.property_id == property_id)
    
    if date_from:
        query = query.where(Visit.scheduled_datetime >= date_from)
    
    if date_to:
        # Adiciona 23:59:59 para incluir o dia todo
        end_date = f"{date_to} 23:59:59"
        query = query.where(Visit.scheduled_datetime <= end_date)
    
    # Ordena por data agendada (mais recentes primeiro)
    query = query.order_by(Visit.scheduled_datetime.desc())
    
    # Aplica paginação
    query = query.offset(offset).limit(limit)
    
    visits = session.exec(query).all()
    
    # Enriquece com dados relacionados
    return [enrich_visit_data(visit, session) for visit in visits]

@router.get("/calendar", response_model=List[VisitRead])
def get_calendar_visits(
    month: int = Query(..., ge=1, le=12, description="Mês (1-12)"),
    year: int = Query(..., ge=2020, le=2030, description="Ano"),
    session: Session = Depends(get_session), 
    user=Depends(get_current_user)
):
    """
    Retorna visitas de um mês específico para exibição em calendário.
    
    Útil para criar visualizações de calendário no frontend.
    """
    # Calcula primeiro e último dia do mês
    first_day = f"{year}-{month:02d}-01 00:00:00"
    
    if month == 12:
        next_month = f"{year+1}-01-01 00:00:00"
    else:
        next_month = f"{year}-{month+1:02d}-01 00:00:00"
    
    query = select(Visit).where(
        and_(
            Visit.scheduled_datetime >= first_day,
            Visit.scheduled_datetime < next_month,
            Visit.status.in_(["Agendada", "Reagendada"])  # Apenas visitas ativas
        )
    ).order_by(Visit.scheduled_datetime)
    
    visits = session.exec(query).all()
    return [enrich_visit_data(visit, session) for visit in visits]

@router.get("/today", response_model=List[VisitRead])
def get_today_visits(
    session: Session = Depends(get_session), 
    user=Depends(get_current_user)
):
    """
    Retorna visitas agendadas para hoje.
    
    Útil para dashboard e visualização rápida do dia.
    """
    today = datetime.now().date()
    start_of_day = f"{today} 00:00:00"
    end_of_day = f"{today} 23:59:59"
    
    query = select(Visit).where(
        and_(
            Visit.scheduled_datetime >= start_of_day,
            Visit.scheduled_datetime <= end_of_day,
            Visit.status.in_(["Agendada", "Reagendada"])
        )
    ).order_by(Visit.scheduled_datetime)
    
    visits = session.exec(query).all()
    return [enrich_visit_data(visit, session) for visit in visits]

@router.get("/{visit_id}", response_model=VisitRead)
def get_visit(
    visit_id: int, 
    session: Session = Depends(get_session), 
    user=Depends(get_current_user)
):
    """
    Retorna detalhes de uma visita específica.
    
    Inclui dados relacionados do cliente e imóvel.
    """
    visit = session.get(Visit, visit_id)
    if not visit:
        raise HTTPException(status_code=404, detail="Visita não encontrada")
    
    return enrich_visit_data(visit, session)

@router.put("/{visit_id}", response_model=VisitRead)
def update_visit(
    visit_id: int, 
    visit_update: VisitUpdate, 
    session: Session = Depends(get_session), 
    user=Depends(get_current_user)
):
    """
    Atualiza uma visita existente.
    
    Permite atualizar qualquer campo exceto IDs de cliente e imóvel.
    Atualiza timestamp de modificação automaticamente.
    """
    db_visit = session.get(Visit, visit_id)
    if not db_visit:
        raise HTTPException(status_code=404, detail="Visita não encontrada")
    
    # Atualiza apenas campos fornecidos
    update_data = visit_update.dict(exclude_unset=True)
    
    for key, value in update_data.items():
        setattr(db_visit, key, value)
    
    # Atualiza timestamp
    db_visit.updated_at = datetime.now().isoformat()
    
    session.commit()
    session.refresh(db_visit)
    
    return enrich_visit_data(db_visit, session)

@router.patch("/{visit_id}/status")
def update_visit_status(
    visit_id: int,
    status: str = Query(..., description="Novo status: Agendada, Realizada, Cancelada, Reagendada"),
    session: Session = Depends(get_session), 
    user=Depends(get_current_user)
):
    """
    Atualiza apenas o status de uma visita.
    
    Endpoint simplificado para mudanças rápidas de status.
    """
    valid_statuses = ["Agendada", "Realizada", "Cancelada", "Reagendada"]
    if status not in valid_statuses:
        raise HTTPException(
            status_code=400, 
            detail=f"Status inválido. Use: {', '.join(valid_statuses)}"
        )
    
    db_visit = session.get(Visit, visit_id)
    if not db_visit:
        raise HTTPException(status_code=404, detail="Visita não encontrada")
    
    db_visit.status = status
    db_visit.updated_at = datetime.now().isoformat()
    
    session.commit()
    
    return {"message": f"Status atualizado para: {status}"}

@router.delete("/{visit_id}")
def delete_visit(
    visit_id: int, 
    session: Session = Depends(get_session), 
    user=Depends(get_current_user)
):
    """
    Exclui uma visita.
    
    Remove permanentemente do banco de dados.
    """
    db_visit = session.get(Visit, visit_id)
    if not db_visit:
        raise HTTPException(status_code=404, detail="Visita não encontrada")
    
    session.delete(db_visit)
    session.commit()
    
    return {"message": "Visita excluída com sucesso"}

@router.get("/statistics/summary")
def get_visit_statistics(
    session: Session = Depends(get_session), 
    user=Depends(get_current_user)
):
    """
    Retorna estatísticas resumidas das visitas.
    
    Útil para dashboards e relatórios.
    """
    total_visits = len(session.exec(select(Visit)).all())
    
    # Visitas por status
    agendadas = len(session.exec(select(Visit).where(Visit.status == "Agendada")).all())
    realizadas = len(session.exec(select(Visit).where(Visit.status == "Realizada")).all())
    canceladas = len(session.exec(select(Visit).where(Visit.status == "Cancelada")).all())
    
    # Visitas hoje
    today = datetime.now().date()
    start_of_day = f"{today} 00:00:00"
    end_of_day = f"{today} 23:59:59"
    
    hoje = len(session.exec(
        select(Visit).where(
            and_(
                Visit.scheduled_datetime >= start_of_day,
                Visit.scheduled_datetime <= end_of_day
            )
        )
    ).all())
    
    return {
        "total_visitas": total_visits,
        "agendadas": agendadas,
        "realizadas": realizadas,
        "canceladas": canceladas,
        "visitas_hoje": hoje,
        "taxa_realizacao": round((realizadas / total_visits * 100), 2) if total_visits > 0 else 0
    }

def enrich_visit_data(visit: Visit, session: Session) -> VisitRead:
    """
    Função auxiliar para enriquecer dados da visita com informações relacionadas.
    
    Adiciona nome do cliente, telefone e dados do imóvel.
    """
    # Busca dados do cliente
    client = session.get(Client, visit.client_id)
    
    # Busca dados do imóvel
    property_obj = session.get(Property, visit.property_id)
    
    # Cria o objeto de resposta
    visit_data = {
        "id": visit.id,
        "client_id": visit.client_id,
        "property_id": visit.property_id,
        "scheduled_datetime": visit.scheduled_datetime,
        "status": visit.status,
        "notes": visit.notes,
        "created_at": visit.created_at,
        "updated_at": visit.updated_at,
        "duration_minutes": visit.duration_minutes,
        "agent_notes": visit.agent_notes,
        "client_feedback": visit.client_feedback,
        "client_name": client.name if client else None,
        "client_phone": client.phone if client else None,
        "property_location": property_obj.location if property_obj else None,
        "property_type": property_obj.type if property_obj else None,
    }
    
    return VisitRead(**visit_data)
