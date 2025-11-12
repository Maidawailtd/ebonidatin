import { type NextRequest, NextResponse } from "next/server"
import { runDb, getOne, queryDb } from "@/lib/db"
import { getAuthUser } from "@/lib/middleware-auth"
import { generateId } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const searchParams = request.nextUrl.searchParams
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = 20
    const offset = (page - 1) * limit

    const likes = await queryDb(
      `SELECT l.*, u.username, up.first_name, pp.photo_url
       FROM likes l
       JOIN users u ON l.liked_user_id = u.id
       LEFT JOIN user_profiles up ON u.id = up.user_id
       LEFT JOIN profile_photos pp ON u.id = pp.user_id AND pp.is_primary = TRUE
       WHERE l.liker_id = ?
       ORDER BY l.created_at DESC
       LIMIT ? OFFSET ?`,
      [user.userId, limit, offset],
    )

    return NextResponse.json({ likes })
  } catch (error) {
    console.error("Get likes error:", error)
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
    const { likedUserId } = body

    if (!likedUserId) {
      return NextResponse.json({ error: "Missing likedUserId" }, { status: 400 })
    }

    const existingLike = await getOne("SELECT id FROM likes WHERE liker_id = ? AND liked_user_id = ?", [
      user.userId,
      likedUserId,
    ])

    if (existingLike) {
      return NextResponse.json({ error: "Already liked this user" }, { status: 409 })
    }

    const likeId = generateId()
    await runDb("INSERT INTO likes (id, liker_id, liked_user_id) VALUES (?, ?, ?)", [likeId, user.userId, likedUserId])

    // Check for mutual match
    const mutualLike = await getOne("SELECT id FROM likes WHERE liker_id = ? AND liked_user_id = ?", [
      likedUserId,
      user.userId,
    ])

    if (mutualLike) {
      // Create match
      const matchId = generateId()
      await runDb(
        "INSERT INTO matches (id, user_id_1, user_id_2, status, matched_at) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)",
        [matchId, user.userId, likedUserId, "matched"],
      )
    }

    return NextResponse.json({
      success: true,
      matched: !!mutualLike,
    })
  } catch (error) {
    console.error("Like user error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
