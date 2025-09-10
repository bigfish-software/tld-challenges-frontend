import { useQuery } from '@tanstack/react-query';
import { apiService } from '@/services/api';
import type { CustomCode } from '@/types/api';

/**
 * Hook to fetch a single custom code by slug
 * Includes all related data (creators, challenges, FAQs)
 */
export const useCustomCode = (slug: string) => {
  return useQuery<CustomCode>({
    queryKey: ['custom-code', slug],
    queryFn: async () => {
      const response = await apiService.customCodes.getBySlug(slug);
      return response.data; // Extract data from Strapi response wrapper
    },
    enabled: !!slug,
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: (failureCount, error: any) => {
      // Don't retry on 404 - custom code not found
      if (error && typeof error === 'object' && 'status' in error && error.status === 404) {
        return false;
      }
      return failureCount < 3;
    },
  });
};
