import { useState, useEffect } from 'react';
import { apiClient } from '@/services/api';

// Example interface for challenge data
interface Challenge {
  id: number;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  status: 'active' | 'completed' | 'archived';
}

interface AuthResponse {
  token: string;
  user: any;
}

// Example hook to demonstrate API connection
export const useChallenges = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Example API call - this would connect to your Strapi backend
        const response = await apiClient.get<Challenge[]>('/challenges');
        setChallenges(response.data || []);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch challenges');
        console.error('Failed to fetch challenges:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, []);

  return {
    challenges,
    loading,
    error,
    refetch: () => {
      // Trigger a re-fetch
      setChallenges([]);
      setLoading(true);
      setError(null);
    },
  };
};

// Example hook for user authentication status
export const useAuth = () => {
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        if (!token) {
          setLoading(false);
          return;
        }

        // Example: verify token with backend
        const response = await apiClient.get<{ user: any }>('/auth/me');
        setUser(response.data.user);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('auth_token');
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Note: This would need to be adjusted to work with the actual API client
      // since apiClient.post returns APIResponse<T>, not AxiosResponse<T>
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data: AuthResponse = await response.json();
      const { token, user: userData } = data;
      
      localStorage.setItem('auth_token', token);
      setUser(userData);
      setIsAuthenticated(true);
      
      return { success: true };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.message || 'Login failed' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
    setIsAuthenticated(false);
  };

  return {
    user,
    isAuthenticated,
    loading,
    login,
    logout,
  };
};
