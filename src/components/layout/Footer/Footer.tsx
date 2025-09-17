import { externalLinks } from '@/config/externalLinks';
import { TldLogoIcon, SteamIcon } from '@/components/ui/icons';

export const Footer = () => {
  return (
    <footer className="border-t border-default bg-background-primary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-3">
              <h3 className="text-lg font-semibold font-headline uppercase text-primary-color">
                TLD CHALLENGES
              </h3>
              {/* Logo Icon */}
              <TldLogoIcon className="h-5 w-5 text-primary-color" />
            </div>
            <p className="text-secondary text-sm max-w-md">
                A hub to explore and create custom game codes, challenges and tournaments, made by the community for the community.
            </p>
            <p className="text-tertiary text-xs mt-2 italic">
              Made without crunch by people who care about their friends at a community that cares about its challenges.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-primary mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href={externalLinks.game.steamStore.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-secondary nav-link flex items-center space-x-2"
                >
                  <SteamIcon className="w-4 h-4" />
                  <span>{externalLinks.game.steamStore.label}</span>
                </a>
              </li>
              <li>
                <a 
                  href={externalLinks.game.hinterlandForums.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-secondary nav-link flex items-center space-x-2"
                >
                  <TldLogoIcon className="w-4 h-4" />
                  <span>{externalLinks.game.hinterlandForums.label}</span>
                </a>
              </li>
              <li>
                <a 
                  href="#custom-codes" 
                  className="text-secondary nav-link flex items-center space-x-2"
                >
                  <TldLogoIcon className="w-4 h-4" />
                  <span>Custom Codes</span>
                </a>
              </li>
              <li>
                <a 
                  href="#challenges" 
                  className="text-secondary nav-link flex items-center space-x-2"
                >
                  <TldLogoIcon className="w-4 h-4" />
                  <span>Challenges</span>
                </a>
              </li>
              <li>
                <a 
                  href="#tournaments" 
                  className="text-secondary nav-link flex items-center space-x-2"
                >
                  <TldLogoIcon className="w-4 h-4" />
                  <span>Tournaments</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-sm font-semibold text-primary mb-3">
              Community
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href={externalLinks.community.github.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-secondary nav-link"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span>{externalLinks.community.github.label}</span>
                </a>
              </li>
              <li>
                <a 
                  href={externalLinks.community.discord.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-secondary nav-link"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                  <span>{externalLinks.community.discord.label}</span>
                </a>
              </li>
              <li>
                <a 
                  href={externalLinks.community.bigfishTwitch.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-secondary nav-link"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
                  </svg>
                  <span>{externalLinks.community.bigfishTwitch.label}</span>
                </a>
              </li>
              <li>
                <a 
                  href={externalLinks.community.chefmariaTwitch.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-secondary nav-link"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
                  </svg>
                  <span>{externalLinks.community.chefmariaTwitch.label}</span>
                </a>
              </li>
              <li>
                <a 
                  href={externalLinks.community.bigfishMods.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-secondary nav-link"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span>{externalLinks.community.bigfishMods.label}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-8 border-t border-default">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-xs text-tertiary">
              © 2025 TLD Challenges. Built for The Long Dark community.
            </p>
            <div className="flex items-center space-x-4 mt-2 sm:mt-0">
              <a 
                href="/privacy" 
                className="text-xs text-tertiary nav-link"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
