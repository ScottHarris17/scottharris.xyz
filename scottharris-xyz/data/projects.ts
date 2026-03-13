// Add new projects by appending an object to this array. No other file changes needed.

export type ProjectCategory = "science" | "software" | "writing" | "interactive";

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  description: string;
  url: string;
  featured?: boolean;
}

export const projects: Project[] = [
  // ── Science ──────────────────────────────────────────────
  {
    id: "brain-emulation",
    title: "Embodied Brain Emulation",
    category: "science",
    description:
      "Led the first multi-behavior brain upload using the complete drosophila connectome, spiking neural networks, reinforcement learning, and MuJoCo at Eon Systems. 30M+ impressions in first week.",
    url: "https://eon.systems/updates/embodied-brain-emulation",
    featured: true,
  },
  {
    id: "okr-diagnostics",
    title: "OKR Diagnostics",
    category: "science",
    description:
      "Invented a noninvasive diagnostic tool for early detection of neurodegenerative diseases by measuring reflexive eye movements. Partnership with UCSF.",
    url: "https://jellypsych.com",
    featured: true,
  },
  {
    id: "retinal-image-stabilization",
    title: "Retinal Image Stabilization",
    category: "science",
    description:
      "Published in eLife — discovered how asymmetric retinal direction tuning predicts optokinetic eye movements across stimulus conditions.",
    url: "https://elifesciences.org/articles/81780",
    featured: true,
  },
  {
    id: "copenhagen-award",
    title: "Copenhagen Award 2024",
    category: "science",
    description:
      "David and Joyce Copenhagen Prize for Best Research in Vision Science, UCSF Department of Ophthalmology.",
    url: "https://www.youtube.com/watch?v=KDAUHv1MTpY",
    featured: true,
  },
  {
    id: "glaucoma-circuits",
    title: "Glaucoma Circuit Analysis",
    category: "science",
    description:
      "Mapping how elevated intraocular pressure disrupts retinal ganglion cell circuits and signal processing in a mouse model.",
    url: "/media/GlaucomaPaper.pdf",
  },

  // ── Software ─────────────────────────────────────────────
  {
    id: "jelly-psych",
    title: "Jelly Psych",
    category: "software",
    description:
      "AI-native web app for clinical psychology — psychologists see 60% more patients and clinics grow revenue by >$150k per clinician. Built with Next.js, React, Flask, LLMs, agentic workflows.",
    url: "#",
    featured: true,
  },
  {
    id: "bassoon",
    title: "Bassoon",
    category: "software",
    description:
      "No-code Python software for creating and deploying psychophysics experiments with millisecond precision. Used by labs around the world.",
    url: "https://github.com/scottharris17/bassoon",
  },
  {
    id: "electrophysiology-pipeline",
    title: "Electrophysiology Pipeline",
    category: "software",
    description:
      "End-to-end data processing pipeline for multi-electrode array recordings of retinal neural activity.",
    url: "https://github.com/ScottHarris17/ElectrophysiologyPipeline",
  },
  {
    id: "calibrate-light",
    title: "Calibrate Light",
    category: "software",
    description:
      "Precision GUI calculator for photoisomerization rates, essential for calibrating light stimuli in vision science experiments.",
    url: "https://github.com/ScottHarris17/CalibrateLight",
  },

  // ── Writing ──────────────────────────────────────────────
  {
    id: "confronting-consciousness",
    title: "Confronting Consciousness",
    category: "writing",
    description:
      "Perspective on the hard problem of consciousness through the lens of computational neuroscience. Published on Medium.",
    url: "https://medium.com/swlh/confronting-consciousness-8268fc2ff729",
  },
  {
    id: "finding-free-will",
    title: "Finding Free Will",
    category: "writing",
    description:
      "The case for free will in a deterministic universe — an essay on determinism, agency, and what neuroscience reveals about choice.",
    url: "https://medium.com/@scott.harris17/finding-free-will-dd565e0135d4",
  },

  // ── Interactive ──────────────────────────────────────────
  {
    id: "viral-spread",
    title: "Viral Spread Simulator",
    category: "interactive",
    description:
      "Interactive epidemiological simulation with agent-based modeling, infection curves, and Chart.js visualizations. Built during Covid-19.",
    url: "/apps/viralspread/viralSpread.html",
  },
  {
    id: "interest-calculator",
    title: "Interest Calculator",
    category: "interactive",
    description:
      "Compound interest calculator with adjustable parameters for deposit, contribution, term, rate, and capital gains tax.",
    url: "/apps/interestCalculator/interestCalculator.html",
  },
  {
    id: "quale",
    title: "Quale — Visual Prosthetic",
    category: "interactive",
    description:
      "A homemade visual prosthetic for the blind that converts live video into unique audioscapes. Blackstone Grand Prize Winner.",
    url: "https://www.youtube.com/shorts/k8tYTOxCEgs",
  },
];
