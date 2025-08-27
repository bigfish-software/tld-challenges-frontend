import type { Meta, StoryObj } from '@storybook/react';
import { PrivacyPolicyPage } from './PrivacyPolicyPage';

const meta: Meta<typeof PrivacyPolicyPage> = {
  title: 'Pages/PrivacyPolicyPage',
  component: PrivacyPolicyPage,
  parameters: {
    layout: 'fullscreen',
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
    },
    viewport: {
      defaultViewport: 'responsive'
    }
  },
  tags: ['autodocs'],
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
 * Useful for testing theme consistency and readability across both modes.
 */
export const ThemeComparison: Story = {
  render: () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-center">Light Theme</h3>
        <div className="border border-slate-300 rounded-lg overflow-hidden">
          <div className="bg-white text-slate-900 p-6 h-96 overflow-y-auto">
            <h1 className="text-2xl font-bold text-primary-700 mb-4">Privacy Policy</h1>
            <p className="text-slate-600 mb-4">Last updated: August 27, 2025</p>
            <div className="prose prose-slate max-w-none">
              <h2 className="text-xl font-semibold mb-3">Overview</h2>
              <p className="mb-4">
                TLD Challenges is a community-driven platform for The Long Dark players to discover 
                custom game codes, participate in challenges and tournaments, and submit their completion runs.
              </p>
              <h2 className="text-xl font-semibold mb-3">Data We Collect</h2>
              <p className="mb-4">
                When you submit a challenge completion run, we collect minimal information necessary 
                for platform functionality...
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-center">Dark Theme</h3>
        <div className="border border-slate-700 rounded-lg overflow-hidden">
          <div className="bg-slate-900 text-slate-100 p-6 h-96 overflow-y-auto">
            <h1 className="text-2xl font-bold text-primary-300 mb-4">Privacy Policy</h1>
            <p className="text-slate-300 mb-4">Last updated: August 27, 2025</p>
            <div className="prose prose-invert max-w-none">
              <h2 className="text-xl font-semibold mb-3">Overview</h2>
              <p className="mb-4">
                TLD Challenges is a community-driven platform for The Long Dark players to discover 
                custom game codes, participate in challenges and tournaments, and submit their completion runs.
              </p>
              <h2 className="text-xl font-semibold mb-3">Data We Collect</h2>
              <p className="mb-4">
                When you submit a challenge completion run, we collect minimal information necessary 
                for platform functionality...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Side-by-side comparison of light and dark theme implementations for the privacy policy content.'
      }
    }
  }
};
