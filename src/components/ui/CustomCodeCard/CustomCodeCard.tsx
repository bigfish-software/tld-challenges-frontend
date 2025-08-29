import React from 'react';
import type { CustomCode } from '@/types/api';
import { RichTextRenderer } from '../RichTextRenderer';
import { createComponentLogger } from '@/utils/logger';

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
  const logger = createComponentLogger('CustomCodeCard');

  // Extract data from CustomCode API structure
  const { id, name, description, code, creators } = customCode;

  // Check if description has rich text content
  const hasDescription = description && Array.isArray(description) && description.length > 0;
  
  logger.debug('Processing custom code description', { name }, {
    hasDescription,
    isArray: Array.isArray(description),
    length: description?.length
  });

  const handleCardClick = () => {
    onCardClick?.(id);
  };

  const handleCreatorClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const creator = creators?.[0];
    if (creator) {
      const creatorUrl = creator.twitch || creator.youtube;
      onCreatorClick?.(creator.name, creatorUrl);
    }
  };

  const handleCopyCode = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(code || '');
    // Could add a toast notification here
  };

  const baseClasses = `
    bg-white dark:bg-slate-800 
    border border-slate-200 dark:border-slate-700 
    rounded-lg shadow-sm hover:shadow-md 
    transition-all duration-200 
    cursor-pointer group
    ${className}
  `;

  // List layout - horizontal layout with more space for description
  if (variant === 'list') {
    return (
      <div className={baseClasses} onClick={handleCardClick}>
        <div className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left side - Main content */}
            <div className="flex-1 min-w-0">
              {/* Header with title and creator */}
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors mb-2">
                  {name}
                </h3>
                {creators?.[0] && (
                  <button
                    onClick={handleCreatorClick}
                    className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    by {creators[0].name}
                  </button>
                )}
              </div>

              {/* Description */}
              {hasDescription && (
                <RichTextRenderer 
                  blocks={description} 
                  variant="default"
                  className="text-slate-600 dark:text-slate-300 leading-relaxed"
                />
              )}
            </div>

            {/* Right side - Code display */}
            <div className="lg:w-80 flex-shrink-0">
              {code && (
                <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-md p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                      Code
                    </span>
                    <button
                      onClick={handleCopyCode}
                      className="text-xs text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors flex items-center space-x-1"
                    >
                      <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                      <span>Copy</span>
                    </button>
                  </div>
                  <code className="text-sm font-mono text-slate-700 dark:text-slate-300 block break-all overflow-hidden">
                    {code}
                  </code>
                </div>
              )}
            </div>
          </div>
          
          {/* Button at absolute bottom right of entire card */}
          <div className="flex justify-end mt-4">
            <button
              onClick={handleCardClick}
              className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md transition-colors"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    );
  }

  const contentClasses = variant === 'compact' ? 'p-4' : 'p-6';

  return (
    <div className={baseClasses} onClick={handleCardClick}>
      <div className={contentClasses}>
        {/* Header with title and action */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0 mr-3">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-1">
              {name}
            </h3>
            {creators?.[0] && (
              <button
                onClick={handleCreatorClick}
                className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors mt-1 block"
              >
                by {creators[0].name}
              </button>
            )}
          </div>
          <button
            onClick={handleCardClick}
            className="px-3 py-1.5 text-xs font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md transition-colors flex-shrink-0"
          >
            View
          </button>
        </div>

        {/* Description */}
        {hasDescription && (
          <RichTextRenderer 
            blocks={description} 
            variant="default"
            className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4 line-clamp-3"
          />
        )}

        {/* Code Display */}
        {code && (
          <div className="bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-md p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                Code
              </span>
              <button
                onClick={handleCopyCode}
                className="text-xs text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors flex items-center space-x-1"
              >
                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                <span>Copy</span>
              </button>
            </div>
            <code className="text-sm font-mono text-slate-700 dark:text-slate-300 block break-all overflow-hidden">
              {code}
            </code>
          </div>
        )}
      </div>
    </div>
  );
};
