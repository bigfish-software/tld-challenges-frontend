import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from './Footer';

const meta = {
  title: 'Layout/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'responsive'
    },
    docs: {
      description: {
        component: `
The site footer with community links and information.

## Key Features
- **Community Links**: GitHub, Discord, Twitch channels with proper icons
- **External Links Integration**: Uses centralized external links configuration
- **TLD-Themed Tagline**: Gaming community-focused messaging
- **Responsive Layout**: Adaptive design for all screen sizes
- **Theme Support**: Full light/dark theme variants

## Available Stories
- **Default**: Complete footer with all community links and information
- **Mobile**: Mobile viewport testing for responsive layout behavior
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The default footer with community links and brand information. Use the theme switcher in the toolbar to test light and dark themes.',
      },
    },
  },
};

/**
 * Mobile viewport view to test responsive design and layout behavior.
 * Shows how community links and content adapt to smaller screens.
 */
export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    },
    docs: {
      description: {
        story: 'Footer component on mobile devices. Tests community links layout, spacing, and responsive behavior on small screens.'
      },
      story: {
        inline: false,
        iframeHeight: 400
      }
    }
  },
  render: () => (
    <div style={{ maxWidth: '375px', margin: '0 auto' }}>
      <style>{`
        /* Force mobile layout in Storybook docs */
        .mobile-footer-demo .md\\:grid-cols-4 { 
          grid-template-columns: repeat(1, minmax(0, 1fr)) !important; 
        }
        .mobile-footer-demo .md\\:col-span-2 { 
          grid-column: span 1 / span 1 !important; 
        }
        .mobile-footer-demo .sm\\:flex-row { 
          flex-direction: column !important; 
        }
        .mobile-footer-demo .sm\\:mt-0 { 
          margin-top: 0.5rem !important; 
        }
        .mobile-footer-demo .sm\\:justify-between { 
          justify-content: center !important; 
        }
      `}</style>
      <div className="bg-white dark:bg-slate-900 mobile-footer-demo">
        <Footer />
      </div>
    </div>
  )
};
