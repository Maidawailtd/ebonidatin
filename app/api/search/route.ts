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
    const q = searchParams.get("q") || ""
    const type = searchParams.get("type") || "all" // 'all', 'users', 'models'
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = 20
    const offset = (page - 1) * limit

    if (!q || q.length < 2) {
      return NextResponse.json({ error: "Search query must be at least 2 characters" }, { status: 400 })
    }

    let query = `
      SELECT u.id, u.username, u.account_type,
             up.first_name, up.age, up.gender, up.bio,
             pp.photo_url,
             mp.portfolio_type, mp.verified_model
      FROM users u
      LEFT JOIN user_profiles up ON u.id = up.user_id
      LEFT JOIN profile_photos pp ON u.id = pp.user_id AND pp.is_primary = TRUE
      LEFT JOIN model_portfolios mp ON u.id = mp.user_id
      WHERE (u.username LIKE ? OR up.first_name LIKE ?)
        AND u.id != ?
        AND u.email_verified = TRUE
        AND u.deleted_at IS NULL
    `

    const params: any[] = [`%${q}%`, `%${q}%`, user.userId]

    if (type === "models") {
      query += ` AND u.account_type = 'model'`
    } else if (type === "users") {
      query += ` AND u.account_type = 'dater'`
    }

    query += ` ORDER BY up.profile_completion_percent DESC LIMIT ? OFFSET ?`
    params.push(limit, offset)

    const results = await queryDb(query, params)

    return NextResponse.json({ results })
  } catch (error) {
    console.error("Search error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
