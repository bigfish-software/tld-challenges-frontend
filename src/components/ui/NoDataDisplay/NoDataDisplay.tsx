import React from 'react';
import { clsx } from 'clsx';

export interface NoDataDisplayProps {
  /** The main message to display */
  title: string;
  /** Optional description text */
  description?: string;
  /** Optional action button text */
  actionText?: string;
  /** Callback when action button is clicked */
  onAction?: () => void;
  /** Custom icon component */
  icon?: React.ReactNode;
  /** Size variant to match ErrorDisplay pattern */
  size?: 'sm' | 'md' | 'lg';
  /** Additional CSS classes */
  className?: string;
}

export const NoDataDisplay = ({
  title,
  description,
  actionText,
  onAction,
  icon,
  size = 'md',
  className
}: NoDataDisplayProps) => {
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
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
      />
    </svg>
  );

  return (
    <div className={clsx(
      'text-center',
      currentSizeClasses.container,
      className
    )}>
      {/* Icon */}
      <div className={clsx(
        'mx-auto text-primary-color mb-6',
        currentSizeClasses.icon
      )}>
        {icon || defaultIcon}
      </div>
      
      {/* Title */}
      <h3 className={clsx(
        'font-medium text-primary mb-2',
        currentSizeClasses.title
      )}>
        {title}
      </h3>
      
      {/* Description */}
      {description && (
        <p className={clsx(
          'text-secondary max-w-md mx-auto mb-6',
          currentSizeClasses.message
        )}>
          {description}
        </p>
      )}
      
      {/* Action Button */}
      {actionText && onAction && (
        <button
          onClick={onAction}
          className={clsx(
            'btn-primary rounded-md',
            currentSizeClasses.button
          )}
        >
          {actionText}
        </button>
      )}
    </div>
  );
};
