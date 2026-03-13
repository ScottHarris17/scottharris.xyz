"use client";

import { useEffect, useRef, useState } from "react";
import type { Project, ProjectCategory } from "@/data/projects";

const categoryColors: Record<
  ProjectCategory,
  { bg: string; color: string }
> = {
  science: { bg: "rgba(15,118,110,0.1)", color: "var(--primary)" },
  software: { bg: "rgba(217,119,6,0.1)", color: "var(--accent)" },
  writing: { bg: "rgba(139,92,246,0.1)", color: "var(--violet)" },
  interactive: { bg: "rgba(71,85,105,0.1)", color: "var(--text-secondary)" },
};

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const delay = index * 80;
          const timer = setTimeout(() => setVisible(true), delay);
          observer.unobserve(el);
          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  const pill = categoryColors[project.category];
  const isExternal = project.url.startsWith("http");
  const hasUrl = project.url !== "#";

  const cardStyle: React.CSSProperties = {
    backgroundColor: "var(--card-bg)",
    border: hovered && hasUrl
      ? "1px solid var(--primary)"
      : "1px solid var(--card-border)",
    borderRadius: "14px",
    padding: "1.75rem",
    boxShadow: hovered ? "var(--card-shadow-hover)" : "var(--card-shadow)",
    opacity: visible ? 1 : 0,
    transform: visible
      ? hovered
        ? "translateY(-3px)"
        : "translateY(0)"
      : "translateY(24px)",
    transition: visible
      ? "opacity 0.6s ease, transform 0.6s ease, box-shadow 0.3s, border-color 0.3s, background-color 0.3s"
      : "none",
    display: "block",
    textDecoration: "none",
    color: "inherit",
    cursor: hasUrl ? "pointer" : "default",
  };

  const content = (
    <>
      <span
        className="mono font-semibold uppercase tracking-[0.08em] inline-block mb-4"
        style={{
          fontSize: "var(--font-2xs)",
          padding: "0.25rem 0.7rem",
          borderRadius: "9999px",
          backgroundColor: pill.bg,
          color: pill.color,
        }}
      >
        {project.category}
      </span>

      <h3
        className="serif mb-2"
        style={{ fontSize: "var(--font-lg)", lineHeight: 1.3 }}
      >
        {project.title}
      </h3>

      <p
        className="mb-4"
        style={{
          fontSize: "var(--font-sm)",
          color: "var(--text-secondary)",
          lineHeight: 1.6,
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {project.description}
      </p>

      {hasUrl && (
        <span style={{ fontSize: "var(--font-sm)", color: "var(--primary)", fontWeight: 500 }}>
          View &rarr;
        </span>
      )}
    </>
  );

  const sharedProps = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    style: cardStyle,
  };

  if (hasUrl) {
    return (
      <a
        ref={cardRef as React.RefObject<HTMLAnchorElement>}
        href={project.url}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        {...sharedProps}
      >
        {content}
      </a>
    );
  }

  return (
    <div ref={cardRef as React.RefObject<HTMLDivElement>} {...sharedProps}>
      {content}
    </div>
  );
}
