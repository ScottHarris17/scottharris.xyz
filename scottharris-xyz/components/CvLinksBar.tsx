"use client";

import { useState } from "react";
import Link from "next/link";
import { bio } from "@/data/bio";

export default function CvLinksBar() {
  const [viewHovered, setViewHovered] = useState(false);
  const [dlHovered, setDlHovered] = useState(false);

  return (
    <div
      id="resume"
      className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4"
      style={{
        opacity: 0,
        animation: "fadeUp 0.8s 0.8s forwards",
      }}
    >
      {/* View Full CV — primary CTA */}
      <Link
        href="/cv"
        className="inline-flex items-center justify-center gap-2.5 font-semibold rounded-xl"
        style={{
          fontSize: "clamp(1.05rem, 1.4vw, 1.2rem)",
          padding: "1rem 2.4rem",
          background: viewHovered ? "var(--accent)" : "var(--primary)",
          color: "#ffffff",
          boxShadow: viewHovered
            ? "0 4px 20px rgba(217, 119, 6, 0.4)"
            : "0 4px 20px rgba(15, 118, 110, 0.3)",
          transform: viewHovered ? "translateY(-2px)" : "translateY(0)",
          transition: "all 0.25s ease",
          textDecoration: "none",
          whiteSpace: "nowrap",
          letterSpacing: "0.01em",
        }}
        onMouseEnter={() => setViewHovered(true)}
        onMouseLeave={() => setViewHovered(false)}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
        View Full CV
      </Link>

      {/* Download CV — secondary */}
      <a
        href={bio.cvUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2.5 font-semibold rounded-xl"
        style={{
          fontSize: "clamp(1.05rem, 1.4vw, 1.2rem)",
          padding: "1rem 2.4rem",
          background: "transparent",
          color: dlHovered ? "var(--primary-light)" : "var(--primary)",
          border: dlHovered
            ? "2px solid var(--primary-light)"
            : "2px solid var(--primary)",
          boxShadow: dlHovered
            ? "0 4px 16px rgba(15, 118, 110, 0.2)"
            : "none",
          transform: dlHovered ? "translateY(-2px)" : "translateY(0)",
          transition: "all 0.25s ease",
          textDecoration: "none",
          whiteSpace: "nowrap",
          letterSpacing: "0.01em",
        }}
        onMouseEnter={() => setDlHovered(true)}
        onMouseLeave={() => setDlHovered(false)}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        Download CV
      </a>
    </div>
  );
}
