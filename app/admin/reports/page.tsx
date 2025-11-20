"use client"

import { useEffect, useState } from "react"
import { format } from "date-fns"
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"

interface Report {
  id: number
  reporter_username: string
  reported_username: string
  reported_email: string
  reason: string
  description: string
  status: "pending" | "resolved" | "dismissed"
  created_at: string
}

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchReports()
  }, [])

  const fetchReports = async () => {
    try {
      const res = await fetch("/api/admin/reports?status=pending")
      if (res.ok) {
        const data = await res.json()
        setReports(data.reports || [])
      }
    } catch (error) {
      console.error("Failed to fetch reports", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAction = async (reportId: number, action: "resolve" | "dismiss") => {
    try {
      const res = await fetch(`/api/admin/reports/${reportId}/resolve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      })

      if (res.ok) {
        toast({
          title: "Success",
          description: `Report ${action}d successfully`,
        })
        fetchReports()
      } else {
        throw new Error("Failed to update report")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update report status",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return <div className="p-8 text-center">Loading reports...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
        <p className="text-muted-foreground">Manage and resolve user reports.</p>
      </div>

      <div className="grid gap-4">
        {reports.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground">No pending reports found.</CardContent>
          </Card>
        ) : (
          reports.map((report) => (
            <Card key={report.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-destructive" />
                      Report against {report.reported_username}
                    </CardTitle>
                    <CardDescription>
                      Reported by {report.reporter_username} on {format(new Date(report.created_at), "PPP")}
                    </CardDescription>
                  </div>
                  <Badge variant="outline">{report.reason}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-md bg-muted p-4">
                    <p className="text-sm">{report.description || "No description provided."}</p>
                  </div>
                  <div className="flex gap-2 justify-end">
                    <Button variant="outline" onClick={() => handleAction(report.id, "dismiss")}>
                      <XCircle className="mr-2 h-4 w-4" />
                      Dismiss
                    </Button>
                    <Button variant="destructive" onClick={() => handleAction(report.id, "resolve")}>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Take Action
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
