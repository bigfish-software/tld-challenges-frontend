import type { Meta, StoryObj } from '@storybook/react';
import { NotFoundPageLayout } from './NotFoundPageLayout';
import { ThemeProvider } from '@/contexts/ThemeContext';

const meta = {
  title: 'Pages/NotFoundPage',
  component: NotFoundPageLayout,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A beautifully designed 404 page with gaming theme, including header and footer. Use the theme switcher in the toolbar to test light and dark themes.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof NotFoundPageLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: 'The default 404 page layout with header, content, and footer. Features gaming-themed messaging and navigation options for lost users.',
      },
    },
  },
};
