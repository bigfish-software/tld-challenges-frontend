import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { ChallengeResponse } from '@/types/api';
import { getImageUrl, getImageAltText, getResponsiveImageProps } from '@/utils/images';

export interface ChallengeRowProps {
  /** The challenge object from the API */
  challenge: ChallengeResponse;
  /** Additional CSS classes */
  className?: string;
}

export const ChallengeRow: React.FC<ChallengeRowProps> = ({
  challenge,
  className = ''
}) => {
  // State for copy confirmation
  const [isCopied, setIsCopied] = useState(false);
  
  // Extract data from ChallengeResponse structure
  const {
    name,
    description_short,
    difficulty,
    is_featured,
    creators,
    custom_code,
    thumbnail,
    rules
  } = challenge;

  const handleCopyCode = (e: React.MouseEvent) => {
    e.preventDefault();
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
        return 'badge-error'; // Very Hard - Red
      default:
        return 'badge-neutral';
    }
  };

  const difficultyColor = getDifficultyColor(difficulty);

  // Truncate rules text for display
  const rulesPreview = rules && rules.length > 0 && rules[0] 
    ? 'View challenge for detailed rules'
    : '';

  return (
    <div className={`
      group
      flex flex-col md:flex-row
      border border-default
      bg-surface
      hover:border-secondary-color
      transition-all duration-200
      rounded-lg
      overflow-hidden
      relative
      ${className}
    `}>
      {/* Featured badge in top-left corner */}
      {is_featured && (
        <div className="absolute top-0 left-0 z-10">
          <div className="bg-secondary text-light-primary px-3 py-1 text-sm font-semibold rounded-br-lg">
            FEATURED
          </div>
        </div>
      )}

      {/* Thumbnail - shown only on md+ screens */}
      {thumbnail && (
        <div className="hidden md:block w-48 lg:w-64 h-full overflow-hidden flex-shrink-0">
          {(() => {
            const imageProps = getResponsiveImageProps(thumbnail);
            return imageProps ? (
              <img
                src={imageProps.src}
                srcSet={imageProps.srcSet}
                sizes={imageProps.sizes}
                alt={getImageAltText(thumbnail, name)}
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={getImageUrl(thumbnail, 'medium')}
                alt={getImageAltText(thumbnail, name)}
                className="w-full h-full object-cover"
              />
            );
          })()}
        </div>
      )}

      {/* Content */}
      <div className="flex-1 p-4 md:p-6 flex flex-col">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-xl sm:text-2xl font-semibold font-headline text-primary group-hover:text-secondary transition-colors mb-2">
              <Link to={`/challenges/${challenge.slug}`} className="hover:text-secondary-color">
                {name.toUpperCase()}
              </Link>
            </h3>
            {creators && creators.length > 0 && (
              <div className="mb-1">
                <span className="text-sm text-tertiary">
                  by {creators.map((creator, index) => (
                    <React.Fragment key={creator.id}>
                      <Link to={`/creators/${creator.slug}`} className="hover:text-secondary-color">
                        {creator.name}
                      </Link>
                      {index < creators.length - 1 ? ', ' : ''}
                    </React.Fragment>
                  ))}
                </span>
              </div>
            )}
          </div>

          {/* Difficulty badge */}
          <div className="flex-shrink-0 ml-4">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${difficultyColor}`}>
              {difficulty}
            </span>
          </div>
        </div>

        {/* Description and rules */}
        <div className="flex-1 mb-4">
          {description_short && (
            <p className="text-secondary mb-2">
              {description_short}
            </p>
          )}
          {rulesPreview && (
            <div className="text-sm text-tertiary mt-2">
              <span className="font-medium text-primary">Rules:</span> {rulesPreview}
            </div>
          )}
        </div>

        {/* Footer with custom code and buttons */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Custom Code */}
          {custom_code && (
            <div className="flex-1 w-full sm:w-auto">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-sm font-medium text-secondary uppercase tracking-wide">
                  Custom Code:
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleCopyCode}
                    className="text-sm text-primary transition-colors flex items-center space-x-1 copy-button"
                  >
                    <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    <span>{isCopied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
              </div>
              <code className="text-sm font-mono text-primary block break-all max-w-md truncate">
                {custom_code.code}
              </code>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex-shrink-0 flex items-center space-x-3 w-full sm:w-auto">
            <Link
              to={`/challenges/${challenge.slug}`}
              className="flex-1 sm:flex-initial btn-primary px-4 py-2 text-sm font-medium rounded-md text-center"
            >
              View Details
            </Link>
            <Link
              to={`/submissions/${challenge.id}`}
              className="flex-1 sm:flex-initial btn-secondary px-4 py-2 text-sm font-medium rounded-md text-center"
              onClick={(e) => e.stopPropagation()}
            >
              Submit Run
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};