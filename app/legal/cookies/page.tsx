import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cookie Policy | Eboni Dating',
  description: 'Learn about how Eboni Dating uses cookies and similar tracking technologies.',
}

export default function CookiePolicyPage() {
  const lastUpdated = 'November 18, 2025'

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <h1 className="text-4xl font-bold mb-4">Cookie Policy</h1>
          <p className="text-muted-foreground mb-8">Last Updated: {lastUpdated}</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. What Are Cookies?</h2>
            <p>
              Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences, improve functionality, and provide analytics about how the site is used.
            </p>
            <p className="mt-4">
              Similar technologies include web beacons, pixels, and local storage, which serve similar purposes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. How We Use Cookies</h2>
            <p>Eboni Dating uses cookies for the following purposes:</p>

            <h3 className="text-xl font-semibold mb-3 mt-6">2.1 Essential Cookies (Required)</h3>
            <p>These cookies are necessary for the Service to function and cannot be disabled:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Authentication:</strong> Keep you logged in to your account</li>
              <li><strong>Security:</strong> Detect and prevent fraudulent activity</li>
              <li><strong>Session Management:</strong> Maintain your session state</li>
              <li><strong>Load Balancing:</strong> Distribute traffic across our servers</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">2.2 Functional Cookies (Optional)</h3>
            <p>These cookies enhance your experience but are not strictly necessary:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Preferences:</strong> Remember your language and theme settings</li>
              <li><strong>Customization:</strong> Tailor content based on your interests</li>
              <li><strong>Features:</strong> Enable advanced functionality like chat</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">2.3 Analytics Cookies (Optional)</h3>
            <p>These cookies help us understand how users interact with our Service:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Usage Analytics:</strong> Track page views, clicks, and navigation patterns</li>
              <li><strong>Performance:</strong> Identify errors and slow-loading pages</li>
              <li><strong>A/B Testing:</strong> Test new features with subsets of users</li>
              <li><strong>Aggregated Data:</strong> Generate statistical reports (anonymized)</li>
            </ul>
            <p className="mt-2 text-sm text-muted-foreground">
              We use Vercel Analytics for anonymous, privacy-friendly analytics.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">2.4 Advertising Cookies (We Do Not Use These)</h3>
            <p>
              We do not currently use advertising cookies or serve third-party ads. If this changes, we will update this policy and request your consent.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Third-Party Cookies</h2>
            <p>Some third-party services we use may set their own cookies:</p>

            <div className="mt-4 space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-semibold">Supabase (Authentication & Database)</h4>
                <p className="text-sm mt-2">Sets session cookies for authentication</p>
                <p className="text-sm text-muted-foreground">Privacy Policy: <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">supabase.com/privacy</a></p>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-semibold">Stripe (Payment Processing)</h4>
                <p className="text-sm mt-2">Sets cookies for fraud prevention and payment processing</p>
                <p className="text-sm text-muted-foreground">Privacy Policy: <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">stripe.com/privacy</a></p>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-semibold">Vercel Analytics</h4>
                <p className="text-sm mt-2">Privacy-friendly analytics (no personal data collection)</p>
                <p className="text-sm text-muted-foreground">Privacy Policy: <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">vercel.com/legal/privacy-policy</a></p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Managing Your Cookie Preferences</h2>
            
            <h3 className="text-xl font-semibold mb-3 mt-6">4.1 Cookie Settings</h3>
            <p>
              You can manage your cookie preferences at any time by clicking the "Cookie Preferences" button in the footer of our website.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">4.2 Browser Controls</h3>
            <p>Most browsers allow you to control cookies through their settings:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
              <li><strong>Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data</li>
              <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
              <li><strong>Edge:</strong> Settings → Cookies and site permissions → Manage and delete cookies</li>
            </ul>
            <p className="mt-4 text-sm text-muted-foreground">
              Note: Blocking essential cookies will prevent you from using core features of the Service.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">4.3 Do Not Track</h3>
            <p>
              We honor Do Not Track (DNT) browser signals. If DNT is enabled, we will not use optional analytics or tracking cookies.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Cookie Lifespan</h2>
            <p>Cookies are categorized by how long they remain on your device:</p>

            <div className="mt-4 space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-semibold">Session Cookies</h4>
                <p className="text-sm mt-2">Deleted when you close your browser. Used for authentication and temporary preferences.</p>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-semibold">Persistent Cookies</h4>
                <p className="text-sm mt-2">Remain on your device for a set period (typically 30 days to 1 year). Used for remembering login state and long-term preferences.</p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Updates to This Policy</h2>
            <p>
              We may update this Cookie Policy periodically to reflect changes in our practices or for legal, operational, or regulatory reasons. We will notify you of significant changes by updating the "Last Updated" date at the top of this page.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Contact Us</h2>
            <p>If you have questions about our use of cookies, please contact us:</p>
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p><strong>Eboni Dating</strong></p>
              <p>Email: <a href="mailto:privacy@ebonidating.com" className="text-primary hover:underline">privacy@ebonidating.com</a></p>
              <p>Support: <a href="mailto:support@ebonidating.com" className="text-primary hover:underline">support@ebonidating.com</a></p>
            </div>
          </section>

          <div className="mt-12 p-6 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
            <h3 className="font-semibold mb-2">Privacy-First Approach</h3>
            <p className="text-sm">
              We are committed to using cookies responsibly and transparently. We only collect what is necessary to provide you with a great experience while respecting your privacy.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
