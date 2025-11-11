import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { type NextRequest, NextResponse } from "next/server";

const s3Client = new S3Client({
  region: "auto",
  endpoint: "https://588ead18d8b05c800345a60d5c4f2de7.r2.cloudflarestorage.com/mglink",
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY!,
  },
});

export const dynamic = 'force-dynamic';

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

    const command = new PutObjectCommand({
        Bucket: "mglink",
        Key: filename,
        Body: new Uint8Array(await file.arrayBuffer()),
        ContentType: file.type,
      });
      
      await s3Client.send(command);
      
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
