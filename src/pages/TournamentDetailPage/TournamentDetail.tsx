import { Tournament } from '@/types/api';
import { RichTextRenderer } from '@/components/ui/RichTextRenderer';
import { Link } from 'react-router-dom';

interface TournamentDetailProps {
  tournament: Tournament;
}

export const TournamentDetail = ({ tournament }: TournamentDetailProps) => {
  // Format date for display with better error handling
  const formatDate = (dateString?: string | null) => {
    if (!dateString) {
      return 'Not specified';
    }
    
    try {
      const date = new Date(dateString);
      // Check if date is valid
      if (isNaN(date.getTime())) {
        return 'Invalid Date';
      }
      
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      console.error('Date formatting error:', error, 'for date:', dateString);
      return 'Invalid Date';
    }
  };

  // Get tournament state styling
  const getStateBadge = (state: string) => {
    const stateStyles = {
      'planned': 'badge-info',
      'active': 'badge-success',
      'completed': 'badge-neutral',
      'cancelled': 'badge-error'
    };
    return stateStyles[state as keyof typeof stateStyles] || 'badge-info';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Tournament Header */}
      <div className="card rounded-lg shadow-sm p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-primary mb-3">
              {tournament.name}
            </h1>
            
            {/* Tournament State Badge */}
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStateBadge(tournament.state)}`}>
              {tournament.state}
            </span>
          </div>

          {tournament.is_featured && (
            <div className="ml-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium badge-warning">
                ⭐ Featured
              </span>
            </div>
          )}
        </div>

        {/* Tournament Dates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
          <div>
            <h3 className="text-sm font-medium text-tertiary mb-1">Start Date</h3>
            <p className="text-lg text-primary">
              {formatDate(tournament?.start_date)}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-tertiary mb-1">End Date</h3>
            <p className="text-lg text-primary">
              {formatDate(tournament?.end_date)}
            </p>
          </div>
        </div>

        {/* Short Description */}
        {tournament.description_short && (
          <div className="border-t border-default pt-4">
            <p className="text-lg text-secondary leading-relaxed">
              {tournament.description_short}
            </p>
          </div>
        )}
      </div>

      {/* Tournament Creators */}
      {tournament.creators && tournament.creators.length > 0 && (
        <div className="card rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-primary mb-4">
            Tournament Organizers
          </h2>
          
          <div className="flex flex-wrap gap-3">
            {tournament.creators.map((creator) => (
              <div key={creator.id} className="flex items-center space-x-3 bg-surface-raised rounded-lg px-4 py-2">
                <div className="flex-1">
                  <p className="font-medium text-primary text-sm">
                    {creator.username}
                  </p>
                  {creator.display_name && creator.display_name !== creator.username && (
                    <p className="text-xs text-tertiary">
                      {creator.display_name}
                    </p>
                  )}
                </div>
                
                {/* Social Links */}
                {(creator.youtube_url || creator.twitch_url || creator.twitter_url) && (
                  <div className="flex space-x-2">
                    {creator.youtube_url && (
                      <a 
                        href={creator.youtube_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-error nav-link"
                        title="YouTube"
                      >
                        📺
                      </a>
                    )}
                    {creator.twitch_url && (
                      <a 
                        href={creator.twitch_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary-color nav-link"
                        title="Twitch"
                      >
                        📹
                      </a>
                    )}
                    {creator.twitter_url && (
                      <a 
                        href={creator.twitter_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-info nav-link"
                        title="Twitter"
                      >
                        🐦
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Detailed Description */}
      {tournament.description_long && (
        <div className="card rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-primary mb-4">
            Tournament Details
          </h2>
          
          <div className="prose dark:prose-invert max-w-none prose-sm">
            <RichTextRenderer blocks={tournament.description_long} />
          </div>
        </div>
      )}

      {/* Tournament Challenges */}
      {tournament.challenges && tournament.challenges.length > 0 && (
        <div className="card rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-primary mb-4">
            Tournament Challenges
          </h2>
          
          <div className="grid gap-3">
            {tournament.challenges.map((challenge) => (
              <div key={challenge.id} className="border border-default rounded-lg p-3 hover:bg-surface-raised transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <Link 
                      to={`/challenges/${challenge.slug}`}
                      className="text-base font-medium text-primary-color nav-link"
                    >
                      {challenge.name}
                    </Link>
                    {challenge.description_short && (
                      <p className="text-secondary mt-1 text-sm">
                        {challenge.description_short}
                      </p>
                    )}
                  </div>
                  
                  {challenge.difficulty && (
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ml-4
                      ${challenge.difficulty === 'Easy' ? 'difficulty-easy' :
                        challenge.difficulty === 'Medium' ? 'difficulty-medium' :
                        challenge.difficulty === 'Hard' ? 'difficulty-hard' :
                        challenge.difficulty === 'Very Hard' ? 'badge-error' :
                        challenge.difficulty === 'Extreme' ? 'badge-secondary' :
                        'badge-neutral'
                      }`}>
                      {challenge.difficulty}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tournament FAQs */}
      {tournament.faqs && tournament.faqs.length > 0 && (
        <div className="card rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-primary mb-4">
            Tournament FAQ
          </h2>
          
          <div className="space-y-4">
            {tournament.faqs.map((faq) => (
              <div key={faq.id} className="border-b border-default pb-4 last:border-b-0 last:pb-0">
                <h3 className="text-base font-medium text-primary mb-2">
                  {faq.question}
                </h3>
                <div className="prose dark:prose-invert max-w-none prose-sm">
                  <RichTextRenderer blocks={faq.answer} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tournament Metadata */}
      <div className="bg-background-secondary rounded-lg p-4 border border-default">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
          <div>
            <span className="font-medium text-secondary">Tournament ID:</span>
            <p className="text-tertiary">{tournament.documentId || tournament.id}</p>
          </div>
          <div>
            <span className="font-medium text-secondary">Created:</span>
            <p className="text-tertiary">{formatDate(tournament.createdAt)}</p>
          </div>
          <div>
            <span className="font-medium text-secondary">Last Updated:</span>
            <p className="text-tertiary">{formatDate(tournament.updatedAt)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
