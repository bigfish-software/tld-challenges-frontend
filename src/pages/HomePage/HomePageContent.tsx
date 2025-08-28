import { Button } from '@/components/ui/Button';
import { FeatureCard } from '@/components/ui/FeatureCard';
import { TournamentSection } from '@/components/ui/TournamentSection';
import { DonationSection } from '@/components/ui/DonationSection';

/**
 * HomePage content component without Header and Footer.
 * Used for theme comparison stories and content-only rendering.
 */
export const HomePageContent = () => {
  // Feature cards data - same as actual HomePage
  const features = [
    {
      title: 'Custom Codes',
      description: 'Discover and share custom game configuration codes that enable unique challenges and gameplay experiences.',
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
          />
        </svg>
      ),
      href: '/custom-codes',
      buttonText: 'Explore Codes'
    },
    {
      title: 'Challenges',
      description: 'Browse community-created challenges with leaderboards to track your progress and compete with other survivors.',
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      href: '/challenges',
      buttonText: 'Browse Challenges'
    },
    {
      title: 'Tournaments',
      description: 'Join organized competitive events with prizes ranging from cold hard cash to warm fuzzy feelings of community fame.',
      icon: (
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
          />
        </svg>
      ),
      href: '/tournaments',
      buttonText: 'View Tournaments'
    }
  ];

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        {/* Background Pattern */}
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
                ">
                  TLD Challenges
                </span>
              </h1>
              
              <p className="
                text-xl 
                sm:text-2xl 
                text-slate-700 
                dark:text-slate-300 
                leading-relaxed 
                max-w-3xl 
                mx-auto
              ">
                Made without crunch by people who care about their friends at a community who cares about their challenges.
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
                <div className="text-2xl sm:text-3xl font-bold text-primary-600 dark:text-primary-400">
                  50+
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Custom Codes
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary-600 dark:text-primary-400">
                  500+
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Challenges
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary-600 dark:text-primary-400">
                  12+
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
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
              text-slate-900 
              dark:text-slate-100 
              mb-4
            ">
              Discover TLD Challenges
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
                icon={feature.icon}
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
              text-slate-900 
              dark:text-slate-100 
              mb-4
            ">
              Current Tournament
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
