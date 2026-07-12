# Playground — Requirements Spec
**File 06 of the instruction set.** Written in your own format on purpose — a requirements doc for the part of the site that's allowed to be fun. Covers the Playground landing page, its nav entry, and full requirements for all four features from the earlier brainstorm.

---

## 0. Playground landing page & nav integration

**Nav entry:** add "Playground" as a new tab in the tabbed index nav (File 05's nav component). Since this section is meant to feel a little different from the rest of the site, give its tick mark a small filled star instead of the plain hollow tick the other tabs use when inactive — still `highlighter-yellow` when active, so it stays in-system, just distinguishable at a glance as "the one that's for fun."

**Route:** `/playground` — index page with four cards (reuse `<CaseStudyCard>`'s visual treatment, renamed conceptually to `<PlaygroundCard>`: title, one-line description, "Try it" button). Each links to its own route: `/playground/annotate`, `/playground/mask-a-record`, `/playground/requirements-generator`. The console egg doesn't need its own route — it's passive — but gets a small card on the landing page anyway: *"One more thing — open your console"* with no further explanation, so it stays a genuine find.

**Out of scope for v1:** a fifth "meta" playground item that lets visitors submit their own easter egg idea. Fun thought, real scope creep — leave it for later if the section takes off.

---

## 1. Highlighter Annotate Mode

**User story:** As a visitor, I want to highlight text across the site the way Deepraj annotates a document, so I can interact with the design metaphor directly instead of just seeing it applied to his content.

### Functional requirements
- **FR1** — A toggle (pen/highlighter icon) enables "Annotate Mode" site-wide, not just on the Playground page. Surface the toggle on the Playground page as where it's introduced/explained, but once enabled it persists across navigation for the rest of the session.
- **FR2** — While enabled, dragging across any text inside a block marked `data-annotatable` applies a persistent `highlighter-yellow` mark behind the selected text.
- **FR3** — Marks are session-only (client-side state) — no backend, no account, no persistence across reloads for v1.
- **FR4** — First activation shows a brief one-time toast: *"You're highlighting the page now — try dragging over anything."*
- **FR5** — A "Clear all marks" control appears once at least one mark exists.

### Acceptance criteria
- Given Annotate Mode is off, when a visitor drags over text, then normal browser text selection occurs — no mark applied.
- Given Annotate Mode is on, when a visitor drags across text inside a `data-annotatable` block, then a persistent yellow mark renders behind that exact selection.
- Given one or more marks exist, when the visitor clicks "Clear all," then every mark is removed and the control disappears.
- Given the visitor reloads the page, then all marks reset (v1 has no persistence — flag below as an open decision).

### UX / design notes
Cursor changes to a custom highlighter-pen icon while active. The toggle uses the same visual treatment as active nav state (ink background, yellow icon). Restrict the feature to prose/body text (`data-annotatable` blocks only) — don't let it apply inside buttons, tags, or nav, which would visually collide with your existing yellow accents.

### Technical notes
Use the Selection/Range Web API to capture the active selection, then wrap it with `Range.surroundContents()` inside a styled `<mark>`. For v1, scope this to single-element selections only (see edge cases) rather than building full cross-node range handling.

### Edge cases / QA (worth testing explicitly, given your background)
- Selections spanning multiple DOM elements/tags — `surroundContents()` throws on partial multi-node ranges; either catch and no-op gracefully, or restrict marking to single-block selections for v1.
- Overlapping highlight attempts on already-marked text.
- Touch-based selection behaves differently than desktop drag — test on mobile separately.
- Accessibility: toggle needs `aria-pressed`; marks shouldn't disrupt screen-reader reading order.

### Open decision
Should marks persist via `localStorage` across reloads within the same browser? Nice-to-have, not required for the feature to land — flagging rather than deciding for you.

### Out of scope (v1)
Cross-session persistence, exporting/sharing your annotated version of the site, multi-user shared highlights.

---

## 2. Mask-a-Record Playground

**User story:** As a visitor, I want to see how test data masking actually works, so I can understand a real specialized skill of Deepraj's hands-on, not just read a claim about it.

### Functional requirements
- **FR1** — Display a sample "Customer Record" card (Name, Email, Account Number, Address) with obviously fake but realistic sample data.
- **FR2** — A second, linked "Transaction Record" card references the same Account Number — this is what demonstrates referential integrity.
- **FR3** — A "Mask this record" button transforms all sensitive fields into masked values, preserving format (email still looks like an email, account number stays numeric-length) — and updates the *same* masked Account Number on both cards simultaneously.
- **FR4** — A second control, "Break referential integrity (see what goes wrong)," intentionally desyncs the two masked Account Numbers and shows a mismatch indicator — this is the actual teaching moment from Case Study 1's Code Layer, made interactive.
- **FR5** — A collapsed-by-default explanation panel (reuses `<Callout variant="intern">`) unpacks what just happened in plain language.

### Acceptance criteria
- Given the initial unmasked state, when the visitor clicks "Mask this record," then all sensitive fields transform into masked values while preserving their format type.
- Given the record is masked, when the visitor views the linked Transaction Record, then its masked Account Number exactly matches the Customer Record's.
- Given the visitor clicks "Break referential integrity," then the two masked Account Numbers diverge and a mismatch flag (`signal-rust` token) appears next to both.
- Given the visitor clicks "Reset," then both cards return to their original unmasked sample state.

### UX / design notes — one real conflict with File 04, flagging directly
A "scramble" or character-by-character reveal is the obvious animation choice here, but File 04 §0 explicitly bans typewriter/glitch text effects as a hacker-aesthetic cliché. Recommend a clean cross-fade or a quick highlighter-swipe reveal on the masked value instead — same "something is happening" feedback, without reaching for the one animation style the whole design system was built to avoid.

### Technical notes
Fully client-side — a small deterministic hash function (same input always produces the same masked output within a session) rather than random-per-click, since determinism is the actual point being demonstrated. No backend, no real data involved at any point.

### Edge cases / QA
- Rapid double-clicking "Mask"/"Reset" shouldn't desync the animation state.
- Decide (open question) whether masked values should be deterministic per browser session or regenerate fresh each visit — deterministic teaches the lesson more clearly, recommend that.

### Out of scope (v1)
A real backend masking service, visitor-editable input fields, additional record types beyond the two demo cards.

---

## 3. Vague-Complaint-to-Requirement Generator

**User story:** As a visitor, I want to type a vague complaint and see it turned into a properly structured requirement, so I can experience the actual translation skill behind Deepraj's positioning statement, not just read about it.

### Functional requirements
- **FR1** — A single text input, placeholder: *"e.g. 'the checkout feels weird'"*.
- **FR2** — Submit produces a Given/When/Then formatted acceptance criterion, with a short, dry framing line above it.
- **FR3** — A "Try another example" control pre-fills the input with a rotating sample complaint, for visitors who can't think of one on the spot.
- **FR4** — Output card includes a small tagline for personality — e.g. *"Translated by someone who's heard this exact sentence in a stakeholder meeting."*

### Acceptance criteria
- Given a visitor submits a non-empty complaint, when processing completes, then a Given/When/Then block renders.
- Given the input is empty, when the visitor clicks submit, then a gentle inline prompt appears instead of an error state — *"Try typing a complaint first, even a vague one."*
- Given the visitor clicks "Try another example," then the input fills with one of a rotating set of sample complaints.

### Technical notes — a real build decision, not a default
**v1 (recommended to start):** template-based, not AI-generated. A small set of pattern categories (visual complaint, performance complaint, usability complaint) with the visitor's own words slotted mad-libs-style into a Given/When/Then template. Fast, free, fully reliable, and still feels personalized because their actual words appear in the output.

**v2 (optional stretch):** genuinely open-ended generation via a real API call — this environment already supports making Claude API requests directly from an artifact (documented in your build environment as "AI-powered Artifacts"), so this is a real, available option later. The tradeoff: arbitrary public-facing user input needs basic input handling/moderation before you'd want it live, which is real scope, not a toggle you flip casually. Start with v1; revisit v2 once the rest of the Playground is shipped.

### Edge cases / QA
Offensive or nonsensical input needs to degrade gracefully — the template approach mostly sidesteps this risk by design, which is one more reason to start there rather than with open-ended generation.

### Out of scope (v1)
Real AI generation (explicitly deferred to v2 above), saving or sharing a generated requirement.

---

## 4. Console Easter Egg

**User story:** As a technically curious visitor, I want to find something worth the detour if I open dev tools, so the site rewards the exact kind of curiosity it's trying to describe in the first place.

### Functional requirements
- **FR1** — On page load, a single styled `console.log()` prints a short ticket-formatted message.
- **FR2** — Uses `%c` CSS injection so the styling pulls from File 04 tokens (ink background, highlighter-yellow text) — not default console colors, and explicitly not green-on-black terminal styling.
- **FR3** — Copy example: *"TICKET-001 · Status: Resolved · Severity: Delightful · You found the console. Most people don't check here first."*
- **FR4** — Optional: a second logged line with a soft CTA — a mailto link or a pointer to the Contact page, for the rare technical screener who actually reads consoles.

### Acceptance criteria
- Given a visitor opens the console after the page finishes loading, then exactly one styled ticket message appears — not duplicated on re-renders or route changes.
- Given the message renders, then it uses only File 04 tokens for its styling — no default terminal green, no ASCII art.

### Technical notes
A single `console.log` call with `%c` formatting, fired once from the app's top-level entry point, guarded against firing twice under React's development-mode double-invoke behavior.

### Out of scope
Interactive console commands — charming in theory, real added complexity for something this small.

---

## Instruction file roadmap (updated)

| # | File | Status |
|---|---|---|
| 01 | Portfolio Strategy & Brief | ✅ Done |
| 02 | Brand & Voice System | ✅ Done |
| 03 | Content Strategy & Case Study Anatomy | ✅ Done |
| 04 | Visual Design System | ✅ Done |
| 05 | Component & Technical Architecture | ✅ Done |
| 06 | **Playground Requirements** *(this file)* | ✅ Done |

Recommended build order within the Playground itself: **Console egg first** (smallest effort, ships same day), then **Mask-a-Record** (your strongest, most differentiated demo), then **Highlighter Annotate Mode**, then the **Requirements Generator** (v1 template version) last, since it has the most open decisions still to settle.
