import { forwardRef, InputHTMLAttributes } from 'react';
import { clsx } from 'clsx';
import { FieldError } from '../ErrorDisplay/FieldError';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string | null;
  helperText?: string;
  required?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className, id, required, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    
    return (
      <div className="space-y-2">
        {label && (
          <label 
            htmlFor={inputId}
            className="block text-sm font-medium text-primary flex items-center"
          >
            {label}
            {required && (
              <span className="ml-1 text-error">*</span>
            )}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          required={required}
          className={clsx(
            'block w-full px-3 py-2 border rounded-md shadow-sm',
            'transition-colors duration-200',
            'focus:outline-none focus:ring-2',
            'hover:border-primary-light',
            'bg-surface text-primary border-default',
            error ? 'border-error focus:ring-error focus:border-error' : 'focus:ring-primary focus:border-primary',
            className
          )}
          {...props}
        />
        {error && <FieldError error={error} />}
        {helperText && !error && (
          <p className="text-sm text-tertiary">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';