import { NextResponse } from 'next/server';
import { uploadCoverPhoto } from '@/lib/cloudflare/r2';
import { updateUserProfile } from '@/lib/cloudflare/d1';
import { getAuth } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { userId } = await getAuth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('coverPhoto') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const { key } = await uploadCoverPhoto(userId, file);

    await updateUserProfile(userId, { coverPhotoUrl: key });

    return NextResponse.json({ message: 'Cover photo updated successfully', key });

  } catch (error) {
    console.error('Failed to update cover photo:', error);
    return NextResponse.json({ error: 'Failed to update cover photo' }, { status: 500 });
  }
}
