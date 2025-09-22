import type { Meta, StoryObj } from '@storybook/react';
import { TournamentSection } from './TournamentSection';
import type { TournamentData } from './TournamentSection';

const meta: Meta<typeof TournamentSection> = {
  title: 'UI/TournamentSection',
  component: TournamentSection,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
A prominent section component for showcasing current or planned tournaments on the homepage.
Features tournament details, status indicators, participant count, and call-to-action buttons.

## Usage Guidelines
- Display current active tournament or next planned tournament
- Show clear status indicators (Active, Coming Soon, Ending Soon)
- Provide easy access to tournament details and run submission
- Include live indicator for active tournaments
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    tournament: {
      description: 'Tournament data to display. Uses default tournament if not provided.'
    }
  },
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

// Sample tournament data
const activeTournament: TournamentData = {
  id: 1,
  title: 'Winter Survival Challenge 2025',
  description: 'Test your survival skills in the harshest conditions. Last 50 days in Bleak Inlet without dying.',
  status: 'active',
  startDate: '2025-01-15',
  endDate: '2025-02-28',
  participantCount: 147,
  prizePool: 'Community Recognition'
};

const plannedTournament: TournamentData = {
  id: 2,
  title: 'Speed Run Championship',
  description: 'Race against time in this fast-paced speedrun tournament. Complete Story Mode as quickly as possible.',
  status: 'planned',
  startDate: '2025-03-01',
  endDate: '2025-03-15',
  participantCount: 89,
  prizePool: '$500 Prize Pool'
};

const endingSoonTournament: TournamentData = {
  id: 3,
  title: 'Permadeath Survival Gauntlet',
  description: 'The ultimate survival test. One life, multiple regions, endless challenges.',
  status: 'active',
  startDate: '2025-01-01',
  endDate: '2025-01-31',
  participantCount: 203,
  prizePool: 'Hall of Fame Entry'
};

// Default story with active tournament
export const Active: Story = {
  args: {
    tournament: activeTournament
  }
};

// Planned tournament
export const Planned: Story = {
  args: {
    tournament: plannedTournament
  }
};

// Ending soon tournament
export const EndingSoon: Story = {
  args: {
    tournament: endingSoonTournament
  }
};

// Default tournament (no data provided)
export const Default: Story = {
  args: {}
};

// Mobile responsive preview
export const Mobile: Story = {
  args: {
    tournament: activeTournament
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'Mobile responsive layout with stacked buttons and optimized spacing'
      }
    }
  }
};

// Tournament status comparison
export const StatusComparison: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-slate-100">Active Tournament</h3>
        <TournamentSection tournament={activeTournament} />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-slate-100">Planned Tournament</h3>
        <TournamentSection tournament={plannedTournament} />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4 text-slate-900 dark:text-slate-100">Ending Soon</h3>
        <TournamentSection tournament={endingSoonTournament} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison of all tournament status variants'
      }
    }
  }
};
