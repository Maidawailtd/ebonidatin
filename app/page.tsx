"use client"

import Link from "next/link"
import { Heart, MessageCircle, Sparkles, Users, Award, Shield, ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function HomePage() {
  const featuredProfiles = [
    {
      id: 1,
      name: "Sarah Mitchell",
      age: 26,
      location: "New York, NY",
      bio: "Model & Creative Director",
      image: "/black-woman-professional-portrait-elegant-minimali.jpg",
      verified: true,
      online: true,
    },
    {
      id: 2,
      name: "Marcus Johnson",
      age: 28,
      location: "Los Angeles, CA",
      bio: "Entrepreneur & Investor",
      image: "/portrait-black-man-smiling.jpg",
      verified: true,
      online: true,
    },
    {
      id: 3,
      name: "Jessica Chen",
      age: 25,
      location: "Miami, FL",
      bio: "Lifestyle Model & Influencer",
      image: "/black-couple-holding-hands-close-up.jpg",
      verified: false,
      online: false,
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-yellow-500/10 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-8 animate-fade-in">
              <Sparkles size={16} className="text-yellow-600" />
              <span>The Premium Dating Experience</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tight leading-tight">
              Find Meaningful <br />
              <span className="text-yellow-600">Connections</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Join an exclusive community of verified singles looking for genuine relationships. 
              Experience dating reimagined with culture, elegance, and authenticity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/auth/signup">
                <Button size="lg" className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-10 py-7 text-lg shadow-lg hover:shadow-xl transition-all">
                  Start Your Journey
                </Button>
              </Link>
              <Link href="/discover">
                <Button size="lg" variant="outline" className="rounded-full font-bold px-10 py-7 text-lg border-2 hover:bg-secondary">
                  Browse Members
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-border bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-black text-primary mb-2">2.4k+</div>
              <div className="text-sm text-muted-foreground font-medium">Active Members</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-primary mb-2">850+</div>
              <div className="text-sm text-muted-foreground font-medium">Online Now</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-primary mb-2">1.2k</div>
              <div className="text-sm text-muted-foreground font-medium">Daily Matches</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-primary mb-2">94%</div>
              <div className="text-sm text-muted-foreground font-medium">Success Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Profiles */}
      <section className="py-24 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Members</h2>
              <p className="text-muted-foreground max-w-xl">
                Discover some of our most popular verified profiles. Connect with people who share your values and interests.
              </p>
            </div>
            <Link href="/discover">
              <Button variant="ghost" className="group font-medium">
                View All Members <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProfiles.map((profile) => (
              <Card key={profile.id} className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 group">
                <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                  <img
                    src={profile.image || "/placeholder.svg"}
                    alt={profile.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder.svg?height=600&width=400";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold text-2xl">{profile.name}, {profile.age}</h3>
                      {profile.verified && (
                        <Shield className="text-yellow-400 fill-yellow-400" size={18} />
                      )}
                    </div>
                    <p className="text-white/90 text-sm mb-4">{profile.location}</p>
                    <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                      <Button size="sm" className="flex-1 bg-white text-black hover:bg-white/90 font-bold">
                        Like
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 border-white text-white hover:bg-white/20 font-bold">
                        Profile
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose Eboni?</h2>
            <p className="text-muted-foreground text-lg">
              We've built a platform that prioritizes safety, authenticity, and meaningful connections over endless swiping.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 border-none shadow-md bg-card hover:-translate-y-1 transition-transform duration-300">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <Shield className="text-primary" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Verified Profiles</h3>
              <p className="text-muted-foreground leading-relaxed">
                Every profile is manually verified to ensure you're connecting with real people. Say goodbye to bots and catfishing.
              </p>
            </Card>
            <Card className="p-8 border-none shadow-md bg-card hover:-translate-y-1 transition-transform duration-300">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <Sparkles className="text-primary" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Smart Matching</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our intelligent algorithm considers your values, interests, and preferences to suggest highly compatible matches.
              </p>
            </Card>
            <Card className="p-8 border-none shadow-md bg-card hover:-translate-y-1 transition-transform duration-300">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                <MessageCircle className="text-primary" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3">Meaningful Conversations</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our platform encourages deep conversations with features designed to help you get to know matches better.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/abstract-pattern.png')] opacity-10 mix-blend-overlay" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-black mb-8">Ready to Find Love?</h2>
          <p className="text-xl text-primary-foreground/90 mb-10 max-w-2xl mx-auto">
            Join thousands of members who have found their perfect match on Eboni. Your story begins here.
          </p>
          <Link href="/auth/signup">
            <Button size="lg" className="rounded-full bg-white text-primary hover:bg-white/90 font-bold px-12 py-8 text-xl shadow-xl">
              Create Free Account
            </Button>
          </Link>
          <p className="mt-6 text-sm opacity-80">No credit card required • Cancel anytime</p>
        </div>
      </section>
    </div>
  )
}
