import axios from 'axios';
import type { Visit, VisitCreate, VisitUpdate, VisitFilter, VisitStatistics } from '../types';

// Configuração base da API
const api = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token JWT automaticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar erros de autenticação
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ============================================
// 📅 FUNÇÕES DE API PARA VISITAS
// ============================================

/**
 * Cria uma nova visita agendada
 */
export const createVisit = async (visitData: VisitCreate): Promise<Visit> => {
  const response = await api.post('/visits/', visitData);
  return response.data;
};

/**
 * Lista visitas com filtros opcionais
 */
export const getVisits = async (filters?: VisitFilter): Promise<Visit[]> => {
  const params = new URLSearchParams();
  
  if (filters?.status) params.append('status', filters.status);
  if (filters?.client_id) params.append('client_id', filters.client_id.toString());
  if (filters?.property_id) params.append('property_id', filters.property_id.toString());
  if (filters?.date_from) params.append('date_from', filters.date_from);
  if (filters?.date_to) params.append('date_to', filters.date_to);
  if (filters?.limit) params.append('limit', filters.limit.toString());
  if (filters?.offset) params.append('offset', filters.offset.toString());
  
  const queryString = params.toString();
  const url = queryString ? `/visits/?${queryString}` : '/visits/';
  
  const response = await api.get(url);
  return response.data;
};

/**
 * Busca visitas do calendário por mês/ano
 */
export const getCalendarVisits = async (month: number, year: number): Promise<Visit[]> => {
  const response = await api.get(`/visits/calendar?month=${month}&year=${year}`);
  return response.data;
};

/**
 * Busca visitas agendadas para hoje
 */
export const getTodayVisits = async (): Promise<Visit[]> => {
  const response = await api.get('/visits/today');
  return response.data;
};

/**
 * Busca uma visita específica por ID
 */
export const getVisit = async (visitId: number): Promise<Visit> => {
  const response = await api.get(`/visits/${visitId}`);
  return response.data;
};

/**
 * Atualiza uma visita existente
 */
export const updateVisit = async (visitId: number, updateData: VisitUpdate): Promise<Visit> => {
  const response = await api.put(`/visits/${visitId}`, updateData);
  return response.data;
};

/**
 * Atualiza apenas o status de uma visita
 */
export const updateVisitStatus = async (visitId: number, status: string): Promise<{message: string}> => {
  const response = await api.patch(`/visits/${visitId}/status?status=${status}`);
  return response.data;
};

/**
 * Exclui uma visita
 */
export const deleteVisit = async (visitId: number): Promise<{message: string}> => {
  const response = await api.delete(`/visits/${visitId}`);
  return response.data;
};

/**
 * Busca estatísticas resumidas das visitas
 */
export const getVisitStatistics = async (): Promise<VisitStatistics> => {
  const response = await api.get('/visits/statistics/summary');
  return response.data;
};

// ============================================
// 🔧 FUNÇÕES AUXILIARES PARA VISITAS
// ============================================

/**
 * Formata data/hora para exibição
 */
export const formatVisitDateTime = (dateTimeString: string): string => {
  const date = new Date(dateTimeString);
  return date.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Formata duração em minutos para texto legível
 */
export const formatDuration = (minutes?: number): string => {
  if (!minutes) return '1 hora';
  
  if (minutes < 60) {
    return `${minutes} min`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (remainingMinutes === 0) {
    return `${hours}h`;
  }
  
  return `${hours}h ${remainingMinutes}min`;
};

/**
 * Retorna cor baseada no status da visita
 */
export const getVisitStatusColor = (status: string): string => {
  switch (status) {
    case 'Agendada':
      return '#3182ce'; // Azul
    case 'Realizada':
      return '#38a169'; // Verde
    case 'Cancelada':
      return '#e53e3e'; // Vermelho
    case 'Reagendada':
      return '#dd6b20'; // Laranja
    default:
      return '#718096'; // Cinza
  }
};

/**
 * Verifica se uma visita é hoje
 */
export const isVisitToday = (scheduledDateTime: string): boolean => {
  const visitDate = new Date(scheduledDateTime);
  const today = new Date();
  
  return visitDate.toDateString() === today.toDateString();
};

/**
 * Verifica se uma visita já passou
 */
export const isVisitPast = (scheduledDateTime: string): boolean => {
  const visitDate = new Date(scheduledDateTime);
  const now = new Date();
  
  return visitDate < now;
};

export default api;
