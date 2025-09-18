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

export interface ChallengeResponse {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  description_long?: StrapiRichTextBlocks;
  description_short?: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Very Hard';
  is_featured: boolean;
  has_leaderboard: boolean;
  submission_result_sorting: 'ASC' | 'DESC';
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
  tournaments?: {
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
  }[];
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

// Simple challenge type as returned in relations (not full Strapi entity)
export interface SimpleChallenge {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Very Hard';
  description_short?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  is_featured?: boolean;
  thumbnail?: StrapiMedia | null;
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
  thumbnail?: StrapiMedia | null;

  // Direct relations (populated by backend slug endpoint)
  creators?: SimpleCreator[];
  
  // The challenges array may contain ChallengeResponse objects or simpler challenge objects
  challenges?: (ChallengeResponse | {
    id: number;
    documentId: string;
    name: string;
    slug?: string | null;
    difficulty?: string;
    description_short?: string;
    is_featured?: boolean;
    custom_code?: any;
    creators?: SimpleCreator[];
    thumbnail?: StrapiMedia | null;
  })[];
  
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
  description_long?: StrapiRichTextBlocks | null; // Rich text blocks - can be null
  description_short?: string; // Short description for cards
  is_featured?: boolean; // Whether this is a featured custom code
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  thumbnail?: StrapiMedia | null;
  
  // Relations - Direct arrays as returned by Strapi populate
  creators: SimpleCreator[];
  challenges?: SimpleChallenge[];
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

// Content Type: PageHero (Single type containing hero images for all pages)
export interface PageHero {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  
  // Hero images for different pages
  home?: StrapiMedia | null;
  codes?: StrapiMedia | null;
  challenges?: StrapiMedia | null;
  tournament?: StrapiMedia | null;
  submit_run?: StrapiMedia | null;
  submit_idea?: StrapiMedia | null;
  support?: StrapiMedia | null;
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


