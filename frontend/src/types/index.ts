// Tipos para autenticação
export interface User {
  id: number;
  username: string;
  email: string;
  is_active: boolean;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

// Tipos para imóveis
export interface Property {
  id: number;
  type: string;
  location: string;
  value: number;
  description?: string;
  status: string;
}

export interface PropertyCreate {
  type: string;
  location: string;
  value: number;
  description?: string;
  status: string;
}

// Tipos para clientes
export interface Client {
  id: number;
  name: string;
  phone: string;
  email: string;
  interest_type: string;
  status: string;
  preferences?: string;
}

export interface ClientCreate {
  name: string;
  phone: string;
  email: string;
  interest_type: string;
  status: string;
  preferences?: string;
}

// Tipos para visitas
export interface Visit {
  id: number;
  client_id: number;
  property_id: number;
  scheduled_datetime: string;
  status: string;
  notes?: string;
  created_at: string;
  updated_at?: string;
  duration_minutes?: number;
  agent_notes?: string;
  client_feedback?: string;
  // Campos enriquecidos da API
  client_name?: string;
  client_phone?: string;
  property_location?: string;
  property_type?: string;
}

export interface VisitCreate {
  client_id: number;
  property_id: number;
  scheduled_datetime: string;
  status?: string;
  notes?: string;
  duration_minutes?: number;
  agent_notes?: string;
}

export interface VisitUpdate {
  scheduled_datetime?: string;
  status?: string;
  notes?: string;
  duration_minutes?: number;
  agent_notes?: string;
  client_feedback?: string;
}

// Tipos para estatísticas de visitas
export interface VisitStatistics {
  total_visitas: number;
  agendadas: number;
  realizadas: number;
  canceladas: number;
  visitas_hoje: number;
  taxa_realizacao: number;
}

// Tipos para filtros de visitas
export interface VisitFilter {
  status?: string;
  client_id?: number;
  property_id?: number;
  date_from?: string;
  date_to?: string;
  limit?: number;
  offset?: number;
}

// Tipos para negociações
export interface Negotiation {
  id: number;
  client_id: number;
  property_id: number;
  status: string;
  created_at: string;
  updated_at?: string;
}

export interface NegotiationCreate {
  client_id: number;
  property_id: number;
  status: string;
}
