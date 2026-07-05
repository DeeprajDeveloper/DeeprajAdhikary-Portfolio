# Visual Design System
**File 04 of the instruction set.** This resolves the open question from File 01 §9. The direction below is deliberately *not* the developer-portfolio cliché (dark terminal, matrix rain, monospace-everywhere, glowing code windows). It's built around a different metaphor — one that's actually yours.

---

## 0. The guiding metaphor: "The Annotator"

You're not a developer performing "hacker aesthetic." You're a BSA/QA person whose actual daily tools are: **redlines, highlighter marks, flagged comments, sticky notes, review annotations.** That's a real, specific, un-cliché visual language, and it's the one this system is built around.

- **Black** = ink. Structure, precision, the written word — requirements docs, clean copy, clear thinking.
- **Yellow** = the highlighter. Used the way you'd actually use a highlighter — sparingly, to mark what matters: an active tag, a flagged detail, an underline on a key phrase, the toggle that reveals the Code Layer.
- **Paper**, not terminal-black, as the base surface. You're not staring at a screen full of syntax highlighting — you're looking at an annotated page.

This single idea should discipline every choice below. If a component ever starts to look like a code editor or a terminal, it's off-brand — pull it back toward "annotated document."

### Explicitly avoid (per your direction)
Terminal/console windows or prompt icons (`>_`), matrix-style falling characters, monospace font used for anything *other than actual embedded code*, neon green-on-black, glitch/typewriter text animations, glowing borders, circuit-board background textures, floating 3D code brackets `{ }` as decoration, ASCII art. None of these earn a place here.

---

## 1. Color system

| Token | Hex | Role |
|---|---|---|
| `ink` | `#111111` | Primary text, primary UI ink. Near-black, not pure `#000` (softer, more "printed" than "screen"). |
| `paper` | `#FAF9F4` | Primary background. Warm off-white — actual paper, not clinical white. |
| `highlighter-yellow` | `#F5C518` | Primary accent. Small doses only: tag chips, active states, underline accents, the layer-toggle affordance, icon fills. |
| `mustard` | `#C99A2E` | Secondary/deeper yellow. Larger surfaces where full highlighter-yellow would be too loud — card accents, section dividers, hover backgrounds. |
| `slate-100` | `#F5F5F3` | Subtle background fills (card backgrounds on paper). |
| `slate-300` | `#E8E7E1` | Borders, dividers. |
| `slate-500` | `#C9C7BE` | Disabled states, placeholder text. |
| `slate-700` | `#8A877D` | Secondary/supporting text. |
| `slate-900` | `#57544C` | Tertiary text, captions. |
| `signal-green` (muted) | `#4B7B4F` | Success / positive outcome indicators only — e.g. a metric in the Outcome section. Used rarely. |
| `signal-rust` (muted) | `#B4472A` | Error / bug-flag indicator — e.g. marking the actual defect in a Code Layer walkthrough. Used rarely. |

**Hard rule — accessibility:** never set `highlighter-yellow` or `mustard` as *text color* on `paper` — contrast fails. Yellow is always a **fill behind ink text**, an **underline/border accent**, or an **icon color**, never body copy color.

**Usage ratio (roughly):** 60% paper, 30% ink, 8% slate neutrals, 2% yellow. Yellow works because it's rare. If a page feels like a hazard sign, pull it back.

---

## 2. Typography

Three fonts, three distinct jobs — not three fonts fighting for attention.

| Font | Role | Why |
|---|---|---|
| **Stack Sans Notch** | Headings, nav, labels, buttons, UI chrome | A geometric sans with a distinctive "notched" cut in its letterforms — it was actually designed by Koto Studio for Stack Overflow's identity. That's a nice, quiet nod to dev culture without a single line of "code font" cliché. Confident and a little crafted, not generic. |
| **Playfair Display** | Editorial accents only — hook lines, pull quotes, the one big statement per page | A serif with real personality. Used *sparingly* (one element per page, max) so it reads as "the human, considered voice," not decoration. This is what keeps the whole system from feeling purely technical. |
| **Source Sans Pro** | Body copy, all Business Layer and Code Layer prose | Workhorse humanist sans. Highly readable at length — this is what someone actually reads for two paragraphs, so it needs to disappear and let the words carry it. |

