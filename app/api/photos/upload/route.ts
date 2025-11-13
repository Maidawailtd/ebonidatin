import { type NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const isPrimary = formData.get("isPrimary") === "true";

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const filePath = `user-photos/${user.id}/${file.name}`;
    const { error: uploadError } = await supabase.storage
        .from('photos')
        .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage.from('photos').getPublicUrl(filePath);

    // If this is primary, unset other primary photos
    if (isPrimary) {
      await supabase
        .from('profile_photos')
        .update({ is_primary: false })
        .eq('user_id', user.id);
    }

    const { data, error } = await supabase.from('profile_photos').insert([
      {
        user_id: user.id,
        photo_url: publicUrl,
        thumbnail_url: publicUrl,
        is_primary: isPrimary,
      },
    ]).select();

    if (error) throw error;

    return NextResponse.json({
      success: true,
      photoId: data[0].id,
      photoUrl: publicUrl,
    });
  } catch (error) {
    console.error("Photo upload error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
