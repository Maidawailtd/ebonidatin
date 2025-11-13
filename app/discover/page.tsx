"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, Heart } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function DiscoverPage() {
  const [profiles, setProfiles] = useState<any[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProfiles() {
      try {
        const response = await fetch("/api/discover")
        if (!response.ok) {
          throw new Error("Failed to fetch profiles")
        }
        const data = await response.json()
        setProfiles(data.profiles)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchProfiles()
  }, [])

  const handlePass = () => {
    setCurrentIndex((currentIndex + 1) % profiles.length)
  }

  const handleLike = async () => {
    try {
      const likedUserId = profiles[currentIndex].id
      const response = await fetch("/api/likes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ likedUserId }),
      })

      if (!response.ok) {
        throw new Error("Failed to like profile")
      }

      handlePass() // Move to the next profile after a successful like
    } catch (err: any) {
      setError(err.message)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  const current = profiles[currentIndex]

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
                src={current.primary_photo_url || "/placeholder.svg"}
                alt={current.first_name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

              {/* Profile Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <h2 className="text-2xl font-bold">
                    {current.first_name}, {current.age}
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
                  {current.interests && current.interests.map((interest: string) => (
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
    </div>
  )
}
