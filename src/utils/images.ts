/**
 * Image utilities for handling Strapi media URLs
 */

import type { StrapiMedia } from '@/types/api';

/**
 * Get the base URL for the application (without /api suffix)
 */
export const getBaseUrl = (): string => {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:1337';
  // Remove /api suffix if it exists
  return apiBaseUrl.replace(/\/api$/, '');
};

/**
 * Get responsive image URL from Strapi media object
 * @param media - Strapi media object
 * @param size - Desired image size
 * @returns Full image URL or undefined if not available
 */
export const getImageUrl = (
  media?: StrapiMedia | null,
  size: 'thumbnail' | 'small' | 'medium' | 'large' | 'original' = 'medium'
): string | undefined => {
  if (!media) return undefined;
  
  const baseUrl = getBaseUrl();
  
  if (size === 'original') {
    return `${baseUrl}${media.url}`;
  }
  
  const format = media.formats?.[size];
  if (format) {
    return `${baseUrl}${format.url}`;
  }
  
  // Fallback to original size
  return `${baseUrl}${media.url}`;
};

/**
 * Get image alt text from Strapi media object
 * @param media - Strapi media object
 * @param fallback - Fallback text if no alt text is available
 * @returns Alt text for accessibility
 */
export const getImageAltText = (
  media?: StrapiMedia | null,
  fallback: string = 'Image'
): string => {
  if (!media) return fallback;
  return media.alternativeText || media.name || fallback;
};

/**
 * Check if media object has valid image data
 * @param media - Strapi media object
 * @returns True if media contains valid image URL
 */
export const hasValidImage = (media?: StrapiMedia | null): boolean => {
  return !!(media?.url);
};
