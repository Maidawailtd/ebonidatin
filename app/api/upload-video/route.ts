
import { type NextRequest, NextResponse } from "next/server";
import { uploadFile } from "@/lib/cloudflare/r2";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("video") as File;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    if (!file) {
      return NextResponse.json({ error: "No video file provided" }, { status: 400 });
    }

    const filename = `videos/${user.id}/${Date.now()}-${file.name}`;

    const fileBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(fileBuffer);

    await uploadFile(filename, buffer);

    const publicUrl = `https://ebonidating.com/${filename}`;

    const { data: post, error } = await supabase
      .from("posts")
      .insert({
        user_id: user.id,
        title,
        description,
        video_url: publicUrl,
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
    }

    return NextResponse.json({ success: true, post });
  } catch (error) {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
