import React, { useState } from 'react';
import type { ChallengeResponse } from '@/types/api';

export interface ChallengeCardProps {
  /** The challenge object from the API */
  challenge: ChallengeResponse;
  /** Display variant */
  variant?: 'default' | 'compact' | 'list';
  /** Callback when card is clicked */
  onCardClick?: (id: number) => void;
  /** Callback when join/submit is clicked */
  onJoinChallenge?: (id: number) => void;
  /** Callback when submit run is clicked */
  onSubmitRun?: (id: number) => void;
  /** Callback when creator is clicked */
  onCreatorClick?: (creatorName: string, creatorUrl?: string) => void;
  /** Additional CSS classes */
  className?: string;
}

export const ChallengeCard = ({
  challenge,
  variant = 'default',
  onCardClick,
  onJoinChallenge,
  onSubmitRun,
  onCreatorClick,
  className = ''
}: ChallengeCardProps) => {
  // State for copy confirmation
  const [isCopied, setIsCopied] = useState(false);
  
  // Extract data from ChallengeResponse structure
  const {
    id,
    name,
    description_short,
    difficulty,
    is_featured,
    creators,
    custom_code
  } = challenge;

  const handleCardClick = () => {
    onCardClick?.(id);
  };

  const handleJoinChallenge = (e: React.MouseEvent) => {
    e.stopPropagation();
    onJoinChallenge?.(id);
  };

  const handleSubmitRun = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSubmitRun?.(id);
  };

  const handleCreatorClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const creator = creators?.[0];
    if (creator) {
      const creatorUrl = creator.twitch || creator.youtube;
      onCreatorClick?.(creator.name, creatorUrl);
    }
  };

  // Map TLD difficulty to display colors (but keep original difficulty text)
  const getDifficultyColor = (diff: typeof difficulty) => {
    switch (diff) {
      case 'Easy':
        return 'badge-success'; // Easy - Green
      case 'Medium':
        return 'badge-info'; // Medium - Blue  
      case 'Hard':
        return 'badge-warning'; // Hard - Orange/Amber
      case 'Very Hard':
      case 'Extreme':
        return 'badge-error'; // Very Hard - Red
      default:
        return 'badge-neutral';
    }
  };

  const difficultyColor = getDifficultyColor(difficulty);

  const baseClasses = `
    group
    flex
    flex-col
    h-full
    ${is_featured ? 
      // Featured card styles with prominent secondary border
      `feature-card featured-card
       border-2 border-[#8B5A5C]
       shadow-lg shadow-[#8B5A5C]/20` :
      // Regular card styles  
      `feature-card`
    }
    rounded-lg 
    transition-all duration-200 
    cursor-pointer
    relative
    ${className}
  `;

  // List layout - horizontal layout with more information displayed
  if (variant === 'list') {
    return (
      <div className={`
        group
        flex
        flex-col
        h-full
        ${is_featured ? 
          // Featured card styles with prominent secondary border
          `feature-card featured-card
           border-2 border-[#8B5A5C]
           shadow-lg shadow-[#8B5A5C]/20` :
          // Regular card styles  
          `feature-card`
        }
        rounded-lg 
        transition-all duration-200 
        relative
        ${className}
      `}>
        {/* Featured badge in bottom-left corner */}
        {is_featured && (
          <div className="absolute -bottom-px -left-px z-10">
            <div className="bg-secondary text-light-primary px-3 py-1 text-xs font-semibold rounded-bl-lg rounded-tr-lg">
              FEATURED
            </div>
          </div>
        )}
        
        <div className="p-6">
          {/* Header with title, creators, and difficulty badge */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-semibold font-headline text-primary group-hover:text-secondary transition-colors mb-2">
                {name.toUpperCase()}
              </h3>
              {creators && creators.length > 0 && (
                <div className="mt-1">
                  <span className="text-sm text-tertiary">
                    by {creators.map((creator: any) => creator.name).join(', ')}
                  </span>
                </div>
              )}
            </div>
            
            {/* Difficulty badge in top-right */}
            <div className="flex-shrink-0 ml-4">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${difficultyColor}`}>
                {difficulty}
              </span>
            </div>
          </div>

          {/* Short Description */}
          {description_short && (
            <p className="text-secondary leading-relaxed mb-6 max-w-2xl">
              {description_short}
            </p>
          )}

          {/* Custom Code section and View Details button responsive layout */}
          <div className="flex flex-col lg:flex-row lg:items-end gap-4 mt-6 mb-6">
            {/* Custom Code section */}
            {custom_code && (
              <div className="flex justify-start flex-1">
                <div className="bg-surface border border-default rounded-lg p-4 w-full max-w-2xl">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-secondary uppercase tracking-wide">
                      Custom Code
                    </span>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigator.clipboard.writeText(custom_code.code || '');
                          setIsCopied(true);
                          setTimeout(() => setIsCopied(false), 2000); // Hide confirmation after 2 seconds
                        }}
                        className="text-xs text-primary transition-colors flex items-center space-x-1 copy-button flex-shrink-0"
                      >
                        <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                        </svg>
                        <span>{isCopied ? 'Copied!' : 'Copy'}</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // TODO: Route to custom code detail page
                        }}
                        className="text-xs text-primary transition-colors flex items-center space-x-1 copy-button flex-shrink-0"
                      >
                        <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Details</span>
                      </button>
                    </div>
                  </div>
                  <code className="text-sm font-mono text-primary block whitespace-nowrap">
                    {custom_code.code}
                  </code>
                </div>
              </div>
            )}
            
            {/* Spacer to push buttons to the right when no custom code on desktop */}
            {!custom_code && <div className="hidden lg:block flex-1"></div>}
            
            {/* Action Buttons - responsive positioning */}
            <div className="flex-shrink-0 flex flex-col space-y-2 items-end w-full lg:w-auto">
              <button
                onClick={handleJoinChallenge}
                className="btn-primary px-4 py-2 text-sm font-medium rounded-md w-28"
              >
                View Details
              </button>
              <button
                onClick={handleSubmitRun}
                className="btn-secondary px-4 py-2 text-sm font-medium rounded-md w-28"
              >
                Submit Run
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const contentClasses = variant === 'compact' ? 'p-4' : 'p-6';

  return (
    <div className={baseClasses} onClick={handleCardClick}>
      {/* Featured badge in bottom-left corner */}
      {is_featured && (
        <div className="absolute -bottom-px -left-px z-10">
          <div className="bg-secondary text-light-primary px-3 py-1 text-xs font-semibold rounded-bl-lg rounded-tr-lg">
            FEATURED
          </div>
        </div>
      )}

      <div className={contentClasses}>
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-primary group-hover:text-primary-hover transition-colors truncate">
              {name.toUpperCase()}
            </h3>
            {creators?.[0] && (
              <button
                onClick={handleCreatorClick}
                className="text-sm text-secondary hover:text-primary transition-colors mt-1"
              >
                by {creators[0].name}
              </button>
            )}
          </div>
          
          <div className="flex items-center space-x-2 flex-shrink-0 ml-3">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${difficultyColor}`}>
              {difficulty}
            </span>
          </div>
        </div>

        {/* Description */}
        {description_short && (
          <p className="text-secondary text-sm leading-relaxed mb-4 line-clamp-2">
            {description_short}
          </p>
        )}

        {/* Challenge Info */}
        {variant !== 'compact' && (
          <div className="space-y-3 mb-4">
            {/* Tournament and Custom Code */}
            <div className="flex items-center space-x-4 text-sm text-secondary">
              {/* Tournament info not available in current API structure */}
              {custom_code && (
                <div className="flex items-center space-x-1">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  <span>Code: {custom_code.name}</span>
                </div>
              )}
            </div>

            {/* Rules Preview - Not available in current API structure */}
            {/* Rules would be displayed here when API support is added */}
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-end pt-3">
          <div className="flex flex-col space-y-2">
            <button
              onClick={handleJoinChallenge}
              className="btn-primary px-4 py-2 text-sm font-medium rounded-md"
            >
              View Details
            </button>
            <button
              onClick={handleSubmitRun}
              className="btn-secondary px-4 py-2 text-sm font-medium rounded-md"
            >
              Submit Run
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
