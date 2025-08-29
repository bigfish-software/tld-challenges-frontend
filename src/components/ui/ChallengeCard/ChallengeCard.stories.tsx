import type { Meta, StoryObj } from '@storybook/react';
import { ChallengeCard } from './ChallengeCard';
import type { MockChallenge } from '@/types/common';

const meta: Meta<typeof ChallengeCard> = {
  title: 'UI/ChallengeCard',
  component: ChallengeCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A card component for displaying challenge information with:
- Status indicators and difficulty levels
- Creator attribution and challenge rules
- Participant and submission counts
- Duration and region information
- Interactive join/submit functionality

## Usage Examples
- Challenges overview page
- Featured challenges section
- Active challenges dashboard
- Challenge search results
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'compact'],
      description: 'Card display variant'
    },
    onCardClick: {
      action: 'card-clicked',
      description: 'Callback when card is clicked'
    },
    onJoinChallenge: {
      action: 'join-challenge-clicked',
      description: 'Callback when join/submit is clicked'
    },
    onCreatorClick: {
      action: 'creator-clicked',
      description: 'Callback when creator is clicked'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample challenge data
const activeChallenge: MockChallenge = {
  id: 1,
  title: 'The 30-Day Nomad Challenge',
  description: 'Survive 30 days without establishing a permanent base. Move every 3 days and visit all major regions. Test your adaptability and resource management skills.',
  rules: [
    'No sleeping in the same location for more than 3 consecutive days',
    'Must visit at least 5 different regions',
    'Cannot store items in containers for more than 24 hours',
    'Must craft at least one item in each region visited'
  ],
  creator: {
    name: 'WildernessGuide',
    url: 'https://twitch.tv/wildernessguide'
  },
  difficulty: 'Hard' as const,
  duration: '30 days',
  region: 'All Regions',
  tags: ['Nomadic', 'Exploration', 'Resource Management', 'Crafting'],
  submissions: 47,
  participants: 156,
  status: 'Active' as const,
  createdAt: '2024-01-10T08:00:00Z',
  endDate: '2024-02-15T23:59:59Z'
};

const completedChallenge: MockChallenge = {
  id: 2,
  title: 'Blizzard Survivor',
  description: 'Survive a continuous blizzard for 7 days in the most challenging weather conditions. Only the strongest will emerge victorious.',
  rules: [
    'Weather must be set to maximum blizzard intensity',
    'No indoor shelter allowed during storm',
    'Must maintain body temperature above freezing',
    'No pre-gathered supplies allowed'
  ],
  creator: {
    name: 'IceQueen',
    url: 'https://youtube.com/@icequeen'
  },
  difficulty: 'Extreme' as const,
  duration: '7 days',
  region: 'Bleak Inlet',
  tags: ['Weather', 'Extreme', 'Temperature Management'],
  submissions: 23,
  participants: 89,
  status: 'Completed' as const,
  createdAt: '2024-01-01T00:00:00Z',
  endDate: '2024-01-08T23:59:59Z'
};

const upcomingChallenge: MockChallenge = {
  id: 3,
  title: 'Wolf Pack Encounter',
  description: 'Face enhanced wolf AI in a special challenge where wolves hunt in coordinated packs. Survive encounters with multiple wolf packs.',
  rules: [
    'Wolf spawn rate increased by 300%',
    'Wolves hunt in packs of 3-5',
    'Enhanced AI coordination and pack behavior',
    'Must survive at least 3 pack encounters'
  ],
  creator: {
    name: 'AlphaWolf'
  },
  difficulty: 'Medium' as const,
  duration: '14 days',
  region: 'Mystery Lake',
  tags: ['Wildlife', 'AI Enhanced', 'Survival Combat'],
  submissions: 0,
  participants: 234,
  status: 'Upcoming' as const,
  createdAt: '2024-01-25T12:00:00Z',
  endDate: '2024-03-01T23:59:59Z'
};

const easyChallenge: MockChallenge = {
  id: 4,
  title: 'Foragers Paradise',
  description: 'A beginner-friendly challenge focused on gathering, crafting, and exploring. Perfect for new players to learn the ropes.',
  rules: [
    'Abundant plant spawns and crafting materials',
    'Reduced wildlife aggression',
    'Weather conditions set to mild',
    'Must craft 50 different items'
  ],
  creator: {
    name: 'CraftMaster',
    url: 'https://twitch.tv/craftmaster'
  },
  difficulty: 'Easy' as const,
  duration: '10 days',
  region: 'Coastal Highway',
  tags: ['Beginner Friendly', 'Crafting', 'Exploration'],
  submissions: 145,
  participants: 412,
  status: 'Active' as const,
  createdAt: '2024-01-20T10:30:00Z',
  endDate: '2024-02-10T23:59:59Z'
};

const compactChallenge = {
  id: 5,
  title: 'Speed Run Challenge',
  description: 'Complete specific objectives as quickly as possible. Time is everything in this fast-paced challenge.',
  rules: [
    'Must reach all major landmarks',
    'No resting for more than 2 hours',
    'Time penalties for using certain items'
  ],
  creator: {
    name: 'SpeedRunner'
  },
  difficulty: 'Medium' as const,
  duration: '3 days',
  region: 'Great Bear Island',
  tags: ['Speed', 'Time Attack'],
  submissions: 67,
  participants: 203,
  status: 'Active' as const,
  createdAt: '2024-01-22T14:00:00Z',
  endDate: '2024-02-05T23:59:59Z'
};

// Default active challenge
export const Default: Story = {
  args: {
    challenge: activeChallenge
  }
};

// Compact variant
export const Compact: Story = {
  args: {
    challenge: compactChallenge,
    variant: 'compact'
  }
};

// Different statuses
export const ActiveChallenge: Story = {
  args: {
    challenge: activeChallenge
  }
};

export const CompletedChallenge: Story = {
  args: {
    challenge: completedChallenge
  }
};

export const UpcomingChallenge: Story = {
  args: {
    challenge: upcomingChallenge
  }
};

// Different difficulty levels
export const EasyDifficulty: Story = {
  args: {
    challenge: easyChallenge
  }
};

export const MediumDifficulty: Story = {
  args: {
    challenge: upcomingChallenge
  }
};

export const HardDifficulty: Story = {
  args: {
    challenge: activeChallenge
  }
};

export const ExtremeDifficulty: Story = {
  args: {
    challenge: completedChallenge
  }
};

// High participation
export const HighParticipation: Story = {
  args: {
    challenge: easyChallenge
  }
};

// No submissions yet
export const NoSubmissions: Story = {
  args: {
    challenge: upcomingChallenge
  }
};

// Many rules
export const ManyRules: Story = {
  args: {
    challenge: {
      ...activeChallenge,
      rules: [
        'No sleeping in the same location for more than 3 consecutive days',
        'Must visit at least 5 different regions',
        'Cannot store items in containers for more than 24 hours',
        'Must craft at least one item in each region visited',
        'No using pre-existing shelters',
        'Must maintain journal entries for each day',
        'Cannot use imported custom codes',
        'Must document all wildlife encounters'
      ]
    }
  }
};

// No rules preview
export const NoRules: Story = {
  args: {
    challenge: {
      ...activeChallenge,
      rules: []
    }
  }
};

// Long description
export const LongDescription: Story = {
  args: {
    challenge: {
      ...activeChallenge,
      description: 'This comprehensive survival challenge tests every aspect of your wilderness skills. You must demonstrate mastery of resource management, weather survival, wildlife encounters, and navigation across the entire Great Bear Island. The challenge incorporates multiple difficulty layers and requires both physical survival and strategic planning to complete successfully.'
    }
  }
};

// No end date
export const NoEndDate: Story = {
  args: {
    challenge: {
      ...activeChallenge,
      endDate: undefined
    }
  }
};

// Creator without URL
export const CreatorNoURL: Story = {
  args: {
    challenge: upcomingChallenge
  }
};

// Grid layout example
export const GridLayout: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <ChallengeCard challenge={activeChallenge} />
      <ChallengeCard challenge={completedChallenge} />
      <ChallengeCard challenge={upcomingChallenge} />
      <ChallengeCard challenge={easyChallenge} />
      <ChallengeCard challenge={{...compactChallenge, id: 6}} />
      <ChallengeCard challenge={{...activeChallenge, id: 7, status: 'Upcoming'}} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of multiple challenge cards in a responsive grid layout showing different statuses'
      }
    }
  }
};

// Compact grid layout
export const CompactGrid: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <ChallengeCard challenge={activeChallenge} variant="compact" />
      <ChallengeCard challenge={completedChallenge} variant="compact" />
      <ChallengeCard challenge={upcomingChallenge} variant="compact" />
      <ChallengeCard challenge={easyChallenge} variant="compact" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Compact variant suitable for denser layouts and dashboard views'
      }
    }
  }
};
