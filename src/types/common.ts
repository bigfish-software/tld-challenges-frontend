import { ReactNode } from 'react';

// Re-export API types for convenience
export * from './api';

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

// Base filter type that extends partial of any object
export type BaseFilter<T> = Partial<T> & {
  _q?: string; // Global search query
  _sort?: string; // Sort parameter
  _start?: number; // Pagination start
  _limit?: number; // Pagination limit
  page?: number; // Page number
  pageSize?: number; // Page size
};

// Specific filter types for each content type
export interface ChallengeFilters extends BaseFilter<{
  name?: string;
  slug?: string;
  difficulty?: 'Pilgrim' | 'Voyager' | 'Stalker' | 'Interloper' | 'Misery' | 'Nogoa' | 'Custom';
  tournament?: string; // Tournament slug
  creator?: string; // Creator slug
}> {}

export interface SubmissionFilters extends BaseFilter<{
  runner?: string;
  state?: 'pending' | 'approved' | 'rejected';
  challenge?: string; // Challenge slug
}> {}

export interface TournamentFilters extends BaseFilter<{
  name?: string;
  slug?: string;
  state?: 'planned' | 'active' | 'completed' | 'cancelled';
  creator?: string; // Creator slug
}> {}

export interface CustomCodeFilters extends BaseFilter<{
  name?: string;
  slug?: string;
  creator?: string; // Creator slug
}> {}

export interface CreatorFilters extends BaseFilter<{
  name?: string;
  slug?: string;
}> {}

export interface IdeaFilters extends BaseFilter<{
  title?: string;
  author_name?: string;
}> {}

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

// Simplified mock types for Storybook and development
export interface MockChallenge {
  id: number;
  title: string;
  description: string;
  rules: string[];
  creator: {
    name: string;
    url?: string;
  };
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Extreme';
  duration: string;
  region: string;
  tags: string[];
  submissions: number;
  participants: number;
  status: 'Active' | 'Completed' | 'Upcoming';
  createdAt: string;
  endDate: string;
}

export interface MockTournament {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'Upcoming' | 'Active' | 'Completed';
  participants: number;
  prizes: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Extreme';
  creator: {
    name: string;
    url?: string;
  };
  challenges: number;
  region: string;
  tags: string[];
}

// Remove MockCustomCode - custom codes should use API structure in mock data

// Environment Variables
export interface EnvironmentConfig {
  API_BASE_URL: string;
  API_TOKEN: string;
  APP_DOMAIN: string;
  ENABLE_ANALYTICS: boolean;
  ENABLE_DEV_TOOLS: boolean;
}
