# Deployment Guide

This document provides comprehensive deployment instructions for the TLD Challenges frontend application as part of the unified TLD Challenges platform deployment strategy.

## Overview

The TLD Challenges frontend is a React + TypeScript single-page application (SPA) built with Vite. It's deployed as part of a unified Docker-based architecture alongside the Strapi backend and PostgreSQL database. This approach ensures consistent environment management and simplified deployment procedures across the entire platform.

## Unified Deployment Architecture

The TLD Challenges platform follows a unified deployment strategy where all components are deployed together:

```
┌─────────────────────────────────────────────────────────────┐
│                    TLD Challenges Platform                  │
├─────────────────────────────────────────────────────────────┤
│  Frontend (React + TypeScript) - Port 3000                  │
│  Backend (Strapi API) - Port 1337                           │
│  Database (PostgreSQL) - Internal                           │
├─────────────────────────────────────────────────────────────┤
│                 Hosting Provider                            │
│        (DigitalOcean / Railway / Render)                    │
└─────────────────────────────────────────────────────────────┘
```

This architecture provides:
- **Unified Environment Management**: Single deployment process for all components
- **Consistent Configuration**: Shared environment variables and networking
- **Simplified Scaling**: Scale entire platform together
- **Cost Efficiency**: Single hosting provider for all services

## Environment Configuration

### Environment Variables

The frontend application uses environment variables that are configured at the platform level. These variables are managed through the unified deployment process and shared across all components.

```bash
# Development Environment
VITE_API_BASE_URL=http://localhost:1337
VITE_API_TOKEN=your-development-jwt-token
VITE_APP_DOMAIN=http://localhost:3000
VITE_APP_ENV=development

# Staging Environment
VITE_API_BASE_URL=https://staging-api.tld-challenges.com
VITE_API_TOKEN=your-staging-jwt-token
VITE_APP_DOMAIN=https://staging.tld-challenges.com
VITE_APP_ENV=staging

# Production Environment
VITE_API_BASE_URL=https://api.tld-challenges.com
VITE_API_TOKEN=your-production-jwt-token
VITE_APP_DOMAIN=https://tld-challenges.com
VITE_APP_ENV=production
```

### Frontend Build Configuration

The frontend is built as part of the Docker multi-stage build process:

```bash
# Install dependencies
npm ci --only=production

# Build for production
npm run build

# Verify build
npm run preview

# Type checking (in CI/CD)
npm run type-check

# Linting (in CI/CD)
npm run lint
```

## Unified Platform Deployment

The TLD Challenges platform uses a unified deployment strategy with Docker containers deployed to managed hosting providers. The frontend is deployed alongside the backend and database as part of a single orchestrated deployment.

### Recommended Hosting Providers

Based on the platform's hosting strategy, the following providers are recommended for unified deployment:

#### 1. DigitalOcean App Platform (Recommended)

**Best for**: Docker-based applications with managed services

**Advantages**:
- Excellent Docker container support for all platform components
- Managed PostgreSQL databases with automatic backups
- Automatic SSL certificates for custom domains
- Built-in monitoring and logging across all services
- Predictable pricing structure

**Estimated Cost**: $25-50/month total platform cost
- App Platform: $12-25/month (covers frontend + backend)
- Managed Database: $15-25/month

**Architecture Fit**:
- Direct deployment of existing Docker Compose setup
- Seamless integration with containerized Strapi backend
- Frontend served via Nginx alongside API services
- Automatic scaling capabilities for traffic growth

#### 2. Railway

**Best for**: Modern, developer-friendly deployment workflow

**Advantages**:
- Git-based deployment workflow with automatic builds
- Automatic environment management across development/staging/production
- Built-in PostgreSQL offerings with easy migration
- Simple pricing model with usage-based scaling
- Excellent developer experience with real-time logs

**Estimated Cost**: $20-40/month total platform cost
- Railway Pro: $20/month base + usage-based scaling
- Database: Included in usage pricing model

**Architecture Fit**:
- Native Docker support for multi-service deployments
- Environment-based deployments (dev/staging/prod)
- Automatic HTTPS and custom domain configuration
- Integrated monitoring across all platform components

#### 3. Render

**Best for**: Simplified deployment with strong database support

**Advantages**:
- Free tier available for testing and development
- Managed PostgreSQL with automatic backups and monitoring
- Custom domain support with automatic SSL
- Environmental configurations with secret management
- Good performance for small to medium applications

**Estimated Cost**: $15-35/month total platform cost
- Web services: $7-25/month (frontend + backend combined)
- PostgreSQL: $7-15/month

