import { type NextRequest, NextResponse } from "next/server"
import { getOne } from "@/lib/db"
import { verifyPassword, generateToken } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({ error: "Missing email or password" }, { status: 400 })
    }

    const user = await getOne("SELECT * FROM users WHERE email = ? AND deleted_at IS NULL", [email])

    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    const passwordMatch = await verifyPassword(password, user.password_hash)
    if (!passwordMatch) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    if (!user.email_verified) {
      return NextResponse.json(
        {
          error: "Please verify your email first",
          unverified: true,
          userId: user.id,
        },
        { status: 403 },
      )
    }

    const token = await generateToken({
      userId: user.id,
      email: user.email,
      accountType: user.account_type,
      subscriptionTier: user.subscription_tier,
    })

    return NextResponse.json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        accountType: user.account_type,
        subscriptionTier: user.subscription_tier,
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
