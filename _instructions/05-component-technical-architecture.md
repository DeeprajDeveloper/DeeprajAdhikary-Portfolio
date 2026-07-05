# Component & Technical Architecture
**File 05 of the instruction set — the final one.** This turns File 03's content schema and File 04's design tokens into an actual buildable structure, and answers the original sync question concretely: with Keystatic in GitHub mode, editing content *is* committing to your repo — there is no separate sync step.

**Updated:** the public site is now plain React (Vite), not Next.js — matching your actual working familiarity. This has one real consequence worth understanding upfront (§0 below) before the rest of the file makes sense.

---

## 0. Why there's a second small app in here

Keystatic's Reader API is Node-only and explicitly not meant to run in the browser, and its visual admin UI is officially wired up for Next.js, Astro, or Remix — there's no first-party way to mount `/keystatic` inside a plain client-rendered React (Vite) app, because there's no server framework underneath it to host that route.

Rather than give up the visual editor (your preference from the last decision), this file uses a small **separate admin app** — a minimal Next.js project whose only job is hosting the Keystatic editor UI — pointed at the same GitHub repo as your real site. You'll rarely open it; your actual portfolio stays plain React throughout. Think of it as a key you use once in a while, not a room you live in.

---

## 1. Stack summary

| Layer | Choice |
|---|---|
| Public site | React (Vite), React Router for routing. JavaScript by default — TypeScript optional, your call, only `keystatic.config.ts` itself needs to be `.ts` |
| Content admin | A minimal, separate Next.js app — hosts only the Keystatic editor UI (`/keystatic`), deployed on its own, not part of the public site's build |
| CMS | Keystatic, GitHub mode, schema shared by both apps |
| Styling | Custom SCSS (CSS Modules, colocated per component), with File 04's tokens defined as SCSS variables + CSS custom properties — full manual control, no utility-class framework |
| Content storage | Markdown/JSON files at the repo root, read via Keystatic's Reader API |
| Deployment | Two small deploys from one repo: the public site (Vite build, any static host) and the admin app (Vercel, since it's Next.js) |
| Images | `/public`, referenced by path — no Cloud Images/CDN needed at this scale, keeps cost at zero |

---

## 2. Answering the sync question, concretely

Since Keystatic is git-based, there's no webhook, no export job, no "keep two systems in agreement" problem — even with two apps involved. The mechanism:

1. You visit the **admin app's** deployed URL at `/keystatic` (only reachable by you, authenticated via a GitHub App).
2. You edit a case study in the form UI and hit save.
3. Keystatic commits the change directly to your GitHub repo — the content **is** a file in the repo (Markdown/JSON), not a database row it copies from later.
4. That push triggers two things: the admin app doesn't need to rebuild (it doesn't render content, only the editor), but your **public site's** build pipeline runs — it re-reads the updated content files (via the export step in §6) and redeploys.

**Setup requirements** (once, not per-edit): a GitHub App installed on your repo, plus four environment variables on the *admin app only* — `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET`, and `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`. These let Keystatic authenticate you against your own repo's write access — anyone visiting the admin app's `/keystatic` with access to the repo can log in and publish; no one else can. The public Vite site never sees or needs these variables at all.

**During local development**, Keystatic runs in local mode against your filesystem directly from inside the admin app's project folder — no GitHub App, no auth, zero setup, free. You'd only rely on the deployed admin app once you want to edit content without pulling the repo locally first.

---

## 3. Folder structure (monorepo — one repo, two small apps)

```
/
├── apps/
│   ├── site/                          → The real portfolio: React (Vite)
│   │   ├── src/
│   │   │   ├── main.jsx
│   │   │   ├── App.jsx                → React Router route table
│   │   │   ├── routes/
│   │   │   │   ├── Home.jsx
│   │   │   │   ├── Work.jsx           → Case study index
│   │   │   │   ├── WorkDetail.jsx     → Individual case study (renders <LayeredCaseStudy>)
│   │   │   │   ├── HowIWork.jsx
│   │   │   │   ├── About.jsx
│   │   │   │   ├── Contact.jsx
│   │   │   │   └── DesignSystem.jsx   → File 04 §7's internal reference page
│   │   │   ├── components/
│   │   │   │   ├── ui/                → Button, Tag, Card, Callout, CodeBlock
│   │   │   │   │   └── Button/
│   │   │   │   │       ├── Button.jsx
│   │   │   │   │       └── Button.module.scss
│   │   │   │   ├── layer-toggle/      → LayerToggle (the signature component)
│   │   │   │   ├── nav/, footer/
│   │   │   │   └── case-study/
│   │   │   └── content-data/          → Generated static JSON (build output — see §6)
│   │   └── vite.config.js
│   └── admin/                          → Minimal Next.js app, hosts ONLY the Keystatic editor
│       └── app/
│           └── keystatic/[[...params]]/page.tsx
├── content/
│   └── case-studies/                  → Shared Markdown/JSON files, source of truth for both apps
├── keystatic.config.ts                → Shared schema (§4), imported by apps/admin and by the export script
├── scripts/
│   └── export-content.mjs             → Node script: runs the Reader API at build time, writes static JSON into apps/site/src/content-data
└── styles/
    ├── _tokens.scss                   → File 04's tokens as SCSS variables
    ├── _mixins.scss                   → Shared patterns: highlighter-swipe, focus-visible, type-scale mixins
    └── globals.scss                   → Resets, base styles, CSS custom properties
```

