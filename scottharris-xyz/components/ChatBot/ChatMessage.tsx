"use client";

import ReactMarkdown from "react-markdown";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  delay?: number;
}

export default function ChatMessage({
  role,
  content,
  delay = 0,
}: ChatMessageProps) {
  const isUser = role === "user";

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
      )}
    </div>
  );
}
