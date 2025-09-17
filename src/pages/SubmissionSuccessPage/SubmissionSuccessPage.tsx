import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { PageLayout } from '../../components/layout';
import { Button } from '../../components/ui';

export const SubmissionSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { challengeSlug, challengeName } = location.state || {};

  useEffect(() => {
    if (!location.state) {
      navigate('/challenges', { replace: true });
    }
  }, [location.state, navigate]);

  const handleBackToChallenge = () => {
    if (challengeSlug) {
      navigate(`/challenges/${challengeSlug}`);
    } else {
      navigate('/challenges');
    }
  };

  const handleViewAllChallenges = () => {
    navigate('/challenges');
  };

  return (
    <PageLayout>
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <div className="bg-surface rounded-xl shadow-lg p-8 mb-8">
          <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-6">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-10 w-10 text-light-primary" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-primary mb-4">
            Submission Received!
          </h1>
          
          <p className="text-lg text-secondary mb-6">
            Thank you for your submission{challengeName ? ` for ${challengeName}` : ''}!
            Our editors will review your run shortly.
          </p>
          
          <div className="bg-surface border border-border rounded-lg p-4 mb-8 flex items-start">
            <svg 
              className="h-5 w-5 text-secondary-color mr-2 flex-shrink-0 mt-0.5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
            <p className="text-sm text-secondary">
              <strong>What happens next?</strong> Your submission will be reviewed by our editors. 
              This process is manual and may take some time. Once approved, your run will appear 
              on the challenge leaderboard.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {challengeSlug && (
              <Button 
                variant="primary" 
                onClick={handleBackToChallenge}
                className="flex-1"
              >
                Back to Challenge
              </Button>
            )}
            <Button 
              variant="secondary" 
              onClick={handleViewAllChallenges}
              className="flex-1"
            >
              View All Challenges
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};