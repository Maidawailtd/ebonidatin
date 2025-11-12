"use client"

import { useState } from "react"
import Link from "next/link"
import { Heart, MessageCircle, Share2, Bookmark, Home, Plus, Compass, Mail, HeartIcon, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export default function HomePage() {
  const [liked, setLiked] = useState<Record<string, boolean>>({})
  const [saved, setSaved] = useState<Record<string, boolean>>({})

  const toggleLike = (postId: string) => {
    setLiked((prev) => ({ ...prev, [postId]: !prev[postId] }))
  }

  const toggleSave = (postId: string) => {
    setSaved((prev) => ({ ...prev, [postId]: !prev[postId] }))
  }

  // Sample stories
  const stories = [
    { id: 1, name: "Your Story", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=user", hasStory: true },
    { id: 2, name: "Sarah", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah", hasStory: true },
    { id: 3, name: "Emma", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma", hasStory: true },
    { id: 4, name: "Jessica", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jessica", hasStory: false },
    { id: 5, name: "Alex", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex", hasStory: true },
  ]

  // Sample feed posts
  const posts = [
    {
      id: "post1",
      author: "Sarah Mitchell",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      image: "/beautiful-woman-portrait.png",
      caption: "Living my best life 🌟",
      likes: 1240,
      comments: 89,
      timestamp: "2 hours ago",
      verified: true,
    },
    {
      id: "post2",
      author: "Emma Rodriguez",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma",
      image: "/modeling-portfolio-professional.jpg",
      caption: "New portfolio shoot 📸 #modeling",
      likes: 856,
      comments: 45,
      timestamp: "4 hours ago",
      verified: true,
    },
    {
      id: "post3",
      author: "Jessica Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jessica",
      image: "/fashion-photoshoot.png",
      caption: "Weekend vibes ✨",
      likes: 2100,
      comments: 156,
      timestamp: "6 hours ago",
      verified: false,
    },
  ]

  return (
    <div className="flex min-h-screen bg-background">
      <nav className="sidebar-nav bg-card fixed left-0 top-0 h-screen w-64 border-r border-border p-4 flex flex-col">
        <div className="mb-8">
          <h1 className="text-2xl font-black">eboni</h1>
        </div>

        <div className="space-y-6 flex-1">
          <Link href="/" className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted transition-colors">
            <Home size={24} />
            <span className="text-lg">Home</span>
          </Link>
          <Link href="/discover" className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted transition-colors">
            <Compass size={24} />
            <span className="text-lg">Discover</span>
          </Link>
          <Link href="/messages" className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted transition-colors">
            <Mail size={24} />
            <span className="text-lg">Messages</span>
          </Link>
          <Link href="/likes" className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted transition-colors">
            <HeartIcon size={24} />
            <span className="text-lg">Likes</span>
          </Link>
          <Link href="/profile" className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted transition-colors">
            <User size={24} />
            <span className="text-lg">Profile</span>
          </Link>
        </div>

        <Link href="/auth/signup">
          <Button className="w-full rounded-full bg-primary text-primary-foreground font-bold py-6 text-base">
            Sign Up
          </Button>
        </Link>
      </nav>

      {/* Main feed - Offset for sidebar */}
      <main className="flex-1 md:ml-64">
        <div className="max-w-2xl mx-auto p-4 pb-24 md:pb-4">
          {/* Stories Section */}
          <div className="stories-container mb-6">
            {stories.map((story) => (
              <div key={story.id} className={`story ${story.hasStory ? "border-accent" : "border-muted"}`}>
                <img src={story.avatar || "/placeholder.svg"} alt={story.name} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>

          {/* Feed Posts */}
          {posts.map((post) => (
            <div key={post.id} className="feed-post">
              {/* Post Header */}
              <div className="post-header">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={post.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{post.author[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm">{post.author}</span>
                      {post.verified && <span className="text-accent text-xs">✓</span>}
                    </div>
                    <span className="text-xs text-muted-foreground">{post.timestamp}</span>
                  </div>
                </div>
                <button className="text-muted-foreground hover:text-foreground">
                  <span className="text-xl">⋮</span>
                </button>
              </div>

              {/* Post Image */}
              <div className="aspect-square overflow-hidden bg-muted">
                <img src={post.image || "/placeholder.svg"} alt={post.caption} className="w-full h-full object-cover" />
              </div>

              {/* Post Actions */}
              <div className="post-actions">
                <button onClick={() => toggleLike(post.id)} className="post-action-btn">
                  {liked[post.id] ? <HeartIcon size={24} className="fill-red-500 text-red-500" /> : <Heart size={24} />}
                </button>
                <button className="post-action-btn">
                  <MessageCircle size={24} />
                </button>
                <button className="post-action-btn">
                  <Share2 size={24} />
                </button>
                <button onClick={() => toggleSave(post.id)} className="post-action-btn ml-auto">
                  {saved[post.id] ? <Bookmark size={24} className="fill-current" /> : <Bookmark size={24} />}
                </button>
              </div>

              {/* Post Caption */}
              <div className="px-4 py-3 border-t border-border">
                <div className="text-sm mb-2">
                  <span className="font-semibold">{post.likes.toLocaleString()} likes</span>
                </div>
                <div className="text-sm">
                  <span className="font-semibold">{post.author}</span> <span>{post.caption}</span>
                </div>
                <button className="text-xs text-muted-foreground mt-2 hover:text-foreground">
                  View all {post.comments} comments
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Bottom Navigation - Mobile Only */}
      <nav className="bottom-nav">
        <Link href="/" className="hover:opacity-60">
          <Home size={24} />
        </Link>
        <Link href="/discover" className="hover:opacity-60">
          <Compass size={24} />
        </Link>
        <Link href="/create" className="hover:opacity-60">
          <Plus size={24} />
        </Link>
        <Link href="/likes" className="hover:opacity-60">
          <HeartIcon size={24} />
        </Link>
        <Link href="/profile" className="hover:opacity-60">
          <User size={24} />
        </Link>
      </nav>
    </div>
  )
}
