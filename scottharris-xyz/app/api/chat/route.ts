import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { SYSTEM_PROMPT, TOOL_DEFINITIONS } from "@/data/chatContext";
import { projects } from "@/data/projects";
import { bio } from "@/data/bio";

function getOpenAI() {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

// Simple in-memory rate limiter
const rateLimit = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 20; // requests per minute
const RATE_WINDOW = 60 * 1000; // 1 minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimit.get(ip);

  if (!record || now > record.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + RATE_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT) {
    return false;
  }

  record.count++;
  return true;
}

// Tool execution functions
function executeToolCall(name: string, args: Record<string, unknown>): string {
  switch (name) {
    case "search_projects": {
      const query = (args.query as string || "").toLowerCase();
      const category = args.category as string | undefined;

      let results = projects;
      if (category) {
        results = results.filter((p) => p.category === category);
      }
      if (query) {
        results = results.filter(
          (p) =>
            p.title.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query)
        );
      }

      return JSON.stringify(
        results.map((p) => ({
          title: p.title,
          description: p.description,
          url: p.url,
          category: p.category,
        }))
      );
    }

    case "get_resume_link":
      return JSON.stringify({ url: bio.cvUrl, note: "Scott's full academic CV" });

    case "get_social_links":
      return JSON.stringify(
        bio.socialLinks.map((l) => ({ platform: l.platform, url: l.url }))
      );

    case "get_project_detail": {
      const projectId = args.projectId as string;
      const project = projects.find((p) => p.id === projectId);
      if (!project) {
        return JSON.stringify({ error: "Project not found" });
      }
      return JSON.stringify(project);
    }

    default:
      return JSON.stringify({ error: "Unknown tool" });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Please try again in a moment." },
        { status: 429 }
      );
    }

    // Validate API key
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "Chat is not configured yet." },
        { status: 503 }
      );
    }

    const body = await request.json();
    const { messages, voiceMode } = body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages array is required." },
        { status: 400 }
      );
    }

    // Limit message history to last 20 messages
    const trimmedMessages = messages.slice(-20);

    // In voice mode, switch to first person as Scott
    const systemPrompt = voiceMode
      ? SYSTEM_PROMPT + `\n\nVOICE MODE ACTIVE: You are now speaking AS Scott in first person. Your responses will be read aloud in Scott's voice. Say "I" instead of "Scott." Speak naturally and conversationally, as if Scott is talking directly to the visitor. Keep responses concise and conversational — they will be spoken aloud. Avoid excessive markdown formatting and bullet lists since this will be heard, not read. Use short, natural sentences.`
      : SYSTEM_PROMPT;

    // Build the full message list with system prompt
    const fullMessages: OpenAI.ChatCompletionMessageParam[] = [
      { role: "system", content: systemPrompt },
      ...trimmedMessages,
    ];

    // Initial completion (may include tool calls)
    const openai = getOpenAI();
    let response = await openai.chat.completions.create({
      model: "gpt-5-mini-2025-08-07",
      messages: fullMessages,
      tools: TOOL_DEFINITIONS,
      stream: false, // First call non-streaming to handle tools
      max_tokens: 500,
    });

    let message = response.choices[0]?.message;

    // Handle tool calls (one round)
    if (message?.tool_calls && message.tool_calls.length > 0) {
      // Add assistant message with tool calls
      fullMessages.push(message);

      // Execute each tool call and add results
      for (const toolCall of message.tool_calls) {
        if (toolCall.type !== "function") continue;
        const fn = toolCall.function;
        const result = executeToolCall(
          fn.name,
          JSON.parse(fn.arguments)
        );
        fullMessages.push({
          role: "tool",
          tool_call_id: toolCall.id,
          content: result,
        });
      }

      // Get final response with tool results (streaming)
      const stream = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: fullMessages,
        stream: true,
        max_tokens: 500,
      });

      // Return streaming response
      const encoder = new TextEncoder();
      const readable = new ReadableStream({
        async start(controller) {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) {
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ content })}\n\n`)
              );
            }
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        },
      });

      return new Response(readable, {
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      });
    }

    // No tool calls — stream the response directly
    // Re-do with streaming
    const stream = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: fullMessages,
      stream: true,
      max_tokens: 500,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content;
          if (content) {
            controller.enqueue(
              encoder.encode(`data: ${JSON.stringify({ content })}\n\n`)
            );
          }
        }
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
