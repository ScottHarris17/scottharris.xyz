# PRD: scottharris.xyz Redesign

## Overview

Migrate scottharris.xyz from a static HTML/Bootstrap/jQuery site to a modern Next.js 14 application with an AI-powered chatbot, light/dark theming, file-based content management, and the "Meridian v2" design system. The approved design mockup is at `design-options/option-d-meridian-v2.html`.

## Target Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router, TypeScript) |
| Styling | Tailwind CSS v4 + CSS custom properties |
| Fonts | Instrument Serif, Figtree, JetBrains Mono (Google Fonts) |
| AI Chat | OpenAI GPT-4o via Next.js API routes (streaming) |
| Animations | CSS keyframes + Intersection Observer (no heavy libs) |
| Hosting | Vercel (or static export) |
| Package Manager | pnpm |

## Design Reference

The approved design is `design-options/option-d-meridian-v2.html`. All visual decisions (colors, spacing, typography, layout) should match that mockup exactly unless noted otherwise in individual issues.

### Design Tokens (Light / Dark)

**Light (default):**
- `--bg: #f7faf9`, `--bg-pattern: #e5ede9`
- `--primary: #0f766e`, `--primary-light: #14b8a6`
- `--accent: #d97706`, `--violet: #8b5cf6`
- `--text: #0f172a`, `--text-secondary: #475569`
- `--card-bg: #ffffff`, `--card-border: #e2e8f0`

**Dark:**
- `--bg: #050a12`, `--bg-pattern: #0f1a2e`
- `--primary: #2dd4bf`, `--primary-light: #5eead4`
- `--accent: #f59e0b`
- `--text: #f1f5f9`, `--text-secondary: #94a3b8`
- `--card-bg: #0f1729`, `--card-border: #1e293b`

---

## Issues

---

### ISSUE-01: Initialize Next.js Project Scaffold

**Goal:** Create the foundational Next.js 14 project with all tooling configured so other issues can build on top of it.

**Description:**
- Initialize a new Next.js 14 project (App Router, TypeScript, pnpm) in a `next-app/` subdirectory (to coexist with the current site during development)
- Install and configure Tailwind CSS v4
- Configure `tsconfig.json` with path aliases (`@/components`, `@/lib`, `@/data`, etc.)
- Set up Google Fonts (Instrument Serif, Figtree, JetBrains Mono) using `next/font/google`
- Create the root `layout.tsx` with HTML structure, font class application, and basic metadata
- Create a minimal `page.tsx` placeholder
- Add `.env.local.example` with placeholder for `OPENAI_API_KEY`
- Configure `next.config.ts` (allow static file serving from `public/`)
- Add a basic `README.md` with setup instructions (pnpm install, env vars, dev server)

**Acceptance Criteria:**
- `pnpm dev` starts successfully
- All three fonts render on the placeholder page
- Tailwind classes work
- TypeScript compiles cleanly
- Path aliases resolve correctly

**Dependencies:**
- Blocks: ISSUE-02, ISSUE-03, ISSUE-04, ISSUE-05, ISSUE-06, ISSUE-07, ISSUE-08, ISSUE-09, ISSUE-10, ISSUE-11, ISSUE-12, ISSUE-13, ISSUE-14
- Blocked by: nothing

---

### ISSUE-02: Design System — Tailwind Config & CSS Variables

**Goal:** Establish the complete design token system so all components share a consistent visual language.

**Description:**
- Extend `tailwind.config.ts` with the full color palette, font families, and custom spacing/sizing tokens from the approved mockup
- Create a `globals.css` file that defines all CSS custom properties for both `:root` (light) and `[data-theme="dark"]` selectors — matching `option-d-meridian-v2.html` exactly (lines 14–80 of the mockup)
- Include the dot micro-pattern background on `body` (`radial-gradient(circle, var(--bg-pattern) 1px, transparent 1px)` at 28px)
- Include the `0.3s` transition on `background-color` and `color` for smooth theme switching
- Define utility classes: `.serif` (Instrument Serif), `.mono` (JetBrains Mono)
- Ensure all Tailwind utilities reference the CSS variables where appropriate (e.g., `bg-card` maps to `var(--card-bg)`)

**Context:** The mockup defines ~30 CSS variables across two themes. These must be extracted into Tailwind config and globals.css so all subsequent component work can reference them. This is the single source of truth for all visual tokens.

