import { type NextRequest, NextResponse } from "next/server"
import { queryDb } from "@/lib/db"
import { getAuthUser } from "@/lib/middleware-auth"

// In-memory notifications storage (in production use Redis or database)
const notifications = new Map<string, any[]>()

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const searchParams = request.nextUrl.searchParams
    const unreadOnly = searchParams.get("unreadOnly") === "true"

    // Get unread messages count
    const unreadMessages = await queryDb(
      "SELECT COUNT(*) as count FROM messages WHERE recipient_id = ? AND is_read = FALSE",
      [user.userId],
    )

    // Get new likes count
    const newLikes = await queryDb(
      `SELECT COUNT(*) as count FROM likes l
       WHERE l.liked_user_id = ? 
       AND l.created_at > datetime('now', '-1 day')`,
      [user.userId],
    )

    // Get new matches count
    const newMatches = await queryDb(
      `SELECT COUNT(*) as count FROM matches
       WHERE (user_id_1 = ? OR user_id_2 = ?)
       AND status = 'matched'
       AND matched_at > datetime('now', '-1 day')`,
      [user.userId, user.userId],
    )

    return NextResponse.json({
      unreadMessages: unreadMessages[0]?.count || 0,
      newLikes: newLikes[0]?.count || 0,
      newMatches: newMatches[0]?.count || 0,
    })
  } catch (error) {
    console.error("Get notifications error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
