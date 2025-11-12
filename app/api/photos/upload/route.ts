import { type NextRequest, NextResponse } from "next/server"
import { runDb } from "@/lib/db"
import { getAuthUser } from "@/lib/middleware-auth"
import { generateId } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get("file") as File
    const isPrimary = formData.get("isPrimary") === "true"

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // In production, upload to Cloudflare R2 or similar
    // For now, return a placeholder URL
    const photoUrl = `/api/photos/${generateId()}`
    const photoId = generateId()

    // If this is primary, unset other primary photos
    if (isPrimary) {
      await runDb("UPDATE profile_photos SET is_primary = FALSE WHERE user_id = ?", [user.userId])
    }

    await runDb(
      "INSERT INTO profile_photos (id, user_id, photo_url, thumbnail_url, is_primary) VALUES (?, ?, ?, ?, ?)",
      [photoId, user.userId, photoUrl, photoUrl, isPrimary],
    )

    return NextResponse.json({
      success: true,
      photoId,
      photoUrl,
    })
  } catch (error) {
    console.error("Photo upload error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
