export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface Bio {
  name: string;
  shortName: string;
  heroLabel: string;
  tagline: string;
  bioText: string;
  email: string;
  cvUrl: string;
  socialLinks: SocialLink[];
}

export const bio: Bio = {
  name: "Scott C. Harris, PhD",
  shortName: "Scott Harris",
  heroLabel: "Neuroscientist · CTO · AI Engineer",
  tagline:
    "Building intelligent systems — from neural circuits to AI-powered products",
  bioText:
    "Scott C. Harris is a computational neuroscientist whose career spans from retinal electrophysiology to leading AI product development. As Co-Founder and CTO of Certain Technologies, he's building proprietary software to augment neurodevelopmental diagnoses and detection. At Eon Systems, he developed the first multi-behavior brain emulation of an animal using embodied AI and . His research at UCSF produced a noninvasive diagnostic tool for neurodegenerative diseases, alongside published work on retinal computation and the Copenhagen Award in 2024.",
  email: "scott.harrisphd@gmail.com",
  cvUrl: "/cv",
  socialLinks: [
    {
      platform: "LinkedIn",
      url: "https://www.linkedin.com/in/scott-harris-phd/",
      icon: "linkedin",
    },
    {
      platform: "GitHub",
      url: "https://github.com/scottharris17",
      icon: "github",
    },
    {
      platform: "Google Scholar",
      url: "https://scholar.google.com/citations?user=-0CFW9oAAAAJ&hl=en&oi=ao",
      icon: "scholar",
    },
    {
      platform: "Medium",
      url: "https://medium.com/@scott.harris17",
      icon: "medium",
    },
  ],
};
