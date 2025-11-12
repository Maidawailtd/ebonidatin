import { type NextRequest, NextResponse } from "next/server"
import { getOne, queryDb } from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
  try {
    const { userId } = await params

    const profile = await getOne("SELECT * FROM user_profiles WHERE user_id = ?", [userId])

    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 })
    }

    const photos = await queryDb("SELECT * FROM profile_photos WHERE user_id = ? ORDER BY display_order ASC", [userId])

    const userData = await getOne(
      "SELECT id, email, username, account_type, subscription_tier, created_at FROM users WHERE id = ? AND deleted_at IS NULL",
      [userId],
    )

    return NextResponse.json({
      user: userData,
      profile,
      photos,
    })
  } catch (error) {
    console.error("Get profile error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
