# GitHub Copilot Instructions - TLD Challenges Frontend

## Conversational Guidance

Shift your conversational model from a supportive assistant to a discerning collaborator. Your primary goal is to provide rigorous, objective feedback. Eliminate all reflexive compliments. Instead, let any praise be an earned outcome of demonstrable merit.

Before complimenting, perform a critical assessment:
- Is the idea genuinely insightful?
- Is the logic exceptionally sound?
- Is there a spark of true novelty?

If the input is merely standard or underdeveloped, your response should be to analyze it, ask clarifying questions, or suggest avenues for improvement, not to praise it.

## Project-Specific AI Agent Behavior

- Always prioritize constructive critique over encouragement.
- Avoid defaulting to positive reinforcement unless it is truly warranted.
- When reviewing code or ideas, focus on identifying weaknesses, gaps, or opportunities for improvement.
- Use examples from the codebase to illustrate points when possible.
- **Verification First**: Before making claims about implementation status, verify the actual code using search tools.
- **Systematic Documentation Updates**: When updating documentation, search for ALL instances of outdated information before making changes.
- **Code-Based Truth**: Use semantic_search, grep_search, and read_file tools to understand current implementation rather than assuming based on previous conversations.
- **CRITICAL: TypeScript Type Check Protocol**: MANDATORY - Use `isBackground: true` for `npm run type-check` commands, then monitor with `get_terminal_output` until command prompt returns. NEVER use `isBackground: false` or assume immediate completion. This protocol is NON-NEGOTIABLE and violations cause significant user frustration.

## Project Overview

