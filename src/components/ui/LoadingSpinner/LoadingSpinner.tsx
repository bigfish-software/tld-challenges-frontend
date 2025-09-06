export interface LoadingSpinnerProps {
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Custom text to display */
  text?: string;
  /** Additional CSS classes */
  className?: string;
}

export const LoadingSpinner = ({
  size = 'md',
  text,
  className = ''
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div
        className={`animate-spin rounded-full border-2 border-border border-t-primary ${sizeClasses[size]}`}
        role="status"
        aria-label="Loading"
      />
      {text && (
        <p className={`mt-2 text-secondary ${textSizeClasses[size]}`}>
          {text}
        </p>
      )}
    </div>
  );
};
