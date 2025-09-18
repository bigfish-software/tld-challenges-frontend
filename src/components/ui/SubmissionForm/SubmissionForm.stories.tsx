import type { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { SubmissionForm } from './SubmissionForm';
import type { ChallengeResponse } from '../../../types/api';

// Mock challenge data
const mockChallenges: ChallengeResponse[] = [
  {
    id: 1,
    documentId: '1',
    name: 'Survive 100 Days',
    slug: 'survive-100-days',
    description_short: 'Survive 100 days in any region',
    difficulty: 'Medium' as const,
    is_featured: false,
    has_leaderboard: true,
    submission_result_sorting: 'DESC',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    publishedAt: '2024-01-01T00:00:00Z',
    creators: [],
    custom_code: null,
    tournaments: [],
    rules: [],
    faqs: [],
    submissions: []
  },
  {
    id: 2,
    documentId: '2',
    name: 'Speed Run Mystery Lake',
    slug: 'speed-run-mystery-lake',
    description_short: 'Complete Mystery Lake as fast as possible',
    difficulty: 'Hard' as const,
    is_featured: true,
    has_leaderboard: true,
    submission_result_sorting: 'ASC',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    publishedAt: '2024-01-01T00:00:00Z',
    creators: [],
    custom_code: null,
    tournaments: [],
    rules: [],
    faqs: [],
    submissions: []
  }
];

// Create a query client for Storybook
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const meta: Meta<typeof SubmissionForm> = {
  title: 'Forms/SubmissionForm',
  component: SubmissionForm,
  decorators: [
    (Story) => (
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <div className="max-w-4xl mx-auto p-6">
            <Story />
          </div>
        </QueryClientProvider>
      </BrowserRouter>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
Submission form for challenge runs with comprehensive validation:

**Result Field Validation Examples:**
- Days: \`98d\`
- Time periods: \`9d 20h 21m\`
- Time format: \`10:30:12.123\`
- Numbers: \`501321\`

The result field is now optional but validates input when provided.
        `,
      },
    },
  },
  argTypes: {
    challenges: {
      description: 'Array of available challenges',
    },
    preselectedChallengeId: {
      description: 'ID of preselected challenge',
    },
    challengeName: {
      description: 'Name of challenge for success message',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    challenges: mockChallenges,
  },
};

export const WithPreselectedChallenge: Story = {
  args: {
    challenges: mockChallenges,
    preselectedChallengeId: 1,
    challengeName: 'Survive 100 Days',
  },
  parameters: {
    docs: {
      description: {
        story: 'Form with a preselected challenge, useful when coming from a specific challenge page.',
      },
    },
  },
};

export const EmptyChallengeList: Story = {
  args: {
    challenges: [],
  },
  parameters: {
    docs: {
      description: {
        story: 'Form state when no challenges are available.',
      },
    },
  },
};

export const ResultValidationExamples: Story = {
  args: {
    challenges: mockChallenges,
    preselectedChallengeId: 1,
  },
  parameters: {
    docs: {
      description: {
        story: `
Use this story to test the result field validation. Try entering these values:

**Valid formats:**
- \`98d\` (days only)
- \`9d 20h 21m\` (time periods)
- \`10:30:12.123\` (time format with milliseconds)
- \`45:30\` (minutes:seconds)
- \`1:23:45\` (hours:minutes:seconds)
- \`501321\` (numbers only)

**Invalid formats:**
- \`invalid text\`
- \`12:60\` (invalid minutes)
- \`12:30:60\` (invalid seconds)
- \`abc123\`
- Empty field (should pass as field is optional)
        `,
      },
    },
  },
};