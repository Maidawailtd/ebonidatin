import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: "auto",
  endpoint: "https://588ead18d8b05c800345a60d5c4f2de7.r2.cloudflarestorage.com/mglink",
  credentials: {
    accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY!,
  },
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    
    if (!file) {
      return Response.json({ error: "No file provided" }, { status: 400 });
    }

    const timestamp = Date.now();
    const filename = `gallery/${timestamp}-${file.name}`;

    const command = new PutObjectCommand({
      Bucket: "mglink",
      Key: filename,
      Body: Buffer.from(await file.arrayBuffer()),
      ContentType: file.type,
    });
    
    await s3Client.send(command);
    
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
