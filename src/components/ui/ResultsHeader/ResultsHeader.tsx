import { ReactNode } from 'react';
import { clsx } from 'clsx';

export interface SortOption {
  id: string;
  label: string;
  description?: string;
}

export interface ResultsHeaderProps {
  totalCount: number;
  filteredCount?: number;
  isLoading?: boolean;
  sortOptions?: SortOption[];
  currentSort?: string;
  onSortChange?: (sortId: string) => void;
  viewMode?: 'grid' | 'list';
  onViewModeChange?: (mode: 'grid' | 'list') => void;
  showViewToggle?: boolean;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  children?: ReactNode;
  className?: string;
}

export const ResultsHeader = ({
  totalCount,
  filteredCount,
  isLoading = false,
  sortOptions = [],
  currentSort,
  onSortChange,
  viewMode = 'grid',
  onViewModeChange,
  showViewToggle = false,
  searchPlaceholder = "Search...",
  searchValue = "",
  onSearchChange,
  children,
  className
}: ResultsHeaderProps) => {
  const displayCount = filteredCount !== undefined ? filteredCount : totalCount;
  const showingFiltered = filteredCount !== undefined && filteredCount !== totalCount;

  return (
    <div className={clsx(
      'card-surface border-default rounded-lg shadow-sm p-4',
      className
    )}>
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
        {/* Left side - Results count and search */}
        <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
          {/* Results count */}
          <div className="flex items-center space-x-2">
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-color border-t-transparent" />
                <span className="text-sm text-secondary">Loading...</span>
              </div>
            ) : (
              <div className="text-sm text-secondary">
                {showingFiltered ? (
                  <>
                    Showing <span className="font-medium text-primary">{displayCount.toLocaleString()}</span> of{' '}
                    <span className="font-medium text-primary">{totalCount.toLocaleString()}</span> results
                  </>
                ) : (
                  <>
                    <span className="font-medium text-primary">{displayCount.toLocaleString()}</span>{' '}
                    {displayCount === 1 ? 'result' : 'results'}
                  </>
                )}
              </div>
            )}
          </div>

          {/* Search */}
          {onSearchChange && (
            <div className="relative min-w-0 flex-1 sm:max-w-xs">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-4 w-4 text-secondary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={searchPlaceholder}
                className="
                  block w-full pl-10 pr-3 py-2 text-sm
                  border-default 
                  rounded-md 
                  bg-background
                  text-primary
                  placeholder:text-secondary
                  focus:outline-none focus:ring-2 focus:ring-primary-color focus:border-primary-color
                  transition-colors
                "
              />
              {searchValue && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <svg
                    className="h-4 w-4 text-secondary hover:text-secondary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Right side - Sort and view controls */}
        <div className="flex items-center space-x-3">
          {/* Sort dropdown */}
          {sortOptions.length > 0 && onSortChange && (
            <div className="flex items-center space-x-2">
              <label className="text-sm text-secondary">
                Sort by:
              </label>
              <select
                value={currentSort || ''}
                onChange={(e) => onSortChange(e.target.value)}
                className="
                  text-sm border-default 
                  rounded-md px-2 py-1.5
                  bg-background
                  text-primary
                  focus:outline-none focus:ring-2 focus:ring-primary-color focus:border-primary-color
                  transition-colors
                "
              >
                {sortOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* View mode toggle */}
          {showViewToggle && onViewModeChange && (
            <div className="flex items-center border-default rounded-md">
              <button
                onClick={() => onViewModeChange('grid')}
                className={clsx(
                  'p-2 text-sm border-r border-default transition-colors',
                  viewMode === 'grid'
                    ? 'bg-primary-light text-primary-color'
                    : 'bg-background text-secondary hover:text-primary'
                )}
                title="Grid view"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => onViewModeChange('list')}
                className={clsx(
                  'p-2 text-sm transition-colors',
                  viewMode === 'list'
                    ? 'bg-primary-light text-primary-color'
                    : 'bg-background text-secondary hover:text-primary'
                )}
                title="List view"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </button>
            </div>
          )}

          {/* Custom children (e.g., additional buttons) */}
          {children}
        </div>
      </div>
    </div>
  );
};
