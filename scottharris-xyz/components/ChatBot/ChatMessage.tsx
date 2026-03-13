"use client";

import ReactMarkdown from "react-markdown";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  delay?: number;
  voiceMode?: boolean;
  isSpeaking?: boolean;
  onPlayVoice?: () => void;
}

export default function ChatMessage({
  role,
  content,
  delay = 0,
  voiceMode,
  isSpeaking,
  onPlayVoice,
}: ChatMessageProps) {
  const isUser = role === "user";
  const showPlayButton = !isUser && voiceMode && content && onPlayVoice;

  return (
    <div
      className="chat-message"
      style={{
        maxWidth: "88%",
        lineHeight: 1.65,
        fontSize: "var(--font-sm)",
        padding: "0.75rem 1rem",
        borderRadius: 14,
        opacity: 0,
        animation: `msgIn 0.5s ${delay}s forwards`,
        alignSelf: isUser ? "flex-end" : "flex-start",
        background: isUser
          ? "var(--chat-user-bg)"
          : "var(--chat-ai-bg)",
        border: `1px solid ${
          isUser ? "var(--chat-user-border)" : "var(--chat-ai-border)"
        }`,
        borderBottomRightRadius: isUser ? 4 : 14,
        borderBottomLeftRadius: isUser ? 14 : 4,
        color: isUser ? "var(--text)" : "var(--text-secondary)",
        textAlign: isUser ? ("right" as const) : ("left" as const),
      }}
    >
      {isUser ? (
        content
      ) : (
        <>
          <ReactMarkdown
            components={{
              a: ({ href, children }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "var(--primary)",
                    fontWeight: 500,
                    textDecoration: "none",
                  }}
                >
                  {children}
                </a>
              ),
              p: ({ children }) => (
                <p style={{ margin: "0.25rem 0" }}>{children}</p>
              ),
              ul: ({ children }) => (
                <ul style={{ margin: "0.25rem 0", paddingLeft: "1.25rem", listStyleType: "disc" }}>
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol style={{ margin: "0.25rem 0", paddingLeft: "1.25rem", listStyleType: "decimal" }}>
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li style={{ marginBottom: "0.15rem" }}>{children}</li>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
          {showPlayButton && (
            <button
              onClick={onPlayVoice}
              disabled={isSpeaking}
              title={isSpeaking ? "Speaking..." : "Play voice"}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.25rem",
                marginTop: "0.4rem",
                padding: "0.2rem 0.5rem",
                fontSize: "var(--font-2xs)",
                color: isSpeaking ? "var(--muted)" : "var(--primary)",
                background: "none",
                border: "none",
                cursor: isSpeaking ? "default" : "pointer",
                opacity: isSpeaking ? 0.5 : 0.7,
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => { if (!isSpeaking) e.currentTarget.style.opacity = "1"; }}
              onMouseLeave={(e) => { if (!isSpeaking) e.currentTarget.style.opacity = "0.7"; }}
            >
              {isSpeaking ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                </svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              )}
              {isSpeaking ? "Playing..." : "Play"}
            </button>
          )}
        </>
      )}
    </div>
  );
}
