/**
 * Centralized logging utility for the TLD Challenges Frontend
 * 
 * Features:
 * - Development vs Production logging modes
 * - Structured logging with context
 * - Error reporting integration ready
 * - Type-safe logging levels
 */

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LogContext {
  component?: string;
  action?: string;
  userId?: string;
  sessionId?: string;
  [key: string]: unknown;
}

export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: LogContext;
  error?: Error;
  data?: unknown;
}

class Logger {
  private isDevelopment = import.meta.env.DEV;
  private isProduction = import.meta.env.PROD;

  /**
   * Log debug information (development only)
   */
  debug(message: string, context?: LogContext, data?: unknown): void {
    if (this.isDevelopment) {
      const entry = this.createLogEntry('debug', message, context, undefined, data);
      console.log(`[DEBUG] ${entry.message}`, this.formatConsoleData(entry));
    }
  }

  /**
   * Log general information
   */
  info(message: string, context?: LogContext, data?: unknown): void {
    const entry = this.createLogEntry('info', message, context, undefined, data);
    
    if (this.isDevelopment) {
      console.info(`[INFO] ${entry.message}`, this.formatConsoleData(entry));
    }
    
    // In production, could send to analytics service
    if (this.isProduction) {
      this.sendToLoggingService(entry);
    }
  }

  /**
   * Log warnings
   */
  warn(message: string, context?: LogContext, data?: unknown): void {
    const entry = this.createLogEntry('warn', message, context, undefined, data);
    
    if (this.isDevelopment) {
      console.warn(`[WARN] ${entry.message}`, this.formatConsoleData(entry));
    }
    
    // In production, send to monitoring service
    if (this.isProduction) {
      this.sendToLoggingService(entry);
    }
  }

  /**
   * Log errors
   */
  error(message: string, error?: Error, context?: LogContext, data?: unknown): void {
    const entry = this.createLogEntry('error', message, context, error, data);
    
    if (this.isDevelopment) {
      console.error(`[ERROR] ${entry.message}`, this.formatConsoleData(entry));
      if (error) {
        console.error('Error details:', error);
      }
    }
    
    // In production, send to error reporting service
    if (this.isProduction) {
      this.sendToErrorReporting(entry);
    }
  }

  /**
   * Create a structured log entry
   */
  private createLogEntry(
    level: LogLevel,
    message: string,
    context?: LogContext,
    error?: Error,
    data?: unknown
  ): LogEntry {
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
    };

    if (context) {
      entry.context = context;
    }

    if (error) {
      entry.error = error;
    }

    if (data) {
      entry.data = data;
    }

    return entry;
  }

  /**
   * Format data for console output in development
   */
  private formatConsoleData(entry: LogEntry): Record<string, unknown> {
    const output: Record<string, unknown> = {};
    
    if (entry.context) {
      output.context = entry.context;
    }
    
    if (entry.data) {
      output.data = entry.data;
    }
    
    if (entry.error) {
      output.error = {
        name: entry.error.name,
        message: entry.error.message,
        stack: entry.error.stack,
      };
    }
    
    return output;
  }

  /**
   * Send log entry to external logging service (production)
   */
  private sendToLoggingService(_entry: LogEntry): void {
    // Implementation placeholder for external logging service
    // Examples: DataDog, LogRocket, Amplitude, etc.
    
    // For now, this is a no-op in production
    // In the future, integrate with your chosen logging service:
    
    // Example with a generic logging service:
    // try {
    //   loggingService.send(entry);
    // } catch (err) {
    //   // Fallback: don't let logging errors break the app
    //   console.error('Failed to send log to service:', err);
    // }
  }

  /**
   * Send error to external error reporting service (production)
   */
  private sendToErrorReporting(_entry: LogEntry): void {
    // Implementation placeholder for error reporting service
    // Examples: Sentry, Bugsnag, Rollbar, etc.
    
    // For now, this is a no-op in production
    // In the future, integrate with your chosen error reporting service:
    
    // Example with Sentry:
    // if (entry.error) {
    //   Sentry.captureException(entry.error, {
    //     tags: entry.context,
    //     extra: entry.data,
    //   });
    // } else {
    //   Sentry.captureMessage(entry.message, 'error');
    // }
  }

  /**
   * Create a child logger with default context
   */
  child(defaultContext: LogContext): Logger {
    const childLogger = new Logger();
    
    // Override methods to include default context
    const originalMethods = {
      debug: childLogger.debug.bind(childLogger),
      info: childLogger.info.bind(childLogger),
      warn: childLogger.warn.bind(childLogger),
      error: childLogger.error.bind(childLogger),
    };

    childLogger.debug = (message: string, context?: LogContext, data?: unknown) => {
      originalMethods.debug(message, { ...defaultContext, ...context }, data);
    };

    childLogger.info = (message: string, context?: LogContext, data?: unknown) => {
      originalMethods.info(message, { ...defaultContext, ...context }, data);
    };

    childLogger.warn = (message: string, context?: LogContext, data?: unknown) => {
      originalMethods.warn(message, { ...defaultContext, ...context }, data);
    };

    childLogger.error = (message: string, error?: Error, context?: LogContext, data?: unknown) => {
      originalMethods.error(message, error, { ...defaultContext, ...context }, data);
    };

    return childLogger;
  }
}

// Export singleton logger instance
export const logger = new Logger();

// Export convenience functions for common patterns
export const createComponentLogger = (componentName: string) => {
  return logger.child({ component: componentName });
};

export const createApiLogger = (endpoint: string) => {
  return logger.child({ component: 'API', action: endpoint });
};

export default logger;
