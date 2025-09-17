/**
 * External Links Configuration
 * 
 * Centralized configuration for all external links used throughout the application.
 * This provides a single source of truth for community links, social media, and external resources.
 */

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
    kofi: ExternalLink;
  };
  game: {
    steamStore: ExternalLink;
    hinterlandForums: ExternalLink;
  };
  social: {
    twitterShare: ExternalLink;
    redditShare: ExternalLink;
  };
}

/**
 * External Links Configuration
 * 
 * Update these URLs as needed. All external links throughout the application
 * should reference this configuration to ensure consistency.
 */
export const externalLinks: ExternalLinksConfig = {
  community: {
    github: {
      url: 'https://github.com/bigfish-software',
      label: 'GitHub',
      description: 'BigFish Github'
    },
    discord: {
      url: 'https://discord.gg/9SFXN4CZ', 
      label: 'Discord',
      description: 'BigFish Discord'
    },
    bigfishTwitch: {
      url: 'https://www.twitch.tv/b1gf1s4',
      label: 'BigFish',
      description: 'BigFish Twitch channel'
    },
    chefmariaTwitch: {
      url: 'https://www.twitch.tv/chefmaria',
      label: 'ChefMaria',
      description: 'ChefMaria Twitch channel'
    },
    bigfishMods: {
      url: 'https://github.com/B1gF1s4',
      label: 'BigFish Mods',
      description: 'BigFish Mods repository for The Long Dark game modifications'
    }
  },
  support: {
    githubIssues: {
      url: 'https://github.com/bigfish-software/tld-challenges-frontend/issues',
      label: 'GitHub Issues',
      description: 'Report bugs, request features, or get technical support'
    },
    kofi: {
      url: 'https://ko-fi.com/bigfishsoftware',
      label: 'Ko-fi',
      description: 'Support TLD Challenges with a direct donation'
    }
  },
  game: {
    steamStore: {
      url: 'https://store.steampowered.com/app/305620/The_Long_Dark/',
      label: 'Get the Game',
      description: 'Purchase The Long Dark on Steam'
    },
    hinterlandForums: {
      url: 'https://hinterlandforums.com/forums/',
      label: 'Hinterland Forums',
      description: 'Official The Long Dark community forums'
    }
  },
  social: {
    twitterShare: {
      url: 'https://twitter.com/intent/tweet',
      label: 'Share on Twitter',
      description: 'Share on Twitter with custom text and URL'
    },
    redditShare: {
      url: 'https://reddit.com/submit',
      label: 'Share on Reddit',
      description: 'Share on Reddit with custom title and URL'
    }
  }
};

/**
 * Helper function to get an external link by key path
 * 
 * @param path - Dot notation path to the link (e.g., 'community.github', 'support.githubIssues')
 * @returns ExternalLink object or undefined if not found
 */
export function getExternalLink(path: string): ExternalLink | undefined {
  const keys = path.split('.');
  let current: unknown = externalLinks;
  
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return undefined;
    }
  }
  
  return current && typeof current === 'object' && 'url' in current ? current as ExternalLink : undefined;
}

/**
 * Helper function to get just the URL for an external link
 * 
 * @param path - Dot notation path to the link
 * @returns URL string or empty string if not found
 */
export function getExternalUrl(path: string): string {
  const link = getExternalLink(path);
  return link?.url || '';
}

/**
 * Type-safe helper functions for commonly used links
 */
export const getGitHubUrl = () => externalLinks.community.github.url;
export const getDiscordUrl = () => externalLinks.community.discord.url;
export const getBigFishTwitchUrl = () => externalLinks.community.bigfishTwitch.url;
export const getChefMariaTwitchUrl = () => externalLinks.community.chefmariaTwitch.url;
export const getBigFishModsUrl = () => externalLinks.community.bigfishMods.url;
export const getGitHubIssuesUrl = () => externalLinks.support.githubIssues.url;
export const getKofiUrl = () => externalLinks.support.kofi.url;
export const getSteamStoreUrl = () => externalLinks.game.steamStore.url;
export const getHinterlandForumsUrl = () => externalLinks.game.hinterlandForums.url;

/**
 * Helper functions for social sharing
 */
export const getTwitterShareUrl = (text: string, url: string) => 
  `${externalLinks.social.twitterShare.url}?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;

export const getRedditShareUrl = (title: string, url: string) => 
  `${externalLinks.social.redditShare.url}?title=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;

/**
 * Get the app domain from environment or fallback
 */
export const getAppDomain = (): string => {
  // Try to get domain from environment variable first
  const envDomain = import.meta.env.VITE_APP_DOMAIN;
  if (envDomain) {
    return envDomain;
  }
  
  // Fallback to current location in browser
  if (typeof window !== 'undefined') {
    return `${window.location.protocol}//${window.location.host}`;
  }
  
  // Final fallback for SSR or development
  return 'https://tld-challenges.com';
};
