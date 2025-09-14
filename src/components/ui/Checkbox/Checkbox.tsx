import { forwardRef, InputHTMLAttributes } from 'react';
import { clsx } from 'clsx';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  error?: string | null;
  helperText?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, helperText, className, id, ...props }, ref) => {
    const checkboxId = id || label.toLowerCase().replace(/\s+/g, '-');
    
    return (
      <div className="space-y-2">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              ref={ref}
              id={checkboxId}
              type="checkbox"
              className={clsx(
                'h-4 w-4 rounded border-default text-primary focus:ring-primary',
                error ? 'border-error' : 'border-default',
                className
              )}
              {...props}
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor={checkboxId} className="font-medium text-primary">
              {label}
            </label>
          </div>
        </div>
        {error && (
          <p className="text-sm text-error">{error}</p>
        )}
        {helperText && !error && (
          <p className="text-sm text-tertiary">{helperText}</p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';