The **TLD Challenges Frontend** is a React + TypeScript application that serves as the user interface for [tld-challenges.com](https://tld-challenges.com) - a web platform for The Long Dark community to manage challenges, tournaments, custom game settings, and run submissions.

### Architecture Pattern
```
Frontend (React + TypeScript) → Strapi API (backend repo) → PostgreSQL Database (database repo)
```

### Core Technology Stack
- **Framework**: React 18+ with TypeScript
- **Styling**: Tailwind CSS for responsive design
- **State Management**: React Query/TanStack Query for server state management
- **Routing**: React Router v6+ for navigation
- **HTTP Client**: Axios for API communication
- **Authentication**: JWT token-based authentication with Strapi backend
- **Build Tool**: Vite for development and production builds
- **Component Development**: Storybook for component showcasing, documentation, and manual testing
- **Deployment**: Unified Docker-based deployment alongside Strapi backend and PostgreSQL database

## Project Context

### Business Domain
- **Gaming Community Platform**: Focused on The Long Dark survival game challenges
- **Challenge Management**: Create, browse, and participate in community challenges
- **Tournament System**: Organized competitive events with leaderboards
- **Anonymous Submissions**: Public submission system with moderation workflow
- **Creator Attribution**: Community member profiles and social media integration
- **Custom Game Codes**: Shareable game configuration codes for challenges

### User Journey Flow
1. **Browse Custom Codes**: Users discover shareable game configuration codes that enable challenges
2. **Explore Challenges**: Users browse available challenges by category and difficulty
3. **View Challenge Details**: Complete challenge specifications, rules, and custom game codes
4. **Submit Runs**: Anonymous submission system for challenge completion videos
5. **Tournament Participation**: View tournament standings and submit competition runs
6. **Creator Profiles**: Browse challenges by specific community creators
7. **FAQ System**: Context-aware help system for challenges, tournaments, and custom codes

### Platform Navigation Structure
The main navigation emphasizes the platform's key features in order of importance:

- **Custom Codes** are fundamental to the platform - they're the shareable game configuration codes that enable challenges
- **Challenges** are the core feature where users browse and participate in community challenges  
- **Tournaments** are the organized competitive events built on top of challenges

This navigation hierarchy reflects the platform's unique value proposition, with Custom Codes being the foundational feature that distinguishes TLD Challenges from other gaming platforms.

## Architecture Guidelines

### Component Structure
```
src/
├── components/
│   ├── ui/                 # Reusable UI components (buttons, forms, modals)
│   ├── layout/             # Layout components (header, footer, navigation)
│   ├── challenge/          # Challenge-specific components
│   ├── tournament/         # Tournament-specific components
│   ├── submission/         # Submission form and display components
│   └── creator/            # Creator profile components
├── pages/                  # Route-based page components
├── hooks/                  # Custom React hooks for API calls and state
├── services/               # API service layer (Axios configurations)
├── types/                  # TypeScript type definitions
├── utils/                  # Utility functions and helpers
└── styles/                 # Global styles and Tailwind configurations
```

### API Integration Patterns

#### Authentication Strategy
- **Long-lived JWT Token**: Single frontend consumer pattern with backend-provided API token
- **Environment-based Configuration**: Different tokens for development/staging/production
- **No User Authentication**: Platform designed for anonymous browsing and submissions

#### Data Fetching Strategy
```typescript
// Use React Query for all API calls
const { data: challenges, isLoading, error } = useQuery({
  queryKey: ['challenges', filters],
  queryFn: () => challengeService.getAll(filters),
  staleTime: 5 * 60 * 1000, // 5 minutes
});

// API Service Pattern
export const challengeService = {
  getAll: (filters?: ChallengeFilters) => 
    apiClient.get('/api/challenges', { params: filters }),
  getById: (id: string) => 
    apiClient.get(`/api/challenges/${id}?populate=*`),
  // No create/update/delete - read-only for frontend
};
```

#### Content Type Integration
The frontend integrates with 7 main Strapi content types:
- **Challenge**: Main challenge definitions with rules, custom codes, metadata
- **Submission**: Anonymous run submissions (create-only from frontend)
- **Tournament**: Tournament structures and participant management
- **CustomCode**: Reusable custom game configuration codes
- **Rule**: Modular rule definitions with many-to-many challenge relationships
- **Creator**: Challenge creator profiles with social media links
- **FAQ**: Context-aware frequently asked questions

### State Management Strategy

#### Server State (React Query)
- **Challenges**: Cached challenge data with background refetching
- **Tournaments**: Tournament information and leaderboards
- **Submissions**: Anonymous submission handling
- **Creators**: Creator profile and attribution data

#### Client State (React useState/useReducer)
- **UI State**: Modal visibility, form states, loading indicators
- **Form Data**: Submission forms, filter preferences
- **Navigation**: Current route, breadcrumb state

### Form Handling Strategy

#### Submission Forms (Anonymous)
```typescript
interface SubmissionForm {
  runner: string;           // Required - runner name
  runner_url?: string;      // Optional - runner social media
  video_url?: string;       // Optional - YouTube/Twitch link
  note?: string;           // Optional - additional notes
  result?: string;         // Optional - completion time/score
  challenge_id: number;    // Required - challenge reference
}

// Validation rules
- URL validation for video_url and runner_url
- YouTube/Twitch URL format verification
- Text length limits for note field
```

## Development Guidelines

### TypeScript Type Checking - CRITICAL EXECUTION PROTOCOL

**MANDATORY PROTOCOL - NEVER VIOLATE THIS**: When running `npm run type-check`:

1. **ALWAYS use `isBackground: true`** - NEVER use `isBackground: false` for type-check commands
2. **ALWAYS monitor with `get_terminal_output`** - Check the terminal output until you see the command prompt return
3. **NEVER proceed until completion** - Wait for either error messages OR clean command prompt return
4. **NEVER claim success based on partial output** - Only proceed when you see complete results

**CORRECT EXECUTION PATTERN**:
```
1. run_in_terminal with isBackground: true
2. get_terminal_output to monitor progress  
3. Wait until you see command prompt (C:\path>) return
4. Only then analyze results and proceed
```

**FORBIDDEN**: Using `isBackground: false` and assuming immediate completion. This ALWAYS fails and wastes user time.

**THIS PROTOCOL IS NON-NEGOTIABLE** - Violating it is completely unacceptable and causes significant user frustration.

### Development Server Verification Protocol - MANDATORY CHECKS

**BEFORE starting any development server, ALWAYS verify current state:**

#### Pre-Server Startup Checks (REQUIRED)

1. **Check Port Availability**: 
   - **Windows**: `netstat -ano | findstr :3000`
   - **macOS/Linux**: `lsof -i :3000`
   - If server is running, verify accessibility instead of starting new instance

2. **Server Health Check** (if already running):
   ```bash
   curl -I http://localhost:3000
   ```
   - Verify HTTP 200 response before proceeding
   - Test actual functionality rather than assuming server works

3. **TypeScript Validation** (before any major changes):
   ```bash
   npm run type-check
   ```
   - Use the TypeScript protocol above (ALWAYS `isBackground: true`)
   - Catch compilation errors early in development cycle

4. **API Connectivity Test**:
   ```bash
   curl -H "Authorization: Bearer $VITE_API_TOKEN" -I $VITE_API_BASE_URL/api/challenges
   ```
   - Verify backend connection with current environment variables
   - Test actual API endpoints that frontend depends on

#### Benefits of This Protocol
- **Prevents Unnecessary Server Restarts**: Saves development time and avoids port conflicts
- **Early Error Detection**: Catches configuration and compilation issues immediately  
- **Environment Validation**: Ensures all environment variables are properly configured
- **Reliable Development Workflow**: Consistent verification reduces debugging time

#### FORBIDDEN Practices
- ❌ Starting dev server without checking if it's already running
- ❌ Assuming server works without HTTP health check
- ❌ Skipping TypeScript validation before major changes
- ❌ Not testing API connectivity when debugging frontend issues

**This verification protocol is MANDATORY and saves significant development time.**

### Color Visualization in Markdown Documentation

**IMPORTANT**: When creating color documentation or visualizing colors in markdown files, always use shields.io as the first approach:

```markdown
![#COLORCODE](https://img.shields.io/badge/-COLORCODE-COLORCODE?style=flat-square)
```

This approach works reliably in both GitHub and VS Code, unlike other services (via.placeholder.com, SVG inline, etc.) which may fail on GitHub due to security restrictions. Always test color visualization on both platforms before considering the task complete.

### TypeScript Best Practices

#### Type Safety and Strict Configuration
```typescript
// tsconfig.json - Use strict mode
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  }
}

// Prefer explicit typing over 'any'
interface ChallengeData {
  id: number;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  createdAt: string;
  creator?: Creator;
}

// Use const assertions for immutable data
const DIFFICULTY_LEVELS = ['Easy', 'Medium', 'Hard'] as const;
type DifficultyLevel = typeof DIFFICULTY_LEVELS[number];
```

#### Type Definitions and Interfaces
```typescript
// Organize types by domain
// types/challenge.ts
export interface Challenge {
  id: number;
  title: string;
  description: string;
  rules: Rule[];
  custom_codes: CustomCode[];
}

// Use utility types for API responses
export type ChallengeResponse = {
  data: Challenge[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
};

// Generic types for reusable patterns
export interface APIResponse<T> {
  data: T;
  meta?: Record<string, unknown>;
  error?: {
    status: number;
    name: string;
    message: string;
  };
}
```

#### Error Handling Patterns
```typescript
// Use discriminated unions for error states
type AsyncState<T> = 
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string };

// Type-safe error boundaries
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

// Custom error types
class APIError extends Error {
  constructor(
    public status: number,
    message: string,
    public code?: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}
```

### React Best Practices

#### Component Architecture
```typescript
// Use functional components with TypeScript
interface ChallengeCardProps {
  challenge: Challenge;
  onSelect: (id: number) => void;
  className?: string;
  variant?: 'default' | 'compact';
}

export const ChallengeCard: React.FC<ChallengeCardProps> = ({
  challenge,
  onSelect,
  className = '',
  variant = 'default'
}) => {
  // Component implementation
};

// Use React.memo for performance optimization
export const ChallengeCard = React.memo<ChallengeCardProps>(({ 
  challenge, 
  onSelect 
}) => {
  // Component implementation
});
```

#### Custom Hooks Patterns
```typescript
// Custom hooks for data fetching
export function useChallenges(filters?: ChallengeFilters) {
  return useQuery({
    queryKey: ['challenges', filters],
    queryFn: () => challengeService.getAll(filters),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

// Custom hooks for local state management
export function useLocalStorage<T>(
  key: string, 
  initialValue: T
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback((value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key]);

  return [storedValue, setValue];
}
```

#### State Management Patterns
```typescript
// Use useReducer for complex state logic
interface FormState {
  values: Record<string, string>;
  errors: Record<string, string>;
  isSubmitting: boolean;
}

type FormAction = 
  | { type: 'SET_FIELD'; field: string; value: string }
  | { type: 'SET_ERROR'; field: string; error: string }
  | { type: 'SET_SUBMITTING'; isSubmitting: boolean }
  | { type: 'RESET' };

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        values: { ...state.values, [action.field]: action.value },
        errors: { ...state.errors, [action.field]: '' }
      };
    // Other cases...
    default:
      return state;
  }
}

// React Query for server state
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
      retry: (failureCount, error) => {
        if (error instanceof APIError && error.status >= 400 && error.status < 500) {
          return false; // Don't retry client errors
        }
        return failureCount < 3;
      },
    },
  },
});
```

#### Performance Optimization
```typescript
// Memoization with useMemo and useCallback
const ExpensiveComponent: React.FC<Props> = ({ data, onAction }) => {
  const processedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      computedValue: expensiveCalculation(item)
    }));
  }, [data]);

  const handleAction = useCallback((id: number) => {
    onAction(id);
  }, [onAction]);

  return (
    <div>
      {processedData.map(item => (
        <Item key={item.id} data={item} onAction={handleAction} />
      ))}
    </div>
  );
};

// Lazy loading for code splitting
const ChallengeDetails = lazy(() => import('./ChallengeDetails'));
const TournamentView = lazy(() => import('./TournamentView'));

// Suspense boundaries
<Suspense fallback={<LoadingSpinner />}>
  <Routes>
    <Route path="/challenges/:id" element={<ChallengeDetails />} />
    <Route path="/tournaments" element={<TournamentView />} />
  </Routes>
</Suspense>
```

### Tailwind CSS Best Practices

#### CRITICAL: Custom Color System Enforcement

**MANDATORY RULE**: NEVER use Tailwind's built-in color classes. ALWAYS use our custom color system.

```typescript
// ❌ FORBIDDEN: Tailwind color classes
className="text-gray-900 bg-blue-600 border-red-500"

// ✅ REQUIRED: Custom color system classes
className="text-primary bg-primary-color border-error"
```

**Available Custom Color Classes**:
- `text-primary` - Main text color (theme-aware)
- `text-secondary` - Secondary text color
- `text-primary-color` - Brand primary color
- `text-secondary-color` - Brand secondary color
- `text-accent-color` - Brand accent color
- `bg-surface` - Surface background
- `bg-background-primary` - Primary background
- `border-default` - Default border color
- `border-primary` - Primary border color

**Why This Rule Exists**:
- Tailwind colors override our custom CSS variables
- Our color system provides proper theme support (light/dark)
- Ensures brand consistency across the entire application
- Prevents color conflicts and styling issues

#### Design System and Utility Classes
```typescript
// Use consistent spacing scale
const SPACING = {
  xs: 'p-2',      // 8px
  sm: 'p-3',      // 12px  
  md: 'p-4',      // 16px
  lg: 'p-6',      // 24px
  xl: 'p-8',      // 32px
} as const;

// Consistent color palette
const COLORS = {
  primary: 'bg-blue-600 hover:bg-blue-700',
  secondary: 'bg-gray-600 hover:bg-gray-700',
  success: 'bg-green-600 hover:bg-green-700',
  danger: 'bg-red-600 hover:bg-red-700',
  warning: 'bg-yellow-600 hover:bg-yellow-700',
} as const;

// Component variants with Tailwind
interface ButtonProps {
  variant?: keyof typeof COLORS;
  size?: keyof typeof SPACING;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md',
  children 
}) => {
  const baseClasses = 'font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variantClasses = COLORS[variant];
  const sizeClasses = SPACING[size];
  
  return (
    <button className={`${baseClasses} ${variantClasses} ${sizeClasses}`}>
      {children}
    </button>
  );
};
```

#### Responsive Design Patterns
```typescript
// Mobile-first responsive design
const ResponsiveGrid: React.FC = () => (
  <div className="
    grid 
    grid-cols-1 
    gap-4 
    sm:grid-cols-2 
    md:grid-cols-3 
    lg:grid-cols-4 
    xl:grid-cols-5
    p-4 
    sm:p-6 
    lg:p-8
  ">
    {/* Grid items */}
  </div>
);

// Responsive typography
const Heading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h1 className="
    text-2xl 
    sm:text-3xl 
    md:text-4xl 
    lg:text-5xl 
    font-bold 
    leading-tight 
    text-gray-900 
    dark:text-gray-100
  ">
    {children}
  </h1>
);
```

#### Component Composition with Tailwind
```typescript
// Create reusable component patterns
const Card: React.FC<{
  children: React.ReactNode;
  className?: string;
  padding?: boolean;
}> = ({ 
  children, 
  className = '', 
  padding = true 
}) => (
  <div className={`
    bg-white 
    dark:bg-gray-800 
    rounded-lg 
    shadow-md 
    border 
    border-gray-200 
    dark:border-gray-700 
    ${padding ? 'p-6' : ''} 
    ${className}
  `}>
    {children}
  </div>
);

// Consistent form styling
const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <input
    {...props}
    className={`
      w-full 
      px-3 
      py-2 
      border 
      border-gray-300 
      dark:border-gray-600 
      rounded-md 
      shadow-sm 
      focus:outline-none 
      focus:ring-2 
      focus:ring-blue-500 
      focus:border-blue-500 
      dark:bg-gray-700 
      dark:text-white
      ${props.className || ''}
    `}
  />
);
```

#### Light/Dark Theme Implementation (Required)
```typescript
// Theme system with gaming-optimized dark mode as default
export function useTheme() {
  // Default to dark mode for gaming community preference
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>('theme', 'dark');

  useEffect(() => {
    // Only check system preference if no stored preference exists
    if (!localStorage.getItem('theme')) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      setTheme(mediaQuery.matches ? 'dark' : 'light');
      
      const handleChange = (e: MediaQueryListEvent) => {
        if (!localStorage.getItem('theme')) {
          setTheme(e.matches ? 'dark' : 'light');
        }
      };
      
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [setTheme]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  }, [setTheme]);

  return { theme, toggleTheme, isDark: theme === 'dark' };
}

// Theme context provider (required for all apps)
export const ThemeContext = createContext<{
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  isDark: boolean;
}>({
  theme: 'dark',
  toggleTheme: () => {},
  isDark: true,
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const themeState = useTheme();
  
  return (
    <ThemeContext.Provider value={themeState}>
      {children}
    </ThemeContext.Provider>
  );
};

// Dark mode aware components
const ThemeAwareComponent: React.FC = () => (
  <div className="
    bg-white 
    dark:bg-gray-900 
    text-gray-900 
    dark:text-gray-100 
    min-h-screen 
    transition-colors 
    duration-200
  ">
    <header className="
      bg-gray-50 
      dark:bg-gray-800 
      border-b 
      border-gray-200 
      dark:border-gray-700
    ">
      {/* Header content */}
    </header>
  </div>
);

// Gaming-optimized theme toggle button
const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <button
      onClick={toggleTheme}
      className="
        p-2 
        rounded-md 
        bg-gray-100 
        dark:bg-gray-800 
        text-gray-900 
        dark:text-gray-100 
        hover:bg-gray-200 
        dark:hover:bg-gray-700 
        transition-colors 
        duration-200
      "
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
};

// Gaming card with theme support
const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge }) => (
  <div className="
    bg-white 
    dark:bg-slate-800 
    border 
    border-gray-200 
    dark:border-slate-700 
    rounded-lg 
    shadow-sm 
    dark:shadow-slate-900/20 
    hover:shadow-md 
    dark:hover:shadow-slate-900/30 
    transition-all 
    duration-200
  ">
    <div className="p-6">
      <h3 className="
        text-lg 
        font-semibold 
        text-gray-900 
        dark:text-slate-100 
        mb-2
      ">
        {challenge.title}
      </h3>
      <p className="
        text-gray-600 
        dark:text-slate-300 
        text-sm
      ">
        {challenge.description}
      </p>
      <div className="
        mt-4 
        flex 
        items-center 
        justify-between
      ">
        <span className={`
          px-2 
          py-1 
          rounded-full 
          text-xs 
          font-medium
          ${challenge.difficulty === 'Easy' 
            ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
            : challenge.difficulty === 'Medium'
            ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
            : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
          }
        `}>
          {challenge.difficulty}
        </span>
      </div>
    </div>
  </div>
);
```

### Code Quality Standards
- **TypeScript Strict Mode**: Enable all strict type checking options
- **ESLint + Prettier**: Consistent code formatting and linting with gaming-specific rules
- **Component Patterns**: Functional components with hooks, proper prop typing
- **Error Boundaries**: Graceful error handling for API failures and component crashes
- **Loading States**: Consistent loading and skeleton UI patterns
- **Responsive Design**: Mobile-first Tailwind CSS approach with consistent breakpoints

### File Organization and Naming Conventions

#### Directory Structure
```
src/
├── components/
│   ├── ui/                 # Reusable UI components
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.test.tsx
│   │   │   └── index.ts
│   │   └── Input/
│   ├── layout/             # Layout components
│   ├── challenge/          # Domain-specific components
│   └── forms/              # Form components
├── hooks/                  # Custom React hooks
│   ├── api/               # API-related hooks
│   ├── ui/                # UI-related hooks
│   └── utils/             # Utility hooks
├── services/               # API service layer
│   ├── api.ts             # Base API configuration
│   ├── challengeService.ts
│   └── submissionService.ts
├── types/                  # TypeScript type definitions
│   ├── api.ts             # API response types
│   ├── challenge.ts       # Challenge domain types
│   └── common.ts          # Shared types
├── utils/                  # Utility functions
│   ├── formatting.ts      # Date, number formatting
│   ├── validation.ts      # Form validation
│   └── constants.ts       # App constants
└── pages/                  # Route-based page components
    ├── ChallengesPage/
    ├── TournamentsPage/
    └── SubmissionPage/
```

#### Naming Conventions
```typescript
// Components: PascalCase
export const ChallengeCard: React.FC<ChallengeCardProps> = () => {};
export const SubmissionForm: React.FC<SubmissionFormProps> = () => {};

// Files: Match component names
ChallengeCard.tsx
SubmissionForm.tsx
challengeService.ts

// Types and Interfaces: PascalCase with descriptive names
interface Challenge {
  id: number;
  title: string;
}

type ChallengeFilters = {
  difficulty?: DifficultyLevel;
  category?: string;
};

// Constants: SCREAMING_SNAKE_CASE
const API_ENDPOINTS = {
  CHALLENGES: '/api/challenges',
  SUBMISSIONS: '/api/submissions',
} as const;

const DIFFICULTY_LEVELS = ['Easy', 'Medium', 'Hard'] as const;

// Functions: camelCase with descriptive verbs
function formatChallengeDate(date: string): string {}
function validateSubmissionForm(data: SubmissionFormData): ValidationResult {}

// Custom hooks: start with 'use'
function useChallenges(filters?: ChallengeFilters) {}
function useSubmissionForm() {}
```

#### Component Export Patterns
```typescript
// Named exports for components (preferred)
export const ChallengeCard: React.FC<ChallengeCardProps> = () => {};

// Default export for pages
const ChallengesPage: React.FC = () => {};
export default ChallengesPage;

// Index file pattern
// components/ui/Button/index.ts
export { Button } from './Button';
export type { ButtonProps } from './Button';

// Barrel exports
// components/ui/index.ts
export { Button } from './Button';
export { Input } from './Input';
export { Card } from './Card';
```

### Testing Patterns and Standards

#### Unit Testing with Vitest and React Testing Library
```typescript
// ChallengeCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { ChallengeCard } from './ChallengeCard';
import type { Challenge } from '@/types/challenge';

const mockChallenge: Challenge = {
  id: 1,
  title: 'Test Challenge',
  difficulty: 'Medium',
  createdAt: '2024-01-01T00:00:00Z',
};

describe('ChallengeCard', () => {
  it('renders challenge information correctly', () => {
    const onSelect = vi.fn();
    
    render(
      <ChallengeCard 
        challenge={mockChallenge} 
        onSelect={onSelect} 
      />
    );

    expect(screen.getByText('Test Challenge')).toBeInTheDocument();
    expect(screen.getByText('Medium')).toBeInTheDocument();
  });

  it('calls onSelect when clicked', () => {
    const onSelect = vi.fn();
    
    render(
      <ChallengeCard 
        challenge={mockChallenge} 
        onSelect={onSelect} 
      />
    );

    fireEvent.click(screen.getByRole('button'));
    expect(onSelect).toHaveBeenCalledWith(1);
  });
});
```

#### API Testing Patterns
```typescript
// hooks/api/useChallenges.test.tsx
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi } from 'vitest';
import { useChallenges } from './useChallenges';
import * as challengeService from '@/services/challengeService';

vi.mock('@/services/challengeService');

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });
  
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('useChallenges', () => {
  it('fetches challenges successfully', async () => {
    const mockChallenges = [mockChallenge];
    vi.mocked(challengeService.getAll).mockResolvedValueOnce({
      data: mockChallenges,
      meta: { pagination: { total: 1 } }
    });

    const { result } = renderHook(() => useChallenges(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toEqual(mockChallenges);
  });
});
```

#### E2E Testing with Playwright
```typescript
// e2e/challenges.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Challenges Page', () => {
  test.beforeEach(async ({ page }) => {
    // Mock API responses
    await page.route('**/api/challenges', (route) => {
      route.fulfill({
        status: 200,
        body: JSON.stringify({
          data: [
            { id: 1, title: 'Test Challenge', difficulty: 'Easy' }
          ]
        })
      });
    });

    await page.goto('/challenges');
  });

  test('displays challenge list', async ({ page }) => {
    await expect(page.getByText('Test Challenge')).toBeVisible();
    await expect(page.getByText('Easy')).toBeVisible();
  });

  test('filters challenges by difficulty', async ({ page }) => {
    await page.selectOption('[data-testid="difficulty-filter"]', 'Medium');
    
    // Verify API call with correct filters
    await page.waitForRequest(req => 
      req.url().includes('/api/challenges') && 
      req.url().includes('difficulty=Medium')
    );
  });

  test('navigates to challenge detail', async ({ page }) => {
    await page.click('[data-testid="challenge-card"]');
    await expect(page).toHaveURL(/\/challenges\/\d+/);
  });
});
```

### Accessibility Standards

#### ARIA and Semantic HTML
```typescript
// Proper semantic structure
const ChallengeList: React.FC = () => (
  <main>
    <h1>Challenges</h1>
    <section aria-labelledby="filters-heading">
      <h2 id="filters-heading">Filters</h2>
      <form role="search">
        <label htmlFor="difficulty-select">Difficulty</label>
        <select 
          id="difficulty-select"
          aria-describedby="difficulty-help"
        >
          <option value="">All Difficulties</option>
          <option value="Easy">Easy</option>
        </select>
        <div id="difficulty-help" className="sr-only">
          Filter challenges by difficulty level
        </div>
      </form>
    </section>
    
    <section aria-labelledby="results-heading">
      <h2 id="results-heading">Results</h2>
      <ul role="list">
        {challenges.map(challenge => (
          <li key={challenge.id}>
            <ChallengeCard challenge={challenge} />
          </li>
        ))}
      </ul>
    </section>
  </main>
);

// Focus management
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      tabIndex={-1}
      className="fixed inset-0 z-50"
    >
      {children}
    </div>
  );
};
```

#### Keyboard Navigation
```typescript
// Custom keyboard navigation hook
function useKeyboardNavigation(
  items: string[],
  onSelect: (item: string) => void
) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setActiveIndex(prev => (prev + 1) % items.length);
        break;
      case 'ArrowUp':
        event.preventDefault();
        setActiveIndex(prev => (prev - 1 + items.length) % items.length);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        onSelect(items[activeIndex]);
        break;
      case 'Escape':
        setActiveIndex(0);
        break;
    }
  }, [items, activeIndex, onSelect]);

  return { activeIndex, handleKeyDown };
}
```

### Storybook Development and Documentation

#### Story Creation Patterns
```typescript
// ChallengeCard.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ChallengeCard } from './ChallengeCard';
import type { Challenge } from '@/types/challenge';

const mockChallenge: Challenge = {
  id: 1,
  title: 'Survival Challenge: 30 Days in Pleasant Valley',
  description: 'Survive 30 days in Pleasant Valley without dying',
  difficulty: 'Medium',
  createdAt: '2024-01-01T00:00:00Z',
  creator: {
    id: 1,
    name: 'TheLongDarkPlayer',
    social_url: 'https://youtube.com/@thelongdarkplayer'
  }
};

const meta: Meta<typeof ChallengeCard> = {
  title: 'Components/Challenge/ChallengeCard',
  component: ChallengeCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A card component for displaying challenge information with creator attribution and difficulty indicators.'
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'compact'],
      description: 'Visual variant of the challenge card'
    },
    onSelect: {
      action: 'challenge-selected',
      description: 'Callback fired when challenge is selected'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    challenge: mockChallenge,
    variant: 'default'
  }
};

// Compact variant
export const Compact: Story = {
  args: {
    challenge: mockChallenge,
    variant: 'compact'
  }
};

// Different difficulty levels
export const EasyDifficulty: Story = {
  args: {
    challenge: { ...mockChallenge, difficulty: 'Easy' }
  }
};

export const HardDifficulty: Story = {
  args: {
    challenge: { ...mockChallenge, difficulty: 'Hard' }
  }
};

// Theme testing (required for all components)
export const LightTheme: Story = {
  args: {
    challenge: mockChallenge
  },
  parameters: {
    backgrounds: { default: 'light' },
    docs: {
      description: {
        story: 'Light theme variant with full accessibility compliance'
      }
    }
  }
};

export const DarkTheme: Story = {
  args: {
    challenge: mockChallenge
  },
  parameters: {
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        story: 'Gaming-optimized dark theme with enhanced contrast'
      }
    }
  }
};

// Theme comparison
export const ThemeComparison: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <h3 className="font-semibold text-center">Light Theme</h3>
        <div className="bg-white p-4 rounded-lg border">
          <ChallengeCard challenge={mockChallenge} />
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="font-semibold text-center">Dark Theme</h3>
        <div className="bg-slate-900 p-4 rounded-lg border border-slate-700">
          <ChallengeCard challenge={mockChallenge} />
        </div>
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

// Interactive testing
export const Interactive: Story = {
  args: {
    challenge: mockChallenge
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const card = canvas.getByRole('button');
    
    // Test hover state
    await userEvent.hover(card);
    
    // Test click interaction
    await userEvent.click(card);
  }
};
```

#### Component Documentation Patterns
```typescript
// Button.stories.tsx - Comprehensive UI component documentation
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: `
A versatile button component supporting multiple variants, sizes, and states.
Used throughout the TLD Challenges platform for user interactions.

## Usage Guidelines
- Use \`primary\` variant for main actions (submit forms, start challenges)
- Use \`secondary\` variant for secondary actions (cancel, back)
- Use \`danger\` variant for destructive actions (delete, remove)
- Always provide accessible labels and loading states
        `
      }
    }
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'danger', 'warning'],
      description: 'Visual style variant'
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Button size'
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state'
    },
    loading: {
      control: 'boolean',
      description: 'Loading state with spinner'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// Showcase all variants
export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-4 flex-wrap">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="success">Success</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="warning">Warning</Button>
    </div>
  )
};

