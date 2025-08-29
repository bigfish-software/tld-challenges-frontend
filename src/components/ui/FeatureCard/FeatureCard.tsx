import { ReactNode } from 'react';
import { Button } from '@/components/ui/Button';

export interface FeatureCardProps {
  title: string;
  description: string;
  titleIcon?: ReactNode;
  href: string;
  buttonText: string;
}

export const FeatureCard = ({
  title,
  description,
  titleIcon,
  href,
  buttonText
}: FeatureCardProps) => {
  return (
    <div className="
      group
      flex
      flex-col
      h-full
      bg-white 
      dark:bg-slate-800 
      border 
      border-slate-200 
      dark:border-slate-700 
      rounded-lg 
      shadow-sm 
      dark:shadow-slate-900/20 
      hover:shadow-md 
      dark:hover:shadow-slate-900/30 
      transition-all 
      duration-200
      hover:border-primary-300
      dark:hover:border-primary-600
      p-6
    ">
      {/* Content - grows to fill available space */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center gap-3 mb-3">
          <h3 className="
            text-xl 
            font-semibold 
            font-headline
            uppercase
            text-slate-900 
            dark:text-slate-100
            group-hover:text-primary-700
            dark:group-hover:text-primary-300
            transition-colors
            duration-200
          ">
            {title.toUpperCase()}
          </h3>
          {titleIcon && (
            <div className="
              text-slate-900 
              dark:text-slate-100
              group-hover:text-primary-700
              dark:group-hover:text-primary-300
              transition-colors
              duration-200
              flex-shrink-0
            ">
              {titleIcon}
            </div>
          )}
        </div>
        
        <p className="
          text-slate-600 
          dark:text-slate-300 
          text-base
          leading-relaxed
          flex-1
          mb-6
        ">
          {description}
        </p>

        {/* Call to Action - anchored to bottom */}
        <div className="mt-auto">
          <Button
            variant="outline"
            size="sm"
            fullWidth
            onClick={() => window.location.href = href}
          >
            {buttonText}
            <svg
              className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
};
