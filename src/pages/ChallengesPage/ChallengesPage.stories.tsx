import type { Meta, StoryObj } from '@storybook/react';
import { ChallengesPage } from './ChallengesPage';

const meta: Meta<typeof ChallengesPage> = {
  title: 'Pages/ChallengesPage',
  component: ChallengesPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
The Challenges overview page showcases community-created survival challenges with comprehensive filtering and sorting.

## Features
- **Challenge Filtering**: Filter by difficulty, status, region, and challenge type
- **Advanced Search**: Search across titles, descriptions, tags, creators, and regions
- **Multiple Sort Options**: Sort by newest, ending soon, participants, difficulty, and more
- **Status Tracking**: Shows active, completed, and upcoming challenges
- **Detailed Information**: Each challenge includes rules, participant count, and creator info

## Mock Data
Includes 6 diverse challenges ranging from easy exploration to very hard endurance tests.
        `
      }
    }
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The complete challenges overview page with interactive filtering, search, and sorting capabilities.'
      }
    }
  }
};

export const ThemeComparison: Story = {
  render: () => (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="bg-white min-h-screen">
        <div className="p-4 bg-gray-100 text-center font-semibold text-gray-900">
          Light Theme
        </div>
        <ChallengesPage />
      </div>
      <div className="bg-slate-900 min-h-screen dark">
        <div className="p-4 bg-slate-800 text-center font-semibold text-slate-100">
          Dark Theme
        </div>
        <ChallengesPage />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Side-by-side comparison of the challenges page in light and dark themes'
      }
    }
  }
};
