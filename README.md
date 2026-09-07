# Vikas Goswami — Portfolio

Personal frontend portfolio of [Vikas Goswami](https://vikas-goswami-portfolio.vercel.app) — a frontend engineer focused on React, Next.js, and TypeScript.

**Live site:** [vikas-goswami-portfolio.vercel.app](https://vikas-goswami-portfolio.vercel.app)

## Features

- Single-page home with about, experience, projects, education, and contact
- Dedicated `/resume` page that renders a PDF from Vercel Blob
- Per-project case-study pages under `/projects/[slug]`
- Dark / light theme, section hash sync, and restrained motion

## Stack

- [Next.js](https://nextjs.org) 16 (App Router)
- [React](https://react.dev) 19
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com) v4

## Attribution and license

This project is released under the [MIT License](./LICENSE) with an additional attribution requirement (see [NOTICE](./NOTICE)).

You **may** clone and fork the repository. If you publish a copy or a substantially similar site, you must:

- Keep the copyright notice and `LICENSE` file
- Keep visible credit to **Vikas Goswami** as the original author (the site footer in this repo satisfies this)
- Keep a link to the original repository: [github.com/Akki37/NextJS-Portfolio-Template](https://github.com/Akki37/NextJS-Portfolio-Template)

Please do not present a fork as the original work.

## Getting started

Requires **Node.js 20.9+** (Next.js 16).

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Script | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |

There is no `typecheck` or `test` script. Typecheck locally with `npx tsc --noEmit` if you need it.

## Environment variables

1. Copy `env.example` to `.env.local` (never commit `.env.local`).
2. Set the resume PDF URL for the `/resume` page.

| Variable | Required | Description |
| --- | --- | --- |
| `NEXT_PUBLIC_RESUME_PDF_URL` | Yes, for a working resume page | Public URL of the resume PDF (this project uses [Vercel Blob](https://vercel.com/docs/storage/vercel-blob)). |
| `NEXT_PUBLIC_RESUME_PDF_VERSION` | No | Cache-busting query value. Bump it when the Blob URL stays the same but the file contents change. |

`env.example` uses a placeholder Blob URL. Replace it with **your** Blob URL. Do not commit real secrets or private file URLs you do not want public.

On Vercel, set the same variables in the project’s Environment Variables settings for Production / Preview / Development.

Without `NEXT_PUBLIC_RESUME_PDF_URL`, the app falls back to `/resume/vikas-goswami-resume.pdf`, which is not committed (local PDFs under `public/resume/` are gitignored).

## What to customize if you fork

Replace Vikas’s content with your own before deploying:

- `data/` — experience, projects, education, contact, skills, resume filename
- `data/attribution.ts` — keep the original-author URLs; do not remove the credit
- `strings/locales/en.ts` — page titles, section copy, nav labels
- `app/projects/content/` — case-study pages for each project slug
- `components/project-logos/` — project marks
- `NEXT_PUBLIC_RESUME_PDF_URL` — your own resume PDF
- `app/layout.tsx` — `metadataBase` and site metadata

## Project structure

```
app/                 App Router: home, resume, project pages
components/          Sections, nav, theme, resume viewer, project UI
data/                Content (experience, projects, contact, skills)
strings/             UI copy
hooks/               Client hooks
lib/                 Shared helpers (resume cache, project types)
util/                Small utilities
public/              Static assets (resume PDFs are not committed)
```

## License

[MIT](./LICENSE) © 2026 Vikas Goswami, plus the attribution terms in [NOTICE](./NOTICE).
