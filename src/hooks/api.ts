import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  ChallengeResponse, 
  CustomCode, 
  Tournament, 
  SimpleCreator,
  StatsOverview,
  ChallengeFilters,
  SubmissionFilters,
  TournamentFilters,
  CustomCodeFilters,
  CreatorFilters,
  IdeaFilters,
  StrapiCollectionResponse
} from '../types';
import { apiService } from '../services/api';

// Query keys for React Query cache management
export const queryKeys = {
  challenges: ['challenges'] as const,
  challenge: (slug: string) => ['challenges', slug] as const,
  submissions: ['submissions'] as const,
  submission: (id: number) => ['submissions', id] as const,
  tournaments: ['tournaments'] as const,
  tournament: (slug: string) => ['tournaments', slug] as const,
  customCodes: ['custom-codes'] as const,
  customCode: (slug: string) => ['custom-codes', slug] as const,
  creators: ['creators'] as const,
  creator: (slug: string) => ['creators', slug] as const,
  ideas: ['ideas'] as const,
  idea: (id: number) => ['ideas', id] as const,
  stats: ['stats'] as const,
} as const;

// Challenges
export const useChallenges = (filters?: ChallengeFilters) => {
  return useQuery({
    queryKey: [...queryKeys.challenges, filters],
    queryFn: () => apiService.challenges.getAll({ 
      filters: filters as Record<string, any> 
    }),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useChallenge = (slug: string) => {
  return useQuery({
    queryKey: queryKeys.challenge(slug),
    queryFn: () => apiService.challenges.getBySlug(slug),
    staleTime: 10 * 60 * 1000, // 10 minutes
    enabled: !!slug,
  });
};

// Submissions
export const useSubmissions = (filters?: SubmissionFilters) => {
  return useQuery({
    queryKey: [...queryKeys.submissions, filters],
    queryFn: () => apiService.submissions.getAll({ 
      filters: filters as Record<string, any> 
    }),
    staleTime: 30 * 1000, // 30 seconds (submissions change frequently)
  });
};

export const useCreateSubmission = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: { 
      runner: string;
      runner_url?: string;
      video_url?: string;
      note?: string;
      result?: string;
      challenge: string;
    }) => {
      // Map frontend field names to backend expected names
      const backendData: {
        runner_name: string;
        video_url?: string;
        description?: string;
        result?: string;
        challenge: number;
      } = {
        runner_name: data.runner,
        challenge: parseInt(data.challenge, 10),
      };
      
      // Only include optional fields if they have values
      if (data.video_url) backendData.video_url = data.video_url;
      if (data.note) backendData.description = data.note;
      if (data.result) backendData.result = data.result;
      
      return apiService.submissions.create(backendData);
    },
    onSuccess: () => {
      // Invalidate submissions queries to refetch data
      queryClient.invalidateQueries({ queryKey: queryKeys.submissions });
    },
  });
};

// Tournaments
export const useTournaments = (filters?: TournamentFilters, pagination?: { page?: number; pageSize?: number }) => {
  return useQuery<StrapiCollectionResponse<Tournament>>({
    queryKey: [...queryKeys.tournaments, filters, pagination],
    queryFn: () => {
      const options: {
        filters?: Record<string, any>;
        populate?: string;
        sort?: string;
        pagination?: { page?: number; pageSize?: number };
      } = {
        populate: 'creators',
        sort: 'createdAt:desc',
      };
      
      if (filters) {
        options.filters = filters as Record<string, any>;
      }
      
      if (pagination) {
        options.pagination = pagination;
      }
      
      return apiService.tournaments.getAll(options);
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useTournament = (slug: string) => {
  return useQuery<{data: Tournament}>({
    queryKey: queryKeys.tournament(slug),
    queryFn: () => apiService.tournaments.getBySlug(slug, 'creators,challenges.creators,faqs'),
    staleTime: 15 * 60 * 1000, // 15 minutes
    enabled: !!slug,
  });
};

// Custom Codes
export const useCustomCodes = (filters?: CustomCodeFilters, pagination?: { start?: number; limit?: number }) => {
  return useQuery<StrapiCollectionResponse<CustomCode>>({
    queryKey: [...queryKeys.customCodes, filters, pagination],
    queryFn: () => apiService.customCodes.getAll({ 
      populate: 'creators',
      filters: filters as Record<string, any>,
      pagination: pagination || { start: 0, limit: 1 } // Default to pagesize 1 for testing
    }),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useCustomCode = (slug: string) => {
  return useQuery<CustomCode>({
    queryKey: queryKeys.customCode(slug),
    queryFn: async () => {
      const response = await apiService.customCodes.getBySlug(slug);
      return response.data; // Extract data from Strapi response wrapper
    },
    staleTime: 15 * 60 * 1000, // 15 minutes
    enabled: !!slug,
  });
};

// Creators
export const useCreators = (filters?: CreatorFilters) => {
  return useQuery({
    queryKey: [...queryKeys.creators, filters],
    queryFn: () => apiService.creators.getAll({}), // No filters supported in creators API
    staleTime: 15 * 60 * 1000, // 15 minutes
  });
};

export const useCreator = (slug: string) => {
  return useQuery({
    queryKey: queryKeys.creator(slug),
    queryFn: () => apiService.creators.getBySlug(slug),
    staleTime: 15 * 60 * 1000, // 15 minutes
    enabled: !!slug,
  });
};

// Ideas (new from backend API)
export const useIdeas = (filters?: IdeaFilters) => {
  return useQuery({
    queryKey: [...queryKeys.ideas, filters],
    queryFn: () => apiService.ideas.getAll({}), // No filters in ideas API currently
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCreateIdea = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: {
      title: string;
      description: string; // Simplified for now
      author_name: string;
      social_links?: Array<{
        platform: string;
        url: string;
      }>;
    }) => apiService.ideas.create(data),
    onSuccess: () => {
      // Invalidate ideas queries to refetch data
      queryClient.invalidateQueries({ queryKey: queryKeys.ideas });
    },
  });
};

// Statistics (new from backend API)
export const useStatsOverview = () => {
  return useQuery<{ data: StatsOverview }>({
    queryKey: queryKeys.stats,
    queryFn: () => apiService.stats.getOverview(),
    staleTime: 60 * 60 * 1000, // 1 hour (stats don't change frequently)
  });
};

// Re-export types for convenience
export type {
  ChallengeResponse,
  CustomCode,
  Tournament,
  SimpleCreator,
  StatsOverview,
  ChallengeFilters,
  SubmissionFilters,
  TournamentFilters,
  CustomCodeFilters,
  CreatorFilters,
  IdeaFilters,
};
