import React from 'react';

export interface TournamentCardProps {
  /** The tournament object */
  tournament: {
    id: number;
    title: string;
    description: string;
    organizer: {
      name: string;
      url?: string;
    };
    format: 'Single Elimination' | 'Double Elimination' | 'Round Robin' | 'Swiss' | 'Battle Royale';
    game_mode: 'Survival' | 'Challenge' | 'Speedrun' | 'PvP' | 'Custom';
    prizes?: {
      first?: string;
      second?: string;
      third?: string;
      participation?: string;
    };
    entry_fee?: string;
    max_participants?: number;
    current_participants?: number;
    registration_deadline?: string;
    start_date: string;
    end_date?: string;
    status: 'Registration' | 'Active' | 'Completed' | 'Cancelled';
    featured?: boolean;
    tags?: string[];
    createdAt: string;
  };
  /** Display variant */
  variant?: 'default' | 'compact';
  /** Callback when card is clicked */
  onCardClick?: (id: number) => void;
  /** Callback when register/join is clicked */
  onRegister?: (id: number) => void;
  /** Callback when organizer is clicked */
  onOrganizerClick?: (organizerName: string, organizerUrl?: string) => void;
  /** Additional CSS classes */
  className?: string;
}

export const TournamentCard = ({
  tournament,
  variant = 'default',
  onCardClick,
  onRegister,
  onOrganizerClick,
  className = ''
}: TournamentCardProps) => {
  const {
    id,
    title,
    description,
    organizer,
    format,
    game_mode,
    prizes,
    entry_fee,
    max_participants,
    current_participants = 0,
    registration_deadline,
    start_date,
    status,
    featured = false,
    tags = [],
    createdAt
  } = tournament;

  const handleCardClick = () => {
    onCardClick?.(id);
  };

  const handleRegister = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRegister?.(id);
  };

  const handleOrganizerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onOrganizerClick?.(organizer.name, organizer.url);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      time: date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
    };
  };

  const getStatusColor = (stat: string) => {
    switch (stat) {
      case 'Registration':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300';
      case 'Active':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
      case 'Completed':
        return 'bg-slate-100 dark:bg-slate-900/30 text-slate-800 dark:text-slate-300';
      case 'Cancelled':
        return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300';
      default:
        return 'bg-slate-100 dark:bg-slate-900/30 text-slate-800 dark:text-slate-300';
    }
  };

  const getGameModeColor = (mode: string) => {
    switch (mode) {
      case 'Survival':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
      case 'Challenge':
        return 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300';
      case 'Speedrun':
        return 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300';
      case 'PvP':
        return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300';
      case 'Custom':
        return 'bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300';
      default:
        return 'bg-slate-100 dark:bg-slate-900/30 text-slate-800 dark:text-slate-300';
    }
  };

  const getActionButton = () => {
    switch (status) {
      case 'Registration':
        return { text: 'Register Now', color: 'bg-primary-600 hover:bg-primary-700', disabled: false };
      case 'Active':
        return { text: 'View Live', color: 'bg-green-600 hover:bg-green-700', disabled: false };
      case 'Completed':
        return { text: 'View Results', color: 'bg-slate-600 hover:bg-slate-700', disabled: false };
      case 'Cancelled':
        return { text: 'Cancelled', color: 'bg-slate-400', disabled: true };
      default:
        return { text: 'View Details', color: 'bg-slate-600 hover:bg-slate-700', disabled: false };
    }
  };

  const getParticipationInfo = () => {
    if (!max_participants) return `${current_participants} participants`;
    const percentage = (current_participants / max_participants) * 100;
    return {
      text: `${current_participants}/${max_participants}`,
      percentage,
      isFull: current_participants >= max_participants
    };
  };

  const actionButton = getActionButton();
  const participationInfo = getParticipationInfo();
  const startDateTime = formatDateTime(start_date);

  const baseClasses = `
    bg-white dark:bg-slate-800 
    border border-slate-200 dark:border-slate-700 
    rounded-lg shadow-sm hover:shadow-md 
    transition-all duration-200 
    cursor-pointer group
    ${featured ? 'ring-2 ring-accent-500 dark:ring-accent-400' : ''}
    ${className}
  `;

  const contentClasses = variant === 'compact' ? 'p-4' : 'p-6';

  return (
    <div className={baseClasses} onClick={handleCardClick}>
      <div className={contentClasses}>
        {/* Featured Badge */}
        {featured && (
          <div className="flex items-center justify-center mb-3">
            <span className="px-3 py-1 text-xs font-bold bg-accent-100 dark:bg-accent-900/30 text-accent-800 dark:text-accent-300 rounded-full flex items-center space-x-1">
              <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span>Featured</span>
            </span>
          </div>
        )}

        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors truncate">
              {title}
            </h3>
            <button
              onClick={handleOrganizerClick}
              className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors mt-1"
            >
              by {organizer.name}
            </button>
          </div>
          
          <div className="flex items-center space-x-2 flex-shrink-0 ml-3">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(status)}`}>
              {status}
            </span>
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getGameModeColor(game_mode)}`}>
              {game_mode}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4 line-clamp-2">
          {description}
        </p>

        {/* Tournament Details */}
        {variant !== 'compact' && (
          <div className="space-y-3 mb-4">
            {/* Format and Schedule */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400">
                <svg className="h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <span className="truncate">{format}</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400">
                <svg className="h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="truncate">{startDateTime.date} at {startDateTime.time}</span>
              </div>
            </div>

            {/* Prizes */}
            {prizes && (Object.keys(prizes).length > 0) && (
              <div className="bg-accent-50 dark:bg-accent-900/20 border border-accent-200 dark:border-accent-800 rounded-md p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-accent-700 dark:text-accent-300 uppercase tracking-wide">
                    Prize Pool
                  </span>
                  {entry_fee && (
                    <span className="text-xs text-accent-600 dark:text-accent-400">
                      Entry: {entry_fee}
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {prizes.first && (
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-amber-600 dark:text-amber-400">🥇</span>
                      <span className="text-slate-700 dark:text-slate-300">{prizes.first}</span>
                    </div>
                  )}
                  {prizes.second && (
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-slate-500 dark:text-slate-400">🥈</span>
                      <span className="text-slate-700 dark:text-slate-300">{prizes.second}</span>
                    </div>
                  )}
                  {prizes.third && (
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-amber-700 dark:text-amber-500">🥉</span>
                      <span className="text-slate-700 dark:text-slate-300">{prizes.third}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Participation Progress */}
            {max_participants && typeof participationInfo === 'object' && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-400">Participants</span>
                  <span className={`font-medium ${participationInfo.isFull ? 'text-red-600 dark:text-red-400' : 'text-slate-700 dark:text-slate-300'}`}>
                    {participationInfo.text}
                  </span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      participationInfo.isFull 
                        ? 'bg-red-500 dark:bg-red-400' 
                        : participationInfo.percentage > 75 
                          ? 'bg-amber-500 dark:bg-amber-400'
                          : 'bg-primary-600 dark:bg-primary-400'
                    }`}
                    style={{ width: `${Math.min(participationInfo.percentage, 100)}%` }}
                  />
                </div>
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
                className="px-2 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-900/30 text-slate-700 dark:text-slate-300 rounded-md"
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
            <span>Created {formatDate(createdAt)}</span>
            {registration_deadline && status === 'Registration' && (
              <span className="text-amber-600 dark:text-amber-400">
                Reg ends {formatDate(registration_deadline)}
              </span>
            )}
            {typeof participationInfo === 'string' && (
              <span>{participationInfo}</span>
            )}
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={handleRegister}
              disabled={actionButton.disabled}
              className={`px-3 py-1.5 text-xs font-medium text-white rounded-md transition-colors ${actionButton.color} ${
                actionButton.disabled ? 'cursor-not-allowed opacity-50' : ''
              }`}
            >
              {actionButton.text}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
