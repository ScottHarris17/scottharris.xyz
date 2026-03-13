export interface CVData {
  name: string;
  phone: string;
  email: string;
  address: string;
  education: Array<{
    period: string;
    degree: string;
    institution: string;
    location: string;
    details?: string;
  }>;
  positions: Array<{
    period: string;
    title: string;
    organization: string;
    description: string;
  }>;
  awards: Array<{
    period: string;
    title: string;
    details?: string;
  }>;
  publications: Array<{
    citation: string;
    status?: string;
  }>;
  patents: Array<{
    citation: string;
  }>;
  invitedTalks: Array<{
    citation: string;
  }>;
  posterPresentations: Array<{
    citation: string;
  }>;
  software: Array<{
    name: string;
    description: string;
    tools: string;
    outcome?: string;
    url?: string;
    comingSoon?: boolean;
  }>;
  skills: Array<{
    category: string;
    items: string;
  }>;
  teaching: Array<{
    period: string;
    role: string;
  }>;
  coursework: string;
  portfolios: Array<{
    name: string;
    url: string;
  }>;
}

export const cvData: CVData = {
  name: "Scott C. Harris, PhD",
  phone: "",
  email: "scott.harrisphd@gmail.com",
  address: "San Francisco, CA",

  education: [
    {
      period: "2018–2024",
      degree: "Ph.D. Neuroscience",
      institution: "University of California, San Francisco (UCSF)",
      location: "San Francisco, CA",
      details:
        "Dissertation: A sensorimotor transformation for image-stabilizing eye movements and its implications for disease. Advisor: Dr. Felice Dunn.",
    },
    {
      period: "2014–2018",
      degree: "B.S. Neuroscience, Philosophy, magna cum laude",
      institution: "Duke University",
      location: "Durham, NC",
      details:
        "Thesis: Development of an optical tool for studying cerebellar dependent sensorimotor associations. Advisor: Dr. Court Hull.",
    },
  ],

  positions: [
    {
      period: "2025–present",
      title: "Co-Founder & CTO",
      organization: "Certain Technologies, Inc.",
      description:
        "Building proprietary diagnostic software to augment neurodevelopmental diagnoses.",
    },
    {
      period: "2025–present",
      title: "Computational Neuroscientist",
      organization: "Eon Systems, PBC",
      description:
        "Developed the first multi-behavior brain emulation of an animal using embodied AI. Built physics-constrained, connectome-based brain models that serve as the company's core IP.",
    },
    {
      period: "2024–2025",
      title: "Staff Scientist",
      organization: "Department of Ophthalmology, UCSF",
      description:
        "Invented a noninvasive diagnostic tool for early detection of brain and eye diseases.",
    },
    {
      period: "2018–2024",
      title: "PhD Candidate",
      organization: "Neuroscience Graduate Program, UCSF",
      description:
        "Dissertation: A sensorimotor transformation for image-stabilizing eye movements and its implications for disease. Advisor: Dr. Felice Dunn.",
    },
    {
      period: "2015–2018",
      title: "Undergraduate Researcher",
      organization: "Department of Neurobiology, Duke University School of Medicine",
      description:
        "Thesis: Development of an optical tool for studying cerebellar dependent sensorimotor associations. Advisor: Dr. Court Hull.",
    },
    {
      period: "2016",
      title: "R&D Intern",
      organization: "Neuroscience Department, Genentech Inc.",
      description:
        "Characterized safety liabilities associated with Alzheimer's therapeutics using single-cell assays. Advisor: Dr. Jasvinder Atwal.",
    },
    {
      period: "2012–present",
      title: "Co-Founder and Private Tutor",
      organization: "San Francisco Tutors",
      description:
        "Founded a freelance tutoring company. Mentored 20+ students.",
    },
  ],

  awards: [
    {
      period: "2024–2026",
      title: "NSF Innovation Corps Grant, Entrepreneurial Lead",
      details: "Award #2437074",
    },
    {
      period: "2024",
      title:
        "David and Joyce Copenhagen Prize for Best Research in Vision Science",
      details: "UCSF Department of Ophthalmology",
    },
    {
      period: "2022",
      title: "Knights Templar Eye Foundation Travel Grant for ARVO",
    },
    {
      period: "2021–2024",
      title: "Ruth L. Kirschstein F31 Fellowship (NIH/NEI)",
      details: "Award #F31 EY-033225",
    },
    {
      period: "2021–2024",
      title: "Kavli Institute for Neuroscience Graduate Student Fellowship",
    },
    {
      period: "2021",
      title:
        "Blackstone Charitable Foundation LaunchPad Ideas Competition, National Grand Prize Winner",
      details: "Visual prosthetic invention",
    },
    {
      period: "2020–2023",
      title: "Moritz-Heyman Discovery Fellowship",
      details: "UCSF",
    },
    {
      period: "2020",
      title: "NSF GRFP Honorable Mention",
    },
    {
      period: "2017",
      title:
        "Duke Institute for Brain Sciences, Summer Neuroscience Program Fellowship",
    },
  ],

  publications: [
    {
      citation:
        "Harris, S.C., Balraj, A.K., John, J., Wong, J., Wang, Y., Reyes, E.M., Rabiee, R., Roorda, A., Duncan, J., & Dunn, F.A. Identification of a neural pathway with heightened sensitivity to mild neurodegeneration in mice and humans.",
      status: "In Preparation",
    },
    {
      citation:
        "Kiraly, J.K., Balraj, A., Leary, P., You, Z., Harris, S.C., Hyer, J.D., ... & Kolodkin, A.L. (2025). Slit2/Robo1 signaling constrains image stabilization responses. Current Biology.",
    },
    {
      citation:
        "Lee, J.Y., Kastner, D.B., Harris, S.C., Santina, L.D., John, J.V., Stone, N.S., & Dunn, F.A. (2025). Partial input loss differentially modifies neural pathways. bioRxiv.",
    },
    {
      citation:
        "Creed, R.B., Harris, S.C., Sridhar, S., du Lac, S., Zee, D.S., Dunn, F.A., ... & Nelson, A.B. (2024). Tau P301S Transgenic Mice Develop Gait and Eye Movement Impairments. bioRxiv.",
    },
    {
      citation:
        "Kiraly, J.K., Harris, S.C., Al-Khindi, T., Dunn, F.A., & Kolodkin, A.L. (2024). PyOKR: A Semi-Automated Method for Quantifying Optokinetic Reflex Tracking Ability. JoVE.",
    },
    {
      citation:
        "Harris, S.C., & Dunn, F.A. (2023). Asymmetric retinal direction tuning predicts optokinetic eye movements across stimulus conditions. eLife, 12:e81780.",
    },
    {
      citation:
        "Della Santina, L., Alfred, K.Y., Harris, S.C., et al. (2021). Disassembly and rewiring of a mature converging excitatory circuit following injury. Cell Reports, 36(5), 109463.",
    },
    {
      citation:
        "Newpher, T.M., Harris, S., Pringle, J., Hamilton, C., & Soderling, S. (2018). Regulation of spine structural plasticity by Arc/Arg3.1. Seminars in Cell & Developmental Biology, 77, 25-32.",
    },
  ],

  patents: [
    {
      citation:
        "Harris, S.C., Dunn, F.A., John, J.V., Methods for Assessing Optokinetic Reflex and Systems for Same. UCSF-822PRV, filed October 11, 2025.",
    },
  ],

  invitedTalks: [
    {
      citation:
        "Harris S.C., et al. (2024) Early Signs of Retinal Degeneration. Grand Rounds, UCSF Department of Ophthalmology.",
    },
    {
      citation:
        "Harris S.C., & Dunn F.A. (2024) Direction selectivity and central computation. Copenhagen Award talk, UCSF.",
    },
    {
      citation:
        "Harris S.C., & Dunn F.A. (2022) A neurobiological mechanism for image stabilization. Michael Page Research Symposium, UCSF.",
    },
    {
      citation:
        "Harris S.C., & Dunn F.A. (2022) Retinal direction tuning predicts gaze stabilizing eye movements. UCSF Neuroscience Retreat, Monterey.",
    },
    {
      citation:
        "Harris S.C., & Dunn F.A. (2022) Asymmetries in the vertical optokinetic reflex. ARVO Annual Meeting, Denver.",
    },
    {
      citation:
        "Harris S.C., & Dunn F.A. (2022) Retinal direction tuning. Roy Steinberg Lecture, UCSF.",
    },
    {
      citation:
        "Harris S.C., & Dunn F.A. (2022) A brainstem model for visual motion processing. UCSF Neuroscience.",
    },
    {
      citation:
        "Harris S.C., Zahler S., & Feinberg E. (2019) Anatomic constraints on orienting circuitry in the superior colliculus. UCSF.",
    },
  ],

  posterPresentations: [
    {
      citation:
        "Harris S.C., et al. (2025) Towards embodied brain emulations. SfN, San Diego.",
    },
    {
      citation:
        "Harris S.C., et al. (2025) Detection of retinal degeneration by measuring reflexive eye movements. ARVO, Salt Lake City.",
    },
    {
      citation:
        "Harris S.C., & Dunn F.A. (2022) Retinal direction tuning predicts gaze stabilizing eye movements. SfN, San Diego.",
    },
    {
      citation:
        "Harris S.C., & Dunn F.A. (2021) Disproportionate excitation. UCSF Retreat.",
    },
    {
      citation:
        "Harris S.C., & Hull C. (2018) Cerebellar-dependent sensorimotor associations. Duke.",
    },
    {
      citation:
        "Harris S.C., Wetzel-Smith M.K., & Atwal J.K. (2016) Blood-brain barrier bispecific antibodies. Genentech.",
    },
  ],

  software: [
    {
      name: "Jelly Psych",
      description: "AI-native web app for psychological diagnosis.",
      tools: "Agents, Generative AI, Next.js, React, Flask, LLMs, OAuth, AWS, MongoDB",
      outcome:
        "Users see 60% more patients, clinics grow revenue by >$150k/clinician.",
      url: "https://jellypsych.com",
    },
    {
      name: "Embodied Brain Emulation",
      description: "Uploaded digital copies of brains into virtual bodies.",
      tools: "Embodied AI, PyTorch, MuJoCo, Reinforcement Learning, Connectomics",
      outcome: "First ever multi-behavior brain emulation.",
      url: "https://eon.systems/updates/embodied-brain-emulation",
    },
    {
      name: "OKR Diagnostics",
      description: "End-to-end diagnostic for neurodegenerative disease.",
      tools: "VR, Adaptive Optics, Eye Tracking",
      outcome: "Diagnoses years faster than existing standard of care.",
      comingSoon: true,
    },
    {
      name: "Bassoon",
      description: "No-code psychophysics experiments.",
      tools: "PsychoPy, Eye Tracking",
      outcome: "Used by labs around the world.",
      url: "https://github.com/scottharris17/bassoon",
    },
    {
      name: "Quale",
      description: "Visual prosthetic (see with ears).",
      tools: "OpenCV, Computer Vision",
      outcome:
        "Visually-guided behavior in unsighted subjects; Blackstone Grand Prize.",
      url: "https://www.youtube.com/shorts/k8tYTOxCEgs",
    },
    {
      name: "Electrophysiology Pipeline",
      description: "Analysis pipeline for neuroscience data.",
      tools: "Timeseries analysis",
      url: "https://github.com/ScottHarris17/ElectrophysiologyPipeline",
    },
    {
      name: "Calibrate Light",
      description: "Photoisomerization rates for vision science.",
      tools: "Matlab, optics, signal detection",
      url: "https://github.com/ScottHarris17/CalibrateLight",
    },
  ],

  skills: [
    {
      category: "Scientific",
      items:
        "Computational neuroscience, connectome models, psychophysics, ophthalmology",
    },
    {
      category: "Quantitative",
      items:
        "Machine learning, LLMs, simulation, computer vision, data science",
    },
    {
      category: "Programming",
      items:
        "Python, MATLAB, JavaScript, TypeScript, React, full stack development, agentic workflows",
    },
    {
      category: "Product",
      items: "Market discovery, needs-finding, strategic planning",
    },
    {
      category: "Soft Skills",
      items:
        "Fundraising, scientific and technical writing, team leadership, public speaking",
    },
  ],

  teaching: [
    {
      period: "2020–2024",
      role: "TA, Intro to Computer Programming, UCSF",
    },
    {
      period: "2020",
      role: "TA, Organ Systems and Human Pathophysiology, UCSF",
    },
    {
      period: "2020",
      role: "Guest Instructor, Lowell High School Science Club",
    },
    {
      period: "2012–present",
      role: "Freelance Private Tutor",
    },
  ],

  coursework:
    "Neurosciences (30+ courses), statistical methods and modeling, computational methods, deep learning, information theory, linear algebra, organic chemistry, electricity and magnetism, computer science, philosophy of mind, philosophy of science, formal logic",

  portfolios: [
    { name: "Personal Website", url: "https://scottharris.xyz" },
    { name: "GitHub", url: "https://github.com/scottharris17" },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/scott-harris-phd/",
    },
  ],
};
