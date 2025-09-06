import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHero, FilterPanel, CustomCodeCard, ErrorDisplay, Breadcrumb } from '@/components/ui';
import { ContentGrid } from '@/components/layout';
import { useCustomCodes } from '@/hooks/api';
import { CustomCode } from '@/types/api';

export const CustomCodesPageContent: React.FC = () => {
  const navigate = useNavigate();
  const [viewMode] = useState<'grid' | 'list'>('list');
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 8; // 8 custom codes per page
  
  // API call for custom codes using React Query with pagination
  const { data: apiResponse, isLoading, error } = useCustomCodes(
    undefined, // no filters for now
    { start: currentPage * pageSize, limit: pageSize }
  );
  
  // Handle Strapi response structure: { data: [...], meta: { pagination: {...} } }
  const customCodes: CustomCode[] = apiResponse?.data || [];
  const totalCount = apiResponse?.meta?.pagination?.total || 0;
  const totalPages = Math.ceil(totalCount / pageSize);
  
  // Handle card click to navigate to detail page
  const handleCardClick = (slug: string) => {
    navigate(`/custom-codes/${slug}`);
  };

  // Dynamic filter groups based on available data
  const filterGroups = [
    {
      id: 'creator',
      label: 'Creator',
      options: Array.from(
        new Set(
          customCodes.flatMap(code => 
            code.creators?.map(creator => creator.name) || []
          )
        )
      ).map(name => ({
        id: name.toLowerCase().replace(/\s+/g, ''),
        label: name,
        count: customCodes.filter(code => 
          code.creators?.some(creator => creator.name === name)
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
  const getFilteredCodes = () => {
    let filtered = [...customCodes];

    // Apply creator filter
    if (activeFilters.creator?.length) {
      filtered = filtered.filter(code => {
        const creatorNames = code.creators?.map(creator => 
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
      const dateA = a.created_date || a.createdAt;
      const dateB = b.created_date || b.createdAt;
      return new Date(dateB).getTime() - new Date(dateA).getTime();
    });

    return filtered;
  };

  const filteredCodes = getFilteredCodes();

  // Show error state if API call failed
  if (error) {
    return (
      <div className="min-h-screen bg-background-primary">
        <PageHero
          title="Custom Codes"
          description="Discover and share custom game configurations to enhance your survival experience"
          backgroundImage="/src/assets/custom_code_hero.png"
          contactMessage="Submit your Custom Code"
          contactSubtext="Share your custom settings with players around the world and join our community of creators"
          buttonText="Submit your Idea"
        />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ErrorDisplay
            title="Unable to load custom codes"
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
    <div className="min-h-screen bg-background-primary">
      {/* Hero Section */}
      <PageHero
        title="Custom Codes"
        description="Discover and share custom game configurations to enhance your survival experience"
        backgroundImage="/src/assets/custom_code_hero.png"
        contactMessage="Submit your Custom Code"
        contactSubtext="Share your custom settings with players around the world and join our community of creators"
        buttonText="Submit your Idea"
      />

      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: 'Custom Codes', current: true }
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
                isEmpty={filteredCodes.length === 0}
                emptyStateComponent={
                  <div className="text-center py-16">
                    <div className="mx-auto h-24 w-24 text-secondary mb-6">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="h-full w-full">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-primary mb-2">
                      No custom codes found
                    </h3>
                    <p className="text-secondary max-w-md mx-auto mb-6">
                      Try adjusting your filters to find the perfect custom code for your gameplay style.
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
                {filteredCodes.map(code => (
                  <CustomCodeCard 
                    key={code.id} 
                    customCode={code} 
                    variant={viewMode === 'list' ? 'list' : 'default'}
                    onCardClick={handleCardClick}
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
  );
};
