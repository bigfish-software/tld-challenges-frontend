/**
 * Image utilities for handling Strapi media URLs
 */

import type { StrapiMedia } from '@/types/api';

/**
 * Get the base URL for the application (without /api suffix)
 */
export const getBaseUrl = (): string => {
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:1337';
  return apiBaseUrl.replace(/\/api$/, '');
};

/**
 * Get responsive image URL from Strapi media object
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
  
  return `${baseUrl}${media.url}`;
};

export const getResponsiveImageProps = (
  media?: StrapiMedia | null
): { src: string; srcSet: string; sizes: string } | undefined => {
  if (!media) return undefined;
  
  const baseUrl = getBaseUrl();
  
  const src = `${baseUrl}${media.url}`;
  
  const srcSetEntries: string[] = [];
  
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
  
  srcSetEntries.push(`${src} ${media.width}w`);
  
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
 * Get responsive image properties specifically optimized for hero sections
 * Hero images typically cover the full viewport width, so sizes should reflect that
 */
export const getHeroResponsiveImageProps = (
  media?: StrapiMedia | null
): { src: string; srcSet: string; sizes: string } | undefined => {
  if (!media) return undefined;
  
  const baseUrl = getBaseUrl();
  
  const src = `${baseUrl}${media.url}`;
  
  const srcSetEntries: string[] = [];
  
  // Sort formats by width (smallest to largest) for optimal srcSet
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
  
  // Add original image (highest quality)
  srcSetEntries.push(`${src} ${media.width}w`);
  
  // Hero images take full viewport width on all screen sizes
  // This tells the browser the image will be 100vw, so it chooses appropriately sized images
  const sizes = '100vw';
  
  return {
    src,
    srcSet: srcSetEntries.join(', '),
    sizes
  };
};

/**
 * Get responsive background image CSS for hero sections
 * Uses CSS media queries to serve appropriate image sizes for different screen sizes
 */
export const getResponsiveHeroBackground = (
  media?: StrapiMedia | null
): string => {
  if (!media) return '';
  
  const baseUrl = getBaseUrl();
  
  // Default to original image
  let backgroundCSS = `url('${baseUrl}${media.url}')`;
  
  // Build media query based CSS for different screen sizes
  const mediaQueries: string[] = [];
  
  // Mobile (up to 640px) - use small or thumbnail
  if (media.formats?.small) {
    mediaQueries.push(`@media (max-width: 640px) { background-image: url('${baseUrl}${media.formats.small.url}'); }`);
  } else if (media.formats?.thumbnail) {
    mediaQueries.push(`@media (max-width: 640px) { background-image: url('${baseUrl}${media.formats.thumbnail.url}'); }`);
  }
  
  // Tablet (641px to 1024px) - use medium
  if (media.formats?.medium) {
    mediaQueries.push(`@media (min-width: 641px) and (max-width: 1024px) { background-image: url('${baseUrl}${media.formats.medium.url}'); }`);
  }
  
  // Desktop (1025px and up) - use large or original
  if (media.formats?.large) {
    mediaQueries.push(`@media (min-width: 1025px) { background-image: url('${baseUrl}${media.formats.large.url}'); }`);
  }
  
  return backgroundCSS;
};

/**
 * Get the best quality image URL for hero sections (desktop-first approach)
 */
export const getHeroImageUrl = (
  media?: StrapiMedia | null
): string | undefined => {
  if (!media) return undefined;
  
  const baseUrl = getBaseUrl();
  
  // Desktop-first: prefer large, fallback to original, then medium, then small
  if (media.formats?.large) {
    return `${baseUrl}${media.formats.large.url}`;
  }
  
  // Original quality
  if (media.url) {
    return `${baseUrl}${media.url}`;
  }
  
  // Fallback to medium if no large available
  if (media.formats?.medium) {
    return `${baseUrl}${media.formats.medium.url}`;
  }
  
  // Last resort: small
  if (media.formats?.small) {
    return `${baseUrl}${media.formats.small.url}`;
  }
  
  return undefined;
};
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
