# Case Study Content Drafts
Pulled from your resume + HueType.dev, structured per File 03's anatomy. Two are fully drafted (ready to refine and drop into Keystatic); two are hook-and-summary only, ready to expand when you want to prioritize them.

**⚠️ Confidentiality note:** everything below is already de-identified — no client name, no proprietary tool names. Please still run this past whatever you signed with Capgemini/the client before publishing; consulting engagements almost always restrict what can be said publicly, even in generalized form.

---

## Candidate selection (checked against File 03 §2)

| # | Hook | Passes selection criteria? |
|---|---|---|
| 1 | Self-serve test data system | ✅ Real before/after (manual requests → self-serve), specific decisions (masking design, subsetting approach), real technical artifact (masking logic) |
| 2 | HueType.dev | ✅ Entirely your own build — full code-level ownership, real UX problem, live artifact to link to |
| 3 | AI-assisted test case generation | ✅ Current role, timely technical angle, but thinner on a clear before/after — needs a concrete example to strengthen |
| 4 | Leading QE through regulated releases | ✅ Real leadership evidence (7 engineers) but weaker on code-level evidence — leans Business Layer heavy |

Recommendation: lead with **#1 and #2** — one proves deep BSA/QA/data fluency in a real enterprise setting, the other proves you can design and ship a UX-facing tool solo, end to end.

---

## Case Study 1 — Self-Serve Test Data System

```yaml
title: "Building a self-serve test data system so developers stopped waiting on manual requests"
role: "Test Data Analyst / Test Data Engineer"
timeframe: "2018–2022"
skills_demonstrated: [test-data-strategy, data-analysis, requirements]
stack: [sql, python, vba, selenium]
featured: true
summary: "Downstream teams at a wealth management client were blocked on hand-requested test data. I helped build and run a self-serve system that generated and masked it on demand instead."
```

**The Hook**
Every test cycle for a wealth-management client's downstream applications used to start the same way: a developer or tester filing a manual request for test data and waiting on someone else to fulfill it. I worked on the system, and the practice, that replaced that wait with a self-serve portal.

**Context**
The client's wealth management systems fed a chain of downstream applications, each needing realistic but safe test data — real account and holdings data couldn't be used directly for privacy and regulatory reasons, but synthetic data that didn't reflect real data relationships wasn't useful for testing either. Requests for test data were manual, which meant testing cycles were gated by someone else's availability, not the team's own pace.

**What I Did**
- Administered and maintained a self-serve Test Data Management portal integrated directly with the client's source systems
- Built and maintained a test data synthesis tool for masking and generating data, including designing the masking scripts that obfuscated production data pulled in for refreshes
- Worked out the data profiling and subsetting approach — deciding what a "realistic enough" test data set actually needed to preserve from production, and what could safely be masked or generated fresh
- Coordinated data refresh cycles across environments as part of ongoing environment management, and integrated a third-party test data management tool to round out self-serve coverage

**The Outcome**
Teams downstream stopped waiting on manually fulfilled requests and could provision test data through the portal directly — this is described in the source material as directly accelerating Agile and DevOps workflows. 🔲 *If you have any real number here — average request turnaround before vs. after, requests-per-week volume, or anything similar — it would strengthen this section considerably. Worth checking with a former teammate if you don't remember exactly.*

---

**Code Layer**

**Technical Context**
Masking production data isn't just replacing values with random ones — a wealth management customer record is connected to accounts, holdings, and transaction history across multiple tables. If you mask a customer ID in one table but not the matching foreign key in another, the test data set becomes internally inconsistent and testing against it produces false results.

**The Investigation / Decision**
The core decision was building masking logic that preserved referential integrity — the same masked value had to propagate consistently everywhere that identifier appeared — while still making the underlying real data unrecoverable. This meant profiling the data first (understanding which fields were sensitive, which were structural/relational) before deciding what got masked, what got synthetically generated from scratch, and what could be safely subsetted straight from production.

**Evidence**
```
🔲 Fill in: a redacted/simplified version of the actual masking approach —
even pseudocode like:

def mask_customer_id(real_id, mapping_table):
    if real_id in mapping_table:
        return mapping_table[real_id]  # consistent across all tables
    masked_id = generate_consistent_hash(real_id)
    mapping_table[real_id] = masked_id
    return masked_id

Caption (to the intern persona): "The mapping table is the whole trick —
without it, the same customer would get a different fake ID in every
table it appeared in, and the test data would fall apart the moment you
tried to join across systems."
```

**What I'd Tell an Intern**
Test data isn't just "fake data" — it's a smaller, safe mirror of your real system's relationships. If you don't protect those relationships when you mask something, you haven't made safe test data, you've made broken test data.

