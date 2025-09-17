export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./.storybook/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F5F0F5',
          100: '#E6D6E6',
          200: '#CCADCC',
          300: '#B385B3',
          400: '#7A5C7A',
          500: '#4A2C4A',
          600: '#3D233D',
          700: '#2F1B2F',
          800: '#221322',
          900: '#140A14',
        },
        secondary: {
          50: '#F7F4F4',
          100: '#E8E0E0',
          200: '#D1C1C2',
          300: '#B9A1A3',
          400: '#A27E81',
          500: '#8B5A5C',
          600: '#73484A',
          700: '#5B3739',
          800: '#432729',
          900: '#2B1819',
        },
        accent: {
          50: '#FDF9F4',
          100: '#F9EFDE',
          200: '#F3DFBD',
          300: '#EDCF9C',
          400: '#E6B894',
          500: '#D9A373',
          600: '#C08752',
          700: '#A06B31',
          800: '#7A4F10',
          900: '#4D3200',
        },
        success: {
          50: '#F0FDF4',
          500: '#22C55E',
          600: '#16A34A',
        },
        warning: {
          50: '#FFFBEB',
          500: '#F59E0B',
          600: '#D97706',
        },
        error: {
          50: '#FEF2F2',
          500: '#EF4444',
          600: '#DC2626',
        },
        info: {
          50: '#EFF6FF',
          500: '#3B82F6',
          600: '#2563EB',
        },
      },
      fontFamily: {
        sans: ['Oswald', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        headline: ['TLD Headline', 'Oswald', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
