import { type NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { reportedUserId, reason, description } = body;

    if (!reportedUserId || !reason) {
      return NextResponse.json({ error: "Missing reportedUserId or reason" }, { status: 400 });
    }

    const { data: existingReport, error: existingReportError } = await supabase
      .from('reports')
      .select('id')
      .eq('reporter_id', user.id)
      .eq('reported_user_id', reportedUserId)
      .eq('status', 'pending')
      .single();

    if (existingReport) {
      return NextResponse.json({ error: "You already have a pending report for this user" }, { status: 409 });
    }

    const { data, error } = await supabase.from('reports').insert([
      {
        reporter_id: user.id,
        reported_user_id: reportedUserId,
        reason,
        description: description || "",
      },
    ]).select();

    if (error) throw error;

    return NextResponse.json({ success: true, reportId: data[0].id });
  } catch (error) {
    console.error("Report user error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
