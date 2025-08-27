import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';
import { ThemeProvider } from '@/contexts/ThemeContext';

const meta = {
  title: 'Layout/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'The main header component for TLD Challenges with navigation, theme toggle, and gaming-optimized design.',
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