---

## 4. Keystatic schema (`keystatic.config.ts`)

Unchanged from before — this still maps directly onto File 03 §3's field template, and still lives at the repo root so both the admin app and the export script (§6) can import the same file.

```ts
import { config, collection, fields, singleton } from '@keystatic/core';

export default config({
  storage: {
    kind: 'github',
    repo: 'yourname/portfolio', // your actual repo
  },
  collections: {
    caseStudies: collection({
      label: 'Case Studies',
      path: 'content/case-studies/*',
      slugField: 'title',
      schema: {
        // --- Metadata (File 03 §3) ---
        title: fields.slug({ name: { label: 'Title (this is the hook — see File 03 §4)' } }),
        role: fields.text({ label: 'Role' }),
        timeframe: fields.text({ label: 'Timeframe' }),
        skillsDemonstrated: fields.array(
          fields.text({ label: 'Skill tag' }),
          { label: 'Skills demonstrated', itemLabel: (props) => props.value }
        ),
        stack: fields.array(
          fields.text({ label: 'Stack tag' }),
          { label: 'Stack', itemLabel: (props) => props.value }
        ),
        featured: fields.checkbox({ label: 'Show on homepage' }),
        summary: fields.text({ label: 'Card summary (1–2 sentences)', multiline: true }),

        // --- Business Layer ---
        hook: fields.text({ label: 'The Hook', multiline: true }),
        context: fields.text({ label: 'Context', multiline: true }),
        whatIDid: fields.markdoc({ label: 'What I Did' }), // supports bullet list
        outcome: fields.text({ label: 'The Outcome', multiline: true }),

        // --- Code Layer ---
        technicalContext: fields.text({ label: 'Technical Context', multiline: true }),
        investigation: fields.markdoc({ label: 'The Investigation / Decision' }),
        evidence: fields.array(
          fields.object({
            snippet: fields.text({ label: 'Code snippet', multiline: true }),
            caption: fields.text({ label: 'Caption (written to the intern persona — File 03 evidence rule)' }),
          }),
          { label: 'Evidence (code/schema/query)', itemLabel: (props) => props.fields.caption.value }
        ),
        forAnIntern: fields.text({ label: "What I'd Tell an Intern", multiline: true }),

        // --- Close ---
        reflection: fields.text({ label: 'Reflection', multiline: true }),
        repoLink: fields.url({ label: 'Repo link', validation: { isRequired: false } }),
        demoLink: fields.url({ label: 'Demo link', validation: { isRequired: false } }),
      },
    }),
  },
  singletons: {
    siteSettings: singleton({
      label: 'Site Settings',
      path: 'content/site-settings',
      schema: {
        heroStatement: fields.text({ label: 'Home hero (positioning statement)', multiline: true }),
        featuredOrder: fields.array(
          fields.relationship({ label: 'Case study', collection: 'caseStudies' }),
          { label: 'Featured case studies, in order' }
        ),
      },
    }),
  },
});
```

This schema *is* the enforcement mechanism for File 03's anatomy — Keystatic's form UI (inside the admin app) won't let you skip a field or freeform your way out of the structure.

---

## 5. Component inventory (props)

Every entry below is what should exist on the Design System Page (File 04 §7) first, then get imported — never re-styled — into real pages. All plain React components now — no Server Component distinction to worry about.

### `<Button>`
| Prop | Type | Notes |
|---|---|---|
| `variant` | `'primary' \| 'secondary' \| 'tertiary'` | Ink-bg / paper-border / text-link, per File 04 §7.6 |
| `size` | `'sm' \| 'md'` | |
| `disabled` | `boolean` | |

### `<Tag>`
| Prop | Type | Notes |
|---|---|---|
| `label` | `string` | |
| `kind` | `'skill' \| 'stack'` | Drives color treatment — skill tags reader-facing, stack tags shown only inside Code Layer (File 03 §6) |

### `<CaseStudyCard>`
| Prop | Type | Notes |
|---|---|---|
| `title` | `string` | The hook (File 03 §4) |
| `summary` | `string` | |
| `skillsDemonstrated` | `string[]` | Rendered as `<Tag kind="skill">` |
| `slug` | `string` | Links to `/work/:slug` via React Router |

### `<LayerToggle>` — the signature component
| Prop | Type | Notes |
|---|---|---|
| `businessLayer` | `ReactNode` | Always rendered, no expand needed |
| `codeLayer` | `ReactNode` | Collapsed by default |
| `defaultOpen` | `boolean` | Default `false` per File 01 §6 |
| Behavior | — | Highlighter-swipe animation on the toggle control itself, per File 04 §6 |

