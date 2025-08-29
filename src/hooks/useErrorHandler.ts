import { 
  isNetworkError,
  isValidationError,
  isNotFoundError,
  isAuthError
} from '@/types/errors';
import { createComponentLogger } from '@/utils/logger';

const logger = createComponentLogger('useErrorHandler');

/**
 * Hook for standardized error handling across the application
 * 
 * Provides consistent error message processing and logging
 */
export const useErrorHandler = () => {
  /**
   * Process an error and return a user-friendly message
   */
  const handleError = (error: unknown, context?: string): string => {
    logger.debug('Processing error', { context }, { 
      errorType: typeof error,
      errorName: error instanceof Error ? error.name : 'unknown',
      hasMessage: error instanceof Error && !!error.message
    });
    
    // Handle custom error types with specific messaging
    if (isNetworkError(error)) {
      logger.warn('Network error encountered', undefined, { context, errorMessage: error.message });
      return `Network error: ${error.message}`;
    }
    
    if (isValidationError(error)) {
      logger.warn('Validation error encountered', undefined, { context, errorMessage: error.message });
      return `Validation error: ${error.message}`;
    }
    
    if (isAuthError(error)) {
      logger.warn('Authentication error encountered', undefined, { context, errorMessage: error.message });
      return 'Authentication required. Please log in and try again.';
    }
    
    if (isNotFoundError(error)) {
      logger.warn('Resource not found', undefined, { context, errorMessage: error.message });
      return 'The requested resource was not found.';
    }
    
    // Handle standard JavaScript errors
    if (error instanceof Error) {
      logger.error('Standard error encountered', error, { context });
      return error.message;
    }
    
    // Handle unknown error types
    logger.error('Unknown error type encountered', new Error(String(error)), { 
      context,
      originalError: error
    });
    return 'An unexpected error occurred. Please try again.';
  };

  /**
   * Process an error for logging purposes (more detailed)
   */
  const logError = (error: unknown, context?: string, additionalData?: Record<string, unknown>) => {
    logger.error('Error logged via useErrorHandler', error instanceof Error ? error : new Error(String(error)), {
      context,
      ...additionalData
    });
  };

  /**
   * Check if an error indicates a temporary issue that might resolve with retry
   */
  const isRetryableError = (error: unknown): boolean => {
    if (isNetworkError(error)) {
      return true; // Network issues are often temporary
    }
    
    if (error instanceof Error && error.message.includes('timeout')) {
      return true; // Timeout errors are retryable
    }
    
    return false;
  };

  return {
    handleError,
    logError,
    isRetryableError
  };
};

export default useErrorHandler;
