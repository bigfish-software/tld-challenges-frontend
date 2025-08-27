export const Footer = () => {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand section */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-semibold text-primary-700 dark:text-primary-300 mb-3">
              TLD Challenges
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm max-w-md">
              A community platform for The Long Dark players to discover challenges, 
              participate in tournaments, and share their survival stories.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="#challenges" 
                  className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Browse Challenges
                </a>
              </li>
              <li>
                <a 
                  href="#tournaments" 
                  className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Active Tournaments
                </a>
              </li>
              <li>
                <a 
                  href="#submit" 
                  className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Submit Run
                </a>
              </li>
              <li>
                <a 
                  href="#leaderboard" 
                  className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Leaderboard
                </a>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-3">
              Community
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="#discord" 
                  className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Discord Server
                </a>
              </li>
              <li>
                <a 
                  href="#reddit" 
                  className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Reddit Community
                </a>
              </li>
              <li>
                <a 
                  href="#github" 
                  className="text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              © 2024 TLD Challenges. Built for The Long Dark community.
            </p>
            <div className="flex items-center space-x-4 mt-2 sm:mt-0">
              <a 
                href="#privacy" 
                className="text-xs text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                Privacy Policy
              </a>
              <a 
                href="#terms" 
                className="text-xs text-slate-500 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
