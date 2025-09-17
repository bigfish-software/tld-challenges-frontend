import { ReactNode } from 'react';

export * from './api';

export type BaseFilter<T> = Partial<T> & {
  _q?: string;
  _sort?: string;
  _start?: number;
  _limit?: number;
  page?: number;
  pageSize?: number;
};

export interface ChallengeFilters extends BaseFilter<{
  name?: string;
  slug?: string;
  difficulty?: 'Pilgrim' | 'Voyager' | 'Stalker' | 'Interloper' | 'Misery' | 'Nogoa' | 'Custom';
  tournament?: string;
  creator?: string;
}> {}

export interface SubmissionFilters extends BaseFilter<{
  runner?: string;
  state?: 'pending' | 'approved' | 'rejected';
  challenge?: string;
}> {}

export interface TournamentFilters extends BaseFilter<{
  name?: string;
  slug?: string;
  state?: 'planned' | 'active' | 'completed' | 'cancelled';
  creator?: string;
}> {}

export interface CustomCodeFilters extends BaseFilter<{
  name?: string;
  slug?: string;
  creator?: string;
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
