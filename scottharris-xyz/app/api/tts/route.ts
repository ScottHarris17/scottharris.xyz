import { NextRequest, NextResponse } from "next/server";

const VOICE_ID = "00VfaeO8lNqffUA35ePA";
const MODEL_ID = "eleven_multilingual_v2";

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.ELEVENLABS_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Voice is not configured yet." },
        { status: 503 }
      );
    }

    const { text } = await request.json();
    if (!text || typeof text !== "string") {
      return NextResponse.json(
        { error: "Text is required." },
        { status: 400 }
      );
    }

    // Strip markdown formatting for cleaner speech
    const cleanText = text
      .replace(/\*\*([^*]+)\*\*/g, "$1")  // bold
      .replace(/\*([^*]+)\*/g, "$1")      // italic
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // links
      .replace(/^[-*]\s/gm, "")           // bullet points
      .replace(/^\d+\.\s/gm, "")          // numbered lists
      .replace(/#{1,6}\s/g, "")           // headings
      .trim();

    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
      {
        method: "POST",
        headers: {
          "xi-api-key": apiKey,
          "Content-Type": "application/json",
          Accept: "audio/mpeg",
        },
        body: JSON.stringify({
          text: cleanText,
          model_id: MODEL_ID,
          output_format: "mp3_44100_128",
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("ElevenLabs error:", errorText);

      // Check for quota exceeded
      try {
        const parsed = JSON.parse(errorText);
        if (parsed?.detail?.status === "quota_exceeded") {
          return NextResponse.json(
            { error: "Voice quota reached for today. Try again later!" },
            { status: 429 }
          );
        }
      } catch {
        // not JSON, fall through
      }

      return NextResponse.json(
        { error: "Voice generation failed." },
        { status: 502 }
      );
    }

    const audioBuffer = await response.arrayBuffer();

    return new Response(audioBuffer, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("TTS API error:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
