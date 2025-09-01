import React, { useState } from 'react';
import { PageHero, FilterPanel, ChallengeCard, ErrorDisplay, NoDataDisplay } from '@/components/ui';
import { ContentGrid } from '@/components/layout';
import { PageLayout } from '@/components/layout';
import { useQuery } from '@tanstack/react-query';
import { apiService } from '@/services/api';
import { ChallengeResponse } from '@/types/api';

export const ChallengesPage: React.FC = () => {
  const [viewMode] = useState<'grid' | 'list'>('list');
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 8; // 8 challenges per page
  
  // API call for challenges using React Query with pagination
  // Populate creators and custom_code as requested
  const { data: apiResponse, isLoading, error } = useQuery({
    queryKey: ['challenges', currentPage, pageSize],
    queryFn: () => apiService.challenges.getAll({
      populate: 'creators,custom_code',
      pagination: { start: currentPage * pageSize, limit: pageSize } // Use start/limit format
    }),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  // Handle actual API response structure: { data: [...], meta: { pagination: {...} } }
  const challenges: ChallengeResponse[] = apiResponse?.data || [];
  const totalCount = apiResponse?.meta?.pagination?.total || 0;
  const totalPages = Math.ceil(totalCount / pageSize);

  // Dynamic filter groups based on available data
  const filterGroups = [
    {
      id: 'difficulty',
      label: 'Difficulty',
      options: Array.from(
        new Set(
          challenges.map(challenge => challenge.difficulty)
        )
      ).map(difficulty => ({
        id: difficulty.toLowerCase(),
        label: difficulty,
        count: challenges.filter(challenge => 
          challenge.difficulty === difficulty
        ).length
      }))
    },
    {
      id: 'creator',
      label: 'Creator',
      options: Array.from(
        new Set(
          challenges.flatMap(challenge => 
            challenge.creators?.map(creator => creator.name) || []
          )
        )
      ).map(name => ({
        id: name.toLowerCase().replace(/\s+/g, ''),
        label: name,
        count: challenges.filter(challenge => 
          challenge.creators?.some(creator => creator.name === name)
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

  // Filter logic (simplified - no search or sorting for now)
  const getFilteredChallenges = () => {
    let filtered = [...challenges];

    // Apply difficulty filter
    if (activeFilters.difficulty?.length) {
      filtered = filtered.filter(challenge => 
        activeFilters.difficulty!.includes(challenge.difficulty.toLowerCase())
      );
    }

    // Apply creator filter
    if (activeFilters.creator?.length) {
      filtered = filtered.filter(challenge => {
        const creatorNames = challenge.creators?.map(creator => 
          creator.name.toLowerCase()
        ) || [];
        return activeFilters.creator!.some(filterId => {
          // Convert filter ID back to creator name
          const creatorName = filterId.toLowerCase();
          return creatorNames.some(name => name.replace(/\s+/g, '') === creatorName);
        });
      });
    }

    // Default sorting by newest
    filtered.sort((a, b) => {
      const dateA = a.createdAt;
      const dateB = b.createdAt;
      return new Date(dateB).getTime() - new Date(dateA).getTime();
    });

    return filtered;
  };

  const filteredChallenges = getFilteredChallenges();

  // Show error state if API call failed
  if (error) {
    return (
      <PageLayout>
        <div className="min-h-screen bg-background">
          <PageHero
            title="Challenges"
            description="Test your skills with community-created challenges"
            backgroundImage="/src/assets/homepage_hero.png"
            contactMessage="Submit your Challenge"
            contactSubtext="Share your challenges with players around the world and join our community of creators"
            buttonText="Submit Challenge"
          />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <ErrorDisplay
              title="Unable to load challenges"
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

  return (
    <PageLayout>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <PageHero
          title="Challenges"
          description="Test your skills with community-created challenges"
          backgroundImage="/src/assets/homepage_hero.png"
          contactMessage="Submit your Challenge"
          contactSubtext="Share your challenges with players around the world and join our community of creators"
          buttonText="Submit Challenge"
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
                  isEmpty={filteredChallenges.length === 0}
                  emptyStateComponent={
                    <NoDataDisplay
                      title="No challenges found"
                      description="Try adjusting your filters to find the perfect challenge for your skill level."
                      actionText="Clear Filters"
                      onAction={clearAllFilters}
                    />
                  }
                >
                  {filteredChallenges.map(challenge => (
                    <ChallengeCard 
                      key={challenge.id} 
                      challenge={challenge} 
                      variant={viewMode === 'list' ? 'list' : 'default'}
                    />
                  ))}
                </ContentGrid>
                
                {/* Pagination Controls for Testing */}
                {totalCount > pageSize && (
                  <div className="mt-8 flex justify-center items-center space-x-4">
                    <button
                      onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                      disabled={currentPage === 0}
                      className="btn-secondary px-4 py-2 rounded-md disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <span className="text-secondary">
                      Page {currentPage + 1} of {totalPages} (Total: {totalCount} items)
                    </span>
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
                      disabled={currentPage >= totalPages - 1}
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
