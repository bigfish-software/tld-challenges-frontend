import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { scrollToTop, scrollToElement } from './scrollToTop';

// Mock window.scrollTo
const mockScrollTo = vi.fn();
Object.defineProperty(window, 'scrollTo', {
  value: mockScrollTo,
  writable: true
});

// Mock document.getElementById
const mockGetElementById = vi.fn();
Object.defineProperty(document, 'getElementById', {
  value: mockGetElementById,
  writable: true
});

// Mock getBoundingClientRect
const mockGetBoundingClientRect = vi.fn();
const mockElement = {
  getBoundingClientRect: mockGetBoundingClientRect
};

describe('scrollToTop', () => {
  beforeEach(() => {
    mockScrollTo.mockClear();
    mockGetElementById.mockClear();
    mockGetBoundingClientRect.mockClear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('scrollToTop', () => {
    it('should scroll to top with smooth behavior by default', () => {
      scrollToTop();
      
      expect(mockScrollTo).toHaveBeenCalledWith({
        top: 0,
        behavior: 'smooth'
      });
    });

    it('should scroll to top with auto behavior when specified', () => {
      scrollToTop('auto');
      
      expect(mockScrollTo).toHaveBeenCalledWith({
        top: 0,
        behavior: 'auto'
      });
    });

    it('should scroll to top with smooth behavior when specified', () => {
      scrollToTop('smooth');
      
      expect(mockScrollTo).toHaveBeenCalledWith({
        top: 0,
        behavior: 'smooth'
      });
    });

    it('should scroll immediately when no delay is specified', () => {
      scrollToTop('smooth', 0);
      
      expect(mockScrollTo).toHaveBeenCalledWith({
        top: 0,
        behavior: 'smooth'
      });
    });

    it('should delay scroll when delay is specified', () => {
      vi.useFakeTimers();
      
      scrollToTop('smooth', 100);
      
      // Should not have been called immediately
      expect(mockScrollTo).not.toHaveBeenCalled();
      
      // Fast-forward time
      vi.advanceTimersByTime(100);
      
      expect(mockScrollTo).toHaveBeenCalledWith({
        top: 0,
        behavior: 'smooth'
      });
      
      vi.useRealTimers();
    });

    it('should force immediate scroll then smooth scroll when forceImmediate is true', () => {
      vi.useFakeTimers();
      
      scrollToTop('smooth', 100, true);
      
      // Should scroll to top immediately with auto behavior
      expect(mockScrollTo).toHaveBeenCalledWith({
        top: 0,
        behavior: 'auto'
      });
      
      // Clear the mock to check the second call
      mockScrollTo.mockClear();
      
      // Fast-forward time
      vi.advanceTimersByTime(100);
      
      // Should then scroll with smooth behavior
      expect(mockScrollTo).toHaveBeenCalledWith({
        top: 0,
        behavior: 'smooth'
      });
      
      vi.useRealTimers();
    });

    it('should only perform smooth scroll when forceImmediate is false', () => {
      vi.useFakeTimers();
      
      scrollToTop('smooth', 100, false);
      
      // Should not have been called immediately
      expect(mockScrollTo).not.toHaveBeenCalled();
      
      // Fast-forward time
      vi.advanceTimersByTime(100);
      
      // Should only be called once with smooth behavior
      expect(mockScrollTo).toHaveBeenCalledTimes(1);
      expect(mockScrollTo).toHaveBeenCalledWith({
        top: 0,
        behavior: 'smooth'
      });
      
      vi.useRealTimers();
    });
  });

  describe('scrollToElement', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'pageYOffset', {
        value: 100,
        writable: true
      });
    });

    it('should scroll to element when found', () => {
      const elementId = 'test-element';
      
      mockGetBoundingClientRect.mockReturnValue({ top: 200 });
      mockGetElementById.mockReturnValue(mockElement);

      scrollToElement(elementId);

      expect(mockGetElementById).toHaveBeenCalledWith(elementId);
      expect(mockGetBoundingClientRect).toHaveBeenCalled();
      expect(mockScrollTo).toHaveBeenCalledWith({
        top: 300, // 200 (element top) + 100 (pageYOffset) - 0 (default offset)
        behavior: 'smooth'
      });
    });

    it('should scroll to element with custom offset', () => {
      const elementId = 'test-element';
      const offset = 50;
      
      mockGetBoundingClientRect.mockReturnValue({ top: 200 });
      mockGetElementById.mockReturnValue(mockElement);

      scrollToElement(elementId, 'smooth', offset);

      expect(mockScrollTo).toHaveBeenCalledWith({
        top: 250, // 200 (element top) + 100 (pageYOffset) - 50 (offset)
        behavior: 'smooth'
      });
    });

    it('should scroll to element with auto behavior', () => {
      const elementId = 'test-element';
      
      mockGetBoundingClientRect.mockReturnValue({ top: 200 });
      mockGetElementById.mockReturnValue(mockElement);

      scrollToElement(elementId, 'auto');

      expect(mockScrollTo).toHaveBeenCalledWith({
        top: 300,
        behavior: 'auto'
      });
    });

    it('should scroll to element with custom offset and delay', () => {
      vi.useFakeTimers();
      
      const elementId = 'test-element';
      const offset = 50;
      const delay = 150;
      
      mockGetBoundingClientRect.mockReturnValue({ top: 200 });
      mockGetElementById.mockReturnValue(mockElement);

      scrollToElement(elementId, 'smooth', offset, delay);

      // Should not scroll immediately
      expect(mockScrollTo).not.toHaveBeenCalled();
      
      // Fast-forward time
      vi.advanceTimersByTime(delay);

      expect(mockScrollTo).toHaveBeenCalledWith({
        top: 250, // 200 (element top) + 100 (pageYOffset) - 50 (offset)
        behavior: 'smooth'
      });
      
      vi.useRealTimers();
    });

    it('should not scroll when element not found', () => {
      mockGetElementById.mockReturnValue(null);

      scrollToElement('non-existent-element');

      expect(mockGetElementById).toHaveBeenCalledWith('non-existent-element');
      expect(mockScrollTo).not.toHaveBeenCalled();
    });
  });
});