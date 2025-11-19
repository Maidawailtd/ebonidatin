import { Metadata } from 'next'
import Link from 'next/link'
import { Shield, Heart, Globe, Lock, Users, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us | Eboni Dating',
  description: 'Learn about Eboni Dating - a secure, global platform connecting people for meaningful relationships.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">About Eboni Dating</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A modern, secure platform connecting people worldwide for meaningful relationships, modeling opportunities, and professional networking.
            </p>
          </div>

          {/* Mission Section */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <Heart className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-semibold">Our Mission</h2>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Eboni Dating was created to provide a safe, inclusive, and culturally resonant space for people to connect authentically. We believe in fostering genuine relationships built on trust, respect, and shared values.
            </p>
          </section>

          {/* Core Values */}
          <section className="space-y-6">
            <h2 className="text-3xl font-semibold">Our Core Values</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-4 p-6 bg-muted rounded-lg">
                <Shield className="h-6 w-6 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Safety First</h3>
                  <p className="text-muted-foreground">
                    We implement industry-leading security measures including email verification, encrypted data storage, and proactive moderation to keep our community safe.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-6 bg-muted rounded-lg">
                <Globe className="h-6 w-6 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Global Reach</h3>
                  <p className="text-muted-foreground">
                    Connect with people from over 50 countries worldwide. Our platform supports diverse cultures, languages, and relationship preferences.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-6 bg-muted rounded-lg">
                <Lock className="h-6 w-6 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Privacy Protected</h3>
                  <p className="text-muted-foreground">
                    Your data is yours. We comply with GDPR, CCPA, and international privacy laws. We never sell your personal information.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-6 bg-muted rounded-lg">
                <Users className="h-6 w-6 text-primary shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Inclusive Community</h3>
                  <p className="text-muted-foreground">
                    We celebrate diversity and welcome people of all backgrounds, orientations, and relationship goals in a respectful environment.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* How We Protect You */}
          <section className="space-y-6">
            <h2 className="text-3xl font-semibold">How We Protect You</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold">Email Verification Required</h4>
                  <p className="text-muted-foreground">All users must verify their email address before accessing the platform.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold">Encrypted Communications</h4>
                  <p className="text-muted-foreground">All data is encrypted in transit (TLS 1.3) and at rest (AES-256).</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold">Proactive Moderation</h4>
                  <p className="text-muted-foreground">Our team actively monitors for inappropriate behavior and content violations.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold">Report & Block Features</h4>
                  <p className="text-muted-foreground">Easily report suspicious users or block unwanted contacts at any time.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold">Google OAuth Integration</h4>
                  <p className="text-muted-foreground">Sign in securely with your Google account using industry-standard OAuth 2.0 authentication.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Transparency */}
          <section className="space-y-6">
            <h2 className="text-3xl font-semibold">Transparency & Compliance</h2>
            <p className="text-muted-foreground leading-relaxed">
              We are committed to operating with complete transparency. Our platform complies with:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li>• <strong>GDPR</strong> (General Data Protection Regulation) for EU/EEA users</li>
              <li>• <strong>CCPA</strong> (California Consumer Privacy Act) for California residents</li>
              <li>• <strong>Google OAuth 2.0 Policies</strong> for secure authentication</li>
              <li>• <strong>Google API Services User Data Policy</strong> for data handling</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              We only request the minimum necessary permissions and never access your data beyond what's required to provide our services. For complete details, please review our{' '}
              <Link href="/legal/privacy" className="text-primary hover:underline">Privacy Policy</Link>,{' '}
              <Link href="/legal/terms" className="text-primary hover:underline">Terms of Service</Link>, and{' '}
              <Link href="/legal/cookies" className="text-primary hover:underline">Cookie Policy</Link>.
            </p>
          </section>

          {/* Contact */}
          <section className="space-y-6 p-6 bg-muted rounded-lg">
            <h2 className="text-2xl font-semibold">Get in Touch</h2>
            <p className="text-muted-foreground">
              Have questions or concerns? We're here to help.
            </p>
            <div className="space-y-2">
              <p><strong>General Inquiries:</strong> <a href="mailto:info@ebonidating.com" className="text-primary hover:underline">info@ebonidating.com</a></p>
              <p><strong>Privacy Concerns:</strong> <a href="mailto:info@ebonidating.com" className="text-primary hover:underline">info@ebonidating.com</a></p>
              <p><strong>Legal Matters:</strong> <a href="mailto:info@ebonidating.com" className="text-primary hover:underline">info@ebonidating.com</a></p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
