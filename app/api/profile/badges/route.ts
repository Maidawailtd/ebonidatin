import { NextResponse } from 'next/server';
import { updateUserProfile } from '@/lib/cloudflare/d1';
import { getAuth } from '@/lib/auth';

export async function PUT(request: Request) {
  try {
    const { userId } = await getAuth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { badges } = await request.json();

    await updateUserProfile(userId, { badges: JSON.stringify(badges) });

    return NextResponse.json({ message: 'Badges updated successfully' });
  } catch (error) {
    console.error('Failed to update badges:', error);
    return NextResponse.json({ error: 'Failed to update badges' }, { status: 500 });
  }
}
