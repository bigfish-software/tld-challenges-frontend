import React from 'react';
import type { Tournament } from '@/types/api';
import type { MockTournament } from '@/types/common';

export interface TournamentCardProps {
  /** The tournament object from the API or mock data */
  tournament: Tournament | MockTournament;
  /** Display variant */
  variant?: 'default' | 'compact';
  /** Callback when card is clicked */
  onCardClick?: (id: number) => void;
  /** Callback when join/register is clicked */
  onJoinTournament?: (id: number) => void;
  /** Callback when organizer is clicked */
  onOrganizerClick?: (organizerName: string, organizerUrl?: string) => void;
  /** Additional CSS classes */
  className?: string;
}

// Type guard to check if tournament is a Strapi Tournament
function isStrapiTournament(tournament: Tournament | MockTournament): tournament is Tournament {
  return 'attributes' in tournament;
}

export const TournamentCard = ({
  tournament,
  variant = 'default',
  onCardClick,
  onJoinTournament,
  onOrganizerClick,
  className = ''
}: TournamentCardProps) => {
  // Extract data based on tournament type
  const id = tournament.id;
  
  let name: string, description: string, start_date: string, end_date: string, state: string, created_date: string | undefined;
  let creators: any;
  
  if (isStrapiTournament(tournament)) {
    // Handle Strapi Tournament structure
    const { attributes } = tournament;
    name = attributes.name;
    description = typeof attributes.description === 'string' ? attributes.description : '';
    start_date = attributes.start_date;
    end_date = attributes.end_date;
    state = attributes.state;
    created_date = attributes.created_date;
    creators = attributes.creators;
  } else {
    // Handle MockTournament structure
    name = tournament.title;
    description = tournament.description;
    start_date = tournament.startDate;
    end_date = tournament.endDate;
    state = tournament.status;
    created_date = tournament.startDate;
    creators = { data: [{ attributes: tournament.creator }] };
  }

  const handleCardClick = () => {
    onCardClick?.(id);
  };

  const handleJoinTournament = (e: React.MouseEvent) => {
    e.stopPropagation();
    onJoinTournament?.(id);
  };

  const handleOrganizerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const creator = creators?.data?.[0]?.attributes;
    if (creator) {
      const creatorUrl = creator.twitch || creator.youtube;
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
    card-surface
    hover:shadow-md 
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
            <h3 className="text-lg font-semibold text-primary group-hover:text-primary-hover transition-colors truncate">
              {name}
            </h3>
            {creators?.data?.[0] && (
              <button
                onClick={handleOrganizerClick}
                className="text-sm text-secondary hover:text-primary-hover transition-colors mt-1"
              >
                by {creators.data[0].attributes.name}
              </button>
            )}
          </div>
          
          <div className="flex items-center space-x-2 flex-shrink-0 ml-3">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusInfo.color}`}>
              {statusInfo.label}
            </span>
          </div>
        </div>

        {/* Description */}
        {description && (
          <p className="text-secondary text-sm leading-relaxed mb-4 line-clamp-2">
            {description}
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
              <div className="alert-info p-3">
                <div className="flex items-center space-x-2">
                  <svg className="h-4 w-4 text-info-color" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-xs text-info-color">
                    Registration open - Tournament starts {formatDate(start_date)}
                  </span>
                </div>
              </div>
            )}

            {state === 'active' && (
              <div className="alert-success p-3">
                <div className="flex items-center space-x-2">
                  <svg className="h-4 w-4 text-success-color" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z" />
                  </svg>
                  <span className="text-xs text-success-color">
                    Tournament in progress
                  </span>
                </div>
              </div>
            )}

            {state === 'completed' && (
              <div className="alert-neutral p-3">
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
        <div className="flex items-center justify-between pt-3 border-t border-default">
          <div className="flex items-center space-x-4 text-xs text-secondary">
            {created_date && <span>Created {formatDate(created_date)}</span>}
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={handleJoinTournament}
              className={`${actionButton.color} px-3 py-1.5 text-xs font-medium rounded-md`}
            >
              {actionButton.text}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
