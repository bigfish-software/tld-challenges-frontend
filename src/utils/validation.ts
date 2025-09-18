/**
 * Validation utilities for form fields
 */

/**
 * Validates result field input based on allowed formats:
 * - Days: "98d"
 * - Time periods: "9d 20h 21m"
 * - Time format: "10:30:12.123"
 * - Numbers: "501321"
 */
export const validateResult = (result: string): boolean => {
  if (!result || typeof result !== 'string') {
    return false;
  }

  const trimmedResult = result.trim();
  if (trimmedResult === '') {
    return false;
  }

  // Pattern 1: Days only (e.g., "98d")
  const daysOnlyPattern = /^\d+d$/;
  
  // Pattern 2: Time periods (e.g., "9d 20h 21m")
  // Allows any combination of days, hours, minutes, seconds with or without spaces
  const timePeriodsPattern = /^(\d+d\s*)?(\d+h\s*)?(\d+m\s*)?(\d+s\s*)?$/;
  
  // Pattern 3: Time format (e.g., "10:30:12.123" or "45:30" or "1:23:45")
  const timeFormatPattern = /^\d{1,2}(:\d{1,2}){1,2}(\.\d{1,3})?$/;
  
  // Pattern 4: Pure numbers (e.g., "501321")
  const numberPattern = /^\d+$/;

  // Check if it matches any of the patterns
  if (daysOnlyPattern.test(trimmedResult)) {
    return true;
  }

  if (timePeriodsPattern.test(trimmedResult)) {
    // Additional check: at least one time unit must be present
    const hasTimeUnit = /\d+[dhms]/.test(trimmedResult);
    return hasTimeUnit;
  }

  if (timeFormatPattern.test(trimmedResult)) {
    // Additional validation for time format: check ranges
    const parts = trimmedResult.split(':');
    if (parts.length >= 2 && parts[1]) {
      const minutes = parseInt(parts[1], 10);
      if (minutes >= 60) return false;
      
      if (parts.length >= 3 && parts[2]) {
        const secondsPart = parts[2].split('.')[0];
        if (secondsPart) {
          const seconds = parseInt(secondsPart, 10);
          if (seconds >= 60) return false;
        }
      }
    }
    return true;
  }

  if (numberPattern.test(trimmedResult)) {
    return true;
  }

  return false;
};

/**
 * Get a human-readable error message for invalid result format
 */
export const getResultValidationError = (): string => {
  return 'Please enter a valid result format. Examples: "98d", "9d 20h 21m", "10:30:12.123", or "501321"';
};

/**
 * URL validation utility - validates URL format and ensures https protocol
 */
export const isValidUrl = (url: string): boolean => {
  if (!url) return false;
  
  // If URL doesn't have protocol, add https:// to make it valid for URL constructor
  let urlToCheck = url;
  if (url && !url.match(/^https?:\/\//)) {
    urlToCheck = 'https://' + url;
  }
  
  try {
    new URL(urlToCheck);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Ensure URL starts with https:// (add it if missing)
 */
export const ensureHttpsUrl = (url: string): string => {
  if (!url) return url;
  
  // If already has https://, return as is
  if (url.startsWith('https://')) {
    return url;
  }
  
  // If has http://, replace with https://
  if (url.startsWith('http://')) {
    return url.replace('http://', 'https://');
  }
  
  // If no protocol, add https://
  return 'https://' + url;
};

/**
 * Video URL validation (YouTube or Twitch) - ensures https protocol
 */
export const isValidVideoUrl = (url: string): boolean => {
  // If empty, return false immediately
  if (!url) return false;
  
  // First ensure it's a valid URL format (will add https if needed)
  if (!isValidUrl(url)) return false;
  
  // Check if URL contains YouTube or Twitch
  const lowerUrl = url.toLowerCase();
  return lowerUrl.includes('youtube') || 
         lowerUrl.includes('youtu.be') || 
         lowerUrl.includes('twitch');
};

/**
 * YouTube URL validation - ensures https protocol
 */
export const isValidYouTubeUrl = (url: string): boolean => {
  // If empty, return true (optional field)
  if (!url) return true;
  
  // First ensure it's a valid URL format (will add https if needed)
  if (!isValidUrl(url)) return false;
  
  // Check if URL contains YouTube
  const lowerUrl = url.toLowerCase();
  return lowerUrl.includes('youtube') || lowerUrl.includes('youtu.be');
};

/**
 * Twitch URL validation - ensures https protocol
 */
export const isValidTwitchUrl = (url: string): boolean => {
  // If empty, return true (optional field)
  if (!url) return true;
  
  // First ensure it's a valid URL format (will add https if needed)
  if (!isValidUrl(url)) return false;
  
  // Check if URL contains Twitch
  const lowerUrl = url.toLowerCase();
  return lowerUrl.includes('twitch');
};

/**
 * Social URL validation (YouTube, Twitch, or Twitter) - ensures https protocol
 */
export const isValidSocialUrl = (url: string): boolean => {
  // If empty, return true (optional field)
  if (!url) return true;
  
  // First ensure it's a valid URL format (will add https if needed)
  if (!isValidUrl(url)) return false;
  
  // Check if URL contains YouTube, Twitch, or Twitter
  const lowerUrl = url.toLowerCase();
  return lowerUrl.includes('youtube') || 
         lowerUrl.includes('youtu.be') || 
         lowerUrl.includes('twitch') ||
         lowerUrl.includes('twitter') ||
         lowerUrl.includes('x.com');
};

/**
 * Get error message for invalid video URL
 */
export const getVideoUrlValidationError = (): string => {
  return 'Please enter a valid YouTube or Twitch URL (e.g., youtube.com/watch?v=... or twitch.tv/videos/...)';
};

/**
 * Get error message for invalid YouTube URL
 */
export const getYouTubeUrlValidationError = (): string => {
  return 'Please enter a valid YouTube URL (e.g., youtube.com/@yourhandle or youtube.com/channel/...)';
};

/**
 * Get error message for invalid Twitch URL
 */
export const getTwitchUrlValidationError = (): string => {
  return 'Please enter a valid Twitch URL (e.g., twitch.tv/yourhandle)';
};

/**
 * Get error message for invalid social URL
 */
export const getSocialUrlValidationError = (): string => {
  return 'Please enter a valid YouTube, Twitch, or Twitter URL (e.g., youtube.com/@handle, twitch.tv/handle, or twitter.com/handle)';
};