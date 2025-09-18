import { describe, it, expect } from 'vitest';
import { getCreatorExternalLink, hasCreatorExternalLink } from './creatorLinks';

describe('creatorLinks', () => {
  describe('getCreatorExternalLink', () => {
    it('should return twitch_url when available', () => {
      const creator = {
        id: 1,
        name: 'Test Creator',
        slug: 'test-creator',
        twitch_url: 'https://www.twitch.tv/testcreator',
        youtube_url: 'https://www.youtube.com/testcreator'
      };
      
      expect(getCreatorExternalLink(creator)).toBe('https://www.twitch.tv/testcreator');
    });

    it('should return constructed twitch URL from twitch field', () => {
      const creator = {
        id: 1,
        name: 'Test Creator',
        slug: 'test-creator',
        twitch: 'testcreator',
        youtube_url: 'https://www.youtube.com/testcreator'
      };
      
      expect(getCreatorExternalLink(creator)).toBe('https://www.twitch.tv/testcreator');
    });

    it('should return youtube_url when twitch is not available', () => {
      const creator = {
        id: 1,
        name: 'Test Creator',
        slug: 'test-creator',
        youtube_url: 'https://www.youtube.com/testcreator'
      };
      
      expect(getCreatorExternalLink(creator)).toBe('https://www.youtube.com/testcreator');
    });

    it('should return constructed youtube URL from youtube field', () => {
      const creator = {
        id: 1,
        name: 'Test Creator',
        slug: 'test-creator',
        youtube: 'testcreator'
      };
      
      expect(getCreatorExternalLink(creator)).toBe('https://www.youtube.com/testcreator');
    });

    it('should return null when no social links are available', () => {
      const creator = {
        id: 1,
        name: 'Test Creator',
        slug: 'test-creator'
      };
      
      expect(getCreatorExternalLink(creator)).toBe(null);
    });

    it('should handle full URLs in legacy fields', () => {
      const creator1 = {
        id: 1,
        name: 'Test Creator',
        slug: 'test-creator',
        twitch: 'https://www.twitch.tv/testcreator'
      };
      
      const creator2 = {
        id: 2,
        name: 'Test Creator 2',
        slug: 'test-creator-2',
        youtube: 'https://www.youtube.com/testcreator'
      };
      
      expect(getCreatorExternalLink(creator1)).toBe('https://www.twitch.tv/testcreator');
      expect(getCreatorExternalLink(creator2)).toBe('https://www.youtube.com/testcreator');
    });
  });

  describe('hasCreatorExternalLink', () => {
    it('should return true when creator has social links', () => {
      const creator = {
        id: 1,
        name: 'Test Creator',
        slug: 'test-creator',
        twitch_url: 'https://www.twitch.tv/testcreator'
      };
      
      expect(hasCreatorExternalLink(creator)).toBe(true);
    });

    it('should return false when creator has no social links', () => {
      const creator = {
        id: 1,
        name: 'Test Creator',
        slug: 'test-creator'
      };
      
      expect(hasCreatorExternalLink(creator)).toBe(false);
    });
  });
});