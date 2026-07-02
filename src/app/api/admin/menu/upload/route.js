import { NextResponse } from "next/server";
import { PROJECT_ID } from "../../../../../lib/order";
import { isAdmin, unauthorized } from "../../../../../lib/admin";
import { uploadToStorage } from "../../../../../lib/storage";

const BUCKET = "menu-images";
const ALLOWED = ["image/jpeg", "image/png", "image/webp"];

export async function POST(request) {
  if (!isAdmin(request)) return unauthorized();
  try {
    const form = await request.formData();
    const file = form.get("file");
    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "Keine Datei erhalten." }, { status: 400 });
    }
    if (!ALLOWED.includes(file.type)) {
      return NextResponse.json({ error: "Nur JPG, PNG oder WebP erlaubt." }, { status: 400 });
    }
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: "Datei zu groß (max. 5 MB)." }, { status: 400 });
    }

    const ext = file.type.split("/")[1];
    const path = `${PROJECT_ID}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const url = await uploadToStorage(BUCKET, path, file);
    return NextResponse.json({ url });
  } catch (e) {
    console.error("menu upload error:", e);
    return NextResponse.json({ error: "Upload fehlgeschlagen." }, { status: 500 });
  }
}
