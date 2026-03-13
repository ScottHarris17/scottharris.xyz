"use client";

import { bio } from "@/data/bio";

export default function Footer() {
  return (
    <footer
      style={{ borderTop: "1px solid var(--footer-border)" }}
      className="text-center py-12 px-8 relative z-[1]"
    >
      <p
        className="mb-4"
        style={{ fontSize: "var(--font-xs)", color: "var(--text-secondary)", transition: "color 0.3s" }}
      >
        &copy; {new Date().getFullYear()} {bio.name}
      </p>
      <div className="flex justify-center gap-6 flex-wrap">
        {bio.socialLinks.map((link) => (
          <a
            key={link.platform}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline transition-colors duration-250"
            style={{ fontSize: "var(--font-xs)", color: "var(--text-secondary)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--primary)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--text-secondary)")
            }
          >
            {link.platform}
          </a>
        ))}
      </div>
    </footer>
  );
}
