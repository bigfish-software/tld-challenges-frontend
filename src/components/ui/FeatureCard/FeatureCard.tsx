import { ReactNode } from 'react';
import { Button } from '@/components/ui/Button';

export interface FeatureCardProps {
  title: string;
  description: string;
  titleIcon?: ReactNode;
  href: string;
  buttonText: string;
  iconVariant?: 'sm' | 'md' | 'lg';
}

export const FeatureCard = ({
  title,
  description,
  titleIcon,
  href,
  buttonText,
  iconVariant = 'md'
}: FeatureCardProps) => {
  // Icon size variants - encapsulated styling  
  const iconSizeClasses = {
    sm: 'h-28 w-28',   // 112px - smaller size
    md: 'h-32 w-32',   // 128px - smaller size  
    lg: 'h-36 w-36'    // 144px - smaller size
  };

  return (
    <div className="
      group
      flex
      flex-col
      h-full
      home-feature-card 
      rounded-lg 
      shadow-sm
      p-6
    ">
      {/* Content - grows to fill available space */}
      <div className="flex-1 flex flex-col">
        {/* Icon Section - Above content */}
        {titleIcon && (
          <div className="
            flex 
            justify-center 
            mb-6
          ">
            <div className={`
              text-primary
              group-hover:text-primary-color
              transition-all
              duration-300
              group-hover:scale-110
              ${iconSizeClasses[iconVariant]}
            `}>
              {titleIcon}
            </div>
          </div>
        )}
        
        {/* Title Section */}
        <div className="text-center mb-4">
          <h3 className="
            text-xl 
            font-semibold 
            font-headline
            uppercase
            text-primary
            group-hover:text-primary-color
            transition-colors
            duration-200
          ">
            {title.toUpperCase()}
          </h3>
        </div>
        
        <p className="
          text-secondary 
          text-base
          leading-relaxed
          text-center
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
