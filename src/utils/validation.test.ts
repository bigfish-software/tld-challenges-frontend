import { describe, it, expect } from 'vitest';
import { 
  validateResult, 
  getResultValidationError, 
  isValidUrl, 
  isValidVideoUrl, 
  isValidYouTubeUrl,
  isValidTwitchUrl,
  isValidSocialUrl,
  getVideoUrlValidationError,
  getYouTubeUrlValidationError,
  getTwitchUrlValidationError,
  getSocialUrlValidationError,
  ensureHttpsUrl
} from './validation';

describe('validateResult', () => {
  // Test days only format
  it('should accept days only format', () => {
    expect(validateResult('98d')).toBe(true);
    expect(validateResult('1d')).toBe(true);
    expect(validateResult('365d')).toBe(true);
  });

  // Test time periods format
  it('should accept time periods format', () => {
    expect(validateResult('9d 20h 21m')).toBe(true);
    expect(validateResult('9d20h21m')).toBe(true); // without spaces
    expect(validateResult('1d 2h')).toBe(true);
    expect(validateResult('30m')).toBe(true);
    expect(validateResult('5h 30m')).toBe(true);
    expect(validateResult('1d 2h 3m 4s')).toBe(true);
  });

  // Test time format
  it('should accept time format', () => {
    expect(validateResult('10:30:12.123')).toBe(true);
    expect(validateResult('45:30')).toBe(true);
    expect(validateResult('1:23:45')).toBe(true);
    expect(validateResult('0:59')).toBe(true);
    expect(validateResult('12:34:56.789')).toBe(true);
  });

  // Test numbers only
  it('should accept numbers only', () => {
    expect(validateResult('501321')).toBe(true);
    expect(validateResult('0')).toBe(true);
    expect(validateResult('999999')).toBe(true);
  });

  // Test invalid formats
  it('should reject invalid formats', () => {
    expect(validateResult('')).toBe(false);
    expect(validateResult('   ')).toBe(false);
    expect(validateResult('invalid')).toBe(false);
    expect(validateResult('12:60')).toBe(false); // invalid minutes
    expect(validateResult('12:30:60')).toBe(false); // invalid seconds
    expect(validateResult('12:30:45.1234')).toBe(false); // too many decimal places
    expect(validateResult('abc123')).toBe(false);
    expect(validateResult('12.5')).toBe(false);
    expect(validateResult('12d 30x')).toBe(false); // invalid time unit
  });

  // Test edge cases
  it('should handle edge cases', () => {
    expect(validateResult(null as any)).toBe(false);
    expect(validateResult(undefined as any)).toBe(false);
    expect(validateResult(123 as any)).toBe(false);
    expect(validateResult(' 98d ')).toBe(true); // trimmed
  });
});

describe('getResultValidationError', () => {
  it('should return a helpful error message', () => {
    const error = getResultValidationError();
    expect(error).toContain('98d');
    expect(error).toContain('9d 20h 21m');
    expect(error).toContain('10:30:12.123');
    expect(error).toContain('501321');
  });
});

describe('isValidUrl', () => {
  it('should accept valid URLs with http/https', () => {
    expect(isValidUrl('https://example.com')).toBe(true);
    expect(isValidUrl('http://example.com')).toBe(true);
    expect(isValidUrl('https://subdomain.example.com/path')).toBe(true);
    expect(isValidUrl('http://localhost:3000')).toBe(true);
  });

  it('should accept URLs without protocol (assumes https)', () => {
    expect(isValidUrl('example.com')).toBe(true);
    expect(isValidUrl('www.example.com')).toBe(true);
    expect(isValidUrl('subdomain.example.com/path')).toBe(true);
  });

  it('should reject invalid URLs', () => {
    expect(isValidUrl('')).toBe(false);
    expect(isValidUrl('http://')).toBe(false);
    expect(isValidUrl('https://')).toBe(false);
  });
});

