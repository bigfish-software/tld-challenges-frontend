# API Integration Guide

This document provides comprehensive guidance for integrating with the TLD Challenges Strapi backend API from the React frontend.

## API Configuration

### Base Configuration
```typescript
// src/services/api.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:1337',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${import.meta.env.VITE_API_TOKEN}`,
  },
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);
```

### Environment Variables
```bash
# .env.local
VITE_API_BASE_URL=http://localhost:1337    # Backend API URL
VITE_API_TOKEN=your-long-lived-jwt-token   # Frontend API token from backend
VITE_APP_DOMAIN=http://localhost:3000      # Frontend domain for CORS
```

## Content Type Endpoints

### Challenge API
```typescript
// src/services/challengeService.ts
export const challengeService = {
  // Get all challenges with optional filtering
  getAll: (params?: {
    difficulty?: string;
    tournament?: number;
    creator?: number;
    search?: string;
    sort?: string;
    limit?: number;
    start?: number;
  }) => 
    apiClient.get('/api/challenges', { 
      params: {
        ...params,
        populate: 'custom_code,tournament,creators,rules,faqs',
        filters: {
          publishedAt: { $notNull: true }, // Only published content
          ...(params?.difficulty && { difficulty: { $eq: params.difficulty } }),
          ...(params?.tournament && { tournament: { id: { $eq: params.tournament } } }),
          ...(params?.creator && { creators: { id: { $eq: params.creator } } }),
        },
      },
    }),

  // Get single challenge by ID
  getById: (id: string) =>
    apiClient.get(`/api/challenges/${id}`, {
      params: {
        populate: {
          custom_code: true,
          tournament: true,
          creators: true,
          rules: true,
          faqs: true,
          submissions: {
            filters: { publishedAt: { $notNull: true } },
            sort: 'submitted_date:desc',
            limit: 10,
          },
        },
      },
    }),

  // Get challenges by tournament
  getByTournament: (tournamentId: number) =>
    apiClient.get('/api/challenges', {
      params: {
        filters: { 
          tournament: { id: { $eq: tournamentId } },
          publishedAt: { $notNull: true },
        },
        populate: 'custom_code,creators,rules',
        sort: 'created_date:asc',
      },
    }),
};
```

### Tournament API
```typescript
// src/services/tournamentService.ts
export const tournamentService = {
  // Get all tournaments
  getAll: (params?: {
    state?: 'planned' | 'active' | 'completed' | 'cancelled';
    sort?: string;
    limit?: number;
  }) =>
    apiClient.get('/api/tournaments', {
      params: {
        ...params,
        populate: 'creators,faqs',
        filters: {
          publishedAt: { $notNull: true },
          ...(params?.state && { state: { $eq: params.state } }),
        },
      },
    }),

  // Get tournament with challenges
  getById: (id: string) =>
    apiClient.get(`/api/tournaments/${id}`, {
      params: {
        populate: {
          challenges: {
            populate: ['custom_code', 'creators', 'rules'],
            filters: { publishedAt: { $notNull: true } },
          },
          creators: true,
          faqs: true,
        },
      },
    }),

  // Get tournament leaderboard
  getLeaderboard: (id: string) =>
    apiClient.get(`/api/tournaments/${id}`, {
      params: {
        populate: {
          challenges: {
            populate: {
              submissions: {
                filters: { publishedAt: { $notNull: true } },
                sort: 'result:asc', // Assuming lower time/score is better
              },
            },
          },
        },
      },
    }),
};
```

### Submission API
```typescript
// src/services/submissionService.ts
export const submissionService = {
  // Create anonymous submission (only write operation allowed)
  create: (data: {
    runner: string;
    runner_url?: string;
    video_url?: string;
    note?: string;
    result?: string;
    challenge: number; // Challenge ID
  }) =>
    apiClient.post('/api/submissions', {
      data: {
        ...data,
        submitted_date: new Date().toISOString(),
        state: 'pending', // Will be draft initially, requires admin approval
      },
    }),

  // Get published submissions for a challenge
  getByChallenge: (challengeId: number, params?: {
    limit?: number;
    start?: number;
    sort?: string;
  }) =>
    apiClient.get('/api/submissions', {
      params: {
        ...params,
        filters: {
          challenge: { id: { $eq: challengeId } },
          publishedAt: { $notNull: true },
        },
        populate: 'challenge',
        sort: params?.sort || 'submitted_date:desc',
      },
    }),

  // Get recent submissions across all challenges
  getRecent: (limit: number = 10) =>
    apiClient.get('/api/submissions', {
      params: {
        filters: { publishedAt: { $notNull: true } },
        populate: 'challenge',
        sort: 'submitted_date:desc',
        limit,
      },
    }),
};
```

### Creator API
```typescript
// src/services/creatorService.ts
export const creatorService = {
  // Get all creators
  getAll: (params?: { sort?: string; limit?: number }) =>
    apiClient.get('/api/creators', {
      params: {
        ...params,
        filters: { publishedAt: { $notNull: true } },
        sort: params?.sort || 'name:asc',
      },
    }),

  // Get creator by slug
  getBySlug: (slug: string) =>
    apiClient.get('/api/creators', {
      params: {
        filters: { 
          slug: { $eq: slug },
          publishedAt: { $notNull: true },
        },
        populate: {
          challenges: {
            filters: { publishedAt: { $notNull: true } },
            populate: ['custom_code', 'tournament'],
          },
          tournaments: {
            filters: { publishedAt: { $notNull: true } },
          },
          custom_codes: {
            filters: { publishedAt: { $notNull: true } },
          },
        },
      },
    }),
};
```

### Custom Code API
```typescript
// src/services/customCodeService.ts
export const customCodeService = {
  // Get all custom codes
  getAll: (params?: { search?: string; sort?: string; limit?: number }) =>
    apiClient.get('/api/custom-codes', {
      params: {
        ...params,
        filters: { 
          publishedAt: { $notNull: true },
          ...(params?.search && {
            $or: [
              { name: { $containsi: params.search } },
              { description: { $containsi: params.search } },
            ],
          }),
        },
        populate: 'creators,faqs',
        sort: params?.sort || 'name:asc',
      },
    }),

  // Get custom code by slug
  getBySlug: (slug: string) =>
    apiClient.get('/api/custom-codes', {
      params: {
        filters: { 
          slug: { $eq: slug },
          publishedAt: { $notNull: true },
        },
        populate: {
          challenges: {
            filters: { publishedAt: { $notNull: true } },
            populate: ['tournament', 'creators'],
          },
          creators: true,
          faqs: true,
        },
      },
    }),
};
```

### FAQ API
```typescript
// src/services/faqService.ts
export const faqService = {
  // Get FAQs by entity type and ID
  getByEntity: (entityType: 'challenges' | 'tournaments' | 'custom-codes', entityId: number) =>
    apiClient.get('/api/faqs', {
      params: {
        filters: {
          [entityType]: { id: { $eq: entityId } },
          publishedAt: { $notNull: true },
        },
        sort: 'question:asc',
      },
    }),

  // Get all FAQs
  getAll: (params?: { search?: string; limit?: number }) =>
    apiClient.get('/api/faqs', {
      params: {
        ...params,
        filters: {
          publishedAt: { $notNull: true },
          ...(params?.search && {
            $or: [
              { question: { $containsi: params.search } },
              { answer: { $containsi: params.search } },
            ],
          }),
        },
        sort: 'question:asc',
      },
    }),
};
```

## React Query Integration

### Query Keys Pattern
```typescript
// src/hooks/queryKeys.ts
export const queryKeys = {
  challenges: ['challenges'] as const,
  challenge: (id: string) => ['challenges', id] as const,
  challengesByTournament: (tournamentId: number) => 
    ['challenges', 'tournament', tournamentId] as const,
  
  tournaments: ['tournaments'] as const,
  tournament: (id: string) => ['tournaments', id] as const,
  
  submissions: ['submissions'] as const,
  submissionsByChallenge: (challengeId: number) => 
    ['submissions', 'challenge', challengeId] as const,
  
  creators: ['creators'] as const,
  creator: (slug: string) => ['creators', slug] as const,
  
  customCodes: ['custom-codes'] as const,
  customCode: (slug: string) => ['custom-codes', slug] as const,
  
  faqs: ['faqs'] as const,
  faqsByEntity: (entityType: string, entityId: number) => 
    ['faqs', entityType, entityId] as const,
};
```

### Custom Hooks
```typescript
// src/hooks/useChallenges.ts
export const useChallenges = (filters?: ChallengeFilters) => {
  return useQuery({
    queryKey: [...queryKeys.challenges, filters],
    queryFn: () => challengeService.getAll(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    select: (response) => response.data,
  });
};

export const useChallenge = (id: string) => {
  return useQuery({
    queryKey: queryKeys.challenge(id),
    queryFn: () => challengeService.getById(id),
    staleTime: 10 * 60 * 1000, // 10 minutes
    select: (response) => response.data.data,
    enabled: !!id,
  });
};

// src/hooks/useSubmissions.ts
export const useCreateSubmission = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: submissionService.create,
    onSuccess: (data, variables) => {
      // Invalidate submissions for the challenge
      queryClient.invalidateQueries({
        queryKey: queryKeys.submissionsByChallenge(variables.challenge),
      });
      
      // Invalidate recent submissions
      queryClient.invalidateQueries({
        queryKey: queryKeys.submissions,
      });
    },
  });
};
```

## Error Handling

### API Error Types
```typescript
// src/types/api.ts
export interface ApiError {
  data: {
    error: {
      status: number;
      name: string;
      message: string;
      details?: any;
    };
  };
}

