# Component Architecture Guide

This document outlines the component architecture and patterns for the TLD Challenges frontend application.

## Component Structure Overview

```
src/components/
├── ui/                     # Base UI components
│   ├── Button/
│   ├── Input/
│   ├── Modal/
│   ├── LoadingSpinner/
│   ├── ErrorBoundary/
│   └── Skeleton/
├── layout/                 # Layout components
│   ├── Header/
│   ├── Footer/
│   ├── Navigation/
│   ├── Sidebar/
│   └── PageLayout/
├── challenge/              # Challenge-specific components
│   ├── ChallengeCard/
│   ├── ChallengeDetail/
│   ├── ChallengeList/
│   ├── ChallengFilters/
│   └── DifficultyBadge/
├── tournament/             # Tournament-specific components
│   ├── TournamentCard/
│   ├── TournamentDetail/
│   ├── TournamentList/
│   ├── Leaderboard/
│   └── TournamentStatus/
├── submission/             # Submission components
│   ├── SubmissionForm/
│   ├── SubmissionCard/
│   ├── SubmissionList/
│   └── VideoEmbed/
├── creator/                # Creator profile components
│   ├── CreatorCard/
│   ├── CreatorProfile/
│   ├── CreatorList/
│   └── SocialLinks/
├── customcode/             # Custom code components
│   ├── CustomCodeCard/
│   ├── CustomCodeDetail/
│   ├── CodeBlock/
│   └── CodeCopyButton/
└── shared/                 # Shared components
    ├── SearchBar/
    ├── Pagination/
    ├── FilterPanel/
    ├── MediaEmbed/
    └── TagList/
```

## Component Patterns

### Base UI Components

