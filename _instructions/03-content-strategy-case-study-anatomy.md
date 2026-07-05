# Content Strategy & Case Study Anatomy
**File 03 of the instruction set.** This turns File 01's "layered disclosure" principle and File 02's voice rules into an exact, repeatable template — down to the field level, since File 01 §7 already commits you to content-as-data feeding generic components. Think of this file as the requirements doc for your own portfolio content. (Writing it this way is itself a small proof point of the BSA-who-thinks-in-structured-data pitch.)

---

## 1. What a case study is *for*

Not a project log. Not a resume bullet expanded to a paragraph. Each case study exists to prove one thing from the positioning statement (File 01 §3) using one real example — business framing in, technical fluency out. Pick case studies, and structure them, around that test.

**Rule: 3–5 case studies, not 10.** A portfolio with ten shallow case studies reads as busywork. Three or four deep ones, each proving a distinct facet (one heavier on business/requirements work, one heavier on UX judgment, one heavier on code-level debugging or QA/test-data work), reads as range with depth.

---

## 2. Case study selection criteria

Before writing one, check it against these. If it fails more than one, pick a different project or reframe the angle.

- [ ] There's a **real before/after** — a measurable or clearly observable change, not just "I was involved."
- [ ] You can describe **one specific decision you made** that a different person might not have made the same way.
- [ ] There's something to show at the **code/data level** — a snippet, a schema, a query, a bug trace, a test case — not just a diagram of a process.
- [ ] It reflects **your actual role** honestly — don't inflate a supporting role into ownership. (A hiring manager will ask follow-up questions; the story needs to survive them.)

---

## 3. The Case Study Template (field-by-field)

Structured as content fields, matching how it should eventually live as frontmatter/data (MDX or JSON) feeding the `<LayeredCaseStudy>` component from File 01 §7.

```yaml
# --- METADATA (drives card previews, filtering, and page header) ---
title: string                 # e.g. "Fixing a refund flow that was quietly costing support 40+ tickets a month"
                               # NOTE: title = the hook itself, not a project name. See §4.
role: string                  # e.g. "Business Systems Analyst" — your actual role on this project
timeframe: string             # e.g. "6 weeks, 2025"
skills_demonstrated: [tag]    # e.g. [requirements, ux-research, sql, qa-test-design]
stack: [tag]                  # e.g. [react, postgres, jira] — only if relevant to the Code Layer
featured: boolean             # controls homepage placement
summary: string               # 1–2 sentences, this is what shows on the case study index/card
```

```
# --- BUSINESS LAYER (always visible, no expand needed) ---

## The Hook
1–2 sentences. States the problem and the outcome up front. This is the ONLY
part a skimming recruiter needs to read. Follows Pillar 3 (confident, not salesy)
from File 02.

## Context
2–4 sentences. Who asked for this, why, what was actually going wrong from the
business's point of view. No technical detail yet.

## What I Did
1 short paragraph, or 3–5 bullet points. The actual BSA work: who you talked to,
what you mapped, what you wrote, what decision you drove. This is where "show
the thinking, not just the outcome" (File 02, Pillar 2) matters most.

## The Outcome
1–2 sentences with a real number or a clearly observable change. If there's no
real number, describe the concrete change in behavior/process instead of
inventing a metric.
```

```
# --- LAYER TRANSITION (a literal UI moment, not just a heading) ---
A visible, deliberate toggle/expand control — not a scroll continuation.
Copy per File 02 §6 microcopy examples: "See how this got built" /
"Expand the code layer." Collapsed by default (File 01 §6).
```

