"use client"

import { useState } from "react"
import { ChevronLeft, Heart } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function DiscoverPage() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [liked, setLiked] = useState<Set<number>>(new Set())

  const profiles = [
    {
      id: 1,
      name: "Sarah Mitchell",
      age: 24,
      image: "/beautiful-woman-portrait-model.jpg",
      bio: "Model | Photographer | Coffee lover",
      location: "Los Angeles, CA",
      verified: true,
      interests: ["Photography", "Travel", "Fashion"],
    },
    {
      id: 2,
      name: "Emma Rodriguez",
      age: 23,
      image: "/professional-model-photoshoot.jpg",
      bio: "Aspiring model | Fitness enthusiast",
      location: "New York, NY",
      verified: true,
      interests: ["Fitness", "Fashion", "Art"],
    },
    {
      id: 3,
      name: "Jessica Chen",
      age: 25,
      image: "/female-model-professional.jpg",
      bio: "Content creator | Model",
      location: "Miami, FL",
      verified: false,
      interests: ["Social Media", "Travel", "Design"],
    },
  ]

  const current = profiles[currentIndex]

  const handlePass = () => {
    setCurrentIndex((currentIndex + 1) % profiles.length)
  }

  const handleLike = () => {
    setLiked(new Set([...liked, current.id]))
    handlePass()
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      {/* Header */}
      <div className="w-full max-w-md mb-6 flex items-center gap-4">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <ChevronLeft size={24} />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Discover</h1>
      </div>

      {/* Discovery Card */}
      <div className="w-full max-w-md">
        {current && (
          <div className="bg-card rounded-2xl overflow-hidden shadow-lg">
            {/* Profile Image */}
            <div className="relative h-96 bg-muted overflow-hidden">
              <img
                src={current.image || "/placeholder.svg"}
                alt={current.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

              {/* Profile Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-2xl font-bold">
                    {current.name}, {current.age}
                  </h2>
                  {current.verified && <span className="text-blue-400">✓</span>}
                </div>
                <p className="text-sm opacity-90">{current.location}</p>
              </div>
            </div>

            {/* Profile Info */}
            <div className="p-4 space-y-4">
              <div>
                <p className="font-semibold mb-1">Bio</p>
                <p className="text-sm text-muted-foreground">{current.bio}</p>
              </div>

              <div>
                <p className="font-semibold mb-2">Interests</p>
                <div className="flex flex-wrap gap-2">
                  {current.interests.map((interest) => (
                    <span key={interest} className="px-3 py-1 bg-muted text-xs rounded-full">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <Button variant="outline" size="lg" className="flex-1 rounded-full bg-transparent" onClick={handlePass}>
                  Pass
                </Button>
                <Button
                  size="lg"
                  className="flex-1 rounded-full bg-accent text-accent-foreground hover:bg-accent/90"
                  onClick={handleLike}
                >
                  <Heart size={20} className="mr-2" />
                  Like
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Liked Count */}
      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">You've liked {liked.size} profiles</p>
      </div>
    </div>
  )
}
