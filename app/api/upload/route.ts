
import { type NextRequest, NextResponse } from "next/server";
import { uploadFile } from "@/lib/cloudflare/r2";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const fileBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(fileBuffer);

    await uploadFile(file.name, buffer);

    return NextResponse.json({ success: true });
  } catch (error) {        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
