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
        {loadingComponent || <DefaultLoadingComponent />}
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
const DefaultLoadingComponent = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {Array.from({ length: 8 }).map((_, index) => (
      <div
        key={index}
        className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6 animate-pulse"
      >
        {/* Header skeleton */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="h-10 w-10 bg-slate-200 dark:bg-slate-700 rounded-lg" />
          <div className="flex-1">
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mb-2" />
            <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-2/3" />
          </div>
        </div>
        
        {/* Content skeleton */}
        <div className="space-y-3 mb-4">
          <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded" />
          <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded" />
          <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
        </div>
        
        {/* Footer skeleton */}
        <div className="flex items-center justify-between">
          <div className="h-6 w-16 bg-slate-200 dark:bg-slate-700 rounded-full" />
          <div className="h-8 w-20 bg-slate-200 dark:bg-slate-700 rounded" />
        </div>
      </div>
    ))}
  </div>
);

// Default empty state component
const DefaultEmptyState = () => (
  <div className="text-center py-16">
    <div className="mx-auto h-24 w-24 text-slate-400 dark:text-slate-600 mb-6">
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="h-full w-full">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    </div>
    <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
      No results found
    </h3>
    <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
      Try adjusting your search terms or filters to find what you're looking for.
    </p>
  </div>
);
