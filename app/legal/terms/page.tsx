import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service | Eboni Dating',
  description: 'Read the terms and conditions for using Eboni Dating platform.',
}

export default function TermsOfServicePage() {
  const lastUpdated = 'November 18, 2025'

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">Last Updated: {lastUpdated}</p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p>
              Welcome to Eboni Dating. By creating an account or using our services, you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our platform.
            </p>
            <p className="mt-4">
              These Terms constitute a legally binding agreement between you and Eboni Dating. We reserve the right to update these Terms at any time, and your continued use of the Service constitutes acceptance of any changes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">2. Eligibility</h2>
            <p>To use Eboni Dating, you must:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Be at least 18 years old</li>
              <li>Have the legal capacity to enter into a binding contract</li>
              <li>Not be prohibited from using the Service under applicable laws</li>
              <li>Not have been previously banned from our platform</li>
              <li>Comply with all local laws and regulations regarding online conduct and content</li>
            </ul>
            <p className="mt-4">
              By creating an account, you represent and warrant that you meet all eligibility requirements.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Account Registration and Security</h2>
            
            <h3 className="text-xl font-semibold mb-3 mt-6">3.1 Account Creation</h3>
            <p>
              You must provide accurate, current, and complete information during registration. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">3.2 Account Security</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Choose a strong, unique password</li>
              <li>Never share your password with others</li>
              <li>Notify us immediately if you suspect unauthorized access</li>
              <li>You are solely responsible for activities conducted through your account</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">3.3 One Account Per Person</h3>
            <p>
              You may only create and maintain one account. Creating multiple accounts or impersonating another person is prohibited and may result in account termination.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. User Conduct and Prohibited Activities</h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Harass, abuse, threaten, or intimidate other users</li>
              <li>Post false, misleading, or deceptive information</li>
              <li>Upload inappropriate, offensive, or illegal content</li>
              <li>Solicit money or financial information from other users</li>
              <li>Promote commercial services or spam other users</li>
              <li>Use the Service for any illegal purpose</li>
              <li>Impersonate any person or entity</li>
              <li>Violate any intellectual property rights</li>
              <li>Attempt to hack, reverse engineer, or compromise our systems</li>
              <li>Use automated tools (bots, scrapers) without permission</li>
              <li>Collect user data without consent</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Content Guidelines</h2>
            
            <h3 className="text-xl font-semibold mb-3 mt-6">5.1 Your Content</h3>
            <p>
              You retain ownership of content you post (photos, messages, profile information). By posting content, you grant us a worldwide, non-exclusive, royalty-free license to use, display, and distribute your content solely for operating and improving the Service.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">5.2 Prohibited Content</h3>
            <p>You may not post content that:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Contains nudity or sexually explicit material</li>
              <li>Promotes violence, hatred, or discrimination</li>
              <li>Infringes on intellectual property rights</li>
              <li>Contains private information of others</li>
              <li>Is deceptive, fraudulent, or misleading</li>
              <li>Violates any laws or regulations</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">5.3 Content Moderation</h3>
            <p>
              We reserve the right to review, remove, or refuse any content that violates these Terms or our Community Guidelines, without prior notice.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Subscription and Payments</h2>
            
            <h3 className="text-xl font-semibold mb-3 mt-6">6.1 Free and Paid Services</h3>
            <p>
              Eboni Dating offers both free and premium subscription tiers. Premium features require a paid subscription processed through Stripe.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">6.2 Billing</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Subscriptions automatically renew unless cancelled</li>
              <li>You authorize us to charge your payment method on each renewal</li>
              <li>Prices are subject to change with 30 days' notice</li>
              <li>All fees are non-refundable except as required by law</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6">6.3 Cancellation</h3>
            <p>
              You may cancel your subscription at any time through your account settings. Cancellation takes effect at the end of the current billing period.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">7. Termination</h2>
            
            <h3 className="text-xl font-semibold mb-3 mt-6">7.1 By You</h3>
            <p>
              You may delete your account at any time through your account settings. Deletion is permanent and cannot be undone.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">7.2 By Us</h3>
            <p>
              We may suspend or terminate your account immediately if you violate these Terms, engage in fraudulent activity, or pose a risk to other users. We may also terminate accounts for prolonged inactivity.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">7.3 Effect of Termination</h3>
            <p>
              Upon termination, your right to use the Service ceases immediately. We will delete your data in accordance with our Privacy Policy. Sections of these Terms that should survive termination (including intellectual property, disclaimers, and limitations of liability) will remain in effect.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">8. Intellectual Property</h2>
            <p>
              The Service, including all content, features, and functionality, is owned by Eboni Dating and protected by copyright, trademark, and other intellectual property laws. You may not copy, modify, distribute, or create derivative works without our express written permission.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">9. Disclaimers</h2>
            <p className="uppercase font-semibold">THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND.</p>
            <p className="mt-4">We disclaim all warranties, express or implied, including:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Merchantability, fitness for a particular purpose, non-infringement</li>
              <li>Uninterrupted, error-free, or secure operation</li>
              <li>Accuracy, reliability, or completeness of content</li>
              <li>Results obtained from using the Service</li>
            </ul>
            <p className="mt-4 font-semibold">
              WE DO NOT CONDUCT BACKGROUND CHECKS ON USERS. You are solely responsible for your interactions with other users.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">10. Limitation of Liability</h2>
            <p className="uppercase font-semibold">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, EBONI DATING SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATED TO YOUR USE OF THE SERVICE.
            </p>
            <p className="mt-4">
              Our total liability to you for all claims shall not exceed the amount you paid us in the 12 months preceding the claim, or $100, whichever is greater.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">11. Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless Eboni Dating and its affiliates, officers, directors, employees, and agents from any claims, losses, damages, liabilities, and expenses (including legal fees) arising from:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Your use of the Service</li>
              <li>Your violation of these Terms</li>
              <li>Your violation of any rights of another person</li>
              <li>Content you post or transmit</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">12. Dispute Resolution</h2>
            
            <h3 className="text-xl font-semibold mb-3 mt-6">12.1 Governing Law</h3>
            <p>
              These Terms are governed by the laws of [Your Jurisdiction], without regard to conflict of law principles.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">12.2 Arbitration</h3>
            <p>
              Any disputes arising from these Terms or the Service shall be resolved through binding arbitration, except for disputes that may be brought in small claims court.
            </p>

            <h3 className="text-xl font-semibold mb-3 mt-6">12.3 Class Action Waiver</h3>
            <p>
              You agree to resolve disputes individually and waive any right to participate in class action lawsuits or class-wide arbitration.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">13. General Provisions</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Entire Agreement:</strong> These Terms constitute the entire agreement between you and Eboni Dating</li>
              <li><strong>Severability:</strong> If any provision is found invalid, the remaining provisions remain in effect</li>
              <li><strong>Waiver:</strong> Failure to enforce any right does not waive that right</li>
              <li><strong>Assignment:</strong> You may not assign these Terms; we may assign them to successors</li>
              <li><strong>Force Majeure:</strong> We are not liable for delays or failures due to circumstances beyond our control</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">14. Contact Information</h2>
            <p>For questions about these Terms, please contact us:</p>
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p><strong>Eboni Dating</strong></p>
              <p>Email: <a href="mailto:legal@ebonidating.com" className="text-primary hover:underline">legal@ebonidating.com</a></p>
              <p>Support: <a href="mailto:support@ebonidating.com" className="text-primary hover:underline">support@ebonidating.com</a></p>
            </div>
          </section>

          <div className="mt-12 p-6 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <h3 className="font-semibold mb-2">Important Notice</h3>
            <p className="text-sm">
              By using Eboni Dating, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service and our <Link href="/legal/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
