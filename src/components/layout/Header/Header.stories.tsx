import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Header } from './Header';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/Button';

const meta = {
  title: 'Layout/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'responsive'
    },
    docs: {
      description: {
        component: `
The main header component for TLD Challenges with navigation, theme toggle, and gaming-optimized design.

## Key Features
- **Brand Logo**: TLD Challenges logo icon positioned next to the brand text
- **Clickable Brand**: "TLD Challenges" title links to homepage with hover effects
- **Navigation Menu**: Custom Codes, Challenges, Tournaments with proper hierarchy
- **Mobile Menu**: Hamburger menu with slide-down navigation for mobile devices
- **Theme Toggle**: Light/dark mode switching with gaming-optimized defaults
- **Submit Run Button**: Prominent call-to-action for challenge submissions
- **Responsive Design**: Adaptive layout for all device sizes with mobile navigation
- **Sticky Positioning**: Remains accessible during page scrolling

## Available Stories
- **Default**: Complete header with all navigation and functionality
- **Mobile**: Mobile viewport testing for responsive design
- **Mobile Menu Open**: Shows mobile navigation menu in expanded state
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story, context) => {
      const isDocsView = context.viewMode === 'docs';
      const storyName = context.name;
      
      // Always wrap with MemoryRouter and ThemeProvider for all stories
      if (storyName === 'Mobile' || storyName === 'Mobile Menu Open') {
        // These stories have their own custom rendering with providers
        return <Story />;
      }
      
      if (isDocsView) {
        // Compact decorator for docs view - with minimal sample content and proper spacing
        return (
          <MemoryRouter>
            <ThemeProvider>
              <div className="bg-white dark:bg-slate-900 pb-4">
                <Story />
                <div className="px-4 py-3">
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    Sample content to show how the header looks with page content below.
                    The "TLD Challenges" title is clickable and links to the homepage.
                  </p>
                </div>
              </div>
            </ThemeProvider>
          </MemoryRouter>
        );
      }
      
      // Full decorator for canvas view with full sample content
      return (
        <MemoryRouter>
          <ThemeProvider>
            <div className="min-h-screen bg-white dark:bg-slate-900">
              <Story />
              <div className="p-8">
                <p className="text-slate-600 dark:text-slate-400">
                  This is sample content to show how the header looks with page content below.
                  The header is sticky and will remain at the top when scrolling.
                  Click on "TLD Challenges" to test the homepage link.
                </p>
              </div>
            </div>
          </ThemeProvider>
        </MemoryRouter>
      );
    },
  ],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The default header component with clickable brand title. Use the theme switcher in the toolbar to test light and dark themes. Click "TLD Challenges" to test homepage navigation.',
      },
    },
  },
};

/**
 * Mobile viewport view to test responsive design and navigation behavior.
 * Critical for identifying layout issues on smaller screens.
 */
export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'Header component on mobile devices. Tests navigation menu, theme toggle, and responsive layout behavior on small screens. Click the hamburger menu icon to test mobile navigation.'
      },
      story: {
        inline: false,
        iframeHeight: 200
      }
    }
  },
  render: (_, context) => {
    // Simply check for dark background value from Storybook
    const background = context.globals?.backgrounds?.value;
    const isDark = background && (background.includes('#1f2937') || background.includes('#0f172a') || background === 'dark');
    
    return (
      <div style={{ maxWidth: '375px', margin: '0 auto', minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: isDark ? '#1f2937' : '#ffffff' }}>
        <style>{`
          /* Force mobile layout in Storybook docs */
          .mobile-demo nav[class*="hidden md:flex"] { display: none !important; }
          .mobile-demo button[class*="md:hidden"] { display: flex !important; }
          .mobile-demo button[class*="hidden md:block"] { display: none !important; }
          .mobile-demo .hidden.md\\:block { display: none !important; }
          .mobile-demo .md\\:hidden { display: flex !important; }
        `}</style>
        <MemoryRouter>
          <ThemeProvider>
            <div className={`mobile-demo flex-1 ${isDark ? 'dark' : ''}`}>
              <div className="bg-white dark:bg-slate-900">
                <Header />
                <div className="p-4">
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    Mobile header with hamburger menu. Tap menu to navigate.
                    The "TLD Challenges" title is clickable and links to the homepage.
                  </p>
                </div>
              </div>
            </div>
          </ThemeProvider>
        </MemoryRouter>
      </div>
    );
  }
};

/**
 * Shows the mobile menu in its opened state for testing and documentation.
 * Demonstrates how the navigation appears when expanded on mobile devices.
 */
export const MobileMenuOpen: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'Mobile header with navigation menu expanded. Shows how the hamburger menu reveals the main navigation links on mobile devices.'
      },
      story: {
        inline: false,
        iframeHeight: 450
      }
    }
  },
  render: (_, context) => {
    const [isMobileMenuOpen] = useState(true);
    
    // Simply check for dark background value from Storybook
    const background = context.globals?.backgrounds?.value;
    const isDark = background && (background.includes('#1f2937') || background.includes('#0f172a') || background === 'dark');

    return (
      <div style={{ maxWidth: '375px', margin: '0 auto', minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: isDark ? '#1f2937' : '#ffffff' }}>
        <style>{`
          /* Force mobile layout in Storybook docs */
          .mobile-demo-open nav[class*="hidden md:flex"] { display: none !important; }
          .mobile-demo-open button[class*="md:hidden"] { display: flex !important; }
          .mobile-demo-open button[class*="hidden md:block"] { display: none !important; }
          .mobile-demo-open .hidden.md\\:block { display: none !important; }
          .mobile-demo-open .md\\:hidden { display: flex !important; }
        `}</style>
        <MemoryRouter>
          <ThemeProvider>
            <div className={`mobile-demo-open flex-1 ${isDark ? 'dark' : ''}`}>
              <div className="bg-white dark:bg-slate-900">
                <header className="sticky top-0 z-50 border-b border-slate-200 dark:border-slate-700 bg-white/95 dark:bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 dark:supports-[backdrop-filter]:bg-slate-900/80">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex h-16 items-center justify-between">
                    {/* Logo/Brand */}
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <h1 className="text-xl font-bold text-primary-700 dark:text-primary-300">
                          TLD Challenges
                        </h1>
                      </div>
                    </div>

                  {/* Right side actions */}
                  <div className="flex items-center space-x-2">
                    {/* Mobile menu button - Show close icon since menu is open */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="md:hidden p-2"
                      aria-label="Toggle mobile menu"
                    >
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
                    </Button>
                  </div>
                </div>

                {/* Mobile Navigation Menu - Always shown for this story */}
                {isMobileMenuOpen && (
                  <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
                      <a
                        href="#custom-codes"
                        className="block px-3 py-2 text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md transition-colors"
                      >
                        Custom Codes
                      </a>
                      <a
                        href="#challenges"
                        className="block px-3 py-2 text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md transition-colors"
                      >
                        Challenges
                      </a>
                      <a
                        href="#tournaments"
                        className="block px-3 py-2 text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md transition-colors"
                      >
                        Tournaments
                      </a>
                      
                      {/* Divider */}
                      <div className="border-t border-slate-200 dark:border-slate-700 my-2"></div>
                      
                      {/* Submit Run Link - Mobile */}
                      <a
                        href="#submit"
                        className="block px-3 py-2 text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md transition-colors"
                      >
                        Submit Run
                      </a>
                      
                      {/* Theme Toggle - Mobile */}
                      <button
                        className="flex items-center w-full px-3 py-2 text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md transition-colors"
                      >
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
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </header>
                <div className="p-4">
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                    Navigation menu open. Includes all links plus theme toggle.
                  </p>
                </div>
              </div>
            </div>
          </ThemeProvider>
        </MemoryRouter>
      </div>
    );
  }
};
