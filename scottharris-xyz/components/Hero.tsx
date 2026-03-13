import Image from "next/image";
import { bio } from "@/data/bio";

export default function Hero({ children }: { children?: React.ReactNode }) {
  return (
    <section
      className="min-h-screen lg:h-screen flex flex-col items-center justify-between text-center relative z-[1]"
      style={{ padding: "clamp(80px, 9vh, 110px) 2rem 12px" }}
    >
      {/* Name + Blurb with headshot */}
      <div
        className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10 mt-6 lg:mt-10"
        style={{
          opacity: 0,
          animation: "fadeUp 0.8s 0.2s forwards",
        }}
      >
        {/* Headshot */}
        <div
          className="shrink-0"
          style={{
            width: "clamp(100px, 12vw, 150px)",
            height: "clamp(100px, 12vw, 150px)",
            borderRadius: "50%",
            overflow: "hidden",
            border: "3px solid var(--primary)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.12)",
          }}
        >
          <Image
            src="/Headshot_2.jpg"
            alt="Scott C. Harris"
            width={150}
            height={150}
            priority
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          />
        </div>

        <div className="flex flex-col items-center sm:items-start">
          <h1
            className="serif font-normal leading-[1.05]"
            style={{
              fontSize: "clamp(3.2rem, 8vw, 5.5rem)",
              color: "var(--primary)",
              transition: "color 0.3s",
            }}
          >
            {bio.name}
          </h1>

          <p
            className="max-w-[700px] mt-3"
            style={{
              fontSize: "clamp(1.15rem, 1.8vw, 1.4rem)",
              color: "var(--text-secondary)",
              transition: "color 0.3s",
              lineHeight: 1.75,
              textAlign: "left",
            }}
          >
            Welcome to my website! I&apos;m a scientist, programmer, and inventor. Chat with my AI to learn more!
          </p>
        </div>
      </div>

      {/* Children slot */}
      {children}

      {/* Scroll indicator */}
      <a
        href="#projects"
        className="mt-2 block shrink-0"
        style={{ opacity: 0, animation: "fadeUp 0.6s 1.2s forwards" }}
        aria-label="Scroll to projects"
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--text-secondary)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ animation: "bounce 2.5s ease-in-out infinite" }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </a>
    </section>
  );
}
