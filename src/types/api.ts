// TypeScript types based on the Strapi backend ORM documentation
// This file models the actual content types from the tld-challenges-backend

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

// Content Type: Challenge
export interface Challenge extends StrapiEntity {
  attributes: {
    name: string;
    description?: string; // Rich text (Blocks)
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
    description?: string; // Rich text (Blocks)
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
  description?: any; // Rich text blocks - complex structure from Strapi
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  created_date?: string;
  updated_date?: string;
  
  // Relations - Direct arrays as returned by Strapi populate
  creators: SimpleCreator[];
  challenges?: any[];
  faqs?: any[];
}

// Content Type: Rule
export interface Rule extends StrapiEntity {
  attributes: {
    description: string; // Rich text (Blocks)
    
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
    answer: string; // Rich text (Blocks)
    
    // Relations
    challenges?: StrapiCollection<Challenge>;
    custom_codes?: StrapiCollection<CustomCode>;
    tournaments?: StrapiCollection<Tournament>;
  };
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

// Legacy types for compatibility with current mock data
// These will be updated as we integrate with the real API

export interface LegacyCustomCode {
  id: number;
  name: string;
  description: string;
  code: string;
  creator: { name: string; url?: string };
  tags: string[];
  downloads: number;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Extreme';
  createdAt: string;
}

export interface LegacyChallenge {
  id: number;
  name: string;
  description: string;
  status: 'Active' | 'Upcoming' | 'Completed';
  region: 'Mystery Lake' | 'Coastal Highway' | 'Pleasant Valley' | 'Timberwolf Mountain' | 'Forlorn Muskeg' | 'Broken Railroad' | 'Hushed River Valley' | 'Bleak Inlet' | 'Ash Canyon' | 'Blackrock' | 'Zone of Contamination';
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Extreme';
  participants: number;
  creator: { name: string; url?: string };
  tournament?: string;
  createdAt: string;
}

export interface LegacyTournament {
  id: number;
  name: string;
  description: string;
  format: 'Single Elimination' | 'Double Elimination' | 'Round Robin' | 'Swiss System' | 'Time Trial' | 'Survival Contest';
  status: 'Registration Open' | 'In Progress' | 'Completed' | 'Cancelled';
  participants: number;
  maxParticipants: number;
  prizePool: string;
  startDate: string;
  endDate: string;
  entryFee: 'Free' | 'Paid';
  creator: { name: string; url?: string };
}