**Architecture Fit**:
- Docker deployment support for containerized applications
- Automatic deployments from Git repositories
- Built-in environment management and secret handling
- Integrated health checks and monitoring

### Providers to Avoid

#### Vercel/Netlify (for unified deployment)

**Reason**: Designed for static sites and JAMstack applications, not suitable for unified full-stack deployment

- No native Docker support for multi-service deployments
- Limited database options and backend service integration
- Not suitable for full-stack applications with persistent databases
- Would require separate hosting for backend and database components

#### Traditional Shared Hosting

**Reason**: Incompatible with containerized architecture

- No Docker support for modern application deployment
- Limited database management and configuration options
- Insufficient for modern web application requirements
- No support for environment-based deployments

#### Enterprise Cloud (AWS/GCP/Azure)

**Reason**: Overkill and expensive for community gaming platform

- Complex setup and management requiring significant DevOps expertise
- High costs for small-scale applications
- Over-engineered for community platform requirements
- Requires significant infrastructure management overhead

## Docker Configuration for Frontend

The frontend is containerized as part of the unified platform deployment. Here's the Docker configuration specific to the frontend component:
### Frontend Dockerfile

```dockerfile
# Multi-stage build for optimized production image
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Build application with build-time environment variables
ARG VITE_API_BASE_URL
ARG VITE_API_TOKEN
ARG VITE_APP_DOMAIN
ARG VITE_APP_ENV

# Build application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built application
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
```

### Nginx Configuration

Create `nginx.conf` for serving the React SPA:

```nginx
server {
    listen 80;
    server_name _;
    
    root /usr/share/nginx/html;
    index index.html;
    
    # Enable gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1000;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/javascript
        application/xml+rss
        application/json;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    
    # Static asset caching
    location /assets {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Handle client-side routing (React Router)
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Health check endpoint
    location /health {
        access_log off;
        return 200 "healthy\n";
        add_header Content-Type text/plain;
    }
}
```

### Platform-Specific Docker Compose

The frontend is deployed as part of the unified platform Docker Compose configuration. Here's how it integrates:

```yaml
version: '3.8'

services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
      args:
        VITE_API_BASE_URL: ${API_BASE_URL}
        VITE_API_TOKEN: ${API_TOKEN}
        VITE_APP_DOMAIN: ${APP_DOMAIN}
        VITE_APP_ENV: ${NODE_ENV}
    ports:
      - "3000:80"
    environment:
      - NODE_ENV=${NODE_ENV}
    restart: unless-stopped
    networks:
      - tld-challenges
    depends_on:
      - backend
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  backend:
    # Backend service configuration (from backend repo)
    
  database:
    # Database service configuration (from database repo)

networks:
  tld-challenges:
    driver: bridge

volumes:
  postgres_data:
```

## Deployment Workflow

### Phase 1: Domain Setup (Immediate - 1-2 weeks)

1. **Purchase Domain**
   - Target Domain: `tld-challenges.com`
   - Recommended Registrar: GoDaddy or similar reputable registrar
   - Annual cost: ~$12-15/year

2. **DNS Configuration**
   - Set up basic DNS records pointing to temporary landing page
   - Configure email forwarding (e.g., admin@tld-challenges.com)
   - Create temporary "Coming Soon" page

3. **SSL Preparation**
   - Domain verification for SSL certificates
   - Prepare for automatic HTTPS configuration

### Phase 2: Development and Testing (1-3 months)

1. **Local Development Completion**
   - Complete frontend development with Docker setup integration
   - Test unified platform deployment locally
   - Verify API integration with backend services
   - Complete responsive design and accessibility testing

2. **Environment Configuration**
   - Prepare environment variables for different deployment stages
   - Test environment-specific configurations
   - Document deployment procedures

3. **CI/CD Pipeline Setup**
   - Configure automated testing pipeline
   - Set up build and deployment automation
   - Prepare staging environment configurations

### Phase 3: Hosting Provider Selection (1-2 weeks before launch)

1. **Provider Evaluation**
   - Evaluate hosting providers based on current platform requirements
   - Consider cost, performance, and scalability factors
   - Test deployment procedures on chosen provider

2. **Staging Environment**
   - Deploy complete platform to staging environment
   - Test full platform functionality
   - Verify frontend-backend-database integration
   - Performance testing and optimization

3. **Production Preparation**
   - Configure production environment variables
   - Set up monitoring and backup strategies
   - Prepare rollback procedures

### Phase 4: Production Deployment (Deployment day)

1. **Platform Deployment**
   - Deploy unified platform (frontend + backend + database)
   - Update DNS records to point to production servers
   - Configure SSL certificates (automatic with recommended providers)

