import { useParams, Navigate } from 'react-router-dom';
import { useTournament } from '@/hooks/api';
import { PageLayout } from '@/components/layout';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorDisplay } from '@/components/ui/ErrorDisplay';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { TournamentDetail } from './TournamentDetail';

export const TournamentDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const { data: tournament, isLoading, error } = useTournament(slug || '');
  
  // Redirect if no slug provided
  if (!slug) {
    return <Navigate to="/tournaments" replace />;
  }

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
      <Breadcrumb 
        items={[
          { label: 'Home', href: '/' },
          { label: 'Tournaments', href: '/tournaments' },
          { label: tournament.data.name, current: true }
        ]}
      />

      {/* Tournament Detail Content */}
      <TournamentDetail tournament={tournament.data} />
    </PageLayout>
  );
};
