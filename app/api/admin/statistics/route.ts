import { type NextRequest, NextResponse } from "next/server"
import { queryDb, getOne } from "@/lib/db"
import { getAuthUser } from "@/lib/middleware-auth"

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const isAdmin = await getOne("SELECT id FROM users WHERE id = ? AND account_type = ?", [user.userId, "admin"])

    if (!isAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const stats = await Promise.all([
      queryDb("SELECT COUNT(*) as count FROM users WHERE deleted_at IS NULL"),
      queryDb('SELECT COUNT(*) as count FROM users WHERE account_type = "model"'),
      queryDb('SELECT COUNT(*) as count FROM matches WHERE status = "matched"'),
      queryDb('SELECT COUNT(*) as count FROM reports WHERE status = "pending"'),
      queryDb('SELECT COUNT(*) as count FROM subscriptions WHERE status = "active"'),
    ])

    return NextResponse.json({
      totalUsers: stats[0][0]?.count || 0,
      totalModels: stats[1][0]?.count || 0,
      totalMatches: stats[2][0]?.count || 0,
      pendingReports: stats[3][0]?.count || 0,
      activeSubscriptions: stats[4][0]?.count || 0,
    })
  } catch (error) {
    console.error("Get statistics error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
