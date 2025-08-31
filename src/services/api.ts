import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosRequestConfig } from 'axios';
import type { StatsOverview } from '@/types/api';

// API Error class definition
export class APIError extends Error {
  constructor(
    public status: number,
    message: string,
    public code?: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

class ApiClient {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:1337',
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor for authentication
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = import.meta.env.VITE_API_TOKEN;
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error: unknown) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor for error handling
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response;
      },
      (error: any) => {
        if (error.response) {
          // Server responded with error status
          const apiError = new APIError(
            error.response.status,
            error.response.data?.error?.message || 'An error occurred',
            error.response.data?.error?.name
          );
          return Promise.reject(apiError);
        } else if (error.request) {
          // Request was made but no response received
          const networkError = new APIError(
            0,
            'Network error - please check your connection',
            'NETWORK_ERROR'
          );
          return Promise.reject(networkError);
        } else {
          // Something else happened
          const unknownError = new APIError(
            500,
            'An unexpected error occurred',
            'UNKNOWN_ERROR'
          );
          return Promise.reject(unknownError);
        }
      }
    );
  }

  // Return the Strapi response directly, not wrapped in APIResponse
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.get<T>(url, config);
    return response.data;
  }

  async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.post<T>(url, data, config);
    return response.data;
  }

  async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.put<T>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.instance.delete<T>(url, config);
    return response.data;
  }
}

export const apiClient = new ApiClient();

/**
 * API service for interacting with TLD Challenges backend
 * Based on Postman collection and API reference documentation
 * 
 * Key features from backend:
 * - Slug-based endpoints for better SEO and user-friendly URLs
 * - Complex population patterns for related data
 * - Featured content filtering
 * - Ideas content type for community submissions
 * - Statistics endpoint for dashboard data
 */
