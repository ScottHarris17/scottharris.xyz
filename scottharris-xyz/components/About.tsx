import { bio } from "@/data/bio";

export default function About() {
  return (
    <section
      id="about"
      className="py-[100px] relative z-[1]"
      style={{ background: "var(--about-bg)", transition: "background 0.3s" }}
    >
      <div className="max-w-[960px] mx-auto px-8 text-center">
        <h2
          className="serif text-center mb-6"
          style={{
            fontSize: "clamp(2.6rem, 5vw, 3.6rem)",
            transition: "color 0.3s",
          }}
        >
          About Me
        </h2>

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
