# TLD Challenges Color System - Simplified CSS Variables

## Overview

This document describes the simplified color system for TLD Challenges, designed to ensure consistent color usage throughout the application while eliminating the confusion of extensive color scales.

## Design Philosophy

### Simplified Solution
- **Three variants per color**: `base`, `light`, `dark`
- **Clear purpose**: Each variant has a specific use case
- **Consistent hierarchy**: Predictable naming and usage patterns
- **Theme-aware**: Automatic adaptation between light and dark themes

## Color Palette

### Primary Colors (Plum)
| Variant | Color | Hex Code | Light Theme Usage | Dark Theme Usage |
|---------|-------|----------|-------------------|------------------|
| Light | ![#B385B3](https://img.shields.io/badge/-B385B3-B385B3?style=flat-square) | `#B385B3` | Subtle backgrounds, borders | **Primary actions, main color** |
| Base | ![#4A2C4A](https://img.shields.io/badge/-4A2C4A-4A2C4A?style=flat-square) | `#4A2C4A` | **Primary actions, main color** | Hover states |
| Dark | ![#2F1B2F](https://img.shields.io/badge/-2F1B2F-2F1B2F?style=flat-square) | `#2F1B2F` | Hover states, active states | Active states |

### Secondary Colors (Burgundy)
| Variant | Color | Hex Code | Light Theme Usage | Dark Theme Usage |
|---------|-------|----------|-------------------|------------------|
| Light | ![#B9A1A3](https://img.shields.io/badge/-B9A1A3-B9A1A3?style=flat-square) | `#B9A1A3` | Subtle backgrounds, borders | **Secondary actions** |
| Base | ![#8B5A5C](https://img.shields.io/badge/-8B5A5C-8B5A5C?style=flat-square) | `#8B5A5C` | **Secondary actions** | Hover states |
| Dark | ![#5B3739](https://img.shields.io/badge/-5B3739-5B3739?style=flat-square) | `#5B3739` | Hover states, active states | Active states |

### Accent Colors (Warm Peach)
| Variant | Color | Hex Code | Light Theme Usage | Dark Theme Usage |
|---------|-------|----------|-------------------|------------------|
| Light | ![#F3DFBD](https://img.shields.io/badge/-F3DFBD-F3DFBD?style=flat-square) | `#F3DFBD` | Subtle highlights | Hover states |
| Base | ![#E6B894](https://img.shields.io/badge/-E6B894-E6B894?style=flat-square) | `#E6B894` | **Accent elements, CTAs** | **Accent elements, CTAs** |
| Dark | ![#C08752](https://img.shields.io/badge/-C08752-C08752?style=flat-square) | `#C08752` | Hover states | Active states |

### Neutral Colors (Gray)
| Variant | Color | Hex Code | Light Theme Usage | Dark Theme Usage |
|---------|-------|----------|-------------------|------------------|
| Light | ![#D4D4D4](https://img.shields.io/badge/-D4D4D4-D4D4D4?style=flat-square) | `#D4D4D4` | Borders, disabled states | Secondary text |
| Base | ![#7A7A7A](https://img.shields.io/badge/-7A7A7A-7A7A7A?style=flat-square) | `#7A7A7A` | Secondary text, icons | Borders |
| Dark | ![#404040](https://img.shields.io/badge/-404040-404040?style=flat-square) | `#404040` | Primary text | Elevated surfaces |

### Semantic Colors
| Color | Light Theme | Dark Theme | Usage |
|-------|-------------|------------|-------|
| Success | ![#16A34A](https://img.shields.io/badge/-16A34A-16A34A?style=flat-square) `#16A34A` | ![#4ADE80](https://img.shields.io/badge/-4ADE80-4ADE80?style=flat-square) `#4ADE80` | Success states, easy difficulty |
| Warning | ![#F59E0B](https://img.shields.io/badge/-F59E0B-F59E0B?style=flat-square) `#F59E0B` | ![#FBBF24](https://img.shields.io/badge/-FBBF24-FBBF24?style=flat-square) `#FBBF24` | Warning states, medium difficulty |
| Error | ![#DC2626](https://img.shields.io/badge/-DC2626-DC2626?style=flat-square) `#DC2626` | ![#F87171](https://img.shields.io/badge/-F87171-F87171?style=flat-square) `#F87171` | Error states, hard difficulty |
| Info | ![#2563EB](https://img.shields.io/badge/-2563EB-2563EB?style=flat-square) `#2563EB` | ![#60A5FA](https://img.shields.io/badge/-60A5FA-60A5FA?style=flat-square) `#60A5FA` | Information, neutral states |

## CSS Variables Reference

### Base Colors
```css
--color-primary: #4A2C4A;           /* Light theme */
--color-primary: #B385B3;           /* Dark theme */
--color-primary-light: #B385B3;    /* Light theme */
--color-primary-light: #CCADCC;    /* Dark theme */
--color-primary-dark: #2F1B2F;     /* Light theme */
--color-primary-dark: #7A5C7A;     /* Dark theme */
```

### Usage Guidelines

#### Consistent Color Selection
```css
/* ✅ Correct: Clear purpose for each variant */
.primary-button { background-color: var(--color-primary); }
.primary-hover { background-color: var(--color-primary-hover); }
.primary-background { background-color: var(--color-primary-light); }

/* ❌ Wrong: Don't create custom shades */
.custom-primary { background-color: #6B4E6B; }
```

#### Semantic Usage
```css
/* ✅ Correct: Use semantic variables */
.card { 
  background-color: var(--color-surface);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
}
```

