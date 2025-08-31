import { ButtonHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  hoverEffect?: 'none' | 'scale' | 'shadow' | 'both';
  fullWidth?: boolean;
  responsive?: {
    sm?: string;
    lg?: string;
  };
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    shadow = 'sm',
    hoverEffect = 'shadow',
    fullWidth = false,
    responsive,
    isLoading, 
    children, 
    ...props 
  }, ref) => {
    return (
      <button
        className={clsx(
          // Base styles
          'inline-flex items-center justify-center rounded-md font-medium transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-offset-2',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          
          // Layout variants
          {
            'w-full': fullWidth,
            [responsive?.sm || '']: responsive?.sm,
            [responsive?.lg || '']: responsive?.lg,
          },
          
          // Size variants
          {
            'px-3 py-1.5 text-sm': size === 'sm',
            'px-4 py-2 text-base': size === 'md',
            'px-6 py-3 text-lg': size === 'lg',
          },
          
          // Shadow variants
          {
            'shadow-none': shadow === 'none',
            'shadow-sm': shadow === 'sm',
            'shadow-md': shadow === 'md',
            'shadow-lg': shadow === 'lg',
            'shadow-xl': shadow === 'xl',
          },
          
          // Hover effect variants
          {
            'hover:shadow-xl': hoverEffect === 'shadow' && shadow === 'lg',
            'hover:shadow-2xl': hoverEffect === 'shadow' && shadow === 'xl',
            'hover:shadow-lg': hoverEffect === 'shadow' && shadow === 'md',
            'hover:shadow-md': hoverEffect === 'shadow' && shadow === 'sm',
            'transform hover:scale-105': hoverEffect === 'scale' || hoverEffect === 'both',
            'hover:shadow-xl transform hover:scale-105': hoverEffect === 'both' && shadow === 'lg',
          },
          
          // Color variants using CSS variables
          {
            // Primary variant
            'btn-primary': variant === 'primary',
            
            // Secondary variant
            'btn-secondary': variant === 'secondary',
            
            // Outline variant
            'border border-default text-primary hover:bg-surface-raised btn-outline-hover': variant === 'outline',
            
            // Ghost variant
            'text-primary hover:bg-surface-raised btn-ghost-hover': variant === 'ghost',
          },
          
          // Focus ring using CSS variable
          'focus:ring-color-[var(--color-border-focus)]',
          
          className
        )}
        disabled={isLoading || props.disabled}
        ref={ref}
        {...props}
      >
        {isLoading && (
          <svg
            className="mr-2 h-4 w-4 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
