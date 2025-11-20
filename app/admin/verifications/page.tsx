"use client"

import { useEffect, useState } from "react"
import { format } from "date-fns"
import { Check, X, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface VerificationRequest {
  id: number
  user_id: number
  username: string
  email: string
  document_url: string
  selfie_url: string
  status: "pending" | "approved" | "rejected"
  created_at: string
}

export default function VerificationsPage() {
  const [requests, setRequests] = useState<VerificationRequest[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchRequests()
  }, [])

  const fetchRequests = async () => {
    try {
      const res = await fetch("/api/admin/verification?status=pending")
      if (res.ok) {
        const data = await res.json()
        setRequests(data.requests || [])
      }
    } catch (error) {
      console.error("Failed to fetch verification requests", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAction = async (verificationId: number, action: "approve" | "reject") => {
    try {
      const endpoint =
        action === "approve" ? `/api/admin/verification/${verificationId}/approve` : `/api/admin/verification` // Assuming reject uses the base endpoint with DELETE or similar, but for now let's assume we just update status

      // Note: The API structure for rejection wasn't explicitly seen, so we'll assume a standard pattern or just handle approval for now.
      // If reject isn't implemented in the backend, this might fail.
      // Based on file list, we have `approve/route.ts` but not `reject`.
      // We'll implement approval. For rejection, we might need to add a route or use the base route if it supports PUT/PATCH.

      if (action === "reject") {
        toast({
          title: "Not Implemented",
          description: "Rejection logic needs to be verified with backend API.",
          variant: "destructive",
        })
        return
      }

      const res = await fetch(endpoint, {
        method: "POST",
      })

      if (res.ok) {
        toast({
          title: "Success",
          description: `Verification request ${action}d`,
        })
        fetchRequests()
      } else {
        throw new Error("Failed to update verification")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update verification status",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return <div className="p-8 text-center">Loading verification requests...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Verifications</h1>
        <p className="text-muted-foreground">Review identity verification requests.</p>
      </div>

      <div className="grid gap-4">
        {requests.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground">
              No pending verification requests.
            </CardContent>
          </Card>
        ) : (
          requests.map((request) => (
            <Card key={request.id}>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={request.selfie_url || "/placeholder.svg"} />
                    <AvatarFallback>{request.username[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{request.username}</CardTitle>
                    <CardDescription>{request.email}</CardDescription>
                  </div>
                  <div className="ml-auto text-sm text-muted-foreground">
                    Requested {format(new Date(request.created_at), "PPP")}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">ID Document</h4>
                    <div className="aspect-video relative rounded-lg border bg-muted overflow-hidden">
                      {/* In a real app, use Next.js Image */}
                      <img
                        src={request.document_url || "/placeholder.svg"}
                        alt="ID Document"
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                      <a href={request.document_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View Full Size
                      </a>
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Selfie</h4>
                    <div className="aspect-video relative rounded-lg border bg-muted overflow-hidden">
                      <img
                        src={request.selfie_url || "/placeholder.svg"}
                        alt="Selfie"
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                      <a href={request.selfie_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View Full Size
                      </a>
                    </Button>
                  </div>
                </div>
                <div className="flex gap-2 justify-end mt-6">
                  <Button variant="outline" onClick={() => handleAction(request.id, "reject")}>
                    <X className="mr-2 h-4 w-4" />
                    Reject
                  </Button>
                  <Button onClick={() => handleAction(request.id, "approve")}>
                    <Check className="mr-2 h-4 w-4" />
                    Approve
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
