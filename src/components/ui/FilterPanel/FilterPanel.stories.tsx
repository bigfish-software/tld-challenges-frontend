import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { FilterPanel, FilterGroup } from './FilterPanel';

const meta: Meta<typeof FilterPanel> = {
  title: 'UI/FilterPanel',
  component: FilterPanel,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A flexible filter panel component for overview pages with:
- Collapsible filter groups
- Multi-select checkboxes
- Item counts per filter option
- Clear all functionality
- Mobile-optimized layout

## Usage Examples
- Custom Codes filtering (difficulty, category, creator)
- Challenges filtering (difficulty, tournament, type)
- Tournaments filtering (status, format, prize type)
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    groups: {
      control: false,
      description: 'Array of filter groups with options'
    },
    selectedFilters: {
      control: false,
      description: 'Currently selected filters by group'
    },
    onFilterChange: {
      action: 'filter-changed',
      description: 'Callback when filter selection changes'
    },
    onClearAll: {
      action: 'clear-all',
      description: 'Callback when all filters are cleared'
    },
    title: {
      control: 'text',
      description: 'Title for the filter panel'
    },
    showClearAll: {
      control: 'boolean',
      description: 'Whether to show clear all button'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// Mock data for Custom Codes
const customCodesGroups: FilterGroup[] = [
  {
    id: 'difficulty',
    label: 'Difficulty',
    options: [
      { id: 'pilgrim', label: 'Pilgrim', count: 15 },
      { id: 'voyageur', label: 'Voyageur', count: 22 },
      { id: 'stalker', label: 'Stalker', count: 18 },
      { id: 'interloper', label: 'Interloper', count: 8 },
      { id: 'custom', label: 'Custom', count: 12 }
    ],
    multiSelect: true,
    defaultExpanded: true
  },
  {
    id: 'category',
    label: 'Category',
    options: [
      { id: 'survival', label: 'Survival', count: 35, description: 'Focus on survival mechanics' },
      { id: 'challenge', label: 'Challenge', count: 15, description: 'Specific objective-based' },
      { id: 'exploration', label: 'Exploration', count: 8, description: 'Map exploration focused' },
      { id: 'sandbox', label: 'Sandbox', count: 12, description: 'Open-ended gameplay' }
    ],
    multiSelect: true,
    collapsible: true,
    defaultExpanded: true
  },
  {
    id: 'creator',
    label: 'Creator',
    options: [
      { id: 'bigfish', label: 'BigFish', count: 25 },
      { id: 'chefmaria', label: 'ChefMaria', count: 18 },
      { id: 'community', label: 'Community', count: 32 }
    ],
    multiSelect: true,
    collapsible: true,
    defaultExpanded: false
  }
];

// Mock data for Challenges
const challengesGroups: FilterGroup[] = [
  {
    id: 'difficulty',
    label: 'Difficulty',
    options: [
      { id: 'easy', label: 'Easy', count: 125 },
      { id: 'medium', label: 'Medium', count: 200 },
      { id: 'hard', label: 'Hard', count: 150 },
      { id: 'extreme', label: 'Extreme', count: 25 }
    ],
    multiSelect: true,
    defaultExpanded: true
  },
  {
    id: 'type',
    label: 'Challenge Type',
    options: [
      { id: 'survival', label: 'Survival', count: 180, description: 'Survive for X days' },
      { id: 'speedrun', label: 'Speedrun', count: 95, description: 'Complete objectives quickly' },
      { id: 'collection', label: 'Collection', count: 120, description: 'Gather specific items' },
      { id: 'exploration', label: 'Exploration', count: 85, description: 'Discover locations' },
      { id: 'combat', label: 'Combat', count: 20, description: 'Wildlife encounters' }
    ],
    multiSelect: true,
    collapsible: true,
    defaultExpanded: true
  },
  {
    id: 'tournament',
    label: 'Tournament',
    options: [
      { id: 'winter2024', label: 'Winter Tournament 2024', count: 45 },
      { id: 'summer2024', label: 'Summer Challenge 2024', count: 38 },
      { id: 'community', label: 'Community Events', count: 67 }
    ],
    multiSelect: true,
    collapsible: true,
    defaultExpanded: false
  }
];

// Interactive wrapper for stories
const FilterPanelWrapper = ({ groups, title }: { groups: FilterGroup[], title?: string }) => {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});

  const handleFilterChange = (groupId: string, optionId: string, checked: boolean) => {
    setSelectedFilters(prev => {
      const groupFilters = prev[groupId] || [];
      if (checked) {
        return {
          ...prev,
          [groupId]: [...groupFilters, optionId]
        };
      } else {
        return {
          ...prev,
          [groupId]: groupFilters.filter(id => id !== optionId)
        };
      }
    });
  };

  const handleClearAll = () => {
    setSelectedFilters({});
  };

  return (
    <div className="max-w-sm">
      <FilterPanel
        groups={groups}
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
        onClearAll={handleClearAll}
        {...(title && { title })}
      />
    </div>
  );
};

// Custom Codes Filter
export const CustomCodesFilter: Story = {
  render: () => <FilterPanelWrapper groups={customCodesGroups} title="Filter Custom Codes" />
};

// Challenges Filter
export const ChallengesFilter: Story = {
  render: () => <FilterPanelWrapper groups={challengesGroups} title="Filter Challenges" />
};

// Tournaments Filter (simpler example)
export const TournamentsFilter: Story = {
  render: () => (
    <FilterPanelWrapper 
      groups={[
        {
          id: 'status',
          label: 'Status',
          options: [
            { id: 'active', label: 'Active', count: 3 },
            { id: 'upcoming', label: 'Upcoming', count: 5 },
            { id: 'completed', label: 'Completed', count: 12 }
          ],
          multiSelect: true,
          defaultExpanded: true
        },
        {
          id: 'format',
          label: 'Format',
          options: [
            { id: 'solo', label: 'Solo', count: 8 },
            { id: 'team', label: 'Team', count: 4 },
            { id: 'bracket', label: 'Bracket', count: 8 }
          ],
          multiSelect: true,
          collapsible: true,
          defaultExpanded: true
        }
      ]} 
      title="Filter Tournaments" 
    />
  )
};

// Minimal example
export const Minimal: Story = {
  render: () => (
    <FilterPanelWrapper 
      groups={[
        {
          id: 'category',
          label: 'Category',
          options: [
            { id: 'option1', label: 'Option 1', count: 10 },
            { id: 'option2', label: 'Option 2', count: 5 },
            { id: 'option3', label: 'Option 3', count: 3 }
          ],
          multiSelect: true,
          defaultExpanded: true
        }
      ]} 
    />
  )
};
