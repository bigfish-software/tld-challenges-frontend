import type { Meta, StoryObj } from '@storybook/react';
import { CustomCodeCard } from './CustomCodeCard';

const meta: Meta<typeof CustomCodeCard> = {
  title: 'UI/CustomCodeCard',
  component: CustomCodeCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A card component for displaying custom game configuration codes with:
- Creator attribution and difficulty indicators
- Code preview with copy functionality
- Download counts and interaction tracking
- Tag system for categorization
- Responsive design for different screen sizes

## Usage Examples
- Custom Codes overview page
- Featured codes section
- Search results display
- Creator profile pages
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
    onDownload: {
      action: 'download-clicked', 
      description: 'Callback when download is clicked'
    },
    onCreatorClick: {
      action: 'creator-clicked',
      description: 'Callback when creator is clicked'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample custom code data
const sampleCustomCode = {
  id: 1,
  name: 'Survivor Paradise',
  description: 'Enhanced loot spawns with reduced wildlife aggression for a more relaxed survival experience. Perfect for new players or those wanting to focus on exploration.',
  code: 'AAABBBCCCDDDEEEFFFGGGHHHIIIJJJKKKLLLMMMNNNOOOPPPQQQRRRSSSTTTUUUVVVWWWXXXYYYZZZ',
  creator: {
    name: 'BigFishSoftware',
    url: 'https://twitch.tv/bigfishsoftware'
  },
  tags: ['Relaxed', 'Exploration', 'Beginner-Friendly', 'Custom Settings'],
  downloads: 1247,
  difficulty: 'Easy' as const,
  createdAt: '2024-01-15T10:30:00Z'
};

const extremeCustomCode = {
  id: 2,
  name: 'Blizzard Nightmare',
  description: 'Extreme weather conditions with brutal cold, limited visibility, and scarce resources. Only for the most experienced survivors.',
  code: 'ZZZYYXXXWWWVVVUUUTTTSSSRRRNNNMMMLLLKKKYYYXXXWWWVVVUUUTTTSSSQQQPPPOOO',
  creator: {
    name: 'ChefMaria',
    url: 'https://twitch.tv/chefmaria'
  },
  tags: ['Hardcore', 'Weather', 'Extreme', 'Challenge'],
  downloads: 892,
  difficulty: 'Extreme' as const,
  createdAt: '2024-01-12T14:45:00Z'
};

const mediumCustomCode = {
  id: 3,
  name: 'Wolf Pack Territory',
  description: 'Increased wolf spawns across all regions with enhanced AI behavior and pack hunting mechanics.',
  code: 'MMMNNNOOOQQQRRRSSSTTTUUUVVVWWWXXXYYYLLLKKKNNN',
  creator: {
    name: 'SurvivalMaster'
  },
  tags: ['Wildlife', 'AI Enhanced', 'Pack Hunting'],
  downloads: 2156,
  difficulty: 'Hard' as const,
  createdAt: '2024-01-18T09:15:00Z'
};

const longTagsCustomCode = {
  id: 4,
  name: 'Comprehensive Overhaul',
  description: 'A complete game overhaul featuring modified weather, wildlife, loot spawns, and survival mechanics.',
  code: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  creator: {
    name: 'ModCommunity',
    url: 'https://github.com/modcommunity'
  },
  tags: ['Complete Overhaul', 'Weather System', 'Wildlife AI', 'Loot Rebalance', 'Survival Mechanics', 'Custom Spawns', 'Modified UI', 'Enhanced Graphics'],
  downloads: 5432,
  difficulty: 'Medium' as const,
  createdAt: '2024-01-20T16:20:00Z'
};

// Default card
export const Default: Story = {
  args: {
    customCode: sampleCustomCode
  }
};

// Compact variant
export const Compact: Story = {
  args: {
    customCode: sampleCustomCode,
    variant: 'compact'
  }
};

// Different difficulty levels
export const EasyDifficulty: Story = {
  args: {
    customCode: sampleCustomCode
  }
};

export const HardDifficulty: Story = {
  args: {
    customCode: mediumCustomCode
  }
};

export const ExtremeDifficulty: Story = {
  args: {
    customCode: extremeCustomCode
  }
};

// High download count
export const PopularCode: Story = {
  args: {
    customCode: longTagsCustomCode
  }
};

// Many tags (showing truncation)
export const ManyTags: Story = {
  args: {
    customCode: longTagsCustomCode
  }
};

// Creator without URL
export const CreatorNoURL: Story = {
  args: {
    customCode: mediumCustomCode
  }
};

// Long description
export const LongDescription: Story = {
  args: {
    customCode: {
      ...sampleCustomCode,
      description: 'This is an extremely detailed custom code that modifies numerous aspects of The Long Dark gameplay experience, including but not limited to weather patterns, wildlife behavior, resource availability, crafting mechanics, and survival difficulty. It provides a completely new way to experience the game with enhanced realism and increased challenge for veteran players.'
    }
  }
};

// Short code
export const ShortCode: Story = {
  args: {
    customCode: {
      ...sampleCustomCode,
      code: 'ABC123'
    }
  }
};

// No tags
export const NoTags: Story = {
  args: {
    customCode: {
      ...sampleCustomCode,
      tags: []
    }
  }
};

// Low downloads
export const LowDownloads: Story = {
  args: {
    customCode: {
      ...sampleCustomCode,
      downloads: 23
    }
  }
};

// Very high downloads
export const HighDownloads: Story = {
  args: {
    customCode: {
      ...sampleCustomCode,
      downloads: 15430
    }
  }
};

// Recent creation date
export const Recent: Story = {
  args: {
    customCode: {
      ...sampleCustomCode,
      createdAt: new Date().toISOString()
    }
  }
};

// Grid layout example
export const GridLayout: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <CustomCodeCard customCode={sampleCustomCode} />
      <CustomCodeCard customCode={extremeCustomCode} />
      <CustomCodeCard customCode={mediumCustomCode} />
      <CustomCodeCard customCode={longTagsCustomCode} />
      <CustomCodeCard customCode={{...sampleCustomCode, id: 5}} variant="compact" />
      <CustomCodeCard customCode={{...extremeCustomCode, id: 6}} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of multiple custom code cards in a responsive grid layout'
      }
    }
  }
};

// Compact grid layout
export const CompactGrid: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <CustomCodeCard customCode={sampleCustomCode} variant="compact" />
      <CustomCodeCard customCode={extremeCustomCode} variant="compact" />
      <CustomCodeCard customCode={mediumCustomCode} variant="compact" />
      <CustomCodeCard customCode={longTagsCustomCode} variant="compact" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Compact variant suitable for denser layouts and more cards per row'
      }
    }
  }
};
