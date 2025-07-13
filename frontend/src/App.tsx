import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './components/AuthProvider';
import { useAuth } from './hooks/useAuthContext';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { PropertiesPage } from './pages/PropertiesPage';
import { PropertyFormPage } from './pages/PropertyFormPage';
import { PropertyDetailsPage } from './pages/PropertyDetailsPage';
import { ClientsPage } from './pages/ClientsPage';
import { ClientFormPage } from './pages/ClientFormPage';
import { ClientDetailsPage } from './pages/ClientDetailsPage';

// Componente para proteger rotas autenticadas
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { token, loading } = useAuth();
  
  if (loading) {
    return <div>Carregando...</div>;
  }
  
  return token ? <>{children}</> : <Navigate to="/login" />;
};

// Componente principal da aplicação
function AppContent() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } 
      />
      
      {/* Rotas de Imóveis */}
      <Route 
        path="/properties" 
        element={
          <ProtectedRoute>
            <PropertiesPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/properties/new" 
        element={
          <ProtectedRoute>
            <PropertyFormPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/properties/:id" 
        element={
          <ProtectedRoute>
            <PropertyDetailsPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/properties/:id/edit" 
        element={
          <ProtectedRoute>
            <PropertyFormPage />
          </ProtectedRoute>
        } 
      />
      
      {/* Rotas de Clientes */}
      <Route 
        path="/clients" 
        element={
          <ProtectedRoute>
            <ClientsPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/clients/new" 
        element={
          <ProtectedRoute>
            <ClientFormPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/clients/:id" 
        element={
          <ProtectedRoute>
            <ClientDetailsPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/clients/:id/edit" 
        element={
          <ProtectedRoute>
            <ClientFormPage />
          </ProtectedRoute>
        } 
      />
      
      <Route path="/" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
