import { useState, useEffect } from 'react';
import { apiClient } from '@/services/api';
import type { 
  CustomCode, 
  Challenge, 
  Tournament,
  Creator,
  Submission,
  StrapiCollectionResponse 
} from '@/types/api';

// Hook for fetching custom codes from Strapi
export const useCustomCodes = () => {
  const [customCodes, setCustomCodes] = useState<CustomCode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomCodes = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch custom codes with creators populated
        const response = await apiClient.get<StrapiCollectionResponse<CustomCode>>('/custom-codes', {
          params: {
            'filters[publishedAt][$notNull]': true,
            'populate': 'creators',
            'sort[0]': 'createdAt:desc'
          }
        });
        
        setCustomCodes(response.data || []);
      } catch (err: any) {
        const errorMessage = err.response?.data?.error?.message || err.message || 'Failed to fetch custom codes';
        console.error('❌ Failed to fetch custom codes:', err);
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomCodes();
  }, []);

  const refetch = () => {
    setCustomCodes([]);
    setLoading(true);
    setError(null);
  };

  return {
    customCodes,
    loading,
    error,
    refetch,
  };
};

// Hook for fetching challenges from Strapi
export const useChallenges = () => {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch challenges with all relations populated
        const response = await apiClient.get<StrapiCollectionResponse<Challenge>>('/challenges', {
          params: {
            'filters[publishedAt][$notNull]': true,
            'populate[creators]': '*',
            'populate[tournament]': '*',
            'populate[custom_code]': '*',
            'populate[rules]': '*',
            'sort[0]': 'createdAt:desc'
          }
        });
        
        setChallenges(response.data || []);
      } catch (err: any) {
        const errorMessage = err.response?.data?.error?.message || err.message || 'Failed to fetch challenges';
        setError(errorMessage);
        console.error('Failed to fetch challenges:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchChallenges();
  }, []);

  const refetch = () => {
    setChallenges([]);
    setLoading(true);
    setError(null);
  };

  return {
    challenges,
    loading,
    error,
    refetch,
  };
};

// Hook for fetching tournaments from Strapi
export const useTournaments = () => {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await apiClient.get<StrapiCollectionResponse<Tournament>>('/tournaments', {
          params: {
            'filters[publishedAt][$notNull]': true,
            'populate[creators]': '*',
            'populate[challenges]': '*',
            'sort[0]': 'start_date:desc'
          }
        });
        
        setTournaments(response.data || []);
      } catch (err: any) {
        const errorMessage = err.response?.data?.error?.message || err.message || 'Failed to fetch tournaments';
        setError(errorMessage);
        console.error('Failed to fetch tournaments:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTournaments();
  }, []);

  const refetch = () => {
    setTournaments([]);
    setLoading(true);
    setError(null);
  };

  return {
    tournaments,
    loading,
    error,
    refetch,
  };
};

// Hook for fetching creators from Strapi
export const useCreators = () => {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await apiClient.get<StrapiCollectionResponse<Creator>>('/creators', {
          params: {
            'filters[publishedAt][$notNull]': true,
            'sort[0]': 'name:asc'
          }
        });
        
        setCreators(response.data || []);
      } catch (err: any) {
        const errorMessage = err.response?.data?.error?.message || err.message || 'Failed to fetch creators';
        setError(errorMessage);
        console.error('Failed to fetch creators:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCreators();
  }, []);

  const refetch = () => {
    setCreators([]);
    setLoading(true);
    setError(null);
  };

  return {
    creators,
    loading,
    error,
    refetch,
  };
};

// Hook for creating submissions (anonymous endpoint)
export const useCreateSubmission = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createSubmission = async (submissionData: {
    runner: string;
    runner_url?: string;
    video_url?: string;
    note?: string;
    result?: string;
    challenge: number;
  }) => {
    try {
      setLoading(true);
      setError(null);

      // Create submission - this endpoint is public (no auth required)
      const response = await apiClient.post('/submissions', {
        data: {
          ...submissionData,
          submitted_date: new Date().toISOString(),
          state: 'pending', // Will be pending until admin approval
          publishedAt: null // Start as draft
        }
      });

      return response.data;
    } catch (err: any) {
      const errorMessage = err.response?.data?.error?.message || err.message || 'Failed to create submission';
      setError(errorMessage);
      console.error('Failed to create submission:', err);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return {
    createSubmission,
    loading,
    error,
  };
};

// Hook for fetching approved submissions for a specific challenge
export const useSubmissionsByChallenge = (challengeId: number) => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!challengeId) return;

    const fetchSubmissions = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await apiClient.get<StrapiCollectionResponse<Submission>>('/submissions', {
          params: {
            'filters[challenge][id][$eq]': challengeId,
            'filters[state][$eq]': 'approved',
            'filters[publishedAt][$notNull]': true,
            'populate[challenge]': '*',
            'sort[0]': 'submitted_date:asc'
          }
        });
        
        setSubmissions(response.data || []);
      } catch (err: any) {
        const errorMessage = err.response?.data?.error?.message || err.message || 'Failed to fetch submissions';
        setError(errorMessage);
        console.error('Failed to fetch submissions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [challengeId]);

  const refetch = () => {
    setSubmissions([]);
    setLoading(true);
    setError(null);
  };

  return {
    submissions,
    loading,
    error,
    refetch,
  };
};
