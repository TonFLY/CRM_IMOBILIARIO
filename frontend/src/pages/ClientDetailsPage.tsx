import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import type { Client } from '../types';

export const ClientDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/clients/${id}`);
        setClient(response.data);
        setError(null);
      } catch (error) {
        console.error('Erro ao buscar cliente:', error);
        setError('Erro ao carregar dados do cliente');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchClient();
    }
  }, [id]);

  const handleDelete = async () => {
    if (!client || !window.confirm('Tem certeza que deseja excluir este cliente?')) return;
    
    try {
      await api.delete(`/clients/${client.id}`);
      navigate('/clients');
    } catch (error) {
      console.error('Erro ao excluir cliente:', error);
      alert('Erro ao excluir cliente');
    }
  };

  // Formatar telefone
  const formatPhone = (phone: string) => {
    if (!phone) return '';
    const numbers = phone.replace(/\D/g, '');
    if (numbers.length === 11) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
    }
    return phone;
  };

  // Obter ícone do status
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Lead': return '🔵';
      case 'Prospect': return '🟡';
      case 'Cliente Ativo': return '🟢';
      case 'Cliente Inativo': return '🔴';
      default: return '⚪';
    }
  };

  // Obter ícone do tipo de interesse
  const getInterestIcon = (type: string) => {
    switch (type) {
      case 'Compra': return '🏠';
      case 'Aluguel': return '🔑';
      case 'Venda': return '💰';
      case 'Investimento': return '📈';
      default: return '❓';
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Carregando detalhes do cliente...</p>
      </div>
    );
  }

  if (error || !client) {
    return (
      <div className="error-container">
        <h2>Erro ao carregar cliente</h2>
        <p>{error || 'Cliente não encontrado'}</p>
        <button 
          className="btn btn-primary"
          onClick={() => navigate('/clients')}
        >
          ← Voltar para Lista
        </button>
      </div>
    );
  }

  return (
    <div className="client-details-page">
      <div className="page-header">
        <h1>👤 Detalhes do Cliente</h1>
        <div className="header-actions">
          <button 
            className="btn btn-secondary"
            onClick={() => navigate('/clients')}
          >
            ← Voltar para Lista
          </button>
          <button 
            className="btn btn-primary"
            onClick={() => navigate(`/clients/${client.id}/edit`)}
          >
            ✏️ Editar
          </button>
        </div>
      </div>

      <div className="client-details-container">
        {/* Card Principal */}
        <div className="client-main-card">
          <div className="client-header-details">
            <div className="client-avatar-large">
              {client.name.charAt(0).toUpperCase()}
            </div>
            <div className="client-info-header">
              <h2>{client.name}</h2>
              <div className="client-badges">
                <span className={`status-badge status-${client.status.toLowerCase().replace(' ', '-')}`}>
                  {getStatusIcon(client.status)} {client.status}
                </span>
                <span className="interest-badge">
                  {getInterestIcon(client.interest_type)} {client.interest_type}
                </span>
              </div>
              <div className="client-id">
                ID: #{client.id}
              </div>
            </div>
          </div>

          <div className="client-details-grid">
            <div className="detail-item">
              <div className="detail-label">📧 Email</div>
              <div className="detail-value">
                <a href={`mailto:${client.email}`} className="email-link">
                  {client.email}
                </a>
              </div>
            </div>

            <div className="detail-item">
              <div className="detail-label">📱 Telefone</div>
              <div className="detail-value">
                <a href={`tel:${client.phone}`} className="phone-link">
                  {formatPhone(client.phone)}
                </a>
              </div>
            </div>

            <div className="detail-item">
              <div className="detail-label">🎯 Interesse</div>
              <div className="detail-value">
                {getInterestIcon(client.interest_type)} {client.interest_type}
              </div>
            </div>

            <div className="detail-item">
              <div className="detail-label">📊 Status</div>
              <div className="detail-value">
                <span className={`status-badge status-${client.status.toLowerCase().replace(' ', '-')}`}>
                  {getStatusIcon(client.status)} {client.status}
                </span>
              </div>
            </div>
          </div>

          {client.preferences && (
            <div className="client-preferences">
              <h3>📝 Preferências e Observações</h3>
              <p>{client.preferences}</p>
            </div>
          )}
        </div>

        {/* Ações Rápidas */}
        <div className="quick-actions-card">
          <h3>⚡ Ações Rápidas</h3>
          <div className="actions-grid">
            <button 
              className="action-btn contact"
              onClick={() => window.open(`mailto:${client.email}`, '_blank')}
            >
              <span className="action-icon">📧</span>
              <span className="action-text">Enviar Email</span>
            </button>

            <button 
              className="action-btn call"
              onClick={() => window.open(`tel:${client.phone}`, '_blank')}
            >
              <span className="action-icon">📱</span>
              <span className="action-text">Ligar</span>
            </button>

            <button 
              className="action-btn whatsapp"
              onClick={() => window.open(`https://wa.me/${client.phone.replace(/\D/g, '')}`, '_blank')}
            >
              <span className="action-icon">💬</span>
              <span className="action-text">WhatsApp</span>
            </button>

            <button 
              className="action-btn visit"
              onClick={() => navigate(`/visits/new?client=${client.id}`)}
            >
              <span className="action-icon">📅</span>
              <span className="action-text">Agendar Visita</span>
            </button>

            <button 
              className="action-btn negotiation"
              onClick={() => navigate(`/negotiations/new?client=${client.id}`)}
            >
              <span className="action-icon">💼</span>
              <span className="action-text">Nova Negociação</span>
            </button>

            <button 
              className="action-btn edit"
              onClick={() => navigate(`/clients/${client.id}/edit`)}
            >
              <span className="action-icon">✏️</span>
              <span className="action-text">Editar Dados</span>
            </button>
          </div>
        </div>

        {/* Histórico de Interações */}
        <div className="interactions-card">
          <h3>📋 Histórico de Interações</h3>
          <div className="interactions-timeline">
            <div className="timeline-item">
              <div className="timeline-icon">📝</div>
              <div className="timeline-content">
                <div className="timeline-title">Cliente cadastrado</div>
                <div className="timeline-date">Hoje, 14:30</div>
              </div>
            </div>
            {/* Aqui seria carregado o histórico real */}
            <div className="empty-timeline">
              <p>Nenhuma interação registrada ainda.</p>
              <button 
                className="btn btn-sm btn-primary"
                onClick={() => navigate(`/interactions/new?client=${client.id}`)}
              >
                + Registrar Interação
              </button>
            </div>
          </div>
        </div>

        {/* Estatísticas do Cliente */}
        <div className="client-stats-card">
          <h3>📊 Estatísticas</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-label">Visitas Agendadas</div>
              <div className="stat-value">0</div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Negociações</div>
              <div className="stat-value">0</div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Interações</div>
              <div className="stat-value">1</div>
            </div>
            <div className="stat-item">
              <div className="stat-label">Última Atividade</div>
              <div className="stat-value">Hoje</div>
            </div>
          </div>
        </div>

        {/* Zona de Perigo */}
        <div className="danger-zone-card">
          <h3>⚠️ Zona de Perigo</h3>
          <p>As ações abaixo são irreversíveis. Tenha cuidado!</p>
          <div className="danger-actions">
            <button 
              className="btn btn-warning"
              onClick={() => {
                // Lógica para arquivar cliente
                alert('Funcionalidade de arquivar cliente em desenvolvimento');
              }}
            >
              📦 Arquivar Cliente
            </button>
            <button 
              className="btn btn-danger"
              onClick={handleDelete}
            >
              🗑️ Excluir Cliente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
