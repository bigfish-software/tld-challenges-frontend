import { externalLinks } from '@/config/externalLinks';

export const PrivacyPolicyContent = () => {
  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-8">
          Privacy Policy
        </h1>
        
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <p className="text-lg text-secondary mb-8">
            Last updated: August 27, 2025
          </p>

          <section className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold text-primary mb-4">Overview</h2>
            <p className="mb-4 text-secondary">
              TLD Challenges is a community-driven platform for The Long Dark players to discover 
              custom game codes, participate in challenges and tournaments, and submit their completion runs. 
              We are committed to protecting your privacy and being transparent about our data practices.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-semibold text-primary mb-4">Data We Collect</h2>
            
            <h3 className="text-xl sm:text-2xl font-medium text-primary mb-3">Anonymous Submission Data</h3>
            <p className="mb-4 text-secondary">
              When you submit a challenge completion run, we collect the following information:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-secondary">
              <li><strong className="text-primary">Runner Name:</strong> A display name you choose for your submission (required)</li>
              <li><strong className="text-primary">Video URL:</strong> Optional link to YouTube or Twitch video of your run</li>
              <li><strong className="text-primary">Social Media URL:</strong> Optional link to your social media profile</li>
              <li><strong className="text-primary">Completion Notes:</strong> Optional notes about your run or completion time</li>
              <li><strong className="text-primary">Challenge Reference:</strong> Which challenge your submission relates to</li>
              <li><strong className="text-primary">Submission Timestamp:</strong> When your submission was made</li>
            </ul>
            
            <h3 className="text-xl sm:text-2xl font-medium text-primary mb-3">Technical Data</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-secondary">
              <li><strong className="text-primary">IP Address:</strong> Automatically collected for basic security and abuse prevention</li>
              <li><strong className="text-primary">Browser Information:</strong> Basic technical information to ensure compatibility</li>
              <li><strong className="text-primary">Theme Preference:</strong> Your light/dark theme choice (stored locally in your browser)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">What We Don't Collect</h2>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-secondary">
              <li><strong className="text-primary">No User Accounts:</strong> We don't require registration or login</li>
              <li><strong className="text-primary">No Email Addresses:</strong> We don't collect or store email addresses</li>
              <li><strong className="text-primary">No Personal Information:</strong> We don't collect real names, addresses, or phone numbers</li>
              <li><strong className="text-primary">No Tracking Cookies:</strong> We don't use tracking cookies or analytics services</li>
              <li><strong className="text-primary">No Third-Party Tracking:</strong> No Google Analytics, Facebook Pixel, or similar services</li>
              <li><strong className="text-primary">No Device Fingerprinting:</strong> We don't create unique device fingerprints</li>
              <li><strong className="text-primary">No Location Data:</strong> We don't collect or track your geographic location</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">How We Use Your Data</h2>
            <p className="mb-4 text-secondary">
              The data we collect is used solely for platform functionality:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-secondary">
              <li><strong className="text-primary">Display Submissions:</strong> Show your run submissions on challenge pages</li>
              <li><strong className="text-primary">Community Features:</strong> Enable community browsing of challenge completions</li>
              <li><strong className="text-primary">Platform Security:</strong> Prevent spam and abuse of the submission system</li>
              <li><strong className="text-primary">Technical Operation:</strong> Ensure the platform works correctly across different browsers</li>
            </ul>
            
            <p className="mb-4 text-secondary">
              <strong className="text-primary">We do not:</strong>
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-secondary">
              <li>Sell or share your data with third parties</li>
              <li>Use your data for advertising or marketing</li>
              <li>Create user profiles or track behavior across sessions</li>
              <li>Use your data for any commercial purposes</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">Data Storage and Security</h2>
            
            <h3 className="text-xl sm:text-2xl font-medium text-primary mb-3">Where Your Data is Stored</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-secondary">
              <li><strong className="text-primary">Database:</strong> Submission data is stored in a secure PostgreSQL database</li>
              <li><strong className="text-primary">Local Storage:</strong> Theme preferences are stored locally in your browser</li>
              <li><strong className="text-primary">No Cloud Tracking:</strong> We don't use cloud analytics or tracking services</li>
            </ul>

            <h3 className="text-xl sm:text-2xl font-medium text-primary mb-3">Security Measures</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-secondary">
              <li>All data transmission is encrypted using HTTPS</li>
              <li>Database access is restricted and secured</li>
              <li>Regular security updates and monitoring</li>
              <li>Input validation and sanitization to prevent abuse</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">Data Retention</h2>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-secondary">
              <li><strong className="text-primary">Submission Data:</strong> Stored indefinitely to maintain challenge completion records</li>
              <li><strong className="text-primary">Technical Logs:</strong> Basic server logs are retained for 30 days for security purposes</li>
              <li><strong className="text-primary">Theme Preferences:</strong> Stored locally in your browser until you clear your browser data</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">External Links</h2>
            <p className="mb-4 text-secondary">
              Our platform may contain links to external websites (YouTube, Twitch, GitHub, etc.). 
              We are not responsible for the privacy practices of these external sites. We encourage 
              you to review their privacy policies when visiting these platforms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">Your Rights</h2>
            
            <h3 className="text-xl sm:text-2xl font-medium text-primary mb-3">Anonymous Submissions</h3>
            <p className="mb-4 text-secondary">
              Since submissions are anonymous and we don't collect personal identifiers, we cannot 
              automatically link submissions to specific individuals. However, you have the following rights:
            </p>
            
            <h3 className="text-xl sm:text-2xl font-medium text-primary mb-3">Data Removal</h3>
            <p className="mb-4 text-secondary">
              If you want a specific submission removed, you can contact us with details about the 
              submission (runner name, challenge, approximate submission date) and we will remove it 
              from our platform.
            </p>
            
            <h3 className="text-xl sm:text-2xl font-medium text-primary mb-3">Data Portability</h3>
            <p className="mb-4 text-secondary">
              You can request a copy of submissions you've made by providing identifying information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">International Users</h2>
            <p className="mb-4 text-secondary">
              TLD Challenges is available globally. If you are located in the European Union or other 
              regions with specific data protection laws, the same privacy protections described in 
              this policy apply to you. Since we collect minimal data and don't track users, our 
              practices are designed to be compliant with international privacy standards.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">Children's Privacy</h2>
            <p className="mb-4 text-secondary">
              TLD Challenges does not knowingly collect personal information from children under 13. 
              Since we don't collect personal information and submissions are anonymous, we believe 
              our platform is appropriate for The Long Dark players of all ages who have permission 
              to submit content online.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">Changes to This Policy</h2>
            <p className="mb-4 text-secondary">
              We may update this privacy policy from time to time. Any changes will be posted on this 
              page with an updated "Last updated" date. Continued use of the platform after changes 
              indicates acceptance of the updated policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">Contact Us</h2>
            <p className="mb-4 text-secondary">
              If you have any questions about this privacy policy or our data practices, you can reach us:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2 text-secondary">
              <li><strong className="text-primary">GitHub Issues:</strong> <a href={externalLinks.support.githubIssues.url} className="text-primary-color nav-link" target="_blank" rel="noopener noreferrer">{externalLinks.support.githubIssues.label}</a> - {externalLinks.support.githubIssues.description}</li>
              <li><strong className="text-primary">Discord Community:</strong> <a href={externalLinks.community.discord.url} className="text-primary-color nav-link" target="_blank" rel="noopener noreferrer">{externalLinks.community.discord.label}</a> - {externalLinks.community.discord.description}</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-primary mb-4">Summary</h2>
            <div className="bg-surface p-6 rounded-lg border border-default">
              <p className="mb-4 font-medium text-primary">
                TLD Challenges is committed to minimal data collection and maximum privacy:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-secondary">
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