export interface ValidationError {
  data: {
    error: {
      message: string;
      details: {
        errors: Array<{
          path: string[];
          message: string;
          name: string;
        }>;
      };
    };
  };
}
```

### Error Handling Hook
```typescript
// src/hooks/useErrorHandler.ts
export const useErrorHandler = () => {
  const handleApiError = useCallback((error: AxiosError<ApiError>) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - redirect to error page
      console.error('API Authentication failed');
      return 'Authentication error. Please check your API configuration.';
    }
    
    if (error.response?.status === 403) {
      return 'Access denied. You do not have permission to perform this action.';
    }
    
    if (error.response?.status === 404) {
      return 'The requested resource was not found.';
    }
    
    if (error.response?.status === 429) {
      return 'Too many requests. Please wait before trying again.';
    }
    
    if (error.response?.status >= 500) {
      return 'Server error. Please try again later.';
    }
    
    return error.response?.data?.error?.message || 'An unexpected error occurred.';
  }, []);
  
  return { handleApiError };
};
```

## Data Validation

### Form Validation Schemas
```typescript
// src/utils/validation.ts
import { z } from 'zod';

export const submissionSchema = z.object({
  runner: z.string().min(1, 'Runner name is required').max(100, 'Name too long'),
  runner_url: z.string().url('Invalid URL').optional().or(z.literal('')),
  video_url: z.string().url('Invalid URL').optional().or(z.literal('')),
  note: z.string().max(1000, 'Note too long').optional(),
  result: z.string().max(50, 'Result too long').optional(),
  challenge: z.number().positive('Invalid challenge'),
});

