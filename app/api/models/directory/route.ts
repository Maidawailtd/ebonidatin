import { type NextRequest, NextResponse } from "next/server"
import { queryDb } from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const page = Number.parseInt(searchParams.get("page") || "1")
    const portfolioType = searchParams.get("portfolioType")
    const experienceLevel = searchParams.get("experienceLevel")
    const verified = searchParams.get("verified") === "true"
    const limit = 20
    const offset = (page - 1) * limit

    let query = `
      SELECT u.id, u.username,
             up.first_name, up.age, up.bio,
             mp.portfolio_type, mp.height, mp.weight, mp.dress_size, mp.verified_model, mp.rate_per_hour,
             pp.photo_url
      FROM users u
      JOIN model_portfolios mp ON u.id = mp.user_id
      LEFT JOIN user_profiles up ON u.id = up.user_id
      LEFT JOIN profile_photos pp ON u.id = pp.user_id AND pp.is_primary = TRUE
      WHERE u.account_type = 'model'
        AND u.email_verified = TRUE
        AND u.deleted_at IS NULL
    `

    const params: any[] = []

    if (portfolioType) {
      query += ` AND mp.portfolio_type = ?`
      params.push(portfolioType)
    }

    if (experienceLevel) {
      query += ` AND mp.experience_level = ?`
      params.push(experienceLevel)
    }

    if (verified) {
      query += ` AND mp.verified_model = TRUE`
    }

    query += ` ORDER BY mp.verified_model DESC, u.created_at DESC LIMIT ? OFFSET ?`
    params.push(limit, offset)

    const models = await queryDb(query, params)

    return NextResponse.json({ models })
  } catch (error) {
    console.error("Get models directory error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
