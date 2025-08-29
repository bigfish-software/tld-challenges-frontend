import type { Meta, StoryObj } from '@storybook/react';
import { ContentGrid } from './ContentGrid';

const meta: Meta<typeof ContentGrid> = {
  title: 'UI/ContentGrid',
  component: ContentGrid,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A flexible grid layout component for displaying content cards with:
- Grid and list view modes
- Responsive grid columns
- Loading states with skeleton UI
- Empty states with helpful messaging
- Customizable grid breakpoints

## Usage Examples
- Custom Codes listing
- Challenges browse page
- Tournaments overview
- Any card-based content layout
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    viewMode: {
      control: { type: 'select' },
      options: ['grid', 'list'],
      description: 'Display mode for content'
    },
    isLoading: {
      control: 'boolean',
      description: 'Loading state'
    },
    isEmpty: {
      control: 'boolean',
      description: 'Empty state (no content)'
    },
    gridCols: {
      control: 'object',
      description: 'Responsive grid column configuration'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample card component for demonstration
const SampleCard = ({ title, description, type }: { title: string; description: string; type?: string }) => (
  <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6 hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between mb-3">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
        {title}
      </h3>
      {type && (
        <span className="px-2 py-1 text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 rounded-full">
          {type}
        </span>
      )}
    </div>
    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4">
      {description}
    </p>
    <div className="flex items-center justify-between">
      <span className="text-xs text-slate-500 dark:text-slate-400">2 days ago</span>
      <button className="px-3 py-1.5 text-sm font-medium text-primary-700 dark:text-primary-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
        View Details
      </button>
    </div>
  </div>
);

// Sample list item for list view
const SampleListItem = ({ title, description, type }: { title: string; description: string; type?: string }) => (
  <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 hover:shadow-md transition-shadow">
    <div className="flex items-center space-x-4">
      <div className="flex-shrink-0 h-12 w-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
        <svg className="h-6 w-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 truncate">
            {title}
          </h3>
          {type && (
            <span className="ml-2 px-2 py-1 text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-200 rounded-full">
              {type}
            </span>
          )}
        </div>
        <p className="text-slate-600 dark:text-slate-300 text-sm mt-1">
          {description}
        </p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-slate-500 dark:text-slate-400">2 days ago</span>
          <button className="text-sm font-medium text-primary-700 dark:text-primary-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            View Details
          </button>
        </div>
      </div>
    </div>
  </div>
);

// Sample data
const sampleItems = [
  { title: 'Survivor Paradise', description: 'Enhanced loot spawns with reduced wildlife aggression for a more relaxed survival experience.', type: 'Easy' },
  { title: 'Blizzard Challenge', description: 'Extreme weather conditions with limited visibility and increased cold damage.', type: 'Hard' },
  { title: 'Minimalist Run', description: 'Start with nothing and survive 30 days using only found items.', type: 'Medium' },
  { title: 'Wolf Pack Territory', description: 'Increased wolf spawns in all regions with enhanced AI behavior.', type: 'Extreme' },
  { title: 'Forager Dream', description: 'Abundant plant life and crafting materials with reduced tool durability.', type: 'Easy' },
  { title: 'Nomad Journey', description: 'Cross all regions without establishing a permanent base.', type: 'Medium' },
  { title: 'Silent World', description: 'No audio cues from wildlife or weather systems.', type: 'Hard' },
  { title: 'Speed Runner Setup', description: 'Optimized settings for fastest possible region traversal.', type: 'Medium' }
];

// Grid view with sample content
export const GridView: Story = {
  args: {
    viewMode: 'grid',
    children: sampleItems.map((item, index) => (
      <SampleCard key={index} {...item} />
    ))
  }
};

// List view with sample content
export const ListView: Story = {
  args: {
    viewMode: 'list',
    children: sampleItems.map((item, index) => (
      <SampleListItem key={index} {...item} />
    ))
  }
};

// Loading state
export const Loading: Story = {
  args: {
    isLoading: true,
    children: null
  }
};

// Empty state
export const Empty: Story = {
  args: {
    isEmpty: true,
    children: null
  }
};

// Custom empty state
export const CustomEmptyState: Story = {
  args: {
    isEmpty: true,
    emptyStateComponent: (
      <div className="text-center py-16">
        <div className="mx-auto h-24 w-24 text-primary-400 dark:text-primary-600 mb-6">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="h-full w-full">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
          No custom codes found
        </h3>
        <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto mb-6">
          Be the first to contribute! Share your custom game configuration codes with the community.
        </p>
        <button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors">
          Submit Custom Code
        </button>
      </div>
    ),
    children: null
  }
};

// Different grid configurations
export const TwoColumns: Story = {
  args: {
    viewMode: 'grid',
    gridCols: { sm: 1, md: 2, lg: 2, xl: 2 },
    children: sampleItems.slice(0, 4).map((item, index) => (
      <SampleCard key={index} {...item} />
    ))
  }
};

export const FiveColumns: Story = {
  args: {
    viewMode: 'grid',
    gridCols: { sm: 2, md: 3, lg: 4, xl: 5 },
    children: sampleItems.map((item, index) => (
      <SampleCard key={index} {...item} />
    ))
  }
};

// Single item
export const SingleItem: Story = {
  args: {
    viewMode: 'grid',
    children: (
      <SampleCard 
        title="Survivor Paradise" 
        description="Enhanced loot spawns with reduced wildlife aggression for a more relaxed survival experience." 
        type="Easy" 
      />
    )
  }
};
