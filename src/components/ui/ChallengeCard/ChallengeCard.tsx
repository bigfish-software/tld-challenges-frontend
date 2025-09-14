import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { ChallengeResponse } from '@/types/api';

export interface ChallengeCardProps {
  /** The challenge object from the API */
  challenge: ChallengeResponse;
  /** Display variant - list (default) or compact (mobile) */
  variant?: 'list' | 'compact';
  /** Callback when card is clicked */
  onCardClick?: (id: number) => void;
  /** Callback when submit run is clicked */
  onSubmitRun?: (id: number) => void;
  /** Callback when creator is clicked */
  onCreatorClick?: (creatorName: string, creatorUrl?: string) => void;
  /** Additional CSS classes */
  className?: string;
}

export const ChallengeCard = ({
  challenge,
  variant = 'list',
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

  const handleCreatorClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const creator = creators?.[0];
    if (creator) {
      const creatorUrl = creator.twitch_url || creator.youtube_url;
      onCreatorClick?.(creator.name, creatorUrl);
    }
  };

  const handleSubmitRun = (e: React.MouseEvent) => {
    e.stopPropagation();
    onSubmitRun?.(id);
  };

  const handleCopyCode = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(custom_code?.code || '');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
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
      `card-base featured-card` :
      // Regular card styles
      `card-base`
    }
    rounded-lg
    transition-all duration-200
    relative
    ${className}
  `;

  // List variant - clean horizontal desktop layout  
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
                    by {creators.map((creator) => creator.name).join(', ')}
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
            <p className="text-secondary leading-relaxed mb-4 max-w-2xl">
              {description_short}
            </p>
          )}

          {/* Custom Code and View Details button horizontal layout */}
          <div className="flex items-end gap-4">
            {/* Custom Code section */}
            {custom_code && (
              <div className="flex-1">
                <div className="bg-surface border border-default rounded-lg p-4 max-w-2xl">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-secondary uppercase tracking-wide">
                      Custom Code
                    </span>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={handleCopyCode}
                        className="text-xs text-primary transition-colors flex items-center space-x-1 copy-button flex-shrink-0"
                      >
                        <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                        </svg>
                        <span>{isCopied ? 'Copied!' : 'Copy'}</span>
                      </button>
                      <Link
                        to={`/custom-codes/${custom_code.slug}`}
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs text-primary transition-colors flex items-center space-x-1 copy-button flex-shrink-0"
                      >
                        <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Details</span>
                      </Link>
                    </div>
                  </div>
                  <code className="text-sm font-mono text-primary block break-all">
                    {custom_code.code}
                  </code>
                </div>
              </div>
            )}

            {/* Spacer to push button to right when no custom code */}
            {!custom_code && <div className="flex-1"></div>}

            {/* Action Buttons */}
            <div className="flex-shrink-0 flex flex-col space-y-2">
              <Link
                to={`/challenges/${challenge.slug}`}
                className="btn-primary px-4 py-2 text-sm font-medium rounded-md text-center cursor-pointer"
              >
                View Details
              </Link>
              <Link
                to={`/submissions/${challenge.id}`}
                className="btn-secondary px-4 py-2 text-sm font-medium rounded-md text-center cursor-pointer"
                onClick={(e) => e.stopPropagation()}
              >
                Submit Run
              </Link>
            </div>
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
        {/* Header with title and difficulty badge - mobile compact layout */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold font-headline text-primary group-hover:text-secondary transition-colors mb-1">
              {name.toUpperCase()}
            </h3>
            {creators && creators.length > 0 && (
              <button
                onClick={handleCreatorClick}
                className="text-xs text-tertiary hover:text-secondary transition-colors cursor-pointer"
              >
                by {creators.map((creator) => creator.name).join(', ')}
              </button>
            )}
          </div>

          {/* Difficulty badge in top-right */}
          <div className="flex-shrink-0 ml-3">
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${difficultyColor}`}>
              {difficulty}
            </span>
          </div>
        </div>

        {/* Short Description */}
        {description_short && (
          <p className="text-secondary text-sm leading-relaxed mb-3">
            {description_short}
          </p>
        )}

        {/* Custom Code section - full width mobile-style */}
        {custom_code && (
          <div className="mb-3">
            <div className="bg-surface border border-default rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-secondary uppercase tracking-wide">
                  Custom Code
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleCopyCode}
                    className="text-xs text-primary transition-colors flex items-center space-x-1 copy-button flex-shrink-0"
                  >
                    <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    <span>{isCopied ? 'Copied!' : 'Copy'}</span>
                  </button>
                  <Link
                    to={`/custom-codes/${custom_code.slug}`}
                    onClick={(e) => e.stopPropagation()}
                    className="text-xs text-primary transition-colors flex items-center space-x-1 copy-button flex-shrink-0"
                  >
                    <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Details</span>
                  </Link>
                </div>
              </div>
              <code className="text-sm font-mono text-primary block break-all">
                {custom_code.code}
              </code>
            </div>
          </div>
        )}

        {/* Action Buttons - full width mobile style */}
        <div className="w-full flex flex-col space-y-2">
          <Link
            to={`/challenges/${challenge.slug}`}
            className="w-full btn-primary px-4 py-2 text-sm font-medium rounded-md cursor-pointer text-center"
          >
            View Details
          </Link>
          <button
            onClick={handleSubmitRun}
            className="w-full btn-secondary px-4 py-2 text-sm font-medium rounded-md cursor-pointer"
          >
            Submit Run
          </button>
        </div>
      </div>
    </div>
  );
};
