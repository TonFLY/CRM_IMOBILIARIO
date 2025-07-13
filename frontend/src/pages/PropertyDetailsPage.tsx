import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import type { Property } from '../types';

export const PropertyDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/properties/${id}`);
        setProperty(response.data);
        setError(null);
      } catch (error) {
        console.error('Erro ao buscar imóvel:', error);
        setError('Erro ao carregar dados do imóvel');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProperty();
    }
  }, [id]);

  const handleDelete = async () => {
    if (!property || !window.confirm('Tem certeza que deseja excluir este imóvel?')) return;
    
    try {
      await api.delete(`/properties/${property.id}`);
      navigate('/properties');
    } catch (error) {
      console.error('Erro ao excluir imóvel:', error);
      alert('Erro ao excluir imóvel');
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Carregando detalhes do imóvel...</p>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="error-container">
        <h2>Erro ao carregar imóvel</h2>
        <p>{error || 'Imóvel não encontrado'}</p>
        <button 
          className="btn btn-primary"
          onClick={() => navigate('/properties')}
        >
          ← Voltar para Lista
        </button>
      </div>
    );
  }

  return (
    <div className="property-details-page">
      <div className="page-header">
        <h1>🏠 Detalhes do Imóvel</h1>
        <div className="header-actions">
          <button 
            className="btn btn-secondary"
            onClick={() => navigate('/properties')}
          >
            ← Voltar para Lista
          </button>
          <button 
            className="btn btn-primary"
            onClick={() => navigate(`/properties/${property.id}/edit`)}
          >
            ✏️ Editar
          </button>
        </div>
      </div>

      <div className="property-details-container">
        {/* Card Principal */}
        <div className="property-main-card">
          <div className="property-header">
            <div className="property-title">
              <h2>{property.type}</h2>
              <span className={`status-badge status-${property.status.toLowerCase()}`}>
                {property.status}
              </span>
            </div>
            <div className="property-id">
              ID: #{property.id}
            </div>
          </div>

          <div className="property-details-grid">
            <div className="detail-item">
              <div className="detail-label">📍 Localização</div>
              <div className="detail-value">{property.location}</div>
            </div>

            <div className="detail-item">
              <div className="detail-label">💰 Valor</div>
              <div className="detail-value price">
                R$ {property.value.toLocaleString('pt-BR')}
              </div>
            </div>

            <div className="detail-item">
              <div className="detail-label">🏠 Tipo</div>
              <div className="detail-value">{property.type}</div>
            </div>

            <div className="detail-item">
              <div className="detail-label">📊 Status</div>
              <div className="detail-value">
                <span className={`status-badge status-${property.status.toLowerCase()}`}>
                  {property.status}
                </span>
              </div>
            </div>
          </div>

          {property.description && (
            <div className="property-description">
              <h3>📝 Descrição</h3>
              <p>{property.description}</p>
            </div>
          )}
        </div>

        {/* Ações Rápidas */}
        <div className="quick-actions-card">
          <h3>⚡ Ações Rápidas</h3>
          <div className="actions-grid">
            <button 
              className="action-btn edit"
              onClick={() => navigate(`/properties/${property.id}/edit`)}
            >
              <span className="action-icon">✏️</span>
              <span className="action-text">Editar Imóvel</span>
            </button>

            <button 
              className="action-btn visit"
              onClick={() => navigate(`/visits/new?property=${property.id}`)}
            >
              <span className="action-icon">📅</span>
              <span className="action-text">Agendar Visita</span>
            </button>

            <button 
              className="action-btn negotiation"
              onClick={() => navigate(`/negotiations/new?property=${property.id}`)}
            >
              <span className="action-icon">💼</span>
              <span className="action-text">Nova Negociação</span>
            </button>

            <button 
              className="action-btn duplicate"
              onClick={() => navigate(`/properties/new?duplicate=${property.id}`)}
            >
              <span className="action-icon">📋</span>
              <span className="action-text">Duplicar</span>
            </button>
          </div>
        </div>

        {/* Informações Adicionais */}
        <div className="additional-info-card">
          <h3>📊 Informações Adicionais</h3>
          <div className="info-grid">
            <div className="info-item">
              <div className="info-label">Valor por m²</div>
              <div className="info-value">
                R$ {(property.value / 100).toLocaleString('pt-BR')}
                <small> (estimativa para 100m²)</small>
              </div>
            </div>

            <div className="info-item">
              <div className="info-label">Categoria</div>
              <div className="info-value">
                {property.value > 500000 ? 'Alto Padrão' : 
                 property.value > 200000 ? 'Padrão Médio' : 'Econômico'}
              </div>
            </div>

            <div className="info-item">
              <div className="info-label">Disponibilidade</div>
              <div className="info-value">
                {property.status === 'Disponível' ? '✅ Disponível para venda' :
                 property.status === 'Reservado' ? '🔶 Reservado' :
                 property.status === 'Vendido' ? '✅ Vendido' :
                 property.status === 'Alugado' ? '🏠 Alugado' : '❌ Indisponível'}
              </div>
            </div>
          </div>
        </div>

        {/* Zona de Perigo */}
        <div className="danger-zone-card">
          <h3>⚠️ Zona de Perigo</h3>
          <p>As ações abaixo são irreversíveis. Tenha cuidado!</p>
          <button 
            className="btn btn-danger"
            onClick={handleDelete}
          >
            🗑️ Excluir Imóvel
          </button>
        </div>
      </div>
    </div>
  );
};
