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

    const blocked = await queryDb(
      `SELECT u.id, u.username, up.first_name, pp.photo_url
       FROM blocks b
       JOIN users u ON b.blocked_user_id = u.id
       LEFT JOIN user_profiles up ON u.id = up.user_id
       LEFT JOIN profile_photos pp ON u.id = pp.user_id AND pp.is_primary = TRUE
       WHERE b.blocker_id = ?
       ORDER BY b.created_at DESC`,
      [user.userId],
    )

    return NextResponse.json({ blocked })
  } catch (error) {
    console.error("Get blocks error:", error)
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
    const { blockedUserId, reason } = body

    if (!blockedUserId) {
      return NextResponse.json({ error: "Missing blockedUserId" }, { status: 400 })
    }

    const existing = await getOne("SELECT id FROM blocks WHERE blocker_id = ? AND blocked_user_id = ?", [
      user.userId,
      blockedUserId,
    ])

    if (existing) {
      return NextResponse.json({ error: "User already blocked" }, { status: 409 })
    }

    const blockId = generateId()
    await runDb("INSERT INTO blocks (id, blocker_id, blocked_user_id, reason) VALUES (?, ?, ?, ?)", [
      blockId,
      user.userId,
      blockedUserId,
      reason || "User blocked",
    ])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Block user error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await getAuthUser(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const searchParams = request.nextUrl.searchParams
    const blockedUserId = searchParams.get("blockedUserId")

    if (!blockedUserId) {
      return NextResponse.json({ error: "Missing blockedUserId" }, { status: 400 })
    }

    await runDb("DELETE FROM blocks WHERE blocker_id = ? AND blocked_user_id = ?", [user.userId, blockedUserId])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Unblock user error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
