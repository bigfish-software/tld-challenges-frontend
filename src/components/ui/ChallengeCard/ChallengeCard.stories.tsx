import type { Meta, StoryObj } from '@storybook/react';
import { ChallengeCard } from './ChallengeCard';
import type { ChallengeResponse } from '@/types/api';

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
    onSubmitRun: {
      action: 'submit-run-clicked',
      description: 'Callback when submit run is clicked'
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
const activeChallenge: ChallengeResponse = {
  id: 1,
  documentId: 'challenge_1',
  name: 'The 30-Day Nomad Challenge',
  slug: 'nomad-challenge',
  createdAt: '2024-01-10T08:00:00Z',
  updatedAt: '2024-01-12T10:30:00Z',
  publishedAt: '2024-01-10T08:00:00Z',
  description_short: 'Survive 30 days without establishing a permanent base. Move every 3 days and visit all major regions. Test your adaptability and resource management skills.',
  difficulty: 'Hard',
  is_featured: true,
  creators: [
    {
      id: 1,
      documentId: 'creator_1',
      name: 'WildernessGuide',
      username: 'wildernessguide',
      slug: 'wildernessguide',
      twitch_url: 'https://twitch.tv/wildernessguide',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
      publishedAt: '2024-01-01T00:00:00Z'
    }
  ],
  custom_code: {
    id: 1,
    documentId: 'code_1',
    name: 'Nomad Settings',
    slug: 'nomad-settings',
    code: 'NOMAD-2024-CHALLENGE',
    createdAt: '2024-01-10T08:00:00Z',
    updatedAt: '2024-01-10T08:00:00Z',
    publishedAt: '2024-01-10T08:00:00Z',
    description_short: 'Special settings for nomad challenge',
    is_featured: false
  }
};

const completedChallenge: ChallengeResponse = {
  id: 2,
  documentId: 'challenge_2',
  name: 'Blizzard Survivor',
  slug: 'blizzard-survivor',
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-08T23:59:59Z',
  publishedAt: '2024-01-01T00:00:00Z',
  description_short: 'Survive a continuous blizzard for 7 days in the most challenging weather conditions. Only the strongest will emerge victorious.',
  difficulty: 'Extreme',
  is_featured: false,
  creators: [
    {
      id: 2,
      documentId: 'creator_2',
      name: 'IceQueen',
      username: 'icequeen_tld',
      slug: 'icequeen',
      youtube_url: 'https://youtube.com/@icequeen',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
      publishedAt: '2024-01-01T00:00:00Z'
    }
  ]
};

const upcomingChallenge: ChallengeResponse = {
  id: 3,
  documentId: 'challenge_3',
  name: 'Wolf Pack Encounter',
  slug: 'wolf-pack-encounter',
  createdAt: '2024-01-25T12:00:00Z',
  updatedAt: '2024-01-25T12:00:00Z',
  publishedAt: '2024-01-25T12:00:00Z',
  description_short: 'Face enhanced wolf AI in a special challenge where wolves hunt in coordinated packs. Survive encounters with multiple wolf packs.',
  difficulty: 'Medium',
  is_featured: true,
  creators: [
    {
      id: 3,
      documentId: 'creator_3',
      name: 'AlphaWolf',
      username: 'alphawolf_survival',
      slug: 'alphawolf',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
      publishedAt: '2024-01-01T00:00:00Z'
    }
  ]
};

const easyChallenge: ChallengeResponse = {
  id: 4,
  documentId: 'challenge_4',
  name: 'Foragers Paradise',
  slug: 'foragers-paradise',
  createdAt: '2024-01-20T10:30:00Z',
  updatedAt: '2024-01-20T10:30:00Z',
  publishedAt: '2024-01-20T10:30:00Z',
  description_short: 'A beginner-friendly challenge focused on gathering, crafting, and exploring. Perfect for new players to learn the ropes.',
  difficulty: 'Easy',
  is_featured: false,
  creators: [
    {
      id: 4,
      documentId: 'creator_4',
      name: 'CraftMaster',
      username: 'craftmaster_tld',
      slug: 'craftmaster',
      twitch_url: 'https://twitch.tv/craftmaster',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
      publishedAt: '2024-01-01T00:00:00Z'
    }
  ],
  custom_code: {
    id: 2,
    documentId: 'code_2',
    name: 'Forager Settings',
    slug: 'forager-settings',
    code: 'FORAGE-EASY-2024',
    createdAt: '2024-01-20T10:30:00Z',
    updatedAt: '2024-01-20T10:30:00Z',
    publishedAt: '2024-01-20T10:30:00Z',
    description_short: 'Beginner-friendly settings',
    is_featured: false
  }
};

const compactChallenge: ChallengeResponse = {
  id: 5,
  documentId: 'challenge_5',
  name: 'Speed Run Challenge',
  slug: 'speed-run-challenge',
  createdAt: '2024-01-22T14:00:00Z',
  updatedAt: '2024-01-22T14:00:00Z',
  publishedAt: '2024-01-22T14:00:00Z',
  description_short: 'Complete specific objectives as quickly as possible. Time is everything in this fast-paced challenge.',
  difficulty: 'Medium',
  is_featured: false,
  creators: [
    {
      id: 5,
      documentId: 'creator_5',
      name: 'SpeedRunner',
      username: 'speedrunner_tld',
      slug: 'speedrunner',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
      publishedAt: '2024-01-01T00:00:00Z'
    }
  ]
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
      description_short: 'This comprehensive survival challenge tests every aspect of your wilderness skills. You must demonstrate mastery of resource management, weather survival, wildlife encounters, and navigation across the entire Great Bear Island. The challenge incorporates multiple difficulty layers and requires both physical survival and strategic planning to complete successfully.'
    }
  }
};

// No rules preview
export const NoRules: Story = {
  args: {
    challenge: activeChallenge
  }
};

// Long description
export const LongDescription: Story = {
  args: {
    challenge: {
      ...activeChallenge,
      description_short: 'This comprehensive survival challenge tests every aspect of your wilderness skills. You must demonstrate mastery of resource management, weather survival, wildlife encounters, and navigation across the entire Great Bear Island. The challenge incorporates multiple difficulty layers and requires both physical survival and strategic planning to complete successfully.'
    }
  }
};

// No end date
export const NoEndDate: Story = {
  args: {
    challenge: activeChallenge
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
      <ChallengeCard challenge={{...compactChallenge, id: 6, documentId: 'challenge_6'}} />
      <ChallengeCard challenge={{...activeChallenge, id: 7, documentId: 'challenge_7', is_featured: false}} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of multiple challenge cards in a responsive grid layout showing different difficulty levels'
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
