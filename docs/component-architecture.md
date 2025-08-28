# Component Architecture Guidelines

## Overview

This document establishes patterns and principles for creating consistent, maintainable React components that follow proper encapsulation and styling patterns.

## Core Principles

### 1. Component Encapsulation
**Components should own their styling and visual presentation.**

✅ **DO**: Use component props to control styling variations
```tsx
// Good - styling variations controlled by props
<Button variant="primary" size="lg" shadow="xl" hoverEffect="both" />
```

❌ **DON'T**: Use className props to override component styling
```tsx
// Bad - breaks encapsulation and consistency
<Button className="shadow-xl hover:scale-105 hover:shadow-2xl" />
```

### 2. Prop-Based Styling System
**All styling variations should be handled through dedicated props, not external overrides.**

#### Button Component Example
```tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  hoverEffect?: 'none' | 'scale' | 'shadow' | 'both';
  fullWidth?: boolean;
  responsive?: string; // For responsive sizing like "sm:min-w-[140px] lg:w-full"
}
```

## Component Design Patterns

### 1. Base Component Structure
```tsx
interface ComponentProps {
  // Content props
  title: string;
  description?: string;
  
  // Behavioral props
  onClick?: () => void;
  disabled?: boolean;
  
  // Styling variant props (NOT className)
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  
  // Layout props
  fullWidth?: boolean;
  responsive?: string;
}

export const Component = ({
  title,
  variant = 'primary',
  size = 'md',
  ...props
}: ComponentProps) => {
  const baseClasses = "base-styling-classes";
  const variantClasses = getVariantClasses(variant);
  const sizeClasses = getSizeClasses(size);
  
  return (
    <div className={clsx(baseClasses, variantClasses, sizeClasses)}>
      {/* Component content */}
    </div>
  );
};
```

### 2. Conditional Styling with clsx
```tsx
import clsx from 'clsx';

const buttonClasses = clsx(
  // Base classes
  'px-4 py-2 font-medium rounded-md transition-all duration-200',
  
  // Variant classes
  {
    'bg-primary-600 text-white hover:bg-primary-700': variant === 'primary',
    'bg-secondary-100 text-secondary-900 hover:bg-secondary-200': variant === 'secondary',
    'border border-slate-300 bg-white hover:bg-slate-50': variant === 'outline',
  },
  
  // Size classes
  {
    'text-sm px-3 py-1.5': size === 'sm',
    'text-base px-4 py-2': size === 'md',
    'text-lg px-6 py-3': size === 'lg',
  },
  
  // Shadow effects
  {
    'shadow-sm': shadow === 'sm',
    'shadow-md': shadow === 'md',
    'shadow-lg': shadow === 'lg',
    'shadow-xl': shadow === 'xl',
  },
  
  // Hover effects
  {
    'hover:scale-105': hoverEffect === 'scale' || hoverEffect === 'both',
    'hover:shadow-2xl': hoverEffect === 'shadow' || hoverEffect === 'both',
  },
  
  // Layout
  {
    'w-full': fullWidth,
  },
  
  // Responsive (when needed)
  responsive
);
```

### 3. Design System Integration
**Components should implement a consistent design system with:**

- **Color Palette**: Primary (plum/purple), Secondary (burgundy/red), Neutral (slate)
- **Spacing Scale**: Consistent padding/margin using Tailwind's spacing scale
- **Typography**: Consistent font sizes, weights, and line heights
- **Effects**: Standardized shadows, hover states, and transitions

## Styling Patterns

### 1. Theme Support
```tsx
// Always include dark mode support
const cardClasses = clsx(
  'bg-white dark:bg-slate-800',
  'border border-slate-200 dark:border-slate-700',
  'text-slate-900 dark:text-slate-100'
);
```

### 2. Interactive States
```tsx
// Provide consistent hover/focus states
const interactiveClasses = clsx(
  'transition-all duration-200',
  'hover:shadow-md hover:border-primary-300',
  'focus:outline-none focus:ring-2 focus:ring-primary-500',
  'group-hover:scale-105' // For nested interactive elements
);
```

### 3. Responsive Design
```tsx
// Handle responsiveness through props or built-in classes
const responsiveClasses = clsx(
  'flex flex-col sm:flex-row',
  'gap-4 sm:gap-6 lg:gap-8',
  'p-4 sm:p-6 lg:p-8'
);
```

## Component Categories

### 1. UI Components (src/components/ui/)
**Base building blocks with no business logic**

Examples: Button, Card, Input, Modal
- Should be highly reusable
- Focus on styling variants and states
- No external dependencies except styling

### 2. Layout Components (src/components/layout/)
**Structure and positioning components**

Examples: Header, Footer, Sidebar
- Handle page structure and navigation
- Can consume UI components
- May have some business logic for layout behavior

### 3. Feature Components (src/components/features/)
**Business-specific functionality**

Examples: UserProfile, ProductCard, SearchResults
- Combine UI components with business logic
- Handle data fetching and state management
- Domain-specific styling and behavior

## Anti-Patterns to Avoid

### ❌ className Override Anti-Pattern
```tsx
// DON'T: External styling overrides
<Button className="shadow-xl bg-red-500 hover:bg-red-600" />
<Card className="border-2 border-blue-500 p-8" />
```

### ❌ Inline Styles
```tsx
// DON'T: Inline styles break consistency
<Button style={{ backgroundColor: 'red', padding: '20px' }} />
```

### ❌ One-Off Components
```tsx
// DON'T: Create components that can't be reused
const SpecificButton = () => (
  <button className="very-specific-styling-that-only-works-here">
    Click me
  </button>
);
```

## Implementation Checklist

When creating or updating components:

- [ ] **Encapsulation**: Component owns all its styling
- [ ] **Props**: Styling controlled through dedicated props, not className
- [ ] **Variants**: Clear variant system for different styles
- [ ] **Responsive**: Proper responsive behavior built-in
- [ ] **Theme**: Dark/light mode support
- [ ] **Accessibility**: Proper ARIA attributes and keyboard support
- [ ] **TypeScript**: Proper interfaces with clear prop types
- [ ] **Consistency**: Follows established design system patterns

## Migration Strategy

When updating existing components that use className overrides:

1. **Identify Patterns**: Find common className usage patterns
2. **Create Props**: Convert patterns to dedicated component props
3. **Update Interface**: Add new props to component interface
4. **Implement Logic**: Use clsx to handle conditional styling
5. **Update Usage**: Replace className usage with new props
6. **Remove className**: Remove className prop from interface
7. **Test**: Verify visual consistency is maintained

## Examples

### Enhanced Button Component
```tsx
// Full implementation with all styling controlled by props
<Button
  variant="primary"
  size="lg"
  shadow="xl"
  hoverEffect="both"
  fullWidth
  responsive="sm:min-w-[140px] lg:w-full"
>
  Enhanced Button
</Button>
```

### FeatureCard Component
```tsx
// Clean interface with no className dependency
<FeatureCard
  title="Feature Title"
  description="Feature description text"
  icon={<IconComponent />}
  href="/feature-link"
  buttonText="Learn More"
/>
```

## Future Considerations

- **Design Tokens**: Consider implementing design tokens for more systematic styling
- **Component Library**: Build towards a comprehensive component library
- **Storybook**: Document all component variants and states
- **Testing**: Visual regression testing for component consistency

---

**Remember**: Good component architecture makes styling predictable, maintainable, and consistent across the entire application. Always prefer explicit props over implicit className overrides.
