import { type NextRequest, NextResponse } from "next/server"
import { queryDb, runDb } from "@/lib/db"
import { getAuthUser } from "@/lib/middleware-auth"
import { generateId } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const searchParams = request.nextUrl.searchParams
    const type = searchParams.get("type") || "received" // 'sent', 'received'
    const status = searchParams.get("status")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = 20
    const offset = (page - 1) * limit

    let query =
      type === "received"
        ? `
        SELECT b.*, 
               u.username as requester_username, up.first_name as requester_name,
               m.username as model_username, mp.first_name as model_name
        FROM bookings b
        JOIN users u ON b.requester_id = u.id
        LEFT JOIN user_profiles up ON u.id = up.user_id
        JOIN users m ON b.model_id = m.id
        LEFT JOIN user_profiles mp ON m.id = mp.user_id
        WHERE b.model_id = ?
      `
        : `
        SELECT b.*,
               u.username as requester_username, up.first_name as requester_name,
               m.username as model_username, mp.first_name as model_name
        FROM bookings b
        JOIN users u ON b.requester_id = u.id
        LEFT JOIN user_profiles up ON u.id = up.user_id
        JOIN users m ON b.model_id = m.id
        LEFT JOIN user_profiles mp ON m.id = mp.user_id
        WHERE b.requester_id = ?
      `

    const params: any[] = [user.userId]

    if (status) {
      query += ` AND b.status = ?`
      params.push(status)
    }

    query += ` ORDER BY b.created_at DESC LIMIT ? OFFSET ?`
    params.push(limit, offset)

    const bookings = await queryDb(query, params)

    return NextResponse.json({ bookings })
  } catch (error) {
    console.error("Get bookings error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getAuthUser(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { modelId, eventDate, eventType, details, budget } = body

    if (!modelId || !eventDate) {
      return NextResponse.json({ error: "Missing modelId or eventDate" }, { status: 400 })
    }

    const bookingId = generateId()
    await runDb(
      `INSERT INTO bookings (id, requester_id, model_id, event_date, event_type, details, budget, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')`,
      [bookingId, user.userId, modelId, eventDate, eventType, details || "", budget || 0],
    )

    return NextResponse.json({
      success: true,
      bookingId,
    })
  } catch (error) {
    console.error("Create booking error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
