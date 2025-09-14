import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { PageLayout } from '../../components/layout';
import { PageHero, LoadingSpinner, ErrorDisplay, SubmissionForm } from '../../components/ui';
import { apiClient } from '../../services/api';
import type { ChallengeResponse } from '../../types/api';
import challengesHeroImage from '../../assets/challanges_hero.png';

export const SubmissionPage = () => {
  const { challengeId } = useParams<{ challengeId?: string }>();
  
  // If challengeId is provided, fetch that specific challenge
  const { data: challenge, isLoading: challengeLoading, error: challengeError } = useQuery({
    queryKey: ['challenge', challengeId],
    queryFn: () => challengeId ? apiClient.get<{ data: ChallengeResponse }>(`/challenges/${challengeId}?populate=*`) : null,
    enabled: !!challengeId
  });
  
  // Fetch all challenges for the dropdown (if no challengeId is provided)
  const { data: challenges, isLoading: challengesLoading, error: challengesError } = useQuery({
    queryKey: ['challenges'],
    queryFn: () => apiClient.get<{ data: ChallengeResponse[] }>('/challenges?fields=id,name&pagination[limit]=100'),
    enabled: !challengeId // Only fetch all challenges if no specific challengeId is provided
  });
  
  const isLoading = challengeId ? challengeLoading : challengesLoading;
  const error = challengeId ? challengeError : challengesError;
  const title = challengeId && challenge?.data 
    ? `Submit Run for ${challenge.data.name}` 
    : 'Submit a Run';
  
  const heroDescription = challengeId && challenge?.data
    ? `Submit your completion for the "${challenge.data.name}" challenge. Please provide accurate information about your run.`
    : 'Submit your challenge completion. Select a challenge and provide details about your run.';
  
  return (
    <PageLayout>
      <PageHero 
        title={title}
        description={heroDescription}
        backgroundImage={challengesHeroImage}
        contactMessage="Questions about submissions?"
        contactSubtext="If you have any questions or issues with the submission process, please contact us."
        buttonText="Get Help"
      />
      
      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : error ? (
          <ErrorDisplay message="Failed to load challenge data. Please try again later." />
        ) : (
          <SubmissionForm 
            challenges={challengeId && challenge?.data ? [challenge.data] : challenges?.data || []}
            preselectedChallengeId={challengeId ? parseInt(challengeId, 10) : undefined}
          />
        )}
      </div>
    </PageLayout>
  );
};