**Acceptance Criteria:**
- Light and dark color palettes are available as Tailwind classes
- `globals.css` contains the complete `:root` and `[data-theme="dark"]` variable blocks
- Body has the dot micro-pattern background in both themes
- `.serif` and `.mono` utility classes work
- No hardcoded color values needed in any component — everything references tokens

**Dependencies:**
- Blocks: ISSUE-03, ISSUE-04, ISSUE-05, ISSUE-06, ISSUE-07, ISSUE-08, ISSUE-09, ISSUE-10, ISSUE-11
- Blocked by: ISSUE-01

---

### ISSUE-03: Theme Toggle — Light/Dark Mode with Persistence

**Goal:** Implement a working theme toggle that respects system preferences, persists to localStorage, and enables the dark-mode ambient background.

**Description:**
- Create a `ThemeProvider` client component that:
  - On mount, checks localStorage for saved theme, falls back to `prefers-color-scheme`
  - Sets `data-theme` attribute on `<html>`
  - Exposes a toggle function via React context
- Create a `ThemeToggle` button component (sun/moon SVG icons, matching mockup lines 551–553)
- The dark-mode ambient mesh gradient background (mockup lines 102–131):
  - Create an `AmbientBackground` component with the animated radial gradients
  - Render it as a fixed, pointer-events-none layer
  - Only visible when `data-theme="dark"` (controlled by CSS variable `--ambient-display`)
- Ensure the `0.3s` transition on theme switch is smooth (no flash of wrong theme on page load)

**Context:** The mockup uses `[data-theme="dark"]` to toggle all CSS variables. The ambient aurora background only appears in dark mode, making theme switching feel like a genuine transformation rather than just color inversion.

**Acceptance Criteria:**
- Default theme matches system `prefers-color-scheme`
- Clicking toggle switches all colors smoothly (0.3s transition)
- Theme choice persists across page reloads via localStorage
- No "flash of unstyled content" — correct theme applied before paint
- Dark mode shows animated ambient gradient; light mode does not
- Toggle button shows moon icon in light mode, sun icon in dark mode

**Dependencies:**
- Blocks: ISSUE-04 (Navigation needs the toggle button)
- Blocked by: ISSUE-02

---

### ISSUE-04: Navigation Component

**Goal:** Build the sticky top navigation bar with logo, links, theme toggle, and responsive hamburger menu.

**Description:**
- Create `Navigation.tsx` component matching mockup lines 542–565
- Structure:
  - Left: "Scott Harris" logo in Instrument Serif, teal colored, links to top of page
  - Center: Nav links — "Projects" (`#projects`), "Resume" (`#resume`), "About" (`#about`) in Figtree
  - Right: Theme toggle button (from ISSUE-03) + hamburger button (mobile only)
- Styling:
  - Sticky positioning, `backdrop-filter: blur(20px)`, teal bottom border (1px)
  - Background: `var(--nav-bg)` with glassmorphic transparency
  - Nav links have animated teal underline on hover (CSS `::after` pseudo-element, width transition)
- Mobile (< 768px):
  - Center nav links hidden, hamburger icon shown
  - Hamburger toggles a dropdown panel with the same links
  - Dropdown closes on link click
- Use smooth scroll for anchor links

**Context:** The nav is visible on every page state and is the user's primary way to navigate the single-page layout. The glassmorphic effect and subtle animations are key to the premium feel.

**Acceptance Criteria:**
- Sticky at top, visually matches mockup at all breakpoints
- Theme toggle integrated and functional
- Hamburger menu works on mobile
- Hover underline animation on desktop nav links
- Smooth scroll to anchor sections on click
- No layout shift when nav appears/sticks

