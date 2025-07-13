import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../services/api';
import type { ClientCreate } from '../types';

export const ClientFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [formData, setFormData] = useState<ClientCreate>({
    name: '',
    email: '',
    phone: '',
    interest_type: '',
    status: 'Lead',
    preferences: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Buscar dados do cliente para edição
  useEffect(() => {
    if (isEditing) {
      const fetchClient = async () => {
        try {
          setLoading(true);
          const response = await api.get(`/clients/${id}`);
          const client = response.data;
          setFormData({
            name: client.name,
            email: client.email,
            phone: client.phone,
            interest_type: client.interest_type,
            status: client.status || 'Lead',
            preferences: client.preferences || ''
          });
        } catch (error) {
          console.error('Erro ao buscar cliente:', error);
          setError('Erro ao carregar dados do cliente');
        } finally {
          setLoading(false);
        }
      };

      fetchClient();
    }
  }, [id, isEditing]);

  // Atualizar campo do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Formatar telefone em tempo real
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não é número
    
    // Limita a 11 dígitos
    if (value.length > 11) value = value.slice(0, 11);
    
    // Formata como (11) 99999-9999
    if (value.length >= 11) {
      value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    } else if (value.length >= 7) {
      value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    } else if (value.length >= 3) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else if (value.length >= 1) {
      value = `(${value}`;
    }
    
    setFormData(prev => ({ ...prev, phone: value }));
  };

  // Submeter formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validações
    if (!formData.name || !formData.email || !formData.phone) {
      setError('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Por favor, insira um email válido');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Remove formatação do telefone para enviar para API
      const dataToSend = {
        ...formData,
        phone: formData.phone.replace(/\D/g, '')
      };

      if (isEditing) {
        await api.put(`/clients/${id}`, dataToSend);
      } else {
        await api.post('/clients/', dataToSend);
      }

      navigate('/clients');
    } catch (error) {
      console.error('Erro ao salvar cliente:', error);
      setError('Erro ao salvar cliente. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditing) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Carregando dados do cliente...</p>
      </div>
    );
  }

  return (
    <div className="client-form-page">
      <div className="page-header">
        <h1>
          {isEditing ? '✏️ Editar Cliente' : '➕ Novo Cliente'}
        </h1>
        <button 
          className="btn btn-secondary"
          onClick={() => navigate('/clients')}
        >
          ← Voltar para Lista
        </button>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="client-form">
        <div className="form-grid">
          {/* Nome Completo */}
          <div className="form-group full-width">
            <label htmlFor="name">Nome Completo *</label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ex: João Silva Santos"
              required
              className="form-input"
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="joao@exemplo.com"
              required
              className="form-input"
            />
          </div>

          {/* Telefone */}
          <div className="form-group">
            <label htmlFor="phone">Telefone *</label>
            <input
              id="phone"
              name="phone"
              type="text"
              value={formData.phone}
              onChange={handlePhoneChange}
              placeholder="(11) 99999-9999"
              required
              className="form-input"
            />
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
              <option value="Lead">🔵 Lead</option>
              <option value="Prospect">🟡 Prospect</option>
              <option value="Cliente Ativo">🟢 Cliente Ativo</option>
              <option value="Cliente Inativo">🔴 Cliente Inativo</option>
            </select>
          </div>

          {/* Tipo de Interesse */}
          <div className="form-group">
            <label htmlFor="interest_type">Tipo de Interesse *</label>
            <select
              id="interest_type"
              name="interest_type"
              value={formData.interest_type}
              onChange={handleChange}
              required
              className="form-input"
            >
              <option value="">Selecione o interesse</option>
              <option value="Compra">🏠 Compra</option>
              <option value="Aluguel">🔑 Aluguel</option>
              <option value="Venda">💰 Venda</option>
              <option value="Investimento">📈 Investimento</option>
              <option value="Outros">❓ Outros</option>
            </select>
          </div>

          {/* Preferências */}
          <div className="form-group full-width">
            <label htmlFor="preferences">Preferências e Observações</label>
            <textarea
              id="preferences"
              name="preferences"
              value={formData.preferences}
              onChange={handleChange}
              placeholder="Ex: Procura apartamento de 2 quartos, região central, até R$ 300.000..."
              rows={4}
              className="form-textarea"
            />
            <small className="form-help">
              {(formData.preferences || '').length}/500 caracteres
            </small>
          </div>
        </div>

        {/* Preview do Cliente */}
        <div className="client-preview">
          <h3>👀 Preview do Cliente</h3>
          <div className="client-card preview">
            <div className="client-header">
              <div className="client-avatar">
                {formData.name ? formData.name.charAt(0).toUpperCase() : '?'}
              </div>
              <div className="client-title">
                <h4>{formData.name || 'Nome do Cliente'}</h4>
                <span className={`status-badge status-${formData.status.toLowerCase().replace(' ', '-')}`}>
                  {formData.status}
                </span>
              </div>
            </div>
            
            <div className="client-info">
              <div className="info-row">
                <span className="info-icon">📧</span>
                <span className="info-text">{formData.email || 'email@exemplo.com'}</span>
              </div>
              
              <div className="info-row">
                <span className="info-icon">📱</span>
                <span className="info-text">{formData.phone || '(11) 99999-9999'}</span>
              </div>
              
              <div className="info-row">
                <span className="info-icon">🎯</span>
                <span className="info-text">{formData.interest_type || 'Tipo de interesse'}</span>
              </div>
              
              {formData.preferences && (
                <div className="info-row">
                  <span className="info-icon">📝</span>
                  <span className="info-text preferences">{formData.preferences}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="form-actions">
          <button 
            type="button" 
            className="btn btn-secondary"
            onClick={() => navigate('/clients')}
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
                {isEditing ? '💾 Salvar Alterações' : '➕ Cadastrar Cliente'}
              </>
            )}
          </button>
        </div>
      </form>

      {/* Dicas */}
      <div className="form-tips">
        <h3>💡 Dicas</h3>
        <ul>
          <li><strong>Lead:</strong> Pessoa que demonstrou interesse inicial</li>
          <li><strong>Prospect:</strong> Lead qualificado com potencial real de compra</li>
          <li><strong>Cliente Ativo:</strong> Pessoa que já fechou negócio</li>
          <li><strong>Cliente Inativo:</strong> Cliente antigo sem atividade recente</li>
        </ul>
      </div>
    </div>
  );
};
