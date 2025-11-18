
"use client"

import { useState } from "react"
import Link from "next/link"
import { Heart, MessageCircle, Search, Settings, User, Sparkles, MapPin, Camera, TrendingUp, Users, Award, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const featuredProfiles = [
    {
      id: 1,
      name: "Sarah Mitchell",
      age: 26,
      location: "New York, NY",
      bio: "Model & Creative Director",
      image: "/beautiful-woman-portrait.png",
      verified: true,
      online: true,
    },
    {
      id: 2,
      name: "Emma Rodriguez",
      age: 24,
      location: "Los Angeles, CA",
      bio: "Fashion Model & Photographer",
      image: "/modeling-portfolio-professional.jpg",
      verified: true,
      online: true,
    },
    {
      id: 3,
      name: "Jessica Chen",
      age: 25,
      location: "Miami, FL",
      bio: "Lifestyle Model & Influencer",
      image: "/fashion-photoshoot.png",
      verified: false,
      online: false,
    },
    {
      id: 4,
      name: "Ashley Williams",
      age: 27,
      location: "Chicago, IL",
      bio: "Professional Model",
      image: "/woman-portrait-1.png",
      verified: true,
      online: true,
    },
    {
      id: 5,
      name: "Maya Johnson",
      age: 23,
      location: "Atlanta, GA",
      bio: "Model & Content Creator",
      image: "/woman-portrait-2.png",
      verified: true,
      online: false,
    },
    {
      id: 6,
      name: "Zara Thompson",
      age: 28,
      location: "Houston, TX",
      bio: "Editorial Model",
      image: "/woman-portrait-3.png",
      verified: false,
      online: true,
    },
  ]

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile Header with Menu Button */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-card border-b border-border p-4 flex items-center justify-between z-50">
        <Link href="/" className="flex items-center gap-2">
          <h1 className="text-2xl font-black bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            eboni
          </h1>
        </Link>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg hover:bg-muted transition-colors"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Slide-out Menu */}
      <div
        className={`md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />
      <nav
        aria-label="Mobile navigation"
        className={`md:hidden fixed top-0 left-0 h-full w-64 bg-card border-r border-border p-6 flex flex-col z-50 transition-transform duration-300 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-10">
          <h1 className="text-3xl font-black bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            eboni
          </h1>
          <p className="text-xs text-muted-foreground mt-1">Find your perfect match</p>
        </div>

        <div className="space-y-2 flex-1">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary font-medium transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Sparkles size={22} />
            <span>Discover</span>
          </Link>
          <Link
            href="/discover"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Heart size={22} />
            <span>Matches</span>
          </Link>
          <Link
            href="/messages"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            <MessageCircle size={22} />
            <span>Messages</span>
          </Link>
          <Link
            href="/profile"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            <User size={22} />
            <span>Profile</span>
          </Link>
        </div>

        <div className="space-y-3">
          <Link href="/auth/signup" onClick={() => setMobileMenuOpen(false)}>
            <Button className="w-full rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-6 text-base hover:opacity-90 transition-opacity">
              Get Started
            </Button>
          </Link>
          <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
            <Button variant="outline" className="w-full rounded-full font-medium py-6 text-base">
              Sign In
            </Button>
          </Link>
        </div>
      </nav>

      {/* Sidebar Navigation - Desktop */}
      <nav aria-label="Main navigation" className="sidebar-nav bg-card fixed left-0 top-0 h-screen w-64 border-r border-border p-6 flex flex-col hidden md:flex z-50">
        <div className="mb-10">
          <h1 className="text-3xl font-black bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
            eboni
          </h1>
          <p className="text-xs text-muted-foreground mt-1">Find your perfect match</p>
        </div>

        <div className="space-y-2 flex-1">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary font-medium transition-colors"
          >
            <Sparkles size={22} />
            <span>Discover</span>
          </Link>
          <Link
            href="/discover"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted transition-colors"
          >
            <Heart size={22} />
            <span>Matches</span>
          </Link>
          <Link
            href="/messages"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted transition-colors"
          >
            <MessageCircle size={22} />
            <span>Messages</span>
          </Link>
          <Link
            href="/profile"
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted transition-colors"
          >
            <User size={22} />
            <span>Profile</span>
          </Link>
        </div>

        <div className="space-y-3">
          <Link href="/auth/signup">
            <Button className="w-full rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-6 text-base hover:opacity-90 transition-opacity">
              Get Started
            </Button>
          </Link>
          <Link href="/auth/login">
            <Button variant="outline" className="w-full rounded-full font-medium py-6 text-base">
              Sign In
            </Button>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 pt-16 md:pt-0">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-blue-500/10 border-b border-border">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-black mb-6 bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600 bg-clip-text text-transparent">
                Find Your Perfect Match
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Connect with verified members looking for genuine connections. Join thousands finding love every day.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth/signup">
                  <Button size="lg" className="rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold px-8 py-6 text-lg hover:opacity-90 transition-opacity">
                    Create Free Account
                  </Button>
                </Link>
                <Link href="/discover">
                  <Button size="lg" variant="outline" className="rounded-full font-bold px-8 py-6 text-lg">
                    Browse Profiles
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto p-4 md:p-8 pb-32 md:pb-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-2">
                  <Users className="text-pink-500" size={32} />
                </div>
                <div className="text-3xl font-bold text-pink-500 mb-1">2.4k+</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </CardContent>
            </Card>
            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-2">
                  <Sparkles className="text-purple-500" size={32} />
                </div>
                <div className="text-3xl font-bold text-purple-500 mb-1">856</div>
                <div className="text-sm text-muted-foreground">Online Now</div>
              </CardContent>
            </Card>
            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-2">
                  <TrendingUp className="text-blue-500" size={32} />
                </div>
                <div className="text-3xl font-bold text-blue-500 mb-1">1.2k</div>
                <div className="text-sm text-muted-foreground">New Today</div>
              </CardContent>
            </Card>
            <Card className="border-2 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-2">
                  <Award className="text-green-500" size={32} />
                </div>
                <div className="text-3xl font-bold text-green-500 mb-1">94%</div>
                <div className="text-sm text-muted-foreground">Match Rate</div>
              </CardContent>
            </Card>
          </div>

          {/* Featured Profiles Grid */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold">Featured Profiles</h2>
              <Link href="/discover">
                <Button variant="outline" className="rounded-full">
                  View All
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProfiles.map((profile) => (
                <Card key={profile.id} className="overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group border-2">
                  <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                    <img
                      src={profile.image || "/placeholder.svg"}
                      alt={profile.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder.svg";
                      }}
                    />
                    {profile.online && (
                      <div className="absolute top-4 right-4 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>
                    )}
                    {profile.verified && (
                      <div className="absolute top-4 left-4 bg-primary/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                        <Sparkles size={14} />
                        Verified
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-5 text-white">
                      <h3 className="font-bold text-xl mb-2">
                        {profile.name}, {profile.age}
                      </h3>
                      <p className="text-sm opacity-90 flex items-center gap-1.5 mb-2">
                        <MapPin size={16} />
                        {profile.location}
                      </p>
                      <p className="text-sm opacity-80">{profile.bio}</p>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      <Button className="flex-1 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90 font-bold">
                        <Heart size={18} className="mr-2" />
                        Like
                      </Button>
                      <Button variant="outline" className="flex-1 rounded-full font-bold border-2">
                        <MessageCircle size={18} className="mr-2" />
                        Chat
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Features Section */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center mb-8">Why Choose Eboni?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="text-center p-8 border-2 hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-pink-500/10 rounded-full flex items-center justify-center">
                    <Sparkles className="text-pink-500" size={32} />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3">Verified Profiles</h3>
                <p className="text-muted-foreground">
                  All members are verified to ensure authenticity and safety in our community.
                </p>
              </Card>
              <Card className="text-center p-8 border-2 hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center">
                    <Heart className="text-purple-500" size={32} />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3">Smart Matching</h3>
                <p className="text-muted-foreground">
                  Our algorithm finds compatible matches based on your preferences and interests.
                </p>
              </Card>
              <Card className="text-center p-8 border-2 hover:shadow-lg transition-shadow">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center">
                    <MessageCircle className="text-blue-500" size={32} />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-3">Instant Messaging</h3>
                <p className="text-muted-foreground">
                  Connect and chat instantly with your matches in real-time conversations.
                </p>
              </Card>
            </div>
          </div>

          {/* CTA Section */}
          <Card className="bg-gradient-to-r from-pink-500/10 to-purple-600/10 border-2 border-pink-500/20 hover:shadow-xl transition-shadow">
            <CardContent className="p-12 text-center">
              <Camera size={64} className="mx-auto mb-6 text-pink-500" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Find Your Match?</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join thousands of verified members looking for genuine connections. Create your profile and start your journey today.
              </p>
              <Link href="/auth/signup">
                <Button size="lg" className="rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold px-12 py-7 text-lg hover:opacity-90 transition-opacity shadow-lg">
                  Create Your Profile Now
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Bottom Navigation - Mobile Only */}
      <nav aria-label="Mobile navigation" className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 flex items-center justify-around md:hidden z-50 shadow-lg">
        <Link href="/" className="flex flex-col items-center gap-1 text-primary">
          <Sparkles size={24} />
          <span className="text-xs font-medium">Discover</span>
        </Link>
        <Link href="/discover" className="flex flex-col items-center gap-1 hover:opacity-60">
          <Heart size={24} />
          <span className="text-xs">Matches</span>
        </Link>
        <Link href="/messages" className="flex flex-col items-center gap-1 hover:opacity-60">
          <MessageCircle size={24} />
          <span className="text-xs">Messages</span>
        </Link>
        <Link href="/profile" className="flex flex-col items-center gap-1 hover:opacity-60">
          <User size={24} />
          <span className="text-xs">Profile</span>
        </Link>
      </nav>
    </div>
  )
}
