import { type NextRequest, NextResponse } from "next/server"
import { getOne } from "@/lib/db"
import { getAuthUser } from "@/lib/middleware-auth"

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userData = await getOne("SELECT subscription_tier, subscription_expires_at FROM users WHERE id = ?", [
      user.userId,
    ])

    const subscription = await getOne(
      'SELECT * FROM subscriptions WHERE user_id = ? AND status = "active" ORDER BY created_at DESC LIMIT 1',
      [user.userId],
    )

    return NextResponse.json({
      tier: userData?.subscription_tier || "free",
      expiresAt: userData?.subscription_expires_at,
      subscription,
    })
  } catch (error) {
    console.error("Get subscription error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
