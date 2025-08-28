import React, { useState } from 'react';
import { PageHero, FilterPanel, ContentGrid, TournamentCard } from '@/components/ui';
import { PageLayout } from '@/components/layout';
import type { Tournament } from '@/types/api';

// Mock data for Tournaments (Complete API format)
const mockTournaments: Tournament[] = [
  {
    id: 1,
    attributes: {
      name: 'Winter Survival Championship',
      slug: 'winter-survival-championship',
      description: 'The ultimate test of survival skills in the harshest winter conditions. Compete against the best players for substantial prizes.',
      start_date: '2024-02-20T18:00:00Z',
      end_date: '2024-02-25T23:59:59Z',
      state: 'planned',
      created_date: '2024-01-15T10:00:00Z',
      creators: {
        data: [
          {
            id: 1,
            attributes: {
              name: 'TLD Esports',
              slug: 'tld-esports',
              twitch: 'https://twitch.tv/tldesports'
            },
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-01T00:00:00Z',
            publishedAt: '2024-01-01T00:00:00Z'
          }
        ]
      }
    },
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    publishedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 2,
    attributes: {
      name: 'Speed Building Competition',
      slug: 'speed-building-competition',
      description: 'Fast-paced challenges focusing on quick shelter construction and resource gathering under time pressure.',
      start_date: '2024-02-10T16:00:00Z',
      end_date: '2024-02-12T20:00:00Z',
      state: 'active',
      created_date: '2024-01-12T14:30:00Z',
      creators: {
        data: [
          {
            id: 2,
            attributes: {
              name: 'BuildMaster',
              slug: 'buildmaster',
              youtube: 'https://youtube.com/buildmaster'
            },
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-01T00:00:00Z',
            publishedAt: '2024-01-01T00:00:00Z'
          }
        ]
      }
    },
    createdAt: '2024-01-12T14:30:00Z',
    updatedAt: '2024-01-12T14:30:00Z',
    publishedAt: '2024-01-12T14:30:00Z'
  },
  {
    id: 3,
    attributes: {
      name: 'Rookie Tournament',
      slug: 'rookie-tournament',
      description: 'A beginner-friendly tournament designed to welcome new players to competitive survival gaming.',
      start_date: '2024-02-05T15:00:00Z',
      end_date: '2024-02-07T18:00:00Z',
      state: 'completed',
      created_date: '2024-01-08T09:15:00Z',
      creators: {
        data: [
          {
            id: 3,
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
      }
    },
    createdAt: '2024-01-08T09:15:00Z',
    updatedAt: '2024-01-08T09:15:00Z',
    publishedAt: '2024-01-08T09:15:00Z'
  },
  {
    id: 4,
    attributes: {
      name: 'Extreme Survival Challenge',
      slug: 'extreme-survival-challenge',
      description: 'The most challenging tournament for elite players. Only the most skilled survivors will make it through.',
      start_date: '2024-03-01T20:00:00Z',
      end_date: '2024-03-05T23:59:59Z',
      state: 'planned',
      created_date: '2024-01-05T11:45:00Z',
      creators: {
        data: [
          {
            id: 4,
            attributes: {
              name: 'EliteSurvival',
              slug: 'elitesurvival',
              twitch: 'https://twitch.tv/elitesurvival'
            },
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-01-01T00:00:00Z',
            publishedAt: '2024-01-01T00:00:00Z'
          }
        ]
      }
    },
    createdAt: '2024-01-05T11:45:00Z',
    updatedAt: '2024-01-05T11:45:00Z',
    publishedAt: '2024-01-05T11:45:00Z'
  }
];

const filterGroups = [
  {
    id: 'status',
    label: 'Status',
    options: [
      { id: 'planned', label: 'Planned', count: 2 },
      { id: 'active', label: 'Active', count: 1 },
      { id: 'completed', label: 'Completed', count: 1 }
    ]
  },
  {
    id: 'creator',
    label: 'Organizer',
    options: [
      { id: 'esports', label: 'TLD Esports', count: 1 },
      { id: 'buildmaster', label: 'BuildMaster', count: 1 },
      { id: 'newplayer', label: 'NewPlayerGuide', count: 1 },
      { id: 'elite', label: 'EliteSurvival', count: 1 }
    ]
  }
];

const sortOptions = [
  { id: 'newest', label: 'Newest First' },
  { id: 'oldest', label: 'Oldest First' },
  { id: 'start-date', label: 'Start Date' },
  { id: 'name', label: 'Alphabetical' }
];

export const TournamentsPage: React.FC = () => {
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
  const getFilteredAndSortedTournaments = () => {
    let filtered = [...mockTournaments];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(tournament => 
        tournament.attributes.name.toLowerCase().includes(query) ||
        (tournament.attributes.description && tournament.attributes.description.toLowerCase().includes(query)) ||
        tournament.attributes.creators?.data.some(creator => 
          creator.attributes.name.toLowerCase().includes(query)
        )
      );
    }

    // Apply status filter
    if (activeFilters.status?.length) {
      filtered = filtered.filter(tournament => 
        activeFilters.status!.includes(tournament.attributes.state)
      );
    }

    // Apply creator filter
    if (activeFilters.creator?.length) {
      filtered = filtered.filter(tournament => {
        const creatorNames = tournament.attributes.creators?.data.map(creator => 
          creator.attributes.name.toLowerCase()
        ) || [];
        return activeFilters.creator!.some(filterId => {
          const creatorMap: Record<string, string> = {
            'esports': 'tld esports',
            'buildmaster': 'buildmaster',
            'newplayer': 'newplayerguide',
            'elite': 'elitesurvival'
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
      case 'start-date':
        filtered.sort((a, b) => 
          new Date(a.attributes.start_date).getTime() - new Date(b.attributes.start_date).getTime()
        );
        break;
      case 'name':
        filtered.sort((a, b) => a.attributes.name.localeCompare(b.attributes.name));
        break;
    }

    return filtered;
  };

  const filteredTournaments = getFilteredAndSortedTournaments();

  return (
    <PageLayout>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        {/* Hero Section */}
        <PageHero
          title="Survival Tournaments"
          description="Join competitive tournaments and prove your survival skills against players from around the world"
          backgroundImage="/src/assets/screen_0dec6e6c-d9a2-4b1c-9479-7f305b7cfe19_hi.png"
          contactMessage="Host Your Tournament!"
          contactSubtext="Organize epic survival competitions"
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
                totalCount={mockTournaments.length}
                {...(getActiveFilterCount() > 0 && { filteredCount: filteredTournaments.length })}
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
                  isEmpty={filteredTournaments.length === 0}
                  emptyStateComponent={
                    <div className="text-center py-16">
                      <div className="mx-auto h-24 w-24 text-primary-400 dark:text-primary-600 mb-6">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="h-full w-full">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
                        No tournaments found
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-6">
                        Try adjusting your search query or filters to find tournaments that match your interests.
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
                  {filteredTournaments.map(tournament => (
                    <TournamentCard key={tournament.id} tournament={tournament} />
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
