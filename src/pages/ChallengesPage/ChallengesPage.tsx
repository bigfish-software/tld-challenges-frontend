import React, { useState } from 'react';
import { PageHero, FilterPanel, ResultsHeader } from '@/components/ui';
import { ContentGrid } from '@/components/layout';
import { PageLayout } from '@/components/layout';

// Simplified mock data structure for development
interface MockChallenge {
  id: number;
  name: string;
  slug: string;
  description: string;
  difficulty: string;
  created_date: string;
  creators: Array<{
    id: number;
    name: string;
    slug: string;
    twitch?: string;
    youtube?: string;
  }>;
  rules: Array<{
    id: number;
    description: string;
  }>;
}

// Mock data for Challenges (Simplified structure)
const mockChallenges: MockChallenge[] = [
  {
    id: 1,
    name: 'The 30-Day Nomad Challenge',
    slug: 'thirty-day-nomad-challenge',
    description: 'Survive 30 days without establishing a permanent base. Move every 3 days and visit all major regions to test your adaptability.',
    difficulty: 'Stalker',
    created_date: '2024-01-10T08:00:00Z',
    creators: [
      {
        id: 1,
        name: 'WildernessGuide',
        slug: 'wildernessguide',
        twitch: 'https://twitch.tv/wildernessguide'
      }
    ],
    rules: [
      {
        id: 1,
        description: 'No sleeping in the same location for more than 3 consecutive days'
      },
      {
        id: 2,
        description: 'Must visit at least 5 different regions'
      },
      {
        id: 3,
        description: 'Cannot store items in containers for more than 7 days'
      }
    ]
  },
  {
    id: 2,
    name: 'Mystery Lake Speedrun',
    slug: 'mystery-lake-speedrun',
    description: 'Complete specific objectives in Mystery Lake as fast as possible. Perfect for competitive players looking for quick challenges.',
    difficulty: 'Voyager',
    created_date: '2024-01-08T14:30:00Z',
    creators: [
      {
        id: 2,
        name: 'SpeedRunner99',
        slug: 'speedrunner99',
        twitch: 'https://twitch.tv/speedrunner99'
      }
    ],
    rules: [
      {
        id: 4,
        description: 'Locate and repair the radio tower'
      },
      {
        id: 5,
        description: 'Collect 20 pieces of firewood'
      }
    ]
  },
  {
    id: 3,
    name: 'Bear Island Survival',
    slug: 'bear-island-survival',
    description: 'Survive on Great Bear Island for as long as possible with minimal starting gear. Only the strongest will endure.',
    difficulty: 'Interloper',
    created_date: '2024-01-05T16:45:00Z',
    creators: [
      {
        id: 3,
        name: 'SurvivalMaster',
        slug: 'survivalmaster',
        youtube: 'https://youtube.com/survivalmaster'
      }
    ],
    rules: [
      {
        id: 6,
        description: 'Start with only basic clothing and a knife'
      },
      {
        id: 7,
        description: 'No matches or accelerants allowed'
      }
    ]
  },
  {
    id: 4,
    name: 'Pilgrim Paradise',
    slug: 'pilgrim-paradise',
    description: 'A relaxed challenge perfect for beginners. Focus on exploration and learning the game mechanics without pressure.',
    difficulty: 'Pilgrim',
    created_date: '2024-01-03T10:15:00Z',
    creators: [
      {
        id: 4,
        name: 'NewPlayerGuide',
        slug: 'newplayerguide',
        youtube: 'https://youtube.com/newplayerguide'
      }
    ],
    rules: [
      {
        id: 8,
        description: 'Explore all indoor locations in Mystery Lake'
      },
      {
        id: 9,
        description: 'Craft at least 5 different items'
      }
    ]
  }
];

const filterGroups = [
  {
    id: 'difficulty',
    label: 'Difficulty',
    options: [
      { id: 'pilgrim', label: 'Pilgrim', count: 1 },
      { id: 'voyager', label: 'Voyager', count: 1 },
      { id: 'stalker', label: 'Stalker', count: 1 },
      { id: 'interloper', label: 'Interloper', count: 1 }
    ]
  },
  {
    id: 'creator',
    label: 'Creator',
    options: [
      { id: 'wildguide', label: 'WildernessGuide', count: 1 },
      { id: 'speedrunner', label: 'SpeedRunner99', count: 1 },
      { id: 'survival', label: 'SurvivalMaster', count: 1 },
      { id: 'newplayer', label: 'NewPlayerGuide', count: 1 }
    ]
  }
];

const sortOptions = [
  { id: 'newest', label: 'Newest First' },
  { id: 'oldest', label: 'Oldest First' },
  { id: 'difficulty', label: 'Difficulty' },
  { id: 'name', label: 'Alphabetical' }
];

