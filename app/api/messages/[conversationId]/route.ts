import { type NextRequest, NextResponse } from "next/server"
import { queryDb, runDb } from "@/lib/db"
import { getAuthUser } from "@/lib/middleware-auth"

export async function GET(request: NextRequest, { params }: { params: Promise<{ conversationId: string }> }) {
  try {
    const user = await getAuthUser(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { conversationId } = await params
    const searchParams = request.nextUrl.searchParams
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = 50
    const offset = (page - 1) * limit

    const messages = await queryDb(
      `SELECT * FROM messages 
       WHERE (sender_id = ? AND recipient_id = ?) OR (sender_id = ? AND recipient_id = ?)
       ORDER BY created_at ASC
       LIMIT ? OFFSET ?`,
      [user.userId, conversationId, conversationId, user.userId, limit, offset],
    )

    // Mark as read
    await runDb(
      "UPDATE messages SET is_read = TRUE, read_at = CURRENT_TIMESTAMP WHERE recipient_id = ? AND sender_id = ? AND is_read = FALSE",
      [user.userId, conversationId],
    )

    return NextResponse.json({ messages })
  } catch (error) {
    console.error("Get messages error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
