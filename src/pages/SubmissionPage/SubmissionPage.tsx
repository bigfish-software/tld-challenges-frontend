import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { PageLayout } from '../../components/layout';
import { PageHero, LoadingSpinner, SubmissionForm, Breadcrumb } from '../../components/ui';
import { apiClient } from '../../services/api';
import type { ChallengeResponse } from '../../types/api';
import submissionHeroImage from '../../assets/submission_hero.png';

export const SubmissionPage = () => {
  const { challengeId } = useParams<{ challengeId?: string }>();
  
  // Always fetch all challenges - simpler and more flexible
  const { data: challenges, isLoading } = useQuery({
    queryKey: ['challenges'],
    queryFn: () => apiClient.get<{ data: ChallengeResponse[] }>('/challenges?fields=id,name,slug&pagination[limit]=100')
  });
  
  // Get challenge name for title if available - more robust challenge ID matching
  const preselectedChallenge = (() => {
    if (!challengeId || !challenges?.data) {
      return undefined;
    }
    
    // Try exact string match first
    let challenge = challenges.data.find(c => c.id.toString() === challengeId.toString());
    if (challenge) {
      return challenge;
    }
    
    // Try to parse as number and match
    const idAsNumber = parseInt(challengeId, 10);
    if (!isNaN(idAsNumber)) {
      challenge = challenges.data.find(c => c.id === idAsNumber);
      if (challenge) {
        return challenge;
      }
    }
    
    return undefined;
  })();
    
  const title = 'Submit a Run';
  
  const heroDescription = 'Submit your challenge completion and climb the leaderboards';
  
  return (
    <PageLayout>
      <PageHero 
        title={title}
        description={heroDescription}
        backgroundImage={submissionHeroImage}
      />
      
      {/* Breadcrumb */}
      <Breadcrumb
        items={
          preselectedChallenge
            ? [
                { label: 'Home', href: '/' },
                { label: 'Challenges', href: '/challenges' },
                { label: preselectedChallenge.name || 'Challenge', href: `/challenges/${preselectedChallenge.slug}` },
                { label: 'Submit a Run', current: true }
              ]
            : [
                { label: 'Home', href: '/' },
                { label: 'Submit a Run', current: true }
              ]
        }
      />
      
      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <SubmissionForm 
            challenges={challenges?.data || []}
            preselectedChallengeId={preselectedChallenge?.id}
          />
        )}
      </div>
    </PageLayout>
  );
};