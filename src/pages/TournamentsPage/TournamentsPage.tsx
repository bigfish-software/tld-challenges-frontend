import React, { useState } from 'react';
import { PageHero, FilterPanel, ResultsHeader } from '@/components/ui';
import { ContentGrid } from '@/components/layout';
import { PageLayout } from '@/components/layout';

// Simplified mock data structure for development
interface MockTournament {
  id: number;
  name: string;
  slug: string;
  description: string;
  start_date: string;
  end_date: string;
  state: 'planned' | 'active' | 'completed' | 'cancelled';
  created_date: string;
  creators: Array<{
    id: number;
    name: string;
    slug: string;
    twitch?: string;
    youtube?: string;
  }>;
}

// Mock data for Tournaments (Simplified structure)
const mockTournaments: MockTournament[] = [
  {
    id: 1,
    name: 'Winter Survival Championship',
    slug: 'winter-survival-championship',
    description: 'The ultimate test of survival skills in the harshest winter conditions. Compete against the best players for substantial prizes.',
    start_date: '2024-02-20T18:00:00Z',
    end_date: '2024-02-25T23:59:59Z',
    state: 'planned',
    created_date: '2024-01-15T10:00:00Z',
    creators: [
      {
        id: 1,
        name: 'TLD Esports',
        slug: 'tld-esports',
        twitch: 'https://twitch.tv/tldesports'
      }
    ]
  },
  {
    id: 2,
    name: 'Speed Building Competition',
    slug: 'speed-building-competition',
    description: 'Fast-paced challenges focusing on quick shelter construction and resource gathering under time pressure.',
    start_date: '2024-02-10T16:00:00Z',
    end_date: '2024-02-12T20:00:00Z',
    state: 'active',
    created_date: '2024-01-12T14:30:00Z',
    creators: [
      {
        id: 2,
        name: 'BuildMaster',
        slug: 'buildmaster',
        youtube: 'https://youtube.com/buildmaster'
      }
    ]
  },
  {
    id: 3,
    name: 'Beginner\'s Fortune',
    slug: 'beginners-fortune',
    description: 'A beginner-friendly tournament designed to welcome new players to competitive survival gaming.',
    start_date: '2024-01-25T19:00:00Z',
    end_date: '2024-01-28T22:00:00Z',
    state: 'completed',
    created_date: '2024-01-05T09:15:00Z',
    creators: [
      {
        id: 3,
        name: 'NewPlayerGuide',
        slug: 'newplayerguide',
        youtube: 'https://youtube.com/newplayerguide'
      }
    ]
  },
  {
    id: 4,
    name: 'Elite Survivor Challenge',
    slug: 'elite-survivor-challenge',
    description: 'The most challenging tournament for elite players. Only the most skilled survivors will make it through.',
    start_date: '2024-03-01T20:00:00Z',
    end_date: '2024-03-07T23:59:59Z',
    state: 'planned',
    created_date: '2024-01-12T11:45:00Z',
    creators: [
      {
        id: 4,
        name: 'EliteSurvivor',
        slug: 'elitesurvivor',
        twitch: 'https://twitch.tv/elitesurvivor'
      }
    ]
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
    label: 'Creator',
    options: [
      { id: 'tldesports', label: 'TLD Esports', count: 1 },
      { id: 'buildmaster', label: 'BuildMaster', count: 1 },
      { id: 'newplayer', label: 'NewPlayerGuide', count: 1 },
      { id: 'elite', label: 'EliteSurvivor', count: 1 }
    ]
  }
];

const sortOptions = [
  { id: 'newest', label: 'Newest First' },
  { id: 'oldest', label: 'Oldest First' },
  { id: 'startdate', label: 'Start Date' },
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

  // Filter and sort logic (updated for simplified mock format)
  const getFilteredAndSortedTournaments = () => {
    let filtered = [...mockTournaments];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(tournament => 
        tournament.name.toLowerCase().includes(query) ||
        tournament.description.toLowerCase().includes(query) ||
        tournament.creators.some(creator => 
          creator.name.toLowerCase().includes(query)
        )
      );
    }

    // Apply status filter
    if (activeFilters.status?.length) {
      filtered = filtered.filter(tournament => 
        activeFilters.status!.includes(tournament.state)
      );
    }

    // Apply creator filter
    if (activeFilters.creator?.length) {
      filtered = filtered.filter(tournament => {
        const creatorNames = tournament.creators.map(creator => 
          creator.name.toLowerCase()
        );
        return activeFilters.creator!.some(filterId => {
          const creatorMap: Record<string, string> = {
            'tldesports': 'tld esports',
            'buildmaster': 'buildmaster',
            'newplayer': 'newplayerguide',
            'elite': 'elitesurvivor'
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
      case 'startdate':
        filtered.sort((a, b) => 
          new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
        );
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return filtered;
  };

  const filteredTournaments = getFilteredAndSortedTournaments();

  const getStatusColor = (state: string) => {
    switch (state) {
      case 'active':
        return 'badge-success';
      case 'planned':
        return 'badge-info';
      case 'completed':
        return 'badge-neutral';
      case 'cancelled':
        return 'badge-error';
      default:
        return 'badge-neutral';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <PageLayout>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <PageHero
          title="Tournaments"
          description="Join competitive events and tournaments created by the community. Test your skills and compete for prizes."
          backgroundImage="/src/assets/homepage_hero.png"
          contactMessage="Host Your Tournament!"
          contactSubtext="Organize competitive events for the community"
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
                      <div className="mx-auto h-24 w-24 text-secondary mb-6">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="h-full w-full">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium text-primary mb-2">
                        No tournaments found
                      </h3>
                      <p className="text-secondary max-w-md mx-auto mb-6">
                        Try adjusting your search query or filters to find tournaments that match your interests.
                      </p>
                      <button 
                        onClick={clearAllFilters}
                        className="btn-primary px-4 py-2 rounded-md"
                      >
                        Clear Filters
                      </button>
                    </div>
                  }
                >
                  {filteredTournaments.map(tournament => (
                    <div key={tournament.id} className="card-surface rounded-lg shadow-md p-6 border-default">
                      {/* Tournament Header */}
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-lg font-semibold text-primary">
                          {tournament.name}
                        </h3>
                        <span className={`
                          px-2 py-1 rounded-full text-xs font-medium
                          ${getStatusColor(tournament.state)}
                        `}>
                          {tournament.state.charAt(0).toUpperCase() + tournament.state.slice(1)}
                        </span>
                      </div>
                      
                      {/* Description */}
                      <p className="text-secondary text-sm mb-4 line-clamp-3">
                        {tournament.description}
                      </p>
                      
                      {/* Dates */}
                      <div className="flex items-center justify-between text-xs text-secondary mb-4">
                        <div className="flex items-center space-x-4">
                          <span>
                            Start: {formatDate(tournament.start_date)}
                          </span>
                          <span>
                            End: {formatDate(tournament.end_date)}
                          </span>
                        </div>
                      </div>
                      
                      {/* Metadata */}
                      <div className="flex items-center justify-between text-xs text-secondary">
                        <div className="flex items-center space-x-4">
                          <span>
                            Created: {formatDate(tournament.created_date)}
                          </span>
                          {tournament.creators.length > 0 && (
                            <span>
                              By: {tournament.creators.map(c => c.name).join(', ')}
                            </span>
                          )}
                        </div>
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