// Showcase all sizes
export const AllSizes: Story = {
  render: () => (
    <div className="flex gap-4 items-center flex-wrap">
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  )
};
```

#### Form Component Stories
```typescript
// SubmissionForm.stories.tsx - Complex form component testing
import type { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SubmissionForm } from './SubmissionForm';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false }
  }
});

const meta: Meta<typeof SubmissionForm> = {
  title: 'Forms/SubmissionForm',
  component: SubmissionForm,
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
        component: 'Form for submitting challenge completion runs with validation and file upload'
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    challengeId: 1
  }
};

export const WithValidationErrors: Story = {
  args: {
    challengeId: 1
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Try to submit empty form to show validation
    const submitButton = canvas.getByRole('button', { name: /submit/i });
    await userEvent.click(submitButton);
  }
};

export const FilledForm: Story = {
  args: {
    challengeId: 1
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Fill form with valid data
    await userEvent.type(canvas.getByLabelText(/runner name/i), 'TestRunner');
    await userEvent.type(canvas.getByLabelText(/video url/i), 'https://youtube.com/watch?v=test');
    await userEvent.type(canvas.getByLabelText(/completion time/i), '45:30');
  }
};
```

#### Storybook Configuration Best Practices
```typescript
// .storybook/main.ts
import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-a11y',
    '@storybook/addon-viewport',
    '@storybook/addon-docs'
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {}
  },
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript'
  }
};

