# External Links Configuration

This document describes the centralized external links configuration system used throughout the TLD Challenges frontend application.

## Overview

The external links configuration provides a single source of truth for all external URLs used in the application, including community links, support resources, and game-related links.

## Configuration File

**Location**: `src/config/externalLinks.ts`

The configuration is organized into logical categories:

```typescript
// src/config/externalLinks.ts
export const externalLinks: ExternalLinksConfig = {
  community: {
    github: { url: 'https://github.com/bigfish-software', label: 'GitHub' },
    discord: { url: 'https://discord.gg/kjxPkRuHvS', label: 'Discord' },
    bigfishTwitch: { url: 'https://twitch.tv/bigfishsoftware', label: 'BigFish Twitch' },
    chefmariaTwitch: { url: 'https://twitch.tv/chefmaria', label: 'ChefMaria Twitch' },
    bigfishMods: { url: 'https://github.com/bigfish-software/bigfish-mods', label: 'BigFish Mods' }
  },
  support: {
    githubIssues: { url: 'https://github.com/bigfish-software/tld-challenges-frontend/issues', label: 'GitHub Issues' }
  },
  game: {
    steamStore: { url: 'https://store.steampowered.com/app/305620/The_Long_Dark/', label: 'Steam Store' },
    officialWebsite: { url: 'https://www.thelongdark.com/', label: 'Official Website' }
  },
  social: {
    youtube: { url: 'https://www.youtube.com/c/TheLongDark', label: 'YouTube' },
    reddit: { url: 'https://www.reddit.com/r/thelongdark/', label: 'Reddit' }
  }
};
```

The categories include:

### Community Links
- **GitHub**: BigFish Software organization
- **Discord**: TLD Challenges community server
- **BigFish Twitch**: Development and gaming streams
- **ChefMaria Twitch**: The Long Dark gameplay and challenges
- **BigFish Mods**: Game modification repository

### Support Links
- **GitHub Issues**: Bug reports and feature requests

### Game Links
- **Steam Store**: Official The Long Dark Steam page
- **Official Website**: The Long Dark official website

### Social Links
- **YouTube**: Official The Long Dark YouTube channel
- **Reddit**: The Long Dark community subreddit

## TypeScript Interfaces

```typescript
export interface ExternalLink {
  url: string;
  label: string;
  description?: string;
}

export interface ExternalLinksConfig {
  community: {
    github: ExternalLink;
    discord: ExternalLink;
    bigfishTwitch: ExternalLink;
    chefmariaTwitch: ExternalLink;
    bigfishMods: ExternalLink;
  };
  support: {
    githubIssues: ExternalLink;
  };
  game: {
    steamStore: ExternalLink;
    officialWebsite: ExternalLink;
  };
  social: {
    youtube: ExternalLink;
    reddit: ExternalLink;
  };
}
```

## Usage Patterns

### Basic Usage

```typescript
import { externalLinks } from '@/config/externalLinks';

// In a React component
<a 
  href={externalLinks.community.github.url}
  target="_blank"
  rel="noopener noreferrer"
>
  {externalLinks.community.github.label}
</a>
```

### Usage Examples

```typescript
// Import the configuration
import { externalLinks, getExternalUrl, getGitHubUrl, getDiscordUrl } from '@/config/externalLinks';

// Use in components
<a href={externalLinks.community.github.url} target="_blank" rel="noopener noreferrer">
  {externalLinks.community.github.label}
</a>

// Helper functions
const githubUrl = getExternalUrl('community.github');
const discordUrl = getDiscordUrl(); // Type-safe helper for Discord
const githubDirectUrl = getGitHubUrl(); // Type-safe helper for GitHub
```

### Helper Functions

```typescript
import { 
  getExternalLink, 
  getExternalUrl,
  getGitHubUrl,
  getDiscordUrl 
} from '@/config/externalLinks';

// Generic helper
const githubLink = getExternalLink('community.github');
const githubUrl = getExternalUrl('community.github');

// Type-safe helpers
const githubUrl = getGitHubUrl();
const discordUrl = getDiscordUrl();
```

### Dynamic Link Access

