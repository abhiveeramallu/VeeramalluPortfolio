# Decisions & assumptions

Decisions made during the November 2026 redesign (first a "frozen archive" 3D world, then — at the owner's request — an illustrated editorial direction with goofy 3D illustrations). The previous upgrade's decisions are in git history (`git log -- docs/DECISIONS.md`).

## Content & honesty

- **Source of truth is each repository.** Every project entry in `data/content.ts` was written from that repository's README, docs, reports and package manifests, read in November 2026 via the GitHub API. Numbers on the site carry the file they came from (`facts[].source`) and are shown with that source on the case study.
- **Contributors were checked.** Every featured repository has a single contributor (GitHub API), so case studies say "sole developer". StockMind's contributor list was empty at the time; its text says it is my own repository rather than claiming more.
- **Removed claims from the previous site** (none could be supported by a repository): "99.1% classification accuracy", "14 ms scoring", "0 challenges shown to humans" (ThreatLens); "<120 ms p95", "−28% empty km", "−22% delivery cost", "1st place at the engineering showcase", team sizes and courier ride-alongs (RouteFusion); "−60% time to find a clause", "1.4 s median answer" (DocuSense); "0.6 °C MAE", "4 h earlier vent actions", "−19% HVAC energy" (Greenhouse); "480+ tokens" (Lumina); "60 fps on a 2019 MacBook Air" (Kinetic Craft); "3+ years designing and shipping", freelance history, merit scholarship, Behance profile, availability date, placeholder testimonials.
- **Removed projects without a repository on the GitHub profile:** Lumina Design System and Kinetic Craft. DocuSense and Aura Flora became the real Smart Document Intelligence and Greenhouse Microclimate Forecasting repositories.
- **Weak results are kept, not hidden:** ThreatLens's 50% stealth-evasion rate and the small, synthetic dataset behind its perfect scores; the Edge AI model losing to the persistence baseline on the test set; synthetic honeypot logs; ImageGuard's forensic disclaimer.
- **Status labels** (`Live demo`, `Working prototype`, `Research prototype`, `In development`) and kinds (`Personal`, `Academic`, `Engineering`, `Research`) follow the repository: a live demo only where the URL was checked to respond (RouteFusion, ThreatLensAI, Greenhouse).
- **"What I learned"** sections are short engineering takeaways that follow from what each repository documents. They are written in my voice and are the one place to personalise further.
- **Email** is the address on my public GitHub commits (`abhiram97137@gmail.com`); the previous `hello@abhiram.design` inbox could not be verified. **LinkedIn** is left empty because the URL could not be verified (LinkedIn blocks automated checks); set `socials.linkedin` to show it everywhere.
- **Degree:** the user brief says Computer Science; the Edge AI repository's reports say "ECE". The site follows the brief. Verify before publishing.
- **Domain:** `abhiram.design` already serves the previous version of this site, so it stays the canonical fallback. `abhiram.dev` resolves to an unrelated host and is not used anywhere.

## Playground removal

Removed: `/playground` and `/playground/[slug]` routes and OG images; `components/playground/*` (Hungarian game, chroma synth, flow gradient, contrast ramps, clay sculptor, host, thumbnails); the home teaser; `lib/hungarian.ts` and its test (only the game used it — RouteFusion's real solver lives in its own repository); experiment types, data, JSON-LD, sitemap entries, palette commands and chat sources; contrast-ramp helpers in `lib/contrast.ts`; the unused `canvas-confetti` dependency. Also removed as off-direction: the old hero, process section, testimonials, building ticker, skills marquee## Creative direction (current)

- **Main page:** an orange poster hero with a single comic character (no crowd, no photo — my photo and illustrated portrait were removed at my request).
- **Comic style:** each illustration is a comic panel — one character with a solid-colour "misprint" shadow (a two-colour print slightly out of register), a starburst, halftone dots, speed lines and a speech bubble lettered in Bangers. Bubbles are short, honest one-liners about what the project does ("Bot spotted!", "Copy found!"), never claims of results.
- **One protagonist:** the hero, about and contact panels share the same character (peep-8: dark wavy hair, beard, glasses); project panels use close-up characters whose gestures fit the scene (phone, laptop, coffee, shrug).
- **3D presentation:** each panel is split into back, mid and front layers at different depths with CSS 3D transforms, so it reads like a pop-up book; it rests at an angle, sways slowly and turns towards the pointer.
- **Characters are Open Peeps** by Pablo Stanley, public domain under CC0 1.0 (licence confirmed on openpeeps.com; note kept in `public/peeps/LICENSE.txt`). Third-party illustrations from the Pinterest references were not used: they belong to their artists. My earlier hand-coded character was replaced because it could not reach that level of draughtsmanship.
- **Panels:** RouteFusion (car, pin and parcel — "One trip, two drops!"), ThreatLensAI (shield and a flagged robot), ImageGuard (magnifier over a cloned flower), VisionRAG-X (a slide flagged as contradicting the speaker), Honeypot (tagged bees and a honey pot), Edge AI (thermometer, heat, board and fan), Greenhouse (plants under a rain cloud), Smart Document Intelligence (a scanned paper character and a padlock), StockMind (a camera watching shelves with a gap). None is a screenshot.
- **Earlier directions, replaced at my request:** a scroll-driven WebGL "frozen archive", then goofy 3D toy dioramas. Three.js is no longer a dependency.
- **Hand-made images win:** dropping `public/illustrations/<slug>.png` replaces that project's SVG scene (prompts in docs/ILLUSTRATION_PROMPTS.md).

## Design system

- **Palette** (`.theme-pop`, applied on `<html>` so every page uses it): cream paper, near-black ink, orange (`#a8380a` for text, `#ff5a1f` for the hero) and purple accents, a deep-purple panel for About; buttons, panels and the navbar get ink outlines with hard offset shadows like printed comic panels. The original dark palette stays in `:root` as a fallback. Tokens live in `lib/tokens.ts` and `app/globals.css` (RGB channel variables); unit tests assert WCAG AA for every text pairing, including accent text on every cream surface.
- **Type:** Alfa Slab One for the main page's headlines, Fraunces for display elsewhere and accent words, Inter for body, JetBrains Mono for labels.

## Illustrations: accessibility and performance

- Every illustration is an `role="img"` SVG with a description of what it shows; all motion is CSS and is disabled by `prefers-reduced-motion`. Hover animations also run on keyboard focus (`:focus-within`).
- Inline SVG: no requests, no WebGL, no layout shift.

## Kept infrastructure

Streaming Claude chat (now grounded in the new content, with caveats in the prompt), honest contact flow (Resend or a `mailto:` fallback — never a fake "sent"), rate limiting, résumé PDF (now fails the build if it overflows one page), OG images, JSON-LD (`SoftwareSourceCode` with `codeRepository` per project), sitemap, security headers, ESLint/Prettier/strict TS, Vitest, Playwright, CI, analytics behind an env flag (new event `repo_click`).