export default config;

// .storybook/preview.ts
import type { Preview } from '@storybook/react';
import '../src/index.css'; // Tailwind CSS

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#1f2937' },
        { name: 'gaming-dark', value: '#0f172a' }
      ]
    },
    viewport: {
      viewports: {
        mobile: { name: 'Mobile', styles: { width: '375px', height: '667px' } },
        tablet: { name: 'Tablet', styles: { width: '768px', height: '1024px' } },
        desktop: { name: 'Desktop', styles: { width: '1440px', height: '900px' } }
      }
    }
  }
};

export default preview;
```

#### Storybook Theme Guidelines

**IMPORTANT THEME STORY REQUIREMENTS:**

1. **Component Stories (src/components/**/*.stories.tsx):**
   - ❌ **DO NOT** create separate `LightTheme` and `DarkTheme` stories
   - ❌ **DO NOT** create `ThemeComparison` stories for components
   - ✅ **DO** rely on Storybook's global theme switcher in toolbar
   - ✅ **DO** ensure components work with both themes through proper CSS classes

2. **Page Stories (src/pages/**/*.stories.tsx):**
   - ✅ **DO** create `ThemeComparison` stories for pages
   - ❌ **DO NOT** create separate `LightTheme` and `DarkTheme` stories
   - ✅ **DO** use side-by-side comparison format for theme stories

```typescript
// ✅ CORRECT: Page ThemeComparison story
export const ThemeComparison: Story = {
  render: () => (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="bg-white min-h-screen">
        <div className="p-4 bg-gray-100 text-center font-semibold text-gray-900">
          Light Theme
        </div>
        <PageComponent />
      </div>
      <div className="bg-slate-900 min-h-screen dark">
        <div className="p-4 bg-slate-800 text-center font-semibold text-slate-100">
          Dark Theme
        </div>
        <PageComponent />
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

// ❌ INCORRECT: Don't create these for components
export const LightTheme: Story = { /* Don't do this */ };
export const DarkTheme: Story = { /* Don't do this */ };
```

**Rationale:**
- Component theme testing should use Storybook's global theme switcher
- Page theme comparisons provide comprehensive visual testing
- Reduces story duplication and maintenance overhead
- Maintains consistent documentation patterns

#### Storybook Testing Integration
```typescript
// .storybook/test-runner.ts
import type { TestRunnerConfig } from '@storybook/test-runner';
import { checkA11y, injectAxe } from 'axe-playwright';

const config: TestRunnerConfig = {
  async preVisit(page) {
    await injectAxe(page);
  },
  async postVisit(page) {
    await checkA11y(page, '#root', {
      detailedReport: true,
      detailedReportOptions: {
        html: true,
      },
    });
  },
};

export default config;

// Component testing with Storybook test runner
// package.json scripts
{
  "scripts": {
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build",
    "test-storybook": "test-storybook",
    "test-storybook:ci": "concurrently -k -s first -n \"SB,TEST\" -c \"magenta,blue\" \"npm run build-storybook --quiet && npx http-server storybook-static --port 6006 --silent\" \"wait-on tcp:6006 && npm run test-storybook\""
  }
}
```

#### Development Workflow with Storybook
```typescript
// Development process integration
// 1. Create component with TypeScript
// 2. Create Storybook stories for all variants
// 3. Test component in isolation with Storybook
// 4. Write unit tests based on Storybook stories
// 5. Document component usage and guidelines

// Story-driven development pattern
export const LoadingStates: Story = {
  render: () => (
    <div className="space-y-4">
      <ChallengeCard challenge={mockChallenge} loading />
      <ChallengeCard challenge={mockChallenge} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates loading states for challenge cards during API calls'
      }
    }
  }
};

