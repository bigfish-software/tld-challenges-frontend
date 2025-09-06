import React from 'react';
import { Link } from 'react-router-dom';
import type { Tournament } from '@/types/api';

export interface TournamentCardProps {
  /** The tournament object from the API */
  tournament: Tournament;
  /** Display variant */
  variant?: 'default' | 'compact' | 'list';
  /** Callback when card is clicked */
  onCardClick?: (id: number) => void;
  /** Callback when organizer is clicked */
  onOrganizerClick?: (organizerName: string, organizerUrl?: string) => void;
  /** Additional CSS classes */
  className?: string;
}

export const TournamentCard = ({
  tournament,
  variant = 'default',
  onCardClick,
  onOrganizerClick,
  className = ''
}: TournamentCardProps) => {
  
  // Extract data from Tournament API structure
  const { 
    id, 
    name, 
    description_short, 
    start_date, 
    end_date, 
    state, 
    is_featured,
    creators 
  } = tournament;

  const handleCardClick = () => {
    onCardClick?.(id);
  };

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

  // Get action button based on state
  const getActionButton = () => {
    switch (state) {
      case 'planned':
        return { text: 'Register', color: 'btn-info' };
      case 'active':
        return { text: 'View Tournament', color: 'btn-primary' };
      case 'completed':
        return { text: 'View Results', color: 'btn-secondary' };
      case 'cancelled':
        return { text: 'View Details', color: 'btn-secondary' };
      default:
        return { text: 'View Details', color: 'btn-secondary' };
    }
  };

  const actionButton = getActionButton();

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
          {/* Header with title, creators, and status badge */}
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

            {/* Status badge in top-right */}
            <div className="flex-shrink-0 ml-4">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}>
                {statusInfo.label}
              </span>
            </div>
          </div>

          {/* Short Description */}
          {description_short && (
            <p className="text-secondary leading-relaxed mb-6 max-w-2xl">
              {description_short}
            </p>
          )}

          {/* Dates and View Details button responsive layout */}
          <div className="flex flex-col lg:flex-row lg:items-end gap-4 mt-6 mb-6">
            {/* Dates section */}
            <div className="flex justify-start flex-1">
              <div className="bg-surface border border-default rounded-lg p-4 w-full max-w-2xl">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-secondary uppercase tracking-wide">
                    Tournament Dates
                  </span>
                </div>
                <div className="flex items-center space-x-6 text-sm">
                  {start_date && (
                    <div className="flex items-center space-x-2">
                      <svg className="h-4 w-4 text-primary-color" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-primary">Starts: {formatDate(start_date)}</span>
                    </div>
                  )}
                  {end_date && (
                    <div className="flex items-center space-x-2">
                      <svg className="h-4 w-4 text-primary-color" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-primary">Ends: {formatDate(end_date)}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Spacer to push buttons to the right when no dates on desktop */}
            {!start_date && !end_date && <div className="hidden lg:block flex-1"></div>}

            {/* Action Buttons - responsive positioning */}
            <div className="flex-shrink-0 flex flex-col space-y-2 items-end w-full lg:w-auto">
              <Link
                to={`/tournaments/${tournament.slug}`}
                className="btn-primary px-4 py-2 text-sm font-medium rounded-md w-32 text-center"
              >
                View Details
              </Link>
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
            <h3 className="text-lg font-semibold text-primary group-hover:text-secondary transition-colors truncate">
              {name.toUpperCase()}
            </h3>
            {creators && creators.length > 0 && (
              <button
                onClick={handleOrganizerClick}
                className="text-sm text-tertiary hover:text-secondary transition-colors mt-1"
              >
                by {creators.map((creator) => creator.name).join(', ')}
              </button>
            )}
          </div>
          
          <div className="flex items-center space-x-2 flex-shrink-0 ml-3">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusInfo.color}`}>
              {statusInfo.label}
            </span>
          </div>
        </div>        {/* Description */}
        {description_short && (
          <p className="text-secondary text-sm leading-relaxed mb-4 line-clamp-2">
            {description_short}
          </p>
        )}

        {/* Tournament Info */}
        {variant !== 'compact' && (
          <div className="space-y-3 mb-4">
            {/* Dates */}
            <div className="flex items-center space-x-4 text-sm text-secondary">
              {start_date && (
                <div className="flex items-center space-x-1">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Starts: {formatDate(start_date)}</span>
                </div>
              )}
              {end_date && (
                <div className="flex items-center space-x-1">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Ends: {formatDate(end_date)}</span>
                </div>
              )}
            </div>

            {/* Tournament Status Details */}
            {state === 'planned' && start_date && (
              <div className="bg-surface border border-default rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <svg className="h-4 w-4 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-xs text-secondary">
                    Registration open - Tournament starts {formatDate(start_date)}
                  </span>
                </div>
              </div>
            )}

            {state === 'active' && (
              <div className="bg-surface border border-default rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <svg className="h-4 w-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z" />
                  </svg>
                  <span className="text-xs text-secondary">
                    Tournament in progress
                  </span>
                </div>
              </div>
            )}

            {state === 'completed' && (
              <div className="bg-surface border border-default rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <svg className="h-4 w-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-xs text-secondary">
                    Tournament completed - View final results
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-end pt-3">
          <div className="flex flex-col space-y-2">
            <Link
              to={`/tournaments/${tournament.slug}`}
              className={`${actionButton.color} px-4 py-2 text-sm font-medium rounded-md text-center`}
            >
              {actionButton.text}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
