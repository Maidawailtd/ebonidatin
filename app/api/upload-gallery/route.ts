
import { uploadFile } from "@/lib/cloudflare/r2";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return Response.json({ error: "No file provided" }, { status: 400 });
    }

    const timestamp = Date.now();
    const filename = `gallery/${timestamp}-${file.name}`;

    const fileBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(fileBuffer);

    await uploadFile(filename, buffer);

    const publicUrl = `https://ebonidating.com/${filename}`;

    return Response.json({ 
      success: true, 
      filename: filename,
      url: publicUrl
    });

  } catch (error) {
    console.error("Upload error:", error);
    return Response.json({ error: "Upload failed" }, { status: 500 });
  }
}
