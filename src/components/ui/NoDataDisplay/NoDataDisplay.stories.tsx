import type { Meta, StoryObj } from '@storybook/react';
import { NoDataDisplay } from './NoDataDisplay';

const meta: Meta<typeof NoDataDisplay> = {
  title: 'UI/NoDataDisplay',
  component: NoDataDisplay,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A harmonized component for displaying no data states across all overview pages.
Matches the design pattern of ErrorDisplay with consistent icon styling and button behavior.

## Usage Guidelines
- Use when filters return no results or when API returns empty data
- Icon should be colored in primary color for consistency
- Always provide actionable text to clear filters when applicable
- Maintains theme support for both light and dark modes
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Main message to display to users'
    },
    description: {
      control: 'text',
      description: 'Optional description text providing context'
    },
    actionText: {
      control: 'text',
      description: 'Text for the action button (usually "Clear Filters")'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant matching ErrorDisplay pattern'
    },
    onAction: {
      action: 'action-clicked',
      description: 'Callback fired when action button is clicked'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story - typical usage
export const Default: Story = {
  args: {
    title: 'No challenges found',
    description: 'Try adjusting your filters to find the perfect challenge for your skill level.',
    actionText: 'Clear Filters'
  }
};

// Custom Codes variant
export const CustomCodes: Story = {
  args: {
    title: 'No custom codes found',
    description: 'Try adjusting your filters to find the perfect custom code for your gameplay style.',
    actionText: 'Clear Filters'
  }
};

// Tournaments variant
export const Tournaments: Story = {
  args: {
    title: 'No tournaments found',
    description: 'Try adjusting your filters to find tournaments that match your interests.',
    actionText: 'Clear Filters'
  }
};

// Without action button
export const WithoutAction: Story = {
  args: {
    title: 'No data available',
    description: 'There are currently no items to display.'
  }
};

// Without description
export const WithoutDescription: Story = {
  args: {
    title: 'No items found',
    actionText: 'Clear Filters'
  }
};

// Small size variant
export const SmallSize: Story = {
  args: {
    title: 'No items found',
    description: 'Try adjusting your filters.',
    actionText: 'Clear Filters',
    size: 'sm'
  }
};

// Large size variant
export const LargeSize: Story = {
  args: {
    title: 'No items found',
    description: 'Try adjusting your filters to find what you are looking for.',
    actionText: 'Clear Filters',
    size: 'lg'
  }
};

// Custom icon example
export const CustomIcon: Story = {
  args: {
    title: 'No bookmarks found',
    description: 'You haven\'t bookmarked any items yet.',
    actionText: 'Browse Items',
    icon: (
      <svg 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24" 
        className="h-full w-full"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={1} 
          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" 
        />
      </svg>
    )
  }
};

// Theme comparison
export const ThemeComparison: Story = {
  render: () => (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="bg-white min-h-screen p-8">
        <div className="p-4 bg-gray-100 text-center font-semibold text-gray-900 mb-8">
          Light Theme
        </div>
        <NoDataDisplay
          title="No challenges found"
          description="Try adjusting your filters to find the perfect challenge for your skill level."
          actionText="Clear Filters"
        />
      </div>
      <div className="bg-slate-900 min-h-screen p-8 dark" data-theme="dark">
        <div className="p-4 bg-slate-800 text-center font-semibold text-slate-100 mb-8">
          Dark Theme
        </div>
        <NoDataDisplay
          title="No challenges found"
          description="Try adjusting your filters to find the perfect challenge for your skill level."
          actionText="Clear Filters"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates proper theme support with primary color icon and consistent button styling'
      }
    }
  }
};

// All sizes comparison
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-12">
      <div>
        <h3 className="text-lg font-semibold mb-4">Small Size</h3>
        <NoDataDisplay
          title="No items found"
          description="Try adjusting your filters."
          actionText="Clear Filters"
          size="sm"
        />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Medium Size (Default)</h3>
        <NoDataDisplay
          title="No items found"
          description="Try adjusting your filters to find what you need."
          actionText="Clear Filters"
          size="md"
        />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4">Large Size</h3>
        <NoDataDisplay
          title="No items found"
          description="Try adjusting your filters to find exactly what you are looking for."
          actionText="Clear Filters"
          size="lg"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Shows all available size variants with proper scaling of icons, text, and buttons'
      }
    }
  }
};