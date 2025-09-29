import { renderHook } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { usePaginationScroll, usePaginationScrollOneBased } from './usePaginationScroll';

// Mock scrollToTop function
vi.mock('@/utils/scrollToTop', () => ({
  scrollToTop: vi.fn()
}));

import { scrollToTop } from '@/utils/scrollToTop';

describe('usePaginationScroll', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  describe('usePaginationScroll (0-based)', () => {
    it('should not scroll on initial page load (page 0)', () => {
      renderHook(() => usePaginationScroll(0));
      
      expect(scrollToTop).not.toHaveBeenCalled();
    });

    it('should scroll when page changes from 0 to 1', () => {
      const { rerender } = renderHook(
        ({ currentPage }) => usePaginationScroll(currentPage),
        { initialProps: { currentPage: 0 } }
      );

      expect(scrollToTop).not.toHaveBeenCalled();

      rerender({ currentPage: 1 });
      
      // Forward navigation: forceImmediate = false
      expect(scrollToTop).toHaveBeenCalledWith('smooth', 100, false);
    });

    it('should scroll when going back to page 0 from page 1', () => {
      const { rerender } = renderHook(
        ({ currentPage }) => usePaginationScroll(currentPage),
        { initialProps: { currentPage: 1 } }
      );

      // Initial load should not scroll
      expect(scrollToTop).not.toHaveBeenCalled();

      // Going to page 0 should scroll with forceImmediate=true (previous page)
      rerender({ currentPage: 0 });
      
      expect(scrollToTop).toHaveBeenCalledWith('smooth', 100, true);
    });

    it('should scroll when going to previous page', () => {
      const { rerender } = renderHook(
        ({ currentPage }) => usePaginationScroll(currentPage),
        { initialProps: { currentPage: 2 } }
      );

      // Clear initial call (none expected)
      expect(scrollToTop).not.toHaveBeenCalled();

      rerender({ currentPage: 1 });
      
      // Previous page navigation: forceImmediate = true
      expect(scrollToTop).toHaveBeenCalledWith('smooth', 100, true);
    });

    it('should use custom behavior and delay', () => {
      const { rerender } = renderHook(
        ({ currentPage }) => usePaginationScroll(currentPage, 'auto', 200),
        { initialProps: { currentPage: 0 } }
      );
      
      rerender({ currentPage: 1 });
      
      // Forward navigation: forceImmediate = false
      expect(scrollToTop).toHaveBeenCalledWith('auto', 200, false);
    });

    it('should return manual scroll function', () => {
      const { result } = renderHook(() => usePaginationScroll(0));
      
      expect(result.current.scrollToTopManually).toBeDefined();
      expect(typeof result.current.scrollToTopManually).toBe('function');
      
      result.current.scrollToTopManually();
      // Manual scroll always forces immediate
      expect(scrollToTop).toHaveBeenCalledWith('smooth', 100, true);
    });
  });

  describe('usePaginationScrollOneBased (1-based)', () => {
    it('should not scroll on initial page load (page 1)', () => {
      renderHook(() => usePaginationScrollOneBased(1));
      
      expect(scrollToTop).not.toHaveBeenCalled();
    });

    it('should scroll when page changes from 1 to 2', () => {
      const { rerender } = renderHook(
        ({ currentPage }) => usePaginationScrollOneBased(currentPage),
        { initialProps: { currentPage: 1 } }
      );

      expect(scrollToTop).not.toHaveBeenCalled();

      rerender({ currentPage: 2 });
      
      // Forward navigation: forceImmediate = false
      expect(scrollToTop).toHaveBeenCalledWith('smooth', 100, false);
    });

    it('should scroll when going back to page 1 from page 2', () => {
      const { rerender } = renderHook(
        ({ currentPage }) => usePaginationScrollOneBased(currentPage),
        { initialProps: { currentPage: 2 } }
      );

      // Initial load should not scroll
      expect(scrollToTop).not.toHaveBeenCalled();

      // Going to page 1 should scroll with forceImmediate=true (previous page)
      rerender({ currentPage: 1 });
      
      expect(scrollToTop).toHaveBeenCalledWith('smooth', 100, true);
    });

    it('should scroll when going to previous page', () => {
      const { rerender } = renderHook(
        ({ currentPage }) => usePaginationScrollOneBased(currentPage),
        { initialProps: { currentPage: 3 } }
      );

      expect(scrollToTop).not.toHaveBeenCalled();

      rerender({ currentPage: 2 });
      
      // Previous page navigation: forceImmediate = true
      expect(scrollToTop).toHaveBeenCalledWith('smooth', 100, true);
    });

    it('should use custom behavior and delay', () => {
      const { rerender } = renderHook(
        ({ currentPage }) => usePaginationScrollOneBased(currentPage, 'auto', 300),
        { initialProps: { currentPage: 1 } }
      );
      
      rerender({ currentPage: 2 });
      
      // Forward navigation: forceImmediate = false
      expect(scrollToTop).toHaveBeenCalledWith('auto', 300, false);
    });

    it('should return manual scroll function', () => {
      const { result } = renderHook(() => usePaginationScrollOneBased(1));
      
      expect(result.current.scrollToTopManually).toBeDefined();
      expect(typeof result.current.scrollToTopManually).toBe('function');
      
      result.current.scrollToTopManually();
      // Manual scroll always forces immediate
      expect(scrollToTop).toHaveBeenCalledWith('smooth', 100, true);
    });
  });
});