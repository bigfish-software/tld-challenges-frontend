import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/Button';
import { TldLogoIcon } from '@/components/ui/icons';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Header = () => {
  const { toggleTheme, isDark } = useTheme();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleBrandClick = () => {};

  // Helper function to determine if a navigation link is active
  const isActiveLink = (path: string) => {
    return location.pathname === path;
  };

  // Helper function to get navigation link classes
  const getNavLinkClasses = (path: string) => {
    const baseClasses = "text-base nav-link transition-colors duration-200";
    return isActiveLink(path)
      ? `${baseClasses} text-secondary-color`
      : `${baseClasses} text-primary hover:text-secondary-color`;
  };

  return (
    <header className="sticky top-0 z-50 border-b border-default header-background shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              {/* Clickable brand name linking to homepage */}
              <Link 
                to="/" 
                className="brand-hover flex items-center space-x-2"
                aria-label="Go to TLD Challenges homepage"
                onClick={handleBrandClick}
              >
                {/* Brand Text */}
                <h1 className="brand-element text-xl font-bold font-headline uppercase text-primary-color transition-colors duration-200 cursor-pointer">
                  TLD CHALLENGES
                </h1>
                
                {/* Actual Logo from assets folder - using icon component */}
                <TldLogoIcon className="brand-element h-6 w-auto text-primary-color transition-colors duration-200" />
              </Link>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              to="/custom-codes"
              className={getNavLinkClasses("/custom-codes")}
            >
              Custom Codes
            </Link>
            <Link
              to="/challenges"
              className={getNavLinkClasses("/challenges")}
            >
              Challenges
            </Link>
            <Link
              to="/tournaments"
              className={getNavLinkClasses("/tournaments")}
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
              onClick={(e) => {
                toggleTheme();
                e.currentTarget.blur();
              }}
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
            <Link to="/submissions">
              <Button 
                variant="secondary" 
                size="sm" 
                shadow="lg"
                hoverEffect="both"
                className="hidden md:block"
              >
                Submit Run
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-default bg-background">
              <Link
                to="/custom-codes"
                className={`block px-3 py-2 ${getNavLinkClasses("/custom-codes")} hover:bg-surface-raised rounded-md`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Custom Codes
              </Link>
              <Link
                to="/challenges"
                className={`block px-3 py-2 ${getNavLinkClasses("/challenges")} hover:bg-surface-raised rounded-md`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Challenges
              </Link>
              <Link
                to="/tournaments"
                className={`block px-3 py-2 ${getNavLinkClasses("/tournaments")} hover:bg-surface-raised rounded-md`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Tournaments
              </Link>
              
              {/* Divider */}
              <div className="border-t border-default my-2"></div>
              
              {/* Submit Run Link - Mobile */}
              <Link
                to="/submissions"
                className="block px-3 py-2 text-base text-primary nav-link hover:bg-surface-raised rounded-md"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Submit Run
              </Link>
              
              {/* Theme Toggle - Mobile */}
              <button
                onClick={(e) => {
                  toggleTheme();
                  e.currentTarget.blur();
                }}
                className="flex items-center w-full px-3 py-2 text-base text-primary nav-link hover:bg-surface-raised rounded-md"
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
