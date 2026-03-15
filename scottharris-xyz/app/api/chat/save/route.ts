import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabase();
    if (!supabase) {
      return NextResponse.json({ error: "Not configured" }, { status: 503 });
    }

    const { sessionId, messages, voiceMode } = await request.json();
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
      || request.headers.get("x-real-ip")
      || "unknown";

    // Vercel provides geo headers automatically
    const city = request.headers.get("x-vercel-ip-city") || null;
    const region = request.headers.get("x-vercel-ip-country-region") || null;
    const country = request.headers.get("x-vercel-ip-country") || null;
    const location = [city, region, country].filter(Boolean).join(", ") || null;

    if (!sessionId || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const { error } = await supabase
      .from("xyz-chat")
      .upsert(
        {
          id: sessionId,
          messages,
          message_count: messages.length,
          voice_mode: !!voiceMode,
          ip_address: ip,
          location,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "id" }
      );

    if (error) {
      console.error("Supabase save error:", error.message, error.code, error.details);
      return NextResponse.json(
        { error: "Failed to save", detail: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Chat save error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
