import { type NextRequest, NextResponse } from "next/server"
import { getAuthUser } from "@/lib/middleware-auth"
import { createCheckoutSession } from "@/lib/stripe"

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { tier } = body

    if (!tier || !["premium", "vip", "agency"].includes(tier)) {
      return NextResponse.json({ error: "Invalid subscription tier" }, { status: 400 })
    }

    const origin = request.headers.get("origin") || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
    const session = await createCheckoutSession(
      user.userId,
      tier,
      `${origin}/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
      `${origin}/subscription/cancel`,
    )

    return NextResponse.json({ sessionId: session.id, url: session.url })
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      console.error("Create checkout session error:", error)
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
