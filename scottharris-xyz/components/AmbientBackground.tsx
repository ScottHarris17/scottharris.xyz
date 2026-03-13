"use client";

export default function AmbientBackground() {
  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ display: "var(--ambient-display)" }}
    >
      <div
        className="absolute"
        style={{
          width: "120%",
          height: "120%",
          top: "-10%",
          left: "-10%",
          borderRadius: "50%",
          background: `
            radial-gradient(ellipse 60% 50% at 25% 30%, rgba(13, 59, 56, 0.18) 0%, transparent 70%),
            radial-gradient(ellipse 50% 60% at 75% 70%, rgba(46, 16, 101, 0.10) 0%, transparent 70%)
          `,
          animation: "drift 40s ease-in-out infinite alternate",
        }}
      />
      <div
        className="absolute"
        style={{
          width: "120%",
          height: "120%",
          top: "-10%",
          left: "-10%",
          borderRadius: "50%",
          background: `
            radial-gradient(ellipse 55% 45% at 60% 20%, rgba(5, 46, 22, 0.16) 0%, transparent 70%),
            radial-gradient(ellipse 40% 55% at 30% 80%, rgba(13, 59, 56, 0.10) 0%, transparent 70%)
          `,
          animation: "drift 40s ease-in-out infinite alternate-reverse",
          animationDelay: "-20s",
        }}
      />
    </div>
  );
}
