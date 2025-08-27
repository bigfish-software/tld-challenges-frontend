import { Button } from '@/components/ui/Button';

export const NotFoundPageContent = () => {
  return (
    <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-lg w-full text-center">
        {/* Image/Illustration placeholder */}
        <div className="relative mb-8">
          <div className="mx-auto h-48 w-48 bg-gradient-to-br from-primary-400 via-secondary-400 to-accent-400 rounded-full flex items-center justify-center shadow-xl">
            <div className="text-white text-6xl font-bold">404</div>
          </div>
          
          {/* Subtle gaming elements */}
          <div className="absolute -top-2 -right-2 h-8 w-8 bg-accent-400 rounded-full animate-pulse" />
          <div className="absolute -bottom-2 -left-2 h-6 w-6 bg-secondary-400 rounded-full animate-pulse delay-75" />
        </div>

        {/* Content */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-2">
              Lost in the Wilderness
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              The page you're looking for has vanished like tracks in a blizzard.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
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
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">
              Popular destinations:
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="#custom-codes" 
                  className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                >
                  → Custom Codes
                </a>
              </li>
              <li>
                <a 
                  href="#challenges" 
                  className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                >
                  → Challenges
                </a>
              </li>
              <li>
                <a 
                  href="#tournaments" 
                  className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                >
                  → Tournaments
                </a>
              </li>
              <li>
                <a 
                  href="#faq" 
                  className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                >
                  → FAQ
                </a>
              </li>
              <li>
                <a 
                  href="#submit" 
                  className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                >
                  → Submit Run
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
