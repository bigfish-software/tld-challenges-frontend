import React, { useState } from 'react';
import { PageHero, FilterPanel, ContentGrid, ChallengeCard } from '@/components/ui';
import { PageLayout } from '@/components/layout';
import type { Challenge } from '@/types/api';

// Mock data for Challenges (Complete API format)
const mockChallenges: Challenge[] = [
  {
    id: 1,
    attributes: {
      name: 'The 30-Day Nomad Challenge',
      slug: 'thirty-day-nomad-challenge',
      description: 'Survive 30 days without establishing a permanent base. Move every 3 days and visit all major regions to test your adaptability.',
      difficulty: 'Stalker',
      created_date: '2024-01-10T08:00:00Z',
      creators: {
        data: [
          {
            id: 1,
            attributes: {
              name: 'WildernessGuide',
              slug: 'wildernessguide',
              twitch: 'https://twitch.tv/wildernessguide'
            },
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-01T00:00:00Z',
            publishedAt: '2024-01-01T00:00:00Z'
          }
        ]
      },
      rules: {
        data: [
          {
            id: 1,
            attributes: {
              description: 'No sleeping in the same location for more than 3 consecutive days'
            },
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-01T00:00:00Z',
            publishedAt: '2024-01-01T00:00:00Z'
          },
          {
            id: 2,
            attributes: {
              description: 'Must visit at least 5 different regions'
            },
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-01T00:00:00Z',
            publishedAt: '2024-01-01T00:00:00Z'
          },
          {
            id: 3,
            attributes: {
              description: 'Cannot store items in containers for more than 7 days'
            },
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-01T00:00:00Z',
            publishedAt: '2024-01-01T00:00:00Z'
          }
        ]
      }
    },
    createdAt: '2024-01-10T08:00:00Z',
    updatedAt: '2024-01-10T08:00:00Z',
    publishedAt: '2024-01-10T08:00:00Z'
  },
  {
    id: 2,
    attributes: {
      name: 'Mystery Lake Speedrun',
      slug: 'mystery-lake-speedrun',
      description: 'Complete specific objectives in Mystery Lake as fast as possible. Perfect for competitive players looking for quick challenges.',
      difficulty: 'Voyager',
      created_date: '2024-01-08T14:30:00Z',
      creators: {
        data: [
          {
            id: 2,
            attributes: {
              name: 'SpeedRunner99',
              slug: 'speedrunner99',
              twitch: 'https://twitch.tv/speedrunner99'
            },
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-01T00:00:00Z',
            publishedAt: '2024-01-01T00:00:00Z'
          }
        ]
      },
      rules: {
        data: [
          {
            id: 4,
            attributes: {
              description: 'Locate and repair the radio tower'
            },
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-01T00:00:00Z',
            publishedAt: '2024-01-01T00:00:00Z'
          },
          {
            id: 5,
            attributes: {
              description: 'Collect 20 pieces of firewood'
            },
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-01T00:00:00Z',
            publishedAt: '2024-01-01T00:00:00Z'
          }
        ]
      }
    },
    createdAt: '2024-01-08T14:30:00Z',
    updatedAt: '2024-01-08T14:30:00Z',
    publishedAt: '2024-01-08T14:30:00Z'
  },
  {
    id: 3,
    attributes: {
      name: 'Bear Island Survival',
      slug: 'bear-island-survival',
      description: 'Survive on Great Bear Island for as long as possible with minimal starting gear. Only the strongest will endure.',
      difficulty: 'Interloper',
      created_date: '2024-01-05T16:45:00Z',
      creators: {
        data: [
          {
            id: 3,
            attributes: {
              name: 'SurvivalMaster',
              slug: 'survivalmaster',
              youtube: 'https://youtube.com/survivalmaster'
            },
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-01T00:00:00Z',
            publishedAt: '2024-01-01T00:00:00Z'
          }
        ]
      },
      rules: {
        data: [
          {
            id: 6,
            attributes: {
              description: 'Start with only basic clothing and a knife'
            },
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-01T00:00:00Z',
            publishedAt: '2024-01-01T00:00:00Z'
          },
          {
            id: 7,
            attributes: {
              description: 'No matches or accelerants allowed'
            },
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-01T00:00:00Z',
            publishedAt: '2024-01-01T00:00:00Z'
          }
        ]
      }
    },
    createdAt: '2024-01-05T16:45:00Z',
    updatedAt: '2024-01-05T16:45:00Z',
    publishedAt: '2024-01-05T16:45:00Z'
  },
  {
    id: 4,
    attributes: {
      name: 'Pilgrim Paradise',
      slug: 'pilgrim-paradise',
      description: 'A relaxed challenge perfect for beginners. Focus on exploration and learning the game mechanics without pressure.',
      difficulty: 'Pilgrim',
      created_date: '2024-01-03T10:15:00Z',
      creators: {
        data: [
          {
            id: 4,
            attributes: {
              name: 'NewPlayerGuide',
              slug: 'newplayerguide',
              youtube: 'https://youtube.com/newplayerguide'
            },
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-01T00:00:00Z',
            publishedAt: '2024-01-01T00:00:00Z'
          }
        ]
      },
      rules: {
        data: [
          {
            id: 8,
            attributes: {
              description: 'Explore all indoor locations in Mystery Lake'
            },
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-01T00:00:00Z',
            publishedAt: '2024-01-01T00:00:00Z'
          },
          {
            id: 9,
            attributes: {
              description: 'Craft at least 5 different items'
            },
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-01T00:00:00Z',
            publishedAt: '2024-01-01T00:00:00Z'
          }
        ]
      }
    },
    createdAt: '2024-01-03T10:15:00Z',
    updatedAt: '2024-01-03T10:15:00Z',
    publishedAt: '2024-01-03T10:15:00Z'
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

  // Filter and sort logic (updated for API format)
  const getFilteredAndSortedChallenges = () => {
    let filtered = [...mockChallenges];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(challenge => 
        challenge.attributes.name.toLowerCase().includes(query) ||
        (challenge.attributes.description && challenge.attributes.description.toLowerCase().includes(query)) ||
        challenge.attributes.creators?.data.some(creator => 
          creator.attributes.name.toLowerCase().includes(query)
        )
      );
    }

    // Apply difficulty filter
    if (activeFilters.difficulty?.length) {
      filtered = filtered.filter(challenge => 
        activeFilters.difficulty!.includes(challenge.attributes.difficulty.toLowerCase())
      );
    }

    // Apply creator filter
    if (activeFilters.creator?.length) {
      filtered = filtered.filter(challenge => {
        const creatorNames = challenge.attributes.creators?.data.map(creator => 
          creator.attributes.name.toLowerCase()
        ) || [];
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
          const dateA = a.attributes.created_date || a.createdAt;
          const dateB = b.attributes.created_date || b.createdAt;
          return new Date(dateB).getTime() - new Date(dateA).getTime();
        });
        break;
      case 'oldest':
        filtered.sort((a, b) => {
          const dateA = a.attributes.created_date || a.createdAt;
          const dateB = b.attributes.created_date || b.createdAt;
          return new Date(dateA).getTime() - new Date(dateB).getTime();
        });
        break;
      case 'difficulty':
        const difficultyOrder = ['Pilgrim', 'Voyager', 'Stalker', 'Interloper', 'Misery', 'Nogoa', 'Custom'];
        filtered.sort((a, b) => 
          difficultyOrder.indexOf(a.attributes.difficulty) - difficultyOrder.indexOf(b.attributes.difficulty)
        );
        break;
      case 'name':
        filtered.sort((a, b) => a.attributes.name.localeCompare(b.attributes.name));
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
          backgroundImage="/src/assets/screen_0dec6e6c-d9a2-4b1c-9479-7f305b7cfe19_hi.png"
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
                    <ChallengeCard key={challenge.id} challenge={challenge} />
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
