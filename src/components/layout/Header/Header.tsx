import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {
  const { toggleTheme, isDark } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:supports-[backdrop-filter]:bg-slate-900/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              {/* Clickable brand name linking to homepage */}
              <Link 
                to="/" 
                className="group flex items-center space-x-2"
                aria-label="Go to TLD Challenges homepage"
              >
                {/* Brand Text */}
                <h1 className="text-xl font-bold font-headline uppercase text-primary-700 dark:text-primary-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200 cursor-pointer">
                  TLD CHALLENGES
                </h1>
                
                {/* Actual Logo from assets folder - inline SVG for color control */}
                <svg 
                  className="h-6 w-auto text-primary-700 dark:text-primary-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200"
                  viewBox="0 0 15.65 25.9"
                  fill="currentColor"
                  aria-label="TLD Challenges Logo"
                >
                  <path d="M15.47,0L6.96,.47l-.47,.22-.53-.17L.07,.81l-.07,.11L.16,3.48l.05,1.49,.05,1.06s2.51,0,2.78,0c-.23,.15-1.23,.74-1.28,.78,.15,3.96,.72,8.45,.86,9.51h-.01v9.58h.35c.24,0,.5,0,.5,0,0,0,.86-2.8,.91-3.05,.07-.75,.22-3.58,.22-3.58,0,0,.43,2.28,.47,2.51,.08,.08,1.42,1.15,1.42,1.13,.03-.62,.07-1.43,.07-1.43l.02-3.11v-1.27l.04-2.52-.2-.65,.21-.53,.08-2.77s.03-4.27,.02-4.79c0,0,2.73,.14,7.65,2.96,1.93-3.6,1.09-8.8,1.09-8.8"/>
                  <polygon points="9.33 22.61 9.69 22.61 9.69 23.88 9.95 23.88 9.95 22.61 10.3 22.61 10.3 22.38 9.33 22.38 9.33 22.61"/>
                  <polygon points="11.15 23.29 11.15 23.29 10.72 22.38 10.48 22.38 10.48 23.89 10.71 23.89 10.71 22.89 10.72 22.89 11.09 23.63 11.21 23.63 11.58 22.89 11.59 22.89 11.59 23.89 11.82 23.89 11.82 22.38 11.58 22.38 11.15 23.29"/>
                </svg>
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/custom-codes"
              className="text-base text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              Custom Codes
            </Link>
            <Link
              to="/challenges"
              className="text-base text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              Challenges
            </Link>
            <Link
              to="/tournaments"
              className="text-base text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              Tournaments
            </Link>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-2">
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
              className="md:hidden p-2"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </Button>

            {/* Theme toggle - Desktop only */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
              className="hidden md:block p-2"
            >
              {isDark ? (
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </Button>

            {/* Submit Run CTA - Desktop only */}
            <Button 
              variant="secondary" 
              size="sm" 
              shadow="lg"
              hoverEffect="both"
              className="hidden md:block"
            >
              Submit Run
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
              <Link
                to="/custom-codes"
                className="block px-3 py-2 text-base text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Custom Codes
              </Link>
              <Link
                to="/challenges"
                className="block px-3 py-2 text-base text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Challenges
              </Link>
              <Link
                to="/tournaments"
                className="block px-3 py-2 text-base text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Tournaments
              </Link>
              
              {/* Divider */}
              <div className="border-t border-slate-200 dark:border-slate-700 my-2"></div>
              
              {/* Submit Run Link - Mobile */}
              <a
                href="#submit"
                className="block px-3 py-2 text-base text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Submit Run
              </a>
              
              {/* Theme Toggle - Mobile */}
              <button
                onClick={toggleTheme}
                className="flex items-center w-full px-3 py-2 text-base text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md transition-colors"
              >
                {isDark ? (
                  <>
                    <svg
                      className="h-4 w-4 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                    Switch to Light Theme
                  </>
                ) : (
                  <>
                    <svg
                      className="h-4 w-4 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                      />
                    </svg>
                    Switch to Dark Theme
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
