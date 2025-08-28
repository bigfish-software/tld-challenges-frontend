import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { HomePage } from './HomePage';
import { HomePageContent } from './HomePageContent';

const meta: Meta<typeof HomePage> = {
  title: 'Pages/HomePage',
  component: HomePage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
The main homepage component that showcases the TLD Challenges platform.
Combines multiple sections including hero, feature cards, tournament highlight, and donation section.

## Page Structure
1. **Hero Section** - Welcome message, CTAs, and quick stats
2. **Feature Cards** - Custom Codes, Challenges, and Tournaments overview
3. **Tournament Section** - Current active tournament highlight
4. **Donation Section** - Community support and transparency

## Design Features
- Gaming-optimized dark theme as default
- Responsive design for all screen sizes
- Smooth transitions and hover effects
- Clear visual hierarchy and call-to-actions
- Community-focused messaging and transparency

## Available Stories
- **Default**: Complete homepage with all sections and functionality
- **ThemeComparison**: Side-by-side light and dark theme comparison
        `
      }
    }
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default homepage
export const Default: Story = {};

// Theme comparison
export const ThemeComparison: Story = {
  render: () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-center">Light Theme</h3>
        <div className="border border-slate-300 rounded-lg overflow-hidden">
          <div className="bg-white min-h-[600px]">
            <HomePageContent />
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-center">Dark Theme</h3>
        <div className="border border-slate-700 rounded-lg overflow-hidden">
          <div className="dark bg-slate-900 min-h-[600px]">
            <HomePageContent />
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Side-by-side comparison of light and dark theme implementations for the homepage'
      }
    }
  }
};
