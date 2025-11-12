import { type NextRequest, NextResponse } from "next/server"
import { queryDb } from "@/lib/db"
import { getAuthUser } from "@/lib/middleware-auth"

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

    const matches = await queryDb(
      `SELECT 
        m.*,
        CASE 
          WHEN m.user_id_1 = ? THEN u2.id
          ELSE u1.id
        END as matched_user_id,
        CASE 
          WHEN m.user_id_1 = ? THEN u2.username
          ELSE u1.username
        END as matched_username,
        CASE 
          WHEN m.user_id_1 = ? THEN up2.first_name
          ELSE up1.first_name
        END as matched_first_name,
        CASE 
          WHEN m.user_id_1 = ? THEN pp2.photo_url
          ELSE pp1.photo_url
        END as matched_photo
       FROM matches m
       LEFT JOIN users u1 ON m.user_id_1 = u1.id
       LEFT JOIN users u2 ON m.user_id_2 = u2.id
       LEFT JOIN user_profiles up1 ON u1.id = up1.user_id
       LEFT JOIN user_profiles up2 ON u2.id = up2.user_id
       LEFT JOIN profile_photos pp1 ON u1.id = pp1.user_id AND pp1.is_primary = TRUE
       LEFT JOIN profile_photos pp2 ON u2.id = pp2.user_id AND pp2.is_primary = TRUE
       WHERE (m.user_id_1 = ? OR m.user_id_2 = ?) AND m.status = 'matched'
       ORDER BY m.matched_at DESC
       LIMIT ? OFFSET ?`,
      [user.userId, user.userId, user.userId, user.userId, user.userId, user.userId, limit, offset],
    )

    return NextResponse.json({ matches })
  } catch (error) {
    console.error("Get matches error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