describe('isValidVideoUrl', () => {
  it('should accept valid YouTube URLs', () => {
    expect(isValidVideoUrl('https://youtube.com/watch?v=dQw4w9WgXcQ')).toBe(true);
    expect(isValidVideoUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ')).toBe(true);
    expect(isValidVideoUrl('https://youtu.be/dQw4w9WgXcQ')).toBe(true);
    expect(isValidVideoUrl('http://youtube.com/watch?v=dQw4w9WgXcQ')).toBe(true);
    expect(isValidVideoUrl('youtube.com/watch?v=dQw4w9WgXcQ')).toBe(true);
    expect(isValidVideoUrl('youtu.be/dQw4w9WgXcQ')).toBe(true);
  });

  it('should accept valid Twitch URLs', () => {
    expect(isValidVideoUrl('https://twitch.tv/videos/123456789')).toBe(true);
    expect(isValidVideoUrl('https://www.twitch.tv/streamername')).toBe(true);
    expect(isValidVideoUrl('http://twitch.tv/videos/123456789')).toBe(true);
    expect(isValidVideoUrl('twitch.tv/videos/123456789')).toBe(true);
    expect(isValidVideoUrl('www.twitch.tv/streamername')).toBe(true);
  });

  it('should reject non-video URLs', () => {
    expect(isValidVideoUrl('https://example.com')).toBe(false);
    expect(isValidVideoUrl('https://twitter.com/username')).toBe(false);
    expect(isValidVideoUrl('https://instagram.com/username')).toBe(false);
    expect(isValidVideoUrl('example.com')).toBe(false);
    expect(isValidVideoUrl('twitter.com/username')).toBe(false);
  });

  it('should reject empty or invalid URLs', () => {
    expect(isValidVideoUrl('')).toBe(false);
    expect(isValidVideoUrl('not-a-url')).toBe(false);
  });
});

describe('isValidYouTubeUrl', () => {
  it('should accept valid YouTube URLs', () => {
    expect(isValidYouTubeUrl('https://youtube.com/@username')).toBe(true);
    expect(isValidYouTubeUrl('https://www.youtube.com/channel/UCxxxxxx')).toBe(true);
    expect(isValidYouTubeUrl('https://youtu.be/dQw4w9WgXcQ')).toBe(true);
    expect(isValidYouTubeUrl('youtube.com/@username')).toBe(true);
    expect(isValidYouTubeUrl('youtu.be/dQw4w9WgXcQ')).toBe(true);
  });

  it('should accept empty URLs (optional field)', () => {
    expect(isValidYouTubeUrl('')).toBe(true);
  });

  it('should reject non-YouTube URLs', () => {
    expect(isValidYouTubeUrl('https://twitch.tv/username')).toBe(false);
    expect(isValidYouTubeUrl('https://twitter.com/username')).toBe(false);
    expect(isValidYouTubeUrl('twitch.tv/username')).toBe(false);
    expect(isValidYouTubeUrl('twitter.com/username')).toBe(false);
  });

  it('should reject invalid URLs', () => {
    expect(isValidYouTubeUrl('invalid url with spaces')).toBe(false);
  });
});

describe('isValidTwitchUrl', () => {
  it('should accept valid Twitch URLs', () => {
    expect(isValidTwitchUrl('https://twitch.tv/username')).toBe(true);
    expect(isValidTwitchUrl('https://www.twitch.tv/username')).toBe(true);
    expect(isValidTwitchUrl('twitch.tv/username')).toBe(true);
    expect(isValidTwitchUrl('www.twitch.tv/username')).toBe(true);
  });

  it('should accept empty URLs (optional field)', () => {
    expect(isValidTwitchUrl('')).toBe(true);
  });

  it('should reject non-Twitch URLs', () => {
    expect(isValidTwitchUrl('https://youtube.com/username')).toBe(false);
    expect(isValidTwitchUrl('https://twitter.com/username')).toBe(false);
    expect(isValidTwitchUrl('youtube.com/username')).toBe(false);
    expect(isValidTwitchUrl('twitter.com/username')).toBe(false);
  });

  it('should reject invalid URLs', () => {
    expect(isValidTwitchUrl('invalid url with spaces')).toBe(false);
  });
});

describe('isValidSocialUrl', () => {
  it('should accept valid YouTube URLs', () => {
    expect(isValidSocialUrl('https://youtube.com/@username')).toBe(true);
    expect(isValidSocialUrl('https://www.youtube.com/channel/UCxxxxxx')).toBe(true);
    expect(isValidSocialUrl('https://youtu.be/dQw4w9WgXcQ')).toBe(true);
    expect(isValidSocialUrl('youtube.com/@username')).toBe(true);
    expect(isValidSocialUrl('youtu.be/dQw4w9WgXcQ')).toBe(true);
  });

  it('should accept valid Twitch URLs', () => {
    expect(isValidSocialUrl('https://twitch.tv/username')).toBe(true);
    expect(isValidSocialUrl('https://www.twitch.tv/username')).toBe(true);
    expect(isValidSocialUrl('twitch.tv/username')).toBe(true);
    expect(isValidSocialUrl('www.twitch.tv/username')).toBe(true);
  });

  it('should accept valid Twitter URLs', () => {
    expect(isValidSocialUrl('https://twitter.com/username')).toBe(true);
    expect(isValidSocialUrl('https://www.twitter.com/username')).toBe(true);
    expect(isValidSocialUrl('https://x.com/username')).toBe(true);
    expect(isValidSocialUrl('twitter.com/username')).toBe(true);
    expect(isValidSocialUrl('x.com/username')).toBe(true);
  });

  it('should accept empty URLs (optional field)', () => {
    expect(isValidSocialUrl('')).toBe(true);
  });

  it('should reject non-social URLs', () => {
    expect(isValidSocialUrl('https://example.com')).toBe(false);
    expect(isValidSocialUrl('https://facebook.com/username')).toBe(false);
    expect(isValidSocialUrl('https://instagram.com/username')).toBe(false);
    expect(isValidSocialUrl('example.com')).toBe(false);
    expect(isValidSocialUrl('facebook.com/username')).toBe(false);
  });
});

describe('getVideoUrlValidationError', () => {
  it('should return a helpful error message', () => {
    const error = getVideoUrlValidationError();
    expect(error).toContain('YouTube');
    expect(error).toContain('Twitch');
    expect(error).toContain('youtube.com');
    expect(error).toContain('twitch.tv');
  });
});

describe('getYouTubeUrlValidationError', () => {
  it('should return a helpful error message', () => {
    const error = getYouTubeUrlValidationError();
    expect(error).toContain('YouTube');
    expect(error).toContain('youtube.com');
  });
});

describe('getTwitchUrlValidationError', () => {
  it('should return a helpful error message', () => {
    const error = getTwitchUrlValidationError();
    expect(error).toContain('Twitch');
    expect(error).toContain('twitch.tv');
  });
});

describe('getSocialUrlValidationError', () => {
  it('should return a helpful error message', () => {
    const error = getSocialUrlValidationError();
    expect(error).toContain('YouTube');
    expect(error).toContain('Twitch');
    expect(error).toContain('Twitter');
    expect(error).toContain('youtube.com');
    expect(error).toContain('twitch.tv');
    expect(error).toContain('twitter.com');
  });
});

describe('ensureHttpsUrl', () => {
  it('should return empty string for empty input', () => {
    expect(ensureHttpsUrl('')).toBe('');
  });

  it('should keep https URLs unchanged', () => {
    expect(ensureHttpsUrl('https://example.com')).toBe('https://example.com');
    expect(ensureHttpsUrl('https://youtube.com/@user')).toBe('https://youtube.com/@user');
  });

  it('should convert http to https', () => {
    expect(ensureHttpsUrl('http://example.com')).toBe('https://example.com');
    expect(ensureHttpsUrl('http://youtube.com/@user')).toBe('https://youtube.com/@user');
  });

  it('should add https to URLs without protocol', () => {
    expect(ensureHttpsUrl('example.com')).toBe('https://example.com');
    expect(ensureHttpsUrl('youtube.com/@user')).toBe('https://youtube.com/@user');
    expect(ensureHttpsUrl('twitch.tv/username')).toBe('https://twitch.tv/username');
  });
});