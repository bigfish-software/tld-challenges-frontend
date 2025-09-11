# Responsive Images

This document outlines the approach for handling responsive images throughout the TLD Challenges frontend application.

## Overview

The application uses Strapi's built-in responsive image processing capabilities to serve appropriately sized images based on the device screen size. This optimizes performance by delivering smaller images to mobile devices and higher quality images to larger screens.

## Implementation

### Image Utilities

The image utilities in `src/utils/images.ts` provide several functions for handling responsive images:

```typescript
// Basic image URL with specific size
getImageUrl(media, size); // size can be 'thumbnail', 'small', 'medium', 'large', or 'original'

// Responsive image properties for optimal loading
getResponsiveImageProps(media); // Returns { src, srcSet, sizes }
```

### Responsive Image Component Usage

For optimal responsive image loading, use the `getResponsiveImageProps` function:

```tsx
import { getResponsiveImageProps, getImageAltText } from '@/utils/images';

// Within your component:
const imageProps = getResponsiveImageProps(mediaObject);
if (imageProps) {
  return (
    <img
      src={imageProps.src}
      srcSet={imageProps.srcSet}
      sizes={imageProps.sizes}
      alt={getImageAltText(mediaObject, fallbackText)}
      className="w-full h-full object-cover"
    />
  );
}
```

### Size Breakpoints

The responsive image implementation uses the following breakpoints (aligned with Tailwind's default breakpoints):

| Breakpoint | Width | Image Handling |
|------------|-------|----------------|
| Mobile     | < 640px | Smaller images (thumbnail/small) |
| Tablet     | 640px - 768px | Medium-sized images |
| Laptop     | 768px - 1024px | Larger images |
| Desktop    | > 1024px | Highest quality images |

## Strapi Media Formats

Strapi automatically generates the following formats for uploaded images:

- **thumbnail**: 245×245 pixels (cropped)
- **small**: 500px width (proportional height)
- **medium**: 750px width (proportional height)
- **large**: 1000px width (proportional height)
- **original**: Original uploaded image

## Benefits

1. **Performance Optimization**: Smaller file sizes for mobile devices
2. **Bandwidth Savings**: Users only download what they need
3. **Better User Experience**: Faster page loads
4. **SEO Improvement**: Page speed is a ranking factor

## Example Implementation

The responsive image handling is implemented on:

1. Challenge detail page thumbnails
2. Custom code detail page thumbnails
3. Tournament detail page thumbnails (if applicable)

## Browser Support

This implementation uses standard HTML attributes (`srcset` and `sizes`) which are supported in all modern browsers.

## Further Optimization

For future enhancements, consider:

1. Adding WebP format support if Strapi provides it
2. Implementing lazy loading for images below the fold
3. Adding blur-up loading effect for large hero images