export const ChallengesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const [isLoading] = useState(false);

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

  // Filter and sort logic (updated for simplified mock format)
  const getFilteredAndSortedChallenges = () => {
    let filtered = [...mockChallenges];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(challenge => 
        challenge.name.toLowerCase().includes(query) ||
        challenge.description.toLowerCase().includes(query) ||
        challenge.creators.some(creator => 
          creator.name.toLowerCase().includes(query)
        )
      );
    }

    // Apply difficulty filter
    if (activeFilters.difficulty?.length) {
      filtered = filtered.filter(challenge => 
        activeFilters.difficulty!.includes(challenge.difficulty.toLowerCase())
      );
    }

    // Apply creator filter
    if (activeFilters.creator?.length) {
      filtered = filtered.filter(challenge => {
        const creatorNames = challenge.creators.map(creator => 
          creator.name.toLowerCase()
        );
        return activeFilters.creator!.some(filterId => {
          const creatorMap: Record<string, string> = {
            'wildguide': 'wildernessguide',
            'speedrunner': 'speedrunner99',
            'survival': 'survivalmaster',
            'newplayer': 'newplayerguide'
          };
          const creatorName = creatorMap[filterId];
          return creatorName && creatorNames.some(name => name.includes(creatorName));
        });
      });
    }

    // Apply sorting
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => {
          const dateA = a.created_date;
          const dateB = b.created_date;
          return new Date(dateB).getTime() - new Date(dateA).getTime();
        });
        break;
      case 'oldest':
        filtered.sort((a, b) => {
          const dateA = a.created_date;
          const dateB = b.created_date;
          return new Date(dateA).getTime() - new Date(dateB).getTime();
        });
        break;
      case 'difficulty':
        const difficultyOrder = ['Pilgrim', 'Voyager', 'Stalker', 'Interloper', 'Misery', 'Nogoa', 'Custom'];
        filtered.sort((a, b) => 
          difficultyOrder.indexOf(a.difficulty) - difficultyOrder.indexOf(b.difficulty)
        );
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return filtered;
  };

  const filteredChallenges = getFilteredAndSortedChallenges();

  return (
    <PageLayout>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        {/* Hero Section */}
        <PageHero
          title="Survival Challenges"
          description="Test your skills with community-created challenges ranging from beginner-friendly to extreme difficulty"
          backgroundImage="/src/assets/homepage_hero.png"
          contactMessage="Create Your Challenge!"
          contactSubtext="Share your unique survival scenarios"
        />

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="w-full lg:w-80 flex-shrink-0">
              <div className="sticky top-24">
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
                totalCount={mockChallenges.length}
                {...(getActiveFilterCount() > 0 && { filteredCount: filteredChallenges.length })}
                isLoading={isLoading}
                searchValue={searchQuery}
                onSearchChange={setSearchQuery}
                currentSort={sortBy}
                onSortChange={setSortBy}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                showViewToggle={true}
                sortOptions={sortOptions}
              />

              {/* Content Grid */}
              <div className="mt-6">
                <ContentGrid
                  viewMode={viewMode}
                  isLoading={isLoading}
                  isEmpty={filteredChallenges.length === 0}
                  emptyStateComponent={
                    <div className="text-center py-16">
                      <div className="mx-auto h-24 w-24 text-primary-400 dark:text-primary-600 mb-6">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="h-full w-full">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
                        No challenges found
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-6">
                        Try adjusting your search query or filters to find the perfect challenge for your skill level.
                      </p>
                      <button 
                        onClick={clearAllFilters}
                        className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                      >
                        Clear Filters
                      </button>
                    </div>
                  }
                >
                  {filteredChallenges.map(challenge => (
                    <div key={challenge.id} className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 border border-slate-200 dark:border-slate-700">
                      {/* Challenge Header */}
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                          {challenge.name}
                        </h3>
                        <span className={`
                          px-2 py-1 rounded-full text-xs font-medium
                          ${challenge.difficulty === 'Pilgrim' 
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                            : challenge.difficulty === 'Voyager'
                            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                            : challenge.difficulty === 'Stalker'
                            ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
                            : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                          }
                        `}>
                          {challenge.difficulty}
                        </span>
                      </div>
                      
                      {/* Description */}
                      <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 line-clamp-3">
                        {challenge.description}
                      </p>
                      
                      {/* Metadata */}
                      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                        <div className="flex items-center space-x-4">
                          <span>
                            Created: {new Date(challenge.created_date).toLocaleDateString()}
                          </span>
                          {challenge.creators.length > 0 && (
                            <span>
                              By: {challenge.creators.map(c => c.name).join(', ')}
                            </span>
                          )}
                        </div>
                        <span>
                          {challenge.rules.length} rules
                        </span>
                      </div>
                    </div>
                  ))}
                </ContentGrid>
              </div>
            </main>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
