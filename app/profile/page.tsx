"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { ChevronLeft, Settings, Share2, MoreHorizontal } from "lucide-react"

export default function ProfilePage() {
  const profile = {
    name: "You",
    username: "@yourname",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user",
    bio: "Model | Photographer | Living my best life 🌟",
    followers: "2,458",
    following: "892",
    posts: "127",
    verified: true,
    photos: [
      "/woman-portrait-1.png",
      "/woman-portrait-2.png",
      "/woman-portrait-3.png",
      "/woman-portrait-4.png",
      "/woman-portrait-5.png",
      "/woman-portrait-6.png",
    ],
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border sticky top-0 bg-card z-10">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ChevronLeft size={24} />
            </Button>
          </Link>
          <h1 className="text-lg font-bold">{profile.username}</h1>
          <Button variant="ghost" size="icon">
            <Settings size={24} />
          </Button>
        </div>
      </div>

      {/* Profile Info */}
      <div className="max-w-2xl mx-auto p-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={profile.avatar || "/placeholder.svg"} />
              <AvatarFallback>{profile.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-2xl font-bold">{profile.name}</h1>
                {profile.verified && <span className="text-blue-500">✓</span>}
              </div>
              <p className="text-sm text-muted-foreground mb-3">{profile.username}</p>

              {/* Stats */}
              <div className="flex gap-8 mb-3">
                <div className="text-center">
                  <p className="font-bold text-lg">{profile.posts}</p>
                  <p className="text-xs text-muted-foreground">Posts</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-lg">{profile.followers}</p>
                  <p className="text-xs text-muted-foreground">Followers</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-lg">{profile.following}</p>
                  <p className="text-xs text-muted-foreground">Following</p>
                </div>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <MoreHorizontal size={24} />
          </Button>
        </div>

        {/* Bio */}
        <div className="mb-4">
          <p className="text-sm">{profile.bio}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mb-6">
          <Button variant="outline" className="flex-1 rounded-lg bg-transparent">
            Edit Profile
          </Button>
          <Button variant="outline" size="icon">
            <Share2 size={20} />
          </Button>
        </div>

        {/* Posts Grid */}
        <div>
          <div className="text-sm font-semibold mb-4">Posts</div>
          <div className="grid grid-cols-3 gap-1">
            {profile.photos.map((photo, index) => (
              <div
                key={index}
                className="aspect-square bg-muted rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
              >
                <img
                  src={photo || "/placeholder.svg"}
                  alt={`Post ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
