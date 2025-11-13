import { type NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: portfolio, error: portfolioError } = await supabase
      .from('model_portfolios')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (portfolioError && portfolioError.code !== 'PGRST116') { // Ignore no rows found error
        throw portfolioError;
    }

    if (!portfolio) {
      return NextResponse.json({ error: "Portfolio not found" }, { status: 404 });
    }

    const { data: photos, error: photosError } = await supabase
      .from('profile_photos')
      .select('*')
      .eq('user_id', user.id)
      .order('display_order', { ascending: true });

    if (photosError) throw photosError;

    return NextResponse.json({ portfolio, photos });
  } catch (error) {
    console.error("Get portfolio error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
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
    } = body;

    const { data, error } = await supabase.from('model_portfolios').insert([
      {
        user_id: user.id,
        portfolio_type: portfolioType,
        height,
        weight,
        dress_size: dressSize,
        shoe_size: shoeSize,
        hair_color: hairColor,
        eye_color: eyeColor,
        measurements,
        availability,
        rate_per_hour: ratePerHour,
        representation,
        agency_name: agencyName,
        portfolio_url: portfolioUrl,
        experience_level: experienceLevel,
      },
    ]).select();

    if (error) throw error;

    return NextResponse.json({ success: true, portfolioId: data[0].id });
  } catch (error) {
    console.error("Create portfolio error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const updateData: { [key: string]: any } = {};

    for (const key in body) {
        if (body[key] !== undefined) {
            const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
            updateData[snakeKey] = body[key];
        }
    }

    if (Object.keys(updateData).length > 0) {
        updateData.updated_at = new Date();
        const { error } = await supabase
            .from('model_portfolios')
            .update(updateData)
            .eq('user_id', user.id);

        if (error) throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Update portfolio error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
