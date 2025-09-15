import { Link } from 'react-router-dom';
import { PageLayout } from '../../components/layout';
import { Button } from '../../components/ui';

export const IdeaSuccessPage = () => {
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
            Idea Submitted Successfully!
          </h1>
          
          <p className="text-lg text-secondary mb-6">
            Thank you for sharing your creative idea with the TLD Challenges community. Our team will review your submission and consider it for future implementation.
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
              <strong>What happens next?</strong> Our team will review your idea for feasibility and community appeal. Popular ideas may be featured in upcoming updates. We may reach out for additional details or clarification. Check back regularly for new challenges and features!
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/" className="flex-1">
              <Button 
                variant="primary" 
                className="w-full"
              >
                Return to Home
              </Button>
            </Link>
            <Link to="/idea/submit" className="flex-1">
              <Button 
                variant="secondary" 
                className="w-full"
              >
                Submit Another Idea
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};