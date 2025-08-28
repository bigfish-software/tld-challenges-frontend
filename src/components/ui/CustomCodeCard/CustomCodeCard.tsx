import React from 'react';

export interface CustomCodeCardProps {
  /** The custom code object */
  customCode: {
    id: number;
    name: string;
    description: string;
    code: string;
    creator: {
      name: string;
      url?: string;
    };
    tags?: string[];
    downloads?: number;
    difficulty?: 'Easy' | 'Medium' | 'Hard' | 'Extreme';
    createdAt: string;
  };
  /** Display variant */
  variant?: 'default' | 'compact';
  /** Callback when card is clicked */
  onCardClick?: (id: number) => void;
  /** Callback when download is clicked */
  onDownload?: (id: number, code: string) => void;
  /** Callback when creator is clicked */
  onCreatorClick?: (creatorName: string, creatorUrl?: string) => void;
  /** Additional CSS classes */
  className?: string;
}

export const CustomCodeCard = ({
  customCode,
  variant = 'default',
  onCardClick,
  onDownload,
  onCreatorClick,
  className = ''
}: CustomCodeCardProps) => {
  const {
    id,
    name,
    description,
    code,
    creator,
    tags = [],
    downloads = 0,
    difficulty,
    createdAt
  } = customCode;

  const handleCardClick = () => {
    onCardClick?.(id);
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDownload?.(id, code);
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

  const formatDownloads = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  const getDifficultyColor = (diff?: string) => {
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
      {/* Header */}
      <div className={contentClasses}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors truncate">
              {name}
            </h3>
            <button
              onClick={handleCreatorClick}
              className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors mt-1"
            >
              by {creator.name}
            </button>
          </div>
          
          {difficulty && (
            <span className={`px-2 py-1 text-xs font-medium rounded-full flex-shrink-0 ml-3 ${getDifficultyColor(difficulty)}`}>
              {difficulty}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4 line-clamp-2">
          {description}
        </p>

        {/* Code Preview */}
        {variant !== 'compact' && (
          <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-md p-3 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                Custom Code
              </span>
              <button
                onClick={handleDownload}
                className="flex items-center space-x-1 text-xs text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
              >
                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span>Copy</span>
              </button>
            </div>
            <code className="text-xs font-mono text-slate-700 dark:text-slate-300 break-all">
              {code.length > 60 ? `${code.substring(0, 60)}...` : code}
            </code>
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
            <div className="flex items-center space-x-1">
              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>{formatDownloads(downloads)}</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {variant !== 'compact' && (
              <button
                onClick={handleDownload}
                className="px-3 py-1.5 text-xs font-medium bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
              >
                Download
              </button>
            )}
            <button className="text-xs font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
