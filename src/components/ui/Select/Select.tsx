import { forwardRef, SelectHTMLAttributes } from 'react';
import { clsx } from 'clsx';
import { FieldError } from '../ErrorDisplay/FieldError';

export interface SelectOption {
  value: string | number;
  label: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string | null;
  helperText?: string;
  required?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, helperText, className, id, required, ...props }, ref) => {
    const selectId = id || label?.toLowerCase().replace(/\s+/g, '-');
    
    return (
      <div className="space-y-2">
        {label && (
          <label 
            htmlFor={selectId}
            className="block text-sm font-medium text-primary flex items-center"
          >
            {label}
            {required && (
              <span className="ml-1 text-error">*</span>
            )}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={clsx(
              'block w-full px-3 py-2 appearance-none',
              'border rounded-md shadow-sm',
              'transition-colors duration-200',
              'focus:outline-none focus:ring-2',
              'hover:border-primary-light',
              'bg-surface text-primary border-default',
              'pr-10', // Extra padding for the arrow
              error ? 'border-error focus:ring-error focus:border-error' : 'focus:ring-primary focus:border-primary',
              className
            )}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-tertiary">
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        {error && <FieldError error={error} />}
        {helperText && !error && (
          <p className="text-sm text-tertiary">{helperText}</p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';