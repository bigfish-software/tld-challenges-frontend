import { 
  YouTubeIcon, 
  TwitchIcon, 
  TwitterIcon, 
  ExternalLinkIcon 
} from '@/components/ui/icons';

export type SocialPlatform = 'youtube' | 'twitch' | 'twitter' | 'unknown';

/**
 * Detects the social media platform from a URL
 */
export const detectSocialPlatform = (url: string): SocialPlatform => {
  if (!url) return 'unknown';
  
  const lowerUrl = url.toLowerCase();
  
  if (lowerUrl.includes('youtube.com') || lowerUrl.includes('youtu.be')) {
    return 'youtube';
  }
  
  if (lowerUrl.includes('twitch.tv')) {
    return 'twitch';
  }
  
  if (lowerUrl.includes('twitter.com') || lowerUrl.includes('x.com')) {
    return 'twitter';
  }
  
  return 'unknown';
};

/**
 * Gets the appropriate icon component for a social platform
 */
export const getSocialIcon = (platform: SocialPlatform) => {
  switch (platform) {
    case 'youtube':
      return YouTubeIcon;
    case 'twitch':
      return TwitchIcon;
    case 'twitter':
      return TwitterIcon;
    default:
      return ExternalLinkIcon;
  }
};

/**
 * Gets the appropriate icon component for a URL
 */
export const getSocialIconForUrl = (url: string) => {
  const platform = detectSocialPlatform(url);
  return getSocialIcon(platform);
};

/**
 * Checks if a URL is a video URL (YouTube or Twitch)
 */
export const isVideoUrl = (url: string): boolean => {
  const platform = detectSocialPlatform(url);
  return platform === 'youtube' || platform === 'twitch';
};