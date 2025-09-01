// TypeScript types based on the Strapi backend ORM documentation
// This file models the actual content types from the tld-challenges-backend

import { StrapiRichTextBlocks } from './richText';

export interface StrapiEntity {
  id: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

export interface StrapiRelation<T> {
  data: T | null;
}

export interface StrapiCollection<T> {
  data: T[];
}

// Direct API Response interfaces (without Strapi wrapper)
export interface ChallengeResponse {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  description_long?: any; // Rich text blocks or null
  description_short?: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Very Hard' | 'Extreme'; // Actual values from API
  is_featured: boolean;
  
  // Direct relations (not wrapped)
  creators: SimpleCreator[];
  custom_code?: {
    id: number;
    documentId: string;
    name: string;
    slug: string;
    code: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    description_short?: string;
    description_long?: any;
    is_featured: boolean;
  } | null;
}

// Content Type: Challenge (Legacy - keeping for compatibility)
export interface Challenge extends StrapiEntity {
  attributes: {
    name: string;
    description?: StrapiRichTextBlocks; // Rich text (Blocks)
    slug: string;
    difficulty: 'Pilgrim' | 'Voyager' | 'Stalker' | 'Interloper' | 'Misery' | 'Nogoa' | 'Custom';
    created_date?: string;
    updated_date?: string;
    
    // Relations
    submissions?: StrapiCollection<Submission>;
    custom_code?: StrapiRelation<CustomCode>;
    tournament?: StrapiRelation<Tournament>;
    creators?: StrapiCollection<Creator>;
    rules?: StrapiCollection<Rule>;
    faqs?: StrapiCollection<FAQ>;
  };
}

// Content Type: Submission
export interface Submission extends StrapiEntity {
  attributes: {
    runner: string;
    runner_url?: string;
    video_url?: string;
    note?: string;
    state: 'pending' | 'approved' | 'rejected';
    result?: string;
    submitted_date?: string;
    
    // Relations
    challenge?: StrapiRelation<Challenge>;
  };
}

// Content Type: Tournament
export interface Tournament extends StrapiEntity {
  attributes: {
    name: string;
    description?: StrapiRichTextBlocks; // Rich text (Blocks)
    slug: string;
    start_date: string;
    end_date: string;
    state: 'planned' | 'active' | 'completed' | 'cancelled';
    created_date?: string;
    updated_date?: string;
    
    // Relations
    challenges?: StrapiCollection<Challenge>;
    creators?: StrapiCollection<Creator>;
    faqs?: StrapiCollection<FAQ>;
  };
}

// Simple creator type as returned in relations (not full Strapi entity)
export interface SimpleCreator {
  id: number;
  documentId?: string;
  name: string;
  slug: string;
  twitch?: string;
  youtube?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

// Content Type: CustomCode (actual API response structure)
export interface CustomCode {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  code: string;
  description?: StrapiRichTextBlocks; // Rich text blocks - structured content from Strapi
  description_short?: string; // Short description for cards
  is_featured?: boolean; // Whether this is a featured custom code
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  created_date?: string;
  updated_date?: string;
  
  // Relations - Direct arrays as returned by Strapi populate
  creators: SimpleCreator[];
  challenges?: Challenge[];
  faqs?: FAQ[];
}

// Content Type: Rule
export interface Rule extends StrapiEntity {
  attributes: {
    description: StrapiRichTextBlocks; // Rich text (Blocks)
    
    // Relations
    challenges?: StrapiCollection<Challenge>;
  };
}

// Content Type: Creator
export interface Creator extends StrapiEntity {
  attributes: {
    name: string;
    slug: string;
    twitch?: string;
    youtube?: string;
    
    // Relations
    challenges?: StrapiCollection<Challenge>;
    tournaments?: StrapiCollection<Tournament>;
    custom_codes?: StrapiCollection<CustomCode>;
  };
}

// Content Type: FAQ
export interface FAQ extends StrapiEntity {
  attributes: {
    question: string;
    answer: StrapiRichTextBlocks; // Rich text (Blocks)
    
    // Relations
    challenges?: StrapiCollection<Challenge>;
    custom_codes?: StrapiCollection<CustomCode>;
    tournaments?: StrapiCollection<Tournament>;
  };
}

// Content Type: Idea (New from backend API)
export interface Idea extends StrapiEntity {
  attributes: {
    title: string;
    description: StrapiRichTextBlocks; // Rich text (Blocks)
    author_name: string;
    social_links?: Array<{
      platform: string;
      url: string;
    }>;
  };
}

// Content Type: StatsOverview (New from backend API)
export interface StatsOverview {
  challenges: number;
  tournaments: number;
  customCodes: number;
  submissions: number;
  creators: number;
  ideas: number;
}

// Helper types for API responses
export interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiCollectionResponse<T> {
  data: T[];
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}