```
# --- CODE LAYER (expandable, technical register) ---

## Technical Context
2–4 sentences. What was actually happening in the system — architecture,
data flow, or process detail a developer or intern needs to follow along.
Define any term a PO wouldn't already know (File 02 §5 jargon rule still
applies even here — an intern reading this may not know your specific stack).

## The Investigation / The Decision
The heart of the code layer. Walk through the actual technical reasoning:
what you found, why it mattered, what the fix or recommendation was. This
is allowed to be longer and more sequential (File 02 §3).

## Evidence
- A real code snippet, schema diagram, query, or test case — actual artifact,
  not a paraphrase of one. (If proprietary code can't be shown, recreate a
  redacted/simplified version that preserves the actual logic.)
- One caption per artifact written *to the intern persona specifically* —
  this is the single clearest place to prove "can explain code to anyone."

## What I'd Tell an Intern
Optional but high-value: 2–4 sentences distilling the one lesson from this
investigation into plain language, as if mentoring someone. This section
alone does a lot of work proving the core positioning statement.
```

```
# --- CLOSE ---

## Reflection
1–2 sentences: what you'd do differently, or what this taught you. Keeps
the tone honest, not a highlight reel.

## Links
Repo (if shareable/redactable), live demo, or "details available on request"
for confidential work.
```

---

## 4. Title-writing rule

Case study titles should be **the hook itself**, not a project label.

| Weak (project-label) | Strong (hook-as-title) |
|---|---|
| "Checkout Flow Redesign" | "Why 1 in 5 users abandoned checkout at the payment step" |
| "QA Process Improvement" | "Building a test-data set that caught bugs three sprints early" |

This does double duty: it works as an index-page card headline *and* as the first sentence a recruiter reads.

---

## 5. Content strategy for the other pages

### Home
- One screen: the positioning statement (File 01 §3), stated in your own voice (File 02 hero example).
- Immediately below: 3 featured case study cards (title = hook, one-line summary, tag chips for skills demonstrated).
- No skills-logo grid (File 01 §5) — if a skill matters, a case study proves it.

### How I Work
- A short, honest walk-through of your actual process: discovery → requirements → dev handoff → QA/validation.
- This is the natural home for your QA / test-data-analyst background — frame it as *why* your requirements are more testable than a typical BSA's, not as a separate résumé section.
- Consider one small diagram here (this is the one page where a process visual earns its place — see File 04 for whether/how it fits the visual system).

### About
- Short. 2–3 short paragraphs, first person, following the About rewrite pattern in File 02 §6.
- One clear narrative arc: QA → test data → BSA, and why that arc matters to how you work now (already drafted the opening line in File 02).
- No full career timeline — that's what a linked resume is for.

### Contact
- Minimal. Email, LinkedIn, resume link. No contact form unless there's a real reason to gate the interaction.

---

## 6. Tagging schema (for filtering + File 05 data model)

Two tag dimensions, kept small and deliberate — this becomes the `skills_demonstrated` and `stack` fields in the metadata block above:

- **Skill tags** (business/BSA-facing): `requirements`, `stakeholder-alignment`, `ux-research`, `process-mapping`, `qa-test-design`, `test-data-strategy`, `data-analysis`
- **Stack tags** (dev-facing, only shown/relevant inside the Code Layer): `react`, `sql`, `api-design`, `postgres`, whatever's actually true per project

Keep each list under ~8 tags total across all case studies. A tag used once isn't a tag, it's a fact you should just state in prose.

---

## 7. Pre-publish checklist per case study

- [ ] Passes all 4 selection criteria in §2.
- [ ] Title is a hook, not a label (§4).
- [ ] Business Layer alone (without expanding) fully makes sense to a recruiter who reads nothing else.
- [ ] Code Layer has at least one real artifact (snippet/schema/query), not just prose describing one.
- [ ] Run all copy through File 02 §7's voice checklist.
- [ ] Metadata fields (§3) are filled out completely — this is what will drive the homepage cards and filtering once File 05's component architecture is built.

---

## Instruction file roadmap (updated)

| # | File | Status |
|---|---|---|
| 01 | Portfolio Strategy & Brief | ✅ Done |
| 02 | Brand & Voice System | ✅ Done |
| 03 | **Content Strategy & Case Study Anatomy** *(this file)* | ✅ Done |
| 04 | Visual Design System | Next |
| 05 | Component & Technical Architecture | Pending |

Next up: **File 04 — Visual Design System** — color, type, spacing, and whether/how to visually nod to the "business ↔ code bridge" idea (the open question flagged back in File 01 §9).
