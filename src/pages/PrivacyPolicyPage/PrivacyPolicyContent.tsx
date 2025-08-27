import { externalLinks } from '@/config/externalLinks';

export const PrivacyPolicyContent = () => {
  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-primary-700 dark:text-primary-300 mb-8">
          Privacy Policy
        </h1>
        
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
            Last updated: August 27, 2025
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Overview</h2>
            <p className="mb-4">
              TLD Challenges is a community-driven platform for The Long Dark players to discover 
              custom game codes, participate in challenges and tournaments, and submit their completion runs. 
              We are committed to protecting your privacy and being transparent about our data practices.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Data We Collect</h2>
            
            <h3 className="text-xl font-medium mb-3">Anonymous Submission Data</h3>
            <p className="mb-4">
              When you submit a challenge completion run, we collect the following information:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Runner Name:</strong> A display name you choose for your submission (required)</li>
              <li><strong>Video URL:</strong> Optional link to YouTube or Twitch video of your run</li>
              <li><strong>Social Media URL:</strong> Optional link to your social media profile</li>
              <li><strong>Completion Notes:</strong> Optional notes about your run or completion time</li>
              <li><strong>Challenge Reference:</strong> Which challenge your submission relates to</li>
              <li><strong>Submission Timestamp:</strong> When your submission was made</li>
            </ul>
            
            <h3 className="text-xl font-medium mb-3">Technical Data</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>IP Address:</strong> Automatically collected for basic security and abuse prevention</li>
              <li><strong>Browser Information:</strong> Basic technical information to ensure compatibility</li>
              <li><strong>Theme Preference:</strong> Your light/dark theme choice (stored locally in your browser)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">What We Don't Collect</h2>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>No User Accounts:</strong> We don't require registration or login</li>
              <li><strong>No Email Addresses:</strong> We don't collect or store email addresses</li>
              <li><strong>No Personal Information:</strong> We don't collect real names, addresses, or phone numbers</li>
              <li><strong>No Tracking Cookies:</strong> We don't use tracking cookies or analytics services</li>
              <li><strong>No Third-Party Tracking:</strong> No Google Analytics, Facebook Pixel, or similar services</li>
              <li><strong>No Device Fingerprinting:</strong> We don't create unique device fingerprints</li>
              <li><strong>No Location Data:</strong> We don't collect or track your geographic location</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="mb-4">
              If you have any questions about this privacy policy or our data practices, you can reach us:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>GitHub Issues:</strong> <a href={externalLinks.support.githubIssues.url} className="text-primary-600 dark:text-primary-400 hover:underline" target="_blank" rel="noopener noreferrer">{externalLinks.support.githubIssues.label}</a> - {externalLinks.support.githubIssues.description}</li>
              <li><strong>Discord Community:</strong> <a href={externalLinks.community.discord.url} className="text-primary-600 dark:text-primary-400 hover:underline" target="_blank" rel="noopener noreferrer">{externalLinks.community.discord.label}</a> - {externalLinks.community.discord.description}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Summary</h2>
            <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-lg">
              <p className="mb-4 font-medium">
                TLD Challenges is committed to minimal data collection and maximum privacy:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>We only collect what's necessary for platform functionality</li>
                <li>All submissions are anonymous with no user accounts required</li>
                <li>We don't track, analyze, or monetize user behavior</li>
                <li>No third-party tracking or analytics services</li>
                <li>Data is used solely to display community challenge submissions</li>
                <li>Built by and for The Long Dark community with respect for player privacy</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};
