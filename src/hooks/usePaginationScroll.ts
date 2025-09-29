import { useEffect, useCallback, useRef } from 'react';
import { scrollToTop } from '@/utils/scrollToTop';

/**
 * Hook for handling pagination with automatic scroll to top
 * @param currentPage - the current page number
 * @param behavior - scroll behavior ('smooth' | 'auto')
 * @param delay - delay before scrolling (useful for waiting for content updates)
 */
export const usePaginationScroll = (
  currentPage: number,
  behavior: ScrollBehavior = 'smooth',
  delay = 100
) => {
  const isInitialLoad = useRef(true);
  const previousPage = useRef(currentPage);
  
  // Effect that runs when currentPage changes
  useEffect(() => {
    // Skip scrolling on initial load, but scroll on all subsequent page changes
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      previousPage.current = currentPage;
    } else {
      const isGoingToPreviousPage = currentPage < previousPage.current;
      // For previous page navigation, force immediate scroll first to prevent jump to middle
      scrollToTop(behavior, delay, isGoingToPreviousPage);
      previousPage.current = currentPage;
    }
  }, [currentPage, behavior, delay]);

  // Return a callback that can be used for manual scrolling
  const scrollToTopManually = useCallback(() => {
    scrollToTop(behavior, delay, true); // Always force immediate for manual calls
  }, [behavior, delay]);

  return { scrollToTopManually };
};

/**
 * Hook for 1-based pagination with automatic scroll to top
 * @param currentPage - the current page number (1-based)
 * @param behavior - scroll behavior ('smooth' | 'auto')
 * @param delay - delay before scrolling
 */
export const usePaginationScrollOneBased = (
  currentPage: number,
  behavior: ScrollBehavior = 'smooth',
  delay = 100
) => {
  const isInitialLoad = useRef(true);
  const previousPage = useRef(currentPage);
  
  // Effect that runs when currentPage changes
  useEffect(() => {
    // Skip scrolling on initial load, but scroll on all subsequent page changes
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      previousPage.current = currentPage;
    } else {
      const isGoingToPreviousPage = currentPage < previousPage.current;
      // For previous page navigation, force immediate scroll first to prevent jump to middle
      scrollToTop(behavior, delay, isGoingToPreviousPage);
      previousPage.current = currentPage;
    }
  }, [currentPage, behavior, delay]);

  // Return a callback that can be used for manual scrolling
  const scrollToTopManually = useCallback(() => {
    scrollToTop(behavior, delay, true); // Always force immediate for manual calls
  }, [behavior, delay]);

  return { scrollToTopManually };
};