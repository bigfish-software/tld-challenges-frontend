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
  /** Additional CSS classes */
  className?: string;
}

export const NoDataDisplay = ({
  title,
  description,
  actionText,
  onAction,
  icon,
  className
}: NoDataDisplayProps) => {
  const defaultIcon = (
    <div className="w-16 h-16 rounded-full border-2 flex items-center justify-center mb-6" style={{ borderColor: 'var(--color-primary)' }}>
      <svg className="w-8 h-8 text-primary-color" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
  );

  return (
    <div className={clsx(
      'flex flex-col items-center justify-center text-center py-16 px-8',
      className
    )}>
      {/* Icon */}
      {icon || defaultIcon}
      
      {/* Title */}
      <h3 className="text-xl font-semibold text-primary mb-3">
        {title}
      </h3>
      
      {/* Description */}
      {description && (
        <p className="text-secondary text-base leading-relaxed mb-8 max-w-md">
          {description}
        </p>
      )}
      
      {/* Action Button */}
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="btn-primary px-6 py-3 text-sm font-medium rounded-md"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};