### `<CodeBlock>`
| Prop | Type | Notes |
|---|---|---|
| `code` | `string` | |
| `caption` | `string` | Required — enforces File 03's "caption written to the intern persona" rule (enforce with a PropTypes/JSDoc required check, or a TS type if you opt into TS for this component) |
| `language` | `string` | For syntax highlighting only, never used to justify a "terminal" visual treatment (File 04 §0) |

### `<Callout>`
| Prop | Type | Notes |
|---|---|---|
| `variant` | `'intern' \| 'reflection'` | Mustard-accented vs slate-neutral, per File 04 §7.11 |
| `children` | `ReactNode` | |

### `<Nav>` / `<Footer>`
Static, config-driven per File 01 §7's "config-driven where reasonable" rule — nav links pulled from a single array, not hardcoded per page.

---

## 6. Data flow

This is the part that changes most from a Next.js setup — there's no server at request time to read content live, so content gets exported to static JSON as a build step instead:

```
keystatic.config.ts (schema)
        ↓
content/case-studies/*.md   (files Keystatic — running inside apps/admin — reads/writes)
        ↓
scripts/export-content.mjs  (Node script, runs the Reader API, executed before every site build)
        ↓
apps/site/src/content-data/*.json   (static JSON, committed or generated fresh each build)
        ↓
React components import/fetch this JSON at build or runtime  (→ <CaseStudyCard>, <LayerToggle>, <CodeBlock>, <Callout>)
```

Practically: `scripts/export-content.mjs` runs as a `prebuild` step (`"prebuild": "node ../../scripts/export-content.mjs"` in `apps/site/package.json`) before `vite build`. There's still no sync lag — the JSON the site ships is generated fresh from whatever's currently committed, so a Keystatic save flows through to the live site on the very next deploy, same as before.

---

## 7. Design tokens → code

Unchanged by the framework switch — SCSS tokens don't care whether the app is Next.js or Vite.

File 04's tokens live in `styles/_tokens.scss` as SCSS variables (`$color-ink`, `$color-highlighter-yellow`, `$font-display`, `$space-4`, `$radius-card`, etc.), and are also re-exposed as CSS custom properties in `globals.scss` (`--color-ink`, `--font-display`...) so they're available at runtime for anything JS-driven — like the hero's cursor-following glow, which sets `--mx`/`--my` directly.

Every component gets its own colocated `.module.scss` file that starts with `@use '../../styles/tokens' as *;` — no component reaches for a raw hex value, a raw px size, or an arbitrary font-family string; everything traces back to a token. Because this is hand-written SCSS rather than a utility framework, that discipline isn't enforced automatically — it's a convention to hold yourself to (a stylelint rule disallowing literal color/font values outside `_tokens.scss` is worth adding if you want it enforced rather than just intended). That discipline is what keeps File 04's "never more than two fonts visible per screen" rule real in practice.

Shared visual behaviors (the highlighter-swipe hover, the focus-visible ring, the type-scale mixins from File 04 §2) live in `_mixins.scss` and get pulled into component styles with `@include`.

---

## 8. Build order (tying all five files together)

1. Set up the `apps/site` Vite + React project, plus Sass (`sass` package) and `_tokens.scss`/`_mixins.scss` (File 04).
2. Build the Design System Page (File 04 §7) using the component inventory in §5 — this is your first real milestone, and it's pure React/SCSS, no CMS involved yet.
3. Set up `keystatic.config.ts` at the repo root and the minimal `apps/admin` Next.js project (§0, §4) in **local mode** first — no GitHub App needed yet, just to confirm the schema works.
4. Write `scripts/export-content.mjs` and wire it as `apps/site`'s `prebuild` step (§6).
5. Build `/work/:slug` in `apps/site` using the exported JSON, reusing Design System Page components with zero new styling.
6. Build Home, How I Work, About, Contact (File 03 §5).
7. Turn on GitHub mode for `apps/admin` (§2) once you're ready to edit content without a local checkout.
8. Deploy both apps — `apps/site` to any static host, `apps/admin` to Vercel (it needs Node for its API routes). Verify a Keystatic save in the admin app actually produces a commit, and that the next `apps/site` deploy picks up the change.

---

## Instruction file roadmap — complete

| # | File | Status |
|---|---|---|
| 01 | Portfolio Strategy & Brief | ✅ Done |
| 02 | Brand & Voice System | ✅ Done |
| 03 | Content Strategy & Case Study Anatomy | ✅ Done |
| 04 | Visual Design System | ✅ Done |
| 05 | **Component & Technical Architecture** *(this file)* | ✅ Done |

All five instruction files are in place. The next step is implementation — starting with the Design System Page itself (build-order step 2 above), which is the natural next thing to actually build rather than document.
