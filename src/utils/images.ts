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
 * Get responsive image URL based on device screen size
 * This uses the srcset and sizes attributes for optimal image loading
 * 
 * @param media - Strapi media object
 * @returns Object containing srcset, sizes, and src for responsive image
 */
export const getResponsiveImageProps = (
  media?: StrapiMedia | null
): { src: string; srcSet: string; sizes: string } | undefined => {
  if (!media) return undefined;
  
  const baseUrl = getBaseUrl();
  
  // Default src is the original image
  const src = `${baseUrl}${media.url}`;
  
  // Build srcset with available formats
  const srcSetEntries: string[] = [];
  
  // Add available formats to srcset
  if (media.formats?.thumbnail) {
    srcSetEntries.push(`${baseUrl}${media.formats.thumbnail.url} ${media.formats.thumbnail.width}w`);
  }
  
  if (media.formats?.small) {
    srcSetEntries.push(`${baseUrl}${media.formats.small.url} ${media.formats.small.width}w`);
  }
  
  if (media.formats?.medium) {
    srcSetEntries.push(`${baseUrl}${media.formats.medium.url} ${media.formats.medium.width}w`);
  }
  
  if (media.formats?.large) {
    srcSetEntries.push(`${baseUrl}${media.formats.large.url} ${media.formats.large.width}w`);
  }
  
  // Add original size to srcset
  srcSetEntries.push(`${src} ${media.width}w`);
  
  // Define sizes attribute based on responsive breakpoints
  // These should align with Tailwind's breakpoints
  const sizes = `
    (max-width: 640px) 100vw,
    (max-width: 768px) 80vw,
    (max-width: 1024px) 70vw,
    (max-width: 1280px) 60vw,
    50vw
  `;
  
  return {
    src,
    srcSet: srcSetEntries.join(', '),
    sizes
  };
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
