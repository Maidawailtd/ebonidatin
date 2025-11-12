import { type NextRequest, NextResponse } from "next/server"
import { getOne, runDb } from "@/lib/db"
import { getAuthUser } from "@/lib/middleware-auth"

export async function POST(request: NextRequest, { params }: { params: Promise<{ verificationId: string }> }) {
  try {
    const user = await getAuthUser(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { verificationId } = await params

    const isAdmin = await getOne("SELECT id FROM users WHERE id = ? AND account_type = ?", [user.userId, "admin"])

    if (!isAdmin) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const verificationRequest = await getOne("SELECT * FROM verification_requests WHERE id = ?", [verificationId])

    if (!verificationRequest) {
      return NextResponse.json({ error: "Verification request not found" }, { status: 404 })
    }

    // Mark as approved
    await runDb(
      `UPDATE verification_requests SET status = 'approved', reviewed_by = ?, reviewed_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [user.userId, verificationId],
    )

    // For model verification, mark model as verified
    if (verificationRequest.verification_type === "model") {
      await runDb("UPDATE model_portfolios SET verified_model = TRUE WHERE user_id = ?", [verificationRequest.user_id])
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Approve verification error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
