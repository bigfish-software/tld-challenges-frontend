/**
 * Error Type Definitions
 * 
 * Standardized error types for consistent error handling across the application.
 */

/**
 * Base API error interface
 */
export interface ApiError {
  message: string;
  status?: number;
  code?: string;
  details?: unknown;
}

/**
 * Custom error class for application-specific errors
 */
export class CustomError extends Error {
  public readonly status: number | undefined;
  public readonly code: string | undefined;
  public readonly details: unknown;

  constructor(message: string, status?: number, code?: string, details?: unknown) {
    super(message);
    this.name = 'CustomError';
    this.status = status;
    this.code = code;
    this.details = details;

    // Maintains proper stack trace for where error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }
  }
}

/**
 * Network-related error
 */
export class NetworkError extends CustomError {
  constructor(message: string, status?: number, details?: unknown) {
    super(message, status, 'NETWORK_ERROR', details);
    this.name = 'NetworkError';
  }
}

/**
 * Validation error for form data
 */
export class ValidationError extends CustomError {
  public readonly field: string | undefined;

  constructor(message: string, field?: string, details?: unknown) {
    super(message, 400, 'VALIDATION_ERROR', details);
    this.name = 'ValidationError';
    this.field = field;
  }
}

/**
 * Authentication/authorization error
 */
export class AuthError extends CustomError {
  constructor(message: string, status: number = 401, details?: unknown) {
    super(message, status, 'AUTH_ERROR', details);
    this.name = 'AuthError';
  }
}

/**
 * Not found error
 */
export class NotFoundError extends CustomError {
  constructor(resource: string, id?: string | number) {
    const message = id ? `${resource} with id ${id} not found` : `${resource} not found`;
    super(message, 404, 'NOT_FOUND', { resource, id });
    this.name = 'NotFoundError';
  }
}

/**
 * Type guard to check if error is a CustomError
 */
export const isCustomError = (error: unknown): error is CustomError => {
  return error instanceof CustomError;
};

/**
 * Type guard to check if error is a standard Error
 */
export const isError = (error: unknown): error is Error => {
  return error instanceof Error;
};

/**
 * Type guard to check if error is an ApiError interface
 */
export const isApiError = (error: unknown): error is ApiError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as ApiError).message === 'string'
  );
};

/**
 * Helper to extract error message from unknown error
 */
export const getErrorMessage = (error: unknown): string => {
  if (isCustomError(error) || isError(error)) {
    return error.message;
  }
  
  if (isApiError(error)) {
    return error.message;
  }
  
  if (typeof error === 'string') {
    return error;
  }
  
  return 'An unknown error occurred';
};

/**
 * Helper to get error status code
 */
export const getErrorStatus = (error: unknown): number | undefined => {
  if (isCustomError(error)) {
    return error.status;
  }
  
  if (isApiError(error)) {
    return error.status;
  }
  
  return undefined;
};

/**
 * Type guard to check if an error is a NetworkError
 */
export const isNetworkError = (error: unknown): error is NetworkError => {
  return error instanceof NetworkError;
};

/**
 * Type guard to check if an error is a ValidationError
 */
export const isValidationError = (error: unknown): error is ValidationError => {
  return error instanceof ValidationError;
};

/**
 * Type guard to check if an error is an AuthError
 */
export const isAuthError = (error: unknown): error is AuthError => {
  return error instanceof AuthError;
};

/**
 * Type guard to check if an error is a NotFoundError
 */
export const isNotFoundError = (error: unknown): error is NotFoundError => {
  return error instanceof NotFoundError;
};
