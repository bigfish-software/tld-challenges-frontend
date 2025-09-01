import { useState } from 'react';
import { clsx } from 'clsx';

export interface FilterOption {
  id: string;
  label: string;
  count?: number;
  description?: string;
}

export interface FilterGroup {
  id: string;
  label: string;
  options: FilterOption[];
  multiSelect?: boolean;
  collapsible?: boolean;
  defaultExpanded?: boolean;
}

export interface FilterPanelProps {
  groups: FilterGroup[];
  selectedFilters: Record<string, string[]>;
  onFilterChange: (groupId: string, optionId: string, checked: boolean) => void;
  onClearAll: () => void;
  className?: string;
  title?: string;
  showClearAll?: boolean;
}

export const FilterPanel = ({
  groups,
  selectedFilters,
  onFilterChange,
  onClearAll,
  className,
  title = "Filters",
  showClearAll = true
}: FilterPanelProps) => {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    new Set(groups.filter(g => g.defaultExpanded !== false).map(g => g.id))
  );

  const toggleGroup = (groupId: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupId)) {
      newExpanded.delete(groupId);
    } else {
      newExpanded.add(groupId);
    }
    setExpandedGroups(newExpanded);
  };

  const getTotalSelectedCount = () => {
    return Object.values(selectedFilters).reduce((sum, filters) => sum + filters.length, 0);
  };

  return (
    <div className={clsx(
      'bg-surface border border-default rounded-lg shadow-sm',
      className
    )}>
      {/* Header */}
      <div className="p-4 border-b border-default">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-primary">
            {title}
          </h3>
          {showClearAll && getTotalSelectedCount() > 0 && (
            <button
              onClick={onClearAll}
              className="text-xs text-primary transition-colors flex items-center space-x-1 copy-button"
            >
              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H8a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span>Clear All ({getTotalSelectedCount()})</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Groups */}
      <div className="divide-y" style={{ borderColor: 'var(--color-border)' }}>
        {groups.map((group) => {
          const isExpanded = expandedGroups.has(group.id);
          const groupFilters = selectedFilters[group.id] || [];

          return (
            <div key={group.id} className="p-4">
              {/* Group Header */}
              <button
                onClick={() => group.collapsible && toggleGroup(group.id)}
                className={clsx(
                  'flex items-center justify-between w-full text-left',
                  group.collapsible && 'hover:text-secondary transition-colors'
                )}
                disabled={!group.collapsible}
              >
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-primary">
                    {group.label}
                  </span>
                  {groupFilters.length > 0 && (
                    <span className="ml-1 px-1 text-xs font-medium rounded bg-surface-raised text-secondary border border-default min-w-[16px] text-center">
                      {groupFilters.length}
                    </span>
                  )}
                </div>
                {group.collapsible && (
                  <svg
                    className={clsx(
                      'h-5 w-5 text-secondary transition-transform duration-200',
                      isExpanded ? 'rotate-180' : 'rotate-0'
                    )}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                )}
              </button>

              {/* Group Options */}
              {(!group.collapsible || isExpanded) && (
                <div className="mt-3 space-y-2">
                  {group.options.map((option) => {
                    const isSelected = groupFilters.includes(option.id);
                    const checkboxId = `${group.id}-${option.id}`;

                    return (
                      <div key={option.id} className="flex items-start space-x-3">
                        <div className="flex items-center h-5">
                          <input
                            id={checkboxId}
                            type="checkbox"
                            checked={isSelected}
                            onChange={(e) => onFilterChange(group.id, option.id, e.target.checked)}
                            className="
                              h-4 w-4 
                              rounded 
                              bg-surface
                              transition-colors
                              filter-checkbox
                            "
                            style={{ 
                              borderColor: 'var(--color-border)',
                              accentColor: 'var(--color-secondary)',
                              color: 'var(--color-secondary)'
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <label 
                            htmlFor={checkboxId}
                            className="flex items-center justify-between cursor-pointer hover:bg-surface-raised transition-colors rounded p-1 -m-1 filter-option-hover"
                          >
                            <div className="flex-1">
                              <span className={clsx(
                                'text-sm transition-colors',
                                isSelected 
                                  ? 'text-secondary-color font-medium' 
                                  : 'text-primary'
                              )}>
                                {option.label}
                              </span>
                              {option.description && (
                                <p className="text-xs text-secondary mt-0.5">
                                  {option.description}
                                </p>
                              )}
                            </div>
                            {option.count !== undefined && (
                              <span className="text-xs text-secondary ml-2">
                                {option.count}
                              </span>
                            )}
                          </label>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile Clear All (bottom) */}
      {showClearAll && getTotalSelectedCount() > 0 && (
        <div className="p-4 border-t border-default sm:hidden">
          <button
            onClick={onClearAll}
            className="w-full text-center text-xs text-primary transition-colors flex items-center justify-center space-x-1 copy-button"
          >
            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H8a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span>Clear All Filters ({getTotalSelectedCount()})</span>
          </button>
        </div>
      )}
    </div>
  );
};
