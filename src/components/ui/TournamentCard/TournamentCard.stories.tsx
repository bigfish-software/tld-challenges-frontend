import type { Meta, StoryObj } from '@storybook/react';
import { TournamentCard } from './TournamentCard';

const meta: Meta<typeof TournamentCard> = {
  title: 'UI/TournamentCard',
  component: TournamentCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A card component for displaying tournament information with:
- Status indicators and game mode badges
- Organizer attribution and tournament format
- Prize pool and entry fee information
- Participant count and registration progress
- Featured tournament highlighting
- Registration and live viewing functionality

## Usage Examples
- Tournaments overview page
- Featured tournaments section
- Active tournaments dashboard
- Tournament search results
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
    onRegister: {
      action: 'register-clicked',
      description: 'Callback when register/join is clicked'
    },
    onOrganizerClick: {
      action: 'organizer-clicked',
      description: 'Callback when organizer is clicked'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample tournament data
const registrationTournament = {
  id: 1,
  title: 'Winter Survival Championship',
  description: 'The ultimate test of survival skills in the harshest winter conditions. Compete against the best survivors for glory and amazing prizes.',
  organizer: {
    name: 'TLD Esports',
    url: 'https://twitch.tv/tldesports'
  },
  format: 'Single Elimination' as const,
  game_mode: 'Survival' as const,
  prizes: {
    first: '$500 + Gaming Setup',
    second: '$200 + Merchandise',
    third: '$100 + Game Bundle',
    participation: 'Digital Badge'
  },
  entry_fee: '$10',
  max_participants: 64,
  current_participants: 47,
  registration_deadline: '2024-02-15T23:59:59Z',
  start_date: '2024-02-20T18:00:00Z',
  end_date: '2024-02-25T22:00:00Z',
  status: 'Registration' as const,
  featured: true,
  tags: ['Championship', 'Prize Pool', 'Survival', 'Winter'],
  createdAt: '2024-01-15T10:00:00Z'
};

const activeTournament = {
  id: 2,
  title: 'Speed Run Showdown',
  description: 'Fast-paced speedrunning tournament featuring multiple categories and real-time competition.',
  organizer: {
    name: 'SpeedRunCommunity'
  },
  format: 'Swiss' as const,
  game_mode: 'Speedrun' as const,
  prizes: {
    first: 'Custom Trophy',
    second: 'Gaming Peripheral Set',
    third: 'Steam Gift Card'
  },
  max_participants: 32,
  current_participants: 32,
  start_date: '2024-01-28T14:00:00Z',
  end_date: '2024-01-28T20:00:00Z',
  status: 'Active' as const,
  featured: false,
  tags: ['Speedrun', 'Live', 'Community'],
  createdAt: '2024-01-20T16:30:00Z'
};

const completedTournament = {
  id: 3,
  title: 'Holiday Challenge Cup',
  description: 'A festive tournament series featuring custom holiday-themed challenges and community events.',
  organizer: {
    name: 'FestiveSurvivors',
    url: 'https://discord.gg/festivesurvivors'
  },
  format: 'Round Robin' as const,
  game_mode: 'Challenge' as const,
  prizes: {
    first: 'Winner Title + $100',
    second: 'Runner-up Badge + $50',
    third: 'Participant Reward'
  },
  entry_fee: 'Free',
  max_participants: 24,
  current_participants: 24,
  start_date: '2023-12-20T19:00:00Z',
  end_date: '2024-01-05T22:00:00Z',
  status: 'Completed' as const,
  featured: false,
  tags: ['Holiday', 'Community', 'Free Entry'],
  createdAt: '2023-12-01T12:00:00Z'
};

const pvpTournament = {
  id: 4,
  title: 'Battle Royale Elimination',
  description: 'Last survivor standing in an intense PvP battle royale mode with custom map and mechanics.',
  organizer: {
    name: 'PvPLegends',
    url: 'https://youtube.com/@pvplegends'
  },
  format: 'Battle Royale' as const,
  game_mode: 'PvP' as const,
  prizes: {
    first: '$1000 Cash Prize',
    second: '$400',
    third: '$200'
  },
  entry_fee: '$25',
  max_participants: 100,
  current_participants: 89,
  registration_deadline: '2024-03-01T23:59:59Z',
  start_date: '2024-03-05T20:00:00Z',
  end_date: '2024-03-05T23:00:00Z',
  status: 'Registration' as const,
  featured: true,
  tags: ['PvP', 'Battle Royale', 'High Stakes', 'Cash Prize'],
  createdAt: '2024-01-25T14:15:00Z'
};

const customTournament = {
  id: 5,
  title: 'Modded Mayhem',
  description: 'Tournament featuring heavily modded gameplay with custom rules, items, and mechanics.',
  organizer: {
    name: 'ModMasters'
  },
  format: 'Double Elimination' as const,
  game_mode: 'Custom' as const,
  max_participants: 16,
  current_participants: 12,
  start_date: '2024-02-10T16:00:00Z',
  status: 'Registration' as const,
  featured: false,
  tags: ['Modded', 'Custom Rules', 'Experimental'],
  createdAt: '2024-01-18T09:45:00Z'
};

const cancelledTournament = {
  id: 6,
  title: 'Cancelled Event',
  description: 'This tournament was cancelled due to insufficient registrations.',
  organizer: {
    name: 'EventOrg'
  },
  format: 'Single Elimination' as const,
  game_mode: 'Survival' as const,
  max_participants: 32,
  current_participants: 8,
  start_date: '2024-02-01T18:00:00Z',
  status: 'Cancelled' as const,
  featured: false,
  tags: ['Cancelled'],
  createdAt: '2024-01-10T10:00:00Z'
};

// Default registration tournament
export const Default: Story = {
  args: {
    tournament: registrationTournament
  }
};

// Compact variant
export const Compact: Story = {
  args: {
    tournament: registrationTournament,
    variant: 'compact'
  }
};

// Different statuses
export const RegistrationOpen: Story = {
  args: {
    tournament: registrationTournament
  }
};

export const ActiveTournament: Story = {
  args: {
    tournament: activeTournament
  }
};

export const CompletedTournament: Story = {
  args: {
    tournament: completedTournament
  }
};

export const CancelledTournament: Story = {
  args: {
    tournament: cancelledTournament
  }
};

// Featured tournament
export const Featured: Story = {
  args: {
    tournament: registrationTournament
  }
};

// Different game modes
export const SurvivalMode: Story = {
  args: {
    tournament: registrationTournament
  }
};

export const SpeedrunMode: Story = {
  args: {
    tournament: activeTournament
  }
};

export const PvPMode: Story = {
  args: {
    tournament: pvpTournament
  }
};

export const CustomMode: Story = {
  args: {
    tournament: customTournament
  }
};

// High stakes tournament
export const HighStakes: Story = {
  args: {
    tournament: pvpTournament
  }
};

// Free entry tournament
export const FreeEntry: Story = {
  args: {
    tournament: completedTournament
  }
};

// Full participation
export const FullParticipation: Story = {
  args: {
    tournament: activeTournament
  }
};

// Low participation
export const LowParticipation: Story = {
  args: {
    tournament: cancelledTournament
  }
};

// No prizes
export const NoPrizes: Story = {
  args: {
    tournament: {
      ...customTournament,
      prizes: undefined,
      entry_fee: undefined
    }
  }
};

// No max participants
export const NoMaxParticipants: Story = {
  args: {
    tournament: {
      ...registrationTournament,
      max_participants: undefined,
      current_participants: 127
    }
  }
};

// Organizer without URL
export const OrganizerNoURL: Story = {
  args: {
    tournament: customTournament
  }
};

// Long description
export const LongDescription: Story = {
  args: {
    tournament: {
      ...registrationTournament,
      description: 'This comprehensive tournament tests every aspect of survival gameplay through multiple elimination rounds. Participants will face increasingly difficult challenges including resource scarcity, extreme weather conditions, and wildlife encounters while competing for substantial prizes and community recognition.'
    }
  }
};

// Many tags
export const ManyTags: Story = {
  args: {
    tournament: {
      ...registrationTournament,
      tags: ['Championship', 'Prize Pool', 'Survival', 'Winter', 'Community', 'Elimination', 'Streamed', 'International']
    }
  }
};

// Grid layout example
export const GridLayout: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <TournamentCard tournament={registrationTournament} />
      <TournamentCard tournament={activeTournament} />
      <TournamentCard tournament={completedTournament} />
      <TournamentCard tournament={pvpTournament} />
      <TournamentCard tournament={customTournament} />
      <TournamentCard tournament={cancelledTournament} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of multiple tournament cards in a responsive grid layout showing different statuses and formats'
      }
    }
  }
};

// Compact grid layout
export const CompactGrid: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <TournamentCard tournament={registrationTournament} variant="compact" />
      <TournamentCard tournament={activeTournament} variant="compact" />
      <TournamentCard tournament={completedTournament} variant="compact" />
      <TournamentCard tournament={pvpTournament} variant="compact" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Compact variant suitable for denser layouts and tournament dashboards'
      }
    }
  }
};
