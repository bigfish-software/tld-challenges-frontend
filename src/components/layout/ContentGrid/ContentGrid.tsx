import { ReactNode } from 'react';
import { clsx } from 'clsx';

export interface ContentGridProps {
  children: ReactNode;
  viewMode?: 'grid' | 'list';
  isLoading?: boolean;
  isEmpty?: boolean;
  loadingComponent?: ReactNode;
  emptyStateComponent?: ReactNode;
  className?: string;
  gridCols?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
}

export const ContentGrid = ({
  children,
  viewMode = 'grid',
  isLoading = false,
  isEmpty = false,
  loadingComponent,
  emptyStateComponent,
  className,
  gridCols = { sm: 1, md: 2, lg: 3, xl: 4 }
}: ContentGridProps) => {
  // Loading state
  if (isLoading) {
    return (
      <div className={clsx('min-h-96', className)}>
        {loadingComponent || <DefaultLoadingComponent viewMode={viewMode} />}
      </div>
    );
  }

  // Empty state
  if (isEmpty) {
    return (
      <div className={clsx('min-h-96', className)}>
        {emptyStateComponent || <DefaultEmptyState />}
      </div>
    );
  }

  // Grid view
  if (viewMode === 'grid') {
    return (
      <div
        className={clsx(
          'grid gap-6',
          // Dynamic grid columns based on props
          gridCols.sm === 1 && 'grid-cols-1',
          gridCols.sm === 2 && 'sm:grid-cols-2',
          gridCols.sm === 3 && 'sm:grid-cols-3',
          gridCols.md === 1 && 'md:grid-cols-1',
          gridCols.md === 2 && 'md:grid-cols-2',
          gridCols.md === 3 && 'md:grid-cols-3',
          gridCols.md === 4 && 'md:grid-cols-4',
          gridCols.lg === 1 && 'lg:grid-cols-1',
          gridCols.lg === 2 && 'lg:grid-cols-2',
          gridCols.lg === 3 && 'lg:grid-cols-3',
          gridCols.lg === 4 && 'lg:grid-cols-4',
          gridCols.lg === 5 && 'lg:grid-cols-5',
          gridCols.xl === 1 && 'xl:grid-cols-1',
          gridCols.xl === 2 && 'xl:grid-cols-2',
          gridCols.xl === 3 && 'xl:grid-cols-3',
          gridCols.xl === 4 && 'xl:grid-cols-4',
          gridCols.xl === 5 && 'xl:grid-cols-5',
          gridCols.xl === 6 && 'xl:grid-cols-6',
          className
        )}
      >
        {children}
      </div>
    );
  }

  // List view
  return (
    <div className={clsx('space-y-4', className)}>
      {children}
    </div>
  );
};

// Default loading component with skeleton cards
const DefaultLoadingComponent = ({ viewMode = 'grid' }: { viewMode?: 'grid' | 'list' }) => {
  if (viewMode === 'list') {
    return (
      <div className="space-y-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="feature-card rounded-lg p-6 animate-pulse"
          >
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Left side - Main content skeleton */}
              <div className="flex-1 min-w-0">
                {/* Header skeleton */}
                <div className="mb-4">
                  <div className="h-6 bg-surface rounded mb-2 w-3/4" />
                  <div className="h-4 bg-surface rounded w-1/3" />
                </div>
                
                {/* Description skeleton */}
                <div className="space-y-2">
                  <div className="h-4 bg-surface rounded" />
                  <div className="h-4 bg-surface rounded" />
                  <div className="h-4 bg-surface rounded w-2/3" />
                </div>
              </div>
              
              {/* Right side - Code/Badge section skeleton */}
              <div className="lg:w-80 flex-shrink-0">
                <div className="bg-surface border border-default rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="h-3 bg-surface rounded w-20" />
                    <div className="h-3 bg-surface rounded w-12" />
                  </div>
                  <div className="h-12 bg-surface rounded" />
                </div>
              </div>
            </div>
            
            {/* Button skeleton */}
            <div className="flex justify-end mt-6">
              <div className="h-8 w-24 bg-surface rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Grid view skeleton
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="feature-card rounded-lg p-6 animate-pulse"
        >
          {/* Header skeleton */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 min-w-0 mr-3">
              <div className="h-5 bg-surface rounded mb-2" />
              <div className="h-3 bg-surface rounded w-2/3" />
            </div>
            <div className="h-6 w-16 bg-surface rounded-full" />
          </div>
          
          {/* Description skeleton */}
          <div className="space-y-2 mb-4">
            <div className="h-3 bg-surface rounded" />
            <div className="h-3 bg-surface rounded" />
            <div className="h-3 bg-surface rounded w-3/4" />
          </div>
          
          {/* Code section skeleton */}
          <div className="bg-surface border border-default rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <div className="h-3 bg-surface rounded w-20" />
              <div className="h-3 bg-surface rounded w-12" />
            </div>
            <div className="h-8 bg-surface rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};

// Default empty state component
const DefaultEmptyState = () => (
  <div className="text-center py-16">
    <div className="mx-auto h-24 w-24 text-secondary mb-6">
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="h-full w-full">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    </div>
    <h3 className="text-lg font-medium text-primary mb-2">
      No results found
    </h3>
    <p className="text-secondary max-w-md mx-auto">
      Try adjusting your search terms or filters to find what you're looking for.
    </p>
  </div>
);
