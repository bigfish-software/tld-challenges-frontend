import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile button component with multiple variants and sizes, optimized for gaming UI with dark theme support.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outline', 'ghost'],
      description: 'The visual style variant of the button',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'The size of the button',
    },
    isLoading: {
      control: { type: 'boolean' },
      description: 'Shows loading spinner and disables the button',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disables the button',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Primary Stories
export const Primary: Story = {
  args: {
    children: 'Join Challenge',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'View Details',
    variant: 'secondary',
  },
};

export const Outline: Story = {
  args: {
    children: 'Cancel',
    variant: 'outline',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Settings',
    variant: 'ghost',
  },
};

// Size variants
export const Small: Story = {
  args: {
    children: 'Small Button',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    children: 'Medium Button',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    children: 'Large Button',
    size: 'lg',
  },
};

// State variants
export const Loading: Story = {
  args: {
    children: 'Submitting...',
    isLoading: true,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
};

// Gaming context examples
export const GamingActions: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="space-x-4">
        <Button variant="primary">Start Challenge</Button>
        <Button variant="secondary">View Leaderboard</Button>
        <Button variant="outline">Submit Run</Button>
        <Button variant="ghost">Settings</Button>
      </div>
      <div className="space-x-4">
        <Button variant="primary" size="lg">Join Tournament</Button>
        <Button variant="outline" size="sm">Quick Filter</Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Common button combinations used in gaming contexts within the TLD Challenges platform.',
      },
    },
  },
};
