# Brand & Voice System
**File 02 of the instruction set.** Builds on the positioning and "layered disclosure" principle from File 01. This file governs every sentence written for the site — hero copy, case studies, microcopy, even code comments shown on-page.

---

## 1. The three voice pillars (from the brief, expanded into rules)

### Pillar 1 — Clear over clever
No BSA-buzzword soup, no LinkedIn-speak.

| Don't write | Write instead |
|---|---|
| "Synergized cross-functional stakeholder alignment to drive deliverable outcomes." | "Got the design and engineering teams agreeing on scope before a single ticket was written." |
| "Leveraged agile methodologies to optimize sprint velocity." | "Rewrote the sprint template so tickets stopped bouncing back from dev for missing acceptance criteria." |
| "Spearheaded a robust QA framework." | "Built a test-data set that caught the checkout bug three sprints before it would've hit production." |

Rule of thumb: **if you can't picture the sentence being said out loud to a colleague, rewrite it.**

### Pillar 2 — Show the thinking, not just the outcome
Every claim of impact gets a "because" attached, or it doesn't go on the site. "Reduced defect rate by 20%" is a resume line. "Reduced defect rate by 20% by tracing repeat bugs back to a missing null-check on the address form, and getting that written into every future intake ticket as a required test case" is a portfolio line.

### Pillar 3 — Confident, not salesy
State what happened. No exclamation points selling the achievement to the reader. No "I'm passionate about..." openers. Let specifics replace enthusiasm-words.

| Salesy | Confident |
|---|---|
| "I'm incredibly passionate about bridging business and tech!" | "I spend most of my time translating between people who own the business problem and people who own the code." |
| "This project was a huge success!" | "This cut the intake-to-dev handoff time from two weeks to three days." |

---

## 2. Tone sliders — where this portfolio sits

Use these as a gut-check when a sentence feels off. Each slider has a deliberate resting point — not the middle, not an extreme.

```
Formal   ●───────○───────  Casual        → sits ~60% toward formal.
                                            Professional, but never stiff.

Technical ○───────●───────  Plain-spoken  → sits ~65% toward plain.
                                            Technical precision without jargon-for-its-own-sake.

Reserved ○───────●───────  Confident      → sits ~70% toward confident.
                                            States outcomes directly. Doesn't hedge unnecessarily.

Detached ○───────●───────  Personable     → sits ~55% toward personable.
                                            First-person, human, but not chatty or joke-heavy.
```

If in doubt, imagine explaining the project to a smart engineering intern on their first day — informative enough to teach them something, respectful enough that it doesn't feel like a lecture.

---

## 3. Voice forks by layer (this is the part unique to your site)

Because every case study splits into a **Business Layer** and a **Code Layer** (File 01, §6), the voice needs to flex slightly between them — same person talking, different register, like a bilingual speaker switching depending on who's in the room.

### Business Layer voice
- Audience: recruiter, hiring manager, product owner.
- Register: outcome-first, plain language, minimal technical vocabulary.
- Sentence shape: short, front-loaded with the result, then the reasoning.
- Example:
  > "The refund flow was quietly costing support 40+ tickets a month. I sat with two support reps for a day, mapped where customers actually got stuck, and rewrote the flow's requirements around those exact failure points."

### Code Layer voice
- Audience: developer, technical lead, curious intern.
- Register: precise, comfortable naming specific technical concepts, but never assumes the reader already knows *your* context — explain like you're onboarding someone.
- Sentence shape: can be longer, cause-and-effect chains are fine here.
- Example:
  > "The refund state lived in three different places — the order table, a support-ticket flag, and a frontend-only boolean — so a refund could look 'complete' in one place and 'pending' in another. I flagged this as a single-source-of-truth problem in the requirements doc, and worked with the dev team to collapse it down to one status field the frontend just reads from."

**Voice bridge rule:** the Code Layer should never contradict the Business Layer — it should feel like *zooming in* on the same sentence, not switching topics.

---