2. **Verification and Monitoring**
   - Verify all platform services are operational
   - Test frontend functionality end-to-end
   - Monitor performance and error rates
   - Verify external integrations (YouTube, Twitch)

3. **Post-Deployment**
   - Monitor platform stability for 24-48 hours
   - Address any immediate issues
   - Document any deployment learnings

## Frontend Optimization

### Build Optimization for Production

#### Vite Configuration
```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    // Bundle analyzer (optional for development)
    ...(process.env.ANALYZE ? [visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true,
    })] : []),
  ],
  build: {
    target: 'es2015',
    outDir: 'dist',
    sourcemap: process.env.NODE_ENV !== 'production',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: process.env.NODE_ENV === 'production',
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          query: ['@tanstack/react-query'],
          ui: ['@headlessui/react', '@heroicons/react'],
        },
      },
    },
  },
  server: {
    port: 3000,
    host: true,
  },
  preview: {
    port: 3000,
    host: true,
  },
});
```

### Performance Monitoring Integration

#### Bundle Analysis
```bash
# Generate bundle analyzer report (during development)
ANALYZE=true npm run build
npx vite-bundle-analyzer

# Analyze bundle size in CI/CD
npm run build
npx bundlesize
```

#### Web Vitals Integration
```typescript
// src/lib/analytics.ts
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric: any) {
  // Send to unified platform analytics
  console.log('Web Vital:', metric);
  
  // Optional: Send to external monitoring service
  if (import.meta.env.PROD) {
    // Send to monitoring service
  }
}

// Initialize web vitals monitoring
export function initWebVitals() {
  getCLS(sendToAnalytics);
  getFID(sendToAnalytics);
  getFCP(sendToAnalytics);
  getLCP(sendToAnalytics);
  getTTFB(sendToAnalytics);
}
```

## Security and Monitoring

### Frontend Security Considerations

#### Content Security Policy
```javascript
// CSP headers configured at hosting provider level
const cspDirectives = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'", // Required for React
  "style-src 'self' 'unsafe-inline'",  // Required for Tailwind CSS
  "img-src 'self' data: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://api.tld-challenges.com", // Backend API
  "frame-src 'self' https://www.youtube.com https://player.twitch.tv", // Video embeds
  "media-src 'self' https://www.youtube.com https://player.twitch.tv"  // Video sources
].join('; ');
```

#### Environment Security
```bash
# Secure environment variables through hosting provider
# Never commit sensitive tokens to version control

# DigitalOcean App Platform
doctl apps create-deployment --app-id <app-id> --spec-path app.yaml

# Railway
railway variables set VITE_API_TOKEN=your-secure-token

# Render
# Set via Render dashboard Environment tab
```

### Unified Platform Monitoring

#### Error Tracking with Sentry
```typescript
// src/lib/sentry.ts
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

if (import.meta.env.PROD) {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    integrations: [
      new BrowserTracing(),
    ],
    tracesSampleRate: 0.1,
    environment: import.meta.env.VITE_APP_ENV,
    beforeSend(event) {
      // Filter out non-critical errors
      if (event.exception) {
        const error = event.exception.values?.[0];
        if (error?.type === 'ChunkLoadError') {
          // Handle chunk loading errors gracefully
          return null;
        }
      }
      return event;
    },
  });
}

// Usage in error boundary
export const ErrorBoundary = Sentry.withErrorBoundary(Component, {
  fallback: ErrorFallback,
  beforeCapture: (scope) => {
    scope.setTag('errorBoundary', true);
    scope.setTag('component', 'frontend');
  },
});
```

## Cost Analysis

### Unified Platform Costs

The frontend deployment is included in the overall platform hosting costs:

#### Annual Cost Breakdown
- **Domain Registration**: $15/year
- **Hosting Platform**: $180-600/year ($15-50/month)
  - DigitalOcean App Platform: $300-600/year
  - Railway: $240-480/year
  - Render: $180-420/year

#### Additional Services (Optional)
- **CDN (CloudFlare)**: $0-240/year
- **Monitoring (Uptime Robot)**: $0-120/year
- **Error Tracking (Sentry)**: $0-360/year (free tier available)
- **Analytics**: $0 (can use free solutions)

**Total Estimated Annual Cost**: $200-650/year for complete platform

### Scaling Considerations

#### Traffic Growth
- All recommended providers offer automatic scaling
- Frontend static assets cached at CDN level
- Database scaling handled separately in unified platform

#### Geographic Distribution
- CDN can be added later for global performance
- All providers offer global edge locations
- Frontend optimized for fast initial load times

## Backup and Recovery

### Unified Platform Backup Strategy

