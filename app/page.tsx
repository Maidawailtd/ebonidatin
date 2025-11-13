
"use client"

import { useState } from "react"
import Link from "next/link"
import { Heart, MessageCircle, Search, Settings, User, Sparkles, MapPin, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"discover" | "matches" | "messages">("discover")

  // Featured profiles for discovery
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
      {/* Sidebar Navigation - Desktop */}
      <nav className="sidebar-nav bg-card fixed left-0 top-0 h-screen w-64 border-r border-border p-6 flex flex-col hidden md:flex">
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
            href="/matches"
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

      {/* Main Content - Offset for sidebar on desktop */}
      <main className="flex-1 md:ml-64">
        <div className="max-w-7xl mx-auto p-4 md:p-8 pb-24 md:pb-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Discover</h2>
              <p className="text-muted-foreground">Find your perfect connection</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="rounded-full">
                <Search size={20} />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <Settings size={20} />
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-pink-500">2.4k+</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-500">856</div>
                <div className="text-sm text-muted-foreground">Online Now</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-500">1.2k</div>
                <div className="text-sm text-muted-foreground">New Today</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-500">94%</div>
                <div className="text-sm text-muted-foreground">Match Rate</div>
              </CardContent>
            </Card>
          </div>

          {/* Featured Profiles Grid */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Featured Profiles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProfiles.map((profile) => (
                <Card key={profile.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                    <img
                      src={profile.image || "/placeholder.svg"}
                      alt={profile.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {profile.online && (
                      <div className="absolute top-3 right-3 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                    {profile.verified && (
                      <div className="absolute top-3 left-3 bg-primary/90 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                        <Sparkles size={12} />
                        Verified
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-white">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-bold text-lg mb-1">
                            {profile.name}, {profile.age}
                          </h4>
                          <p className="text-sm opacity-90 flex items-center gap-1 mb-1">
                            <MapPin size={14} />
                            {profile.location}
                          </p>
                          <p className="text-xs opacity-80">{profile.bio}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex gap-2">
                      <Button className="flex-1 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90">
                        <Heart size={18} className="mr-2" />
                        Like
                      </Button>
                      <Button variant="outline" className="flex-1 rounded-full">
                        <MessageCircle size={18} className="mr-2" />
                        Message
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <Card className="bg-gradient-to-r from-pink-500/10 to-purple-600/10 border-2 border-pink-500/20">
            <CardContent className="p-8 text-center">
              <Camera size={48} className="mx-auto mb-4 text-pink-500" />
              <h3 className="text-2xl font-bold mb-2">Ready to Find Your Match?</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Join thousands of verified members looking for genuine connections. Start your journey today.
              </p>
              <Link href="/auth/signup">
                <Button size="lg" className="rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold px-8">
                  Create Your Profile
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Bottom Navigation - Mobile Only */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 flex items-center justify-around md:hidden z-50">
        <Link href="/" className="flex flex-col items-center gap-1 text-primary">
          <Sparkles size={24} />
          <span className="text-xs font-medium">Discover</span>
        </Link>
        <Link href="/matches" className="flex flex-col items-center gap-1 hover:opacity-60">
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
