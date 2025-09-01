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
  buttonText?: string;
  icon?: ReactNode;
}

export const PageHero = ({
  title,
  description,
  backgroundImage = tldHeroImage,
  contactMessage,
  contactSubtext,
  buttonText = "Contact Us",
  icon
}: PageHeroProps) => {
  const handleContactClick = () => {
    window.open(externalLinks.support.githubIssues.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      />
      
      {/* Light overlay for text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-30" />
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="text-center max-w-4xl mx-auto space-y-8">
          {/* Hero Content */}
          <div className="space-y-6">
            {icon && (
              <div className="flex justify-center mb-6">
                <div className="
                  flex 
                  h-16 
                  w-16 
                  items-center 
                  justify-center 
                  rounded-lg 
                  bg-white/20 
                  backdrop-blur-sm
                  text-white
                ">
                  {icon}
                </div>
              </div>
            )}
            
            <h1 className="
              text-4xl 
              sm:text-5xl 
              lg:text-6xl 
              font-bold 
              text-white 
              leading-tight
              font-headline
              uppercase
            ">
              {title}
            </h1>
            
            <p className="
              text-xl 
              sm:text-2xl 
              text-white/90 
              leading-relaxed 
              max-w-3xl 
              mx-auto
              font-oswald
            ">
              {description}
            </p>
          </div>

          {/* Contact Section */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-6 max-w-2xl mx-auto">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">
                {contactMessage}
              </h3>
              
              {contactSubtext && (
                <p className="text-sm text-white/80">
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
                {buttonText}
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
    </section>
  );
};
