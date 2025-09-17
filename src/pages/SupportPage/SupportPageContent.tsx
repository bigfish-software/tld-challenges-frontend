import { Button } from '@/components/ui/Button';
import { PageHero } from '@/components/ui/PageHero';
import { Breadcrumb } from '@/components/ui/Breadcrumb';
import { 
  getBigFishTwitchUrl, 
  getChefMariaTwitchUrl, 
  getDiscordUrl,
  getGitHubIssuesUrl,
  getTwitterShareUrl,
  getRedditShareUrl,
  getAppDomain
} from '@/config/externalLinks';
import supportHeroImage from '@/assets/homepage_hero.png'; // Using same hero image for consistency

export const SupportPageContent = () => {
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
        // Steam doesn't have a direct share URL, so we'll copy to clipboard
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
        description="Help us grow the platform and community for all survivors"
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
        <div className="max-w-4xl mx-auto space-y-16">
          
          {/* Introduction */}
          <section className="text-center space-y-6">
            <h2 className="text-3xl font-bold font-headline text-primary uppercase">
              Ways to Support Our Community
            </h2>
            <p className="text-lg text-secondary max-w-2xl mx-auto">
              TLD Challenges is a passion project built by the community, for the community. 
              There are many ways you can help us grow and improve the platform for everyone.
            </p>
          </section>

          {/* Support Sections Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* B1gF1s4 Twitch Section */}
            <section className="card-surface border border-default rounded-lg p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary-color" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-primary">Follow B1gF1s4 on Twitch</h3>
              </div>
              
              <p className="text-secondary">
                Watch the main developer stream The Long Dark and other games. 
                Follow, subscribe, or donate to support the development of TLD Challenges directly.
              </p>
              
              <Button
                variant="primary"
                size="lg"
                onClick={() => handleTwitchClick(getBigFishTwitchUrl())}
                className="w-full"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
                </svg>
                Visit B1gF1s4's Channel
              </Button>
            </section>

            {/* ChefMaria Twitch Section */}
            <section className="card-surface border border-default rounded-lg p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-accent-light rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-accent-color" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-primary">Follow ChefMaria on Twitch</h3>
              </div>
              
              <p className="text-secondary">
                Watch expert The Long Dark gameplay and challenge attempts. 
                ChefMaria creates amazing content and helps test our challenges.
              </p>
              
              <Button
                variant="secondary"
                size="lg"
                onClick={() => handleTwitchClick(getChefMariaTwitchUrl())}
                className="w-full"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
                </svg>
                Visit ChefMaria's Channel
              </Button>
            </section>

            {/* Content Editors Section */}
            <section className="card-surface border border-default rounded-lg p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-secondary-light rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-secondary-color" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-primary">Help with Content Editing</h3>
              </div>
              
              <p className="text-secondary">
                We're looking for volunteers to help with content editing, proofreading challenge descriptions, 
                and improving the overall quality of our platform content.
              </p>
              
              <Button
                variant="outline"
                size="lg"
                onClick={handleContactClick}
                className="w-full"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                Volunteer to Help
              </Button>
            </section>

            {/* Discord Community Section */}
            <section className="card-surface border border-default rounded-lg p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-accent-light rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-accent-color" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-primary">Join Our Discord</h3>
              </div>
              
              <p className="text-secondary">
                Connect with fellow survivors, share strategies, get help with challenges, 
                and be part of our growing community discussion.
              </p>
              
              <Button
                variant="primary"
                size="lg"
                onClick={handleDiscordClick}
                className="w-full"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                Join Discord Server
              </Button>
            </section>
          </div>

          {/* Spread the Word Section */}
          <section className="card-surface border border-default rounded-lg p-8 text-center space-y-6">
            <div className="space-y-4">
              <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8 text-primary-color" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92S19.61 16.08 18 16.08z"/>
                </svg>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-primary font-headline uppercase">
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
                onClick={() => handleShareClick('twitter')}
                className="flex-1"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
                Share on Twitter
              </Button>
              
              <Button
                variant="outline"
                onClick={() => handleShareClick('reddit')}
                className="flex-1"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
                </svg>
                Share on Reddit
              </Button>
            </div>

            <p className="text-xs text-secondary">
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