**Dependencies:**
- Blocks: nothing (visual-only, doesn't block other issues)
- Blocked by: ISSUE-02, ISSUE-03

---

### ISSUE-05: Content Data Layer — Projects & Bio

**Goal:** Create the file-based content system so all display content is centralized, typed, and easy to edit.

**Description:**
- Create `src/data/projects.ts`:
  - Export a `Project` TypeScript interface: `{ id, title, category, description, url, featured? }`
  - `category` is a union type: `'science' | 'software' | 'writing' | 'interactive'`
  - Export a `projects` array with all 10 current projects (copy titles, descriptions, URLs, and categories from the mockup lines 644–714)
  - Add clear inline comments explaining how to add new projects (just append an object)
- Create `src/data/bio.ts`:
  - Export structured bio content: `{ name, title, tagline, heroLabel, quote, bioText, stats, socialLinks, cvUrl, email }`
  - Populate from mockup content
  - Social links array: `{ platform, url, label }[]`
- Create `src/data/chatContext.ts`:
  - Export a `SYSTEM_PROMPT` string for the AI chatbot
  - Include Scott's full background (CTO role, Eon Systems brain upload, UCSF diagnostic tool, neuroscience research, software projects, writing)
  - Include safety instructions: always present Scott positively, never speculate about weaknesses or negatives, deflect inappropriate questions gracefully, only answer based on provided facts
  - Export a `TOOL_DEFINITIONS` array for OpenAI function calling (defined in ISSUE-12)

**Context:** This is the single source of truth for all content displayed on the site. When Scott wants to add a new accomplishment or project, he edits `projects.ts` — no other file changes needed. The `chatContext.ts` gives the AI chatbot its knowledge base.

**Acceptance Criteria:**
- All TypeScript types are properly defined and exported
- All 10 projects have correct titles, descriptions, categories, and URLs
- Bio data matches the approved mockup content
- Chat system prompt is comprehensive and includes safety guardrails
- Adding a new project requires only appending one object to the array
- All files compile cleanly with no `any` types

**Dependencies:**
- Blocks: ISSUE-07, ISSUE-08, ISSUE-09, ISSUE-10, ISSUE-12, ISSUE-13
- Blocked by: ISSUE-01

---

### ISSUE-06: Hero Section — Name, Tagline & Layout

**Goal:** Build the hero section with the staggered entrance animations, centered layout, and proper responsive behavior.

**Description:**
- Create `Hero.tsx` component matching mockup lines 568–627
- Structure (all centered):
  1. Role label: "NEUROSCIENTIST · CTO · AI ENGINEER" in JetBrains Mono, teal, small caps, wide tracking
  2. Name: "Scott C. Harris, PhD" in Instrument Serif, large (`clamp(3rem, 6vw, 5rem)`), teal
  3. One-liner tagline in Figtree, secondary text color
  4. Slot for CV bar component (ISSUE-07)
  5. Slot for Chat panel component (ISSUE-08)
  6. Scroll-down indicator (animated bouncing chevron)
- Animations:
  - Each element fades up with stagger: label (0.2s), name (0.35s), tagline (0.5s), CV bar (0.65s), chat (0.8s)
  - Use CSS `@keyframes fadeUp` with `animation-fill-mode: forwards`
  - Scroll indicator appears last (3.2s delay)
- Hero takes `min-height: 100vh` and is `display: flex; flex-direction: column; align-items: center; justify-content: center`
- Content comes from `bio.ts` data (ISSUE-05)

**Context:** The hero is the first thing visitors see. The staggered animation creates a polished first impression. The hero is a container — it renders the CV bar and chat panel as children/siblings, but those are separate components.

**Acceptance Criteria:**
- Layout matches mockup at all breakpoints (centered, properly spaced)
- Staggered fade-up animation plays on page load
- Responsive: text sizes reduce on smaller screens
- Scroll indicator bounces at bottom
- Content pulled from data layer, not hardcoded in JSX

**Dependencies:**
- Blocks: nothing (but provides the visual container for ISSUE-07 and ISSUE-08)
- Blocked by: ISSUE-02, ISSUE-05

---

### ISSUE-07: CV + Links Bar Component

**Goal:** Build the prominent CV download button and social links bar that sits immediately below the hero name.

**Description:**
- Create `CvLinksBar.tsx` component matching mockup lines 573–597
- Structure:
  - Horizontal flexbox with gap, centered, wrapped
  - Left: "Download CV" button — teal background, white text, download icon SVG, prominent
    - Hover: transitions to amber background with shadow
  - Right: Row of social links, each as icon + label text
    - LinkedIn, GitHub, Google Scholar, Medium
    - Each: inline SVG icon + `<span>` label
    - Hover: text color transitions to teal
- Styling:
  - Container: light teal tint background (`var(--cv-bar-bg)`), rounded (14px), border, max-width 720px
  - CV button: rounded (8px), box-shadow, hover lift (-1px translateY)
- Responsive:
  - At 768px: flex-direction column (button on top, social links centered below)
  - At 480px: social link labels hidden (icons only), tighter padding
- Content from `bio.ts` (cvUrl, socialLinks)

**Context:** User requirement: CV and links must be "unmissable." This component is the most prominent call-to-action on the page, placed directly below the name before the chatbot. Recruiters should find the CV within 1 second of landing.

**Acceptance Criteria:**
- CV download button is visually the most prominent interactive element
- All social links work (open in new tab)
- CV link opens PDF in new tab
- Hover states match mockup (amber CV button, teal social links)
- Responsive stacking works correctly
- Social link labels hide on very small screens while icons remain

**Dependencies:**
- Blocks: nothing
- Blocked by: ISSUE-02, ISSUE-05

---

### ISSUE-08: Chat Panel — UI Component (Frontend Only)

**Goal:** Build the chat panel UI with static demo messages, input field, and visual styling. No backend connectivity yet.

**Description:**
- Create `src/components/ChatBot/ChatPanel.tsx` — the outer container
  - Teal top border (2px), card background, rounded, shadow
  - In dark mode: glass effect with backdrop-blur
- Create `ChatHeader.tsx`:
  - Pulsing teal dot (CSS animation: scale 1→1.4→1, 2s cycle)
  - "AI Scott" in JetBrains Mono, teal
  - "— Ask me anything" in Figtree, secondary color
- Create `ChatMessage.tsx`:
  - Props: `role: 'user' | 'assistant'`, `content: string`
  - User messages: right-aligned, teal-tinted background
  - AI messages: left-aligned, subtle background, support inline links (parse `[text](url)` or render as HTML)
  - Each message fades in with stagger animation on mount
- Create `ChatInput.tsx`:
  - Text input with placeholder "Ask about Scott..."
  - Send button with arrow SVG icon, teal background
  - Input focus: teal border with glow ring
  - For this issue, input is disabled (static demo)
- Show the demo conversation from the mockup (lines 607–611):
  - User: "What does Scott do?"
  - AI: Full response about CTO role, Eon Systems, UCSF (with teal links)
  - User: "Show me his projects"
  - AI: Project highlights with teal links
- Footer note: "Powered by AI · Voice coming soon" in muted text

**Context:** This issue creates the visual shell. ISSUE-12 and ISSUE-13 will wire it up to OpenAI. The chat is the centerpiece of the page — it needs to look polished and inviting even before it's functional. The demo messages serve as a preview of what the chatbot can do.

**Acceptance Criteria:**
- Chat panel visually matches the mockup exactly
- Pulsing dot animates
- Demo messages appear with staggered fade-in on page load
- Light and dark mode styles both work (glass effect in dark)
- Input is present but disabled (visual only)
- Responsive: full-width on mobile with appropriate padding

**Dependencies:**
- Blocks: ISSUE-12, ISSUE-13
- Blocked by: ISSUE-02

---

### ISSUE-09: Projects Section — Grid & Cards

**Goal:** Build the projects grid with styled cards that display all projects from the data layer.

**Description:**
- Create `ProjectCard.tsx` component:
  - Props from `Project` type (ISSUE-05)
  - Structure: category pill (top) → title (Instrument Serif) → description (Figtree, 2-line clamp) → "View →" link
  - Category pill colors: science=teal, software=amber, writing=violet, interactive=slate
  - Card: white bg (light) / dark bg (dark), subtle border, rounded (14px), shadow
  - Hover: lift 2px + enhanced shadow
  - Cards start invisible (opacity 0, translateY 24px) — animated visible by ISSUE-11
- Create `ProjectGrid.tsx`:
  - Renders heading "Projects" (Instrument Serif) + subtitle
  - Slot for filter pills (ISSUE-10)
  - CSS Grid: 3 columns desktop, 2 at 1024px, 1 at 768px
  - Maps over `projects` array from data layer and renders `ProjectCard` for each
  - Section has `id="projects"` for nav anchor link

**Context:** This is where visitors explore Scott's work. Cards should feel tactile and polished. The grid needs to handle 10+ items gracefully and scale as more projects are added to `projects.ts`.

**Acceptance Criteria:**
- All 10 projects render with correct content, categories, URLs
- Category pills have correct colors per category
- Grid is responsive (3 → 2 → 1 columns at breakpoints)
- Card hover effects work
- Description text clamps to 2 lines with ellipsis
- External links open in new tab
- Internal links (apps) navigate correctly

**Dependencies:**
- Blocks: nothing
- Blocked by: ISSUE-02, ISSUE-05

---

### ISSUE-10: Projects Section — Category Filter

**Goal:** Add working category filter pills above the project grid.

**Description:**
- Create `CategoryFilter.tsx` client component:
  - Horizontal row of pills: "All", "Science", "Software", "Writing", "Interactive"
  - Styled in JetBrains Mono, small, pill-shaped (100px border-radius)
  - Active pill: teal background, white text (light) / dark text (dark)
  - Inactive: subtle teal-tinted background, secondary text
  - Hover: teal border and text color
- Filter behavior:
  - Clicking a pill filters the project cards by `data-category`
  - "All" shows everything
  - Filtered-out cards get `display: none` (or CSS class `.hidden`)
  - Transition: smooth opacity when filtering (0.3s)
- State management: `useState` for active filter, passed up or managed in parent `ProjectGrid`
- Integrate with `ProjectGrid.tsx` from ISSUE-09:
  - `ProjectGrid` holds the filter state
  - Passes active filter to `CategoryFilter` and filters the `projects` array before rendering

**Context:** With 10+ projects across 4 categories, visitors need a quick way to focus on what interests them. A recruiter might only care about "Software"; a fellow scientist about "Science."

**Acceptance Criteria:**
- All 5 pills render correctly
- Clicking a pill filters projects immediately
- Active pill has distinct visual style
- "All" shows all cards
- Smooth transition between filter states
- Filter works correctly with the scroll animations from ISSUE-11

**Dependencies:**
- Blocks: nothing
- Blocked by: ISSUE-09

---

### ISSUE-11: Scroll Animations — Intersection Observer

**Goal:** Add entrance animations for project cards and other sections as they scroll into view.

**Description:**
- Create a `useScrollReveal` custom hook or a `ScrollReveal` wrapper component:
  - Uses `IntersectionObserver` (threshold 0.08, rootMargin '0px 0px -40px 0px')
  - When element enters viewport, adds `.visible` class
  - Stagger: each card delays by `index * 80ms`
  - Unobserves after triggering (animate once only)
- Apply to:
  - Project cards in the grid (staggered reveal)
  - About section elements (quote, bio, stats)
  - Any other below-fold content
- CSS for animated elements:
  - Default: `opacity: 0; transform: translateY(24px)`
  - `.visible`: `opacity: 1; transform: translateY(0)` with `transition: opacity 0.6s, transform 0.6s`
- Must work correctly when category filter changes (ISSUE-10):
  - Newly revealed cards that haven't been animated yet should animate in
  - Previously animated cards should remain visible

**Context:** The scroll reveal adds a premium feel to browsing. The stagger creates a cascade effect as the user scrolls. This matches the mockup behavior (lines 820–838).

**Acceptance Criteria:**
- Cards animate in with staggered delay when scrolling to the projects section
- Animation triggers once per element (doesn't replay)
- Works correctly after filtering (re-shown cards don't re-animate)
- Performance: no jank on mobile (use `will-change: transform, opacity`)
- About section elements also animate in

**Dependencies:**
- Blocks: nothing
- Blocked by: ISSUE-09

---

### ISSUE-12: AI Chatbot — OpenAI API Route & Tools

**Goal:** Create the backend API route that handles chat completions with OpenAI, including tool definitions for looking up projects and resources.

**Description:**
- Create `src/app/api/chat/route.ts`:
  - POST endpoint accepting `{ messages: ChatMessage[] }`
  - Uses OpenAI Node SDK (`openai` package)
  - Streams responses using `ReadableStream` (Server-Sent Events pattern)
  - System prompt loaded from `chatContext.ts` (ISSUE-05)
- Define OpenAI tools (function calling):
  1. `search_projects` — searches the projects list by query/category, returns matching projects with URLs
  2. `get_resume_link` — returns the CV download URL
  3. `get_social_links` — returns all social profile URLs
  4. `get_project_detail` — returns detailed info about a specific project by ID
- Tool execution:
  - When OpenAI calls a tool, the route executes it server-side against the data files
  - Results are fed back to OpenAI for the final response
  - Tool results include clickable URLs that the frontend can render as links
- Error handling:
  - Rate limiting (basic: max N requests per minute per IP using in-memory store)
  - Graceful error messages on OpenAI failures
  - Input validation (messages array must be well-formed)
- Environment: `OPENAI_API_KEY` from env vars

**Context:** The chatbot is the flagship feature. It needs to be fast (streaming), informative (tools give it access to real data), and safe (system prompt constrains behavior). The tools make the chatbot genuinely useful — visitors can ask "show me his GitHub repos" and get real links.

**Acceptance Criteria:**
- API route returns streaming responses
- All 4 tools are defined and execute correctly
- System prompt includes safety guardrails
- Rate limiting prevents abuse
- Works with `OPENAI_API_KEY` env var
- Returns well-formed streaming response compatible with standard SSE clients
- Errors return appropriate HTTP status codes and messages

**Dependencies:**
- Blocks: ISSUE-13
- Blocked by: ISSUE-01, ISSUE-05

---

### ISSUE-13: AI Chatbot — Interactive Frontend Integration

**Goal:** Wire the chat panel UI (ISSUE-08) to the API route (ISSUE-12) so the chatbot is fully functional.

**Description:**
- Update `ChatPanel.tsx` to manage conversation state:
  - `messages` state array (role + content)
  - On initial load: show the demo messages as static placeholders
  - When user sends first message: clear demo messages, start real conversation
- Update `ChatInput.tsx`:
  - Enable the input field and send button
  - Handle Enter key and button click to submit
  - Disable input while response is streaming
  - Clear input after send
- Streaming response handling:
  - Call `POST /api/chat` with the message history
  - Stream the response token-by-token into a new assistant message
  - Show a typing indicator while streaming
- Link rendering in AI responses:
  - Parse markdown-style links `[text](url)` in assistant messages
  - Render them as teal-colored clickable `<a>` tags (new tab)
  - This enables the chatbot's tool results to be clickable
- Conversation limits:
  - Keep a maximum message history (last 20 messages) to control token usage
  - Show a gentle message if the user hits a rate limit

**Context:** This brings the chatbot to life. The demo messages show what it can do; once the visitor starts typing, it becomes a real conversational experience. Streaming makes it feel responsive even for complex answers.

**Acceptance Criteria:**
- User can type and send messages
- Responses stream in token-by-token
- Links in AI responses are clickable and open in new tabs
- Typing indicator shows during streaming
- Demo messages clear when real conversation starts
- Input is disabled during streaming
- Works correctly in both light and dark modes
- Graceful error handling (network failure, rate limit)

**Dependencies:**
- Blocks: nothing
- Blocked by: ISSUE-08, ISSUE-12

---

### ISSUE-14: Migrate Static Assets & Legacy Apps

**Goal:** Move all existing media assets and HTML apps into the Next.js `public/` directory so they're served correctly.

**Description:**
- Copy `media/` directory into `next-app/public/media/`:
  - All images (JPGs, PNGs), PDFs, favicon
  - Verify all file paths still work in the data layer
- Copy `apps/` directory into `next-app/public/apps/`:
  - `apps/interestCalculator/interestCalculator.html`
  - `apps/viralspread/viralSpread.html`
  - These files must NOT be modified — they are preserved as-is per requirements
- Update `public/favicon.png` (or convert to `.ico`)
- Update any relative paths in `data/projects.ts` and `data/bio.ts` to reference `/media/...` and `/apps/...` (Next.js public directory paths)
- Verify:
  - CV PDF accessible at `/media/CV_ScottHarris.pdf`
  - Glaucoma paper at `/media/GlaucomaPaper.pdf`
  - Interest calculator at `/apps/interestCalculator/interestCalculator.html`
  - Viral spread simulator at `/apps/viralspread/viralSpread.html`
  - All images load correctly

**Context:** The legacy HTML apps are self-contained (inline JS, CDN dependencies) and must be preserved exactly. Next.js serves anything in `public/` as static files at the root path, so `/apps/viralspread/viralSpread.html` just works.

**Acceptance Criteria:**
- All images display correctly on the new site
- CV PDF downloads correctly
- Both HTML apps load and function identically to the current site
- No modifications to the HTML app files
- Favicon displays in browser tab
- No broken links or missing assets

**Dependencies:**
- Blocks: nothing (but should be done before final QA)
- Blocked by: ISSUE-01

---

### ISSUE-15: About Section Component

**Goal:** Build the About section with pull quote, bio text, and stats row.

**Description:**
- Create `About.tsx` component matching mockup lines 720–741
- Structure:
  - Full-width teal-tinted background strip (`var(--about-bg)`)
  - Inner container (max-width 740px, centered)
  - Pull quote in Instrument Serif italic, teal colored
  - Bio paragraph in Figtree, secondary text color, generous line-height
  - Stats row: 3 items, horizontal flex, centered
    - Each: large number (Instrument Serif, teal) + small label (JetBrains Mono, uppercase, muted)
    - "5+" Publications, "6" Software Tools, "30M" Impressions
- Section has `id="about"` for nav anchor
- Content from `bio.ts` data

**Context:** The about section provides the narrative that ties the projects together. The stats row gives quick credibility signals. The pull quote sets the intellectual tone.

**Acceptance Criteria:**
- Visual match with mockup at all breakpoints
- Stats row wraps gracefully on mobile
- Pull quote renders in italic serif
- Teal-tinted background differentiates this section visually
- Content sourced from data layer

**Dependencies:**
- Blocks: nothing
- Blocked by: ISSUE-02, ISSUE-05

---

### ISSUE-16: Footer Component

**Goal:** Build the minimal footer with copyright and repeated social links.

**Description:**
- Create `Footer.tsx` component matching mockup lines 744–752
- Structure:
  - Teal top border (1px, using `var(--footer-border)`)
  - Copyright: "© 2026 Scott C. Harris, PhD" centered, secondary text
  - Social links row: LinkedIn, GitHub, Google Scholar, Medium as text links
  - Links hover to teal
- Padding: 3rem vertical, 2rem horizontal
- Content from `bio.ts` social links

**Context:** Simple, clean footer. Should not draw attention but provides useful links for visitors who scroll all the way down.

**Acceptance Criteria:**
- Matches mockup styling
- All links work (new tab)
- Responsive (links wrap on small screens)
- Theme-aware (correct colors in both modes)

**Dependencies:**
- Blocks: nothing
- Blocked by: ISSUE-02, ISSUE-05

---

### ISSUE-17: Page Assembly & Route Composition

**Goal:** Assemble all components into the final `page.tsx` and ensure the complete page works end-to-end.

**Description:**
- Update `src/app/page.tsx` to compose all components in order:
  1. `<Hero>` (contains `<CvLinksBar>` and `<ChatPanel>`)
  2. `<ProjectGrid>` (contains `<CategoryFilter>` and `<ProjectCard>`s)
  3. `<About>`
  4. `<Footer>`
- Ensure `<Navigation>` is in `layout.tsx` (renders on all pages)
- Ensure `<AmbientBackground>` is in `layout.tsx`
- Verify:
  - All anchor links (#projects, #resume, #about) scroll to correct sections
  - All data flows from data files through components correctly
  - Page renders server-side where possible (only client components where needed: theme, chat, filter)
  - No hydration mismatches

**Context:** This is the integration issue that brings everything together. All individual components should be built and tested before this.

**Acceptance Criteria:**
- Full page renders matching the approved mockup
- Server-side rendering works (check view-source for content)
- No console errors or hydration warnings
- All interactive features work (theme toggle, nav, filter, scroll animations)
- Page loads fast (Lighthouse performance > 90)

**Dependencies:**
- Blocks: ISSUE-18
- Blocked by: ISSUE-03, ISSUE-04, ISSUE-06, ISSUE-07, ISSUE-08, ISSUE-09, ISSUE-10, ISSUE-11, ISSUE-14, ISSUE-15, ISSUE-16

---

### ISSUE-18: SEO, Metadata & OpenGraph

**Goal:** Configure comprehensive metadata for search engines and social media sharing.

**Description:**
- Update `layout.tsx` metadata export:
  - Title: "Scott C. Harris, PhD — Computational Neuroscientist & AI Engineer"
  - Description: Concise summary for search results
  - OpenGraph tags: title, description, image (need to create or select an OG image), url
  - Twitter card: summary_large_image
  - Favicon: reference from public/
  - `robots`: index, follow
  - `canonical` URL
- Create or select an OpenGraph image (1200x630):
  - Could be a simple branded graphic with name + title on the teal background
  - Place in `public/og-image.png`
- Add structured data (JSON-LD) for Person schema:
  - name, jobTitle, url, sameAs (social links)
- Verify `<head>` renders correctly in page source

**Context:** The site needs to rank for Scott's name and present well when shared on LinkedIn, Twitter, or Slack. Good metadata is essential for a professional portfolio.

**Acceptance Criteria:**
- Page title and description render in `<head>`
- OpenGraph tags present and correct
- Twitter card tags present
- Sharing the URL on LinkedIn/Twitter shows proper preview
- JSON-LD structured data is valid (test with Google's Rich Results tool)
- Favicon shows in browser tab

**Dependencies:**
- Blocks: nothing
- Blocked by: ISSUE-17

---

### ISSUE-19: Responsive QA & Cross-Browser Polish

**Goal:** Comprehensive testing and fix pass across all screen sizes and browsers.

**Description:**
- Test on these breakpoints: 1440px, 1024px, 768px, 480px, 375px
- Test on: Chrome, Firefox, Safari (if available), Edge
- Test both light and dark themes at every breakpoint
- Specific checks:
  - Hero text doesn't overflow on small screens
  - CV bar stacks correctly on mobile
  - Chat panel is usable on mobile (input field accessible, messages readable)
  - Project grid columns adjust correctly
  - Category filter pills wrap without breaking
  - Navigation hamburger works on mobile
  - About section stats row wraps gracefully
  - Footer links wrap
  - No horizontal scroll at any breakpoint
  - Touch targets are at least 44px for mobile
  - Animations don't cause jank on mobile
- Fix any issues found
- Lighthouse audit: aim for 90+ on Performance, Accessibility, Best Practices, SEO

**Context:** Scott's site will be viewed by recruiters, collaborators, and the general public on every device imaginable. A broken mobile layout is a dealbreaker.

**Acceptance Criteria:**
- No layout bugs at any tested breakpoint
- Both themes look correct everywhere
- Lighthouse scores > 90 across all categories
- Touch interactions work on mobile
- No horizontal scrollbar at any size
- Chat is fully usable on mobile

**Dependencies:**
- Blocks: nothing
- Blocked by: ISSUE-17

---

## Issue Dependency Graph

```
ISSUE-01 (Scaffold)
├── ISSUE-02 (Design System)
│   ├── ISSUE-03 (Theme Toggle)
│   │   └── ISSUE-04 (Navigation)
│   ├── ISSUE-06 (Hero Section)
│   ├── ISSUE-07 (CV + Links Bar)
│   ├── ISSUE-08 (Chat UI)
│   │   └── ISSUE-13 (Chat Integration) ← also needs ISSUE-12
│   ├── ISSUE-09 (Projects Grid)
│   │   ├── ISSUE-10 (Category Filter)
│   │   └── ISSUE-11 (Scroll Animations)
│   ├── ISSUE-15 (About Section)
│   └── ISSUE-16 (Footer)
├── ISSUE-05 (Content Data Layer)
│   ├── ISSUE-06, 07, 09, 12, 15, 16 (all content consumers)
│   └── ISSUE-12 (Chat API Route)
│       └── ISSUE-13 (Chat Integration)
├── ISSUE-14 (Migrate Assets)
└── ISSUE-17 (Page Assembly) ← needs all component issues
    ├── ISSUE-18 (SEO & Metadata)
    └── ISSUE-19 (Responsive QA)
```

## Recommended Execution Order

**Wave 1** (can be parallel):
- ISSUE-01: Scaffold

**Wave 2** (can be parallel after Wave 1):
- ISSUE-02: Design System
- ISSUE-05: Content Data Layer
- ISSUE-14: Migrate Assets

**Wave 3** (can be parallel after Wave 2):
- ISSUE-03: Theme Toggle
- ISSUE-06: Hero Section
- ISSUE-07: CV + Links Bar
- ISSUE-08: Chat UI (frontend)
- ISSUE-09: Projects Grid + Cards
- ISSUE-12: Chat API Route
- ISSUE-15: About Section
- ISSUE-16: Footer

**Wave 4** (after Wave 3):
- ISSUE-04: Navigation (needs ISSUE-03)
- ISSUE-10: Category Filter (needs ISSUE-09)
- ISSUE-11: Scroll Animations (needs ISSUE-09)
- ISSUE-13: Chat Integration (needs ISSUE-08 + ISSUE-12)

**Wave 5** (after Wave 4):
- ISSUE-17: Page Assembly

**Wave 6** (after Wave 5):
- ISSUE-18: SEO & Metadata
- ISSUE-19: Responsive QA