**Reflection**
🔲 *One or two honest sentences: what would you do differently if you rebuilt this system today? (e.g., "I'd push for automated profiling instead of a manual first pass," or similar — whatever's actually true for you.)*

**Links**
🔲 Confidential client work — note on the page: "Details available on request."

---

## Case Study 2 — HueType.dev

```yaml
title: "🔲 [needs a hook — see suggestions below]"
role: "Independent creator / developer"
timeframe: "🔲 fill in build timeframe"
skills_demonstrated: [ux-research, requirements]
stack: ["🔲 fill in your actual stack"]
featured: true
summary: "A tool that lets developers preview a color palette on real interface types — login pages, dashboards — instead of judging it from a swatch."
```

**Hook title candidates** (pick one, or tell me the real story behind why you built it and I'll write a sharper one):
- "Why a color swatch never tells you if a palette actually works"
- "Building the tool I wished existed every time I picked a color palette"
- "Letting developers test a palette on a real login page before committing to it"

**The Hook**
Most color palette tools show you five swatches in a row and expect you to imagine how they'll look on an actual product. I built HueType.dev to close that gap — apply a palette to a real login page, dashboard, or other UI type, live, before you commit to it.

**Context**
🔲 *What actually triggered this? Was it a recurring frustration from your own two other projects — picking a palette, shipping it, then realizing it didn't hold up on a real form or a real data-heavy dashboard? That real origin story is exactly the kind of specific, human detail File 02 wants here — a swatch-vs-reality frustration is a great, concrete Context paragraph if that's genuinely what happened.*

**What I Did**
🔲 *Fill in the actual build decisions — e.g., which UI archetypes you chose to prototype first and why (login, dashboard — what made those the right starting set?), whether you designed the tool to be config-driven/plug-and-play (ties directly to your stated instinct from File 01), and any UX decisions about how a developer picks/swaps a palette in the tool itself.*

**The Outcome**
🔲 *Is this live and being used by anyone besides you? Even "I use it on my own projects now instead of judging palettes cold" is a real, honest outcome — doesn't need to be inflated.*

---

**Code Layer**

**Technical Context**
🔲 *How does re-theming actually work under the hood — CSS custom properties swapped at runtime? A design-token system similar to what you built for this very portfolio (File 04/05)? If it's genuinely similar, that's worth saying explicitly — it shows the same instinct applied twice.*

**The Investigation / Decision**
🔲 *What was the hardest technical problem — e.g., making sure text stays readable (contrast) against whatever palette gets applied, live? That's a strong, concrete technical narrative if it's true.*

**Evidence**
🔲 *A real snippet — e.g., how a palette object maps into CSS variables, or a contrast-checking function if you built one.*

**What I'd Tell an Intern**
🔲 *One plain-language lesson from building this.*

**Reflection / Links**
🔲 *Live link to HueType.dev goes here, plus repo if public.*

---

## Case Study 3 (shorter — expand later) — AI-Assisted Test Case Generation

**Working hook:** *"Getting Copilot to generate test cases worth trusting, not just test cases that compile"*

Pulled from your current role: configuring inputs and data conditions in Postman and Copilot-enabled tooling to generate effective test cases, then validating those against real architecture/design assessments. This one needs a concrete before/after to hit hardest — e.g., a specific feature where AI-assisted case generation caught something a purely manual pass might have missed, or sped up coverage for a release under time pressure. Worth revisiting once you have a specific example in mind.

## Case Study 4 (shorter — expand later) — Leading QE Through Regulated Releases

**Working hook:** *"Keeping seven QE engineers moving through a regulated release without slowing delivery down"*

Pulled from your Onshore QE Team Lead role — leading a team through regulatory-compliant testing and release cycles, coordinating deployment review, running smoke/regression suites, and owning defect triage through to resolution. This one leans Business Layer / leadership-heavy; if you want a real Code Layer here, the automation work on the client's proprietary test-automation tool (API automation) is the strongest technical anchor to build it around.

---

## Career Journey section (from File 04 §8) — update with real dates

Your actual progression maps cleanly onto the 3-stop timeline already built into the hero prototype:

```
2018 → QE Test Data Analyst        (Test Data Engineer, Wealth Management systems)
2022 → Onshore QE Team Lead         (Leading 7 engineers, regulated releases)
2024 → Technical Business Analyst  (Solution design + BSA responsibilities, current role)
```

This is a stronger, more specific version than the placeholder "QA Tester → Test Data Analyst → BSA" labels in the prototype — recommend swapping these in directly.
