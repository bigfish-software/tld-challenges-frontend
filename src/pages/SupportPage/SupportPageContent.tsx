import { Button } from '@/components/ui/Button';
import { PageHero } from '@/components/ui/PageHero';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { 
  getBigFishTwitchUrl, 
  getChefMariaTwitchUrl, 
  getDiscordUrl,
  getGitHubIssuesUrl,
  getKofiUrl,
  getTwitterShareUrl,
  getRedditShareUrl,
  getAppDomain
} from '@/config/externalLinks';
import supportHeroImage from '@/assets/homepage_hero.png';

export const SupportPageContent = () => {
  const handleKofiClick = () => {
    window.open(getKofiUrl(), '_blank', 'noopener,noreferrer');
  };

  const handleTwitchClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleDiscordClick = () => {
    window.open(getDiscordUrl(), '_blank', 'noopener,noreferrer');
  };

  const handleContactClick = () => {
    window.open(getGitHubIssuesUrl(), '_blank', 'noopener,noreferrer');
  };

  const handleShareClick = (platform: string) => {
    const url = getAppDomain();
    const text = 'Check out TLD Challenges - the ultimate platform for The Long Dark community challenges, tournaments, and custom codes!';
    
    let shareUrl = '';
    switch (platform) {
      case 'twitter':
        shareUrl = getTwitterShareUrl(text, url);
        break;
      case 'reddit':
        shareUrl = getRedditShareUrl(text, url);
        break;
      case 'steam':
        navigator.clipboard.writeText(`${text} ${url}`);
        return;
      default:
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="min-h-screen bg-background-primary">
      {/* Hero Section */}
      <PageHero
        title="Support TLD Challenges"
        description="Help us grow the platform and community for everyone"
        backgroundImage={supportHeroImage}
        contactMessage="Report an Issue"
        contactSubtext="Found a bug or have a feature request? Let us know!"
        buttonText="Report Issue"
        onButtonClick={handleContactClick}
      />

      {/* Breadcrumb Navigation */}
      <Breadcrumb 
        items={[
          { label: 'Home', href: '/' },
          { label: 'Support', current: true }
        ]}
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-16">
          
          {/* Introduction */}
          <section className="text-center space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold font-headline text-primary uppercase">
              Ways to Support Our Community
            </h2>
            <p className="text-lg text-secondary max-w-2xl mx-auto">
              TLD Challenges is a passion project built by the community, for the community. 
              There are many ways you can help us grow and improve the platform for everyone.
            </p>
          </section>

          {/* Primary Support - Ko-fi */}
          <section className="card-base rounded-lg p-8 text-center space-y-6 border-2 border-accent-color bg-gradient-to-r from-accent-color/10 to-accent-color/5">
            <div className="space-y-4">
              <div className="flex items-center justify-center">
                <svg className="w-8 h-8 text-primary-color" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.881 8.948c-.773-4.085-4.859-4.593-4.859-4.593H.723c-.604 0-.679.798-.679.798s-.082 7.324-.033 11.414c.049 4.271 3.468 7.433 7.96 7.433h8.395c4.491 0 7.884-3.138 7.884-7.433C24.25 16.566 23.881 8.948 23.881 8.948zM7.68 8.098c-.184 0-.338.155-.338.343v6.114c0 .188.154.343.338.343h.852c.184 0 .338-.155.338-.343V8.441c0-.188-.154-.343-.338-.343H7.68zm1.542 6.457c0 .188.154.343.338.343h.852c.184 0 .338-.155.338-.343V8.441c0-.188-.154-.343-.338-.343H9.56c-.184 0-.338.155-.338.343v6.114zm1.542-6.457c-.184 0-.338.155-.338.343v6.114c0 .188.154.343.338.343h.852c.184 0 .338-.155.338-.343V8.441c0-.188-.154-.343-.338-.343h-.852zm5.994 4.045c.726-.635 1.185-1.574 1.185-2.625 0-1.932-1.568-3.5-3.5-3.5s-3.5 1.568-3.5 3.5c0 1.051.459 1.99 1.185 2.625.399.348.872.6 1.396.725v1.792c0 .188.154.343.338.343h.852c.184 0 .338-.155.338-.343v-1.792c.524-.125.997-.377 1.396-.725z"/>
                </svg>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-heading-2 font-headline uppercase text-primary">
                  Support Us on Ko-fi
                </h3>
                <p className="text-secondary">
                  Your support directly helps keep TLD Challenges running and enables us to add new features. 
                  Every donation, no matter the size, helps maintain our servers and development efforts.
                </p>
              </div>
            </div>

            <div className="max-w-md mx-auto">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                shadow="xl"
                hoverEffect="both"
                onClick={handleKofiClick}
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.881 8.948c-.773-4.085-4.859-4.593-4.859-4.593H.723c-.604 0-.679.798-.679.798s-.082 7.324-.033 11.414c.049 4.271 3.468 7.433 7.96 7.433h8.395c4.491 0 7.884-3.138 7.884-7.433C24.25 16.566 23.881 8.948 23.881 8.948zM7.68 8.098c-.184 0-.338.155-.338.343v6.114c0 .188.154.343.338.343h.852c.184 0 .338-.155.338-.343V8.441c0-.188-.154-.343-.338-.343H7.68zm1.542 6.457c0 .188.154.343.338.343h.852c.184 0 .338-.155.338-.343V8.441c0-.188-.154-.343-.338-.343H9.56c-.184 0-.338.155-.338.343v6.114zm1.542-6.457c-.184 0-.338.155-.338.343v6.114c0 .188.154.343.338.343h.852c.184 0 .338-.155.338-.343V8.441c0-.188-.154-.343-.338-.343h-.852zm5.994 4.045c.726-.635 1.185-1.574 1.185-2.625 0-1.932-1.568-3.5-3.5-3.5s-3.5 1.568-3.5 3.5c0 1.051.459 1.99 1.185 2.625.399.348.872.6 1.396.725v1.792c0 .188.154.343.338.343h.852c.184 0 .338-.155.338-.343v-1.792c.524-.125.997-.377 1.396-.725z"/>
                </svg>
                Support on Ko-fi
              </Button>
            </div>

            <p className="text-body-secondary">
              <strong className="text-primary">100% Community Supported:</strong> We're entirely funded by the community. 
              Your donations help pay for hosting, development tools, and new features.
            </p>
          </section>

          {/* Support Sections Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* B1gF1s4 Twitch Section */}
            <section className="group card-base rounded-lg p-8 space-y-6 h-full flex flex-col">
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-secondary-color" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
                </svg>
                <h3 className="text-xl sm:text-2xl font-semibold text-primary">Follow B1gF1s4 on Twitch</h3>
              </div>
              
              <p className="text-secondary flex-1">
                Watch the main developer stream The Long Dark and other games. 
                Follow, subscribe, or donate to support the development of TLD Challenges directly.
              </p>
              
              <div className="mt-auto">
                <Button
                  variant="outline"
                  size="lg"
                  fullWidth
                  shadow="md"
                  hoverEffect="both"
                  onClick={() => handleTwitchClick(getBigFishTwitchUrl())}
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
                  </svg>
                  Visit B1gF1s4's Channel
                </Button>
              </div>
            </section>

            {/* ChefMaria Twitch Section */}
            <section className="group card-base rounded-lg p-8 space-y-6 h-full flex flex-col">
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-secondary-color" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
                </svg>
                <h3 className="text-xl sm:text-2xl font-semibold text-primary">Follow ChefMaria on Twitch</h3>
              </div>
              
              <p className="text-secondary flex-1">
                Watch expert The Long Dark gameplay and challenge attempts. 
                ChefMaria creates amazing content and helps test our challenges.
              </p>
              
              <div className="mt-auto">
                <Button
                  variant="outline"
                  size="lg"
                  fullWidth
                  shadow="md"
                  hoverEffect="both"
                  onClick={() => handleTwitchClick(getChefMariaTwitchUrl())}
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
                  </svg>
                  Visit ChefMaria's Channel
                </Button>
              </div>
            </section>

            {/* Content Editors Section */}
            <section className="group card-base rounded-lg p-8 space-y-6 h-full flex flex-col">
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-secondary-color" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                </svg>
                <h3 className="text-xl sm:text-2xl font-semibold text-primary">Help with Content Editing</h3>
              </div>
              
              <p className="text-secondary flex-1">
                We're looking for volunteers to help with content editing, proofreading challenge descriptions, 
                and improving the overall quality of our platform content.
              </p>
              
              <div className="mt-auto">
                <Button
                  variant="outline"
                  size="lg"
                  fullWidth
                  shadow="md"
                  hoverEffect="both"
                  onClick={handleContactClick}
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  Volunteer to Help
                </Button>
              </div>
            </section>

            {/* Discord Community Section */}
            <section className="group card-base rounded-lg p-8 space-y-6 h-full flex flex-col">
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-secondary-color" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                <h3 className="text-xl sm:text-2xl font-semibold text-primary">Join Our Discord</h3>
              </div>
              
              <p className="text-secondary flex-1">
                Connect with fellow survivors, share strategies, get help with challenges, 
                and be part of our growing community discussion.
              </p>
              
              <div className="mt-auto">
                <Button
                  variant="outline"
                  size="lg"
                  fullWidth
                  shadow="md"
                  hoverEffect="both"
                  onClick={handleDiscordClick}
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                  Join Discord Server
                </Button>
              </div>
            </section>
          </div>

          {/* Spread the Word Section */}
          <section className="group card-base rounded-lg p-8 text-center space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-center">
                <svg className="w-8 h-8 text-secondary-color" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92S19.61 16.08 18 16.08z"/>
                </svg>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-bold text-primary font-headline uppercase">
                  Spread the Word
                </h3>
                <p className="text-secondary max-w-2xl mx-auto">
                  Help us grow the TLD Challenges community by sharing the platform with other 
                  The Long Dark players. Word of mouth is our best marketing tool!
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Button
                variant="outline"
                size="lg"
                shadow="md"
                hoverEffect="both"
                onClick={() => handleShareClick('twitter')}
                responsive={{ sm: 'flex-1' }}
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
                Share on Twitter
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                shadow="md"
                hoverEffect="both"
                onClick={() => handleShareClick('reddit')}
                responsive={{ sm: 'flex-1' }}
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
                </svg>
                Share on Reddit
              </Button>
            </div>

            <p className="text-body-secondary">
              Share with your gaming friends, post in The Long Dark communities, 
              or simply tell fellow survivors about your favorite challenges!
            </p>
          </section>

          {/* Additional Info */}
          <section className="text-center space-y-4 py-8">
            <div className="card-surface border border-default rounded-lg p-6">
              <p className="text-sm text-secondary leading-relaxed">
                <strong className="text-primary">Transparency:</strong> TLD Challenges is a passion project maintained by volunteers. 
                All support helps keep the servers running and enables new features. This platform has no profit motive - 
                everything goes back into the community.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};