import { type NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const page = Number.parseInt(searchParams.get("page") || "1");
    const limit = 20;
    const offset = (page - 1) * limit;

    const { data: likes, error } = await supabase
      .from('likes')
      .select(`
        *,
        liked_user:liked_user_id ( username, user_profiles ( first_name ), profile_photos ( photo_url ) )
      `)
      .eq('liker_id', user.id)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;

    return NextResponse.json({ likes });
  } catch (error) {
    console.error("Get likes error:", error);
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
    const { likedUserId } = body;

    if (!likedUserId) {
      return NextResponse.json({ error: "Missing likedUserId" }, { status: 400 });
    }

    const { data: existingLike, error: existingLikeError } = await supabase
      .from('likes')
      .select('id')
      .eq('liker_id', user.id)
      .eq('liked_user_id', likedUserId)
      .single();

    if (existingLike) {
      return NextResponse.json({ error: "Already liked this user" }, { status: 409 });
    }

    const { error: likeError } = await supabase.from('likes').insert([
      { liker_id: user.id, liked_user_id: likedUserId },
    ]);

    if (likeError) throw likeError;

    // Check for mutual match
    const { data: mutualLike, error: mutualLikeError } = await supabase
      .from('likes')
      .select('id')
      .eq('liker_id', likedUserId)
      .eq('liked_user_id', user.id)
      .single();

    if (mutualLike) {
      // Create match
      const { error: matchError } = await supabase.from('matches').insert([
        { user_id_1: user.id, user_id_2: likedUserId, status: 'matched', matched_at: new Date() },
      ]);
      if (matchError) throw matchError;
    }

    return NextResponse.json({
      success: true,
      matched: !!mutualLike,
    });
  } catch (error) {
    console.error("Like user error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
