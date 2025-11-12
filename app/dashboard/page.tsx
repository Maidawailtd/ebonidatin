"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [stats, setStats] = useState({ unreadMessages: 0, newLikes: 0, newMatches: 0 })
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/auth/login")
      return
    }

    const fetchData = async () => {
      try {
        const [profileRes, notificationsRes] = await Promise.all([
          fetch("/api/profiles/me", { headers: { Authorization: `Bearer ${token}` } }),
          fetch("/api/notifications", { headers: { Authorization: `Bearer ${token}` } }),
        ])

        if (profileRes.ok) {
          const profileData = await profileRes.json()
          setUser(profileData.user)
        }

        if (notificationsRes.ok) {
          const notifyData = await notificationsRes.json()
          setStats(notifyData)
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [router])

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (!user) {
    return null
  }

  return (
    <main className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Button
            variant="outline"
            onClick={() => {
              localStorage.removeItem("token")
              router.push("/")
            }}
          >
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-purple-600">{stats.newLikes}</div>
              <p className="text-sm text-gray-600">New Likes</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-pink-600">{stats.newMatches}</div>
              <p className="text-sm text-gray-600">New Matches</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-blue-600">{stats.unreadMessages}</div>
              <p className="text-sm text-gray-600">Unread Messages</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-lg font-bold">{user.subscription_tier || "Free"}</div>
              <p className="text-sm text-gray-600">Subscription</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="discover" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="discover">Discover</TabsTrigger>
            <TabsTrigger value="matches">Matches</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="discover" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Discover People</CardTitle>
              </CardHeader>
              <CardContent>
                <Link href="/discover">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600">Start Exploring</Button>
                </Link>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="matches" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Your Matches</CardTitle>
              </CardHeader>
              <CardContent>
                <Link href="/matches">
                  <Button className="w-full">View Matches</Button>
                </Link>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <Link href="/messages">
                  <Button className="w-full">View Messages</Button>
                </Link>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>My Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <Link href="/profile/edit">
                  <Button className="w-full">Edit Profile</Button>
                </Link>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
