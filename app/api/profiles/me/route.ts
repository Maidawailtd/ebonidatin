import { type NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (profileError && profileError.code !== 'PGRST116') throw profileError;

    const { data: photos, error: photosError } = await supabase
      .from('profile_photos')
      .select('*')
      .eq('user_id', user.id)
      .order('display_order', { ascending: true });

    if (photosError) throw photosError;

    return NextResponse.json({
      user,
      profile: profile || {},
      photos: photos || [],
    });
  } catch (error) {
    console.error("Get profile error:", error);
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

    const profileFields = [
        body.firstName,
        body.lastName,
        body.bio,
        body.age,
        body.gender,
        body.lookingFor,
        body.locationCity,
        body.ethnicity,
        body.bodyType,
        body.height,
      ].filter(Boolean).length;
      updateData.profile_completion_percent = Math.round((profileFields / 10) * 100);

    if (Object.keys(updateData).length > 0) {
        updateData.updated_at = new Date();
        const { error } = await supabase
            .from('user_profiles')
            .update(updateData)
            .eq('user_id', user.id);

        if (error) throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Update profile error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