**Rule: never more than two fonts visible on one screen at once.** Stack Sans Notch + Source Sans Pro is the default pairing on every page. Playfair Display appears as a single accent element — a hero hook line, a pull quote in a case study — never as a whole paragraph, never alongside Stack Sans Notch in the same heading group.

### Type scale (rem, 16px base)

| Style | Font | Weight | Size / Line-height |
|---|---|---|---|
| Display (hero hook) | Playfair Display, italic | 400 | 2.25rem / 1.3 |
| H1 | Stack Sans Notch | 700 | 3rem / 1.1 |
| H2 | Stack Sans Notch | 600 | 2rem / 1.2 |
| H3 | Stack Sans Notch | 600 | 1.5rem / 1.3 |
| H4 / UI labels | Stack Sans Notch | 500 | 1.125rem / 1.4 |
| Body | Source Sans Pro | 400 | 1rem / 1.6 |
| Body — Code Layer | Source Sans Pro | 400 | 0.9375rem / 1.6 (very slightly denser — signals "you're in the technical layer now") |
| Small / caption | Source Sans Pro | 400 | 0.875rem / 1.5 |
| Code snippets | `ui-monospace, "Source Code Pro", monospace` | 400 | 0.875rem / 1.5 |

**On the code snippet font:** this is the *one* place monospace belongs — it's functionally necessary for reading actual code. Style it low-key: small, on a `slate-100` background with a thin `slate-300` border, ink text. Never green-on-black, never full-bleed, never larger than body text.

---

## 3. Spacing & grid

- Base unit: **8px.** Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96.
- Content max-width (readable text column): **680–720px.**
- Page container max-width: **1200px.**
- Grid gutter: 24px.
- Breakpoints: sm 480px, md 768px, lg 1024px, xl 1280px.

---

## 4. Shape, elevation, borders

- **Corner radius:** 6px on small elements (buttons, tags), 10px on cards — reads like the rounded corner of an index card or sticky note, not a soft SaaS-app pill.
- **Shadow:** one soft shadow only — `0 2px 8px rgba(17,17,17,0.06)` — like a piece of paper lifted slightly off a desk. No heavy drop shadows, no glow/neumorphism.
- **Borders:** 1px `slate-300` as the default divider — thin, precise, like a ruled line on a page.

---

## 5. Iconography

- Simple line icons, ~1.5px stroke, no fill except inside `highlighter-yellow` accent moments.
- Recurring custom motifs tied to the Annotator metaphor instead of dev iconography: a **checkmark** (validated/tested), a **flag** (flagged issue), a **strikethrough/redline mark** (before → after), a **highlighter swipe** (the layer-toggle icon).
- Explicitly avoid dev-cliché icons: no curly braces `{}`, no terminal cursor, no `</>` tag icon, no circuit/chip icons.

---

## 6. Motion

One signature interaction, used consistently, everything else minimal:

- **Highlighter swipe:** on hover/focus of links and the Layer Toggle button, a `highlighter-yellow` fill sweeps left-to-right behind the text, ~220ms ease-out — mimics an actual highlighter stroke. This is the one "delight" moment in the whole system; let it carry that weight alone.
- Everything else: simple opacity/fade transitions, ~150ms, ease-out. No springs, no bounce, no glitch/typewriter effects.

---

## 7. The Design System Page (build this *before* the real portfolio)

Per your instruction: before writing a single real portfolio page, build a standalone internal reference page — effectively your own lightweight Storybook — that renders every token and component from this file in one place, with its own navigation. This does three jobs: it lets you fix the design system visually before content exists, it becomes the literal source of the reusable components (File 05 wires these same components into real pages — nothing gets rebuilt), and it's a live artifact of "componentized, plug-and-play" thinking if you ever wanted to show it to someone.

### Page structure
A two-column layout: **sticky left-side nav** (anchor links, active-section highlight using `highlighter-yellow`) + main content column showing live rendered specimens for each section.

### Required nav sections / components to include

