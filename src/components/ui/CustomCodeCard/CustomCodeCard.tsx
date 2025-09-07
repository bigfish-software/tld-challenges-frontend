import React, { useState } from 'react';
import type { CustomCode } from '@/types/api';

export interface CustomCodeCardProps {
  /** The custom code object from the API */
  customCode: CustomCode;
  /** Display variant - list (default) or compact (mobile) */
  variant?: 'list' | 'compact';
  /** Callback when card is clicked with slug */
  onCardClick?: (slug: string) => void;
  /** Additional CSS classes */
  className?: string;
}

export const CustomCodeCard = ({
  customCode,
  variant = 'list',
  onCardClick,
  className = ''
}: CustomCodeCardProps) => {
  // Extract data from CustomCode API structure
  const { name, description_short, code, creators, is_featured, slug } = customCode;
  
  // State for copy confirmation
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyCode = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(code || '');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // Hide confirmation after 2 seconds
  };

  const handleViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCardClick?.(slug);
  };

  const baseClasses = `
    group
    flex
    flex-col
    h-full
    ${is_featured ? 
      // Featured card styles with prominent secondary border
      `card-base featured-card` :
      // Regular card styles  
      `card-base`
    }
    rounded-lg 
    transition-all duration-200 
    relative
    ${className}
  `;

  // List layout - horizontal layout with more space for description
  if (variant === 'list') {
    return (
    <div className={baseClasses}>
      {/* Featured badge in bottom-left corner */}
      {is_featured && (
        <div className="absolute -bottom-px -left-px z-10">
          <div className="bg-secondary text-light-primary px-3 py-1 text-xs font-semibold rounded-bl-lg rounded-tr-lg">
            FEATURED
          </div>
        </div>
      )}        <div className="p-6">
          <div className="flex gap-6">
            {/* Left side - Main content */}
            <div className="flex-1 min-w-0">
              {/* Header with title and creators */}
              <div className="mb-4">
                <h3 className="text-xl font-semibold font-headline text-primary group-hover:text-secondary transition-colors mb-2">
                  {name.toUpperCase()}
                </h3>
                {creators && creators.length > 0 && (
                  <div className="mt-1">
                    <span className="text-sm text-tertiary">
                      by {creators.map(creator => creator.name).join(', ')}
                    </span>
                  </div>
                )}
              </div>

              {/* Short Description */}
              {description_short && (
                <p className="text-secondary leading-relaxed">
                  {description_short}
                </p>
              )}
            </div>

            {/* Right side - Code display */}
            <div className="w-80 flex-shrink-0">
              {code && (
                <div className="bg-surface border border-default rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-secondary uppercase tracking-wide">
                      Custom Code
                    </span>
                    <button
                      onClick={handleCopyCode}
                      className="text-xs text-primary transition-colors flex items-center space-x-1 copy-button"
                    >
                      <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                      <span>{isCopied ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                  <code className="text-sm font-mono text-primary block break-all">
                    {code}
                  </code>
                </div>
              )}
            </div>
          </div>
          
          {/* View Details Button */}
          <div className="flex justify-end mt-6">
            <button
              onClick={handleViewDetails}
              className="btn-primary px-4 py-2 text-sm font-medium rounded-md"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Compact variant - mobile-optimized vertical layout (exactly like original mobile was)
  return (
    <div className={baseClasses}>
      {/* Featured badge in bottom-left corner */}
      {is_featured && (
        <div className="absolute -bottom-px -left-px z-10">
          <div className="bg-secondary text-light-primary px-3 py-1 text-xs font-semibold rounded-bl-lg rounded-tr-lg">
            FEATURED
          </div>
        </div>
      )}

      <div className="p-4">
        {/* Header with title - mobile compact layout */}
        <div className="mb-3">
          <h3 className="text-lg font-semibold font-headline text-primary group-hover:text-secondary transition-colors mb-1">
            {name.toUpperCase()}
          </h3>
          {creators && creators.length > 0 && (
            <div>
              <span className="text-xs text-tertiary">
                by {creators.map(creator => creator.name).join(', ')}
              </span>
            </div>
          )}
        </div>

        {/* Short Description */}
        {description_short && (
          <p className="text-secondary text-sm leading-relaxed mb-3">
            {description_short}
          </p>
        )}

        {/* Code Display - full width mobile-style */}
        {code && (
          <div className="bg-surface border border-default rounded-lg p-3 mb-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-secondary uppercase tracking-wide">
                Custom Code
              </span>
              <button
                onClick={handleCopyCode}
                className="text-xs text-primary transition-colors flex items-center space-x-1 copy-button"
              >
                <svg className="h-3 w-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                <span>{isCopied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
            <code className="text-sm font-mono text-primary block break-all">
              {code}
            </code>
          </div>
        )}

        {/* Action Button - full width mobile style */}
        <div className="w-full">
          <button
            onClick={handleViewDetails}
            className="w-full btn-primary px-4 py-2 text-sm font-medium rounded-md"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};
