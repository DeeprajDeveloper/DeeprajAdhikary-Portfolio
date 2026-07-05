# Deepraj Adhikary — Portfolio

Business Systems Analyst portfolio built with React (Vite), a separate design system, and content-as-data discipline.

## Structure

```
├── app/                    → Main React app (Vite + React Router)
├── data/                   → Central content — edit site copy here
│   ├── site.js             → Name, nav, footer links
│   ├── hero.js             → Hero copy and typing roles
│   ├── career.js           → Career journey milestones
│   ├── case-studies.js     → Case study cards (featured flag controls homepage)
│   ├── pages.js            → About, Contact, How I Work, Work page copy
│   └── index.js            → Barrel export
├── design-system/          → Reusable components, tokens, and reference page
│   ├── styles/
│   │   ├── _variables.scss
│   │   ├── _mixins.scss
│   │   └── globals.scss
│   ├── components/         → Each component has its own .jsx + .scss
│   └── pages/
│       └── DesignSystemPage/
└── _instructions/          → Strategy, voice, content, visual, and architecture docs
```

## Getting started

```bash
cd app
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) for the homepage, or [http://localhost:5173/design-system](http://localhost:5173/design-system) for the component reference.

## Editing content

All site copy lives in `data/`. Components read from there — no hunting through JSX files.

| File | What to edit |
|---|---|
| `data/site.js` | Your name, nav links, footer links |
| `data/hero.js` | Hero eyebrow roles, hook line, subhead, CTA |
| `data/career.js` | Career timeline title and milestones |
| `data/case-studies.js` | Case study cards (`featured: true` shows on homepage) |
| `data/pages.js` | Placeholder page titles and body copy |

## Build order (from instruction files)

1. ✅ Design tokens and SCSS foundation
2. ✅ Design System Page (File 04 §7)
3. ✅ Homepage shell (Hero, Career Journey, featured case study cards)
4. ⏳ Keystatic CMS + case study detail pages
5. ⏳ How I Work, About, Contact content

## Design metaphor

"The Annotator" — ink, paper, and highlighter yellow. Not terminal aesthetic.
