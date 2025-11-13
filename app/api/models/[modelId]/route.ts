
import { type NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: { modelId: string } }
) {
  try {
    const { modelId } = params;

    const { data: user, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("id", modelId)
      .eq("account_type", "model")
      .is("deleted_at", null)
      .single();

    if (userError) {
      if (userError.code === "PGRST116") {
        return NextResponse.json({ error: "Model not found" }, { status: 404 });
      }
      throw userError;
    }

    const { data: profile, error: profileError } = await supabase
      .from("user_profiles")
      .select("*")
      .eq("user_id", modelId)
      .single();

    if (profileError && profileError.code !== "PGRST116") throw profileError;

    const { data: portfolio, error: portfolioError } = await supabase
      .from("model_portfolios")
      .select("*")
      .eq("user_id", modelId)
      .single();

    if (portfolioError && portfolioError.code !== "PGRST116") throw portfolioError;

    const { data: photos, error: photosError } = await supabase
      .from("profile_photos")
      .select("*")
      .eq("user_id", modelId)
      .order("display_order", { ascending: true });

    if (photosError) throw photosError;

    return NextResponse.json({
      user,
      profile,
      portfolio,
      photos,
    });
  } catch (error) {
    console.error("Get model error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
