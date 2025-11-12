import { type NextRequest, NextResponse } from "next/server"
import { getOne, runDb } from "@/lib/db"
import { getAuthUser } from "@/lib/middleware-auth"

export async function POST(request: NextRequest, { params }: { params: Promise<{ reportId: string }> }) {
  try {
    const user = await getAuthUser(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { reportId } = await params
    const body = await request.json()
    const { action, reason } = body

    const isAdmin = await getOne("SELECT id FROM users WHERE id = ? AND account_type = ?", [user.userId, "admin"])

    if (!isAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const report = await getOne("SELECT * FROM reports WHERE id = ?", [reportId])

    if (!report) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 })
    }

    // If action is 'ban', disable user account
    if (action === "ban") {
      await runDb("UPDATE users SET deleted_at = CURRENT_TIMESTAMP WHERE id = ?", [report.reported_user_id])
    }

    // Update report status
    await runDb(
      `UPDATE reports SET status = 'resolved', action_taken = ?, reviewed_by = ?, resolved_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [action, user.userId, reportId],
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Resolve report error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
