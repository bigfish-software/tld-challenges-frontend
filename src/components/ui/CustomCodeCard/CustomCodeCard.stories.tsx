import type { Meta, StoryObj } from '@storybook/react';
import { CustomCodeCard } from './CustomCodeCard';
import type { CustomCode } from '@/types/api';
import type { StrapiRichTextBlocks } from '@/types/richText';
import { getBigFishTwitchUrl, getChefMariaTwitchUrl } from '@/config/externalLinks';

const meta: Meta<typeof CustomCodeCard> = {
  title: 'UI/CustomCodeCard',
  component: CustomCodeCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
A card component for displaying custom game configuration codes with:
- Creator attribution and rich text descriptions
- Code preview with copy functionality  
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
      options: ['default', 'compact', 'list'],
      description: 'Card display variant'
    },
    onCardClick: {
      action: 'card-clicked',
      description: 'Callback when card is clicked'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// Rich text description blocks
const sampleDescription: StrapiRichTextBlocks = [
  {
    type: 'paragraph',
    children: [
      {
        type: 'text',
        text: 'Enhanced loot spawns with reduced wildlife aggression for a more relaxed survival experience. Perfect for new players or those wanting to focus on exploration and base building.'
      }
    ]
  }
];

const extremeDescription: StrapiRichTextBlocks = [
  {
    type: 'paragraph',
    children: [
      {
        type: 'text',
        text: 'Extreme weather conditions with brutal cold, limited visibility, and scarce resources. ',
        bold: true
      },
      {
        type: 'text',
        text: 'Only for the most experienced survivors who want the ultimate challenge.'
      }
    ]
  }
];

const detailedDescription: StrapiRichTextBlocks = [
  {
    type: 'paragraph',
    children: [
      {
        type: 'text',
        text: 'A comprehensive overhaul that modifies multiple game systems:'
      }
    ]
  },
  {
    type: 'list',
    format: 'unordered',
    children: [
      {
        type: 'list-item',
        children: [
          {
            type: 'text',
            text: 'Enhanced weather patterns with dynamic storms'
          }
        ]
      },
      {
        type: 'list-item',
        children: [
          {
            type: 'text',
            text: 'Improved wildlife AI and pack hunting mechanics'
          }
        ]
      },
      {
        type: 'list-item',
        children: [
          {
            type: 'text',
            text: 'Rebalanced loot spawns across all regions'
          }
        ]
      }
    ]
  }
];

// Sample custom code data matching API structure
const sampleCustomCode: CustomCode = {
  id: 1,
  documentId: 'abc123',
  name: 'Survivor Paradise',
  slug: 'survivor-paradise',
  description_long: sampleDescription,
  description_short: 'Enhanced loot spawns with reduced wildlife aggression for a more relaxed survival experience.',
  code: 'AAABBBCCCDDDEEEFFFGGGHHHIIIJJJKKKLLLMMMNNNOOOPPPQQQRRRSSSTTTUUUVVVWWWXXXYYYZZZ',
  is_featured: true,
  creators: [
    {
      id: 1,
      documentId: 'creator-1',
      name: 'BigFishSoftware',
      username: 'bigfishsoftware',
      slug: 'bigfishsoftware',
      twitch_url: getBigFishTwitchUrl(),
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-20T09:15:00Z',
      publishedAt: '2024-01-15T10:30:00Z'
    }
  ],
  createdAt: '2024-01-15T10:30:00Z',
  updatedAt: '2024-01-20T09:15:00Z',
  publishedAt: '2024-01-15T10:30:00Z'
};

const extremeCustomCode: CustomCode = {
  id: 2,
  documentId: 'def456',
  name: 'Blizzard Nightmare',
  slug: 'blizzard-nightmare',
  description_long: extremeDescription,
  description_short: 'Extreme weather conditions with brutal cold, limited visibility, and scarce resources.',
  code: 'ZZZYYXXXWWWVVVUUUTTTSSSRRRNNNMMMLLLKKKYYYXXXWWWVVVUUUTTTSSSQQQPPPOOO',
  is_featured: false,
  creators: [
    {
      id: 2,
      documentId: 'creator-2',
      name: 'ChefMaria',
      username: 'chefmaria_tld',
      slug: 'chefmaria',
      twitch_url: getChefMariaTwitchUrl(),
      createdAt: '2024-01-12T14:45:00Z',
      updatedAt: '2024-01-18T16:30:00Z',
      publishedAt: '2024-01-12T14:45:00Z'
    }
  ],
  createdAt: '2024-01-12T14:45:00Z',
  updatedAt: '2024-01-18T16:30:00Z',
  publishedAt: '2024-01-12T14:45:00Z'
};

const detailedCustomCode: CustomCode = {
  id: 3,
  documentId: 'ghi789',
  name: 'Comprehensive Overhaul',
  slug: 'comprehensive-overhaul',
  description_long: detailedDescription,
  description_short: 'A comprehensive overhaul that modifies multiple game systems including weather, wildlife AI, and loot spawns.',
  code: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  is_featured: true,
  creators: [
    {
      id: 3,
      documentId: 'creator-3',
      name: 'ModCommunity',
      username: 'modcommunity_tld',
      slug: 'modcommunity',
      youtube_url: 'https://youtube.com/modcommunity', // Keep as placeholder for fictional creator
      createdAt: '2024-01-20T16:20:00Z',
      updatedAt: '2024-01-25T13:10:00Z',
      publishedAt: '2024-01-20T16:20:00Z'
    }
  ],
  createdAt: '2024-01-20T16:20:00Z',
  updatedAt: '2024-01-25T13:10:00Z',
  publishedAt: '2024-01-20T16:20:00Z'
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

// List variant
export const List: Story = {
  args: {
    customCode: detailedCustomCode,
    variant: 'list'
  }
};

// Different examples
export const SimpleCode: Story = {
  args: {
    customCode: sampleCustomCode
  }
};

export const DetailedCode: Story = {
  args: {
    customCode: detailedCustomCode
  }
};

export const ExtremeCode: Story = {
  args: {
    customCode: extremeCustomCode
  }
};

// Creator with different social links
export const CreatorWithTwitch: Story = {
  args: {
    customCode: sampleCustomCode
  }
};

export const CreatorWithYouTube: Story = {
  args: {
    customCode: detailedCustomCode
  }
};

// Long description
export const LongDescription: Story = {
  args: {
    customCode: detailedCustomCode
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

// No description
export const NoDescription: Story = {
  args: {
    customCode: {
      ...sampleCustomCode,
      description: undefined
    }
  }
};

// Grid layout example
export const GridLayout: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <CustomCodeCard customCode={sampleCustomCode} />
      <CustomCodeCard customCode={extremeCustomCode} />
      <CustomCodeCard customCode={detailedCustomCode} />
      <CustomCodeCard customCode={{...sampleCustomCode, id: 5}} variant="compact" />
      <CustomCodeCard customCode={{...extremeCustomCode, id: 6}} />
      <CustomCodeCard customCode={{...detailedCustomCode, id: 7}} />
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
      <CustomCodeCard customCode={detailedCustomCode} variant="compact" />
      <CustomCodeCard customCode={{...sampleCustomCode, id: 8}} variant="compact" />
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

// List layout example
export const ListLayout: Story = {
  render: () => (
    <div className="space-y-6">
      <CustomCodeCard customCode={sampleCustomCode} variant="list" />
      <CustomCodeCard customCode={extremeCustomCode} variant="list" />
      <CustomCodeCard customCode={detailedCustomCode} variant="list" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'List variant with horizontal layout and expanded descriptions'
      }
    }
  }
};
