import { bio } from "@/data/bio";

export default function About() {
  return (
    <section
      id="about"
      className="py-[100px] relative z-[1]"
      style={{ background: "var(--about-bg)", transition: "background 0.3s" }}
    >
      <div className="max-w-[960px] mx-auto px-8 text-center">
        {/* Bio */}
        <p
          className="leading-[1.85]"
          style={{ fontSize: "var(--font-base)", color: "var(--text-secondary)", transition: "color 0.3s" }}
        >
          {bio.bioText}
        </p>
      </div>
    </section>
  );
}
