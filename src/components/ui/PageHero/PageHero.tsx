import { ReactNode } from 'react';
import { Button } from '@/components/ui/Button';
import { externalLinks } from '@/config/externalLinks';
import { usePageHero } from '@/hooks/api';
import { getHeroResponsiveImageProps, getImageAltText } from '@/utils/images';
import type { StrapiMedia } from '@/types/api';

export type PageHeroType = 'home' | 'codes' | 'challenges' | 'tournaments' | 'submit_run' | 'submit_idea' | 'support';

export interface PageHeroProps {
  title: string;
  description: string;
  pageType?: PageHeroType;
  backgroundImage?: string;
  contactMessage?: string;
  contactSubtext?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  icon?: ReactNode;
}

export const PageHero = ({
  title,
  description,
  pageType,
  backgroundImage,
  contactMessage,
  contactSubtext,
  buttonText = "Contact Us",
  onButtonClick,
  icon
}: PageHeroProps) => {
  // Fetch dynamic page hero data if pageType is provided
  const { data: pageHeroResponse } = usePageHero();

  // Get dynamic image based on page type
  const getDynamicImageData = (): StrapiMedia | null | undefined => {
    if (!pageType || !pageHeroResponse?.data) return undefined;
    
    const pageHeroData = pageHeroResponse.data;
    const imageMap: Record<PageHeroType, StrapiMedia | null | undefined> = {
      home: pageHeroData.home,
      codes: pageHeroData.codes,
      challenges: pageHeroData.challenges,
      tournaments: pageHeroData.tournament, // Note: backend field is 'tournament' not 'tournaments'
      submit_run: pageHeroData.submit_run,
      submit_idea: pageHeroData.submit_idea,
      support: pageHeroData.support,
    };

    return imageMap[pageType];
  };

  // Get the image data for rendering
  const heroImageData = getDynamicImageData();

  const handleContactClick = () => {
    if (onButtonClick) {
      onButtonClick();
    } else {
      window.open(externalLinks.support.githubIssues.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section className="relative overflow-hidden">
      {/* Background Image - use proper img element with responsive attributes */}
      {(() => {
        // Check for backgroundImage override first, then dynamic image
        if (backgroundImage) {
          return (
            <img
              src={backgroundImage}
              alt=""
              className="absolute inset-0 w-full h-full object-cover z-0"
            />
          );
        }
        
        // Use dynamic image with responsive attributes
        if (heroImageData) {
          const imageProps = getHeroResponsiveImageProps(heroImageData);
          return imageProps ? (
            <img
              src={imageProps.src}
              srcSet={imageProps.srcSet}
              sizes={imageProps.sizes}
              alt={getImageAltText(heroImageData, 'Hero background')}
              className="absolute inset-0 w-full h-full object-cover z-0"
            />
          ) : (
            <img
              src={`${import.meta.env.VITE_API_BASE_URL?.replace(/\/api$/, '') || 'http://localhost:1337'}${heroImageData.url}`}
              alt={getImageAltText(heroImageData, 'Hero background')}
              className="absolute inset-0 w-full h-full object-cover z-0"
            />
          );
        }
        
        // Fallback gradient when no image is available
        return (
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary z-0" />
        );
      })()}
      
      {/* Light overlay for text readability - between background and content */}
      <div className="absolute inset-0 bg-black bg-opacity-30 z-10" />
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 z-20">
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
              text-3xl 
              sm:text-4xl 
              lg:text-5xl 
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

          {/* Contact Section - only shown if contactMessage is provided */}
          {contactMessage && (
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
          )}
        </div>
      </div>
    </section>
  );
};
