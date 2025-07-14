import { useAuth } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';

export const DashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <div>
          <h1 className="title">Dashboard</h1>
          <p className="subtitle">Bem-vindo, {user?.username}!</p>
        </div>
        <button className="btn btn-secondary" onClick={logout}>
          Sair
        </button>
      </div>

      {/* Cards de Resumo */}
      <div className="dashboard-grid">
        <div className="card">
          <div className="stat-label">Imóveis Cadastrados</div>
          <div className="stat-number">23</div>
        </div>
        
        <div className="card">
          <div className="stat-label">Clientes Ativos</div>
          <div className="stat-number" style={{ color: '#38a169' }}>47</div>
        </div>
        
        <div className="card">
          <div className="stat-label">Visitas Agendadas</div>
          <div className="stat-number" style={{ color: '#805ad5' }}>12</div>
        </div>
        
        <div className="card">
          <div className="stat-label">Negociações</div>
          <div className="stat-number" style={{ color: '#dd6b20' }}>8</div>
        </div>
      </div>

      {/* Menu de Navegação */}
      <div className="menu-grid">
        <div className="menu-card" style={{ borderLeft: '4px solid #3182ce' }}>
          <h3>📊 Gestão de Imóveis</h3>
          <p>Cadastre, edite e gerencie seu portfólio de imóveis</p>
          <button 
            className="btn btn-primary"
            onClick={() => navigate('/properties')}
          >
            Gerenciar Imóveis
          </button>
        </div>

        <div className="menu-card" style={{ borderLeft: '4px solid #38a169' }}>
          <h3>👥 Gestão de Clientes</h3>
          <p>Mantenha o controle de todos os seus clientes e leads</p>
          <button 
            className="btn" 
            style={{ backgroundColor: '#38a169', color: 'white' }}
            onClick={() => navigate('/clients')}
          >
            Gerenciar Clientes
          </button>
        </div>

        <div className="menu-card" style={{ borderLeft: '4px solid #805ad5' }}>
          <h3>📅 Agenda de Visitas</h3>
          <p>Agende e acompanhe visitas aos imóveis</p>
          <button 
            className="btn" 
            style={{ backgroundColor: '#805ad5', color: 'white' }}
            onClick={() => navigate('/visits')}
          >
            Gerenciar Visitas
          </button>
        </div>

        <div className="menu-card" style={{ borderLeft: '4px solid #dd6b20' }}>
          <h3>🎯 Funil de Vendas</h3>
          <p>Acompanhe o status das negociações em andamento</p>
          <button className="btn" style={{ backgroundColor: '#dd6b20', color: 'white' }}>
            Ver Funil
          </button>
        </div>
      </div>
    </div>
  );
};
