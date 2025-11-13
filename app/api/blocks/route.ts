import { type NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: blocked, error } = await supabase
      .from('blocks')
      .select(`
        blocked_user_id,
        users:blocked_user_id ( id, username ),
        user_profiles:blocked_user_id ( first_name ),
        profile_photos:blocked_user_id ( photo_url )
      `)
      .eq('blocker_id', user.id);

    if (error) throw error;

    return NextResponse.json({ blocked });
  } catch (error) {
    console.error("Get blocks error:", error);
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
    const { blockedUserId, reason } = body;

    if (!blockedUserId) {
      return NextResponse.json({ error: "Missing blockedUserId" }, { status: 400 });
    }

    const { data: existing, error: existingError } = await supabase
      .from('blocks')
      .select('id')
      .eq('blocker_id', user.id)
      .eq('blocked_user_id', blockedUserId)
      .single();

    if (existing) {
      return NextResponse.json({ error: "User already blocked" }, { status: 409 });
    }

    const { error } = await supabase.from('blocks').insert([
      { blocker_id: user.id, blocked_user_id: blockedUserId, reason: reason || "User blocked" },
    ]);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Block user error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const blockedUserId = searchParams.get("blockedUserId");

    if (!blockedUserId) {
      return NextResponse.json({ error: "Missing blockedUserId" }, { status: 400 });
    }

    const { error } = await supabase.from('blocks').delete()
      .eq('blocker_id', user.id)
      .eq('blocked_user_id', blockedUserId);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Unblock user error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
