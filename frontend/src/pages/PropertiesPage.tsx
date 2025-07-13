import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import type { Property } from '../types';

export const PropertiesPage = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('');
  const [searchLocation, setSearchLocation] = useState<string>('');
  const navigate = useNavigate();

  // Buscar imóveis
  const fetchProperties = async () => {
    try {
      setLoading(true);
      const response = await api.get('/properties/');
      setProperties(response.data);
      setError(null);
    } catch (error) {
      console.error('Erro ao buscar imóveis:', error);
      setError('Erro ao carregar imóveis');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  // Filtrar imóveis
  const filteredProperties = properties.filter(property => {
    const matchesType = !filterType || property.type === filterType;
    const matchesStatus = !filterStatus || property.status === filterStatus;
    const matchesLocation = !searchLocation || 
      property.location.toLowerCase().includes(searchLocation.toLowerCase());
    
    return matchesType && matchesStatus && matchesLocation;
  });

  // Excluir imóvel
  const handleDelete = async (id: number) => {
    if (!window.confirm('Tem certeza que deseja excluir este imóvel?')) return;
    
    try {
      await api.delete(`/properties/${id}`);
      setProperties(properties.filter(p => p.id !== id));
    } catch (error) {
      console.error('Erro ao excluir imóvel:', error);
      alert('Erro ao excluir imóvel');
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Carregando imóveis...</p>
      </div>
    );
  }

  return (
    <div className="properties-page">
      <div className="page-header">
        <h1>🏠 Gestão de Imóveis</h1>
        <button 
          className="btn btn-primary"
          onClick={() => navigate('/properties/new')}
        >
          + Novo Imóvel
        </button>
      </div>

      {/* Filtros */}
      <div className="filters-container">
        <div className="filter-group">
          <label htmlFor="type-filter">Tipo:</label>
          <select 
            id="type-filter"
            value={filterType} 
            onChange={(e) => setFilterType(e.target.value)}
            className="filter-select"
          >
            <option value="">Todos os tipos</option>
            <option value="Casa">Casa</option>
            <option value="Apartamento">Apartamento</option>
            <option value="Terreno">Terreno</option>
            <option value="Comercial">Comercial</option>
          </select>
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
            <option value="Disponível">Disponível</option>
            <option value="Vendido">Vendido</option>
            <option value="Alugado">Alugado</option>
            <option value="Reservado">Reservado</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="location-search">Localização:</label>
          <input
            id="location-search"
            type="text"
            placeholder="Buscar por localização..."
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            className="filter-input"
          />
        </div>

        <button 
          className="btn btn-secondary"
          onClick={() => {
            setFilterType('');
            setFilterStatus('');
            setSearchLocation('');
          }}
        >
          Limpar Filtros
        </button>
      </div>

      {error && (
        <div className="error-message">
          {error}
          <button onClick={fetchProperties}>Tentar novamente</button>
        </div>
      )}

      {/* Lista de Imóveis */}
      <div className="properties-grid">
        {filteredProperties.length === 0 ? (
          <div className="empty-state">
            <h3>Nenhum imóvel encontrado</h3>
            <p>
              {properties.length === 0 
                ? 'Comece cadastrando seu primeiro imóvel!'
                : 'Tente ajustar os filtros ou limpar a busca.'
              }
            </p>
            {properties.length === 0 && (
              <button 
                className="btn btn-primary"
                onClick={() => navigate('/properties/new')}
              >
                + Cadastrar Primeiro Imóvel
              </button>
            )}
          </div>
        ) : (
          filteredProperties.map(property => (
            <div key={property.id} className="property-card">
              <div className="property-header">
                <h3>{property.type}</h3>
                <span className={`status-badge status-${property.status.toLowerCase()}`}>
                  {property.status}
                </span>
              </div>
              
              <div className="property-info">
                <p className="location">📍 {property.location}</p>
                <p className="price">💰 R$ {property.value.toLocaleString('pt-BR')}</p>
                {property.description && (
                  <p className="description">{property.description}</p>
                )}
              </div>

              <div className="property-actions">
                <button 
                  className="btn btn-sm btn-secondary"
                  onClick={() => navigate(`/properties/${property.id}`)}
                >
                  👁️ Ver Detalhes
                </button>
                <button 
                  className="btn btn-sm btn-primary"
                  onClick={() => navigate(`/properties/${property.id}/edit`)}
                >
                  ✏️ Editar
                </button>
                <button 
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(property.id)}
                >
                  🗑️ Excluir
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Estatísticas */}
      {properties.length > 0 && (
        <div className="properties-stats">
          <div className="stat-card">
            <h4>Total de Imóveis</h4>
            <span className="stat-number">{properties.length}</span>
          </div>
          <div className="stat-card">
            <h4>Disponíveis</h4>
            <span className="stat-number">
              {properties.filter(p => p.status === 'Disponível').length}
            </span>
          </div>
          <div className="stat-card">
            <h4>Vendidos</h4>
            <span className="stat-number">
              {properties.filter(p => p.status === 'Vendido').length}
            </span>
          </div>
          <div className="stat-card">
            <h4>Valor Total</h4>
            <span className="stat-number">
              R$ {properties
                .filter(p => p.status === 'Disponível')
                .reduce((sum, p) => sum + p.value, 0)
                .toLocaleString('pt-BR')}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
