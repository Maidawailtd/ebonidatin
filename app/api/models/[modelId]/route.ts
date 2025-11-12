import { type NextRequest, NextResponse } from "next/server"
import { getOne, queryDb } from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: Promise<{ modelId: string }> }) {
  try {
    const { modelId } = await params

    const userData = await getOne(
      'SELECT * FROM users WHERE id = ? AND account_type = "model" AND deleted_at IS NULL',
      [modelId],
    )

    if (!userData) {
      return NextResponse.json({ error: "Model not found" }, { status: 404 })
    }

    const profile = await getOne("SELECT * FROM user_profiles WHERE user_id = ?", [modelId])

    const portfolio = await getOne("SELECT * FROM model_portfolios WHERE user_id = ?", [modelId])

    const photos = await queryDb("SELECT * FROM profile_photos WHERE user_id = ? ORDER BY display_order ASC", [modelId])

    return NextResponse.json({
      user: userData,
      profile,
      portfolio: portfolio ? { ...portfolio, measurements: JSON.parse(portfolio.measurements || "{}") } : null,
      photos,
    })
  } catch (error) {
    console.error("Get model error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
