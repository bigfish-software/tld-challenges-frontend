import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { CustomCodesPage } from './CustomCodesPage';
import { ChallengesPage } from './ChallengesPage';
import { TournamentsPage } from './TournamentsPage';

const meta: Meta = {
  title: 'Pages/Overview Pages Collection',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
A comprehensive collection showcasing all three overview pages with coherent design patterns.

## Design Consistency
- **PageHero**: Each page uses the same hero component with contextual messaging
- **FilterPanel**: Consistent sidebar filtering with category-specific options
- **ResultsHeader**: Unified search, sort, and view controls across all pages
- **ContentGrid**: Responsive grid/list layouts with consistent spacing
- **Card Components**: Matching card designs with category-specific content

## Features Demonstrated
- Seamless navigation between content types
- Consistent interaction patterns
- Unified visual design language
- Responsive layouts across all pages
- Theme consistency (light/dark)

## Content Categories
- **Custom Codes**: Game configuration sharing
- **Challenges**: Community survival challenges
- **Tournaments**: Competitive gaming events
        `
      }
    }
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof meta>;

const OverviewPagesDemo = () => {
  const [currentPage, setCurrentPage] = useState<'codes' | 'challenges' | 'tournaments'>('codes');

  const pages = [
    { id: 'codes', label: 'Custom Codes', component: CustomCodesPage },
    { id: 'challenges', label: 'Challenges', component: ChallengesPage },
    { id: 'tournaments', label: 'Tournaments', component: TournamentsPage }
  ];

  const getCurrentComponent = () => {
    const page = pages.find(p => p.id === currentPage);
    if (!page) return null;
    const Component = page.component;
    return <Component />;
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Page Navigation */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                TLD Challenges - Overview Pages Demo
              </h1>
            </div>
            <nav className="flex space-x-1">
              {pages.map((page) => (
                <button
                  key={page.id}
                  onClick={() => setCurrentPage(page.id as any)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    currentPage === page.id
                      ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {page.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Current Page */}
      <div className="min-h-screen">
        {getCurrentComponent()}
      </div>
    </div>
  );
};

export const AllOverviewPages: Story = {
  render: () => <OverviewPagesDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo showing all three overview pages. Use the navigation buttons to switch between Custom Codes, Challenges, and Tournaments to see the consistent design patterns.'
      }
    }
  }
};

export const DesignComparison: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="text-center py-8 bg-slate-100 dark:bg-slate-800">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          Design Consistency Across Pages
        </h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          All three overview pages follow the same design patterns and component structure for a cohesive user experience.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 text-center">
            Custom Codes
          </h3>
          <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
            <div className="transform scale-50 origin-top-left" style={{ width: '200%', height: '200%' }}>
              <CustomCodesPage />
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 text-center">
            Challenges
          </h3>
          <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
            <div className="transform scale-50 origin-top-left" style={{ width: '200%', height: '200%' }}>
              <ChallengesPage />
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 text-center">
            Tournaments
          </h3>
          <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
            <div className="transform scale-50 origin-top-left" style={{ width: '200%', height: '200%' }}>
              <TournamentsPage />
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Side-by-side comparison of all three overview pages showing the consistent design language and component usage.'
      }
    }
  }
};
