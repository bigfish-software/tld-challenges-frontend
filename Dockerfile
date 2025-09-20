# Multi-stage build for optimized production image
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Accept build arguments from Railway
ARG VITE_API_BASE_URL
ARG VITE_API_TOKEN
ARG VITE_APP_DOMAIN
ARG VITE_RECAPTCHA_SITE_KEY
ARG VITE_APP_ENV
ARG VITE_ENABLE_ANALYTICS
ARG VITE_ENABLE_DEV_TOOLS

# Make environment variables available to Vite
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_API_TOKEN=$VITE_API_TOKEN
ENV VITE_APP_DOMAIN=$VITE_APP_DOMAIN
ENV VITE_RECAPTCHA_SITE_KEY=$VITE_RECAPTCHA_SITE_KEY
ENV VITE_APP_ENV=$VITE_APP_ENV
ENV VITE_ENABLE_ANALYTICS=$VITE_ENABLE_ANALYTICS
ENV VITE_ENABLE_DEV_TOOLS=$VITE_ENABLE_DEV_TOOLS

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