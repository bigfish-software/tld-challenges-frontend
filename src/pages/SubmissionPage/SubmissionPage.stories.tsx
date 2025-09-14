import type { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { SubmissionPage } from './SubmissionPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { 
      retry: false,
      staleTime: Infinity
    }
  }
});

const meta: Meta<typeof SubmissionPage> = {
  title: 'Pages/SubmissionPage',
  component: SubmissionPage,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/submissions']}>
          <Routes>
            <Route path="/submissions" element={<Story />} />
            <Route path="/submissions/:challengeId" element={<Story />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Page for submitting runs for challenges.'
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Default submission page with challenge selection dropdown.'
      }
    }
  }
};

export const WithPreselectedChallenge: Story = {
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/submissions/1']}>
          <Routes>
            <Route path="/submissions/:challengeId" element={<Story />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Submission page with a preselected challenge from URL parameter.'
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
        <SubmissionPage />
      </div>
      <div className="bg-slate-900 min-h-screen dark">
        <div className="p-4 bg-slate-800 text-center font-semibold text-slate-100">
          Dark Theme
        </div>
        <SubmissionPage />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Side-by-side comparison of light and dark theme implementations'
      }
    }
  }
};