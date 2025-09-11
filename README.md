# TLD Challenges Frontend

React + TypeScript frontend for [tld-challenges.com](https://tld-challenges.com) - a web platform for The Long Dark community to manage challenges, tournaments, custom game settings, and run submissions.

## Architecture Overview

This repository contains the frontend application that serves as the user interface for the TLD Challenges platform. It is part of a three-tier architecture:

```
Frontend (React + TypeScript) → Strapi API (backend repo) → PostgreSQL Database (database repo)
```

### Related Repositories
- **Backend**: [tld-challenges-backend](https://github.com/bigfish-software/tld-challenges-backend) - Strapi CMS/API
- **Database**: [tld-challenges-database](https://github.com/bigfish-software/tld-challenges-database) - PostgreSQL setup

## Technology Stack

- **Framework**: React 18+ with TypeScript
- **Styling**: Tailwind CSS for responsive design
- **State Management**: React Query/TanStack Query
- **Routing**: React Router v6+
- **Build Tool**: Vite
- **Component Development**: Storybook

## Quick Start

### Prerequisites
- Node.js (v20 or v22 - Active LTS versions)
- npm, yarn, or pnpm
- Access to running backend API (local or staging)
- JWT API token for authentication

### Setup and Development

1. **Clone and Install**
   ```bash
   git clone https://github.com/bigfish-software/tld-challenges-frontend.git
   cd tld-challenges-frontend
   npm install
   ```

2. **Configure Environment**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your API configuration:
   # VITE_API_BASE_URL=http://localhost:1337
   # VITE_API_TOKEN=your-jwt-token
   # VITE_APP_DOMAIN=http://localhost:3000
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Access Application**
   - Development Server: `http://localhost:3000`

For detailed setup instructions, see the [Getting Started Guide](docs/getting-started.md).

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run storybook` - Run Storybook for component development
- `npm run type-check` - Run TypeScript type checker

## Documentation

For more detailed information, please refer to the following documentation:

- [Getting Started](docs/getting-started.md) - Detailed setup and development workflow
- [API Integration](docs/api.md) - Backend API integration patterns
- [Component Architecture](docs/component-architecture.md) - Component design patterns
- [Component Development](docs/component-development.md) - Storybook development workflow
- [Components Guide](docs/components.md) - Reusable component documentation
- [Colors & Theme System](docs/colors.md) - Color palette and theme implementation
- [Deployment Guide](docs/deployment.md) - Production deployment instructions
- [Development Summary](docs/development-summary.md) - Project overview
- [External Links Configuration](docs/external-links.md) - Link management system
- [Project Structure](docs/project-structure.md) - Codebase organization

## License

MIT License - see LICENSE file for details