import type { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { within, userEvent } from '@storybook/test';
import { IdeaForm } from './IdeaForm';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false }
  }
});

const meta: Meta<typeof IdeaForm> = {
  title: 'Forms/IdeaForm',
  component: IdeaForm,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <div className="max-w-2xl mx-auto p-6">
          <Story />
        </div>
      </QueryClientProvider>
    )
  ],
  parameters: {
    docs: {
      description: {
        component: 'Form for submitting community ideas for new challenges, custom codes, or tournaments. Features the same styling and validation patterns as the submission form.'
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {}
};

export const WithPrefilledData: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Fill form with sample data
    await userEvent.selectOptions(canvas.getByLabelText(/idea type/i), 'Challenge');
    await userEvent.type(canvas.getByLabelText(/creator name/i), 'TestCreator');
    await userEvent.type(
      canvas.getByLabelText(/description/i), 
      'A challenging survival scenario in the remote wilderness where players must survive 50 days with limited resources and harsh weather conditions.'
    );
  }
};

export const ValidationErrors: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Try to submit empty form to show validation
    const submitButton = canvas.getByRole('button', { name: /submit idea/i });
    await userEvent.click(submitButton);
  }
};