import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';
import { ThemeProvider } from '@/contexts/ThemeContext';

const meta = {
  title: 'Layout/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'responsive'
    },
    docs: {
      description: {
        component: `
The main header component for TLD Challenges with navigation, theme toggle, and gaming-optimized design.

## Key Features
- **Navigation Menu**: Custom Codes, Challenges, Tournaments with proper hierarchy
- **Theme Toggle**: Light/dark mode switching with gaming-optimized defaults
- **Submit Run Button**: Prominent call-to-action for challenge submissions
- **Responsive Design**: Adaptive layout for all device sizes
- **Sticky Positioning**: Remains accessible during page scrolling

## Available Stories
- **Default**: Complete header with all navigation and functionality
- **Mobile**: Mobile viewport testing for responsive design issues
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story, context) => {
      const isDocsView = context.viewMode === 'docs';
      
      if (isDocsView) {
        // Compact decorator for docs view - with minimal sample content and proper spacing
        return (
          <ThemeProvider>
            <div className="bg-white dark:bg-slate-900 pb-4">
              <Story />
              <div className="px-4 py-3">
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  This is sample content to show how the header looks with page content below.
                </p>
              </div>
            </div>
          </ThemeProvider>
        );
      }
      
      // Full decorator for canvas view with full sample content
      return (
        <ThemeProvider>
          <div className="min-h-screen bg-white dark:bg-slate-900">
            <Story />
            <div className="p-8">
              <p className="text-slate-600 dark:text-slate-400">
                This is sample content to show how the header looks with page content below.
                The header is sticky and will remain at the top when scrolling.
              </p>
            </div>
          </div>
        </ThemeProvider>
      );
    },
  ],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The default header component. Use the theme switcher in the toolbar to test light and dark themes.',
      },
    },
  },
};

/**
 * Mobile viewport view to test responsive design and navigation behavior.
 * Critical for identifying layout issues on smaller screens.
 */
export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'Header component on mobile devices. Tests navigation menu, theme toggle, and responsive layout behavior on small screens.'
      }
    }
  }
};
