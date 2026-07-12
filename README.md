# Raj's Interactive Portfolio

An interactive portfolio demonstrating systems thinking across Business Analysis, Development, and Quality Engineering.

Built with **Vite**, **React**, **TypeScript**, **SCSS**, **Framer Motion**, and **Phosphor Icons**.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Project structure (simple overview)

```
├── index.html              → HTML entry point
├── src/
│   ├── main.tsx            → Boots the React app
│   ├── App.tsx             → Routes + page layout shell
│   ├── pages/              → One file per page (easy to find!)
│   ├── styles/             → Shared page styles
│   └── hooks/              → Small reusable hooks
├── design-system/          → Reusable UI components + SCSS tokens
├── data/                   → All site content (edit copy here)
└── _instructions/          → PRD and reference docs
```

### How routing works

Routes are defined in `src/App.tsx` — a simple list mapping URLs to page components:

| URL | File |
|---|---|
| `/` | `src/pages/Home.tsx` |
| `/thinking` | `src/pages/HowIThink.tsx` |
| `/case-studies/:slug` | `src/pages/CaseStudyDetail.tsx` |

No file-based routing magic — just React Router.

## Editing content

All copy lives in `data/`:

| File | What to edit |
|---|---|
| `data/site.ts` | Name, nav links, footer |
| `data/hero.ts` | Homepage hero |
| `data/case-studies.ts` | Case study placeholders |
| `data/projects.ts` | HueType and other projects |

## Build

```bash
npm run build
npm run preview
```
