import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { PageHero, FilterPanel, ResultsHeader, ContentGrid, CustomCodeCard, ChallengeCard, TournamentCard } from './ui';

const meta: Meta = {
  title: 'Examples/Overview Page Layout',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
A complete overview page layout demonstrating how all the shared components work together:

## Components Used
- **PageHero**: Hero section with background image and contact CTA
- **FilterPanel**: Left sidebar with collapsible filter groups
- **ResultsHeader**: Search, sort, and view mode controls
- **ContentGrid**: Responsive grid/list layout for content
- **Card Components**: CustomCodeCard, ChallengeCard, TournamentCard

## Features Demonstrated
- Responsive layout with mobile-optimized sidebar
- Interactive filtering and search
- Grid/list view modes
- Loading and empty states
- Consistent gaming theme design
        `
      }
    }
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data
const sampleCustomCodes = [
  {
    id: 1,
    name: 'Survivor Paradise',
    description: 'Enhanced loot spawns with reduced wildlife aggression for a more relaxed survival experience.',
    code: 'AAABBBCCCDDDEEEFFFGGGHHHIIIJJJKKKLLLMMMNNNOOOPPPQQQRRRSSSTTTUUUVVVWWWXXXYYYZZZ',
    creator: { name: 'BigFishSoftware', url: 'https://twitch.tv/bigfishsoftware' },
    tags: ['Relaxed', 'Exploration', 'Beginner-Friendly'],
    downloads: 1247,
    difficulty: 'Easy' as const,
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 2,
    name: 'Blizzard Nightmare',
    description: 'Extreme weather conditions with brutal cold and limited visibility.',
    code: 'ZZZYYXXXWWWVVVUUUTTTSSSRRRNNNMMMLLLKKKYYYXXXWWWVVVUUUTTTSSSQQQPPPOOO',
    creator: { name: 'ChefMaria', url: 'https://twitch.tv/chefmaria' },
    tags: ['Hardcore', 'Weather', 'Extreme'],
    downloads: 892,
    difficulty: 'Extreme' as const,
    createdAt: '2024-01-12T14:45:00Z'
  }
];

const sampleChallenges = [
  {
    id: 1,
    title: 'The 30-Day Nomad Challenge',
    description: 'Survive 30 days without establishing a permanent base. Move every 3 days and visit all major regions.',
    rules: ['No sleeping in the same location for more than 3 consecutive days', 'Must visit at least 5 different regions'],
    creator: { name: 'WildernessGuide', url: 'https://twitch.tv/wildernessguide' },
    difficulty: 'Hard' as const,
    duration: '30 days',
    region: 'All Regions',
    tags: ['Nomadic', 'Exploration', 'Resource Management'],
    submissions: 47,
    participants: 156,
    status: 'Active' as const,
    createdAt: '2024-01-10T08:00:00Z',
    endDate: '2024-02-15T23:59:59Z'
  }
];

const sampleTournaments = [
  {
    id: 1,
    title: 'Winter Survival Championship',
    description: 'The ultimate test of survival skills in the harshest winter conditions.',
    organizer: { name: 'TLD Esports', url: 'https://twitch.tv/tldesports' },
    format: 'Single Elimination' as const,
    game_mode: 'Survival' as const,
    prizes: { first: '$500 + Gaming Setup', second: '$200 + Merchandise' },
    entry_fee: '$10',
    max_participants: 64,
    current_participants: 47,
    registration_deadline: '2024-02-15T23:59:59Z',
    start_date: '2024-02-20T18:00:00Z',
    status: 'Registration' as const,
    featured: true,
    tags: ['Championship', 'Prize Pool', 'Survival'],
    createdAt: '2024-01-15T10:00:00Z'
  }
];

const filterGroups = [
  {
    id: 'difficulty',
    label: 'Difficulty',
    options: [
      { id: 'easy', label: 'Easy', count: 45 },
      { id: 'medium', label: 'Medium', count: 78 },
      { id: 'hard', label: 'Hard', count: 34 },
      { id: 'extreme', label: 'Extreme', count: 12 }
    ]
  },
  {
    id: 'category',
    label: 'Category',
    options: [
      { id: 'survival', label: 'Survival', count: 156 },
      { id: 'exploration', label: 'Exploration', count: 89 },
      { id: 'combat', label: 'Combat', count: 23 },
      { id: 'crafting', label: 'Crafting', count: 67 }
    ]
  },
  {
    id: 'creator',
    label: 'Creator',
    options: [
      { id: 'bigfish', label: 'BigFishSoftware', count: 23 },
      { id: 'chefmaria', label: 'ChefMaria', count: 15 },
      { id: 'wildguide', label: 'WildernessGuide', count: 12 }
    ]
  }
];

const OverviewPageDemo = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const [currentTab, setCurrentTab] = useState<'codes' | 'challenges' | 'tournaments'>('codes');
  const [isLoading, setIsLoading] = useState(false);

  const handleFilterChange = (groupId: string, optionId: string, checked: boolean) => {
    setActiveFilters(prev => {
      const newFilters = { ...prev };
      if (!newFilters[groupId]) {
        newFilters[groupId] = [];
      }
      if (checked) {
        newFilters[groupId] = [...newFilters[groupId], optionId];
      } else {
        newFilters[groupId] = newFilters[groupId].filter(id => id !== optionId);
      }
      if (newFilters[groupId].length === 0) {
        delete newFilters[groupId];
      }
      return newFilters;
    });
  };

  const clearAllFilters = () => {
    setActiveFilters({});
  };

  const getActiveFilterCount = () => {
    return Object.values(activeFilters).reduce((count, filters) => count + filters.length, 0);
  };

  const getCurrentContent = () => {
    if (isLoading) return null;
    
    switch (currentTab) {
      case 'codes':
        return sampleCustomCodes.map(code => (
          <CustomCodeCard key={code.id} customCode={code} />
        ));
      case 'challenges':
        return sampleChallenges.map(challenge => (
          <ChallengeCard key={challenge.id} challenge={challenge} />
        ));
      case 'tournaments':
        return sampleTournaments.map(tournament => (
          <TournamentCard key={tournament.id} tournament={tournament} />
        ));
      default:
        return null;
    }
  };

  const getResultsCount = () => {
    switch (currentTab) {
      case 'codes': return sampleCustomCodes.length;
      case 'challenges': return sampleChallenges.length;
      case 'tournaments': return sampleTournaments.length;
      default: return 0;
    }
  };

  const getTabTitle = () => {
    switch (currentTab) {
      case 'codes': return 'Custom Codes';
      case 'challenges': return 'Challenges';
      case 'tournaments': return 'Tournaments';
      default: return 'Content';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero Section */}
      <PageHero
        title={`Browse ${getTabTitle()}`}
        description="Discover community-created content and join the adventure"
        backgroundImage="/src/assets/screen_0dec6e6c-d9a2-4b1c-9479-7f305b7cfe19_hi.png"
        contactMessage="Join our community!"
        contactSubtext="Connect with fellow survivors"
      />

      {/* Tab Navigation */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'codes', label: 'Custom Codes', count: sampleCustomCodes.length },
              { id: 'challenges', label: 'Challenges', count: sampleChallenges.length },
              { id: 'tournaments', label: 'Tournaments', count: sampleTournaments.length }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  currentTab === tab.id
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300'
                }`}
              >
                {tab.label}
                <span className="ml-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 py-0.5 px-2 rounded-full text-xs">
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-80 flex-shrink-0">
            <div className="sticky top-8">
              <FilterPanel
                groups={filterGroups}
                selectedFilters={activeFilters}
                onFilterChange={handleFilterChange}
                onClearAll={clearAllFilters}
              />
            </div>
          </aside>

          {/* Content Area */}
          <main className="flex-1 min-w-0">
            {/* Results Header */}
            <ResultsHeader
              totalCount={getResultsCount()}
              {...(getActiveFilterCount() > 0 && { filteredCount: getResultsCount() })}
              isLoading={isLoading}
              searchValue={searchQuery}
              onSearchChange={setSearchQuery}
              currentSort={sortBy}
              onSortChange={setSortBy}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              showViewToggle={true}
              sortOptions={[
                { id: 'newest', label: 'Newest First' },
                { id: 'oldest', label: 'Oldest First' },
                { id: 'popular', label: 'Most Popular' },
                { id: 'downloads', label: 'Most Downloads' }
              ]}
            />

            {/* Content Grid */}
            <div className="mt-6">
              <ContentGrid
                viewMode={viewMode}
                isLoading={isLoading}
                isEmpty={getResultsCount() === 0}
                emptyStateComponent={
                  <div className="text-center py-16">
                    <div className="mx-auto h-24 w-24 text-primary-400 dark:text-primary-600 mb-6">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="h-full w-full">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
                      No {getTabTitle().toLowerCase()} found
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-6">
                      Try adjusting your search query or filters to find what you&apos;re looking for.
                    </p>
                    <button 
                      onClick={clearAllFilters}
                      className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                    >
                      Clear Filters
                    </button>
                    <button 
                      onClick={() => {
                        setIsLoading(true);
                        setTimeout(() => setIsLoading(false), 1000);
                      }}
                      className="ml-2 px-4 py-2 bg-slate-600 text-white rounded-md hover:bg-slate-700 transition-colors"
                    >
                      Refresh
                    </button>
                  </div>
                }
              >
                {getCurrentContent()}
              </ContentGrid>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export const CompleteOverviewPage: Story = {
  render: () => <OverviewPageDemo />,
  parameters: {
    docs: {
      description: {
        story: 'A fully interactive demonstration of the complete overview page layout with all components working together. Switch between tabs, try filtering, search, and change view modes to see how the components respond.'
      }
    }
  }
};
