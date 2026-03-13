import Hero from "@/components/Hero";
import CvLinksBar from "@/components/CvLinksBar";
import ChatPanel from "@/components/ChatBot/ChatPanel";
import SocialLinks from "@/components/SocialLinks";
import ProjectGrid from "@/components/Projects/ProjectGrid";
import About from "@/components/About";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Hero>
        {/* Social links */}
        <div
          style={{
            opacity: 0,
            animation: "fadeUp 0.8s 0.5s forwards",
          }}
        >
          <SocialLinks />
        </div>

        {/* Chat panel — constrained width */}
        <div
          className="w-full mt-4"
          style={{
            maxWidth: 880,
            opacity: 0,
            animation: "fadeUp 0.8s 0.65s forwards",
          }}
        >
          <ChatPanel />
        </div>

        {/* CV action buttons */}
        <CvLinksBar />
      </Hero>
      <ProjectGrid />
      <About />
      <Footer />
    </>
  );
}
