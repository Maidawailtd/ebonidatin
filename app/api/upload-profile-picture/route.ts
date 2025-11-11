
import { uploadFile } from "@/lib/cloudflare/r2";
import { type NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ error: "File must be an image" }, { status: 400 });
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "File size must be less than 5MB" }, { status: 400 });
    }

    // Upload to R2 with unique filename
    const timestamp = Date.now();
    const filename = `profile-pictures/${timestamp}-${file.name}`;

    const fileBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(fileBuffer);

    await uploadFile(filename, buffer);

    const publicUrl = `https://ebonidating.com/${filename}`;

    return NextResponse.json({
      url: publicUrl,
      filename: file.name,
      size: file.size,
      type: file.type,
    });
  } catch (error) {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
