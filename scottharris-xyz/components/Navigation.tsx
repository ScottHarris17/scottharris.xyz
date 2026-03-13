"use client";

import { useState } from "react";
import Link from "next/link";
import { useTheme } from "@/components/ThemeProvider";

const navLinks = [
  { label: "Chat", href: "/" },
  { label: "Projects", href: "/#projects" },
  { label: "CV", href: "/cv" },
];

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

export default function Navigation() {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = () => setMobileOpen(false);

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "var(--nav-bg)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid var(--nav-border)",
        transition: "background-color 0.3s, border-color 0.3s",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <Link
          href="/"
          className="serif no-underline"
          style={{ fontSize: "1.8rem", color: "var(--primary)", transition: "color 0.3s" }}
        >
          Scott Harris
        </Link>

        {/* Center links — hidden on mobile */}
        <div className="hidden md:flex items-center gap-9">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative font-sans font-medium no-underline pb-[2px]"
              style={{
                fontSize: "var(--font-base)",
                color: "var(--text-secondary)",
                transition: "color 0.25s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--primary)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--text-secondary)")
              }
            >
              {link.label}
              <span
                className="absolute bottom-[-2px] left-0 h-[1.5px] w-0 group-hover:w-full"
                style={{
                  background: "var(--primary)",
                  transition: "width 0.3s ease",
                }}
              />
            </a>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex items-center cursor-pointer"
            style={{
              background: "none",
              border: "1px solid var(--card-border)",
              borderRadius: "8px",
              padding: "6px 8px",
              color: "var(--text-secondary)",
              transition: "border-color 0.3s, color 0.3s, background 0.3s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--primary)";
              e.currentTarget.style.color = "var(--primary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--card-border)";
              e.currentTarget.style.color = "var(--text-secondary)";
            }}
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>

          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Menu"
            className="flex md:hidden flex-col gap-1 cursor-pointer"
            style={{ background: "none", border: "none", padding: "4px" }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  width: "22px",
                  height: "2px",
                  background: "var(--primary)",
                  borderRadius: "1px",
                  transition: "background 0.3s",
                }}
              />
            ))}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          style={{
            position: "absolute",
            top: "64px",
            left: 0,
            right: 0,
            background: "var(--nav-bg)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderBottom: "1px solid var(--nav-border)",
            padding: "1rem 2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMobile}
              className="font-sans no-underline"
              style={{
                fontSize: "var(--font-md)",
                fontWeight: 500,
                color: "var(--text-secondary)",
                padding: "0.5rem 0",
                transition: "color 0.25s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--primary)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
