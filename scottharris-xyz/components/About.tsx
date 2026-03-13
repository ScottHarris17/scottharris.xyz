import { bio } from "@/data/bio";

export default function About() {
  return (
    <section
      id="about"
      className="py-[100px] relative z-[1]"
      style={{ background: "var(--about-bg)", transition: "background 0.3s" }}
    >
      <div className="max-w-[960px] mx-auto px-8 text-center">
        {/* Pull quote */}
        <p
          className="serif italic leading-[1.5] mb-8"
          style={{
            fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
            color: "var(--primary)",
            transition: "color 0.3s",
          }}
        >
          &ldquo;{bio.quote}&rdquo;
        </p>

        {/* Bio */}
        <p
          className="leading-[1.85] mb-12"
          style={{ fontSize: "var(--font-base)", color: "var(--text-secondary)", transition: "color 0.3s" }}
        >
          {bio.bioText}
        </p>

        {/* Stats row */}
        <div className="flex justify-center gap-14 flex-wrap">
          {bio.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="serif font-normal leading-[1.1]"
                style={{
                  fontSize: "2.8rem",
                  color: "var(--primary)",
                  transition: "color 0.3s",
                }}
              >
                {stat.value}
              </div>
              <div
                className="mono font-medium uppercase tracking-[0.12em] mt-1.5"
                style={{ fontSize: "var(--font-2xs)", color: "var(--text-secondary)", transition: "color 0.3s" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
