import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  getVisits, 
  getTodayVisits, 
  getVisitStatistics, 
  updateVisitStatus, 
  deleteVisit,
  formatVisitDateTime,
  formatDuration,
  getVisitStatusColor,
  isVisitToday,
  isVisitPast
} from '../services/api';
import type { Visit, VisitFilter, VisitStatistics } from '../types';

export const VisitsPage: React.FC = () => {
  const navigate = useNavigate();
  
  // Estados
  const [visits, setVisits] = useState<Visit[]>([]);
  const [todayVisits, setTodayVisits] = useState<Visit[]>([]);
  const [statistics, setStatistics] = useState<VisitStatistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Estados para filtros
  const [filters, setFilters] = useState<VisitFilter>({
    status: '',
    date_from: '',
    date_to: '',
    limit: 50
  });
  
  // Estados para UI
  const [showFilters, setShowFilters] = useState(false);
  const [selectedView, setSelectedView] = useState<'all' | 'today' | 'calendar'>('today');

  // Carrega dados iniciais
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        
        // Carrega em paralelo para melhor performance
        const [todayData, statsData] = await Promise.all([
          getTodayVisits(),
          getVisitStatistics()
        ]);
        
        setTodayVisits(todayData);
        setStatistics(statsData);
        
        // Se não há visitas hoje, mostra todas
        if (todayData.length === 0 && selectedView === 'today') {
          const allVisits = await getVisits({ limit: 20 });
          setVisits(allVisits);
        }
        
      } catch (err) {
        setError('Erro ao carregar dados das visitas');
        console.error('Erro ao carregar visitas:', err);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, [selectedView]);

  // Carrega visitas quando filtros mudam
  useEffect(() => {
    const loadVisits = async () => {
      try {
        setLoading(true);
        const data = await getVisits(filters);
        setVisits(data);
      } catch (err) {
        setError('Erro ao carregar visitas');
        console.error('Erro ao carregar visitas:', err);
      } finally {
        setLoading(false);
      }
    };

    if (selectedView === 'all') {
      loadVisits();
    }
  }, [filters, selectedView]);

  const handleStatusChange = async (visitId: number, newStatus: string) => {
    try {
      await updateVisitStatus(visitId, newStatus);
      
      // Atualiza localmente
      setVisits(prev => prev.map(visit => 
        visit.id === visitId 
          ? { ...visit, status: newStatus, updated_at: new Date().toISOString() }
          : visit
      ));
      
      setTodayVisits(prev => prev.map(visit => 
        visit.id === visitId 
          ? { ...visit, status: newStatus, updated_at: new Date().toISOString() }
          : visit
      ));
      
      // Recarrega estatísticas
      const statsData = await getVisitStatistics();
      setStatistics(statsData);
      
    } catch (err) {
      setError('Erro ao atualizar status da visita');
      console.error('Erro ao atualizar status:', err);
    }
  };

  const handleDeleteVisit = async (visitId: number) => {
    if (!confirm('Tem certeza que deseja excluir esta visita?')) {
      return;
    }
    
    try {
      await deleteVisit(visitId);
      
      // Remove localmente
      setVisits(prev => prev.filter(visit => visit.id !== visitId));
      setTodayVisits(prev => prev.filter(visit => visit.id !== visitId));
      
      // Recarrega estatísticas
      const statsData = await getVisitStatistics();
      setStatistics(statsData);
      
    } catch (err) {
      setError('Erro ao excluir visita');
      console.error('Erro ao excluir visita:', err);
    }
  };

  const handleFilterChange = (key: keyof VisitFilter, value: string | number) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      status: '',
      date_from: '',
      date_to: '',
      limit: 50
    });
  };

  const renderVisitCard = (visit: Visit) => {
    const isToday = isVisitToday(visit.scheduled_datetime);
    const isPast = isVisitPast(visit.scheduled_datetime);
    const statusColor = getVisitStatusColor(visit.status);
    
    return (
      <div key={visit.id} className={`visit-card ${isToday ? 'visit-card--today' : ''} ${isPast ? 'visit-card--past' : ''}`}>
        {/* Header do card */}
        <div className="visit-card__header">
          <div className="visit-card__datetime">
            <span className="visit-datetime">
              📅 {formatVisitDateTime(visit.scheduled_datetime)}
            </span>
            <span className="visit-duration">
              ⏱️ {formatDuration(visit.duration_minutes)}
            </span>
          </div>
          <div className="visit-card__status">
            <span 
              className="status-badge" 
              style={{ backgroundColor: statusColor }}
            >
              {visit.status}
            </span>
          </div>
        </div>

        {/* Informações principais */}
        <div className="visit-card__content">
          <div className="visit-info">
            <div className="client-info">
              <h3 className="client-name">👤 {visit.client_name}</h3>
              <p className="client-phone">📞 {visit.client_phone}</p>
            </div>
            
            <div className="property-info">
              <h4 className="property-type">🏠 {visit.property_type}</h4>
              <p className="property-location">📍 {visit.property_location}</p>
            </div>
          </div>

          {visit.notes && (
            <div className="visit-notes">
              <p><strong>Observações:</strong> {visit.notes}</p>
            </div>
          )}

          {visit.agent_notes && (
            <div className="agent-notes">
              <p><strong>Notas do Corretor:</strong> {visit.agent_notes}</p>
            </div>
          )}
        </div>

        {/* Ações */}
        <div className="visit-card__actions">
          <div className="status-actions">
            <select 
              value={visit.status} 
              onChange={(e) => handleStatusChange(visit.id, e.target.value)}
              className="status-select"
            >
              <option value="Agendada">Agendada</option>
              <option value="Realizada">Realizada</option>
              <option value="Cancelada">Cancelada</option>
              <option value="Reagendada">Reagendada</option>
            </select>
          </div>
          
          <div className="card-actions">
            <button 
              onClick={() => navigate(`/visits/${visit.id}`)}
              className="btn btn-sm btn-primary"
            >
              Ver Detalhes
            </button>
            <button 
              onClick={() => navigate(`/visits/${visit.id}/edit`)}
              className="btn btn-sm btn-secondary"
            >
              Editar
            </button>
            <button 
              onClick={() => handleDeleteVisit(visit.id)}
              className="btn btn-sm btn-danger"
            >
              Excluir
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderStatistics = () => {
    if (!statistics) return null;

    return (
      <div className="statistics-container">
        <h2>📊 Estatísticas de Visitas</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{statistics.total_visitas}</div>
            <div className="stat-label">Total de Visitas</div>
          </div>
          <div className="stat-card stat-card--primary">
            <div className="stat-value">{statistics.agendadas}</div>
            <div className="stat-label">Agendadas</div>
          </div>
          <div className="stat-card stat-card--success">
            <div className="stat-value">{statistics.realizadas}</div>
            <div className="stat-label">Realizadas</div>
          </div>
          <div className="stat-card stat-card--danger">
            <div className="stat-value">{statistics.canceladas}</div>
            <div className="stat-label">Canceladas</div>
          </div>
          <div className="stat-card stat-card--warning">
            <div className="stat-value">{statistics.visitas_hoje}</div>
            <div className="stat-label">Hoje</div>
          </div>
          <div className="stat-card stat-card--info">
            <div className="stat-value">{statistics.taxa_realizacao}%</div>
            <div className="stat-label">Taxa de Realização</div>
          </div>
        </div>
      </div>
    );
  };

  const renderFilters = () => {
    if (!showFilters) return null;

    return (
      <div className="filters-container">
        <h3>🔍 Filtros</h3>
        <div className="filters-grid">
          <div className="filter-group">
            <label>Status:</label>
            <select 
              value={filters.status || ''} 
              onChange={(e) => handleFilterChange('status', e.target.value)}
            >
              <option value="">Todos</option>
              <option value="Agendada">Agendada</option>
              <option value="Realizada">Realizada</option>
              <option value="Cancelada">Cancelada</option>
              <option value="Reagendada">Reagendada</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Data Início:</label>
            <input 
              type="date" 
              value={filters.date_from || ''} 
              onChange={(e) => handleFilterChange('date_from', e.target.value)}
            />
          </div>
          
          <div className="filter-group">
            <label>Data Fim:</label>
            <input 
              type="date" 
              value={filters.date_to || ''} 
              onChange={(e) => handleFilterChange('date_to', e.target.value)}
            />
          </div>
          
          <div className="filter-group">
            <label>Limite:</label>
            <select 
              value={filters.limit || 50} 
              onChange={(e) => handleFilterChange('limit', Number(e.target.value))}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        </div>
        
        <div className="filter-actions">
          <button onClick={clearFilters} className="btn btn-secondary">
            Limpar Filtros
          </button>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Carregando visitas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="page-header">
        <div className="page-title">
          <h1>📅 Gestão de Visitas</h1>
          <p>Gerencie agendamentos e acompanhe visitas a imóveis</p>
        </div>
        
        <div className="page-actions">
          <button 
            onClick={() => navigate('/visits/new')}
            className="btn btn-primary"
          >
            ➕ Nova Visita
          </button>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="btn btn-secondary"
          >
            🔍 {showFilters ? 'Ocultar' : 'Mostrar'} Filtros
          </button>
          <button 
            onClick={() => navigate('/dashboard')}
            className="btn btn-outline"
          >
            ← Voltar ao Dashboard
          </button>
        </div>
      </div>

      {error && (
        <div className="error-message">
          <p>❌ {error}</p>
          <button onClick={() => setError(null)}>✕</button>
        </div>
      )}

      {/* Estatísticas */}
      {renderStatistics()}

      {/* Filtros */}
      {renderFilters()}

      {/* Navegação de visualizações */}
      <div className="view-navigation">
        <div className="view-tabs">
          <button 
            className={`view-tab ${selectedView === 'today' ? 'view-tab--active' : ''}`}
            onClick={() => setSelectedView('today')}
          >
            📅 Hoje ({todayVisits.length})
          </button>
          <button 
            className={`view-tab ${selectedView === 'all' ? 'view-tab--active' : ''}`}
            onClick={() => setSelectedView('all')}
          >
            📋 Todas as Visitas
          </button>
          <button 
            className={`view-tab ${selectedView === 'calendar' ? 'view-tab--active' : ''}`}
            onClick={() => setSelectedView('calendar')}
          >
            🗓️ Calendário (Em breve)
          </button>
        </div>
      </div>

      {/* Lista de visitas */}
      <div className="visits-content">
        {selectedView === 'today' && (
          <div className="today-visits">
            <h2>📅 Visitas de Hoje</h2>
            {todayVisits.length === 0 ? (
              <div className="empty-state">
                <p>🎉 Nenhuma visita agendada para hoje!</p>
                <button 
                  onClick={() => navigate('/visits/new')}
                  className="btn btn-primary"
                >
                  Agendar Nova Visita
                </button>
              </div>
            ) : (
              <div className="visits-grid">
                {todayVisits.map(renderVisitCard)}
              </div>
            )}
          </div>
        )}

        {selectedView === 'all' && (
          <div className="all-visits">
            <h2>📋 Todas as Visitas</h2>
            {visits.length === 0 ? (
              <div className="empty-state">
                <p>📝 Nenhuma visita encontrada com os filtros aplicados.</p>
                <button onClick={clearFilters} className="btn btn-secondary">
                  Limpar Filtros
                </button>
              </div>
            ) : (
              <div className="visits-grid">
                {visits.map(renderVisitCard)}
              </div>
            )}
          </div>
        )}

        {selectedView === 'calendar' && (
          <div className="calendar-view">
            <h2>🗓️ Visualização em Calendário</h2>
            <div className="coming-soon">
              <p>🚧 Funcionalidade em desenvolvimento!</p>
              <p>Em breve você poderá ver as visitas em um calendário visual.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
