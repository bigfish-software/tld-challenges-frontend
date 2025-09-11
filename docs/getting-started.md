# Getting Started

This document provides detailed instructions for setting up and starting development on the TLD Challenges frontend application.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 20.x or 22.x (Active LTS versions only)
- **npm**, **yarn**, or **pnpm**: For package management
- **Git**: For version control
- **VS Code** (recommended): With suggested extensions

## Environment Setup

### 1. Clone the Repository

```bash
git clone https://github.com/bigfish-software/tld-challenges-frontend.git
cd tld-challenges-frontend
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the project root:

```bash
cp .env.example .env.local
```

Edit the `.env.local` file with your configuration:

```
# API Configuration
VITE_API_BASE_URL=http://localhost:1337
VITE_API_TOKEN=your-jwt-token
VITE_APP_DOMAIN=http://localhost:3000

# Optional Configuration
VITE_APP_ENV=development
```

#### Required Environment Variables

- **VITE_API_BASE_URL**: URL of the Strapi backend (without trailing slash)
- **VITE_API_TOKEN**: JWT token for API authentication (obtain from backend)
- **VITE_APP_DOMAIN**: Frontend application domain

### 4. Backend Connection

The frontend requires a running backend API. You have two options:

#### Option 1: Run Local Backend

Follow the setup instructions in the [tld-challenges-backend](https://github.com/bigfish-software/tld-challenges-backend) repository to run a local backend server.

#### Option 2: Connect to Staging Backend

Contact a team member for staging environment credentials and update your `.env.local` file:

```
VITE_API_BASE_URL=https://staging-api.tld-challenges.com
VITE_API_TOKEN=staging-jwt-token
```

## Development Workflow

### Starting the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

This will start the development server at http://localhost:3000 with hot-module replacement enabled.

### Type Checking

We use TypeScript's strict mode for enhanced type safety. Run type checking with:

```bash
npm run type-check
# or
yarn type-check
# or
pnpm type-check
```

### Component Development with Storybook

Storybook is our primary tool for component development:

```bash
npm run storybook
# or
yarn storybook
# or
pnpm storybook
```

This will start Storybook at http://localhost:6006.

### Running Tests

```bash
# Run all tests
npm run test
# or
yarn test
# or
pnpm test

# Run tests in watch mode
npm run test:watch
# or
yarn test:watch
# or
pnpm test:watch
```

### Building for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
```

To preview the production build:

```bash
npm run preview
# or
yarn preview
# or
pnpm preview
```

## Project Structure

The project follows a feature-based structure:

```
src/
├── App.tsx              # Main application component
├── assets/              # Static assets (images, fonts)
├── components/          # Reusable React components
│   ├── ui/              # UI components (including domain-specific components)
│   └── layout/          # Layout components (header, footer, page structure)
├── config/              # Application configuration
├── contexts/            # React context providers
├── hooks/               # Custom React hooks
├── pages/               # Route-based page components
├── services/            # API service layer
├── styles/              # Global styles and Tailwind
├── types/               # TypeScript type definitions
└── utils/               # Utility functions
```

For a more detailed breakdown, see [Project Structure](./project-structure.md).

## Development Guidelines

### Code Style

We use ESLint and Prettier for code formatting:

```bash
# Lint the codebase
npm run lint
# or
yarn lint
# or
pnpm lint

# Format code with Prettier
npm run format
# or
yarn format
# or
pnpm format
```

### Git Workflow

1. Create a feature branch from `develop`:
   ```bash
   git checkout develop
   git pull
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and commit them:
   ```bash
   git add .
   git commit -m "feat: add your feature"
   ```

3. Push your branch and create a pull request:
   ```bash
   git push -u origin feature/your-feature-name
   ```

4. Once approved, merge your pull request into the `develop` branch.

## Troubleshooting

### Common Issues

#### API Connection Issues

If you're having trouble connecting to the API:

1. Verify that the backend server is running
2. Check your `.env.local` file for correct API URL and token
3. Ensure the token has not expired
4. Check browser console for CORS errors

#### Build Errors

If you encounter build errors:

1. Update Node.js to the latest LTS version
2. Delete `node_modules` and reinstall dependencies
3. Run `npm run type-check` to identify type errors
4. Check for conflicting dependencies

#### Storybook Issues

If Storybook fails to start:

1. Update Storybook dependencies
2. Clear the Storybook cache: `npm run storybook -- --no-manager-cache`
3. Check for errors in story files

## Getting Help

If you need help:

- **Documentation**: Review the project documentation in the `docs/` directory
- **GitHub Issues**: Check existing issues or create a new one

## Next Steps

- Review the [Component Architecture](./component-architecture.md) documentation
- Explore the existing components in Storybook
- Check out the [API Integration](./api.md) patterns
- Learn about the [Theme System](./colors.md)

## Related Documentation

- **[API Integration](./api.md)**: Backend API integration patterns
- **[Component Architecture](./component-architecture.md)**: Component design patterns
- **[Component Development](./component-development.md)**: Storybook workflow
- **[Colors & Theme](./colors.md)**: Color system and theme implementation
- **[Deployment Guide](./deployment.md)**: Production deployment instructions
