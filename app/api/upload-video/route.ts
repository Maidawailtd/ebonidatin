
import { type NextRequest, NextResponse } from "next/server";
import { uploadFile } from "@/lib/cloudflare/r2";

export const dynamic = "force-dynamic";

// TODO: Replace with actual Cloudflare authentication and D1 data insertion
async function createPost(post: any) {
  // This is a placeholder. In a real scenario, you would insert the post data into your D1 database.
  console.log("Creating post:", post);
  return { id: "post-123", ...post };
}

async function getCurrentUserId() {
  // This is a placeholder. In a real scenario, you would get the user ID from your authentication system.
  return "user-123";
}

export async function POST(request: NextRequest) {
  try {
    const userId = await getCurrentUserId();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("video") as File;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    if (!file) {
      return NextResponse.json({ error: "No video file provided" }, { status: 400 });
    }

    const filename = `videos/${userId}/${Date.now()}-${file.name}`;

    const fileBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(fileBuffer);

    await uploadFile(filename, buffer);

    const publicUrl = `https://ebonidating.com/${filename}`;

    const post = await createPost({
      user_id: userId,
      title,
      description,
      video_url: publicUrl,
    });

    return NextResponse.json({ success: true, post });
  } catch (error) {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
