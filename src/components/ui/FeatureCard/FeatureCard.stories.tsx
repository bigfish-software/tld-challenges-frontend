import type { Meta, StoryObj } from '@storybook/react';
import { FeatureCard } from './FeatureCard';

const meta: Meta<typeof FeatureCard> = {
  title: 'UI/FeatureCard',
  component: FeatureCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A feature card component used on the homepage to showcase main platform features.
Each card includes an icon, title, description, and call-to-action button.

## Usage Guidelines
- Use for main navigation features (Custom Codes, Challenges, Tournaments)
- Provide descriptive titles and clear descriptions
- Include relevant icons that represent the feature
- Use consistent button text patterns ("Explore", "Browse", "View")
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'The main title of the feature'
    },
    description: {
      control: 'text',
      description: 'Descriptive text about the feature'
    },
    href: {
      control: 'text',
      description: 'URL to navigate to when button is clicked'
    },
    buttonText: {
      control: 'text',
      description: 'Text displayed on the call-to-action button'
    },
    titleIcon: {
      description: 'Icon element to display at the top of the card'
    }
  },
  decorators: [
    (Story) => (
      <div className="w-80 p-4">
        <Story />
      </div>
    )
  ]
};

export default meta;
type Story = StoryObj<typeof meta>;

// Custom Codes Icon
const CustomCodesIcon = (
  <svg
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
    />
  </svg>
);

// Challenges Icon
const ChallengesIcon = (
  <svg
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 10V3L4 14h7v7l9-11h-7z"
    />
  </svg>
);

// Tournaments Icon
const TournamentsIcon = (
  <svg
    className="h-6 w-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
    />
  </svg>
);

// Default story - Custom Codes
export const CustomCodes: Story = {
  args: {
    title: 'Custom Codes',
    description: 'Discover and share custom game configuration codes that enable unique challenges and gameplay experiences.',
    titleIcon: CustomCodesIcon,
    href: '/custom-codes',
    buttonText: 'Explore Codes'
  }
};

// Challenges story
export const Challenges: Story = {
  args: {
    title: 'Challenges',
    description: 'Browse community-created challenges ranging from survival tests to speedrun objectives.',
    titleIcon: ChallengesIcon,
    href: '/challenges',
    buttonText: 'Browse Challenges'
  }
};

// Tournaments story
export const Tournaments: Story = {
  args: {
    title: 'Tournaments',
    description: 'Participate in organized competitive events and climb the leaderboards.',
    titleIcon: TournamentsIcon,
    href: '/tournaments',
    buttonText: 'View Tournaments'
  }
};

// Grid layout demonstration
export const GridLayout: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl">
      <FeatureCard
        title="Custom Codes"
        description="Discover and share custom game configuration codes that enable unique challenges and gameplay experiences."
        titleIcon={CustomCodesIcon}
        href="/custom-codes"
        buttonText="Explore Codes"
      />
      <FeatureCard
        title="Challenges"
        description="Browse community-created challenges ranging from survival tests to speedrun objectives."
        titleIcon={ChallengesIcon}
        href="/challenges"
        buttonText="Browse Challenges"
      />
      <FeatureCard
        title="Tournaments"
        description="Participate in organized competitive events and climb the leaderboards."
        titleIcon={TournamentsIcon}
        href="/tournaments"
        buttonText="View Tournaments"
      />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Demonstration of how feature cards work together in a grid layout'
      }
    }
  }
};
