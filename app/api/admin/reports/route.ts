import { type NextRequest, NextResponse } from "next/server"
import { queryDb, getOne } from "@/lib/db"
import { getAuthUser } from "@/lib/middleware-auth"

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Check if user is admin (you'd typically store this differently)
    const isAdmin = await getOne("SELECT id FROM users WHERE id = ? AND account_type = ?", [user.userId, "admin"])

    if (!isAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get("status") || "pending"
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = 20
    const offset = (page - 1) * limit

    const reports = await queryDb(
      `SELECT r.*, 
        reporter.username as reporter_username,
        reported.username as reported_username,
        reported.email as reported_email
       FROM reports r
       JOIN users reporter ON r.reporter_id = reporter.id
       JOIN users reported ON r.reported_user_id = reported.id
       WHERE r.status = ?
       ORDER BY r.created_at DESC
       LIMIT ? OFFSET ?`,
      [status, limit, offset],
    )

    return NextResponse.json({ reports })
  } catch (error) {
    console.error("Get reports error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
