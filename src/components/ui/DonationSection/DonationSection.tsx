import { Button } from '@/components/ui/Button';
import { getBigFishTwitchUrl, getDiscordUrl } from '@/config/externalLinks';

export interface DonationSectionProps {
  className?: string;
}

export const DonationSection = ({ className = '' }: DonationSectionProps) => {
  const handleDonationClick = () => {
    // Open BigFish Twitch channel for donations/subscriptions
    window.open(getBigFishTwitchUrl(), '_blank', 'noopener,noreferrer');
  };

  const handleKofiClick = () => {
    // Open Ko-fi page for direct donations
    window.open('https://ko-fi.com/bigfishsoftware', '_blank', 'noopener,noreferrer');
  };

  const handleCommunityClick = () => {
    // Open Discord for community support
    window.open(getDiscordUrl(), '_blank', 'noopener,noreferrer');
  };

  return (
    <section className={`
      bg-gradient-to-br 
      from-secondary-50 
      to-secondary-100 
      dark:from-slate-800 
      dark:to-slate-900 
      border 
      border-secondary-200 
      dark:border-slate-700 
      rounded-lg 
      overflow-hidden
      ${className}
    `}>
      <div className="px-6 py-8 sm:px-8 sm:py-10">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Header */}
          <div className="space-y-3">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full">
              <svg 
                className="w-8 h-8 text-primary-600 dark:text-primary-400" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>

            <h2 className="
              text-2xl 
              sm:text-3xl 
              font-bold 
              text-slate-900 
              dark:text-slate-100
              leading-tight
            ">
              Support the Community
            </h2>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <p className="
              text-slate-700 
              dark:text-slate-300 
              text-lg 
              leading-relaxed
            ">
              TLD Challenges is a passion project built by the community, for the community. 
              Your support helps us keep the servers running and continue developing new features.
            </p>

            <p className="
              text-slate-600 
              dark:text-slate-400 
              text-base
            ">
              Every contribution, no matter how small, makes a difference in keeping this platform alive and growing.
            </p>
          </div>

          {/* Support Options */}
          <div className="space-y-6">
            {/* Direct Donation Option */}
            <div className="
              bg-white/70 
              dark:bg-slate-800/70 
              backdrop-blur-sm 
              border 
              border-white/30 
              dark:border-slate-700/60 
              rounded-lg 
              p-6
            ">
              <div className="space-y-3">
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5 text-slate-900 dark:text-slate-100" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.881 8.948c-.773-4.085-4.859-4.593-4.859-4.593H.723c-.604 0-.679.798-.679.798s-.082 7.324-.033 11.414c.049 4.271 3.468 7.433 7.96 7.433h8.395c4.491 0 7.884-3.138 7.884-7.433C24.25 16.566 23.881 8.948 23.881 8.948zM7.68 8.098c-.184 0-.338.155-.338.343v6.114c0 .188.154.343.338.343h.852c.184 0 .338-.155.338-.343V8.441c0-.188-.154-.343-.338-.343H7.68zm1.542 6.457c0 .188.154.343.338.343h.852c.184 0 .338-.155.338-.343V8.441c0-.188-.154-.343-.338-.343h-.852c-.184 0-.338.155-.338.343v6.114zm1.542 0c0 .188.154.343.338.343h.852c.184 0 .338-.155.338-.343V8.441c0-.188-.154-.343-.338-.343h-.852c-.184 0-.338.155-.338.343v6.114zm1.542 0c0 .188.154.343.338.343h.852c.184 0 .338-.155.338-.343V8.441c0-.188-.154-.343-.338-.343h-.852c-.184 0-.338.155-.338.343v6.114zm5.102-6.457c-.184 0-.338.155-.338.343v6.114c0 .188.154.343.338.343h.852c.184 0 .338-.155.338-.343V8.441c0-.188-.154-.343-.338-.343h-.852zm-1.542 6.457c0 .188.154.343.338.343h.852c.184 0 .338-.155.338-.343V8.441c0-.188-.154-.343-.338-.343h-.852c-.184 0-.338.155-.338.343v6.114z"/>
                  </svg>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                    Direct Donation
                  </h3>
                </div>
                
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Support TLD Challenges directly through Ko-fi with a one-time or monthly donation
                </p>
                
                <Button
                  variant="primary"
                  size="lg"
                  shadow="lg"
                  hoverEffect="both"
                  onClick={handleKofiClick}
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.881 8.948c-.773-4.085-4.859-4.593-4.859-4.593H.723c-.604 0-.679.798-.679.798s-.082 7.324-.033 11.414c.049 4.271 3.468 7.433 7.96 7.433h8.395c4.491 0 7.884-3.138 7.884-7.433C24.25 16.566 23.881 8.948 23.881 8.948zM7.68 8.098c-.184 0-.338.155-.338.343v6.114c0 .188.154.343.338.343h.852c.184 0 .338-.155.338-.343V8.441c0-.188-.154-.343-.338-.343H7.68zm1.542 6.457c0 .188.154.343.338.343h.852c.184 0 .338-.155.338-.343V8.441c0-.188-.154-.343-.338-.343h-.852c-.184 0-.338.155-.338.343v6.114zm1.542 0c0 .188.154.343.338.343h.852c.184 0 .338-.155.338-.343V8.441c0-.188-.154-.343-.338-.343h-.852c-.184 0-.338.155-.338.343v6.114zm1.542 0c0 .188.154.343.338.343h.852c.184 0 .338-.155.338-.343V8.441c0-.188-.154-.343-.338-.343h-.852c-.184 0-.338.155-.338.343v6.114zm5.102-6.457c-.184 0-.338.155-.338.343v6.114c0 .188.154.343.338.343h.852c.184 0 .338-.155.338-.343V8.441c0-.188-.154-.343-.338-.343h-.852zm-1.542 6.457c0 .188.154.343.338.343h.852c.184 0 .338-.155.338-.343V8.441c0-.188-.154-.343-.338-.343h-.852c-.184 0-.338.155-.338.343v6.114z"/>
                  </svg>
                  Donate on Ko-fi
                </Button>
              </div>
            </div>

            {/* Secondary Support Option - Twitch */}
            <div className="
              bg-white/60 
              dark:bg-slate-800/60 
              backdrop-blur-sm 
              border 
              border-white/20 
              dark:border-slate-700/50 
              rounded-lg 
              p-6
            ">
              <div className="space-y-3">
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5 text-slate-900 dark:text-slate-100" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
                  </svg>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                    Support on Twitch
                  </h3>
                </div>
                
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Follow BigFish on Twitch and consider subscribing or donating during streams
                </p>
                
                <Button
                  variant="secondary"
                  size="lg"
                  shadow="lg"
                  hoverEffect="both"
                  onClick={handleDonationClick}
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
                  </svg>
                  Visit Twitch Channel
                </Button>
              </div>
            </div>

            {/* Community Support Option - Discord */}
            <div className="
              bg-white/60 
              dark:bg-slate-800/60 
              backdrop-blur-sm 
              border 
              border-white/20 
              dark:border-slate-700/50 
              rounded-lg 
              p-6
            ">
              <div className="space-y-3">
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5 text-slate-900 dark:text-slate-100" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                    Join Our Community
                  </h3>
                </div>
                
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Connect with fellow survivors, share strategies, and help grow the TLD Challenges community
                </p>
                
                <Button
                  variant="secondary"
                  size="lg"
                  shadow="lg"
                  hoverEffect="both"
                  onClick={handleCommunityClick}
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.60a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                  Join Discord Community
                </Button>
              </div>
            </div>

            {/* Spread the Word Section */}
            <div className="
              bg-white/40 
              dark:bg-slate-800/40 
              backdrop-blur-sm 
              border 
              border-white/20 
              dark:border-slate-700/30 
              rounded-lg 
              p-6
              text-center
            ">
              <div className="space-y-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-secondary-100 dark:bg-secondary-900/30 rounded-full">
                  <svg className="w-6 h-6 text-slate-900 dark:text-slate-100" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
                  </svg>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                    Spread the Word
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                    Help us grow by sharing TLD Challenges with other The Long Dark players. 
                    Tell your friends about your favorite challenges and invite them to join the community!
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Share on social media, gaming forums, or simply word of mouth
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Transparency Note */}
          <div className="
            bg-slate-50/50 
            dark:bg-slate-900/50 
            border 
            border-slate-200/50 
            dark:border-slate-700/50 
            rounded-lg 
            p-4
          ">
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              <strong>Transparency:</strong> All donations go directly towards server hosting costs, 
              domain registration, and platform development. This is a community-driven project 
              with no profit motive.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
