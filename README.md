# abhiram.design — portfolio

Portfolio of Veeramallu Sai Abhiram, Computer Science student at VIT Vellore (expected 2027). Next.js 14 (App Router), TypeScript, Tailwind, React Three Fiber + drei, Framer Motion, Lenis.

The main page is a bright editorial poster illustrated as comic panels: hand-drawn characters from [Open Peeps](https://www.openpeeps.com) (CC0) with a coloured "misprint" shadow, starbursts, halftone dots, speed lines and lettered speech bubbles. The hero shows a single protagonist; each project panel acts out what the project does. Every panel is presented in 3D like a pop-up book — three depth layers that separate as it turns towards the pointer — and parts animate on hover.

- **Home**: magazine-cover hero, an "In this issue" contents list, a feature spread per project, an illustrated about section and contact.
- **Projects** (`/work`, `/work/[slug]`): an index of every project plus smaller repositories, and case studies structured as overview → problem → goals & constraints → contribution → architecture → implementation → decisions → challenges → status & results → limitations → what I learned → next project.
- **Honesty**: all project facts come from each GitHub repository; numbers cite the file they came from. See [docs/DECISIONS.md](docs/DECISIONS.md) and [docs/AUDIT.md](docs/AUDIT.md).
- **Extras**: streaming AI assistant grounded in `data/content.ts` (works without an API key), command palette (`?` or ⌘K), downloadable digital résumé PDF, dynamic OG images.

## Setup

```bash
npm install          # .npmrc sets legacy-peer-deps (an optional peer of @vercel/analytics)
cp .env.example .env.local
npm run dev          # http://localhost:3000
```

| Script                            | What it does                                                                                                                   |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `npm run dev`                     | Dev server                                                                                                                     |
| `npm run build` / `npm start`     | Production build / serve                                                                                                       |
| `npm run lint`                    | ESLint (`next/core-web-vitals` + typescript-eslint, no `any`, zero warnings)                                                   |
| `npm run typecheck`               | `tsc --noEmit` (strict)                                                                                                        |
| `npm run format` / `format:check` | Prettier                                                                                                                       |
| `npm test`                        | Vitest: token contrast (read from `globals.css`), content integrity, world layout maths, validation, chat guardrails, résumé   |
| `npm run test:e2e`                | Playwright smoke tests against the production build (run `npm run build` first; first time: `npx playwright install chromium`) |

CI (`.github/workflows/ci.yml`) runs install → lint → typecheck → format check → unit tests → build → Playwright.

## How the illustrations work

| Piece                                                     | Role                                                                                                                                                                                           |
| --------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `components/illustrations/kit.tsx`                        | `Peep` (an Open Peeps character from `public/peeps`) and props: laptop, plant, table, magnifier, document, cloud, sparkles                                                                     |
| `scripts/build-peeps.mjs`                                 | Recolours and minifies the chosen Open Peeps SVGs into `public/peeps` (ink on warm paper) and records their sizes                                                                              |
| `components/illustrations/scenes.tsx`                     | One scene per project plus about and contact, each acting out what the project does                                                                                                            |
| `components/illustrations/Illustration.tsx`, `Tilt3D.tsx` | The 3D pop-up card: colour plane plus back / mid / front layers at increasing depth, resting tilt and pointer tilt; shows `public/illustrations/<slug>.*` instead if you add a hand-made image |
| `app/globals.css` (Flat illustrations)                    | Idle animations (nod, blink, swaying leaves, bees, heat, scanner) and hover ones (wave, drive, magnify, rain, flag)                                                                            |

Everything is SVG and CSS 3D transforms — no WebGL. Each character is a small cached SVG file (about 9 KB gzipped).

## Environment variables

All optional — see [.env.example](.env.example).

| Variable                                                   | Effect when unset                                                      |
| ---------------------------------------------------------- | ---------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`                                     | Falls back to the Vercel production URL, then `https://abhiram.design` |
| `ANTHROPIC_API_KEY`                                        | Chat answers from the canned FAQ                                       |
| `CLAUDE_MODEL`                                             | `claude-opus-5-5`                                                      |
| `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL` | Contact form offers a pre-filled email instead of sending              |
| `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`       | Rate limits are in-memory per instance                                 |
| `NEXT_PUBLIC_ENABLE_ANALYTICS=true`                        | Analytics and Speed Insights are not loaded                            |

## Updating content

**All copy** lives in `data/content.ts`. When a project changes, update its entry from the repository (README, reports) — the content tests reject placeholder text and require every project to link to a GitHub repository.

| Asset                   | Where                                    | Notes                                                                                    |
| ----------------------- | ---------------------------------------- | ---------------------------------------------------------------------------------------- |
| Real project screenshot | `public/projects/<slug>/cover.webp`      | Optional. When present it replaces the 3D illustration in the case-study header          |
| LinkedIn                | `socials.linkedin` in content            | Empty by default (the URL could not be verified); links appear everywhere once it is set |
| Email                   | `email` in content                       | Currently the public address on my GitHub commits                                        |
| Résumé                  | `public/DigitalVeeramalluSaiAbhiram.pdf` | Replace this PDF to update the downloadable digital résumé                               |

## Performance notes

- All content and illustrations are server-rendered HTML/SVG, so nothing waits on JavaScript to appear.
- Lighthouse (mobile, simulated throttling, local production build): `/` 100 / 100 / 100 / 100 (LCP 1.1 s); `/work/[slug]` 100 / 100 / 100 / 100; `/work` 85 / 100 / 100 / 100 — its simulated LCP (4.4 s) is the first card's character image, which actually loads in under 0.2 s locally. The first illustration on each page preloads its character at high priority.
- Illustrations are inline SVG (no extra requests, no WebGL); animations are CSS and stop with reduced motion.

## Deployment checklist (Vercel)

- [ ] Connect the repository; framework preset Next.js, default build command
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the production domain
- [ ] `RESEND_API_KEY` + a verified sender domain; send yourself a test message
- [ ] `ANTHROPIC_API_KEY` (optional) and try the four suggested chat questions
- [ ] `NEXT_PUBLIC_ENABLE_ANALYTICS=true` (optional)
- [ ] Check `/opengraph-image` and a case study's OG card in a social preview tool
- [ ] Submit `/sitemap.xml` in Google Search Console
- [ ] Download the digital résumé and check it reads correctly
