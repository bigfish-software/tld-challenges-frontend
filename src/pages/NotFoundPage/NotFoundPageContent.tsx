import { Button } from '@/components/ui/Button';
import { Link } from 'react-router-dom';

export const NotFoundPageContent = () => {
  return (
    <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-lg w-full text-center">
        {/* Image/Illustration placeholder */}
        <div className="relative mb-8">
          <div className="mx-auto h-48 w-48 bg-gradient-brand rounded-full flex items-center justify-center shadow-xl">
            <div className="text-primary-dark text-6xl font-bold">404</div>
          </div>
          
          {/* Subtle gaming elements */}
          <div className="absolute -top-2 -right-2 h-8 w-8 bg-accent rounded-full animate-pulse" />
          <div className="absolute -bottom-2 -left-2 h-6 w-6 bg-secondary rounded-full animate-pulse delay-75" />
        </div>

        {/* Content */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-primary mb-2">
              Lost in the Wilderness
            </h1>
            <p className="text-lg text-secondary">
              The page you're looking for has vanished like tracks in a blizzard.
            </p>
          </div>

          <div className="bg-surface rounded-lg p-6 border border-default">
            <p className="text-sm text-secondary mb-4">
              Don't worry, survivor. Even the most experienced Long Dark players get lost sometimes.
              Let's get you back to safety.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button 
                variant="primary" 
                onClick={() => window.history.back()}
                className="flex items-center justify-center"
              >
                <svg 
                  className="mr-2 h-4 w-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M10 19l-7-7m0 0l7-7m-7 7h18" 
                  />
                </svg>
                Go Back
              </Button>
              
              <Button 
                variant="outline" 
                onClick={() => window.location.href = '/'}
              >
                Return to Base Camp
              </Button>
            </div>
          </div>

          {/* Helpful links */}
          <div className="text-left">
            <h3 className="text-sm font-semibold text-primary mb-3">
              Popular destinations:
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link 
                  to="/custom-codes" 
                  className="text-secondary nav-link"
                >
                  → Custom Codes
                </Link>
              </li>
              <li>
                <Link 
                  to="/challenges" 
                  className="text-secondary nav-link"
                >
                  → Challenges
                </Link>
              </li>
              <li>
                <Link 
                  to="/tournaments" 
                  className="text-secondary nav-link"
                >
                  → Tournaments
                </Link>
              </li>
              <li>
                <Link 
                  to="/#faq" 
                  className="text-secondary nav-link"
                >
                  → FAQ
                </Link>
              </li>
              <li>
                <Link 
                  to="/#submit" 
                  className="text-secondary nav-link"
                >
                  → Submit Run
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
