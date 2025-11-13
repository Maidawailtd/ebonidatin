import { type NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get("type") || "received"; // 'sent', 'received'
    const status = searchParams.get("status");
    const page = Number.parseInt(searchParams.get("page") || "1");
    const limit = 20;
    const offset = (page - 1) * limit;

    let query = supabase
      .from('bookings')
      .select(`
        *,
        requester:requester_id ( username, user_profiles ( first_name ) ),
        model:model_id ( username, user_profiles ( first_name ) )
      `)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (type === 'received') {
      query = query.eq('model_id', user.id);
    } else {
      query = query.eq('requester_id', user.id);
    }

    if (status) {
      query = query.eq('status', status);
    }

    const { data: bookings, error } = await query;

    if (error) throw error;

    return NextResponse.json({ bookings });
  } catch (error) {
    console.error("Get bookings error:", error);
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
    const { modelId, eventDate, eventType, details, budget } = body;

    if (!modelId || !eventDate) {
      return NextResponse.json({ error: "Missing modelId or eventDate" }, { status: 400 });
    }

    const { data, error } = await supabase.from('bookings').insert([
      {
        requester_id: user.id,
        model_id: modelId,
        event_date: eventDate,
        event_type: eventType,
        details: details || "",
        budget: budget || 0,
        status: 'pending'
      },
    ]).select();

    if (error) throw error;

    return NextResponse.json({ success: true, bookingId: data[0].id });
  } catch (error) {
    console.error("Create booking error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
