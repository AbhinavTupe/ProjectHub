import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/services/api';
import { User, LoginCredentials, RegisterData } from '@/types';

export const useAuth = () => {
  const navigate = useNavigate();

  const isAuthenticated = useCallback((): boolean => {
    return !!localStorage.getItem('access_token');
  }, []);

  const getCurrentUser = useCallback((): User | null => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }, []);

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      try {
        const response = await authService.login(credentials);
        navigate('/dashboard');
        return response;
      } catch (error) {
        throw error;
      }
    },
    [navigate]
  );

  const register = useCallback(
    async (data: RegisterData) => {
      try {
        await authService.register(data);
        navigate('/login');
      } catch (error) {
        throw error;
      }
    },
    [navigate]
  );

  const logout = useCallback(() => {
    authService.logout();
    navigate('/');
  }, [navigate]);

  return {
    isAuthenticated: isAuthenticated(),
    currentUser: getCurrentUser(),
    login,
    register,
    logout,
  };
};
