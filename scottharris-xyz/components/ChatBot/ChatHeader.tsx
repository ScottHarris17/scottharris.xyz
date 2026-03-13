export default function ChatHeader() {
  return (
    <div
      className="flex items-center gap-2.5"
      style={{
        padding: "1rem 1.5rem",
        borderBottom: "1px solid var(--card-border)",
      }}
    >
      {/* Pulsing status dot */}
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "var(--primary)",
          animation: "pulse 2s ease-in-out infinite",
          flexShrink: 0,
        }}
      />

      {/* Label */}
      <span
        className="mono"
        style={{
          fontSize: "var(--font-sm)",
          fontWeight: 500,
          color: "var(--primary)",
        }}
      >
        AI Scott
      </span>

      <span
        className="font-sans"
        style={{
          fontSize: "var(--font-sm)",
          color: "var(--text-secondary)",
          marginLeft: "0.25rem",
        }}
      >
        &mdash; Ask me anything
      </span>
    </div>
  );
}
