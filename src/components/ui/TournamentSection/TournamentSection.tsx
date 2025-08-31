import { Button } from '@/components/ui/Button';

export interface TournamentData {
  id: number;
  title: string;
  description: string;
  status: 'planned' | 'active' | 'completed' | 'cancelled';
  startDate?: string;
  endDate?: string;
  participantCount?: number;
  prizePool?: string;
  bannerImage?: string;
  slug?: string;
}

export interface TournamentSectionProps {
  tournament?: TournamentData;
  className?: string;
}

export const TournamentSection = ({ 
  tournament, 
  className = '' 
}: TournamentSectionProps) => {
  // Default tournament data for when no tournament is provided
  const defaultTournament: TournamentData = {
    id: 1,
    title: 'Winter Survival Challenge 2025',
    description: 'Test your survival skills in the harshest conditions. Last 50 days in Bleak Inlet without dying.',
    status: 'active',
    startDate: '2025-01-15',
    endDate: '2025-02-28',
    participantCount: 147,
    prizePool: 'Community Recognition'
  };

  const displayTournament = tournament || defaultTournament;

  const getStatusBadge = (status: TournamentData['status']) => {
    const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
    
    switch (status) {
      case 'active':
        return `${baseClasses} badge-success`;
      case 'planned':
        return `${baseClasses} badge-warning`;
      case 'completed':
        return `${baseClasses} badge-neutral`;
      case 'cancelled':
        return `${baseClasses} badge-error`;
      default:
        return `${baseClasses} badge-neutral`;
    }
  };

  const getStatusText = (status: TournamentData['status']) => {
    switch (status) {
      case 'active':
        return 'Active Now';
      case 'planned':
        return 'Coming Soon';
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      default:
        return 'Tournament';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <section className={`
      bg-gradient-to-r 
      from-primary-light
      to-primary-base
      card-surface
      border 
      border-primary
      rounded-lg 
      overflow-hidden
      ${className}
    `}>
      <div className="px-6 py-8 sm:px-8 sm:py-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* Tournament Info */}
          <div className="flex-1 space-y-4">
            {/* Status Badge & Title */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className={getStatusBadge(displayTournament.status)}>
                  {getStatusText(displayTournament.status)}
                </span>
              </div>

              <h2 className="
                text-2xl 
                sm:text-3xl 
                font-bold 
                font-headline
                uppercase
                text-primary 
                leading-tight
              ">
                {displayTournament.title.toUpperCase()}
              </h2>
            </div>

            {/* Description */}
            <p className="
              text-secondary 
              text-base 
              leading-relaxed
              max-w-2xl
            ">
              {displayTournament.description}
            </p>

            {/* Tournament Meta */}
            <div className="flex flex-wrap gap-6 text-sm text-secondary">
              {displayTournament.startDate && displayTournament.endDate && (
                <div className="flex items-center gap-1.5">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>
                    {formatDate(displayTournament.startDate)} - {formatDate(displayTournament.endDate)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 lg:flex-col lg:gap-3 lg:min-w-0 lg:w-auto">
            <Button
              variant="primary"
              size="lg"
              shadow="lg"
              hoverEffect="both"
              responsive={{
                sm: 'sm:min-w-[140px]',
                lg: 'lg:w-full'
              }}
              onClick={() => window.location.href = `/tournaments/${displayTournament.slug || displayTournament.id}`}
            >
              View Details
            </Button>
            
            <Button
              variant="secondary"
              size="lg"
              shadow="lg"
              hoverEffect="both"
              responsive={{
                sm: 'sm:min-w-[140px]',
                lg: 'lg:w-full'
              }}
              onClick={() => window.location.href = '/submit-run'}
            >
              Submit Run
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
