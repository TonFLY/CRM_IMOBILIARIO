import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import type { PropertyCreate } from '../types';

export const PropertyFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [formData, setFormData] = useState<PropertyCreate>({
    type: '',
    location: '',
    value: 0,
    description: '',
    status: 'Disponível'
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Buscar dados do imóvel para edição
  useEffect(() => {
    if (isEditing) {
      const fetchProperty = async () => {
        try {
          setLoading(true);
          const response = await api.get(`/properties/${id}`);
          const property = response.data;
          setFormData({
            type: property.type,
            location: property.location,
            value: property.value,
            description: property.description || '',
            status: property.status
          });
        } catch (error) {
          console.error('Erro ao buscar imóvel:', error);
          setError('Erro ao carregar dados do imóvel');
        } finally {
          setLoading(false);
        }
      };

      fetchProperty();
    }
  }, [id, isEditing]);

  // Atualizar campo do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: name === 'value' ? parseFloat(value) || 0 : value
    }));
  };

  // Submeter formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validações
    if (!formData.type || !formData.location || formData.value <= 0) {
      setError('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      if (isEditing) {
        await api.put(`/properties/${id}`, formData);
      } else {
        await api.post('/properties/', formData);
      }

      navigate('/properties');
    } catch (error) {
      console.error('Erro ao salvar imóvel:', error);
      setError('Erro ao salvar imóvel. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditing) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Carregando dados do imóvel...</p>
      </div>
    );
  }

  return (
    <div className="property-form-page">
      <div className="page-header">
        <h1>
          {isEditing ? '✏️ Editar Imóvel' : '➕ Novo Imóvel'}
        </h1>
        <button 
          className="btn btn-secondary"
          onClick={() => navigate('/properties')}
        >
          ← Voltar para Lista
        </button>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="property-form">
        <div className="form-grid">
          {/* Tipo do Imóvel */}
          <div className="form-group">
            <label htmlFor="type">Tipo do Imóvel *</label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="form-input"
            >
              <option value="">Selecione o tipo</option>
              <option value="Casa">🏠 Casa</option>
              <option value="Apartamento">🏢 Apartamento</option>
              <option value="Terreno">🌱 Terreno</option>
              <option value="Comercial">🏪 Comercial</option>
              <option value="Chácara">🌳 Chácara</option>
              <option value="Sobrado">🏘️ Sobrado</option>
            </select>
          </div>

          {/* Status */}
          <div className="form-group">
            <label htmlFor="status">Status *</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              className="form-input"
            >
              <option value="Disponível">✅ Disponível</option>
              <option value="Reservado">🔶 Reservado</option>
              <option value="Vendido">✅ Vendido</option>
              <option value="Alugado">🏠 Alugado</option>
              <option value="Indisponível">❌ Indisponível</option>
            </select>
          </div>

          {/* Localização */}
          <div className="form-group full-width">
            <label htmlFor="location">Localização *</label>
            <input
              id="location"
              name="location"
              type="text"
              value={formData.location}
              onChange={handleChange}
              placeholder="Ex: Centro, São Paulo - SP"
              required
              className="form-input"
            />
          </div>

          {/* Valor */}
          <div className="form-group">
            <label htmlFor="value">Valor (R$) *</label>
            <input
              id="value"
              name="value"
              type="number"
              min="0"
              step="0.01"
              value={formData.value || ''}
              onChange={handleChange}
              placeholder="250000.00"
              required
              className="form-input"
            />
            <small className="form-help">
              Valor atual: R$ {formData.value.toLocaleString('pt-BR')}
            </small>
          </div>

          {/* Descrição */}
          <div className="form-group full-width">
            <label htmlFor="description">Descrição</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Descreva o imóvel: quartos, banheiros, características especiais..."
              rows={4}
              className="form-textarea"
            />
            <small className="form-help">
              {(formData.description || '').length}/500 caracteres
            </small>
          </div>
        </div>

        {/* Preview do Imóvel */}
        <div className="property-preview">
          <h3>👀 Preview</h3>
          <div className="property-card preview">
            <div className="property-header">
              <h4>{formData.type || 'Tipo do Imóvel'}</h4>
              <span className={`status-badge status-${formData.status.toLowerCase()}`}>
                {formData.status}
              </span>
            </div>
            <div className="property-info">
              <p className="location">📍 {formData.location || 'Localização'}</p>
              <p className="price">💰 R$ {formData.value.toLocaleString('pt-BR')}</p>
              {formData.description && (
                <p className="description">{formData.description}</p>
              )}
            </div>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="form-actions">
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={() => navigate('/properties')}
          >
            Cancelar
          </button>
          
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="btn-spinner"></div>
                {isEditing ? 'Salvando...' : 'Cadastrando...'}
              </>
            ) : (
              <>
                {isEditing ? '💾 Salvar Alterações' : '➕ Cadastrar Imóvel'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
