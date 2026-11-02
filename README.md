# abhiram.design — portfolio

Personal portfolio of Sai Abhiram, product designer & design engineer. Next.js 14 (App Router), TypeScript, Tailwind, React Three Fiber + drei, Framer Motion, Lenis.

- **Home**: hero with availability, proof stats and CTAs; a WebGL object system that assembles into "A"; bento case studies; inverted Process section; playground; contact.
- **Case studies** (`/work/[slug]`): TL;DR → problem → constraints → process → decisions → gallery (lightbox, before/after slider, token inspector) → outcome → retro → next.
- **Playground** (`/playground/[slug]`): GLSL flow gradient, Hungarian assignment game, contrast-ramp tool, Web Audio synth, clay material toy.
- **AI assistant**: streaming, grounded in `data/content.ts`, works without an API key.
- **Extras**: command palette (`?`, ⌘K or the Konami code), `/resume.pdf` generated from content, dynamic OG images, opt-in dark theme.

Design and engineering decisions are in [docs/DECISIONS.md](docs/DECISIONS.md); the pre-upgrade audit is in [docs/AUDIT.md](docs/AUDIT.md).

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
| `npm test`                        | Vitest unit tests (contrast matrix, Hungarian solver, validation, chat guardrails, content integrity, résumé)                  |
| `npm run test:e2e`                | Playwright smoke tests against the production build (run `npm run build` first; first time: `npx playwright install chromium`) |

CI (`.github/workflows/ci.yml`) runs install → lint → typecheck → format check → unit tests → build → Playwright.

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

## Replacing content and assets

**All copy** lives in `data/content.ts`. Anything marked `// TODO: verify` is a number or claim to confirm (or delete) before launch.

| Asset                    | Where                                    | Notes                                                                                             |
| ------------------------ | ---------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Project cover            | `public/projects/<slug>/cover.webp`      | 16:10, ≥1600 px wide. Replaces the generated art on cards, case study hero and 404                |
| Process / gallery images | `public/projects/<slug>/<media id>.webp` | IDs are in each project's `process[].media.id` and `gallery[].id` (e.g. `process-1`, `gallery-2`) |
| Testimonials             | `testimonials` in content                | Set `placeholder: false` on real ones; placeholders never render in production                    |
| Booking link             | `bookingUrl` in content                  | Switches the hero's secondary CTA to "Book a call"                                                |
| Portrait                 | `app/about/page.tsx` (marked TODO)       | Swap the illustration tile for `next/image`                                                       |
| Résumé                   | generated from content at build          | Edit `lib/resume/build.ts` for layout                                                             |

`avif`, `webp`, `png` and `jpg` are all detected; next/image serves AVIF/WebP with a brand-tinted blur placeholder.

## Performance notes

- First paint never waits for 3D: the hero SVG is server-rendered; the WebGL chunk loads on the first interaction and cross-fades in.
- Budgets: first-load JS on `/` is ~170 KB (limit 200 KB, 3D excluded). Only the two hero fonts are preloaded.
- Lighthouse (mobile, simulated throttling, local production build): **home 92 / 100 / 100 / 100**, case study 92 / 100 / 100 / 100, CLS ≤ 0.01, TBT ≤ 90 ms. Simulated LCP is ~3.2 s while observed LCP is 0.25 s (the H1 paints on the first frame); Lighthouse's model charges the hydration JS to LCP. Use Speed Insights field data after launch.
- The `/playground/flow-gradient` page compiles a shader on load (TBT ~1.2 s in Lighthouse); that cost is the experiment itself.

## Deployment checklist

- [ ] Verify every `// TODO: verify` in `data/content.ts`; replace placeholder testimonials or leave them hidden
- [ ] Domain connected; set `NEXT_PUBLIC_SITE_URL`
- [ ] `RESEND_API_KEY` + a verified sender domain; send yourself a test message
- [ ] `ANTHROPIC_API_KEY` (optional) and ask the chat the four suggested questions
- [ ] `NEXT_PUBLIC_ENABLE_ANALYTICS=true` on Vercel
- [ ] Check `/opengraph-image` and a case study's OG card in a social preview tool
- [ ] Submit `/sitemap.xml` in Google Search Console; request indexing for `/` and the top case studies
- [ ] Run Lighthouse on the deployed URL (mobile) and compare with the numbers above
- [ ] Open `/resume.pdf` and check it reads correctly
