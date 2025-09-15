import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosRequestConfig } from 'axios';
import type { StatsOverview, Tournament, CustomCode } from '@/types/api';

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
    // Get base URL and ensure it has /api suffix for API calls
    const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:1337';
    const apiBaseURL = baseURL.endsWith('/api') ? baseURL : `${baseURL}/api`;
    
    this.instance = axios.create({
      baseURL: apiBaseURL,
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
 * ⚠️  IMPORTANT: DO NOT ADD /api/ PREFIX TO ENDPOINTS!
 * ⚠️  The baseURL is automatically configured with /api suffix
 * ⚠️  Endpoints should start with / (e.g., '/custom-codes', '/challenges')
 * ⚠️  Adding /api/ will result in duplicate /api/api/ in the URL
 * 
 * Key features from backend:
 * - Slug-based endpoints for better SEO and user-friendly URLs
 * - Complex population patterns for related data
 * - Featured content filtering
 * - Ideas content type for community submissions
 * - Statistics endpoint for dashboard data
 */

// ⚠️ ENDPOINT PREFIX WARNING: Do not add /api/ to these paths!
const ENDPOINTS = {
  CHALLENGES: '/challenges',
  TOURNAMENTS: '/tournaments', 
  CUSTOM_CODES: '/custom-codes',
  CREATORS: '/creators',
  SUBMISSIONS: '/submissions',
  IDEAS: '/ideas',
  STATS: '/stats'
} as const;
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
      pagination?: { start?: number; limit?: number };
    }): Promise<{ data: any[]; meta?: { pagination?: { start: number; limit: number; total: number; } } }> => {
      const params: Record<string, any> = {};
      
      // Handle population with bracket notation for multiple relations
      if (options?.populate) {
        const populateFields = options.populate.split(',');
        populateFields.forEach(field => {
          params[`populate[${field.trim()}]`] = true;
        });
      }
      
      if (options?.filters) {
        Object.entries(options.filters).forEach(([key, value]) => {
          params[`filters[${key}][$eq]`] = value;
        });
      }
      
      if (options?.sort) {
        params.sort = options.sort;
      }
      
      // Use start/limit pagination format as expected by Strapi
      if (options?.pagination) {
        if (options.pagination.start !== undefined) {
          params['pagination[start]'] = options.pagination.start;
        }
        if (options.pagination.limit !== undefined) {
          params['pagination[limit]'] = options.pagination.limit;
        }
      }
      
      return apiClient.get('/challenges', { params });
    },
    
    /**
     * Get challenge by slug (SEO-friendly URLs)
     * Note: This is a custom endpoint that handles population internally in the backend
     */
    getBySlug: (slug: string) => {
      return apiClient.get(`/challenges/slug/${slug}`);
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
    }): Promise<{ data: any[]; meta?: { pagination?: { page: number; pageSize: number; pageCount: number; total: number; } } }> => {
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
     * Note: This is a custom endpoint that handles population internally in the backend
     * The response includes challenges with their thumbnails and rules
     */
    getBySlug: (slug: string): Promise<{data: Tournament}> => {
      // No need for population parameters as the backend handles it internally
      // The backend now returns challenges with thumbnails and rules
      return apiClient.get(`/tournaments/slug/${slug}`);
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
     * Uses proper Strapi API format with /api/ prefix and pagination parameters
     */
    getAll: (options?: {
      populate?: string;
      filters?: Record<string, any>;
      sort?: string;
      pagination?: { start?: number; limit?: number };
    }): Promise<{ data: any[]; meta?: { pagination?: { page: number; pageSize: number; pageCount: number; total: number; } } }> => {
      const params: Record<string, any> = {};
      
      // Always populate creators as minimum
      params.populate = options?.populate || 'creators';
      
      if (options?.filters) {
        Object.entries(options.filters).forEach(([key, value]) => {
          params[`filters[${key}][$eq]`] = value;
        });
      }
      
      if (options?.sort) {
        params.sort = options.sort;
      }
      
      // Use Strapi pagination format: pagination[start] and pagination[limit]
      if (options?.pagination) {
        if (options.pagination.start !== undefined) {
          params['pagination[start]'] = options.pagination.start;
        }
        if (options.pagination.limit !== undefined) {
          params['pagination[limit]'] = options.pagination.limit;
        }
      } else {
        // Default pagination for testing (pagesize of 1 as requested)
        params['pagination[start]'] = 0;
        params['pagination[limit]'] = 1;
      }
      
      return apiClient.get(ENDPOINTS.CUSTOM_CODES, { params });
    },
    
    /**
     * Get custom code by slug
     * Note: This is a custom endpoint that returns populated data by default
     */
    getBySlug: (slug: string): Promise<{ data: CustomCode; meta: {} }> => {
      return apiClient.get(`${ENDPOINTS.CUSTOM_CODES}/slug/${slug}`);
    },
    
    /**
     * Get featured custom codes only
     */
    getFeatured: (populate?: string) => {
      const params: Record<string, any> = {
        'filters[is_featured][$eq]': true,
        populate: populate || 'creators',
      };
      return apiClient.get(ENDPOINTS.CUSTOM_CODES, { params });
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
      
      return apiClient.get(ENDPOINTS.CREATORS, { params });
    },
    
    /**
     * Get creator by slug
     * Note: This is a custom endpoint that handles population internally in the backend
     */
    getBySlug: (slug: string) => {
      return apiClient.get(`${ENDPOINTS.CREATORS}/slug/${slug}`);
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
      return apiClient.get(ENDPOINTS.CREATORS, { params });
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
      
      return apiClient.get(ENDPOINTS.SUBMISSIONS, { params });
    },
    
    /**
     * Create a new submission (matches backend field names)
     */
    create: (data: {
      runner: string;
      runner_url?: string;
      result?: string;
      video_url?: string;
      note?: string;
      challenge: number;
    }) => {
      // Filter out empty optional fields to match exactly what works in Postman
      const cleanData: any = {
        runner: data.runner,
        challenge: data.challenge
      };
      
      // Only include optional fields if they have actual values
      if (data.runner_url && data.runner_url.trim()) {
        cleanData.runner_url = data.runner_url.trim();
      }
      if (data.video_url && data.video_url.trim()) {
        cleanData.video_url = data.video_url.trim();
      }
      if (data.note && data.note.trim()) {
        cleanData.note = data.note.trim();
      }
      if (data.result && data.result.trim()) {
        cleanData.result = data.result.trim();
      }
      
      return apiClient.post(ENDPOINTS.SUBMISSIONS, { data: cleanData });
    },
    
    /**
     * Get submissions for a specific challenge (leaderboard)
     */
    getByChallengeId: (challengeId: number, sort = 'createdAt:asc') => {
      const params = {
        'filters[challenge][id][$eq]': challengeId,
        sort,
      };
      return apiClient.get(ENDPOINTS.SUBMISSIONS, { params });
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
      
      return apiClient.get(ENDPOINTS.IDEAS, { params });
    },
    
    /**
     * Submit a new community idea (matches Postman request format)
     */
    create: (data: {
      type: string;
      description: string;
      creator: string;
      creator_twitch?: string;
      creator_youtube?: string;
    }) => {
      return apiClient.post(ENDPOINTS.IDEAS, { data });
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
