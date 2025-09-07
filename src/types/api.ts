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

// Strapi Media Object (for thumbnails and other media)
export interface StrapiMedia {
  id: number;
  documentId: string;
  name: string;
  alternativeText?: string | null;
  caption?: string | null;
  width: number;
  height: number;
  formats?: {
    large?: StrapiMediaFormat;
    medium?: StrapiMediaFormat;
    small?: StrapiMediaFormat;
    thumbnail?: StrapiMediaFormat;
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: string | null;
  provider: string;
  provider_metadata?: any;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface StrapiMediaFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path?: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}

// Direct API Response interfaces (without Strapi wrapper)
export interface ChallengeResponse {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  description_long?: StrapiRichTextBlocks; // Rich text blocks
  description_short?: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Very Hard' | 'Extreme'; // Actual values from API
  is_featured: boolean;
  thumbnail?: StrapiMedia | null;
  
  // Direct relations (populated by backend slug endpoint)
  creators?: SimpleCreator[];
  custom_code?: {
    id: number;
    documentId: string;
    name: string;
    slug: string;
    code: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string | null;
    description_short?: string;
    description_long?: StrapiRichTextBlocks | null;
    is_featured: boolean;
  } | null;
  tournament?: {
    id: number;
    documentId: string;
    name: string;
    slug: string;
    start_date: string;
    end_date: string;
    state: 'planned' | 'active' | 'completed' | 'cancelled';
    createdAt: string;
    updatedAt: string;
    publishedAt: string | null;
    description_short?: string;
    description_long?: StrapiRichTextBlocks | null;
    is_featured: boolean;
  } | null;
  rules?: {
    id: number;
    documentId: string;
    name?: string;
    description: StrapiRichTextBlocks; // Rich text blocks
    createdAt: string;
    updatedAt: string;
    publishedAt: string | null;
  }[];
  faqs?: {
    id: number;
    documentId: string;
    question: string;
    answer: StrapiRichTextBlocks; // Rich text blocks
    name?: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string | null;
  }[];
  submissions?: {
    id: number;
    documentId: string;
    runner: string;
    runner_url?: string;
    video_url?: string;
    note?: string;
    result?: string;
    submitted_date?: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string | null;
  }[];
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

// Content Type: Tournament (Updated to match actual API response)
export interface Tournament {
  id: number;
  documentId: string;
  name: string;
  slug: string | null;
  start_date: string;
  end_date: string;
  state: 'planned' | 'active' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  description_short?: string;
  description_long?: any; // Rich text blocks or null
  is_featured: boolean;

  // Direct relations (populated by backend slug endpoint)
  creators?: SimpleCreator[];
  challenges?: ChallengeResponse[];
  faqs?: {
    id: number;
    documentId: string;
    question: string;
    answer: any; // Rich text blocks
    name?: string;
  }[];
}

// Simple creator type as returned in relations (not full Strapi entity)
// KEEPING ORIGINAL WORKING VERSION - DO NOT CHANGE
export interface SimpleCreator {
  id: number;
  documentId?: string;
  name: string;
  username?: string;
  display_name?: string;
  slug: string;
  twitch_url?: string;
  youtube_url?: string;
  twitter_url?: string;
  // NEW: Support both old and new field names for compatibility
  twitch?: string;
  youtube?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  description_short?: string | null;
  description_long?: StrapiRichTextBlocks | null;
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


