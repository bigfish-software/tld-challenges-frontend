# Component Development with Storybook

This document describes the component development workflow using Storybook in the TLD Challenges frontend application.

## Overview

Storybook serves as the primary tool for component development, documentation, and manual testing in the TLD Challenges frontend. It provides an isolated environment for building and testing UI components without the need for the full application context.

## Development Workflow

1. **Component Creation**: Build React components with TypeScript
2. **Story Development**: Create comprehensive Storybook stories for all component variants
3. **Visual Testing**: Test components in isolation across different states and props
4. **Documentation**: Generate automatic documentation from stories and component props
5. **Manual Testing**: Interactive testing of component behavior and accessibility

## Component Organization

```
src/components/
├── ui/                 # All UI components (base + domain-specific)
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.stories.tsx
│   │   └── index.ts
│   ├── ChallengeCard/
│   │   ├── ChallengeCard.tsx
│   │   ├── ChallengeCard.stories.tsx
│   │   └── index.ts
│   └── CustomCodeCard/
└── layout/             # Layout components
    ├── Header/
    │   ├── Header.tsx
    │   ├── Header.stories.tsx
    │   └── index.ts
    └── PageLayout/
```

## Creating a New Component

### 1. Component Implementation

```typescript
// src/components/ui/Button/Button.tsx
import React from 'react';
import clsx from 'clsx';

export interface ButtonProps {
  /** The variant style of the button */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  /** The size of the button */
  size?: 'sm' | 'md' | 'lg';
  /** Whether the button is in a loading state */
  loading?: boolean;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** The button type */
  type?: 'button' | 'submit' | 'reset';
  /** Click handler */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Button contents */
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  type = 'button',
  onClick,
  children,
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-colors focus:outline-none';
  
  const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-600',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700',
    ghost: 'text-gray-700 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800',
  };
  
  const sizes = {
    sm: 'px-3 py-2 text-sm rounded-md',
    md: 'px-4 py-2 text-base rounded-md',
    lg: 'px-6 py-3 text-lg rounded-lg',
  };
  
  return (
    <button
      type={type}
      className={clsx(
        baseClasses,
        variants[variant],
        sizes[size],
        loading && 'cursor-wait',
        disabled && 'opacity-50 cursor-not-allowed',
      )}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading && (
        <svg className="w-4 h-4 mr-2 animate-spin" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.25" />
          <path d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4z" fill="currentColor" />
        </svg>
      )}
      {children}
    </button>
  );
};
```

### 2. Component Index File

```typescript
// src/components/ui/Button/index.ts
export { Button } from './Button';
export type { ButtonProps } from './Button';
```

### 3. Storybook Stories

```typescript
// src/components/ui/Button/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile button component supporting multiple variants, sizes, and states.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline', 'ghost'],
      description: 'The visual style of the button',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the button',
    },
    loading: {
      control: 'boolean',
      description: 'Whether the button is in a loading state',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default button
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

// Secondary variant
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

// Outline variant
export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Outline Button',
  },
};

// Ghost variant
export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost Button',
  },
};

// Size variants
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col space-y-4">
      <Button size="sm">Small Button</Button>
      <Button size="md">Medium Button</Button>
      <Button size="lg">Large Button</Button>
    </div>
  ),
};

// States
export const States: Story = {
  render: () => (
    <div className="flex flex-col space-y-4">
      <Button>Normal Button</Button>
      <Button loading>Loading Button</Button>
      <Button disabled>Disabled Button</Button>
    </div>
  ),
};

// Theme Testing
export const ThemeVariants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      <div className="p-4 bg-white">
        <h3 className="mb-4 text-lg font-medium">Light Theme</h3>
        <div className="flex flex-col space-y-2">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
      </div>
      <div className="p-4 bg-gray-900 dark">
        <h3 className="mb-4 text-lg font-medium text-white">Dark Theme</h3>
        <div className="flex flex-col space-y-2">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
      </div>
    </div>
  ),
};
```

## Component Development Best Practices

### 1. Component Structure

- **Functional Components**: Use functional components with hooks
- **TypeScript Props Interface**: Define clear props interface with JSDoc comments
- **Default Props**: Set sensible defaults using destructuring
- **Logical Organization**: Group related props and functionality

### 2. Story Development

- **Component Variants**: Create stories for all component variants
- **Interactive Controls**: Use argTypes to provide interactive controls
- **Documentation**: Add descriptions for component and props
- **Theme Testing**: Test both light and dark theme variants
- **State Examples**: Show loading, error, and empty states

### 3. Accessibility Testing

- **Keyboard Navigation**: Test keyboard accessibility in stories
- **Screen Reader Support**: Use proper ARIA attributes
- **Color Contrast**: Ensure proper contrast ratios in both themes
- **Focus Management**: Proper focus handling for interactive components

### 4. Performance Considerations

- **Memoization**: Use React.memo for expensive components
- **Dependency Arrays**: Properly manage dependencies in hooks
- **Event Handling**: Avoid anonymous functions in render
- **Rendering Optimization**: Consider virtualization for large lists

## Running Storybook

```bash
# Start Storybook development server
npm run storybook

# Build Storybook for production
npm run build-storybook

# Run Storybook tests
npm run test-storybook
```

## Key Benefits

- **Isolated Development**: Build components without application dependencies
- **Visual Documentation**: Automatically generated component documentation
- **Accessibility Testing**: Built-in accessibility checks with addon-a11y
- **Responsive Testing**: Test components across different viewport sizes
- **Theme Testing**: Test both light and dark theme variants for all components
- **Interactive Testing**: Validate user interactions and component behavior

## Related Documentation

- **[Component Architecture](./component-architecture.md)**: Component design patterns
- **[Colors & Theme](./colors.md)**: Color system and theme implementation
- **[Storybook Documentation](https://storybook.js.org/docs)**: Official Storybook documentation
