import type { Meta, StoryObj } from '@storybook/react';
import { CustomCodesPage } from './CustomCodesPage';

const meta: Meta<typeof CustomCodesPage> = {
  title: 'Pages/CustomCodesPage',
  component: CustomCodesPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
The Custom Codes overview page showcases the complete layout for browsing custom game configurations.

## Features
- **PageHero**: Introduces custom codes with call-to-action
- **FilterPanel**: Filter by difficulty, tags, and creator
- **ResultsHeader**: Search, sort, and view mode controls
- **ContentGrid**: Responsive grid/list layout for custom code cards
- **Interactive Filtering**: Real-time search and filter application

## Mock Data
Includes 6 sample custom codes with various difficulties and tags to demonstrate filtering and sorting functionality.
        `
      }
    }
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The complete custom codes overview page with all interactive features enabled. Try searching, filtering, and changing view modes.'
      }
    }
  }
};

export const ThemeComparison: Story = {
  render: () => (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="bg-white min-h-screen">
        <div className="p-4 bg-gray-100 text-center font-semibold text-gray-900">
          Light Theme
        </div>
        <CustomCodesPage />
      </div>
      <div className="bg-slate-900 min-h-screen dark">
        <div className="p-4 bg-slate-800 text-center font-semibold text-slate-100">
          Dark Theme
        </div>
        <CustomCodesPage />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Side-by-side comparison of the custom codes page in light and dark themes'
      }
    }
  }
};
