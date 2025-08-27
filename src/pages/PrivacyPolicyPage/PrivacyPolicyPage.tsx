import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const PrivacyPolicyPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <Header />
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
              <h2 className="text-2xl font-semibold mb-4">How We Use Your Data</h2>
              <p className="mb-4">
                The data we collect is used solely for platform functionality:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Display Submissions:</strong> Show your run submissions on challenge pages</li>
                <li><strong>Community Features:</strong> Enable community browsing of challenge completions</li>
                <li><strong>Platform Security:</strong> Prevent spam and abuse of the submission system</li>
                <li><strong>Technical Operation:</strong> Ensure the platform works correctly across different browsers</li>
              </ul>
              
              <p className="mb-4">
                <strong>We do not:</strong>
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Sell or share your data with third parties</li>
                <li>Use your data for advertising or marketing</li>
                <li>Create user profiles or track behavior across sessions</li>
                <li>Use your data for any commercial purposes</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Data Storage and Security</h2>
              
              <h3 className="text-xl font-medium mb-3">Where Your Data is Stored</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Database:</strong> Submission data is stored in a secure PostgreSQL database</li>
                <li><strong>Local Storage:</strong> Theme preferences are stored locally in your browser</li>
                <li><strong>No Cloud Tracking:</strong> We don't use cloud analytics or tracking services</li>
              </ul>

              <h3 className="text-xl font-medium mb-3">Security Measures</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>All data transmission is encrypted using HTTPS</li>
                <li>Database access is restricted and secured</li>
                <li>Regular security updates and monitoring</li>
                <li>Input validation and sanitization to prevent abuse</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Data Retention</h2>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Submission Data:</strong> Stored indefinitely to maintain challenge completion records</li>
                <li><strong>Technical Logs:</strong> Basic server logs are retained for 30 days for security purposes</li>
                <li><strong>Theme Preferences:</strong> Stored locally in your browser until you clear your browser data</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">External Links</h2>
              <p className="mb-4">
                Our platform may contain links to external websites (YouTube, Twitch, GitHub, etc.). 
                We are not responsible for the privacy practices of these external sites. We encourage 
                you to review their privacy policies when visiting these platforms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
              
              <h3 className="text-xl font-medium mb-3">Anonymous Submissions</h3>
              <p className="mb-4">
                Since submissions are anonymous and we don't collect personal identifiers, we cannot 
                automatically link submissions to specific individuals. However, you have the following rights:
              </p>
              
              <h3 className="text-xl font-medium mb-3">Data Removal</h3>
              <p className="mb-4">
                If you want a specific submission removed, you can contact us with details about the 
                submission (runner name, challenge, approximate submission date) and we will remove it 
                from our platform.
              </p>
              
              <h3 className="text-xl font-medium mb-3">Data Portability</h3>
              <p className="mb-4">
                You can request a copy of submissions you've made by providing identifying information.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">International Users</h2>
              <p className="mb-4">
                TLD Challenges is available globally. If you are located in the European Union or other 
                regions with specific data protection laws, the same privacy protections described in 
                this policy apply to you. Since we collect minimal data and don't track users, our 
                practices are designed to be compliant with international privacy standards.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Children's Privacy</h2>
              <p className="mb-4">
                TLD Challenges does not knowingly collect personal information from children under 13. 
                Since we don't collect personal information and submissions are anonymous, we believe 
                our platform is appropriate for The Long Dark players of all ages who have permission 
                to submit content online.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
              <p className="mb-4">
                We may update this privacy policy from time to time. Any changes will be posted on this 
                page with an updated "Last updated" date. Continued use of the platform after changes 
                indicates acceptance of the updated policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <p className="mb-4">
                If you have any questions about this privacy policy or our data practices, you can reach us:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>GitHub:</strong> <a href="https://github.com/bigfish-software/tld-challenges-frontend/issues" className="text-primary-600 dark:text-primary-400 hover:underline" target="_blank" rel="noopener noreferrer">Open an issue on GitHub</a></li>
                <li><strong>Community:</strong> Through our Discord server (link in footer)</li>
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
      <Footer />
    </div>
  );
};
