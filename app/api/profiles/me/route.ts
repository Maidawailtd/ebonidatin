import { type NextRequest, NextResponse } from "next/server"
import { getOne, queryDb, runDb } from "@/lib/db"
import { getAuthUser } from "@/lib/middleware-auth"

export async function GET(request: NextRequest) {
  try {
    const user = await getAuthUser(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const profile = await getOne("SELECT * FROM user_profiles WHERE user_id = ?", [user.userId])

    const photos = await queryDb("SELECT * FROM profile_photos WHERE user_id = ? ORDER BY display_order ASC", [
      user.userId,
    ])

    const userData = await getOne(
      "SELECT id, email, username, account_type, subscription_tier, created_at FROM users WHERE id = ?",
      [user.userId],
    )

    return NextResponse.json({
      user: userData,
      profile,
      photos,
    })
  } catch (error) {
    console.error("Get profile error:", error)
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
    const {
      firstName,
      lastName,
      bio,
      age,
      gender,
      lookingFor,
      locationCity,
      locationState,
      locationCountry,
      latitude,
      longitude,
      interestedIn,
      ethnicity,
      bodyType,
      height,
      relationshipStatus,
      haveChildren,
      wantChildren,
      education,
      occupation,
      incomeRange,
      datingPreferences,
    } = body

    // Calculate profile completion
    const profileFields = [
      firstName,
      lastName,
      bio,
      age,
      gender,
      lookingFor,
      locationCity,
      ethnicity,
      bodyType,
      height,
    ].filter(Boolean).length
    const completionPercent = Math.round((profileFields / 10) * 100)

    await runDb(
      `UPDATE user_profiles SET
        first_name = ?,
        last_name = ?,
        bio = ?,
        age = ?,
        gender = ?,
        looking_for = ?,
        location_city = ?,
        location_state = ?,
        location_country = ?,
        latitude = ?,
        longitude = ?,
        interested_in = ?,
        ethnicity = ?,
        body_type = ?,
        height = ?,
        relationship_status = ?,
        have_children = ?,
        want_children = ?,
        education = ?,
        occupation = ?,
        income_range = ?,
        dating_preferences = ?,
        profile_completion_percent = ?,
        updated_at = CURRENT_TIMESTAMP
       WHERE user_id = ?`,
      [
        firstName,
        lastName,
        bio,
        age,
        gender,
        lookingFor,
        locationCity,
        locationState,
        locationCountry,
        latitude,
        longitude,
        JSON.stringify(interestedIn),
        ethnicity,
        bodyType,
        height,
        relationshipStatus,
        haveChildren,
        wantChildren,
        education,
        occupation,
        incomeRange,
        JSON.stringify(datingPreferences),
        completionPercent,
        user.userId,
      ],
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Update profile error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
