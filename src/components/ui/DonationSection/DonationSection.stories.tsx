import type { Meta, StoryObj } from '@storybook/react';
import { DonationSection } from './DonationSection';

const meta: Meta<typeof DonationSection> = {
  title: 'UI/DonationSection',
  component: DonationSection,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
A community support section encouraging users to help keep the platform running.
Features multiple support options including Twitch donations, Discord community, and sharing.

## Usage Guidelines
- Place towards the bottom of the homepage
- Emphasizes community-driven nature of the project
- Provides transparency about fund usage
- Links to external platforms (Twitch, Discord)
- Encourages both financial and community support
        `
      }
    }
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="p-6 max-w-6xl mx-auto">
        <Story />
      </div>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {}
};

// Mobile responsive
export const Mobile: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'Mobile responsive layout with stacked support options'
      }
    }
  }
};

// Homepage context demonstration
export const InHomepageContext: Story = {
  render: () => (
    <div className="space-y-12">
      {/* Simulated homepage content above */}
      <div className="text-center space-y-6 py-12">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100">
          Welcome to TLD Challenges
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Your hub for The Long Dark community challenges, tournaments, and custom game codes.
        </p>
        
        {/* Simulated feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[1, 2, 3].map((i) => (
            <div 
              key={i}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6 h-48"
            >
              <div className="h-full flex items-center justify-center text-slate-400 dark:text-slate-600">
                Feature Card {i}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* The actual donation section */}
      <DonationSection />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstration of how the donation section appears in homepage context'
      }
    }
  }
};
