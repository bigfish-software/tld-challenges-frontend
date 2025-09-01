import type { Meta, StoryObj } from '@storybook/react';
import { ErrorDisplay } from './ErrorDisplay';

const meta: Meta<typeof ErrorDisplay> = {
  title: 'UI/ErrorDisplay',
  component: ErrorDisplay,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A reusable error display component for showing error states with optional retry functionality.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant of the error display'
    },
    showRetry: {
      control: 'boolean',
      description: 'Whether to show the retry button'
    },
    onRetry: {
      action: 'retry-clicked',
      description: 'Callback fired when retry button is clicked'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default error display
export const Default: Story = {
  args: {
    title: 'Unable to load data',
    message: 'An unexpected error occurred while loading the content.',
    showRetry: true,
    retryText: 'Try Again'
  }
};

// API Error
export const APIError: Story = {
  args: {
    title: 'Unable to load challenges',
    message: 'Failed to connect to the server. Please check your internet connection and try again.',
    showRetry: true,
    retryText: 'Retry'
  }
};

// Network Error
export const NetworkError: Story = {
  args: {
    title: 'Connection Error',
    message: 'Network error - please check your connection',
    showRetry: true,
    retryText: 'Try Again'
  }
};

// Custom Error Message
export const CustomError: Story = {
  args: {
    title: 'Invalid key creators,custom_code',
    message: 'The server returned an invalid response. This might be a configuration issue.',
    showRetry: true,
    retryText: 'Reload Page'
  }
};

// Without Retry Button
export const NoRetry: Story = {
  args: {
    title: 'Access Denied',
    message: 'You do not have permission to view this content.',
    showRetry: false
  }
};

// Small Size
export const SmallSize: Story = {
  args: {
    title: 'Failed to load',
    message: 'Something went wrong',
    size: 'sm',
    showRetry: true
  }
};

// Large Size
export const LargeSize: Story = {
  args: {
    title: 'Critical System Error',
    message: 'A critical error has occurred that requires immediate attention. Please contact support if this issue persists.',
    size: 'lg',
    showRetry: true,
    retryText: 'Contact Support'
  }
};

// Custom Icon
export const CustomIcon: Story = {
  args: {
    title: 'Server Maintenance',
    message: 'The server is currently undergoing maintenance. Please try again later.',
    showRetry: true,
    retryText: 'Check Again',
    icon: (
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="h-full w-full">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
      </svg>
    )
  }
};

// Page Error (Full Layout)
export const PageError: Story = {
  render: (args) => (
    <div className="min-h-screen bg-background-primary flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ErrorDisplay {...args} />
      </div>
    </div>
  ),
  args: {
    title: 'Page Not Found',
    message: 'The page you are looking for could not be found.',
    showRetry: true,
    retryText: 'Go Home',
    size: 'lg'
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Example of error display used as a full page error state'
      }
    }
  }
};

// Theme Comparison
export const ThemeComparison: Story = {
  render: () => (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="bg-white min-h-screen">
        <div className="p-4 bg-gray-100 text-center font-semibold text-gray-900">
          Light Theme
        </div>
        <div className="flex items-center justify-center h-96">
          <ErrorDisplay
            title="Unable to load challenges"
            message="Failed to connect to the server. Please check your internet connection."
            showRetry={true}
            retryText="Try Again"
          />
        </div>
      </div>
      <div className="bg-slate-900 min-h-screen dark">
        <div className="p-4 bg-slate-800 text-center font-semibold text-slate-100">
          Dark Theme
        </div>
        <div className="flex items-center justify-center h-96">
          <ErrorDisplay
            title="Unable to load challenges"
            message="Failed to connect to the server. Please check your internet connection."
            showRetry={true}
            retryText="Try Again"
          />
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Side-by-side comparison of light and dark theme implementations'
      }
    }
  }
};
