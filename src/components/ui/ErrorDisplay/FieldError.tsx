import React from 'react';

interface FieldErrorProps {
  error: string | null;
}

export const FieldError: React.FC<FieldErrorProps> = ({ error }) => {
  if (!error) return null;
  
  return (
    <div className="flex items-center mt-1 px-2 py-1.5 rounded bg-error dark:bg-error dark:bg-opacity-90 bg-opacity-80">
      <svg 
        className="h-5 w-5 text-white dark:text-white mr-1.5 flex-shrink-0" 
        fill="currentColor" 
        viewBox="0 0 20 20"
      >
        <path 
          fillRule="evenodd" 
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" 
          clipRule="evenodd" 
        />
      </svg>
      <p className="text-sm font-medium text-white dark:text-white">{error}</p>
    </div>
  );
};