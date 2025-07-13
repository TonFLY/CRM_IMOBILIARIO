import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import type { Client } from '../types';

export const ClientsPage = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [filterInterest, setFilterInterest] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const navigate = useNavigate();

  // Buscar clientes
  const fetchClients = async () => {
    try {
      setLoading(true);
      const response = await api.get('/clients/');
      setClients(response.data);
      setError(null);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
      setError('Erro ao carregar clientes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  // Filtrar clientes
  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phone.includes(searchTerm);
    
    const matchesStatus = filterStatus === '' || client.status === filterStatus;
    const matchesInterest = filterInterest === '' || client.interest_type === filterInterest;
    
    return matchesSearch && matchesStatus && matchesInterest;
  });

  // Calcular estatísticas
  const stats = {
    total: clients.length,
    leads: clients.filter(c => c.status === 'Lead').length,
    ativos: clients.filter(c => c.status === 'Cliente Ativo').length,
    prospects: clients.filter(c => c.status === 'Prospect').length,
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

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Carregando clientes...</p>
      </div>
    );
  }

  return (
    <div className="clients-page">
      <div className="page-header">
        <h1>👥 Gestão de Clientes</h1>
        <button 
          className="btn btn-primary"
          onClick={() => navigate('/clients/new')}
        >
          + Novo Cliente
        </button>
      </div>

      {/* Filtros */}
      <div className="filters-container">
        <div className="filter-row">
          <div className="filter-group">
            <label htmlFor="search">Buscar Cliente:</label>
            <input
              id="search"
              type="text"
              placeholder="Nome, email ou telefone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="filter-input"
            />
          </div>

          <div className="filter-group">
            <label htmlFor="status-filter">Status:</label>
            <select 
              id="status-filter"
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
              className="filter-select"
            >
              <option value="">Todos os status</option>
              <option value="Lead">Lead</option>
              <option value="Cliente Ativo">Cliente Ativo</option>
              <option value="Cliente Inativo">Cliente Inativo</option>
              <option value="Prospect">Prospect</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="interest-filter">Interesse:</label>
            <select 
              id="interest-filter"
              value={filterInterest} 
              onChange={(e) => setFilterInterest(e.target.value)}
              className="filter-select"
            >
              <option value="">Todos os interesses</option>
              <option value="Compra">Compra</option>
              <option value="Aluguel">Aluguel</option>
              <option value="Venda">Venda</option>
              <option value="Investimento">Investimento</option>
            </select>
          </div>

          <button 
            className="clear-filters-btn"
            onClick={() => {
              setSearchTerm('');
              setFilterStatus('');
              setFilterInterest('');
            }}
          >
            🗑️ Limpar Filtros
          </button>
        </div>
      </div>

      {error && (
        <div className="error-message">
          {error}
          <button onClick={fetchClients}>Tentar novamente</button>
        </div>
      )}

      {/* Estatísticas */}
      <div className="clients-stats">
        <div className="stat-card">
          <div className="stat-value">{stats.total}</div>
          <div className="stat-label">Total de Clientes</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.leads}</div>
          <div className="stat-label">Leads</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.ativos}</div>
          <div className="stat-label">Clientes Ativos</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stats.prospects}</div>
          <div className="stat-label">Prospects</div>
        </div>
      </div>

      {/* Lista de Clientes */}
      <div className="clients-grid">
        {filteredClients.length === 0 ? (
          <div className="empty-state">
            <h3>Nenhum cliente encontrado</h3>
            <p>
              {clients.length === 0
                ? 'Comece adicionando seu primeiro cliente!'
                : 'Tente ajustar os filtros de busca.'}
            </p>
            {clients.length === 0 && (
              <button 
                className="btn btn-primary"
                onClick={() => navigate('/clients/new')}
              >
                + Novo Cliente
              </button>
            )}
          </div>
        ) : (
          filteredClients.map((client) => (
            <div key={client.id} className="client-card">
              <div className="client-header">
                <div className="client-avatar">
                  {client.name.charAt(0).toUpperCase()}
                </div>
                <div className="client-info">
                  <h3 className="client-name">{client.name}</h3>
                  <p className="client-email">{client.email}</p>
                </div>
              </div>

              <div className="client-contact">
                <div className="contact-item">
                  <span>📱</span>
                  <a href={`tel:${client.phone}`} className="contact-link">
                    {formatPhone(client.phone)}
                  </a>
                </div>
                <div className="contact-item">
                  <span>📧</span>
                  <a href={`mailto:${client.email}`} className="contact-link">
                    {client.email}
                  </a>
                </div>
              </div>

              <div className="client-meta">
                <span className="interest-badge">
                  {client.interest_type === 'Compra' && '🏠'}
                  {client.interest_type === 'Aluguel' && '🔑'}
                  {client.interest_type === 'Venda' && '💰'}
                  {client.interest_type === 'Investimento' && '📈'}
                  {client.interest_type}
                </span>
                <span className={`status-badge status-${client.status.toLowerCase().replace(' ', '-')}`}>
                  {client.status === 'Lead' && '🔵'}
                  {client.status === 'Prospect' && '🟡'}
                  {client.status === 'Cliente Ativo' && '🟢'}
                  {client.status === 'Cliente Inativo' && '🔴'}
                  {client.status}
                </span>
              </div>

              <div className="client-actions">
                <button 
                  className="action-btn-small btn-view"
                  onClick={() => navigate(`/clients/${client.id}`)}
                >
                  👁️ Ver Detalhes
                </button>
                <button 
                  className="action-btn-small btn-edit"
                  onClick={() => navigate(`/clients/${client.id}/edit`)}
                >
                  ✏️ Editar
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Ações Rápidas */}
      <div className="quick-actions">
        <h3>⚡ Ações Rápidas</h3>
        <div className="quick-actions-grid">
          <button 
            className="quick-action-btn"
            onClick={() => alert('Funcionalidade de importação em desenvolvimento')}
          >
            📥 Importar Clientes
          </button>
          <button 
            className="quick-action-btn"
            onClick={() => alert('Funcionalidade de exportação em desenvolvimento')}
          >
            📤 Exportar Lista
          </button>
          <button 
            className="quick-action-btn"
            onClick={() => alert('Funcionalidade de email em massa em desenvolvimento')}
          >
            ✉️ Email em Massa
          </button>
          <button 
            className="quick-action-btn"
            onClick={() => alert('Funcionalidade de relatórios em desenvolvimento')}
          >
            📊 Relatórios
          </button>
        </div>
      </div>
    </div>
  );
};
