import type { Meta, StoryObj } from '@storybook/react';
import { TournamentsPage } from './TournamentsPage';

const meta: Meta<typeof TournamentsPage> = {
  title: 'Pages/TournamentsPage',
  component: TournamentsPage,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
The Tournaments overview page showcases competitive gaming tournaments with comprehensive filtering and registration capabilities.

## Features
- **Tournament Filtering**: Filter by status, format, game mode, entry fee, and tournament type
- **Competition Insights**: Shows prizes, participant counts, registration deadlines
- **Multiple Formats**: Support for various tournament formats (elimination, round robin, etc.)
- **Registration Status**: Clear indication of registration status and deadlines
- **Featured Tournaments**: Highlighted high-value or premium tournaments

## Mock Data
Includes 6 diverse tournaments from free beginner events to high-stakes championship competitions.
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
        story: 'The complete tournaments overview page with comprehensive tournament information, filtering, and registration management.'
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
        <TournamentsPage />
      </div>
      <div className="bg-slate-900 min-h-screen dark">
        <div className="p-4 bg-slate-800 text-center font-semibold text-slate-100">
          Dark Theme
        </div>
        <TournamentsPage />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Side-by-side comparison of the tournaments page in light and dark themes'
      }
    }
  }
};
