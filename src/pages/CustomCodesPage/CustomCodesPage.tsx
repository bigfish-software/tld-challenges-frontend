import React, { useState } from 'react';
import { PageHero, FilterPanel, CustomCodeCard } from '@/components/ui';
import { ContentGrid } from '@/components/layout';
import { PageLayout } from '@/components/layout';
import { useCustomCodes } from '@/hooks/api';

export const CustomCodesPage: React.FC = () => {
  const [viewMode] = useState<'grid' | 'list'>('list');
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  
  // API call for custom codes
  const { customCodes, loading: isLoading, error } = useCustomCodes();

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
      <PageLayout>
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
          <PageHero
            title="Custom Game Codes"
            description="Discover and share custom game configurations to enhance your survival experience"
            backgroundImage="/src/assets/homepage_hero.png"
            contactMessage="Create Your Own Code!"
            contactSubtext="Join our community of creators"
          />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center py-16">
              <div className="mx-auto h-24 w-24 text-red-400 mb-6">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="h-full w-full">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
                Unable to load custom codes
              </h3>
              <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-6">
                {error}
              </p>
              <button 
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        {/* Hero Section */}
        <PageHero
          title="Custom Game Codes"
          description="Discover and share custom game configurations to enhance your survival experience"
          backgroundImage="/src/assets/homepage_hero.png"
          contactMessage="Create Your Own Code!"
          contactSubtext="Join our community of creators"
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
                isEmpty={filteredCodes.length === 0}
                emptyStateComponent={
                  <div className="text-center py-16">
                    <div className="mx-auto h-24 w-24 text-primary-400 dark:text-primary-600 mb-6">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="h-full w-full">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
                      No custom codes found
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-6">
                      Try adjusting your filters to find the perfect custom code for your gameplay style.
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
                {filteredCodes.map(code => (
                  <CustomCodeCard 
                    key={code.id} 
                    customCode={code} 
                    variant={viewMode === 'list' ? 'list' : 'default'}
                  />
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
