import { type NextRequest, NextResponse } from "next/server"
import { runDb, getOne } from "@/lib/db"
import { getAuthUser } from "@/lib/middleware-auth"
import { generateId } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { reportedUserId, reason, description } = body

    if (!reportedUserId || !reason) {
      return NextResponse.json({ error: "Missing reportedUserId or reason" }, { status: 400 })
    }

    const existingReport = await getOne(
      'SELECT id FROM reports WHERE reporter_id = ? AND reported_user_id = ? AND status = "pending"',
      [user.userId, reportedUserId],
    )

    if (existingReport) {
      return NextResponse.json({ error: "You already have a pending report for this user" }, { status: 409 })
    }

    const reportId = generateId()
    await runDb("INSERT INTO reports (id, reporter_id, reported_user_id, reason, description) VALUES (?, ?, ?, ?, ?)", [
      reportId,
      user.userId,
      reportedUserId,
      reason,
      description || "",
    ])

    return NextResponse.json({
      success: true,
      reportId,
    })
  } catch (error) {
    console.error("Report user error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
