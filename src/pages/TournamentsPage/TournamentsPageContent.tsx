import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHero, FilterPanel, ErrorDisplay, TournamentCard, Breadcrumb } from '@/components/ui';
import { ContentGrid } from '@/components/layout';
import { useTournaments } from '@/hooks/api';
import { Tournament, SimpleCreator } from '@/types/api';
import tournamentsHeroImage from '@/assets/tournaments_hero.png';

export const TournamentsPageContent: React.FC = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  
  // Responsive viewMode based on screen size
  useEffect(() => {
    const handleResize = () => {
      // Switch to compact on mobile (< 768px), list on desktop
      setViewMode(window.innerWidth < 768 ? 'grid' : 'list');
    };
    
    // Set initial viewMode
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
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
      <div className="min-h-screen bg-background">
        <PageHero
          title="Tournaments"
          description="Join competitive events and tournaments created by the community."
          backgroundImage="/src/assets/homepage_hero.png"
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
        backgroundImage={tournamentsHeroImage}
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
                  <TournamentCard
                    key={tournament.id}
                    tournament={tournament}
                    variant={viewMode === 'list' ? 'list' : 'compact'}
                    onOrganizerClick={(organizerName, organizerUrl) => {
                      if (organizerUrl) {
                        window.open(organizerUrl, '_blank', 'noopener,noreferrer');
                      } else if (organizerName) {
                        // Navigate to creator page if URL not available
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
  );
};
