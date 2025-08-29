import { Button } from '@/components/ui/Button';
import { FeatureCard } from '@/components/ui/FeatureCard';
import { TournamentSection } from '@/components/ui/TournamentSection';
import { DonationSection } from '@/components/ui/DonationSection';
import { ComputerIcon } from '@/components/ui/icons/ComputerIcon';
import { PaperIcon } from '@/components/ui/icons/PaperIcon';
import { DollarIcon } from '@/components/ui/icons/DollarIcon';
import tldHeroImage from '@/assets/homepage_hero.png';

/**
 * HomePage content component without Header and Footer.
 * Used for theme comparison stories and content-only rendering.
 */
export const HomePageContent = () => {
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
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        {/* TLD Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${tldHeroImage})`,
          }}
        />
        
        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/30 via-white/40 to-secondary-50/30 dark:from-slate-900/40 dark:via-slate-800/50 dark:to-slate-900/40" />
        
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='53' cy='7' r='1'/%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3Ccircle cx='7' cy='53' r='1'/%3E%3Ccircle cx='53' cy='53' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="text-center max-w-4xl mx-auto space-y-8">
            {/* Hero Content */}
            <div className="space-y-6">
              <h1 className="
                text-4xl 
                sm:text-5xl 
                lg:text-6xl 
                font-bold 
                text-slate-900 
                dark:text-slate-100 
                leading-tight
                font-oswald
              ">
                Welcome to{' '}
                <span className="
                  text-transparent 
                  bg-clip-text 
                  bg-gradient-to-r 
                  from-primary-400 
                  to-accent-400
                  dark:from-primary-300 
                  dark:to-accent-300
                  font-headline
                ">
                  TLD CHALLENGES
                </span>
              </h1>
              
              <p className="
                text-2xl 
                sm:text-3xl 
                text-slate-700 
                dark:text-slate-300 
                leading-relaxed 
                max-w-3xl 
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
                onClick={() => window.location.href = '/submit-run'}
              >
                Submit Run
              </Button>
            </div>

            {/* Stats or Quick Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto pt-8">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary-600 dark:text-primary-300">
                  50+
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-300">
                  Custom Codes
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary-600 dark:text-primary-300">
                  500+
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-300">
                  Challenges
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary-600 dark:text-primary-300">
                  12+
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-300">
                  Tournaments
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-slate-50 dark:bg-slate-800/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="
              text-3xl 
              sm:text-4xl 
              font-bold 
              font-headline
              text-slate-900 
              dark:text-slate-100 
              mb-4
              uppercase
            ">
              DISCOVER TLD CHALLENGES
            </h2>
            <p className="
              text-lg 
              text-slate-600 
              dark:text-slate-400 
              max-w-2xl 
              mx-auto
            ">
              Three ways to turn your virtual freezing and starving into bragging rights. 
              Because surviving the apocalypse wasn't challenging enough.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
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

      {/* Tournament Section */}
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="
              text-3xl 
              sm:text-4xl 
              font-bold 
              font-headline
              text-slate-900 
              dark:text-slate-100 
              mb-4
              uppercase
            ">
              CURRENT TOURNAMENT
            </h2>
            <p className="
              text-lg 
              text-slate-600 
              dark:text-slate-400 
              max-w-2xl 
              mx-auto
            ">
              Join our active tournament and compete with the community for recognition and prizes.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <TournamentSection />
          </div>
        </div>
      </section>

      {/* Donation Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-slate-50 dark:bg-slate-800/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <DonationSection />
          </div>
        </div>
      </section>
    </main>
  );
};