#### Button Component
```typescript
// src/components/ui/Button/Button.tsx
import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: ReactNode;
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500',
    ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  };
  
  const sizes = {
    sm: 'px-3 py-2 text-sm rounded-md',
    md: 'px-4 py-2 text-base rounded-md',
    lg: 'px-6 py-3 text-lg rounded-lg',
  };
  
  return (
    <button
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        loading && 'cursor-wait',
        className
      )}
      disabled={disabled || loading}
      {...props}
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

#### Input Component
```typescript
// src/components/ui/Input/Input.tsx
import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    
    return (
      <div className="space-y-2">
        {label && (
          <label 
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            'block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
            'dark:bg-gray-800 dark:border-gray-600 dark:text-white',
            error && 'border-red-300 focus:ring-red-500 focus:border-red-500',
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
        {helperText && !error && (
          <p className="text-sm text-gray-500 dark:text-gray-400">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
```

### Challenge Components

#### ChallengeCard Component
```typescript
// src/components/challenge/ChallengeCard/ChallengeCard.tsx
import { Link } from 'react-router-dom';
import { Challenge } from '@/types/api';
import { DifficultyBadge } from '../DifficultyBadge';
import { TagList } from '@/components/shared/TagList';

interface ChallengeCardProps {
  challenge: Challenge;
  onHover?: (id: string) => void;
}

export const ChallengeCard = ({ challenge, onHover }: ChallengeCardProps) => {
  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6"
      onMouseEnter={() => onHover?.(challenge.id.toString())}
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          <Link 
            to={`/challenges/${challenge.id}`}
            className="hover:text-blue-600 dark:hover:text-blue-400"
          >
            {challenge.attributes.name}
          </Link>
        </h3>
        <DifficultyBadge difficulty={challenge.attributes.difficulty} />
      </div>
      
      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
        {challenge.attributes.description}
      </p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
          {challenge.attributes.tournament?.data && (
            <span>
              Tournament: {challenge.attributes.tournament.data.attributes.name}
            </span>
          )}
          {challenge.attributes.custom_code?.data && (
            <span>
              Custom Code: {challenge.attributes.custom_code.data.attributes.name}
            </span>
          )}
        </div>
        
        {challenge.attributes.creators?.data && (
          <TagList
            items={challenge.attributes.creators.data.map(creator => creator.attributes.name)}
            variant="creator"
            max={2}
          />
        )}
      </div>
    </div>
  );
};
```

#### ChallengeDetail Component
```typescript
// src/components/challenge/ChallengeDetail/ChallengeDetail.tsx
import { Challenge } from '@/types/api';
import { DifficultyBadge } from '../DifficultyBadge';
import { CustomCodeBlock } from '@/components/customcode/CodeBlock';
import { SubmissionForm } from '@/components/submission/SubmissionForm';
import { SubmissionList } from '@/components/submission/SubmissionList';
import { FAQSection } from '@/components/shared/FAQSection';

interface ChallengeDetailProps {
  challenge: Challenge;
}

export const ChallengeDetail = ({ challenge }: ChallengeDetailProps) => {
  const { attributes } = challenge;
  
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {attributes.name}
            </h1>
            <div className="flex items-center space-x-4">
              <DifficultyBadge difficulty={attributes.difficulty} size="lg" />
              {attributes.tournament?.data && (
                <span className="text-blue-600 dark:text-blue-400">
                  {attributes.tournament.data.attributes.name}
                </span>
              )}
            </div>
          </div>
          
          {attributes.creators?.data && (
            <div className="text-right">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Created by</p>
              <div className="space-y-1">
                {attributes.creators.data.map(creator => (
                  <Link
                    key={creator.id}
                    to={`/creators/${creator.attributes.slug}`}
                    className="block text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {creator.attributes.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="prose dark:prose-invert max-w-none">
          {attributes.description}
        </div>
      </div>
      
      {/* Custom Code */}
      {attributes.custom_code?.data && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Custom Game Code
          </h2>
          <CustomCodeBlock customCode={attributes.custom_code.data} />
        </div>
      )}
      
      {/* Rules */}
      {attributes.rules?.data && attributes.rules.data.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Rules
          </h2>
          <div className="space-y-4">
            {attributes.rules.data.map(rule => (
              <div key={rule.id} className="border-l-4 border-blue-500 pl-4">
                <div className="prose dark:prose-invert">
                  {rule.attributes.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Submit Run */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Submit Your Run
        </h2>
        <SubmissionForm challengeId={challenge.id} />
      </div>
      
      {/* Recent Submissions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Recent Submissions
        </h2>
        <SubmissionList challengeId={challenge.id} />
      </div>
      
      {/* FAQ */}
      {attributes.faqs?.data && attributes.faqs.data.length > 0 && (
        <FAQSection faqs={attributes.faqs.data} />
      )}
    </div>
  );
};
```

### Submission Components

#### SubmissionForm Component
```typescript
// src/components/submission/SubmissionForm/SubmissionForm.tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { submissionSchema } from '@/utils/validation';
import { useCreateSubmission } from '@/hooks/useSubmissions';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';

interface SubmissionFormProps {
  challengeId: number;
}

type SubmissionFormData = {
  runner: string;
  runner_url?: string;
  video_url?: string;
  note?: string;
  result?: string;
};

export const SubmissionForm = ({ challengeId }: SubmissionFormProps) => {
  const createSubmission = useCreateSubmission();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SubmissionFormData>({
    resolver: zodResolver(submissionSchema.omit({ challenge: true })),
  });
  
  const onSubmit = async (data: SubmissionFormData) => {
    try {
      await createSubmission.mutateAsync({
        ...data,
        challenge: challengeId,
      });
      
      reset();
      // Show success message
    } catch (error) {
      // Error is handled by the mutation
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Runner Name"
          placeholder="Your name or gamertag"
          error={errors.runner?.message}
          {...register('runner')}
        />
        
        <Input
          label="Runner Profile (Optional)"
          placeholder="Your Twitch/YouTube channel or social media"
          error={errors.runner_url?.message}
          {...register('runner_url')}
        />
      </div>
      
      <Input
        label="Video URL (Optional)"
        placeholder="YouTube or Twitch video of your run"
        helperText="Share your run video for the community to see!"
        error={errors.video_url?.message}
        {...register('video_url')}
      />
      
      <Input
        label="Result (Optional)"
        placeholder="e.g., 15:30, Day 47, Score: 1250"
        helperText="Your completion time, survival days, or score"
        error={errors.result?.message}
        {...register('result')}
      />
      
      <Textarea
        label="Notes (Optional)"
        placeholder="Share your experience, strategy, or any comments about the run..."
        rows={4}
        error={errors.note?.message}
        {...register('note')}
      />
      
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          <strong>Note:</strong> Your submission will be reviewed by moderators before appearing publicly. 
          This helps maintain quality and prevents spam.
        </p>
      </div>
      
      <Button
        type="submit"
        loading={isSubmitting || createSubmission.isPending}
        className="w-full"
      >
        Submit Run
      </Button>
      
      {createSubmission.error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <p className="text-sm text-red-800 dark:text-red-200">
            {createSubmission.error.message}
          </p>
        </div>
      )}
    </form>
  );
};
```

### Layout Components

#### PageLayout Component
```typescript
// src/components/layout/PageLayout/PageLayout.tsx
import { ReactNode } from 'react';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  showFooter?: boolean;
}

export const PageLayout = ({ 
  children, 
  title, 
  description,
  showFooter = true 
}: PageLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Header />
      
      <main className="flex-1">
        {(title || description) && (
          <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <div className="container mx-auto px-4 py-8">
              {title && (
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {title}
                </h1>
              )}
              {description && (
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  {description}
                </p>
              )}
            </div>
          </div>
        )}
        
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </main>
      
      {showFooter && <Footer />}
    </div>
  );
};
```

## Component Best Practices

### TypeScript Patterns
```typescript
// Strict typing for component props
interface ComponentProps {
  required: string;
  optional?: number;
  children: ReactNode;
}

// Use discriminated unions for variants
interface ButtonProps {
  variant: 'primary' | 'secondary';
  size: 'sm' | 'md' | 'lg';
}

// Generic components
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => ReactNode;
  keyExtractor: (item: T) => string | number;
}
```

### Performance Patterns
```typescript
// Memoization for expensive components
export const ExpensiveComponent = memo(({ data }: Props) => {
  // Component implementation
}, (prevProps, nextProps) => {
  // Custom comparison function
  return prevProps.data.id === nextProps.data.id;
});

// Lazy loading for route components
const ChallengePage = lazy(() => import('@/pages/ChallengePage'));

// Virtualization for large lists
import { FixedSizeList as List } from 'react-window';

export const VirtualizedList = ({ items }: Props) => (
  <List
    height={600}
    itemCount={items.length}
    itemSize={120}
    itemData={items}
  >
    {({ index, style, data }) => (
      <div style={style}>
        <ItemComponent item={data[index]} />
      </div>
    )}
  </List>
);
```

### Error Handling
```typescript
// Error boundary component
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError(error: Error): State {
    return { hasError: true };
  }
  
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Component error:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return this.props.fallback || <DefaultErrorFallback />;
    }
    
    return this.props.children;
  }
}

// Usage in components
export const SafeComponent = ({ children }: Props) => (
  <ErrorBoundary fallback={<div>Something went wrong</div>}>
    {children}
  </ErrorBoundary>
);
```

### Accessibility Patterns
```typescript
// ARIA labels and roles
<button
  aria-label="Close dialog"
  aria-expanded={isOpen}
  role="button"
  onClick={handleClose}
>
  <CloseIcon aria-hidden="true" />
</button>

// Focus management
const dialogRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  if (isOpen && dialogRef.current) {
    dialogRef.current.focus();
  }
}, [isOpen]);

// Skip links for keyboard navigation
<a href="#main-content" className="sr-only focus:not-sr-only">
  Skip to main content
</a>
```

This component guide provides a solid foundation for building consistent, reusable, and accessible components throughout the TLD Challenges frontend application.
