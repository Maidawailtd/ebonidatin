import { type NextRequest, NextResponse } from "next/server"
import { queryDb, runDb } from "@/lib/db"
import {
  hashPassword,
  generateUserId,
  generateVerificationToken,
  generateId,
  getTokenExpirationTime,
  generateToken,
} from "@/lib/auth"
import { sendEmail, getVerificationEmailHTML } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, username, password, accountType = "dater" } = body

    if (!email || !username || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 })
    }

    // Check if user exists
    const existingUser = await queryDb("SELECT id FROM users WHERE email = ? OR username = ?", [email, username])

    if (existingUser.length > 0) {
      return NextResponse.json({ error: "Email or username already exists" }, { status: 409 })
    }

    const userId = generateUserId()
    const passwordHash = await hashPassword(password)
    const verificationToken = generateVerificationToken()
    const tokenExpiresAt = getTokenExpirationTime(1)

    // Create user
    await runDb(
      `INSERT INTO users (id, email, username, password_hash, account_type, 
        email_verification_token, email_verification_token_expires_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [userId, email, username, passwordHash, accountType, verificationToken, tokenExpiresAt.toISOString()],
    )

    // Create profile
    await runDb("INSERT INTO user_profiles (id, user_id) VALUES (?, ?)", [generateId(), userId])

    // Send verification email
    const verificationLink = `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify?token=${verificationToken}&email=${encodeURIComponent(email)}`
    await sendEmail({
      to: email,
      subject: "Verify your Eboni Dating account",
      html: getVerificationEmailHTML(verificationLink, username),
    })

    // Generate JWT token
    const token = await generateToken({
      userId,
      email,
      accountType,
      subscriptionTier: "free",
    })

    return NextResponse.json(
      {
        success: true,
        message: "Account created. Please verify your email.",
        token,
        user: { id: userId, email, username, accountType },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
