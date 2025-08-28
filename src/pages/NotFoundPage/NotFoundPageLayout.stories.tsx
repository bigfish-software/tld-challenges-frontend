import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { NotFoundPageLayout } from './NotFoundPageLayout';
import { NotFoundPageContent } from './NotFoundPageContent';
import { ThemeProvider } from '@/contexts/ThemeContext';

const meta = {
  title: 'Pages/NotFoundPage',
  component: NotFoundPageLayout,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'responsive'
    },
    docs: {
      description: {
        component: `
A beautifully designed 404 page with gaming theme, including header and footer.

## Key Features
- **Gaming-Themed Design**: "Lost in the Wilderness" messaging themed for The Long Dark
- **Popular Destinations**: Quick navigation to Custom Codes, Challenges, Tournaments, FAQ, and Submit Run
- **Responsive Design**: Optimized for all device sizes
- **Theme Support**: Full light/dark theme variants with gaming-optimized colors
- **Interactive Elements**: Go back and return to base camp buttons

## Available Stories
- **Default**: Complete 404 page with all functionality and navigation
- **ThemeComparison**: Side-by-side light and dark theme comparison
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <ThemeProvider>
          <Story />
        </ThemeProvider>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof NotFoundPageLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The default 404 page layout with header, content, and footer. Features gaming-themed messaging and navigation options for lost users.',
      },
    },
  },
};

/**
 * Theme comparison showing both light and dark variants side by side.
 * Useful for testing theme consistency and visual design across both modes.
 */
export const ThemeComparison: Story = {
  render: () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-center">Light Theme</h3>
        <div className="border border-slate-300 rounded-lg overflow-hidden">
          <div className="bg-white min-h-[600px]">
            <NotFoundPageContent />
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-center">Dark Theme</h3>
        <div className="border border-slate-700 rounded-lg overflow-hidden">
          <div className="dark bg-slate-900 min-h-[600px]">
            <NotFoundPageContent />
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Side-by-side comparison of light and dark theme implementations for the 404 page design and gaming aesthetics.'
      }
    }
  }
};
