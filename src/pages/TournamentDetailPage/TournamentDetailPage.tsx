import { useParams, Navigate } from 'react-router-dom';
import { useTournament } from '@/hooks/api';
import { PageLayout } from '@/components/layout';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorDisplay } from '@/components/ui/ErrorDisplay';
import { TournamentDetail } from './TournamentDetail';

export const TournamentDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  
  // Redirect if no slug provided
  if (!slug) {
    return <Navigate to="/tournaments" replace />;
  }

  const { data: tournament, isLoading, error } = useTournament(slug);

  if (isLoading) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-16 flex justify-center">
          <LoadingSpinner size="lg" />
        </div>
      </PageLayout>
    );
  }

  if (error || !tournament) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-8">
          <ErrorDisplay 
            title="Tournament Not Found"
            message="The tournament you're looking for doesn't exist or has been removed."
            showRetry={false}
          />
          <div className="text-center mt-6">
            <a 
              href="/tournaments"
              className="btn-primary px-6 py-3 rounded-md"
            >
              Browse All Tournaments
            </a>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      {/* Breadcrumb Navigation */}
      <div className="bg-surface border-b border-default">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex space-x-2 text-sm">
            <a 
              href="/tournaments" 
              className="text-primary-color nav-link"
            >
              Tournaments
            </a>
            <span className="text-tertiary">/</span>
            <span className="text-primary font-medium">
              {tournament.data.name}
            </span>
          </nav>
        </div>
      </div>

      {/* Tournament Detail Content */}
      <div className="container mx-auto px-4 py-8">
        <TournamentDetail tournament={tournament.data} />
      </div>
    </PageLayout>
  );
};
