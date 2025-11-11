import { NextResponse } from 'next/server';
import { updateUserProfile } from '@/lib/cloudflare/d1';
import { getAuth } from '@/lib/auth';

export async function PUT(request: Request) {
  try {
    const { userId } = await getAuth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const profileData = await request.json();

    // TODO: Add validation for profileData

    await updateUserProfile(userId, profileData);

    return NextResponse.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Failed to update profile:', error);
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
  }
}
