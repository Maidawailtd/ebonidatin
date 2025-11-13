import { type NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/auth";

export async function GET(request: NextRequest, { params }: { params: { userId: string } }) {
  try {
    const { userId } = params;

    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (profileError && profileError.code !== 'PGRST116') throw profileError;

    if (!profile) {
        return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    const { data: photos, error: photosError } = await supabase
      .from('profile_photos')
      .select('*')
      .eq('user_id', userId)
      .order('display_order', { ascending: true });

    if (photosError) throw photosError;

    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id, email, username, account_type, subscription_tier, created_at')
      .eq('id', userId)
      .single();

    if (userError) throw userError;

    return NextResponse.json({
      user,
      profile,
      photos,
    });
  } catch (error) {
    console.error("Get profile error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
