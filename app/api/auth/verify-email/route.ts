import { type NextRequest, NextResponse } from "next/server"
import { getOne, runDb } from "@/lib/db"
import { sendEmail, getWelcomeEmailHTML } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { token, email } = body

    if (!token || !email) {
      return NextResponse.json({ error: "Missing token or email" }, { status: 400 })
    }

    const user = await getOne("SELECT * FROM users WHERE email = ? AND email_verification_token = ?", [email, token])

    if (!user) {
      return NextResponse.json({ error: "Invalid or expired verification token" }, { status: 400 })
    }

    if (new Date(user.email_verification_token_expires_at) < new Date()) {
      return NextResponse.json({ error: "Verification token has expired" }, { status: 400 })
    }

    // Update user
    await runDb(
      `UPDATE users SET email_verified = TRUE, 
        email_verification_token = NULL, 
        email_verification_token_expires_at = NULL,
        updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [user.id],
    )

    // Send welcome email
    await sendEmail({
      to: email,
      subject: "Welcome to Eboni Dating!",
      html: getWelcomeEmailHTML(user.username),
    })

    return NextResponse.json({
      success: true,
      message: "Email verified successfully",
    })
  } catch (error) {
    console.error("Email verification error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
