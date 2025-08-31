import React from 'react';
import type { CustomCode } from '@/types/api';

export interface CustomCodeCardProps {
  /** The custom code object from the API */
  customCode: CustomCode;
  /** Display variant */
  variant?: 'default' | 'compact' | 'list';
  /** Callback when card is clicked */
  onCardClick?: (id: number) => void;
  /** Callback when creator is clicked */
  onCreatorClick?: (creatorName: string, creatorUrl?: string) => void;
  /** Additional CSS classes */
  className?: string;
}

export const CustomCodeCard = ({
  customCode,
  variant = 'default',
  onCardClick,
  onCreatorClick,
  className = ''
}: CustomCodeCardProps) => {
  // Extract data from CustomCode API structure
  const { id, name, description_short, code, creators, is_featured } = customCode;

  const handleCardClick = () => {
    onCardClick?.(id);
  };



  const handleCopyCode = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(code || '');
  };

  const handleViewDetails = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCardClick?.(id);
  };

  const baseClasses = `
    ${is_featured ? 
      // Featured card styles with subtle dark theme approach
      `bg-surface-raised
       border-2 border-primary-color/60
       shadow-lg shadow-primary-color/10 hover:shadow-xl hover:shadow-primary-color/20` :
      // Regular card styles  
      `card-surface hover:shadow-md`
    }
    rounded-lg 
    transition-all duration-200 
    cursor-pointer group
    relative
    ${className}
  `;

  // List layout - horizontal layout with more space for description
  if (variant === 'list') {
    return (
    <div className={baseClasses} onClick={handleCardClick}>
      {/* Featured badge in bottom-left corner */}
      {is_featured && (
        <div className="absolute -bottom-px -left-px z-10">
          <div className="badge-primary px-3 py-1 text-xs font-semibold rounded-bl-lg rounded-tr-lg">
            FEATURED
          </div>
        </div>
      )}        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left side - Main content */}
            <div className="flex-1 min-w-0">
              {/* Header with title and creators */}
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-primary group-hover:text-primary-hover transition-colors mb-2">
                  {name}
                </h3>
                {creators && creators.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {creators.map((creator, index) => (
                      <button
                        key={creator.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          const creatorUrl = creator.twitch || creator.youtube;
                          onCreatorClick?.(creator.name, creatorUrl);
                        }}
                        className="text-sm text-secondary hover:text-primary-hover transition-colors"
                      >
                        {index === 0 ? 'by ' : '& '}{creator.name}
                      </button>
                    ))}
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
            <div className="lg:w-80 flex-shrink-0">
              {code && (
                <div className="card-surface-raised p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-secondary uppercase tracking-wide">
                      Custom Code
                    </span>
                    <button
                      onClick={handleCopyCode}
                      className="text-xs text-primary-color hover:text-primary-hover transition-colors flex items-center space-x-1"
                    >
                      <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                      <span>Copy</span>
                    </button>
                  </div>
                  <code className="text-sm font-mono text-primary block break-all overflow-hidden">
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

  // Default and compact layouts
  const contentClasses = variant === 'compact' ? 'p-4' : 'p-6';

  return (
    <div className={baseClasses} onClick={handleCardClick}>
      {/* Featured badge in bottom-left corner */}
      {is_featured && (
        <div className="absolute -bottom-px -left-px z-10">
          <div className="badge-primary px-3 py-1 text-xs font-semibold rounded-bl-lg rounded-tr-lg">
            FEATURED
          </div>
        </div>
      )}

      <div className={contentClasses}>
        {/* Header with title and view button */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0 mr-3">
            <h3 className="text-lg font-semibold text-primary group-hover:text-primary-hover transition-colors line-clamp-1">
              {name}
            </h3>
            {creators && creators.length > 0 && (
              <div className="mt-1">
                <span className="text-sm text-secondary">
                  by {creators.map(creator => creator.name).join(' & ')}
                </span>
              </div>
            )}
          </div>
          <button
            onClick={handleViewDetails}
            className="btn-primary px-3 py-1.5 text-xs font-medium rounded-md flex-shrink-0"
          >
            View Details
          </button>
        </div>

        {/* Short Description */}
        {description_short && (
          <p className="text-secondary text-sm leading-relaxed mb-4 line-clamp-3">
            {description_short}
          </p>
        )}

        {/* Code Display */}
        {code && (
          <div className="card-surface-raised p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-secondary uppercase tracking-wide">
                Custom Code
              </span>
              <button
                onClick={handleCopyCode}
                className="text-xs text-primary-color hover:text-primary-hover transition-colors flex items-center space-x-1"
              >
                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                <span>Copy</span>
              </button>
            </div>
            <code className="text-sm font-mono text-primary block break-all overflow-hidden">
              {code}
            </code>
          </div>
        )}
      </div>
    </div>
  );
};
