import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ResultsHeader, SortOption } from './ResultsHeader';
import { Button } from '@/components/ui/Button';

const meta: Meta<typeof ResultsHeader> = {
  title: 'UI/ResultsHeader',
  component: ResultsHeader,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A header component for results pages that includes:
- Results count with filtered state
- Search functionality
- Sort options dropdown
- View mode toggle (grid/list)
- Loading state
- Custom action buttons

## Usage Examples
- Custom Codes listing page
- Challenges browse page
- Tournaments overview page
- Any content listing with search and sort
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    totalCount: {
      control: { type: 'number', min: 0 },
      description: 'Total number of items before filtering'
    },
    filteredCount: {
      control: { type: 'number', min: 0 },
      description: 'Number of items after filtering (optional)'
    },
    isLoading: {
      control: 'boolean',
      description: 'Loading state'
    },
    currentSort: {
      control: 'text',
      description: 'Currently selected sort option'
    },
    viewMode: {
      control: { type: 'select' },
      options: ['grid', 'list'],
      description: 'Current view mode'
    },
    showViewToggle: {
      control: 'boolean',
      description: 'Whether to show view mode toggle'
    },
    searchValue: {
      control: 'text',
      description: 'Current search value'
    },
    searchPlaceholder: {
      control: 'text',
      description: 'Search input placeholder'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sort options for stories
const challengesSortOptions: SortOption[] = [
  { id: 'name', label: 'Name (A-Z)', description: 'Sort alphabetically by name' },
  { id: 'difficulty', label: 'Difficulty', description: 'Sort by difficulty level' },
  { id: 'created', label: 'Newest First', description: 'Sort by creation date' },
  { id: 'popular', label: 'Most Popular', description: 'Sort by submission count' }
];

const customCodesSortOptions: SortOption[] = [
  { id: 'name', label: 'Name (A-Z)' },
  { id: 'downloads', label: 'Most Downloaded' },
  { id: 'recent', label: 'Recently Added' },
  { id: 'difficulty', label: 'Difficulty' }
];

const tournamentsSortOptions: SortOption[] = [
  { id: 'status', label: 'Status' },
  { id: 'start-date', label: 'Start Date' },
  { id: 'prize', label: 'Prize Amount' },
  { id: 'participants', label: 'Participants' }
];

// Interactive wrapper
const InteractiveWrapper = ({ 
  initialSort, 
  sortOptions, 
  totalCount, 
  filteredCount,
  showSearch = true,
  showViewToggle = false,
  searchPlaceholder = "Search..."
}: {
  initialSort: string;
  sortOptions: SortOption[];
  totalCount: number;
  filteredCount?: number;
  showSearch?: boolean;
  showViewToggle?: boolean;
  searchPlaceholder?: string;
}) => {
  const [currentSort, setCurrentSort] = useState(initialSort);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchValue, setSearchValue] = useState('');

  return (
    <ResultsHeader
      totalCount={totalCount}
      {...(filteredCount !== undefined && { filteredCount })}
      sortOptions={sortOptions}
      currentSort={currentSort}
      onSortChange={setCurrentSort}
      viewMode={viewMode}
      onViewModeChange={setViewMode}
      showViewToggle={showViewToggle}
      searchValue={searchValue}
      {...(showSearch && { onSearchChange: setSearchValue })}
      searchPlaceholder={searchPlaceholder}
    >
      <Button variant="outline" size="sm">
        Export
      </Button>
    </ResultsHeader>
  );
};

// Challenges results header
export const ChallengesResults: Story = {
  render: () => (
    <InteractiveWrapper
      initialSort="popular"
      sortOptions={challengesSortOptions}
      totalCount={500}
      filteredCount={47}
      showSearch={true}
      showViewToggle={true}
      searchPlaceholder="Search challenges..."
    />
  )
};

// Custom Codes results header
export const CustomCodesResults: Story = {
  render: () => (
    <InteractiveWrapper
      initialSort="downloads"
      sortOptions={customCodesSortOptions}
      totalCount={75}
      showSearch={true}
      showViewToggle={false}
      searchPlaceholder="Search custom codes..."
    />
  )
};

// Tournaments results header
export const TournamentsResults: Story = {
  render: () => (
    <InteractiveWrapper
      initialSort="status"
      sortOptions={tournamentsSortOptions}
      totalCount={12}
      showSearch={true}
      showViewToggle={false}
      searchPlaceholder="Search tournaments..."
    />
  )
};

// Loading state
export const Loading: Story = {
  args: {
    totalCount: 0,
    isLoading: true,
    sortOptions: challengesSortOptions,
    currentSort: 'popular',
    showViewToggle: true
  }
};

// No results
export const NoResults: Story = {
  args: {
    totalCount: 500,
    filteredCount: 0,
    sortOptions: challengesSortOptions,
    currentSort: 'popular',
    searchValue: 'nonexistent search term',
    showViewToggle: true
  }
};

// Large numbers
export const LargeDataset: Story = {
  args: {
    totalCount: 15420,
    filteredCount: 1205,
    sortOptions: challengesSortOptions,
    currentSort: 'popular',
    searchValue: 'survival',
    searchPlaceholder: 'Search 15k+ challenges...',
    showViewToggle: true
  }
};

// Minimal (no filters)
export const Minimal: Story = {
  args: {
    totalCount: 25,
    sortOptions: [
      { id: 'name', label: 'Name' },
      { id: 'date', label: 'Date' }
    ],
    currentSort: 'name'
  }
};