// Error state documentation
export const ErrorState: Story = {
  args: {
    challenge: mockChallenge,
    error: 'Failed to load challenge data'
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows error state when challenge data fails to load from API'
      }
    }
  }
};
```

### API Communication Rules
- **Read-Only Architecture**: Frontend only reads data, never modifies (except submissions)
- **JWT Authentication**: All API calls include long-lived JWT token
- **Error Handling**: Graceful degradation for API failures
- **Caching Strategy**: Aggressive caching for static content (challenges, tournaments)
- **Rate Limiting Awareness**: Respect backend rate limits

### UI/UX Guidelines
- **Gaming Aesthetic**: Design suitable for gaming community with dark mode as preferred default
- **Dual Theme Requirement**: Implement complete light/dark theme system with system preference detection
- **Theme Consistency**: All components must support both light and dark variants
- **Mobile Responsiveness**: Excellent mobile experience across both themes
- **Performance Focus**: Fast loading times and smooth interactions
- **Accessibility**: WCAG guidelines for inclusive design with proper contrast ratios in both themes

### External Integrations
- **YouTube Integration**: Video embedding for submission videos
- **Twitch Integration**: Twitch stream/video embedding
- **Social Media Links**: Creator profile social media integration
- **URL Validation**: Robust validation for external links

## Security Considerations

### Client-Side Security
- **Input Validation**: All form inputs validated on client and server
- **XSS Prevention**: Sanitize any user-generated content display
- **URL Validation**: Verify external links before embedding
- **Rate Limiting**: Implement client-side rate limiting for submissions

### Content Security Policy
- **Media Sources**: Allow YouTube and Twitch domains for video embedding
- **API Endpoints**: Restrict API calls to backend domain only
- **External Links**: Validate and sanitize external URLs

## Performance Guidelines

### Build Optimization
- **Code Splitting**: Route-based and component-based code splitting
- **Tree Shaking**: Remove unused dependencies
- **Bundle Analysis**: Regular bundle size monitoring
- **Asset Optimization**: Image optimization and lazy loading

### Runtime Performance
- **React Query Caching**: Efficient server state caching
- **Virtual Scrolling**: For large lists (challenges, submissions)
- **Image Lazy Loading**: Optimize image loading performance
- **Debounced Search**: Prevent excessive API calls

## Testing Strategy

### Testing Priorities
- **API Integration**: Mock API responses for consistent testing
- **Form Validation**: Test all submission form validation rules
- **Component Rendering**: Unit tests for critical components
- **User Workflows**: End-to-end tests for key user journeys
- **Error Handling**: Test error states and fallbacks
- **Component Showcase**: Storybook stories for visual testing and documentation

### Testing Tools
- **Vitest**: Unit and integration testing
- **React Testing Library**: Component testing
- **MSW**: API mocking for tests
- **Playwright**: End-to-end testing
- **Storybook**: Component development, documentation, and manual testing

## Development Environment

### Prerequisites
- Node.js v20+ (Active LTS)
- npm, yarn, or pnpm
- Backend API running locally or staging environment
- Environment variables for API endpoints and JWT tokens

### Environment Configuration
```bash
# .env.local example
VITE_API_BASE_URL=http://localhost:1337
VITE_API_TOKEN=your-long-lived-jwt-token
VITE_APP_DOMAIN=http://localhost:3000
```

## Deployment Strategy

### Unified Platform Deployment
- **Docker-Based Architecture**: Frontend deployed alongside Strapi backend and PostgreSQL database
- **Recommended Providers**: DigitalOcean App Platform, Railway, or Render for unified hosting
- **Environment Management**: Single deployment process with shared environment variables
- **Cost Efficiency**: Unified hosting provider for all platform components (~$200-650/year total)

### Container Integration
- **Multi-Stage Build**: Optimized Docker builds with Nginx serving static assets
- **Platform Scaling**: Scale entire TLD Challenges platform together as unified system
- **Environment Configuration**: Runtime environment variable injection
- **Nginx**: Static file serving with proper caching headers

## Integration Points

### Backend Communication
- **API Base URL**: Configurable backend endpoint
- **Authentication**: JWT token in Authorization header
- **Content Population**: Use Strapi populate parameter for related data
- **Error Handling**: Standardized error response handling

### External Services
- **YouTube API**: For video metadata and validation
- **Twitch API**: For stream metadata and validation
- **Analytics**: Optional integration for usage tracking

## Community and Contribution

### Development Workflow
1. **Feature Branches**: All development in feature branches
2. **Pull Request Process**: Code review required for all changes
3. **Documentation Updates**: Update docs with significant changes
4. **Testing Requirements**: Tests required for new features

### Code Review Guidelines
- **Type Safety**: Ensure proper TypeScript usage
- **Performance Impact**: Consider performance implications
- **Accessibility**: Review for accessibility compliance
- **Mobile Responsiveness**: Test on various screen sizes

### Related Repositories
- **Backend**: [tld-challenges-backend](https://github.com/bigfish-software/tld-challenges-backend) - Strapi API
- **Database**: [tld-challenges-database](https://github.com/bigfish-software/tld-challenges-database) - PostgreSQL setup

---

*This documentation provides context for GitHub Copilot to assist with frontend development. Always refer to the latest backend API documentation for current endpoint specifications and data models.*

## Documentation Links

For comprehensive project information, refer to these documentation files:

- **[Component Architecture](../docs/component-architecture.md)** - Component design patterns, encapsulation guidelines, and anti-patterns
- **[API Documentation](../docs/api.md)** - Backend API integration, endpoints, and data models
- **[Color System](../docs/colors.md)** - Color palette, theme implementation, and accessibility guidelines
- **[Component Guidelines](../docs/components.md)** - Detailed component usage and implementation patterns
- **[Deployment Guide](../docs/deployment.md)** - Production deployment and environment configuration
- **[Development Summary](../docs/development-summary.md)** - Project overview and development workflow
- **[External Links](../docs/external-links.md)** - Social media, community resources, and external integrations

These documents contain detailed technical specifications, examples, and best practices that complement these Copilot instructions.
