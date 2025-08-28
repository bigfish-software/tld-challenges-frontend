import React from 'react';

export interface ChallengeCardProps {
  /** The challenge object */
  challenge: {
    id: number;
    title: string;
    description: string;
    rules: string[];
    creator: {
      name: string;
      url?: string;
    };
    difficulty: 'Easy' | 'Medium' | 'Hard' | 'Extreme';
    duration?: string;
    region?: string;
    tags?: string[];
    submissions?: number;
    participants?: number;
    status: 'Active' | 'Completed' | 'Upcoming';
    createdAt: string;
    endDate?: string;
  };
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
  const {
    id,
    title,
    description,
    rules,
    creator,
    difficulty,
    duration,
    region,
    tags = [],
    submissions = 0,
    participants = 0,
    status,
    createdAt,
    endDate
  } = challenge;

  const handleCardClick = () => {
    onCardClick?.(id);
  };

  const handleJoinChallenge = (e: React.MouseEvent) => {
    e.stopPropagation();
    onJoinChallenge?.(id);
  };

  const handleCreatorClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onCreatorClick?.(creator.name, creator.url);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'Easy':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
      case 'Medium':
        return 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300';
      case 'Hard':
        return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300';
      case 'Extreme':
        return 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300';
      default:
        return 'bg-slate-100 dark:bg-slate-900/30 text-slate-800 dark:text-slate-300';
    }
  };

  const getStatusColor = (stat: string) => {
    switch (stat) {
      case 'Active':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
      case 'Completed':
        return 'bg-slate-100 dark:bg-slate-900/30 text-slate-800 dark:text-slate-300';
      case 'Upcoming':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300';
      default:
        return 'bg-slate-100 dark:bg-slate-900/30 text-slate-800 dark:text-slate-300';
    }
  };

  const getActionButton = () => {
    switch (status) {
      case 'Active':
        return { text: 'Join Challenge', color: 'bg-primary-600 hover:bg-primary-700' };
      case 'Completed':
        return { text: 'View Results', color: 'bg-slate-600 hover:bg-slate-700' };
      case 'Upcoming':
        return { text: 'Set Reminder', color: 'bg-blue-600 hover:bg-blue-700' };
      default:
        return { text: 'View Details', color: 'bg-slate-600 hover:bg-slate-700' };
    }
  };

  const actionButton = getActionButton();

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
              {title}
            </h3>
            <button
              onClick={handleCreatorClick}
              className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors mt-1"
            >
              by {creator.name}
            </button>
          </div>
          
          <div className="flex items-center space-x-2 flex-shrink-0 ml-3">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(status)}`}>
              {status}
            </span>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(difficulty)}`}>
              {difficulty}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4 line-clamp-2">
          {description}
        </p>

        {/* Challenge Info */}
        {variant !== 'compact' && (
          <div className="space-y-3 mb-4">
            {/* Duration and Region */}
            <div className="flex items-center space-x-4 text-sm text-slate-600 dark:text-slate-400">
              {duration && (
                <div className="flex items-center space-x-1">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{duration}</span>
                </div>
              )}
              {region && (
                <div className="flex items-center space-x-1">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{region}</span>
                </div>
              )}
            </div>

            {/* Key Rules Preview */}
            {rules.length > 0 && (
              <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-md p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                    Key Rules
                  </span>
                  <span className="text-xs text-slate-400 dark:text-slate-500">
                    {rules.length} rule{rules.length !== 1 ? 's' : ''}
                  </span>
                </div>
                <ul className="space-y-1">
                  {rules.slice(0, 2).map((rule, index) => (
                    <li key={index} className="text-xs text-slate-600 dark:text-slate-400 flex items-start space-x-2">
                      <span className="text-primary-500 mt-1">•</span>
                      <span className="flex-1">{rule}</span>
                    </li>
                  ))}
                  {rules.length > 2 && (
                    <li className="text-xs text-slate-500 dark:text-slate-400 italic">
                      +{rules.length - 2} more rules...
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {tags.slice(0, variant === 'compact' ? 2 : 4).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs font-medium bg-accent-100 dark:bg-accent-900/30 text-accent-800 dark:text-accent-300 rounded-md"
              >
                {tag}
              </span>
            ))}
            {tags.length > (variant === 'compact' ? 2 : 4) && (
              <span className="px-2 py-1 text-xs text-slate-500 dark:text-slate-400">
                +{tags.length - (variant === 'compact' ? 2 : 4)} more
              </span>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-700">
          <div className="flex items-center space-x-4 text-xs text-slate-500 dark:text-slate-400">
            <span>{formatDate(createdAt)}</span>
            {endDate && status === 'Active' && (
              <span>Ends {formatDate(endDate)}</span>
            )}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>{formatCount(participants)}</span>
              </div>
              {submissions > 0 && (
                <div className="flex items-center space-x-1">
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>{formatCount(submissions)}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={handleJoinChallenge}
              className={`px-3 py-1.5 text-xs font-medium text-white rounded-md transition-colors ${actionButton.color}`}
            >
              {actionButton.text}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
