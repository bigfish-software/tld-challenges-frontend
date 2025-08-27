import { ReactNode } from 'react';

// API Response Types
export interface APIResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
  error?: {
    status: number;
    name: string;
    message: string;
    details?: Record<string, unknown>;
  };
}

// Theme Types
export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDark: boolean;
}

// Component Props Types
export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
}

// API Error Types
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

// Environment Variables
export interface EnvironmentConfig {
  API_BASE_URL: string;
  API_TOKEN: string;
  APP_DOMAIN: string;
  ENABLE_ANALYTICS: boolean;
  ENABLE_DEV_TOOLS: boolean;
}
