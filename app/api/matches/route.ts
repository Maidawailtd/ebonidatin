
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

    const { data: matches, error } = await supabase.rpc("get_user_matches", {
      p_user_id: user.id,
      p_limit: limit,
      p_offset: offset,
    });

    if (error) throw error;

    return NextResponse.json({ matches });
  } catch (error) {
    console.error("Get matches error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