```typescript
// For dynamic access using dot notation
const linkPath = 'community.github';
const link = getExternalLink(linkPath);

if (link) {
  console.log(`${link.label}: ${link.url}`);
}
```

## Current Usage

The external links configuration is currently used in:

- **Footer Component**: All community links
- **Privacy Policy Page**: GitHub Issues link for support
- **Future Components**: Ready for use in headers, contact pages, etc.

## Benefits

### Maintainability
- **Centralized Management**: Update URLs in one place
- **Consistency**: Standardized labels and descriptions
- **Type Safety**: TypeScript ensures correct usage

### Developer Experience
- **IntelliSense Support**: Auto-completion for link properties
- **Error Prevention**: Compile-time checks for missing links
- **Documentation**: Built-in descriptions for each link

### Scalability
- **Easy Extension**: Add new categories and links
- **Helper Functions**: Create utilities for common patterns
- **Component Reuse**: Share links across multiple components

## Adding New Links

### 1. Add to Configuration

```typescript
// In src/config/externalLinks.ts
export const externalLinks: ExternalLinksConfig = {
  // ... existing categories
  newCategory: {
    newLink: {
      url: 'https://example.com',
      label: 'Example Link',
      description: 'Description of the link purpose'
    }
  }
};
```

### 2. Update TypeScript Interfaces

```typescript
export interface ExternalLinksConfig {
  // ... existing categories
  newCategory: {
    newLink: ExternalLink;
  };
}
```

### 3. Create Helper Functions (Optional)

```typescript
// Type-safe helper for commonly used links
export const getNewLinkUrl = () => externalLinks.newCategory.newLink.url;
```

### 4. Update Components

```typescript
// Use in components
import { externalLinks } from '@/config/externalLinks';

<a href={externalLinks.newCategory.newLink.url}>
  {externalLinks.newCategory.newLink.label}
</a>
```

## Best Practices

### Link Structure
- Use descriptive, hierarchical categories
- Include meaningful descriptions for documentation
- Keep labels concise but clear

### URL Management
- Use full URLs including protocol (https://)
- Verify URLs are correct and accessible
- Use placeholder URLs for links not yet available

### Component Usage
- Always use `target="_blank"` for external links
- Include `rel="noopener noreferrer"` for security
- Provide accessible labels and descriptions

### Error Handling
- Use helper functions that return fallback values
- Check for undefined links before rendering
- Provide meaningful error messages for missing links

## Security Considerations

### Link Validation
- All URLs should be verified before adding to configuration
- Use HTTPS URLs whenever possible
- Avoid shortened URLs or redirects

### External Link Safety
- Include proper `rel` attributes for external links
- Validate that external links point to trusted domains
- Monitor external links for availability and security

## Future Enhancements

### Planned Features
- **Dynamic Configuration**: Environment-based link configuration


### Potential Improvements
- **Localization**: Multi-language support for link labels
- **A/B Testing**: Multiple variants of links for testing
- **Performance**: Lazy loading of link metadata
- **Accessibility**: Enhanced screen reader support

## Troubleshooting

### Common Issues

**Link Not Found Error**
```typescript
// Problem: getExternalLink returns undefined
const link = getExternalLink('invalid.path');

// Solution: Check path and add fallback
const link = getExternalLink('community.github') || { url: '#', label: 'Link' };
```

**TypeScript Errors**
```typescript
// Problem: Property doesn't exist on interface
externalLinks.nonexistent.link; // Error

// Solution: Add to interface or use optional chaining
externalLinks.community?.github?.url;
```

**Missing Link Categories**
```typescript
// Problem: Category not defined in configuration
// Solution: Add category to externalLinks and interface
```

### Debug Helpers

```typescript
// Log all available links
console.log('Available links:', externalLinks);

// Validate specific link
const validateLink = (path: string) => {
  const link = getExternalLink(path);
  console.log(`${path}:`, link ? 'Found' : 'Not found');
};
```

## Related Documentation

- **[Component Documentation](./components.md)**: Using external links in components
- **[Development Guidelines](../README.md#development-guidelines)**: General development practices
- **[Security Guidelines](./security.md)**: External link security considerations
