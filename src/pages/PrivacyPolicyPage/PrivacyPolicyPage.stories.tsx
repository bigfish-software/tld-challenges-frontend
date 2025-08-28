import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { PrivacyPolicyPage } from './PrivacyPolicyPage';
import { PrivacyPolicyContent } from './PrivacyPolicyContent';

const meta: Meta<typeof PrivacyPolicyPage> = {
  title: 'Pages/PrivacyPolicyPage',
  component: PrivacyPolicyPage,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'responsive'
    },
    docs: {
      description: {
        component: `
The Privacy Policy page provides comprehensive information about TLD Challenges' data practices and privacy protections.

## Key Features
- **Minimal Data Collection**: Emphasizes anonymous submissions and no user tracking
- **Community-Focused**: Built specifically for The Long Dark gaming community
- **GDPR Compliant**: Addresses international privacy standards
- **External Links Integration**: Uses centralized external links configuration
- **Theme Support**: Fully responsive with light/dark theme variants

## Available Stories
- **Default**: Complete page with all sections and external links
- **Mobile**: Responsive design testing for mobile devices
- **ThemeComparison**: Side-by-side light and dark theme comparison
        `
      }
    }
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  argTypes: {
    // No props for this page component
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default view of the Privacy Policy page with full header and footer integration.
 * Shows the complete legal document with all sections and external links.
 */
export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Complete Privacy Policy page with header, footer, and all content sections. Uses external links configuration for support contacts.'
      }
    }
  }
};

/**
 * Theme comparison showing both light and dark variants side by side.
 * Uses actual PrivacyPolicyContent component without header and footer.
 */
export const ThemeComparison: Story = {
  render: () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-center">Light Theme</h3>
        <div className="border border-slate-300 rounded-lg overflow-hidden">
          <div className="bg-white text-slate-900">
            <PrivacyPolicyContent />
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-center">Dark Theme</h3>
        <div className="border border-slate-700 rounded-lg overflow-hidden">
          <div className="dark bg-slate-900 text-slate-100">
            <PrivacyPolicyContent />
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Side-by-side comparison of light and dark theme implementations using the actual PrivacyPolicyContent component.'
      }
    }
  }
};
