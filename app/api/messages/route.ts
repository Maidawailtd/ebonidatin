import { type NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const conversationWith = searchParams.get("conversationWith");
    const page = Number.parseInt(searchParams.get("page") || "1");
    const limit = 50;
    const offset = (page - 1) * limit;

    if (conversationWith) {
      const { data: messages, error } = await supabase
        .from('messages')
        .select('*')
        .or(`(sender_id.eq.${user.id},recipient_id.eq.${conversationWith}),(sender_id.eq.${conversationWith},recipient_id.eq.${user.id})`)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) throw error;

      // Mark as read
      await supabase
        .from('messages')
        .update({ is_read: true, read_at: new Date() })
        .eq('recipient_id', user.id)
        .eq('sender_id', conversationWith)
        .eq('is_read', false);

      return NextResponse.json({ messages: messages.reverse() });
    } else {
        // Knex is required for this query
        return NextResponse.json({ error: "Not implemented" }, { status: 501 });
    }

  } catch (error) {
    console.error("Get messages error:", error);
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
    const { recipientId, content } = body;

    if (!recipientId || !content) {
      return NextResponse.json({ error: "Missing recipientId or content" }, { status: 400 });
    }

    // Verify they have a match
    const { data: match, error: matchError } = await supabase
      .from('matches')
      .select('id')
      .eq('status', 'matched')
      .or(`(user_id_1.eq.${user.id},user_id_2.eq.${recipientId}),(user_id_1.eq.${recipientId},user_id_2.eq.${user.id})`)
      .single();

    // This is a placeholder for a real subscription check
    const isPremium = false;

    if (!match && !isPremium) {
      return NextResponse.json({ error: "Only matched users can message" }, { status: 403 });
    }

    const { data, error } = await supabase.from('messages').insert([
      { sender_id: user.id, recipient_id: recipientId, content },
    ]).select();

    if (error) throw error;

    return NextResponse.json({ success: true, messageId: data[0].id });
  } catch (error) {
    console.error("Send message error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
