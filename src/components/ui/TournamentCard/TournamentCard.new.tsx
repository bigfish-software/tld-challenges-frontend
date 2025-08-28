import React from 'react';
import type { Tournament } from '@/types/api';

export interface TournamentCardProps {
  /** The tournament object from the API */
  tournament: Tournament;
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

export const TournamentCard = ({
  tournament,
  variant = 'default',
  onCardClick,
  onJoinTournament,
  onOrganizerClick,
  className = ''
}: TournamentCardProps) => {
  const { id, attributes } = tournament;
  const {
    name,
    description,
    start_date,
    end_date,
    state,
    created_date,
    creators
  } = attributes;

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
        return { label: 'Upcoming', color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' };
      case 'active':
        return { label: 'Active', color: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' };
      case 'completed':
        return { label: 'Completed', color: 'bg-slate-100 dark:bg-slate-900/30 text-slate-800 dark:text-slate-300' };
      case 'cancelled':
        return { label: 'Cancelled', color: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300' };
      default:
        return { label: 'Unknown', color: 'bg-slate-100 dark:bg-slate-900/30 text-slate-800 dark:text-slate-300' };
    }
  };

  const statusInfo = getStatusInfo();

  // Get action button based on state
  const getActionButton = () => {
    switch (state) {
      case 'planned':
        return { text: 'Register', color: 'bg-blue-600 hover:bg-blue-700' };
      case 'active':
        return { text: 'View Tournament', color: 'bg-primary-600 hover:bg-primary-700' };
      case 'completed':
        return { text: 'View Results', color: 'bg-slate-600 hover:bg-slate-700' };
      case 'cancelled':
        return { text: 'View Details', color: 'bg-slate-600 hover:bg-slate-700' };
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
              {name}
            </h3>
            {creators?.data?.[0] && (
              <button
                onClick={handleOrganizerClick}
                className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors mt-1"
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
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4 line-clamp-2">
            {description}
          </p>
        )}

        {/* Tournament Info */}
        {variant !== 'compact' && (
          <div className="space-y-3 mb-4">
            {/* Dates */}
            <div className="flex items-center space-x-4 text-sm text-slate-600 dark:text-slate-400">
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
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-md p-3">
                <div className="flex items-center space-x-2">
                  <svg className="h-4 w-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-xs text-blue-800 dark:text-blue-200">
                    Registration open - Tournament starts {formatDate(start_date)}
                  </span>
                </div>
              </div>
            )}

            {state === 'active' && (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md p-3">
                <div className="flex items-center space-x-2">
                  <svg className="h-4 w-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z" />
                  </svg>
                  <span className="text-xs text-green-800 dark:text-green-200">
                    Tournament in progress
                  </span>
                </div>
              </div>
            )}

            {state === 'completed' && (
              <div className="bg-slate-50 dark:bg-slate-900/20 border border-slate-200 dark:border-slate-700 rounded-md p-3">
                <div className="flex items-center space-x-2">
                  <svg className="h-4 w-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-xs text-slate-800 dark:text-slate-200">
                    Tournament completed - View final results
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-700">
          <div className="flex items-center space-x-4 text-xs text-slate-500 dark:text-slate-400">
            {created_date && <span>Created {formatDate(created_date)}</span>}
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={handleJoinTournament}
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
