import React from 'react';

export interface ErrorDisplayProps {
  /** Error title */
  title?: string;
  /** Error message to display */
  message?: string;
  /** Show retry button */
  showRetry?: boolean;
  /** Retry button text */
  retryText?: string;
  /** Callback when retry button is clicked */
  onRetry?: () => void;
  /** Custom icon (optional) */
  icon?: React.ReactNode;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Additional CSS classes */
  className?: string;
}

export const ErrorDisplay = ({
  title = 'Unable to load data',
  message = 'An unexpected error occurred',
  showRetry = true,
  retryText = 'Try Again',
  onRetry,
  icon,
  size = 'md',
  className = ''
}: ErrorDisplayProps) => {
  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      // Default retry behavior
      window.location.reload();
    }
  };

  const sizeClasses = {
    sm: {
      container: 'py-8',
      icon: 'h-16 w-16',
      title: 'text-base',
      message: 'text-sm',
      button: 'px-3 py-1.5 text-sm'
    },
    md: {
      container: 'py-16',
      icon: 'h-24 w-24',
      title: 'text-lg',
      message: 'text-base',
      button: 'px-4 py-2 text-base'
    },
    lg: {
      container: 'py-24',
      icon: 'h-32 w-32',
      title: 'text-xl',
      message: 'text-lg',
      button: 'px-6 py-3 text-lg'
    }
  };

  const currentSizeClasses = sizeClasses[size];

  const defaultIcon = (
    <svg 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24" 
      className="h-full w-full"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={1} 
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 16.5c-.77.833.192 2.5 1.732 2.5z" 
      />
    </svg>
  );

  return (
    <div className={`text-center ${currentSizeClasses.container} ${className}`}>
      {/* Error Icon */}
      <div className={`mx-auto ${currentSizeClasses.icon} text-primary-color mb-6`}>
        {icon || defaultIcon}
      </div>
      
      {/* Error Title */}
      <h3 className={`${currentSizeClasses.title} font-medium text-primary mb-2`}>
        {title}
      </h3>
      
      {/* Error Message */}
      <p className={`text-secondary max-w-md mx-auto mb-6 ${currentSizeClasses.message}`}>
        {message}
      </p>
      
      {/* Retry Button */}
      {showRetry && (
        <button 
          onClick={handleRetry}
          className={`btn-primary rounded-md ${currentSizeClasses.button}`}
        >
          {retryText}
        </button>
      )}
    </div>
  );
};
