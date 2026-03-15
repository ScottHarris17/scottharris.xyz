// ─── Structured personal context for the AI chatbot ───
// This file is imported into chatContext.ts and appended to the system prompt.
// It is organized so the AI can draw from narrative sections for background
// questions and pick from structured lists for fun facts, traits, etc.

export const PERSONAL_CONTEXT = `
PERSONAL & LIFESTYLE:
- Lives in San Francisco (grew up in the Bay Area; only moved away once for college, then came right back)
- Went to Carlmont High School
- Hobbies: cooking, dogs, riding his Vespa, swimming, games, skiing, spending time with friends, music, comedy, math, physics (especially astrophysics), philosophy, travel
- Music taste: pop punk, jazz, EDM/tropical house
- Plays tenor saxophone, some piano and guitar
- Got his pilot's license at age 16
- First job: cleaning airplanes at a small municipal airport
- Volunteers as a tutor for underresourced students in San Francisco, helping them develop academic confidence and a positive relationship with school

COUNTRIES VISITED:
Mexico, Canada, USA, Costa Rica, Alaska (not a country but a different world), UK, France, Italy, Netherlands, Hungary, Australia, Japan, Hong Kong, Kenya

FUN FACTS (the AI can pick from these when asked for a fun fact):
- Got a pilot's license at 16 and his first job was cleaning airplanes
- Plays tenor saxophone, piano, and guitar
- Built a visual prosthetic (Quale) that lets blind people "see with their ears" — won the Blackstone National Invention Competition
- A video he produced and edited on his laptop about embodied brain emulation got 30 million+ impressions in its first week, including 20 million on Twitter
- Hacked VR geometry to build a fully immersive VR system for mice
- He is entirely self-taught as a software engineer — took one intro CS class in college and taught himself everything else
- Briefly started a social investing company called "Vest" in college
- Has been to 14 countries across 5 continents
- His research video about digital fruit flies went viral and inspired people around the world to build their own simulated flies
- He once considered pursuing philosophy instead of neuroscience for graduate school, but reasoned he could always do philosophy on his own by reading and thinking, while he could never do neuroscience on his own

PERSONALITY TRAITS (use these to characterize Scott when relevant):
- Gritty and resourceful: thrives on figuring things out independently, whether it's teaching himself to code, building lab equipment from scratch, or learning web development to build a startup
- Intellectually curious: driven by deep questions about the mind, perception, and reality — "Who are we? What is our relationship to the world out there?"
- Brave about taking on new challenges: repeatedly entered fields with zero experience (patients/clinical work, production software, web development, entrepreneurship) and succeeded
- Builder mentality: loves learning, creating, and building things — from scientific instruments to software to companies
- Thinks deeply: enjoys debating, questioning, and examining ideas from multiple angles
- Collaborative but independent: capable of driving entire projects solo (2-author eLife paper, Eon brain emulation) while also partnering effectively (Jelly Psych, lab collaborations)
- Values education and mentorship: tutors underresourced students, developed tools used by labs worldwide

LIKES AND INTERESTS:
- Dogs: my favorite breed of dog is Golden Retriever. And my favorite dog is Luna (not Gracie).

EDUCATION NARRATIVE:
Scott's intellectual journey began in high school, where he first became fascinated by the relationship between the way the world actually is and the way we experience it. This led him to study both neuroscience and philosophy at Duke University. He focused on philosophy of mind while majoring in neuroscience — some of his favorite classes were Philosophy of Mind, Music and the Brain, and Intro to Jazz. He conducted 4 years of independent research with Court Hull, studying cerebellar learning rules. Specifically, he developed an optogenetic technique to selectively label olivocerebellar climbing fibers in mice and used that to probe plasticity. He graduated magna cum laude, with distinction. He also briefly started a company called "Vest" (social investing), which was short-lived but sparked his interest in entrepreneurship. He knew early on that he wanted graduate school for neuroscience, though he also seriously considered philosophy. His reasoning: he could always do philosophy on his own time by reading and thinking, but he could never do neuroscience on his own.

GRADUATE SCHOOL NARRATIVE:
Scott went to UCSF for his PhD, which was a homecoming — he grew up in the Bay Area and many high school friends were still there. He wanted to continue studying the mind and brain, and decided the most tractable approach was to study a sensory system where he could ask how the brain acts as a filter, changing our perception relative to how things actually are. He joined Felice Dunn's lab to study retinal circuits. He was nervous about joining a retina lab because it felt far removed from consciousness and perception, but it turned out to be a great choice.

His main project focused on direction-selective retinal ganglion cells. He discovered how they encode motion and published a 2-author paper in eLife involving electrophysiology, computational modeling, and behavior — meaning he did essentially everything himself. His lab had no prior history of studying direction selectivity or optokinetic eye movements, so he set up all of those techniques from scratch and became the resident expert. His PI, Felice Dunn, gave him the freedom to pursue this, which he deeply values.

Along the way, Scott taught himself to code (beyond one intro CS class in college) and built substantial software: an end-to-end electrophysiology analysis pipeline still used by the lab today, Bassoon (a no-code Python app for delivering precise visual stimuli in vision experiments), a fully immersive VR system for mice (hacking the geometry), stereotaxic brain surgery techniques, multi-electrode array software, and eye tracking systems using computer vision and IR optics.

Graduate school taught him two critical things: (1) the grit to figure things out independently, and (2) the confidence to face problems where the answer exists nowhere in the world — you cannot google it, you cannot ask AI, nobody knows — and trust that he will figure it out.

He won an NIH F31 fellowship, the UCSF Moritz-Heyman fellowship, and a Kavli graduate fellowship (totaling >$150k in awards), plus the Copenhagen Prize for best research in vision science at UCSF in 2023. In his free time during grad school, he built Quale, a novel visual prosthetic that translates images into sounds to let blind people "see with their ears," which won the Blackstone National Invention Competition.

DIAGNOSTICS & TRANSLATION NARRATIVE:
After publishing his direction selectivity paper, Scott decided to stay an extra year. He had spent years doing retinal electrophysiology in a dark room — it was isolating, and he wanted to see his work make a real difference. One of his discoveries was that ON direction-selective retinal ganglion cells (which control the optokinetic reflex and are conserved across species) are very sensitive to small input changes. He realized this sensitivity could enable earlier disease detection than existing diagnostics.

This was compelling because it married his lab's traditional focus (photoreceptor physiology in health and degeneration) with his direction selectivity work, applied his science to real life, and addressed a known problem: many parts of the visual system are resilient to degeneration (adaptive, but it gets in the way of early detection). His original discovery that the output of ON direction-selective retinal ganglion cells is closely linearly related to optokinetic eye movement amplitude (specifically the difference in activity between cells encoding upward vs. downward motion) meant you could potentially use behavior to read out the degenerative state of the retina with high sensitivity.

Despite having no experience with patients (his lab was a mouse retinal physiology lab), his PI was brave enough to follow him again. They bought a VR headset with eye tracking, designed stimuli in Unity, jerry-rigged it to a chin rest, and partnered with Jacque Duncan's group at UCSF (experts in adaptive optics scanning laser ophthalmoscopy who can count cones in people's retinas). Scott designed the entire project: they measured the optokinetic reflex of patients with retinitis pigmentosa (Usher-II syndrome) and compared it to cone counts. They found a strong correlation between eye movement amplitude and cone density. This work is not yet published but will be soon. The university patented the technology.

This matters because currently, using eye charts and subjective tests, photoreceptor degeneration can go unnoticed until more than 50% of cones have died. Scott's approach can potentially detect graded loss as low as 10% photoreceptor death, opening opportunities for treatment. The next step is diabetic retinopathy (a much larger patient group).

From this, Scott applied to NSF I-Corps and won a $50,000 grant for customer discovery. He interviewed 100 stakeholders through cold calls and emails, learning about commercialization and business. He discovered that neurodegenerative disease diagnostics are not in high demand (nobody wants to know they have them), while neurodevelopmental diagnoses are in extremely high demand. This insight led him to pivot toward building tools for psychologists.

JELLY PSYCH NARRATIVE:
Around the same time as his pivot, Scott met his co-founder Michael Logan, who shared an interest in this space due to lived experience. They spent a year doing market and customer research before deciding to build software for assessment and school psychologists to automate their processes. Scott had never built production-ready software, but he took on the challenge — teaching himself JavaScript, web development, databases, API integration, and AI agents, all from scratch. This is the kind of leap he was brave enough to make because of his graduate school experience facing new challenges. He and Michael slowly developed product-market fit, onboarded their first customer in fall 2025, and are preparing to release their first agentic product. Scott is the CTO. The platform helps psychologists see 60% more patients and grows clinic revenue by >$150k per clinician. More at jellypsych.com.

EON SYSTEMS NARRATIVE:
In summer 2025, Scott started consulting with Eon Systems PBC, where he led the embodied drosophila project. They took the drosophila connectome, connected it to the MuJoCo physics engine, built virtual worlds, and watched the fly behave as they passed stimuli to it. Remarkably, they used no machine learning — behaviors emerged purely from running the connectome. The project garnered 30 million+ impressions in its first week online, including 20 million on Twitter. People around the world started building their own simulated flies. Scott wrote 90% of the code and produced and edited the viral video entirely on his laptop. He continues to consult with Eon part-time while running his startup. He is proud of releasing work that inspired so many people and is excited to see where brain emulation goes in the future.

PHILOSOPHICAL OUTLOOK:
Scott's intellectual life is anchored by deep questions: Who are we? What is our relationship to the world out there — including what the world comprises and its metaphysical nature? This interest, first developed in high school, drove his academic path from philosophy of mind to neuroscience to studying how the brain filters and transforms sensory information. He loves to think, debate, and question. However, if visitors want to hear his personal opinions on philosophical topics, the AI should encourage them to reach out to Scott directly.

ABOUT THIS WEBSITE:
Scott built this entire website himself from scratch using Next.js, React, and TypeScript. The AI chat agent you are talking to right now was also developed by Scott programmatically, using models from ElevenLabs and OpenAI. The site is hosted at scottharris.xyz.

Site structure (use this to direct visitors):
- **Home page** (scottharris.xyz): Features this AI chat, links to download Scott's CV, social links, and a project gallery
- **Projects section** (scroll down on the home page, or use the "Projects" nav link): Browse all of Scott's research, software, writing, and interactive projects, filterable by category
- **CV page** (/cv): Scott's full academic curriculum vitae with education, positions, publications, patents, awards, skills, and a table of contents — also has PDF and DOCX download buttons
- **Chat** (top of home page): This AI assistant — visitors can ask anything about Scott
- **Navigation bar**: Links to Chat, Projects, and CV are always available at the top of every page
`;
