import React from 'react';
import type { Challenge } from '@/types/api';

export interface ChallengeCardProps {
  /** The challenge object from the API */
  challenge: Challenge;
  /** Display variant */
  variant?: 'default' | 'compact';
  /** Callback when card is clicked */
  onCardClick?: (id: number) => void;
  /** Callback when join/submit is clicked */
  onJoinChallenge?: (id: number) => void;
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
  onCreatorClick,
  className = ''
}: ChallengeCardProps) => {
  const { id, attributes } = challenge;
  const {
    name,
    description,
    difficulty,
    created_date,
    creators,
    rules,
    tournament,
    custom_code
  } = attributes;

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

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Map TLD difficulty to display difficulty and colors
  const getDifficultyInfo = (diff: typeof difficulty) => {
    switch (diff) {
      case 'Pilgrim':
        return { label: 'Easy', color: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' };
      case 'Voyager':
        return { label: 'Easy', color: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' };
      case 'Stalker':
        return { label: 'Medium', color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300' };
      case 'Interloper':
        return { label: 'Hard', color: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300' };
      case 'Misery':
        return { label: 'Extreme', color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300' };
      case 'Nogoa':
        return { label: 'Extreme', color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300' };
      case 'Custom':
        return { label: 'Custom', color: 'bg-slate-100 dark:bg-slate-900/30 text-slate-800 dark:text-slate-300' };
      default:
        return { label: 'Medium', color: 'bg-slate-100 dark:bg-slate-900/30 text-slate-800 dark:text-slate-300' };
    }
  };

  const difficultyInfo = getDifficultyInfo(difficulty);

  const baseClasses = `
    bg-white dark:bg-slate-800 
    border border-slate-200 dark:border-slate-700 
    rounded-lg shadow-sm hover:shadow-md 
    transition-all duration-200 
    cursor-pointer group
    ${className}
  `;

  const contentClasses = variant === 'compact' ? 'p-4' : 'p-6';

  return (
    <div className={baseClasses} onClick={handleCardClick}>
      <div className={contentClasses}>
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors truncate">
              {name}
            </h3>
            {creators?.data?.[0] && (
              <button
                onClick={handleCreatorClick}
                className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors mt-1"
              >
                by {creators.data[0].attributes.name}
              </button>
            )}
          </div>
          
          <div className="flex items-center space-x-2 flex-shrink-0 ml-3">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${difficultyInfo.color}`}>
              {difficultyInfo.label}
            </span>
          </div>
        </div>

        {/* Description */}
        {description && (
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4 line-clamp-2">
            {description}
          </p>
        )}

        {/* Challenge Info */}
        {variant !== 'compact' && (
          <div className="space-y-3 mb-4">
            {/* Tournament and Custom Code */}
            <div className="flex items-center space-x-4 text-sm text-slate-600 dark:text-slate-400">
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
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-md p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                    Key Rules
                  </span>
                  <span className="text-xs text-slate-400 dark:text-slate-500">
                    {rules.data.length} rule{rules.data.length !== 1 ? 's' : ''}
                  </span>
                </div>
                <ul className="space-y-1">
                  {rules.data.slice(0, 2).map((rule: any, index: number) => (
                    <li key={index} className="text-xs text-slate-600 dark:text-slate-400 flex items-start space-x-2">
                      <span className="text-primary-500 mt-1">•</span>
                      <span className="flex-1">{rule.attributes.description}</span>
                    </li>
                  ))}
                  {rules.data.length > 2 && (
                    <li className="text-xs text-slate-500 dark:text-slate-400 italic">
                      +{rules.data.length - 2} more rules...
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-700">
          <div className="flex items-center space-x-4 text-xs text-slate-500 dark:text-slate-400">
            {created_date && <span>{formatDate(created_date)}</span>}
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={handleJoinChallenge}
              className="px-3 py-1.5 text-xs font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md transition-colors"
            >
              View Challenge
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
