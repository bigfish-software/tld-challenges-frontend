# Project Structure

This document outlines the structure of the TLD Challenges frontend codebase, explaining the purpose and organization of directories and key files.

## Root Directory Structure

```
src/
├── App.tsx              # Main application component
├── index.css           # Global CSS and Tailwind imports
├── main.tsx            # Application entry point
├── vite-env.d.ts       # Vite environment type definitions
├── assets/             # Static assets (images, fonts)
├── components/         # Reusable React components
├── config/             # Application configuration
├── contexts/           # React context providers
├── hooks/              # Custom React hooks
├── pages/              # Route-based page components
├── services/           # API service layer
├── styles/             # Global styles and Tailwind
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## Components Directory

Components are organized by their function and scope within the application:

```
components/
├── ui/                 # UI components (including domain-specific components)
│   ├── Accordion/
│   ├── Breadcrumb/
│   ├── Button/
│   ├── ChallengeCard/
│   ├── CustomCodeCard/
│   ├── DonationSection/
│   ├── ErrorDisplay/
│   ├── FeatureCard/
│   ├── FilterPanel/
│   ├── icons/
│   ├── LoadingSpinner/
│   ├── NoDataDisplay/
│   ├── PageHero/
│   ├── ResultsHeader/
│   ├── RichTextRenderer/
│   ├── TournamentCard/
│   └── TournamentSection/
└── layout/             # Layout components (header, footer, page structure)
    ├── ContentGrid/
    ├── Footer/
    ├── Header/
    └── PageLayout/
```

### Component Structure

Each component typically follows this file structure:

```
ComponentName/
├── ComponentName.tsx          # Main component implementation
├── index.ts                   # Re-export for easy imports
└── [ComponentName.stories.tsx] # Optional: Storybook stories for component
```

## Pages Directory

Pages represent route-level components that correspond to specific URLs:

```
pages/
├── HomePage/
├── ChallengesPage/
├── ChallengeDetailPage/
├── CustomCodesPage/
├── CustomCodeDetailPage/
├── TournamentsPage/
├── TournamentDetailPage/
├── NotFoundPage/
└── PrivacyPolicyPage/
```

### Page Structure

Each page typically follows this file structure:

```
PageName/
├── PageName.tsx              # Main page component
├── PageNameContent.tsx       # Content component (for easier testing)
├── PageName.stories.tsx      # Storybook stories for page layout
└── index.ts                  # Re-export for easy imports
```

## Hooks Directory

Custom React hooks for shared logic:

```
hooks/
├── api.ts                    # API-related hooks using React Query
├── useErrorHandler.ts        # Error handling logic
└── index.ts                  # Re-export for easy imports
```

## Services Directory

API service layer for backend communication:

```
services/
└── api.ts                    # Axios configuration and base API setup
```

## Contexts Directory

React context providers for application-wide state:

```
contexts/
└── ThemeContext.tsx          # Theme (light/dark) context provider
```

## Config Directory

Application configuration and constants:

```
config/
├── externalLinks.ts          # External URLs configuration
└── index.ts                  # Re-export for easy imports
```

## Types Directory

TypeScript type definitions:

```
types/
├── api.ts                    # API response and request types
├── common.ts                 # Shared types used across the application
├── errors.ts                 # Error types and interfaces
├── richText.ts               # Rich text content types
└── index.ts                  # Re-export for easy imports
```

## Utils Directory

Utility functions and helpers:

```
utils/
├── images.ts                 # Image processing utilities
├── logger.ts                 # Logging utilities
├── richText.ts               # Rich text processing
└── index.ts                  # Re-export for easy imports
```

## Styles Directory

Global styles and Tailwind configuration:

```
styles/
└── colors.css                # Custom color variables and theme settings
```

## Assets Directory

Static assets used in the application:

```
assets/
├── challanges_hero.png
├── custom_code_hero.png
├── homepage_hero.png
├── tournaments_hero.png
└── fonts/
    ├── Oswald/
    └── TLDHeadlineOne/
```

## Naming Conventions

### Files and Directories

- **Components**: PascalCase (e.g., `Button.tsx`, `ChallengeCard.tsx`)
- **Hooks**: camelCase with 'use' prefix (e.g., `useErrorHandler.ts`)
- **Utilities**: camelCase (e.g., `logger.ts`, `images.ts`)
- **Types**: camelCase (e.g., `api.ts`, `common.ts`)

### Code Conventions

- **Interfaces/Types**: PascalCase (e.g., `interface ButtonProps`, `type ChallengeFilters`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `const API_ENDPOINTS`, `const COLORS`)
- **Functions**: camelCase (e.g., `handleSubmit`, `formatDate`)
- **React Components**: PascalCase (e.g., `export const Button = () => {}`)

## Import Patterns

We use absolute imports with the `@/` prefix:

```typescript
// Good - absolute imports
import { Button } from '@/components/ui/Button';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { formatDate } from '@/utils/dates';

// Avoid - relative imports with multiple levels
import { Button } from '../../../components/ui/Button';
```

## Related Documentation

- **[Component Architecture](./component-architecture.md)**: Component design patterns
- **[API Integration](./api.md)**: Backend API integration patterns
- **[Colors & Theme](./colors.md)**: Color system and theme implementation