**Foundations**
1. Color — swatches for every token in §1, with hex + usage note shown on hover.
2. Typography — live specimens of every row in the §2 scale, all three fonts shown at actual size, plus one example of the "two-font max per screen" rule in practice.
3. Spacing & Grid — visual ruler showing the 8px scale, and a container-width diagram.
4. Iconography — the full icon set from §5, rendered at actual size.
5. Motion — a live, hoverable demo of the highlighter-swipe interaction from §6.

**Components**
6. Buttons — primary (ink bg / paper text), secondary (paper bg / ink border), tertiary/text-link — all states: default, hover, focus, disabled.
7. Tags / Badges — both tag types from File 03 §6 (skill tags, stack tags), shown as they'll appear on case study cards.
8. Cards — the case study preview card (title-as-hook, summary, tags, using File 03's metadata fields).
9. **Layer Toggle** — the signature component. Collapsed and expanded states, both Business Layer and Code Layer content styled per §2's "slightly denser" Code Layer body rule.
10. Code snippet block — styled per §2, with a caption slot (per File 03's "caption written to the intern persona" rule).
11. Callouts — two variants: "What I'd Tell an Intern" (mustard-accented) and a Reflection callout (slate-neutral).
12. Navigation — the actual site header/nav component, shown in both default and scrolled states.
13. Forms/inputs — only if Contact ends up needing more than a mailto link (File 03 §5 flags this as minimal-by-default).
14. Footer.

### Build-order rule
Nothing in the real portfolio gets custom one-off styling. If a page needs something not in this list, it gets added to the Design System Page *first*, then reused — keeping the plug-and-play discipline from File 01 §7 honest from day one.

---

## 8. Addendum — Hero, Nav & Journey (locked after prototype review)

The hero prototype confirmed the direction below. These are now canonical, not exploratory.

- **Base font size:** root set to **15px** (was 16px). One CSS variable controls it — flip to 14px later if it still feels large once real content is in place. All rem-based type in §2 scales off this root.
- **Hero:** full viewport height (`100vh`, `min-height: 640px`), the primary focus of the homepage. Content: eyebrow tag (ink bg, highlighter-yellow text) → hook line (Playfair Display italic, one phrase underlined in a highlighter-yellow inline mark) → one-sentence subhead (Source Sans Pro) → single CTA button linking to Case Studies.
- **Signature interactive element:** a soft `highlighter-yellow` radial glow over a dot-grid ("ruled paper") background, following the cursor on pointer devices, drifting ambiently on touch devices. This is the one deliberate "delight" moment on the whole site — nothing else in the hero competes with it for attention.
- **Nav integration:** transparent, sitting directly inside the hero composition (not a bar overlaid on it) until ~60px of scroll, then condenses into a solid `paper` bar with a hairline `slate-300` bottom border. This is the one and only nav-state transition on the site.
- **Scroll cue:** a small bottom-of-hero control (vertical line with a highlighter "pour" animation) that smooth-scrolls to the next section — not decorative, it's the literal call to keep going.
- **Career Journey:** a small, single-line horizontal strip directly below the hero, before Case Studies. Three milestones only (QA Tester → Test Data Analyst → BSA), connected by a hairline rule with small flag markers — chronology is real here, so the sequential treatment is earned, not decorative (per the "don't use 01/02/03 unless order carries information" rule).
- **Page order confirmed:** Nav → Hero → Career Journey → Case Studies → (remaining pages per File 03 §5).

## Instruction file roadmap (updated)

| # | File | Status |
|---|---|---|
| 01 | Portfolio Strategy & Brief | ✅ Done |
| 02 | Brand & Voice System | ✅ Done |
| 03 | Content Strategy & Case Study Anatomy | ✅ Done |
| 04 | **Visual Design System** *(this file)* | ✅ Done |
| 05 | Component & Technical Architecture | Next |

Next up: **File 05 — Component & Technical Architecture** — the Next.js data model (this is where File 03's YAML metadata schema becomes real MDX/JSON frontmatter), component props, and file/folder structure. After that, we can actually build the Design System Page itself as a working Next.js prototype.
