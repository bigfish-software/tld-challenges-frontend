import { Button } from '@/components/ui/Button';
import { FeatureCard } from '@/components/ui/FeatureCard';
import { TournamentSection } from '@/components/ui/TournamentSection';
import { SupportSection } from '@/components/ui/SupportSection';
import { ComputerIcon } from '@/components/ui/icons/ComputerIcon';
import { PaperIcon } from '@/components/ui/icons/PaperIcon';
import { DollarIcon } from '@/components/ui/icons/DollarIcon';
import { useStatsOverview, useTournaments, usePageHero } from '@/hooks/api';
import { getHeroResponsiveImageProps, getImageAltText } from '@/utils/images';
import type { Tournament } from '@/types/api';

export const HomePageContent = () => {
  // Fetch real statistics from API
  const { data: statsResponse, isLoading: statsLoading, error: statsError } = useStatsOverview();
  
  // Fetch active and planned tournaments
  const { data: activeTournamentsResponse, isLoading: activeTournamentsLoading, error: activeTournamentsError } = useTournaments({
    state: 'active'
  });

  const { data: plannedTournamentsResponse, isLoading: plannedTournamentsLoading, error: plannedTournamentsError } = useTournaments({
    state: 'planned'
  });

  // Fetch page hero data
  const { data: pageHeroResponse } = usePageHero();

  // Get dynamic home page hero image data
  const getHomeHeroImageData = () => {
    return pageHeroResponse?.data?.home;
  };
  
  // Extract stats data from the response
  const stats = statsResponse?.data;
  
  // Extract active tournaments - handle different response structures
  const activeTournaments: Tournament[] = (() => {
    if (!activeTournamentsResponse) return [];
    
    // Handle direct array response
    if (Array.isArray(activeTournamentsResponse)) {
      return activeTournamentsResponse;
    }
    
    // Handle Strapi response with data property
    if ((activeTournamentsResponse as any)?.data) {
      const data = (activeTournamentsResponse as any).data;
      return Array.isArray(data) ? data : [data];
    }
    
    return [];
  })();

  // Extract planned tournaments - handle different response structures
  const plannedTournaments: Tournament[] = (() => {
    if (!plannedTournamentsResponse) return [];
    
    // Handle direct array response
    if (Array.isArray(plannedTournamentsResponse)) {
      return plannedTournamentsResponse;
    }
    
    // Handle Strapi response with data property
    if ((plannedTournamentsResponse as any)?.data) {
      const data = (plannedTournamentsResponse as any).data;
      return Array.isArray(data) ? data : [data];
    }
    
    return [];
  })();

  // Combine active and planned tournaments
  const displayTournaments = [...activeTournaments, ...plannedTournaments];

  // Feature cards data - using proper icon components
  const features = [
    {
      title: 'Custom Codes',
      description: 'Discover and share custom game configuration codes that enable unique challenges and gameplay experiences.',
      titleIcon: <ComputerIcon />,
      href: '/custom-codes',
      buttonText: 'Explore Codes'
    },
    {
      title: 'Challenges',
      description: 'Browse community-created challenges with leaderboards to track your progress and compete with other survivors.',
      titleIcon: <PaperIcon />,
      href: '/challenges',
      buttonText: 'Browse Challenges'
    },
    {
      title: 'Tournaments',
      description: 'Join organized competitive events with prizes ranging from cold hard cash to warm fuzzy feelings of community fame.',
      titleIcon: <DollarIcon />,
      href: '/tournaments',
      buttonText: 'View Tournaments'
    }
  ];

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Image using proper img element */}
        {(() => {
          const heroImageData = getHomeHeroImageData();
          if (heroImageData) {
            const imageProps = getHeroResponsiveImageProps(heroImageData);
            return imageProps ? (
              <img
                src={imageProps.src}
                srcSet={imageProps.srcSet}
                sizes={imageProps.sizes}
                alt={getImageAltText(heroImageData, 'TLD Challenges Hero')}
                className="absolute inset-0 w-full h-full object-cover z-0"
              />
            ) : (
              <img
                src={`${import.meta.env.VITE_API_BASE_URL?.replace(/\/api$/, '') || 'http://localhost:1337'}${heroImageData.url}`}
                alt={getImageAltText(heroImageData, 'TLD Challenges Hero')}
                className="absolute inset-0 w-full h-full object-cover z-0"
              />
            );
          } else {
            return (
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary z-0" />
            );
          }
        })()}
        
        {/* Simple dark overlay for text readability - between background and content */}
        <div className="absolute inset-0 bg-black bg-opacity-40 z-10" />
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 z-20">
          <div className="text-center space-y-8">
            {/* Hero Content */}
            <div className="space-y-6">
              <h1 className="
                text-4xl 
                sm:text-5xl 
                lg:text-6xl 
                font-bold 
                text-light-primary 
                leading-tight
                font-oswald
              ">
                Welcome to{' '}
                <span className="
                  text-transparent 
                  bg-clip-text 
                  bg-gradient-brand
                  font-headline
                ">
                  TLD CHALLENGES
                </span>
              </h1>
              
              <p className="
                text-2xl 
                sm:text-3xl 
                text-light-secondary 
                leading-relaxed 
                mx-auto
                font-oswald
              ">
                A hub to explore and create custom game codes, challenges and tournaments, made by the community for the community.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                variant="primary"
                size="lg"
                shadow="xl"
                hoverEffect="both"
                onClick={() => window.location.href = '/challenges'}
              >
                Explore Challenges
              </Button>
              
              <Button
                variant="secondary"
                size="lg"
                shadow="lg"
                hoverEffect="both"
                onClick={() => window.location.href = '/submissions'}
              >
                Submit Run
              </Button>
            </div>

            {/* Stats or Quick Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-light-primary">
                  {statsLoading ? '...' : statsError ? '?' : `${stats?.tournaments || 0}+`}
                </div>
                <div className="text-sm text-light-secondary">
                  Tournaments
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-light-primary">
                  {statsLoading ? '...' : statsError ? '?' : `${stats?.challenges || 0}+`}
                </div>
                <div className="text-sm text-light-secondary">
                  Challenges
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-light-primary">
                  {statsLoading ? '...' : statsError ? '?' : `${stats?.submissions || 0}+`}
                </div>
                <div className="text-sm text-light-secondary">
                  Submissions
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tournament Section - Show if there are active or planned tournaments */}
      {!activeTournamentsLoading && !plannedTournamentsLoading && !activeTournamentsError && !plannedTournamentsError && displayTournaments.length > 0 && (
        <section className="py-16 sm:py-20 lg:py-24 section-primary">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="
                text-3xl 
                sm:text-4xl 
                font-bold 
                font-headline
                text-primary 
                mb-4
                uppercase
              ">
                {displayTournaments.length === 1 ? 'CURRENT TOURNAMENT' : 'TOURNAMENTS'}
              </h2>
              <p className="
                text-lg 
                text-secondary 
                mx-auto
              ">
                {displayTournaments.length === 1 
                  ? 'Join our tournament and compete with the community for recognition and prizes.'
                  : 'Join our tournaments and compete with the community for recognition and prizes.'
                }
              </p>
            </div>

            <div className="space-y-6">
              {displayTournaments.map((tournament) => {
                return (
                  <TournamentSection 
                    key={tournament.id} 
                    tournament={{
                      id: tournament.id,
                      title: tournament.name || 'Unnamed Tournament',
                      description: tournament.description_short || 'No description available',
                      status: tournament.state as 'active' | 'planned',
                      startDate: tournament.start_date || '',
                      endDate: tournament.end_date || '',
                      slug: tournament.slug || '',
                    }}
                  />
                );
              }).filter(Boolean)}
            </div>
          </div>
        </section>
      )}

      {/* Feature Cards Section */}
      <section className="py-16 sm:py-20 lg:py-24 section-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="
              text-3xl 
              sm:text-4xl 
              font-bold 
              font-headline
              text-primary 
              mb-4
              uppercase
            ">
              DISCOVER TLD CHALLENGES
            </h2>
            <p className="
              text-lg 
              text-secondary 
              mx-auto
            ">
              Three ways to turn your virtual freezing and starving into bragging rights. 
              Because surviving the apocalypse wasn't challenging enough.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
                titleIcon={feature.titleIcon}
                href={feature.href}
                buttonText={feature.buttonText}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="py-16 sm:py-20 lg:py-24 section-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SupportSection />
        </div>
      </section>
    </main>
  );
};
