
import { type NextRequest, NextResponse } from "next/server";
import { getOne, queryDb, runDb } from "@/lib/db";
import { 
  verifyPassword, 
  generateToken, 
  hashPassword, 
  generateUserId, 
  generateVerificationToken, 
  generateId, 
  getTokenExpirationTime 
} from "@/lib/auth";
import { 
  sendEmail, 
  getVerificationEmailHTML, 
  getWelcomeEmailHTML 
} from "@/lib/email";

export async function handleLogin(request: NextRequest) {
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

export async function handleSignup(request: NextRequest) {
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

export async function handleVerifyEmail(request: NextRequest) {
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
