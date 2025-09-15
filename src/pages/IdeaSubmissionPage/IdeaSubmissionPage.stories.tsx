import type { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { IdeaSubmissionPage } from './IdeaSubmissionPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false }
  }
});

const meta: Meta<typeof IdeaSubmissionPage> = {
  title: 'Pages/IdeaSubmissionPage',
  component: IdeaSubmissionPage,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Story />
        </BrowserRouter>
      </QueryClientProvider>
    )
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Complete page for submitting community ideas. Features hero section, breadcrumbs, descriptive guidelines, and the idea submission form with captcha validation.'
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ThemeComparison: Story = {
  render: () => (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="bg-white min-h-screen">
        <div className="p-4 bg-gray-100 text-center font-semibold text-gray-900">
          Light Theme
        </div>
        <IdeaSubmissionPage />
      </div>
      <div className="bg-slate-900 min-h-screen dark">
        <div className="p-4 bg-slate-800 text-center font-semibold text-slate-100">
          Dark Theme
        </div>
        <IdeaSubmissionPage />
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