#### Git-Based Version Control
```bash
# Tag stable releases for easy rollback
git tag -a v1.0.0 -m "Production release v1.0.0"
git push origin v1.0.0

# Backup deployment configuration
git add docker-compose.yml nginx.conf
git commit -m "Update production deployment config"
```

#### Environment Configuration Backup
```bash
# Store environment variables securely
# Use hosting provider's secret management
# Document all environment variables in deployment guide
# Keep encrypted backup of production environment configuration
```

### Rollback Procedures

#### Hosting Provider Rollbacks

**DigitalOcean App Platform**:
```bash
# Rollback to previous deployment
doctl apps list-deployments <app-id>
doctl apps create-deployment <app-id> --source-image <previous-deployment-image>
```

**Railway**:
```bash
# Rollback via Railway CLI
railway rollback <deployment-id>

# Or via Railway dashboard - click "Rollback" on previous deployment
```

**Render**:
```bash
# Render rollback via dashboard
# Select previous deployment and click "Redeploy"
# Automatic rollback on health check failures
```

#### Docker Image Rollback
```bash
# Tag current image as backup
docker tag tld-challenges-frontend:latest tld-challenges-frontend:backup-$(date +%Y%m%d)

# Rollback to previous version
docker pull tld-challenges-frontend:previous-stable
docker tag tld-challenges-frontend:previous-stable tld-challenges-frontend:latest

# Restart services
docker-compose up -d frontend
```

## Troubleshooting

### Common Frontend Issues

#### Build Failures
```bash
# Clear cache and reinstall dependencies
rm -rf node_modules package-lock.json dist
npm install

# Verify Node.js version compatibility
node --version  # Should be 20+
npm --version

# Check environment variables during build
npm run build -- --debug
echo $VITE_API_BASE_URL
echo $VITE_API_TOKEN
```

#### Runtime API Connection Issues
```bash
# Test API connectivity from container
docker exec -it frontend-container curl -H "Authorization: Bearer $VITE_API_TOKEN" $VITE_API_BASE_URL/api/challenges

# Check network configuration
docker network ls
docker network inspect tld-challenges

# Verify backend service is running
docker-compose ps
docker-compose logs backend
```

#### Performance Issues
```bash
# Analyze bundle size
npm run build
npx vite-bundle-analyzer

# Check for memory leaks in browser
# Use React DevTools Profiler
# Monitor network requests in browser dev tools

# Check container resource usage
docker stats frontend-container
```

#### Client-Side Routing Issues
```bash
# Verify nginx configuration
docker exec -it frontend-container cat /etc/nginx/conf.d/default.conf

# Test routing configuration
curl -I http://localhost:3000/challenges
curl -I http://localhost:3000/tournaments

# Check browser console for routing errors
```

### Platform Integration Issues

#### CORS Configuration
```bash
# Verify CORS settings in backend
# Check browser network tab for CORS errors
# Ensure backend CORS settings include frontend domain

# Test CORS from frontend domain
curl -H "Origin: https://tld-challenges.com" \
     -H "Access-Control-Request-Method: GET" \
     -H "Access-Control-Request-Headers: Authorization" \
     -X OPTIONS \
     https://api.tld-challenges.com/api/challenges
```

#### Environment Variable Issues
```bash
# Verify environment variables are available during build
docker build --build-arg VITE_API_BASE_URL=$VITE_API_BASE_URL \
             --build-arg VITE_API_TOKEN=$VITE_API_TOKEN \
             -t frontend-debug .

# Check built application for correct environment variables
docker run --rm frontend-debug cat /usr/share/nginx/html/assets/index.*.js | grep -o "VITE_API_BASE_URL"
```

## Conclusion

The TLD Challenges frontend deployment strategy aligns with the unified platform approach, ensuring:

1. **Consistency**: All platform components deployed together using Docker
2. **Simplicity**: Single hosting provider for entire platform
3. **Cost Efficiency**: Shared resources and infrastructure costs
4. **Scalability**: Platform scales as a unified system
5. **Maintainability**: Single deployment pipeline and monitoring system

This approach provides a solid foundation for the TLD Challenges platform while maintaining operational simplicity and cost efficiency. The unified deployment strategy ensures that frontend, backend, and database components work together seamlessly across all environments.

### Related Documentation

- **Unified Hosting Strategy**: [tld-challenges-database/docs/hosting.md](https://github.com/bigfish-software/tld-challenges-database/blob/main/docs/hosting.md)
- **Backend Deployment**: [tld-challenges-backend deployment documentation](https://github.com/bigfish-software/tld-challenges-backend)
- **Database Setup**: [tld-challenges-database](https://github.com/bigfish-software/tld-challenges-database)