## 4. Vocabulary — embrace / avoid list

**Embrace** (grounded, specific, verbs over nouns):
- "traced," "mapped," "flagged," "rewrote," "caught," "narrowed down," "sat with," "walked through"
- Concrete nouns: "the checkout flow," "the intake form," "the refund status field" — never vague ones like "the process," "the solution," "the initiative"

**Avoid** (inflated, vague, resume-jargon):
- "leveraged," "synergized," "spearheaded," "robust," "holistic," "cutting-edge," "passionate," "results-driven," "dynamic professional," "thought leadership"
- Filler qualifiers: "very," "really," "extremely," "a lot of" — cut them, the sentence is almost always stronger without

**Use sparingly, and only when precise:**
- Formal BSA terminology (e.g., "acceptance criteria," "user story," "traceability matrix") — fine in Business Layer *if* the reader would reasonably know the term; otherwise define it in one clause inline rather than assuming it.

---

## 5. Mechanics & conventions

- **Person:** First person ("I"), throughout. Never third person ("Jordan believes...").
- **Contractions:** Allowed and encouraged (it's, don't, that's) — keeps the semi-professional register from tipping into stiff.
- **Headings:** Sentence case, not Title Case (e.g., "How I approached the refund flow," not "How I Approached The Refund Flow"). Reads more like a conversation, less like a corporate slide.
- **Numbers:** Always use the real number, never a vague qualifier. "Three sprints," not "several sprints." "40+ tickets a month," not "a significant number of tickets."
- **Jargon glossary approach:** any acronym or BSA/dev term used in a Business Layer gets a 3–6 word inline gloss the first time it appears on a page: *"...a traceability matrix (a table linking each requirement to the test that proves it works)..."* No separate glossary page — define in context, right where it's needed.
- **Code comments shown on-page** (if you embed real snippets): comments should read like you're narrating to the intern persona specifically — plain, a little informal, no "// TODO" leftovers from real dev work unless intentional.

---

## 6. Sample rewrites (before/after, one per content type)

**Hero copy**
- ❌ "Results-driven Business Systems Analyst passionate about delivering innovative solutions at the intersection of business and technology."
- ✅ "I write requirements developers don't have to guess at — and read enough code to know when a requirement is actually worth building."

**Case study intro line**
- ❌ "This case study explores my role in optimizing the customer onboarding experience through cross-functional collaboration."
- ✅ "Onboarding had a 30% drop-off at step 3. Here's how I found out why, and what changed."

**About page opener**
- ❌ "With a diverse background spanning QA, test data analysis, and business systems analysis, I bring a unique perspective to every project."
- ✅ "I started in QA — finding what breaks — before moving into business analysis, which turned out to be finding what breaks *before it's built.*"

**Button / microcopy**
- ❌ "Learn More About This Solution"
- ✅ "See how this got built" / "Expand the code layer"

---

## 7. Self-review checklist (run every piece of copy through this before it ships)

- [ ] Could I say this sentence out loud to a colleague without it sounding like a template?
- [ ] Is there a claim here with no "because" attached? Attach one or cut the claim.
- [ ] Any word from the "avoid" list snuck in?
- [ ] Does the Code Layer *zoom in* on the Business Layer's claim, or does it feel like a different topic?
- [ ] Would an intern learn something real from this, or does it just sound impressive?
- [ ] Is every acronym/term defined the first time it's used on that page?

---

## Instruction file roadmap (updated)

| # | File | Status |
|---|---|---|
| 01 | Portfolio Strategy & Brief | ✅ Done |
| 02 | **Brand & Voice System** *(this file)* | ✅ Done |
| 03 | Content Strategy & Case Study Anatomy | Next |
| 04 | Visual Design System | Pending |
| 05 | Component & Technical Architecture | Pending |

Next up: **File 03 — Content Strategy & Case Study Anatomy**, where we define the exact section-by-section structure every case study follows (this is where the Business Layer / Code Layer split becomes a concrete template, not just a principle).
