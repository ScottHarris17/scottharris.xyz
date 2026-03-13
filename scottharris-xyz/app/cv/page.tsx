import { Metadata } from "next";
import { cvData } from "@/data/cv";
import Link from "next/link";

export const metadata: Metadata = {
  title: "CV — Scott C. Harris, PhD",
  description:
    "Academic curriculum vitae of Scott C. Harris, PhD — Computational Neuroscientist & AI Engineer",
};

const TOC_ITEMS = [
  { id: "education", label: "Education" },
  { id: "positions", label: "Positions" },
  { id: "built", label: "Things I Built" },
  { id: "awards", label: "Awards" },
  { id: "publications", label: "Publications" },
  { id: "patents", label: "Patents" },
  { id: "talks", label: "Invited Talks" },
  { id: "posters", label: "Posters" },
  { id: "skills", label: "Skills" },
  { id: "teaching", label: "Teaching" },
  { id: "coursework", label: "Coursework" },
  { id: "portfolios", label: "Portfolios" },
];

/* ─── Section wrapper ─── */
function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} style={{ marginTop: "3rem", scrollMarginTop: "5rem" }}>
      <h2
        className="serif"
        style={{
          fontSize: "var(--font-2xl)",
          color: "var(--primary)",
          marginBottom: "1.25rem",
          paddingBottom: "0.5rem",
          borderBottom: "2px solid var(--card-border)",
          fontWeight: 400,
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  );
}

/* ─── Entry row ─── */
function Entry({
  period,
  children,
}: {
  period: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "160px 1fr",
        gap: "1rem",
        marginBottom: "1.25rem",
        alignItems: "start",
      }}
      className="cv-entry"
    >
      <span
        className="mono"
        style={{
          fontSize: "var(--font-xs)",
          color: "var(--primary)",
          whiteSpace: "nowrap",
          paddingTop: "3px",
          fontWeight: 500,
        }}
      >
        {period}
      </span>
      <div>{children}</div>
    </div>
  );
}

