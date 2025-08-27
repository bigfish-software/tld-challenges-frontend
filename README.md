# TLD Challenges Frontend

React + TypeScript frontend for [tld-challenges.com](https://tld-challenges.com) - a web platform for The Long Dark community to manage challenges, tournaments, custom game settings, and run submissions.

## Architecture Overview

This repository contains the **React frontend application** that serves as the user interface for the TLD Challenges platform.

### Core Architecture Pattern
```
Frontend (React + TypeScript) → Strapi API (backend repo) → PostgreSQL Database (database repo)
```

### Integration Points
- **Backend Repository**: [tld-challenges-backend](https://github.com/bigfish-software/tld-challenges-backend) - Strapi v5+ CMS/API
- **Database Repository**: [tld-challenges-database](https://github.com/bigfish-software/tld-challenges-database) - PostgreSQL 17 setup
- **Frontend Repository**: This repository - React + TypeScript client application

### Data Flow
All data operations follow this strict pattern:
1. **Frontend** makes authenticated API requests to Strapi backend
2. **Strapi backend** processes requests and performs database operations
3. **PostgreSQL database** stores and retrieves data
4. **No direct frontend-database communication** is permitted

## Technology Stack

- **Framework**: React 18+ with TypeScript
- **Styling**: Tailwind CSS for responsive design
- **State Management**: React Query/TanStack Query for server state
- **Routing**: React Router v6+ for navigation
- **HTTP Client**: Axios for API communication
- **Authentication**: JWT token-based authentication with Strapi
- **Build Tool**: Vite for development and production builds
- **Testing**: Vitest + React Testing Library + Playwright
- **Component Development**: Storybook for component showcase and documentation

## Key Features

### Gaming Community Platform
- **Challenge Management**: Browse and view community challenges by category and difficulty
- **Tournament System**: View tournament standings and participate in competitive events
- **Anonymous Submissions**: Public submission system for challenge completion videos
- **Creator Profiles**: Browse challenges by community creators with social media integration
- **Custom Game Codes**: Access shareable game configuration codes for challenges
- **FAQ System**: Context-aware help system across all content types

### Platform Navigation Structure
The main navigation emphasizes the platform's key features in order of importance:

- **Custom Codes** are fundamental to the platform - they're the shareable game configuration codes that enable challenges
- **Challenges** are the core feature where users browse and participate in community challenges  
- **Tournaments** are the organized competitive events built on top of challenges

This navigation hierarchy reflects the platform's unique value proposition, with Custom Codes being the foundational feature that distinguishes TLD Challenges from other gaming platforms.

### User Experience Features
- **Responsive Design**: Mobile-first approach with excellent mobile experience
- **Light/Dark Theme Support**: Automatic system preference detection with manual toggle for gaming preferences
- **Video Integration**: YouTube/Twitch video embedding for submissions
- **Real-time Data**: Live updates for tournament standings and new submissions
- **Search & Filter**: Advanced filtering for challenges, tournaments, and creators
- **Performance Optimized**: Fast loading with efficient caching strategies

## Content Types Integration

The frontend integrates with 7 main Strapi content types:
- **Challenge**: Main challenge definitions with rules, custom codes, and metadata
- **Submission**: Anonymous run submissions (create-only from frontend)
- **Tournament**: Tournament structures with participant management
- **CustomCode**: Reusable custom game configuration codes with unique constraints
- **Rule**: Modular rule definitions with many-to-many challenge relationships
- **Creator**: Challenge creator profiles with social media links and slug identification
- **FAQ**: Frequently asked questions with multi-entity associations

## Setup and Development

### Prerequisites
- Node.js (v20 or v22 - Active LTS versions only)
- npm, yarn, or pnpm
- Access to running backend API (local or staging)
- JWT API token for authentication

### Local Development Setup

1. **Clone and Install**
   ```bash
   git clone https://github.com/bigfish-software/tld-challenges-frontend.git
   cd tld-challenges-frontend
   npm install
   ```

2. **Environment Configuration**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your API configuration
   ```

3. **Environment Variables**
   ```bash
   # .env.local
   VITE_API_BASE_URL=http://localhost:1337
   VITE_API_TOKEN=your-long-lived-jwt-token
   VITE_APP_DOMAIN=http://localhost:3000
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Access Application**
   - Development Server: `http://localhost:3000`
   - Hot reload enabled for rapid development

### Project Structure

```
src/
├── components/             # Reusable React components
│   ├── ui/                # Base UI components (buttons, forms, modals)
│   ├── layout/            # Layout components (header, footer, navigation)
│   ├── challenge/         # Challenge-specific components
│   ├── tournament/        # Tournament-specific components
│   ├── submission/        # Submission form and display components
│   └── creator/           # Creator profile components
├── pages/                 # Route-based page components
├── hooks/                 # Custom React hooks for API and state
├── services/              # API service layer (Axios configurations)
├── types/                 # TypeScript type definitions
├── utils/                 # Utility functions and helpers
├── styles/                # Global styles and Tailwind configurations
└── assets/                # Static assets (images, icons, fonts)
```

## API Integration

### Authentication Strategy
- **Long-lived JWT Token**: Single frontend consumer pattern with backend-provided API token
- **Environment-based Configuration**: Different tokens for development/staging/production
- **Automatic Authorization**: All API requests include JWT token in Authorization header

### Data Fetching Patterns
```typescript
// React Query for server state management
const { data: challenges, isLoading, error } = useQuery({
  queryKey: ['challenges', filters],
  queryFn: () => challengeService.getAll(filters),
  staleTime: 5 * 60 * 1000, // 5 minutes
});

// API Service Layer
export const challengeService = {
  getAll: (filters?: ChallengeFilters) => 
    apiClient.get('/api/challenges', { params: filters }),
  getById: (id: string) => 
    apiClient.get(`/api/challenges/${id}?populate=*`),
  // Read-only access - no create/update/delete operations
};
```

### Submission Handling
```typescript
// Anonymous submission creation
const submitRun = useMutation({
  mutationFn: (submission: SubmissionData) => 
    submissionService.create(submission),
  onSuccess: () => {
    // Handle successful submission
    showSuccessMessage('Run submitted successfully!');
  },
});
```

## Development Guidelines

### Code Quality Standards
- **TypeScript Strict Mode**: All code must pass strict type checking
- **ESLint + Prettier**: Consistent code formatting and linting rules
- **Component Patterns**: Functional components with hooks preferred
- **Error Boundaries**: Graceful error handling for API failures
- **Loading States**: Consistent loading UI patterns across the application

### State Management Strategy
- **Server State**: React Query for all API-related state management
- **Client State**: React useState/useReducer for UI state and form data
- **Global State**: Minimal global state, prefer local component state
- **Form Handling**: React Hook Form for complex forms with validation

### UI/UX Guidelines
- **Mobile-First**: Responsive design starting with mobile breakpoints
- **Dual Theme Support**: Complete light/dark theme implementation with gaming-optimized dark mode as default
- **Theme Consistency**: All components must support both light and dark variants
- **Performance Focus**: Optimize for fast loading and smooth interactions
- **Accessibility**: Follow WCAG guidelines for inclusive design with proper contrast ratios in both themes
- **External Media**: Support for YouTube and Twitch video embedding

## Security Implementation

### Client-Side Security
- **Input Validation**: All form inputs validated on both client and server
- **XSS Prevention**: Sanitize user-generated content before display
- **URL Validation**: Verify external links before embedding or redirecting
- **Content Security Policy**: Restrict resource loading to trusted domains

### API Security
- **Authentication Required**: All API calls require valid JWT token
- **Read-Only Access**: Frontend has read-only access to most content types
- **Rate Limiting**: Respect backend rate limits and implement client-side throttling
- **Error Handling**: Never expose sensitive information in error messages

## Performance Optimization

### Build Optimization
- **Code Splitting**: Route-based and component-based lazy loading
- **Tree Shaking**: Remove unused dependencies and code
- **Bundle Analysis**: Regular monitoring of bundle sizes
- **Asset Optimization**: Image optimization and compression

### Runtime Performance
- **React Query Caching**: Efficient server state caching and background updates
- **Virtual Scrolling**: For large lists of challenges, submissions, tournaments
- **Image Lazy Loading**: Progressive image loading for better perceived performance
- **Debounced Search**: Prevent excessive API calls during user input

## Component Development with Storybook

### Storybook Integration
Storybook serves as the primary tool for component development, documentation, and manual testing in the TLD Challenges frontend. It provides an isolated environment for building and testing UI components without the need for the full application context.

#### Development Workflow
1. **Component Creation**: Build React components with TypeScript
2. **Story Development**: Create comprehensive Storybook stories for all component variants
3. **Visual Testing**: Test components in isolation across different states and props
4. **Documentation**: Generate automatic documentation from stories and component props
5. **Manual Testing**: Interactive testing of component behavior and accessibility

#### Story Organization
```
src/components/
├── ui/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.stories.tsx
│   │   └── Button.test.tsx
│   └── Card/
├── challenge/
│   ├── ChallengeCard/
│   │   ├── ChallengeCard.tsx
│   │   ├── ChallengeCard.stories.tsx
│   │   └── ChallengeCard.test.tsx
```

#### Key Benefits
- **Isolated Development**: Build components without application dependencies
- **Visual Documentation**: Automatically generated component documentation
- **Accessibility Testing**: Built-in accessibility checks with addon-a11y
- **Responsive Testing**: Test components across different viewport sizes
- **Theme Testing**: Test both light and dark theme variants for all components
- **Interactive Testing**: Validate user interactions and component behavior

## Theme System Implementation

### Light and Dark Theme Requirements
The TLD Challenges frontend implements a comprehensive light/dark theme system designed specifically for the gaming community, with dark mode as the preferred default for gaming environments.

#### Core Theme Features
- **System Preference Detection**: Automatically detects user's system theme preference on first visit
- **Manual Theme Toggle**: User-controlled theme switching with persistent preference storage
- **Gaming-Optimized Dark Mode**: Enhanced dark theme with gaming-appropriate colors and contrast
- **Accessibility Compliance**: WCAG AA contrast ratios maintained in both themes
- **Component Consistency**: All UI components support both light and dark variants

#### Theme Implementation Strategy
```typescript
// Theme context and provider
export const ThemeContext = createContext<{
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}>({
  theme: 'dark', // Default to dark for gaming community
  toggleTheme: () => {},
});

// Custom hook for theme management
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
```

#### Tailwind CSS Theme Configuration
```css
/* Light theme variables */
:root {
  --color-background: 255 255 255;
  --color-foreground: 15 23 42;
  --color-primary: 59 130 246;
  --color-secondary: 107 114 128;
  --color-accent: 34 197 94;
  --color-border: 229 231 235;
}

/* Dark theme variables (gaming-optimized) */
.dark {
  --color-background: 15 23 42;
  --color-foreground: 248 250 252;
  --color-primary: 96 165 250;
  --color-secondary: 156 163 175;
  --color-accent: 34 197 94;
  --color-border: 51 65 85;
}
```

#### Component Theme Support
All components must implement both light and dark variants using Tailwind's dark mode utilities:
```typescript
// Example: ThemeAwareCard component
const Card: React.FC = ({ children }) => (
  <div className="
    bg-white dark:bg-slate-800 
    text-slate-900 dark:text-slate-100 
    border border-slate-200 dark:border-slate-700
    shadow-sm dark:shadow-slate-900/20
  ">
    {children}
  </div>
);
```

#### Gaming Community Considerations
- **Default Dark Mode**: Dark theme set as default for gaming preferences
- **High Contrast Options**: Enhanced contrast for better visibility during gaming
- **Blue Light Reduction**: Warmer color palette in dark mode for extended viewing
- **Visual Hierarchy**: Clear distinction between content areas in both themes

## Testing Strategy

### Testing Approach
- **Unit Tests**: Components, hooks, and utility functions
- **Integration Tests**: API service layer and complex component interactions
- **End-to-End Tests**: Critical user workflows and submission processes
- **Visual Regression**: Ensure UI consistency across changes

### Testing Tools
```bash
# Unit and Integration Testing
npm run test              # Vitest + React Testing Library

# End-to-End Testing
npm run test:e2e          # Playwright

# Coverage Reports
npm run test:coverage     # Generate test coverage reports

# Component Development and Documentation
npm run storybook         # Start Storybook development server
npm run build-storybook   # Build Storybook for production
npm run test-storybook    # Run Storybook component tests
```

## Deployment Strategy

### Unified Platform Deployment
The TLD Challenges frontend is deployed as part of a unified Docker-based architecture alongside the Strapi backend and PostgreSQL database.

#### Recommended Hosting Providers
- **DigitalOcean App Platform**: Docker-based applications with managed services ($25-50/month total)
- **Railway**: Git-based deployment with automatic environment management ($20-40/month total)
- **Render**: Simplified deployment with strong database support ($15-35/month total)

#### Architecture Benefits
- **Unified Environment Management**: Single deployment process for all components
- **Consistent Configuration**: Shared environment variables and networking
- **Cost Efficiency**: Single hosting provider for entire platform (~$200-650/year)
- **Simplified Scaling**: Scale entire platform together

### Production Considerations
- **Docker Integration**: Multi-stage builds with Nginx serving static assets
- **Environment Configuration**: Platform-level environment variable management
- **Error Monitoring**: Integration with error tracking services
- **Analytics**: Optional usage analytics for community insights

## Integration Points

### Backend Communication
- **API Base URL**: Configurable Strapi backend endpoint
- **JWT Authentication**: Long-lived token for API access
- **Content Population**: Efficient relational data fetching via Strapi populate
- **Error Handling**: Standardized error response processing

### External Services
- **YouTube Integration**: Video metadata and embedding
- **Twitch Integration**: Stream metadata and embedding
- **Social Media**: Creator profile social media links
- **Analytics Services**: Optional usage tracking and insights

## Contributing

### Development Workflow
1. **Feature Branches**: All development in dedicated feature branches
2. **Pull Request Process**: Code review required for all changes
3. **Testing Requirements**: Tests required for new features and bug fixes
4. **Documentation Updates**: Update documentation with significant changes

### Code Review Guidelines
- **Type Safety**: Ensure proper TypeScript usage and type coverage
- **Performance Impact**: Consider performance implications of changes
- **Accessibility**: Review for accessibility compliance and best practices
- **Mobile Responsiveness**: Test on various screen sizes and devices
- **API Integration**: Verify proper error handling and loading states

## Documentation

### Development Resources
- **[API Documentation](docs/api.md)** - Backend API endpoints and data models
- **[Component Guide](docs/components.md)** - Reusable component documentation
- **[Color System](docs/colors.md)** - Comprehensive color palette and theme implementation guide
- **[Deployment Guide](docs/deployment.md)** - Production deployment instructions
- **[Copilot Instructions](.github/copilot-instructions.md)** - AI development guidance
- **[Storybook](http://localhost:6006)** - Component showcase and interactive documentation (when running locally)

### External Documentation
- **[React Documentation](https://react.dev/)** - Official React documentation
- **[TypeScript Handbook](https://www.typescriptlang.org/docs/)** - TypeScript reference
- **[Tailwind CSS](https://tailwindcss.com/docs)** - Utility-first CSS framework
- **[React Query](https://tanstack.com/query/latest)** - Server state management
- **[Storybook Documentation](https://storybook.js.org/docs)** - Component development and testing

## Related Repositories

### Backend Integration
- **[tld-challenges-backend](https://github.com/bigfish-software/tld-challenges-backend)** - Strapi v5+ CMS/API backend
  - Contains all content-type definitions and API endpoints
  - Provides JWT authentication and content moderation
  - Manages database relationships and business logic
  - Handles anonymous submission processing

### Database Integration
- **[tld-challenges-database](https://github.com/bigfish-software/tld-challenges-database)** - PostgreSQL 17 setup
  - Database container configuration and orchestration
  - Data persistence layer for the platform
  - Development and production database management
  - Backup and recovery strategies

### Setup Dependencies
- **Initial Setup**: Refer to [backend repository setup guide](https://github.com/bigfish-software/tld-challenges-backend/blob/main/docs/initial-setup.md) for complete development environment
- **Content Type Architecture**: Review [backend ORM documentation](https://github.com/bigfish-software/tld-challenges-backend/blob/main/docs/orm.md) for data models
- **API Security**: Authentication and authorization handled by backend repository

## License

MIT License - see LICENSE file for details

## Community

### Getting Help
- **GitHub Issues**: Report bugs and request features
- **Discussions**: Community questions and general discussion
- **Pull Requests**: Contribute improvements and fixes
- **Documentation**: Help improve project documentation

### The Long Dark Community
This platform is built by and for The Long Dark gaming community. We welcome contributions from community members to help improve the challenge and tournament experience for all players.