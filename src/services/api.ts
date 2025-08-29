import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosRequestConfig } from 'axios';

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
      baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:1337/api',
      timeout: 10000,
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
