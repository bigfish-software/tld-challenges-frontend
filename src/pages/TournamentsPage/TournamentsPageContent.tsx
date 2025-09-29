import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHero, FilterPanel, ErrorDisplay, NoDataDisplay, TournamentCard, Breadcrumb } from '@/components/ui';
import { ContentGrid } from '@/components/layout';
import { useTournaments, usePaginationScrollOneBased } from '@/hooks';
import { Tournament, SimpleCreator } from '@/types/api';

export const TournamentsPageContent: React.FC = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  
  useEffect(() => {
    const handleResize = () => {
      setViewMode(window.innerWidth < 768 ? 'grid' : 'list');
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;
  
  // Use pagination scroll hook for automatic scrolling (1-based)
  usePaginationScrollOneBased(currentPage);
  
  const { data: apiResponse, isLoading, error } = useTournaments(
    undefined,
    { page: currentPage, pageSize }
  );
  
  const tournaments: Tournament[] = apiResponse?.data || [];
  const totalCount = apiResponse?.meta?.pagination?.total || 0;
  const totalPages = Math.ceil(totalCount / pageSize);

  const getStateLabel = (state: string) => {
    switch (state) {
      case 'planned':
        return 'Coming Soon';
      case 'active':
        return 'Active';
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      default:
        return state.charAt(0).toUpperCase() + state.slice(1);
    }
  };

  const filterGroups = [
    {
      id: 'status',
      label: 'Status',
      options: Array.from(
        new Set(tournaments.map(tournament => tournament.state))
      ).map(state => ({
        id: state,
        label: getStateLabel(state),
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

  const getFilteredTournaments = () => {
    let filtered = [...tournaments];

    if (activeFilters.status?.length) {
      filtered = filtered.filter(tournament => 
        activeFilters.status!.includes(tournament.state)
      );
    }

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

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <PageHero
          title="Tournaments"
          description="Join competitive events and tournaments created by the community."
          pageType="tournaments"
          contactMessage="Host Your Tournament!"
          contactSubtext="Organize competitive events for the community"
          buttonText="Submit your Idea"
          onButtonClick={() => navigate('/idea/submit?type=Tournament&from=tournaments')}
        />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ErrorDisplay
            title="Unable to load tournaments"
            message={error?.message || 'An unexpected error occurred'}
            showRetry={true}
            retryText="Try Again"
            onRetry={() => window.location.reload()}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <PageHero
        title="Tournaments"
        description="Join competitive events and tournaments created by the community."
        pageType="tournaments"
        contactMessage="Host Your Tournament!"
        contactSubtext="Organize competitive events for the community"
        buttonText="Submit your Idea"
        onButtonClick={() => navigate('/idea/submit?type=Tournament&from=tournaments')}
      />

      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Tournaments', current: true }
        ]}
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-80 flex-shrink-0">
            <div className="sticky top-32">
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
                  <NoDataDisplay
                    title="No tournaments found"
                    description="Try adjusting your filters to find tournaments that match your interests."
                    actionText="Clear Filters"
                    onAction={clearAllFilters}
                  />
                }
              >
                {filteredTournaments.map(tournament => (
                  <TournamentCard
                    key={tournament.id}
                    tournament={tournament}
                    variant={viewMode === 'list' ? 'list' : 'compact'}
                    onOrganizerClick={(organizerName, organizerUrl) => {
                      if (organizerUrl) {
                        window.open(organizerUrl, '_blank', 'noopener,noreferrer');
                      } else if (organizerName) {
                        navigate(`/creators/${organizerName.toLowerCase().replace(/\s+/g, '-')}`);
                      }
                    }}
                  />
                ))}
              </ContentGrid>
              
              {/* Pagination Controls */}
              {totalCount > pageSize && (
                <div className="mt-8 flex justify-center items-center space-x-4">
                  <button
                    onClick={() => {
                      setCurrentPage(Math.max(1, currentPage - 1));
                    }}
                    disabled={currentPage === 1}
                    className="btn-secondary px-4 py-2 rounded-md disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <span className="text-secondary">
                    Page {currentPage} of {totalPages} (Total: {totalCount} items)
                  </span>
                  <button
                    onClick={() => {
                      setCurrentPage(Math.min(totalPages, currentPage + 1));
                    }}
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
  );
};
