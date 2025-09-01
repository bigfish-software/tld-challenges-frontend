import React, { useState } from 'react';
import type { Challenge, ChallengeResponse } from '@/types/api';
import type { MockChallenge } from '@/types/common';

export interface ChallengeCardProps {
  /** The challenge object from the API or mock data */
  challenge: Challenge | MockChallenge | ChallengeResponse;
  /** Display variant */
  variant?: 'default' | 'compact' | 'list';
  /** Callback when card is clicked */
  onCardClick?: (id: number) => void;
  /** Callback when join/submit is clicked */
  onJoinChallenge?: (id: number) => void;
  /** Callback when creator is clicked */
  onCreatorClick?: (creatorName: string, creatorUrl?: string) => void;
  /** Additional CSS classes */
  className?: string;
}

// Type guard to check if challenge is a Strapi Challenge
function isStrapiChallenge(challenge: Challenge | MockChallenge | ChallengeResponse): challenge is Challenge {
  return 'attributes' in challenge;
}

// Type guard to check if challenge is a Direct API Response
function isDirectApiChallenge(challenge: Challenge | MockChallenge | ChallengeResponse): challenge is ChallengeResponse {
  return 'documentId' in challenge && !('attributes' in challenge);
}

export const ChallengeCard = ({
  challenge,
  variant = 'default',
  onCardClick,
  onJoinChallenge,
  onCreatorClick,
  className = ''
}: ChallengeCardProps) => {
  // State for copy confirmation
  const [isCopied, setIsCopied] = useState(false);
  
  // Extract data based on challenge type
  const id = challenge.id;
  
  let name: string, description_short: string, difficulty: string, is_featured: boolean;
  let creators: any, rules: any, tournament: any, custom_code: any;
  
  if (isStrapiChallenge(challenge)) {
    // Handle Strapi Challenge structure
    const { attributes } = challenge;
    name = attributes.name;
    description_short = typeof attributes.description === 'string' ? attributes.description : '';
    difficulty = attributes.difficulty;
    is_featured = false; // Legacy challenges don't have featured status
    creators = attributes.creators;
    rules = attributes.rules;
    tournament = attributes.tournament;
    custom_code = attributes.custom_code;
  } else if (isDirectApiChallenge(challenge)) {
    // Handle Direct API Response structure
    name = challenge.name;
    description_short = challenge.description_short || '';
    difficulty = challenge.difficulty;
    is_featured = challenge.is_featured;
    creators = { data: challenge.creators.map(creator => ({ attributes: creator })) };
    rules = { data: [] }; // Not in the API response yet
    tournament = null; // Not in the API response yet
    custom_code = challenge.custom_code ? { data: { attributes: challenge.custom_code } } : null;
  } else {
    // Handle MockChallenge structure
    name = challenge.title;
    description_short = challenge.description;
    difficulty = challenge.difficulty;
    is_featured = false; // Mock challenges don't have featured status
    creators = { data: [{ attributes: challenge.creator }] };
    rules = { data: challenge.rules.map((rule: string, index: number) => ({ id: index, attributes: { description: rule } })) };
    tournament = null;
    custom_code = null;
  }

  const handleCardClick = () => {
    onCardClick?.(id);
  };

  const handleJoinChallenge = (e: React.MouseEvent) => {
    e.stopPropagation();
    onJoinChallenge?.(id);
  };

  const handleCreatorClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const creator = creators?.data?.[0]?.attributes;
    if (creator) {
      const creatorUrl = creator.twitch || creator.youtube;
      onCreatorClick?.(creator.name, creatorUrl);
    }
  };

  // Map TLD difficulty to display colors (but keep original difficulty text)
  const getDifficultyColor = (diff: typeof difficulty) => {
    switch (diff) {
      case 'Easy':
      case 'Pilgrim':
      case 'Voyager':
        return 'badge-success'; // Easy - Green
      case 'Medium':
      case 'Stalker':
        return 'badge-info'; // Medium - Blue  
      case 'Hard':
      case 'Interloper':
        return 'badge-warning'; // Hard - Orange/Amber
      case 'Very Hard':
      case 'Misery':
      case 'Nogoa':
        return 'badge-error'; // Very Hard - Red
      case 'Custom':
        return 'badge-neutral';
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
              {creators && creators.data && creators.data.length > 0 && (
                <div className="mt-1">
                  <span className="text-sm text-tertiary">
                    by {creators.data.map((creator: any) => creator.attributes.name).join(', ')}
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

          {/* Custom Code section and View Details button on same line */}
          <div className="flex items-end gap-4 mt-6 mb-6">
            {/* Custom Code section */}
            {custom_code && custom_code.data && (
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
                          navigator.clipboard.writeText(custom_code.data.attributes.code || '');
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
                    {custom_code.data.attributes.code}
                  </code>
                </div>
              </div>
            )}
            
            {/* Spacer to push button to the right when no custom code */}
            {!custom_code?.data && <div className="flex-1"></div>}
            
            {/* View Details Button - always on the right */}
            <div className="flex-shrink-0">
              <button
                onClick={handleJoinChallenge}
                className="btn-primary px-4 py-2 text-sm font-medium rounded-md"
              >
                View Details
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
            {creators?.data?.[0] && (
              <button
                onClick={handleCreatorClick}
                className="text-sm text-secondary hover:text-primary transition-colors mt-1"
              >
                by {creators.data[0].attributes.name}
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
              {tournament?.data && (
                <div className="flex items-center space-x-1">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Tournament: {tournament.data.attributes.name}</span>
                </div>
              )}
              {custom_code?.data && (
                <div className="flex items-center space-x-1">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  <span>Code: {custom_code.data.attributes.name}</span>
                </div>
              )}
            </div>

            {/* Rules Preview */}
            {rules?.data && rules.data.length > 0 && (
              <div className="card-surface-raised p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-secondary uppercase tracking-wide">
                    Key Rules
                  </span>
                  <span className="text-xs text-secondary">
                    {rules.data.length} rule{rules.data.length !== 1 ? 's' : ''}
                  </span>
                </div>
                <ul className="space-y-1">
                  {rules.data.slice(0, 2).map((rule: any, index: number) => (
                    <li key={index} className="text-xs text-secondary flex items-start space-x-2">
                      <span className="text-primary-color mt-1">•</span>
                      <span className="flex-1">{rule.attributes.description}</span>
                    </li>
                  ))}
                  {rules.data.length > 2 && (
                    <li className="text-xs text-secondary italic">
                      +{rules.data.length - 2} more rules...
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-end pt-3">
          <div className="flex items-center space-x-2">
            <button
              onClick={handleJoinChallenge}
              className="btn-primary px-4 py-2 text-sm font-medium rounded-md"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