export default function CvPage() {
  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "2rem 1.5rem 4rem",
      }}
    >
      {/* ── Back link ── */}
      <Link
        href="/"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.35rem",
          fontSize: "var(--font-sm)",
          color: "var(--text-secondary)",
          textDecoration: "none",
          marginBottom: "2rem",
          transition: "color 0.2s",
        }}
        className="cv-back-link"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        Back to Home
      </Link>

      {/* ── Header ── */}
      <header style={{ marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
          <div>
            <p
              className="mono font-medium uppercase tracking-[0.15em]"
              style={{
                fontSize: "var(--font-xs)",
                color: "var(--primary)",
                marginBottom: "0.5rem",
              }}
            >
              Curriculum Vitae
            </p>
            <h1
              className="serif"
              style={{
                fontSize: "clamp(2.4rem, 5vw, 3.2rem)",
                color: "var(--primary)",
                lineHeight: 1.15,
                marginBottom: "0",
                fontWeight: 400,
              }}
            >
              {cvData.name}
            </h1>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "center" }}>
            <a href="/media/CV_ScottHarris.pdf" target="_blank" rel="noopener noreferrer" className="cv-download-btn"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1.2rem", fontSize: "var(--font-xs)", fontWeight: 600, borderRadius: "8px", background: "var(--primary)", color: "#fff", textDecoration: "none", transition: "background 0.2s, transform 0.2s, box-shadow 0.2s", boxShadow: "0 2px 8px rgba(15,118,110,0.25)" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              PDF
            </a>
            <a href="/api/cv/download" className="cv-download-btn"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1.2rem", fontSize: "var(--font-xs)", fontWeight: 600, borderRadius: "8px", background: "var(--primary)", color: "#fff", textDecoration: "none", transition: "background 0.2s, transform 0.2s, box-shadow 0.2s", boxShadow: "0 2px 8px rgba(15,118,110,0.25)" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              DOCX
            </a>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1.25rem",
            fontSize: "var(--font-sm)",
            color: "var(--text-secondary)",
            alignItems: "center",
            marginTop: "0.75rem",
          }}
        >
          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            <a href={`mailto:${cvData.email}`} style={{ color: "var(--text-secondary)", textDecoration: "none" }}>
              {cvData.email}
            </a>
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            {cvData.address}
          </span>
          <a href="https://www.linkedin.com/in/scott-harris-phd/" target="_blank" rel="noopener noreferrer"
            style={{ color: "var(--text-secondary)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            LinkedIn
          </a>
          <a href="https://github.com/scottharris17" target="_blank" rel="noopener noreferrer"
            style={{ color: "var(--text-secondary)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
            GitHub
          </a>
        </div>
      </header>

      {/* ── Two-column layout: TOC sidebar + content ── */}
      <div className="flex gap-10">
        {/* TOC sidebar — large screens only */}
        <aside
          className="hidden lg:block shrink-0 sticky self-start"
          style={{ width: "180px", top: "5rem" }}
        >
          <nav className="flex flex-col gap-1">
            <p className="mono font-semibold uppercase tracking-[0.1em] mb-2" style={{ fontSize: "var(--font-2xs)", color: "var(--primary)" }}>
              Contents
            </p>
            {TOC_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="cv-toc-link"
                style={{
                  fontSize: "var(--font-xs)",
                  color: "var(--text-secondary)",
                  textDecoration: "none",
                  padding: "0.3rem 0.6rem",
                  borderRadius: "6px",
                  transition: "color 0.2s, background 0.2s",
                }}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* ── Education ── */}
          <Section id="education" title="Education">
            {cvData.education.map((edu, i) => (
              <Entry key={i} period={edu.period}>
                <div style={{ fontWeight: 600, fontSize: "var(--font-base)", color: "var(--text)" }}>{edu.degree}</div>
                <div style={{ color: "var(--text-secondary)", fontSize: "var(--font-sm)", marginTop: "0.15rem" }}>
                  {edu.institution}, {edu.location}
                </div>
                {edu.details && (
                  <div style={{ fontSize: "var(--font-sm)", color: "var(--text)", marginTop: "0.4rem", lineHeight: 1.6 }}>
                    {edu.details}
                  </div>
                )}
              </Entry>
            ))}
          </Section>

          {/* ── Professional Positions ── */}
          <Section id="positions" title="Professional Positions">
            {cvData.positions.map((pos, i) => (
              <Entry key={i} period={pos.period}>
                <div style={{ fontSize: "var(--font-base)" }}>
                  <span style={{ fontWeight: 600, color: "var(--text)" }}>{pos.title}</span>
                  <span style={{ color: "var(--text-secondary)" }}> — </span>
                  <span style={{ fontStyle: "italic", color: "var(--text-secondary)" }}>
                    {pos.organization}
                  </span>
                </div>
                <div style={{ fontSize: "var(--font-sm)", color: "var(--text)", marginTop: "0.35rem", lineHeight: 1.65 }}>
                  {pos.description}
                </div>
              </Entry>
            ))}
          </Section>

          {/* ── Things I Have Built ── */}
          <Section id="built" title="Things I Have Built">
            <div style={{ display: "grid", gap: "0.75rem" }}>
              {cvData.software.map((sw, i) => {
                const cardContent = (
                  <>
                    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "0.5rem", marginBottom: "0.4rem" }}>
                      <span style={{ fontWeight: 700, fontSize: "var(--font-md)", color: "var(--text)" }}>{sw.name}</span>
                      {sw.url && (
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      )}
                      {sw.comingSoon && (
                        <span className="mono" style={{ fontSize: "var(--font-2xs)", fontWeight: 500, padding: "0.15rem 0.6rem", borderRadius: "4px", background: "var(--pill-bg)", color: "var(--primary)", whiteSpace: "nowrap" }}>
                          Coming Soon
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: "var(--font-sm)", color: "var(--text)", lineHeight: 1.6, marginBottom: "0.4rem" }}>
                      {sw.description}
                    </div>
                    <div style={{ fontSize: "var(--font-xs)", color: "var(--text-secondary)", marginBottom: sw.outcome ? "0.4rem" : 0 }}>
                      {sw.tools}
                    </div>
                    {sw.outcome && (
                      <div style={{ fontSize: "var(--font-sm)", color: "var(--primary)", fontWeight: 600 }}>
                        {sw.outcome}
                      </div>
                    )}
                  </>
                );

                const cardStyle: React.CSSProperties = {
                  padding: "1.25rem 1.5rem",
                  borderRadius: "12px",
                  background: "var(--card-bg)",
                  border: "1px solid var(--card-border)",
                  transition: "box-shadow 0.2s, border-color 0.2s",
                  display: "block",
                  textDecoration: "none",
                  color: "inherit",
                };

                return sw.url ? (
                  <a key={i} href={sw.url} target="_blank" rel="noopener noreferrer" className="cv-software-card" style={cardStyle}>
                    {cardContent}
                  </a>
                ) : (
                  <div key={i} style={cardStyle}>
                    {cardContent}
                  </div>
                );
              })}
            </div>
          </Section>

          {/* ── Fellowships & Awards ── */}
          <Section id="awards" title="Fellowships & Awards">
            {cvData.awards.map((a, i) => (
              <Entry key={i} period={a.period}>
                <div style={{ fontWeight: 600, fontSize: "var(--font-base)", color: "var(--text)" }}>{a.title}</div>
                {a.details && (
                  <div style={{ fontSize: "var(--font-sm)", color: "var(--text)", marginTop: "0.2rem" }}>
                    {a.details}
                  </div>
                )}
              </Entry>
            ))}
          </Section>

          {/* ── Publications ── */}
          <Section id="publications" title="Publications">
            <ol style={{ listStyleType: "decimal", paddingLeft: "1.5rem", margin: 0 }}>
              {cvData.publications.map((pub, i) => (
                <li key={i} style={{ fontSize: "var(--font-sm)", lineHeight: 1.7, marginBottom: "0.75rem", color: "var(--text)" }}>
                  {pub.citation}
                  {pub.status && (
                    <span className="mono" style={{ display: "inline-block", marginLeft: "0.5rem", padding: "0.15rem 0.6rem", fontSize: "var(--font-2xs)", fontWeight: 500, borderRadius: "4px", background: "var(--pill-bg)", color: "var(--primary)" }}>
                      {pub.status}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </Section>

          {/* ── Patents ── */}
          <Section id="patents" title="Patents">
            <ol style={{ listStyleType: "decimal", paddingLeft: "1.5rem", margin: 0 }}>
              {cvData.patents.map((p, i) => (
                <li key={i} style={{ fontSize: "var(--font-sm)", lineHeight: 1.7, marginBottom: "0.5rem", color: "var(--text)" }}>
                  {p.citation}
                </li>
              ))}
            </ol>
          </Section>

          {/* ── Invited Talks ── */}
          <Section id="talks" title="Invited Talks">
            <ol style={{ listStyleType: "decimal", paddingLeft: "1.5rem", margin: 0 }}>
              {cvData.invitedTalks.map((t, i) => (
                <li key={i} style={{ fontSize: "var(--font-sm)", lineHeight: 1.7, marginBottom: "0.5rem", color: "var(--text)" }}>
                  {t.citation}
                </li>
              ))}
            </ol>
          </Section>

          {/* ── Poster Presentations ── */}
          <Section id="posters" title="Poster Presentations">
            <ol style={{ listStyleType: "decimal", paddingLeft: "1.5rem", margin: 0 }}>
              {cvData.posterPresentations.map((p, i) => (
                <li key={i} style={{ fontSize: "var(--font-sm)", lineHeight: 1.7, marginBottom: "0.5rem", color: "var(--text)" }}>
                  {p.citation}
                </li>
              ))}
            </ol>
          </Section>

          {/* ── Skills ── */}
          <Section id="skills" title="Skills">
            <div style={{ display: "grid", gap: "0.75rem" }}>
              {cvData.skills.map((s, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: "1rem", fontSize: "var(--font-sm)" }} className="cv-entry">
                  <span style={{ fontWeight: 600, color: "var(--primary)" }}>{s.category}</span>
                  <span style={{ color: "var(--text)", lineHeight: 1.6 }}>{s.items}</span>
                </div>
              ))}
            </div>
          </Section>

          {/* ── Teaching ── */}
          <Section id="teaching" title="Teaching">
            {cvData.teaching.map((t, i) => (
              <Entry key={i} period={t.period}>
                <div style={{ fontSize: "var(--font-sm)", color: "var(--text)" }}>{t.role}</div>
              </Entry>
            ))}
          </Section>

          {/* ── Coursework ── */}
          <Section id="coursework" title="Coursework">
            <p style={{ fontSize: "var(--font-sm)", lineHeight: 1.7, color: "var(--text)", margin: 0 }}>
              {cvData.coursework}
            </p>
          </Section>

          {/* ── Portfolios ── */}
          <Section id="portfolios" title="Portfolios">
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
              {cvData.portfolios
                .filter((p) => p.name !== "Personal Website")
                .map((p, i) => (
                  <a key={i} href={p.url} target="_blank" rel="noopener noreferrer"
                    style={{ fontSize: "var(--font-sm)", color: "var(--primary)", textDecoration: "none", padding: "0.5rem 1rem", borderRadius: "8px", border: "1px solid var(--card-border)", transition: "border-color 0.2s, background 0.2s", fontWeight: 500 }}>
                    {p.name} &rarr;
                  </a>
                ))}
            </div>
          </Section>
        </div>
      </div>

      {/* ── Styles ── */}
      <style>{`
        .cv-back-link:hover { color: var(--primary) !important; }
        .cv-download-btn:hover { filter: brightness(1.12); transform: translateY(-1px); }
        .cv-software-card:hover { border-color: var(--primary) !important; box-shadow: 0 2px 12px rgba(15, 118, 110, 0.15); }
        .cv-toc-link:hover { color: var(--primary) !important; background: var(--pill-bg); }
        @media (max-width: 640px) {
          .cv-entry { grid-template-columns: 1fr !important; gap: 0.15rem !important; }
        }
        @media print {
          .cv-back-link, .cv-download-btn { display: none !important; }
          body { background-image: none !important; background: #fff !important; color: #000 !important; }
          section { break-inside: avoid; }
          a { color: #000 !important; }
          h1, h2 { color: #1a1a1a !important; border-color: #ccc !important; }
          * { box-shadow: none !important; }
        }
      `}</style>
    </div>
  );
}
