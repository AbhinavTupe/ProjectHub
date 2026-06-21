import axios, { AxiosInstance } from 'axios';
import { User, LoginCredentials, RegisterData, AuthResponse } from '@/types';

const API_URL = import.meta.env.VITE_API_URL || '';

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  register: async (data: RegisterData): Promise<User> => {
    const response = await api.post<User>('/api/auth/register', data);
    return response.data;
  },

  login: async (data: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/api/auth/login', data);
    if (response.data.access_token) {
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await api.get<User>('/api/auth/me');
    return response.data;
  },
};

export const projectService = {
  getAll: async (): Promise<any[]> => {
    const response = await api.get('/api/projects');
    return response.data;
  },

  getById: async (id: number): Promise<any> => {
    const response = await api.get(`/api/projects/${id}`);
    return response.data;
  },

  create: async (data: { title: string; description?: string }): Promise<any> => {
    const response = await api.post('/api/projects', data);
    return response.data;
  },

  update: async (id: number, data: { title?: string; description?: string }): Promise<any> => {
    const response = await api.put(`/api/projects/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/api/projects/${id}`);
  },
};

export const taskService = {
  getAll: async (): Promise<any[]> => {
    const response = await api.get('/api/tasks');
    return response.data;
  },

  getById: async (id: number): Promise<any> => {
    const response = await api.get(`/api/tasks/${id}`);
    return response.data;
  },

  create: async (data: {
    title: string;
    description?: string;
    status?: string;
    project_id: number;
  }): Promise<any> => {
    const response = await api.post('/api/tasks', data);
    return response.data;
  },

  update: async (
    id: number,
    data: { title?: string; description?: string; status?: string }
  ): Promise<any> => {
    const response = await api.put(`/api/tasks/${id}`, data);
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/api/tasks/${id}`);
  },
};

export const dashboardService = {
  getStats: async (): Promise<any> => {
    const response = await api.get('/api/dashboard/stats');
    return response.data;
  },
};

export default api;
