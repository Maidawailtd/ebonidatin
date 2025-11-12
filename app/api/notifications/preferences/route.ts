import { type NextRequest, NextResponse } from "next/server"
import { getAuthUser } from "@/lib/middleware-auth"

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Return default preferences
    return NextResponse.json({
      emailOnNewLike: true,
      emailOnNewMatch: true,
      emailOnNewMessage: true,
      pushNotifications: true,
      smsNotifications: false,
    })
  } catch (error) {
    console.error("Get notification preferences error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await getAuthUser(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    // In production, save to database

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Update notification preferences error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
