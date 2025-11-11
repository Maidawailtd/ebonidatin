import { NextResponse } from 'next/server';
import { getMessages } from '@/lib/cloudflare/d1';
import { getAuth } from '@/lib/auth'; // Assuming you have an auth library

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const otherUserId = searchParams.get('userId');
    const { userId: currentUserId } = await getAuth(); // Or however you get the current user's ID

    if (!currentUserId || !otherUserId) {
      return NextResponse.json({ error: 'Authentication or user ID is missing' }, { status: 401 });
    }

    const messages = await getMessages(currentUserId, otherUserId);

    return NextResponse.json({ messages });
  } catch (error) {
    console.error('Failed to fetch messages:', error);
    return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 });
  }
}
