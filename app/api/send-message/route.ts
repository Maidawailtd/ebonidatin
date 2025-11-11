
import { type NextRequest, NextResponse } from "next/server"

export const dynamic = 'force-dynamic'

// TODO: Replace with actual Cloudflare authentication and D1 data insertion
async function sendMessage(senderId: string, receiverId: string, message: string) {
  // This is a placeholder. In a real scenario, you would insert the message into your D1 database.
  const newMessage = {
    id: "message-123",
    sender_id: senderId,
    receiver_id: receiverId,
    message,
    created_at: new Date().toISOString(),
  };
  return newMessage;
}

async function getCurrentUserId() {
  // This is a placeholder. In a real scenario, you would get the user ID from your authentication system.
  return "user-123";
}

export async function POST(request: NextRequest) {
  try {
    const senderId = await getCurrentUserId();

    if (!senderId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { receiver_id, message } = await request.json()

    if (!receiver_id || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const newMessage = await sendMessage(senderId, receiver_id, message);

    return NextResponse.json({ success: true, message: newMessage })
  } catch (error) {
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 })
  }
}
