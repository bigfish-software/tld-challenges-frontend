import React from 'react';
import { useNavigate } from 'react-router-dom';
import type { Tournament } from '@/types/api';

export interface TournamentCardProps {
  /** The tournament object from the API */
  tournament: Tournament;
  /** Display variant - list (default) or compact (mobile) */
  variant?: 'list' | 'compact';
  /** Callback when organizer is clicked */
  onOrganizerClick?: (organizerName: string, organizerUrl?: string) => void;
  /** Additional CSS classes */
  className?: string;
}

export const TournamentCard = ({
  tournament,
  variant = 'list',
  onOrganizerClick,
  className = ''
}: TournamentCardProps) => {
  const navigate = useNavigate();
  
  // Extract data from Tournament API structure
  const { 
    name, 
    description_short, 
    start_date, 
    end_date, 
    state, 
    is_featured,
    creators,
    slug 
  } = tournament;

  const handleOrganizerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const creator = creators?.[0];
    if (creator) {
      const creatorUrl = creator.twitch_url || creator.youtube_url;
      onOrganizerClick?.(creator.name, creatorUrl);
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

  // Get status info based on state
  const getStatusInfo = () => {
    switch (state) {
      case 'planned':
        return { label: 'Upcoming', color: 'badge-warning' };
      case 'active':
        return { label: 'Active', color: 'badge-success' };
      case 'completed':
        return { label: 'Completed', color: 'badge-neutral' };
      case 'cancelled':
        return { label: 'Cancelled', color: 'badge-error' };
      default:
        return { label: 'Unknown', color: 'badge-neutral' };
    }
  };

  const statusInfo = getStatusInfo();

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
            <div className="bg-secondary text-light-primary px-3 py-1 text-sm font-semibold rounded-bl-lg rounded-tr-lg">
              FEATURED
            </div>
          </div>
        )}

        <div className="p-6">
          {/* Header with title, creators, and status badge */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-xl sm:text-2xl font-semibold font-headline text-primary group-hover:text-secondary transition-colors mb-2">
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

            {/* Status badge in top-right */}
            <div className="flex-shrink-0 ml-4">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${statusInfo.color}`}>
                {statusInfo.label}
              </span>
            </div>
          </div>

          {/* Short Description */}
          {description_short && (
            <p className="text-secondary leading-relaxed mb-4 max-w-2xl">
              {description_short}
            </p>
          )}

          {/* Dates and View Details button horizontal layout */}
          <div className="flex items-end gap-4">
            {/* Dates section */}
            {(start_date || end_date) && (
              <div className="flex-1">
                <div className="bg-surface border border-default rounded-lg p-4 max-w-2xl">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-secondary uppercase tracking-wide">
                      Tournament Dates
                    </span>
                  </div>
                  <div className="flex items-center space-x-6 text-sm">
                    {start_date && (
                      <div className="flex items-center space-x-2">
                        <svg className="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="text-primary">Starts: {formatDate(start_date)}</span>
                      </div>
                    )}
                    {end_date && (
                      <div className="flex items-center space-x-2">
                        <svg className="h-4 w-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-primary">Ends: {formatDate(end_date)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Spacer to push button to right when no dates */}
            {!start_date && !end_date && <div className="flex-1"></div>}

            {/* Action Buttons */}
            <div className="flex-shrink-0">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  // Navigate to tournament detail
                  navigate(`/tournaments/${slug}`);
                }}
                className="btn-primary px-4 py-2 text-sm font-medium rounded-md cursor-pointer"
              >
                View Details
              </button>
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
          <div className="bg-secondary text-light-primary px-3 py-1 text-sm font-semibold rounded-bl-lg rounded-tr-lg">
            FEATURED
          </div>
        </div>
      )}

      <div className="p-4">
        {/* Header with title and status badge - mobile compact layout */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold font-headline text-primary group-hover:text-secondary transition-colors mb-1">
              {name.toUpperCase()}
            </h3>
            {creators && creators.length > 0 && (
              <button
                onClick={handleOrganizerClick}
                className="text-sm text-tertiary hover:text-secondary transition-colors cursor-pointer"
              >
                by {creators.map((creator) => creator.name).join(', ')}
              </button>
            )}
          </div>

          {/* Status badge in top-right */}
          <div className="flex-shrink-0 ml-3">
            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-sm font-medium ${statusInfo.color}`}>
              {statusInfo.label}
            </span>
          </div>
        </div>

        {/* Short Description */}
        {description_short && (
          <p className="text-secondary text-sm leading-relaxed mb-3">
            {description_short}
          </p>
        )}

        {/* Dates section - full width mobile-style */}
        {(start_date || end_date) && (
          <div className="mb-3">
            <div className="bg-surface border border-default rounded-lg p-3">
              <div className="mb-2">
                <span className="text-sm font-medium text-secondary uppercase tracking-wide">
                  Tournament Dates
                </span>
              </div>
              <div className="space-y-1">
                {start_date && (
                  <div className="flex items-center space-x-2">
                    <svg className="h-3.5 w-3.5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-primary text-sm">Starts: {formatDate(start_date)}</span>
                  </div>
                )}
                {end_date && (
                  <div className="flex items-center space-x-2">
                    <svg className="h-3.5 w-3.5 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-primary text-sm">Ends: {formatDate(end_date)}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Action Button - full width mobile style */}
        <div className="w-full">
          <button
            onClick={(e) => {
              e.stopPropagation();
              // Navigate to tournament detail
              navigate(`/tournaments/${slug}`);
            }}
            className="w-full btn-primary px-4 py-2 text-sm font-medium rounded-md cursor-pointer"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );

};
