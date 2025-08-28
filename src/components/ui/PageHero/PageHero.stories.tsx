import type { Meta, StoryObj } from '@storybook/react';
import { PageHero } from './PageHero';

const meta: Meta<typeof PageHero> = {
  title: 'UI/PageHero',
  component: PageHero,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
A reusable hero section for overview pages that includes:
- Background image with overlay
- Title and description
- Optional icon
- Contact CTA with external link integration

## Usage Guidelines
- **Homepage**: Uses its own custom hero section with platform stats
- **Overview Pages**: Use this component for Custom Codes, Challenges, Tournaments pages
- **Consistent Design**: All overview pages use the same minimal hero layout
- **Contact Integration**: GitHub Issues integration for community engagement

## Design Features
- Gaming-optimized background with The Long Dark imagery
- Responsive layout with proper text shadows for readability
- Community engagement CTA with GitHub Issues integration
- Clean, minimal design suitable for all overview pages
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Main heading for the page'
    },
    description: {
      control: 'text',
      description: 'Descriptive text about the page content'
    },
    contactMessage: {
      control: 'text', 
      description: 'Call-to-action message for community contact'
    },
    contactSubtext: {
      control: 'text',
      description: 'Additional context for the contact CTA'
    },
    icon: {
      control: false,
      description: 'Optional icon to display above the title'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// Custom Codes Overview Page
export const CustomCodes: Story = {
  args: {
    title: 'Custom Codes',
    description: 'Discover and share custom game configuration codes that enable unique challenges and gameplay experiences. Filter through community-created codes to find the perfect settings for your next survival adventure.',
    contactMessage: 'Want to share your custom code?',
    contactSubtext: 'Submit your game configuration codes to help the community discover new ways to play The Long Dark.',
    icon: (
      <svg
        className="h-8 w-8"
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
    )
  }
};

// Challenges Overview Page
export const Challenges: Story = {
  args: {
    title: 'Challenges',
    description: 'Browse community-created challenges with leaderboards to track your progress and compete with other survivors. Test your skills against unique scenarios designed by the community.',
    contactMessage: 'Have an epic challenge idea?',
    contactSubtext: 'Share your creative challenge concepts with the community and see them come to life.',
    icon: (
      <svg
        className="h-8 w-8"
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
    )
  }
};

// Tournaments Overview Page
export const Tournaments: Story = {
  args: {
    title: 'Tournaments',
    description: 'Join organized competitive events with prizes ranging from cold hard cash to warm fuzzy feelings of community fame. Compete in structured tournaments with clear rules and rankings.',
    contactMessage: 'Want to organize a tournament?',
    contactSubtext: 'Propose your tournament format and rules to create exciting competitive events for the community.',
    icon: (
      <svg
        className="h-8 w-8"
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
    )
  }
};

// Standard version for content pages
export const Minimal: Story = {
  args: {
    title: 'Content Overview',
    description: 'Browse through our collection of community-created content. Use the filters to find exactly what you\'re looking for.',
    contactMessage: 'Want to contribute?',
    contactSubtext: 'Share your ideas and feedback with the community.',
    icon: (
      <svg
        className="h-8 w-8"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
        />
      </svg>
    )
  },
  parameters: {
    docs: {
      description: {
        story: 'Standard PageHero layout - ideal for general content pages, user profiles, or other non-homepage pages'
      }
    }
  }
};

// Theme Comparison - Overview Page Example
export const ThemeComparison: Story = {
  render: () => (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="bg-white min-h-screen">
        <div className="p-4 bg-gray-100 text-center font-semibold text-gray-900">
          Light Theme - Overview Page
        </div>
        <PageHero
          title="Custom Codes"
          description="Discover and share custom game configuration codes that enable unique challenges and gameplay experiences."
          contactMessage="Want to share your custom code?"
          contactSubtext="Submit your codes to the community."
          icon={
            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          }
        />
      </div>
      <div className="bg-slate-900 min-h-screen dark">
        <div className="p-4 bg-slate-800 text-center font-semibold text-slate-100">
          Dark Theme - Overview Page
        </div>
        <PageHero
          title="Custom Codes"
          description="Discover and share custom game configuration codes that enable unique challenges and gameplay experiences."
          contactMessage="Want to share your custom code?"
          contactSubtext="Submit your codes to the community."
          icon={
            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          }
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Side-by-side comparison of light and dark theme implementations for overview pages'
      }
    }
  }
};
