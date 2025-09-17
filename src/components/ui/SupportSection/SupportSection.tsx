import { Button } from '@/components/ui/Button';

export interface SupportSectionProps {
  className?: string;
}

export const SupportSection = ({ className = '' }: SupportSectionProps) => {
  const handleKofiClick = () => {
    // Open Ko-fi page for direct donations
    window.open('https://ko-fi.com/bigfishsoftware', '_blank', 'noopener,noreferrer');
  };

  const handleSupportPageClick = () => {
    // Navigate to support page
    window.location.href = '/support';
  };

  return (
    <section className={`
      bg-gradient-to-br 
      from-secondary-light
      to-secondary-base
      card-surface
      border 
      border-default
      rounded-lg 
      overflow-hidden
      ${className}
    `}>
      <div className="px-6 py-8 sm:px-8 sm:py-10">
        <div className="text-center max-w-2xl mx-auto space-y-6">
          {/* Header */}
          <div className="space-y-3">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-light rounded-full">
              <svg 
                className="w-8 h-8 text-primary-color" 
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
              font-headline
              uppercase
              text-primary 
              leading-tight
            ">
              SUPPORT THE COMMUNITY
            </h2>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <p className="
              text-secondary 
              text-lg 
              leading-relaxed
            ">
              TLD Challenges is a passion project built by the community, for the community. 
              Your support helps us keep the servers running and continue developing new features.
            </p>

            <p className="
              text-secondary 
              text-base
            ">
              Every contribution, no matter how small, makes a difference in keeping this platform alive and growing.
            </p>
          </div>

          {/* Support Options */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="primary"
              size="lg"
              shadow="lg"
              hoverEffect="both"
              onClick={handleKofiClick}
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.881 8.948c-.773-4.085-4.859-4.593-4.859-4.593H.723c-.604 0-.679.798-.679.798s-.082 7.324-.033 11.414c.049 4.271 3.468 7.433 7.96 7.433h8.395c4.491 0 7.884-3.138 7.884-7.433C24.25 16.566 23.881 8.948 23.881 8.948zM7.68 8.098c-.184 0-.338.155-.338.343v6.114c0 .188.154.343.338.343h.852c.184 0 .338-.155.338-.343V8.441c0-.188-.154-.343-.338-.343H7.68zm1.542 6.457c0 .188.154.343.338.343h.852c.184 0 .338-.155.338-.343V8.441c0-.188-.154-.343-.338-.343H9.56c-.184 0-.338.155-.338.343v6.114zm1.542-6.457c-.184 0-.338.155-.338.343v6.114c0 .188.154.343.338.343h.852c.184 0 .338-.155.338-.343V8.441c0-.188-.154-.343-.338-.343h-.852zm5.994 4.045c.726-.635 1.185-1.574 1.185-2.625 0-1.932-1.568-3.5-3.5-3.5s-3.5 1.568-3.5 3.5c0 1.051.459 1.99 1.185 2.625.399.348.872.6 1.396.725v1.792c0 .188.154.343.338.343h.852c.184 0 .338-.155.338-.343v-1.792c.524-.125.997-.377 1.396-.725z"/>
              </svg>
              Donate on Ko-fi
            </Button>
            
            <Button
              variant="secondary"
              size="lg"
              shadow="lg"
              hoverEffect="both"
              onClick={handleSupportPageClick}
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92S19.61 16.08 18 16.08z"/>
              </svg>
              More Ways to Help
            </Button>
          </div>

          {/* Transparency Note */}
          <div className="
            card-surface
            border 
            border-default
            rounded-lg 
            p-4
          ">
            <p className="text-xs text-secondary leading-relaxed">
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