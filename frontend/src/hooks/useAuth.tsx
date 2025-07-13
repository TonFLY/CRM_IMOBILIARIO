import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import api from '../services/api';
import type { User, LoginData, RegisterData, AuthResponse } from '../types';

interface AuthContextData {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      // Aqui poderia fazer uma requisição para validar o token e buscar dados do usuário
    }
    setLoading(false);
  }, []);

  const login = async (data: LoginData) => {
    try {
      const formData = new FormData();
      formData.append('username', data.username);
      formData.append('password', data.password);
      
      const response = await api.post<AuthResponse>('/users/login', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      const { access_token } = response.data;
      localStorage.setItem('token', access_token);
      setToken(access_token);
      
      // Simulando dados do usuário (em produção, você faria uma requisição para buscar)
      setUser({
        id: 1,
        username: data.username,
        email: `${data.username}@example.com`,
        is_active: true,
      });
    } catch (error: unknown) {
      console.error('Erro no login:', error);
      throw new Error('Falha no login');
    }
  };

  const register = async (data: RegisterData) => {
    try {
      await api.post('/users/register', data);
    } catch (error: unknown) {
      console.error('Erro no registro:', error);
      throw new Error('Falha no registro');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
