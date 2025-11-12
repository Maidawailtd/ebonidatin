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

    const searchParams = request.nextUrl.searchParams
    const status = searchParams.get("status") || "pending"
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = 20
    const offset = (page - 1) * limit

    const requests = await queryDb(
      `SELECT vr.*, u.username, u.email
       FROM verification_requests vr
       JOIN users u ON vr.user_id = u.id
       WHERE vr.status = ?
       ORDER BY vr.created_at ASC
       LIMIT ? OFFSET ?`,
      [status, limit, offset],
    )

    return NextResponse.json({ requests })
  } catch (error) {
    console.error("Get verification requests error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
