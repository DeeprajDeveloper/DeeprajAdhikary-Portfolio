# Portfolio Strategy & Brief
**File 01 of the instruction set — read this first. Every later doc (visual system, components, content strategy) must trace back to a decision made here.**

---

## 1. Why this portfolio exists

Most BSA / Business Analyst portfolios read like resumes with nicer fonts — a list of tools, a list of certifications, maybe a Trello screenshot. That's not the gap this portfolio fills.

The gap: **a BSA who doesn't stop at the requirements doc.** Someone who can sit in a stakeholder meeting and translate "the checkout flow feels clunky" into a testable acceptance criterion — *and* can then open the repo, read the component that renders that checkout flow, and tell an intern why it's clunky at the code level.

That's the one sentence this whole site has to prove, over and over, in different formats: **business framing in, technical fluency out.**

---

## 2. Who's actually looking at this

Design every page with one of these four readers in the room. If a page can't survive being read by at least two of them, it's too narrow.

| Persona | What they're scanning for | What makes them bounce |
|---|---|---|
| **Hiring Manager / Recruiter** | Can this person operate independently? Do they communicate clearly? | Walls of jargon, no clear outcome stated up top |
| **Engineering Lead / Dev they'd work with** | Do they actually get how software is built, or do they just draw boxes? | Vague "worked closely with developers" claims with zero evidence |
| **Product Owner / Business stakeholder** | Can this person turn my vague ask into something buildable? | Too much code, not enough "so what did the business get" |
| **Intern / Junior dev** | Would this person's explanation actually teach me something? | Condescension, or explanations that assume too much prior knowledge |

Design principle that falls out of this: **every case study needs a "business layer" and a "code layer," and the reader should be able to tell which one they're in at a glance** (this becomes a literal component in the design system — see file 04).

---

## 3. The core narrative (your positioning statement)

Use this as the north star for hero copy, about page, and case study framing:

> *"I work in the space between the business problem and the codebase. I write requirements a developer won't have to guess at, and I read enough code to know when a requirement is actually solvable, testable, and worth building."*

Three proof points this narrative needs backing by content on the site:
1. **Business-oriented problem solving** — evidence of translating ambiguous asks into structured, testable requirements.
2. **UX-oriented problem solving** — evidence of thinking about the *experience*, not just the process (your QA/test-data background is an asset here — testers are trained to think in edge cases and user paths).
3. **Code-level fluency** — evidence you can read a diff, a component, or a query and explain it plainly. This doesn't mean you need to be a developer. It means you can be trusted in a technical room.

---

## 4. Voice & tone (expanded fully in file 02, seeded here)

**Semi-professional** = confident and structured, but not stiff or corporate-jargon-heavy. Think: *how you'd actually explain a project to a smart intern over coffee*, not how you'd write a formal business requirements document.

Three tone anchors:
- **Clear over clever.** No BSA-buzzword soup ("synergized cross-functional deliverables"). Say what happened.
- **Show the thinking, not just the outcome.** A recruiter wants the result. A dev wants to see *how you got there.* Give both, but let the reader choose their depth (see "layered disclosure" in section 6).
- **Confident, not salesy.** State what you did plainly. Let the evidence (code, artifacts, before/after) do the persuading.

---

## 5. Site structure (the pages/sections this brief implies)

- **Home** — the positioning statement, distilled to one screen. Not a bio dump.
- **Case Studies** (the core of the site) — each one structured with the Business Layer / Code Layer split from section 2.
- **How I Work** — your actual process as a BSA (discovery → requirements → dev handoff → QA/validation). This is where your QA + test-data-analyst background becomes a differentiator, not a footnote.
- **About** — short, human, not a full career history (that's what the resume/LinkedIn link is for).
- **Contact / Resume link**

Note what's *not* here: no generic "Skills" grid of logos. If a skill matters, it should be demonstrated inside a case study, not listed in a badge.

---

## 6. The "layered disclosure" principle

This is the single most important UX decision for this portfolio, and it comes directly from your dual audience problem (PO vs. intern vs. dev vs. recruiter).

Every case study should default to a **business-readable summary**, with an **expandable technical layer** underneath — collapsed by default, one click/tap to reveal. This lets:
- A recruiter skim the top layer in 30 seconds and get the point.
- A dev or intern expand and see actual code snippets, architecture notes, or a "here's the bug and here's the fix" walkthrough.

This principle should become a literal reusable component (`<LayeredCaseStudy>` or similar — defined in file 04) rather than something you rebuild per page. This is also where your "plug-and-play" instinct pays off: one component, reused for every case study, fed different content.

---

## 7. Technical philosophy for the build itself

Since you're building in React/Next.js and you already think in "componentized, plug-and-play" terms from your other two apps, carry that discipline into the portfolio itself — it's also evidence of how you think:

- **Content/data separated from presentation.** Case studies should live as structured data (MDX, JSON, or a headless CMS later) feeding generic components — not hardcoded JSX per case study. A dev looking at your repo should see this immediately.
- **Componentize by role, not by page.** `<LayeredCaseStudy>`, `<BusinessLayer>`, `<CodeLayer>`, `<ProcessTimeline>` — reusable across the site, not one-off per-page markup.
- **Config-driven where reasonable.** Theming tokens, nav structure, and case-study metadata should be swappable without touching component internals — same plug-and-play mindset as your other apps.

This becomes its own instruction file (05 — Technical/Component Architecture) once the visual design system is locked.

---

## 8. Success criteria — how you'll know this worked

- A recruiter can state your value proposition back to you after 60 seconds on the home page.
- A developer you've never met could read one case study's Code Layer and understand a real technical decision you made.
- Nothing on the site requires you to be in the room to explain it.

---

## 9. Open decisions carried forward (to resolve in later files)

- [ ] Visual identity direction: how literally do we lean into "BSA/dev bridge" visually (e.g., a subtle diagram/wireframe motif) vs. keeping it a purely editorial/clean tech aesthetic?
- [ ] Color/typography system — file 02.
- [ ] Exact anatomy of a Case Study (what sections, in what order) — file 03.
- [ ] Component inventory and props/config shape — file 04.
- [ ] Next.js architecture: content source (MDX vs JSON vs CMS), routing, theming approach — file 05.

---

## Instruction file roadmap

| # | File | Purpose |
|---|---|---|
| 01 | **Portfolio Strategy & Brief** *(this file)* | Positioning, audience, narrative, success criteria |
| 02 | Brand & Voice System | Tone rules, writing patterns, do/don't examples |
| 03 | Content Strategy & Case Study Anatomy | The exact structure every case study follows |
| 04 | Visual Design System | Color, type, spacing, motion, component visual specs |
| 05 | Component & Technical Architecture | React/Next.js component inventory, data shape, theming/config approach |

Next step: **file 02, Brand & Voice**, or **file 04, Visual Design System** — your call on which to tackle next.