export const apiService = {
  // Challenges
  challenges: {
    /**
     * Get all challenges with optional filtering and pagination
     */
    getAll: (options?: {
      populate?: string;
      filters?: Record<string, any>;
      sort?: string;
      pagination?: { page?: number; pageSize?: number };
    }) => {
      const params: Record<string, any> = {};
      
      if (options?.populate) {
        params.populate = options.populate;
      }
      
      if (options?.filters) {
        Object.entries(options.filters).forEach(([key, value]) => {
          params[`filters[${key}][$eq]`] = value;
        });
      }
      
      if (options?.sort) {
        params.sort = options.sort;
      }
      
      if (options?.pagination) {
        if (options.pagination.page) {
          params['pagination[page]'] = options.pagination.page;
        }
        if (options.pagination.pageSize) {
          params['pagination[pageSize]'] = options.pagination.pageSize;
        }
      }
      
      return apiClient.get('/challenges', { params });
    },
    
    /**
     * Get challenge by slug (SEO-friendly URLs)
     */
    getBySlug: (slug: string, populate?: string) => {
      const params: Record<string, any> = {};
      if (populate) {
        params.populate = populate;
      }
      return apiClient.get(`/challenges/slug/${slug}`, { params });
    },
    
    /**
     * Get featured challenges only
     */
    getFeatured: (populate?: string) => {
      const params: Record<string, any> = {
        'filters[is_featured][$eq]': true,
      };
      if (populate) {
        params.populate = populate;
      }
      return apiClient.get('/challenges', { params });
    },
    
    /**
     * Filter challenges by difficulty level
     */
    getByDifficulty: (difficulty: 'Easy' | 'Medium' | 'Hard', populate?: string) => {
      const params: Record<string, any> = {
        'filters[difficulty][$eq]': difficulty,
      };
      if (populate) {
        params.populate = populate;
      }
      return apiClient.get('/challenges', { params });
    },
  },

  // Tournaments
  tournaments: {
    /**
     * Get all tournaments with optional filtering and pagination
     */
    getAll: (options?: {
      populate?: string;
      filters?: Record<string, any>;
      sort?: string;
      pagination?: { page?: number; pageSize?: number };
    }) => {
      const params: Record<string, any> = {};
      
      if (options?.populate) {
        params.populate = options.populate;
      }
      
      if (options?.filters) {
        Object.entries(options.filters).forEach(([key, value]) => {
          params[`filters[${key}][$eq]`] = value;
        });
      }
      
      if (options?.sort) {
        params.sort = options.sort;
      }
      
      if (options?.pagination) {
        if (options.pagination.page) {
          params['pagination[page]'] = options.pagination.page;
        }
        if (options.pagination.pageSize) {
          params['pagination[pageSize]'] = options.pagination.pageSize;
        }
      }
      
      return apiClient.get('/tournaments', { params });
    },
    
    /**
     * Get tournament by slug
     */
    getBySlug: (slug: string, populate?: string) => {
      const params: Record<string, any> = {};
      if (populate) {
        params.populate = populate;
      }
      return apiClient.get(`/tournaments/slug/${slug}`, { params });
    },
    
    /**
     * Get active tournaments only
     */
    getActive: (populate?: string) => {
      const params: Record<string, any> = {
        'filters[state][$eq]': 'active',
      };
      if (populate) {
        params.populate = populate;
      }
      return apiClient.get('/tournaments', { params });
    },
    
    /**
     * Get featured tournaments only
     */
    getFeatured: (populate?: string) => {
      const params: Record<string, any> = {
        'filters[is_featured][$eq]': true,
      };
      if (populate) {
        params.populate = populate;
      }
      return apiClient.get('/tournaments', { params });
    },
  },

  // Custom Codes
  customCodes: {
    /**
     * Get all custom codes with optional filtering and pagination
     */
    getAll: (options?: {
      populate?: string;
      filters?: Record<string, any>;
      sort?: string;
      pagination?: { page?: number; pageSize?: number };
    }) => {
      const params: Record<string, any> = {};
      
      if (options?.populate) {
        params.populate = options.populate;
      }
      
      if (options?.filters) {
        Object.entries(options.filters).forEach(([key, value]) => {
          params[`filters[${key}][$eq]`] = value;
        });
      }
      
      if (options?.sort) {
        params.sort = options.sort;
      }
      
      if (options?.pagination) {
        if (options.pagination.page) {
          params['pagination[page]'] = options.pagination.page;
        }
        if (options.pagination.pageSize) {
          params['pagination[pageSize]'] = options.pagination.pageSize;
        }
      }
      
      return apiClient.get('/custom-codes', { params });
    },
    
    /**
     * Get custom code by slug
     */
    getBySlug: (slug: string, populate?: string) => {
      const params: Record<string, any> = {};
      if (populate) {
        params.populate = populate;
      }
      return apiClient.get(`/custom-codes/slug/${slug}`, { params });
    },
    
    /**
     * Get featured custom codes only
     */
    getFeatured: (populate?: string) => {
      const params: Record<string, any> = {
        'filters[is_featured][$eq]': true,
      };
      if (populate) {
        params.populate = populate;
      }
      return apiClient.get('/custom-codes', { params });
    },
  },

  // Creators
  creators: {
    /**
     * Get all creators with optional pagination
     */
    getAll: (options?: {
      populate?: string;
      sort?: string;
      pagination?: { page?: number; pageSize?: number };
    }) => {
      const params: Record<string, any> = {};
      
      if (options?.populate) {
        params.populate = options.populate;
      }
      
      if (options?.sort) {
        params.sort = options.sort;
      }
      
      if (options?.pagination) {
        if (options.pagination.page) {
          params['pagination[page]'] = options.pagination.page;
        }
        if (options.pagination.pageSize) {
          params['pagination[pageSize]'] = options.pagination.pageSize;
        }
      }
      
      return apiClient.get('/api/creators', { params });
    },
    
    /**
     * Get creator by slug
     */
    getBySlug: (slug: string, populate?: string) => {
      const params: Record<string, any> = {};
      if (populate) {
        params.populate = populate;
      }
      return apiClient.get(`/api/creators/slug/${slug}`, { params });
    },
    
    /**
     * Get creators with all their related content
     */
    getWithRelations: () => {
      const params = {
        'populate[challenges]': '*',
        'populate[tournaments]': '*',
        'populate[custom_codes]': '*',
      };
      return apiClient.get('/api/creators', { params });
    },
  },

  // Submissions
  submissions: {
    /**
     * Get all submissions with optional filtering
     */
    getAll: (options?: {
      filters?: Record<string, any>;
      sort?: string;
      pagination?: { page?: number; pageSize?: number };
    }) => {
      const params: Record<string, any> = {};
      
      if (options?.filters) {
        Object.entries(options.filters).forEach(([key, value]) => {
          if (key === 'challenge') {
            params[`filters[challenge][id][$eq]`] = value;
          } else {
            params[`filters[${key}][$eq]`] = value;
          }
        });
      }
      
      if (options?.sort) {
        params.sort = options.sort;
      }
      
      if (options?.pagination) {
        if (options.pagination.page) {
          params['pagination[page]'] = options.pagination.page;
        }
        if (options.pagination.pageSize) {
          params['pagination[pageSize]'] = options.pagination.pageSize;
        }
      }
      
      return apiClient.get('/api/submissions', { params });
    },
    
    /**
     * Create a new submission (matches backend field names)
     */
    create: (data: {
      runner_name: string;
      result?: string;
      video_url?: string;
      description?: string;
      challenge: number;
    }) => {
      return apiClient.post('/api/submissions', { data });
    },
    
    /**
     * Get submissions for a specific challenge (leaderboard)
     */
    getByChallengeId: (challengeId: number, sort = 'createdAt:asc') => {
      const params = {
        'filters[challenge][id][$eq]': challengeId,
        sort,
      };
      return apiClient.get('/api/submissions', { params });
    },
  },

  // Ideas (New content type from backend)
  ideas: {
    /**
     * Get all community ideas
     */
    getAll: (options?: {
      sort?: string;
      pagination?: { page?: number; pageSize?: number };
    }) => {
      const params: Record<string, any> = {};
      
      if (options?.sort) {
        params.sort = options.sort;
      }
      
      if (options?.pagination) {
        if (options.pagination.page) {
          params['pagination[page]'] = options.pagination.page;
        }
        if (options.pagination.pageSize) {
          params['pagination[pageSize]'] = options.pagination.pageSize;
        }
      }
      
      return apiClient.get('/api/ideas', { params });
    },
    
    /**
     * Submit a new community idea with social links
     */
    create: (data: {
      title: string;
      description: string;
      author_name: string;
      social_links?: Array<{
        platform: string;
        url: string;
      }>;
    }) => {
      return apiClient.post('/api/ideas', { data });
    },
  },

  // Statistics (New endpoint from backend)
  stats: {
    /**
     * Get overview statistics for dashboard
     */
    getOverview: (): Promise<{ data: StatsOverview }> => {
      return apiClient.get('/stats/overview');
    },
  },
};
