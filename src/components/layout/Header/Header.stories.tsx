import type { Meta, StoryObj } from '@storybook/react';
import { within, userEvent } from '@storybook/test';
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
- **Mobile Menu**: Hamburger menu with slide-down navigation for mobile devices
- **Theme Toggle**: Light/dark mode switching with gaming-optimized defaults
- **Submit Run Button**: Prominent call-to-action for challenge submissions
- **Responsive Design**: Adaptive layout for all device sizes with mobile navigation
- **Sticky Positioning**: Remains accessible during page scrolling

## Available Stories
- **Default**: Complete header with all navigation and functionality
- **Mobile**: Mobile viewport testing for responsive design
- **Mobile Menu Open**: Shows mobile navigation menu in expanded state
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
        story: 'Header component on mobile devices. Tests navigation menu, theme toggle, and responsive layout behavior on small screens. Click the hamburger menu icon to test mobile navigation.'
      }
    }
  }
};

/**
 * Shows the mobile menu in its opened state for testing and documentation.
 * Demonstrates how the navigation appears when expanded on mobile devices.
 */
export const MobileMenuOpen: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'Mobile header with navigation menu expanded. Shows how the hamburger menu reveals the main navigation links on mobile devices.'
      }
    }
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Find and click the mobile menu button (hamburger)
    const menuButton = canvas.getByRole('button', { name: /toggle mobile menu/i });
    await userEvent.click(menuButton);
  }
};

/**
 * Theme comparison for the Header component showing both light and dark variants.
 * Critical for ensuring proper contrast and visibility in both themes.
 */
export const ThemeComparison: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="font-semibold text-center text-slate-900">Light Theme</h3>
        <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
          <ThemeProvider>
            <div className="light">
              <Header />
              <div className="p-4">
                <p className="text-slate-600 text-sm">
                  Light theme optimized for daylight viewing conditions.
                </p>
              </div>
            </div>
          </ThemeProvider>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="font-semibold text-center text-slate-100">Dark Theme (Gaming Default)</h3>
        <div className="bg-slate-900 rounded-lg border border-slate-700 overflow-hidden">
          <ThemeProvider>
            <div className="dark">
              <Header />
              <div className="p-4">
                <p className="text-slate-300 text-sm">
                  Gaming-optimized dark theme for reduced eye strain and immersive experience.
                </p>
              </div>
            </div>
          </ThemeProvider>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Side-by-side comparison of Header component in both light and dark themes, showing gaming-optimized styling and proper contrast ratios.'
      }
    }
  }
};
