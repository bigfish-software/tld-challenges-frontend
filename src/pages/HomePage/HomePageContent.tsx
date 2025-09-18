import { Button } from '@/components/ui/Button';
import { FeatureCard } from '@/components/ui/FeatureCard';
import { TournamentSection } from '@/components/ui/TournamentSection';
import { SupportSection } from '@/components/ui/SupportSection';
import { ComputerIcon } from '@/components/ui/icons/ComputerIcon';
import { PaperIcon } from '@/components/ui/icons/PaperIcon';
import { DollarIcon } from '@/components/ui/icons/DollarIcon';
import { useStatsOverview, useTournaments } from '@/hooks/api';
import type { Tournament } from '@/types/api';
import tldHeroImage from '@/assets/homepage_hero.png';

export const HomePageContent = () => {
  // Fetch real statistics from API
  const { data: statsResponse, isLoading: statsLoading, error: statsError } = useStatsOverview();
  
  // Fetch active tournaments
  const { data: tournamentsResponse, isLoading: tournamentsLoading, error: tournamentsError } = useTournaments({
    state: 'active'
  });
  
  // Extract stats data from the response
  const stats = statsResponse?.data;
  
  // Extract active tournaments - handle different response structures
  const activeTournaments: Tournament[] = (() => {
    if (!tournamentsResponse) return [];
    
    // Handle direct array response
    if (Array.isArray(tournamentsResponse)) {
      return tournamentsResponse;
    }
    
    // Handle Strapi response with data property
    if ((tournamentsResponse as any)?.data) {
      const data = (tournamentsResponse as any).data;
      return Array.isArray(data) ? data : [data];
    }
    
    return [];
  })();

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
        {/* TLD Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
          style={{
            backgroundImage: `url(${tldHeroImage})`,
          }}
        />
        
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

      {/* Tournament Section - Only show if there are active tournaments */}
      {!tournamentsLoading && !tournamentsError && activeTournaments.length > 0 && (
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
                {activeTournaments.length === 1 ? 'CURRENT TOURNAMENT' : 'ACTIVE TOURNAMENTS'}
              </h2>
              <p className="
                text-lg 
                text-secondary 
                mx-auto
              ">
                {activeTournaments.length === 1 
                  ? 'Join our active tournament and compete with the community for recognition and prizes.'
                  : 'Join one of our active tournaments and compete with the community for recognition and prizes.'
                }
              </p>
            </div>

            <div className="space-y-6">
              {activeTournaments.map((tournament) => {
                return (
                  <TournamentSection 
                    key={tournament.id} 
                    tournament={{
                      id: tournament.id,
                      title: tournament.name || 'Unnamed Tournament',
                      description: tournament.description_short || 'No description available',
                      status: 'active',
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
