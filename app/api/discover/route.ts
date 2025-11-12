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
    const ageMin = Number.parseInt(searchParams.get("ageMin") || "18")
    const ageMax = Number.parseInt(searchParams.get("ageMax") || "80")
    const gender = searchParams.get("gender")
    const location = searchParams.get("location")
    const limit = 20
    const offset = (page - 1) * limit

    let query = `
      SELECT u.id, u.username, u.created_at,
             up.first_name, up.age, up.gender, up.location_city, up.bio,
             up.ethnicity, up.body_type, up.height, up.interested_in,
             pp.photo_url
      FROM users u
      LEFT JOIN user_profiles up ON u.id = up.user_id
      LEFT JOIN profile_photos pp ON u.id = pp.user_id AND pp.is_primary = TRUE
      LEFT JOIN blocks b ON (b.blocker_id = ? AND b.blocked_user_id = u.id)
              OR (b.blocker_id = u.id AND b.blocked_user_id = ?)
      WHERE u.id != ? 
        AND u.email_verified = TRUE 
        AND u.deleted_at IS NULL
        AND b.id IS NULL
        AND up.age >= ? AND up.age <= ?
    `

    const params: any[] = [user.userId, user.userId, user.userId, ageMin, ageMax]

    if (gender) {
      query += ` AND up.gender = ?`
      params.push(gender)
    }

    if (location) {
      query += ` AND (up.location_city LIKE ? OR up.location_state LIKE ?)`
      params.push(`%${location}%`, `%${location}%`)
    }

    // Exclude liked and matched users
    query += `
      AND u.id NOT IN (
        SELECT liked_user_id FROM likes WHERE liker_id = ?
      )
      AND u.id NOT IN (
        SELECT CASE WHEN user_id_1 = ? THEN user_id_2 ELSE user_id_1 END
        FROM matches WHERE (user_id_1 = ? OR user_id_2 = ?)
      )
    `
    params.push(user.userId, user.userId, user.userId, user.userId)

    query += ` ORDER BY up.profile_completion_percent DESC, u.created_at DESC LIMIT ? OFFSET ?`
    params.push(limit, offset)

    const profiles = await queryDb(query, params)

    return NextResponse.json({ profiles })
  } catch (error) {
    console.error("Discover error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
