import { ReactNode } from 'react';
import { Button } from '@/components/ui/Button';
import { externalLinks } from '@/config/externalLinks';
import tldHeroImage from '@/assets/homepage_hero.png';

export interface PageHeroProps {
  title: string;
  description: string;
  backgroundImage?: string;
  contactMessage: string;
  contactSubtext?: string;
  icon?: ReactNode;
}

export const PageHero = ({
  title,
  description,
  backgroundImage = tldHeroImage,
  contactMessage,
  contactSubtext,
  icon
}: PageHeroProps) => {
  const handleContactClick = () => {
    window.open(externalLinks.support.githubIssues.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="relative overflow-hidden bg-gradient-hero">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      />
      
      {/* Overlay for text readability */}
      <div className="absolute inset-0 bg-overlay-hero" />
      
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='53' cy='7' r='1'/%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3Ccircle cx='7' cy='53' r='1'/%3E%3Ccircle cx='53' cy='53' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto">
          {/* Main Content */}
          <div className="text-center space-y-8">
            {/* Title with Icon */}
            <div className="space-y-4">
              {icon && (
                <div className="flex justify-center">
                  <div className="
                    flex 
                    h-16 
                    w-16 
                    items-center 
                    justify-center 
                    rounded-lg 
                    bg-primary-light 
                    text-primary-color
                  ">
                    {icon}
                  </div>
                </div>
              )}
              
              <h1 className="
                text-3xl 
                sm:text-4xl 
                lg:text-5xl 
                font-bold 
                font-headline
                uppercase
                text-primary 
                leading-tight
              ">
                {title}
              </h1>
              
              <p className="
                text-lg 
                sm:text-xl 
                text-secondary 
                leading-relaxed 
                max-w-3xl 
                mx-auto
              ">
                {description}
              </p>
            </div>

            {/* Contact Section */}
            <div className="bg-surface/80 backdrop-blur-sm rounded-lg border-default/50 p-6 max-w-2xl mx-auto">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-primary">
                  {contactMessage}
                </h3>
                
                {contactSubtext && (
                  <p className="text-sm text-secondary">
                    {contactSubtext}
                  </p>
                )}
                
                <Button
                  variant="primary"
                  size="md"
                  shadow="lg"
                  hoverEffect="both"
                  onClick={handleContactClick}
                  className="w-full sm:w-auto"
                >
                  Contact Us
                  <svg
                    className="ml-2 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
