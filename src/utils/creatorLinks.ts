/**
 * Utility functions for handling creator social media links
 */

export interface Creator {
  id: number;
  name: string;
  slug: string;
  twitch?: string | null;
  youtube?: string | null;
  twitch_url?: string | null;
  youtube_url?: string | null;
}

/**
 * Gets the appropriate external link for a creator
 * Priority: Twitch > YouTube > null (if no valid social links)
 * 
 * @param creator The creator object
 * @returns The external URL to use, or null if no valid social links
 */
export const getCreatorExternalLink = (creator: Creator): string | null => {
  // Check for twitch URL first (highest priority)
  if (creator.twitch_url && creator.twitch_url.trim()) {
    return creator.twitch_url;
  }
  
  // Check for legacy twitch field
  if (creator.twitch && creator.twitch.trim()) {
    // If it's already a full URL, use it
    if (creator.twitch.startsWith('http')) {
      return creator.twitch;
    }
    // Otherwise, construct the Twitch URL
    return `https://www.twitch.tv/${creator.twitch}`;
  }
  
  // Check for youtube URL (second priority)
  if (creator.youtube_url && creator.youtube_url.trim()) {
    return creator.youtube_url;
  }
  
  // Check for legacy youtube field
  if (creator.youtube && creator.youtube.trim()) {
    // If it's already a full URL, use it
    if (creator.youtube.startsWith('http')) {
      return creator.youtube;
    }
    // Otherwise, construct the YouTube URL
    return `https://www.youtube.com/${creator.youtube}`;
  }
  
  // No valid social links found
  return null;
};

/**
 * Determines if a creator should be rendered as a clickable link
 * 
 * @param creator The creator object
 * @returns true if the creator has valid social media links
 */
export const hasCreatorExternalLink = (creator: Creator): boolean => {
  return getCreatorExternalLink(creator) !== null;
};