"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import ChatHeader from "@/components/ChatBot/ChatHeader";
import ChatMessage from "@/components/ChatBot/ChatMessage";
import ChatInput from "@/components/ChatBot/ChatInput";

const DEMO_MESSAGES: {
  role: "user" | "assistant";
  content: string;
  delay: number;
}[] = [
  {
    role: "assistant",
    content: "Hey! I'm AI Scott \u2014 ask me anything about my work, projects, or background!",
    delay: 0.4,
  },
];

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLive, setIsLive] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [voiceMode, setVoiceMode] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const messagesRef = useRef<Message[]>(messages);
  messagesRef.current = messages;

  const voiceModeRef = useRef(voiceMode);
  voiceModeRef.current = voiceMode;

  // ── Auto-scroll ──────────────────────────────────────────────────────
  const scrollToBottom = useCallback(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    if (isLive) scrollToBottom();
  }, [messages, isLive, scrollToBottom]);

  // ── Cleanup audio on unmount ─────────────────────────────────────────
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // ── TTS playback ────────────────────────────────────────────────────
  const speakText = useCallback(async (text: string) => {
    try {
      // Stop any currently playing audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      setIsSpeaking(true);

      const response = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        setIsSpeaking(false);
        if (response.status === 429) {
          setError("Voice quota reached for today — turning off voice mode.");
          setVoiceMode(false);
        }
        return;
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.onended = () => {
        setIsSpeaking(false);
        URL.revokeObjectURL(audioUrl);
        audioRef.current = null;
      };

      audio.onerror = () => {
        setIsSpeaking(false);
        URL.revokeObjectURL(audioUrl);
        audioRef.current = null;
      };

      await audio.play();
    } catch {
      setIsSpeaking(false);
    }
  }, []);

  // ── Send handler ─────────────────────────────────────────────────────
  const handleSend = useCallback(
    async (text: string) => {
      if (isStreaming) return;

      const wasLive = isLive;
      let currentMessages: Message[];

      if (!wasLive) {
        setIsLive(true);
        currentMessages = [{ role: "user", content: text }];
      } else {
        currentMessages = [...messagesRef.current, { role: "user", content: text }];
      }

      const withPlaceholder: Message[] = [
        ...currentMessages,
        { role: "assistant", content: "" },
      ];
      setMessages(withPlaceholder);
      setIsStreaming(true);
      setError(null);

      try {
        const apiMessages = currentMessages.slice(-20).map((m) => ({
          role: m.role,
          content: m.content,
        }));

        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: apiMessages,
            voiceMode: voiceModeRef.current,
          }),
        });

        if (!response.ok) {
          if (response.status === 429) {
            throw new Error(
              "Please wait a moment before sending another message.",
            );
          }
          const body = await response.json().catch(() => null);
          throw new Error(
            body?.error || `Something went wrong (${response.status}).`,
          );
        }

        const reader = response.body?.getReader();
        if (!reader) throw new Error("No response stream available.");

        const decoder = new TextDecoder();
        let accumulated = "";

        // eslint-disable-next-line no-constant-condition
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n");

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed || !trimmed.startsWith("data: ")) continue;

            const payload = trimmed.slice(6);
            if (payload === "[DONE]") continue;

            try {
              const parsed = JSON.parse(payload) as { content?: string };
              if (parsed.content) {
                accumulated += parsed.content;

                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1] = {
                    role: "assistant",
                    content: accumulated,
                  };
                  return updated;
                });
              }
            } catch {
              // Skip malformed SSE lines
            }
          }
        }

        setIsStreaming(false);

        // If voice mode is on, speak the completed response
        if (voiceModeRef.current && accumulated) {
          speakText(accumulated);
        }
      } catch (err: unknown) {
        const msg =
          err instanceof Error ? err.message : "Something went wrong.";
        setError(msg);
        setIsStreaming(false);

        setMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last && last.role === "assistant" && last.content === "") {
            return prev.slice(0, -1);
          }
          return prev;
        });
      }
    },
    [isLive, isStreaming, speakText],
  );

  // ── Typing indicator ───────────────────────────────────────────────
  const showTypingIndicator =
    isStreaming &&
    messages.length > 0 &&
    messages[messages.length - 1]?.role === "assistant" &&
    messages[messages.length - 1]?.content === "";

  // ── Render ───────────────────────────────────────────────────────────
  return (
    <div
      id="chat"
      className="w-full chat-panel-glass"
      style={{
        background: "var(--card-bg)",
        border: "1px solid var(--card-border)",
        borderTop: "2px solid var(--primary)",
        borderRadius: 16,
        overflow: "hidden",
        boxShadow: "var(--card-shadow)",
        opacity: 0,
        animation: "fadeUp 0.8s 0.6s forwards",
        transition: "background 0.3s, border-color 0.3s, box-shadow 0.3s",
      }}
    >
      <ChatHeader />

      {/* Messages area */}
      <div
        ref={messagesContainerRef}
        className="flex flex-col"
        style={{
          padding: "1.25rem 1.5rem",
          gap: "0.875rem",
          minHeight: 200,
          maxHeight: 560,
          overflowY: "auto",
        }}
      >
        {/* Spacer pushes messages to bottom when few */}
        <div style={{ marginTop: "auto" }} />
        {!isLive
          ? DEMO_MESSAGES.map((msg, i) => (
              <ChatMessage
                key={`demo-${i}`}
                role={msg.role}
                content={msg.content}
                delay={msg.delay}
              />
            ))
          : messages.map((msg, i) =>
              showTypingIndicator && i === messages.length - 1 ? (
                <div
                  key={`typing-${i}`}
                  style={{
                    maxWidth: "88%",
                    lineHeight: 1.65,
                    fontSize: "var(--font-sm)",
                    padding: "0.75rem 1rem",
                    borderRadius: 14,
                    alignSelf: "flex-start",
                    background: "var(--chat-ai-bg)",
                    border: "1px solid var(--chat-ai-border)",
                    borderBottomLeftRadius: 4,
                    color: "var(--text-secondary)",
                    display: "flex",
                    gap: 4,
                    alignItems: "center",
                  }}
                >
                  <span style={dotStyle(0)} />
                  <span style={dotStyle(0.2)} />
                  <span style={dotStyle(0.4)} />
                  <style>{`
                    @keyframes typingBounce {
                      0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
                      30% { transform: translateY(-4px); opacity: 1; }
                    }
                  `}</style>
                </div>
              ) : (
                <ChatMessage
                  key={`live-${i}`}
                  role={msg.role}
                  content={msg.content}
                  delay={0}
                />
              ),
            )}

        <div ref={messagesEndRef} />
      </div>

      {/* Error message */}
      {error && (
        <p
          style={{
            textAlign: "center",
            padding: "0 1.5rem 0.5rem",
            fontSize: "var(--font-xs)",
            color: "#e74c3c",
            margin: 0,
          }}
        >
          {error}
        </p>
      )}

      <ChatInput
        onSend={handleSend}
        disabled={false}
        isStreaming={isStreaming}
      />

      {/* Voice toggle + footnote */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.4rem",
          padding: "0.65rem 1.5rem 0.85rem",
        }}
      >
        <div style={{ position: "relative", display: "inline-flex" }}>
          <button
            onClick={() => {
              if (voiceMode && audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
                setIsSpeaking(false);
              }
              setVoiceMode((v) => !v);
            }}
            className="voice-toggle-btn"
            title="Voice is an AI-generated clone — not actually Scott speaking"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.45rem 1rem",
              fontSize: "var(--font-xs)",
              fontWeight: 600,
              borderRadius: "24px",
              border: voiceMode
                ? "2px solid var(--primary)"
                : "2px solid var(--card-border)",
              background: voiceMode ? "var(--pill-bg)" : "transparent",
              color: voiceMode ? "var(--primary)" : "var(--text-secondary)",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {isSpeaking ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                {!voiceMode && <line x1="23" y1="9" x2="17" y2="15" />}
                {!voiceMode && <line x1="17" y1="9" x2="23" y2="15" />}
                {voiceMode && <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />}
              </svg>
            )}
            {voiceMode ? (isSpeaking ? "Speaking..." : "Voice On") : "Let Me Speak!"}
          </button>
        </div>
        <span
          style={{
            fontSize: "var(--font-2xs)",
            color: "var(--muted)",
          }}
        >
          I built this agent to emulate myself... but it&apos;s not perfect
        </span>
      </div>
    </div>
  );
}

function dotStyle(delayS: number): React.CSSProperties {
  return {
    width: 6,
    height: 6,
    borderRadius: "50%",
    background: "var(--text-secondary)",
    animation: `typingBounce 1.2s ${delayS}s ease-in-out infinite`,
  };
}
