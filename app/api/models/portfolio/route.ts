import { type NextRequest, NextResponse } from "next/server"
import { getOne, runDb, queryDb } from "@/lib/db"
import { getAuthUser } from "@/lib/middleware-auth"
import { generateId } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const portfolio = await getOne("SELECT * FROM model_portfolios WHERE user_id = ?", [user.userId])

    if (!portfolio) {
      return NextResponse.json({ error: "Portfolio not found" }, { status: 404 })
    }

    const photos = await queryDb("SELECT * FROM profile_photos WHERE user_id = ? ORDER BY display_order ASC", [
      user.userId,
    ])

    return NextResponse.json({
      portfolio: { ...portfolio, measurements: JSON.parse(portfolio.measurements || "{}") },
      photos,
    })
  } catch (error) {
    console.error("Get portfolio error:", error)
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
    const {
      portfolioType,
      height,
      weight,
      dressSize,
      shoeSize,
      hairColor,
      eyeColor,
      measurements,
      availability,
      ratePerHour,
      representation,
      agencyName,
      portfolioUrl,
      experienceLevel,
    } = body

    const portfolioId = generateId()
    await runDb(
      `INSERT INTO model_portfolios 
       (id, user_id, portfolio_type, height, weight, dress_size, shoe_size, hair_color, eye_color, 
        measurements, availability, rate_per_hour, representation, agency_name, portfolio_url, experience_level)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        portfolioId,
        user.userId,
        portfolioType,
        height,
        weight,
        dressSize,
        shoeSize,
        hairColor,
        eyeColor,
        JSON.stringify(measurements),
        availability,
        ratePerHour,
        representation,
        agencyName,
        portfolioUrl,
        experienceLevel,
      ],
    )

    // Update user account type
    await runDb("UPDATE users SET account_type = ? WHERE id = ?", ["model", user.userId])

    return NextResponse.json({
      success: true,
      portfolioId,
    })
  } catch (error) {
    console.error("Create portfolio error:", error)
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

    await runDb(
      `UPDATE model_portfolios SET
        portfolio_type = COALESCE(?, portfolio_type),
        height = COALESCE(?, height),
        weight = COALESCE(?, weight),
        dress_size = COALESCE(?, dress_size),
        shoe_size = COALESCE(?, shoe_size),
        hair_color = COALESCE(?, hair_color),
        eye_color = COALESCE(?, eye_color),
        measurements = COALESCE(?, measurements),
        availability = COALESCE(?, availability),
        rate_per_hour = COALESCE(?, rate_per_hour),
        representation = COALESCE(?, representation),
        agency_name = COALESCE(?, agency_name),
        portfolio_url = COALESCE(?, portfolio_url),
        experience_level = COALESCE(?, experience_level),
        updated_at = CURRENT_TIMESTAMP
       WHERE user_id = ?`,
      [
        body.portfolioType,
        body.height,
        body.weight,
        body.dressSize,
        body.shoeSize,
        body.hairColor,
        body.eyeColor,
        JSON.stringify(body.measurements),
        body.availability,
        body.ratePerHour,
        body.representation,
        body.agencyName,
        body.portfolioUrl,
        body.experienceLevel,
        user.userId,
      ],
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Update portfolio error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
