
import { type NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = Number.parseInt(searchParams.get("page") || "1");
    const portfolioType = searchParams.get("portfolioType");
    const experienceLevel = searchParams.get("experienceLevel");
    const verified = searchParams.get("verified") === "true";
    const limit = 20;
    const offset = (page - 1) * limit;

    let query = supabase
      .from("model_portfolios")
      .select(`
        user_id,
        portfolio_type,
        height,
        weight,
        dress_size,
        verified_model,
        rate_per_hour,
        users (
          id,
          username
        ),
        user_profiles (
          first_name,
          age,
          bio
        ),
        profile_photos (
          photo_url
        )
      `)
      .eq("users.account_type", "model")
      .eq("users.email_verified", true)
      .is("users.deleted_at", null)
      .range(offset, offset + limit - 1)
      .order("verified_model", { ascending: false })
      .order("created_at", { ascending: false, referencedTable: "users" });

    if (portfolioType) {
      query = query.eq("portfolio_type", portfolioType);
    }

    if (experienceLevel) {
      query = query.eq("experience_level", experienceLevel);
    }

    if (verified) {
      query = query.eq("verified_model", true);
    }

    const { data: models, error } = await query;

    if (error) throw error;

    return NextResponse.json({ models });
  } catch (error) {
    console.error("Get models directory error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
