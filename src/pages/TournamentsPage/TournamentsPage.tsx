import React, { useState } from 'react';
import { PageHero, FilterPanel, ErrorDisplay } from '@/components/ui';
import { ContentGrid } from '@/components/layout';
import { PageLayout } from '@/components/layout';
import { useTournaments } from '@/hooks/api';
import { Tournament, SimpleCreator } from '@/types/api';

export const TournamentsPage: React.FC = () => {
  const [viewMode] = useState<'grid' | 'list'>('grid');
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12; // 12 tournaments per page
  
  // API call for tournaments using React Query with pagination
  const { data: apiResponse, isLoading, error } = useTournaments(
    undefined, // no filters for now
    { page: currentPage, pageSize }
  );
  
  // Handle Strapi response structure: { data: [...], meta: { pagination: {...} } }
  const tournaments: Tournament[] = apiResponse?.data || [];
  const totalCount = apiResponse?.meta?.pagination?.total || 0;
  const totalPages = Math.ceil(totalCount / pageSize);

  // Dynamic filter groups based on available data
  const filterGroups = [
    {
      id: 'status',
      label: 'Status',
      options: Array.from(
        new Set(tournaments.map(tournament => tournament.state))
      ).map(state => ({
        id: state,
        label: state.charAt(0).toUpperCase() + state.slice(1),
        count: tournaments.filter(tournament => tournament.state === state).length
      }))
    },
    {
      id: 'creator',
      label: 'Creator',
      options: Array.from(
        new Set(
          tournaments.flatMap(tournament => 
            tournament.creators?.map(creator => creator.name) || []
          )
        )
      ).map(name => ({
        id: name.toLowerCase().replace(/\s+/g, ''),
        label: name,
        count: tournaments.filter(tournament => 
          tournament.creators?.some(creator => creator.name === name)
        ).length
      }))
    }
  ];

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

  // Filter logic
  const getFilteredTournaments = () => {
    let filtered = [...tournaments];

    // Apply status filter
    if (activeFilters.status?.length) {
      filtered = filtered.filter(tournament => 
        activeFilters.status!.includes(tournament.state)
      );
    }

    // Apply creator filter
    if (activeFilters.creator?.length) {
      filtered = filtered.filter(tournament => {
        const creatorNames = tournament.creators?.map((creator: SimpleCreator) => 
          creator.name.toLowerCase()
        ) || [];
        return activeFilters.creator!.some(filterId => {
          const creatorName = filterId.toLowerCase();
          return creatorNames.some((name: string) => name.replace(/\s+/g, '') === creatorName);
        });
      });
    }

    return filtered;
  };

  const filteredTournaments = getFilteredTournaments();

  // Show error state if API call failed
  if (error) {
    return (
      <PageLayout>
        <div className="min-h-screen bg-background">
          <PageHero
            title="Tournaments"
            description="Join competitive events and tournaments created by the community. Test your skills and compete for prizes."
            backgroundImage="/src/assets/homepage_hero.png"
            contactMessage="Host Your Tournament!"
            contactSubtext="Organize competitive events for the community"
          />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <ErrorDisplay
              title="Unable to load tournaments"
              message={error?.message || 'An unexpected error occurred'}
              showRetry={true}
              retryText="Try Again"
              onRetry={() => window.location.reload()}
            />
          </div>
        </div>
      </PageLayout>
    );
  }

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
              {/* Content Grid */}
              <div className="">
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
                        Try adjusting your filters to find tournaments that match your interests.
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
                      {tournament.description_short && (
                        <p className="text-secondary text-sm mb-4 line-clamp-3">
                          {tournament.description_short}
                        </p>
                      )}
                      
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
                            Created: {formatDate(tournament.createdAt)}
                          </span>
                          {tournament.creators && tournament.creators.length > 0 && (
                            <span>
                              By: {tournament.creators.map((creator: SimpleCreator) => creator.name).join(', ')}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </ContentGrid>
                
                {/* Pagination Controls */}
                {totalCount > pageSize && (
                  <div className="mt-8 flex justify-center items-center space-x-4">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="btn-secondary px-4 py-2 rounded-md disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <span className="text-secondary">
                      Page {currentPage} of {totalPages} (Total: {totalCount} items)
                    </span>
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage >= totalPages}
                      className="btn-secondary px-4 py-2 rounded-md disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            </main>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};
