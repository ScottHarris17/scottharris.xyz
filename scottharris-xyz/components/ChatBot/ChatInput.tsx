"use client";

import { useState, useCallback, type KeyboardEvent, type FormEvent } from "react";

interface ChatInputProps {
  onSend?: (message: string) => void;
  disabled?: boolean;
  isStreaming?: boolean;
}

export default function ChatInput({
  onSend,
  disabled = false,
  isStreaming = false,
}: ChatInputProps) {
  const [value, setValue] = useState("");

  const inactive = disabled || isStreaming;

  const handleSubmit = useCallback(() => {
    const trimmed = value.trim();
    if (!trimmed || inactive) return;
    onSend?.(trimmed);
    setValue("");
  }, [value, inactive, onSend]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit],
  );

  const handleFormSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      handleSubmit();
    },
    [handleSubmit],
  );

  return (
    <form
      onSubmit={handleFormSubmit}
      className="flex gap-3"
      style={{
        padding: "1rem 1.5rem",
        borderTop: "1px solid var(--card-border)",
        opacity: inactive ? 0.5 : 1,
        transition: "opacity 0.2s",
      }}
    >
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={inactive}
        placeholder="Ask about Scott..."
        className="flex-1 font-sans"
        style={{
          padding: "0.7rem 1rem",
          borderRadius: 10,
          background: "var(--input-bg)",
          border: "1px solid var(--input-border)",
          color: "var(--text)",
          fontSize: "var(--font-sm)",
          outline: "none",
          transition: "border-color 0.2s, box-shadow 0.2s",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "var(--primary)";
          e.currentTarget.style.boxShadow =
            "0 0 0 3px rgba(15,118,110,0.1)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "var(--input-border)";
          e.currentTarget.style.boxShadow = "none";
        }}
      />

      <button
        type="submit"
        disabled={inactive}
        aria-label="Send message"
        style={{
          padding: "0.7rem 1rem",
          borderRadius: 10,
          background: "var(--primary)",
          color: "#fff",
          cursor: inactive ? "default" : "pointer",
          border: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "background 0.2s",
          flexShrink: 0,
        }}
        onMouseEnter={(e) => {
          if (!inactive) {
            e.currentTarget.style.background = "var(--primary-light)";
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "var(--primary)";
        }}
      >
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
      </button>

      {/* Placeholder styling — CSS-in-JS workaround for pseudo-element */}
      <style>{`
        form input::placeholder {
          color: var(--text-secondary);
          opacity: 0.5;
        }
      `}</style>
    </form>
  );
}