export const urlValidation = {
  youtube: (url: string) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]+(&[\w=]*)?$/;
    return youtubeRegex.test(url);
  },
  
  twitch: (url: string) => {
    const twitchRegex = /^(https?:\/\/)?(www\.)?twitch\.tv\/(videos\/\d+|[\w-]+)$/;
    return twitchRegex.test(url);
  },
  
  isValidVideoUrl: (url: string) => {
    return urlValidation.youtube(url) || urlValidation.twitch(url);
  },
};
```

## Caching Strategy

### Cache Configuration
```typescript
// src/lib/queryClient.ts
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes default
      cacheTime: 10 * 60 * 1000, // 10 minutes cache
      retry: (failureCount, error) => {
        if (error instanceof AxiosError && error.response?.status === 404) {
          return false; // Don't retry 404s
        }
        return failureCount < 3;
      },
    },
    mutations: {
      retry: false, // Don't retry mutations by default
    },
  },
});
```

### Prefetching Strategy
```typescript
// src/hooks/usePrefetch.ts
export const usePrefetchChallenge = () => {
  const queryClient = useQueryClient();
  
  return useCallback((id: string) => {
    queryClient.prefetchQuery({
      queryKey: queryKeys.challenge(id),
      queryFn: () => challengeService.getById(id),
      staleTime: 10 * 60 * 1000,
    });
  }, [queryClient]);
};
```

## Performance Optimization

### Request Optimization
```typescript
// Efficient population for list views
const listPopulate = 'custom_code,tournament,creators';

// Full population for detail views
const detailPopulate = {
  custom_code: true,
  tournament: true,
  creators: true,
  rules: true,
  faqs: true,
  submissions: {
    filters: { publishedAt: { $notNull: true } },
    sort: 'submitted_date:desc',
    limit: 10,
  },
};
```

### Pagination Support
```typescript
// src/hooks/useInfiniteQuery.ts
export const useInfiniteChallenges = (filters?: ChallengeFilters) => {
  return useInfiniteQuery({
    queryKey: [...queryKeys.challenges, 'infinite', filters],
    queryFn: ({ pageParam = 0 }) =>
      challengeService.getAll({
        ...filters,
        start: pageParam,
        limit: 20,
      }),
    getNextPageParam: (lastPage, pages) => {
      const totalLoaded = pages.length * 20;
      return lastPage.data.meta.pagination.total > totalLoaded 
        ? totalLoaded 
        : undefined;
    },
    staleTime: 5 * 60 * 1000,
  });
};
```

## Rate Limiting

### Client-side Rate Limiting
```typescript
// src/utils/rateLimiter.ts
class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  
  canMakeRequest(key: string, limit: number, windowMs: number): boolean {
    const now = Date.now();
    const requests = this.requests.get(key) || [];
    
    // Remove expired requests
    const validRequests = requests.filter(time => now - time < windowMs);
    
    if (validRequests.length >= limit) {
      return false;
    }
    
    validRequests.push(now);
    this.requests.set(key, validRequests);
    return true;
  }
}

export const rateLimiter = new RateLimiter();

// Usage in submission hook
export const useCreateSubmission = () => {
  return useMutation({
    mutationFn: (data: SubmissionData) => {
      if (!rateLimiter.canMakeRequest('submission', 5, 5 * 60 * 1000)) {
        throw new Error('Rate limit exceeded. Please wait before submitting again.');
      }
      return submissionService.create(data);
    },
    // ... rest of mutation config
  });
};
```

This API integration guide provides comprehensive patterns for connecting your React frontend with the Strapi backend, ensuring proper error handling, caching, and performance optimization.
