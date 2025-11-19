import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | Eboni Dating',
  description: 'Learn how Eboni Dating protects and manages your personal data in compliance with GDPR and CCPA regulations.',
}

export default function PrivacyPolicyPage() {
  const lastUpdated = 'November 18, 2025'
  const effectiveDate = 'November 18, 2025'

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">
            Last Updated: {lastUpdated} | Effective Date: {effectiveDate}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p>
              Welcome to Eboni Dating ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our dating platform and services (the "Service").
            </p>
            <p className="mt-4">
              By using Eboni Dating, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold mb-3 mt-6">2.1 Information You Provide</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Account Information:</strong> Email address, username, password, date of birth</li>
              <li><strong>Profile Information:</strong> Name, gender, sexual orientation, location (country, city), photos, bio, interests, preferences</li>
              <li><strong>Communication Data:</strong> Messages sent through our platform, support inquiries</li>
              <li><strong>Payment Information:</strong> Billing details for subscriptions (processed securely by Stripe)</li>
              <li><strong>Verification Data:</strong> Government-issued ID or selfie photos for identity verification</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">2.2 Automatically Collected Information</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Device Information:</strong> IP address, browser type, operating system, device identifiers</li>
              <li><strong>Usage Data:</strong> Pages viewed, features used, time spent, clicks, swipes</li>
              <li><strong>Location Data:</strong> Approximate location (city/state) based on IP address; precise location if you enable location services</li>
              <li><strong>Cookies & Similar Technologies:</strong> Session cookies, preference cookies, analytics cookies</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">2.3 Third-Party Information</h3>
            <p>
              If you sign in using <strong>Google OAuth</strong>, we receive basic profile information (name, email, profile picture) as permitted by that service. We comply with Google's OAuth 2.0 Policies and only request the minimum necessary scopes. Your Google credentials are never stored on our servers.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
            <p>We use your information for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li><strong>Provide the Service:</strong> Create and manage your account, enable profile browsing, facilitate matches and messaging</li>
              <li><strong>Personalization:</strong> Recommend compatible matches based on your preferences and behavior</li>
              <li><strong>Safety & Security:</strong> Verify user identity, detect and prevent fraud, enforce our Terms of Service</li>
              <li><strong>Communication:</strong> Send service updates, notifications, promotional emails (with your consent)</li>
              <li><strong>Analytics:</strong> Understand usage patterns, improve features, optimize user experience</li>
              <li><strong>Legal Compliance:</strong> Respond to legal requests, protect our rights, comply with regulations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Information Sharing and Disclosure</h2>
            
            <h3 className="text-xl font-semibold mb-3 mt-6">4.1 With Other Users</h3>
            <p>
              Your profile information (photos, bio, interests) is visible to other users for matching purposes. You control what information appears on your profile.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">4.2 Service Providers</h3>
            <p>We share data with trusted third parties who assist us:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Supabase:</strong> Database hosting and authentication (including Google OAuth)</li>
              <li><strong>Stripe:</strong> Payment processing</li>
              <li><strong>SendGrid:</strong> Transactional emails</li>
              <li><strong>Vercel Analytics:</strong> Usage analytics (anonymized)</li>
              <li><strong>Google:</strong> OAuth authentication services (subject to Google's Privacy Policy)</li>
            </ul>
            <p className="mt-4 text-sm text-muted-foreground">
              All service providers are contractually obligated to protect your data and use it only for the purposes we specify.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">4.3 Legal Requirements</h3>
            <p>We may disclose information if required by law, court order, or government request, or to protect our rights and safety.</p>

            <h3 className="text-xl font-semibold mb-3 mt-6">4.4 Business Transfers</h3>
            <p>If we are involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</p>

            <h3 className="text-xl font-semibold mb-3 mt-6">4.5 With Your Consent</h3>
            <p>We will share information with third parties when you explicitly consent to such sharing.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Your Privacy Rights</h2>
            
            <h3 className="text-xl font-semibold mb-3 mt-6">5.1 GDPR Rights (EU/EEA Users)</h3>
            <p>Under the General Data Protection Regulation, you have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Access:</strong> Request a copy of your personal data</li>
              <li><strong>Rectification:</strong> Correct inaccurate or incomplete data</li>
              <li><strong>Erasure:</strong> Request deletion of your data ("right to be forgotten")</li>
              <li><strong>Portability:</strong> Receive your data in a machine-readable format</li>
              <li><strong>Object:</strong> Object to processing based on legitimate interests</li>
              <li><strong>Restrict Processing:</strong> Limit how we use your data</li>
              <li><strong>Withdraw Consent:</strong> Revoke consent for data processing</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">5.2 CCPA Rights (California Residents)</h3>
            <p>Under the California Consumer Privacy Act, you have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li><strong>Know:</strong> What personal information we collect, use, and share</li>
              <li><strong>Delete:</strong> Request deletion of your personal information</li>
              <li><strong>Opt-Out:</strong> Opt out of the sale of personal information (we do not sell your data)</li>
              <li><strong>Non-Discrimination:</strong> Not be discriminated against for exercising your rights</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">5.3 How to Exercise Your Rights</h3>
            <p>
              To exercise any of these rights, contact us at <a href="mailto:privacy@ebonidating.com" className="text-primary hover:underline">privacy@ebonidating.com</a> or use the in-app settings to download or delete your data. We will respond to your request within 30 days.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your information:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Encryption in transit (TLS 1.3) and at rest (AES-256)</li>
              <li>Secure password hashing using bcrypt</li>
              <li>Regular security audits and vulnerability testing</li>
              <li>Limited employee access to personal data</li>
              <li>Multi-factor authentication for admin accounts</li>
            </ul>
            <p className="mt-4">
              However, no method of transmission over the internet is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Data Retention</h2>
            <p>
              We retain your personal information for as long as your account is active or as needed to provide services. If you delete your account, we will delete or anonymize your data within 90 days, except where we are required to retain it for legal compliance (e.g., financial records for 7 years).
            </p>
            <p className="mt-4">
              Anonymized usage data may be retained indefinitely for analytics purposes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Children's Privacy</h2>
            <p>
              Our Service is not intended for users under the age of 18. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately, and we will delete such information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. International Data Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries other than your country of residence. We ensure that such transfers comply with applicable data protection laws and use Standard Contractual Clauses approved by the European Commission where required.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar technologies to enhance your experience. For detailed information about our use of cookies, please see our <Link href="/legal/cookies" className="text-primary hover:underline">Cookie Policy</Link>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">11. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of material changes by posting the new policy on this page and updating the "Last Updated" date. We encourage you to review this policy periodically.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">12. Contact Us</h2>
            <p>If you have questions or concerns about this Privacy Policy, please contact us:</p>
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p><strong>Eboni Dating</strong></p>
              <p>Email: <a href="mailto:privacy@ebonidating.com" className="text-primary hover:underline">privacy@ebonidating.com</a></p>
              <p>Support: <a href="mailto:support@ebonidating.com" className="text-primary hover:underline">support@ebonidating.com</a></p>
              <p>Address: [Your Business Address]</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">13. Supervisory Authority</h2>
            <p>
              If you are located in the EU/EEA and believe we have not addressed your concerns, you have the right to lodge a complaint with your local data protection supervisory authority.
            </p>
          </section>

          <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
            <h3 className="font-semibold mb-2">Your Privacy Matters</h3>
            <p className="text-sm">
              We are committed to transparency and protecting your rights. If you have any questions about how we handle your data, please don't hesitate to reach out to our privacy team.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
