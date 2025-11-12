import { type NextRequest, NextResponse } from "next/server"
import { queryDb, runDb, getOne } from "@/lib/db"
import { getAuthUser } from "@/lib/middleware-auth"
import { generateId } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const searchParams = request.nextUrl.searchParams
    const conversationWith = searchParams.get("conversationWith")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = 50
    const offset = (page - 1) * limit

    if (conversationWith) {
      const messages = await queryDb(
        `SELECT * FROM messages 
         WHERE (sender_id = ? AND recipient_id = ?) OR (sender_id = ? AND recipient_id = ?)
         ORDER BY created_at DESC
         LIMIT ? OFFSET ?`,
        [user.userId, conversationWith, conversationWith, user.userId, limit, offset],
      )

      // Mark as read
      await runDb(
        "UPDATE messages SET is_read = TRUE, read_at = CURRENT_TIMESTAMP WHERE recipient_id = ? AND sender_id = ? AND is_read = FALSE",
        [user.userId, conversationWith],
      )

      return NextResponse.json({ messages: messages.reverse() })
    }

    // Get conversations list
    const conversations = await queryDb(
      `SELECT DISTINCT
        CASE WHEN sender_id = ? THEN recipient_id ELSE sender_id END as user_id,
        MAX(created_at) as last_message_time,
        SUM(CASE WHEN is_read = FALSE AND recipient_id = ? THEN 1 ELSE 0 END) as unread_count
       FROM messages
       WHERE sender_id = ? OR recipient_id = ?
       GROUP BY user_id
       ORDER BY last_message_time DESC`,
      [user.userId, user.userId, user.userId, user.userId],
    )

    return NextResponse.json({ conversations })
  } catch (error) {
    console.error("Get messages error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { recipientId, content } = body

    if (!recipientId || !content) {
      return NextResponse.json({ error: "Missing recipientId or content" }, { status: 400 })
    }

    // Verify they have a match
    const match = await getOne(
      `SELECT id FROM matches 
       WHERE status = 'matched' 
       AND ((user_id_1 = ? AND user_id_2 = ?) OR (user_id_1 = ? AND user_id_2 = ?))`,
      [user.userId, recipientId, recipientId, user.userId],
    )

    if (!match && user.subscriptionTier === "free") {
      return NextResponse.json({ error: "Only matched users can message" }, { status: 403 })
    }

    const messageId = generateId()
    await runDb("INSERT INTO messages (id, sender_id, recipient_id, content) VALUES (?, ?, ?, ?)", [
      messageId,
      user.userId,
      recipientId,
      content,
    ])

    return NextResponse.json({
      success: true,
      messageId,
    })
  } catch (error) {
    console.error("Send message error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
