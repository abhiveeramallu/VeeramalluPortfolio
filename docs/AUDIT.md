# Portfolio audit — 2026-11-02

Baseline: Next 14.2.15 App Router, builds clean, home first-load JS 153 KB, 18 static pages.

## (a) Strong — preserve

- **Brand system**: warm off-white / ink / orange / indigo / lime tokens as CSS variables, Space Grotesk + Inter + JetBrains Mono + Instrument Serif pairing, serif-italic accent word pattern. Distinctive and not template-looking.
- **Content model**: everything renders from `data/content.ts`, so copy and projects are editable in one place.
- **3D hygiene already in place**: R3F scene is `dynamic(ssr:false)`, gated by reduced-motion + WebGL detection, paused offscreen with IntersectionObserver, static SVG fallback.
- **Real work exists**: RouteFusion (live + repo) and ThreatLens (repo) are genuine, technically interesting projects — strong differentiator for a design engineer.
- **Playground toys** (Hungarian assignment game, audio pad) show range and personality.
- Grain overlay, pill navbar with `layoutId` active pill, custom cursor with labels — good tactile layer.

## (b) Weaknesses, ranked by impact on a recruiter's first 10 seconds

1. **Hero doesn't sell**: no proof stats, primary CTA is "My journey" (not work), no résumé, availability pill isn't the first thing read. The 3D avatar is built from primitive spheres/cylinders and reads as a toy.
2. **Project cards look empty**: every card is the same generic fake-browser box with title text; no visual differentiation, uniform 2-col grid, no hierarchy.
3. **Credibility gaps in copy**: claims a student portfolio can't back ("12+ production client apps", "Awwwards nominee", "+42% brand recall", "adopted across 4 clients"); several projects link to the GitHub profile root, not a repo. Recruiters discount _everything_ once one claim looks inflated.
4. **Accessibility/contrast failures on the primary brand pairings**: white text on orange buttons ≈ 3.1:1, orange text on off-white ≈ 2.8:1, indigo text on off-white ≈ 4.3:1 — all fail WCAG AA for body/button text. The playground "contrast checker" hard-codes wrong ratios (claims 4.6:1 for white/orange).
5. **No assets at all in `/public`**: no favicon, OG image, apple/PWA icons; social shares render blank. `public/robots.txt` + `public/sitemap.xml` point at `abhiram.dev` and shadow the dynamic routes at `abhiram.design`.
6. **Case studies are a wall of text**: no imagery slots, no story structure, no next-step CTA beyond "next project".
7. **Dead links**: `/playground#soft-sculptor` (toy not implemented), side-project anchors don't target anything.
8. **Chat**: retired model id, no streaming, no rate limit, no input caps, no injection guardrails; history from client is trusted verbatim.
9. **Contact API always returns success**, even when nothing is sent — messages silently vanish without `RESEND_API_KEY`. No validation or spam protection.
10. **Performance/DX**: Google Fonts via render-blocking `<link>`, Lenis RAF loop runs forever, footer clock re-renders every second, `remotePatterns: '**'`, no ESLint/Prettier installed, no tests, no CI, no error boundaries, no analytics.
11. **Motion is ad-hoc**: easing arrays and durations copy-pasted across files; framer `initial={{opacity:0}}` on the hero H1 delays LCP until hydration.
12. Modal and chat lack focus traps; mobile menu has no Esc / focus handling; no skip link.

## (c) Upgrade plan

| Phase | Scope                                                                                                                                                                                                                                                                |
| ----- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0     | This audit, `docs/DECISIONS.md`, tooling (ESLint, Prettier, Vitest) so every later phase is checked                                                                                                                                                                  |
| 1     | Tokens (tonal scales, fluid type, inverted sections, AA-safe pairings), next/font, hero rewrite (availability, CTAs, proof stats), "currently building" ticker, testimonials (placeholder-gated), sticky Hire-me pill, `/resume.pdf`                                 |
| 2     | Option **B**: glossy pastel object system that assembles into "A", spring cursor physics, click explode/reform, Lightformer studio env, ContactShadows, PerformanceMonitor, demand frameloop, SVG fallback; scroll-linked CSS objects on Process; pointer-tilt cards |
| 3     | `<ProjectCover/>` with per-project generated art + real-screenshot override, bento grid, story-structured case study template, TOC, progress bar, lightbox, before/after slider, token inspector, copy rewrite with `// TODO: verify`                                |
| 4     | `lib/motion.ts`, page transitions, split-line reveals, magnetic buttons, cursor states, scroll progress, Lenis anchor/focus fixes, CSS-only preloader, command palette (`?` / Konami)                                                                                |
| 5     | Streaming `/api/chat` (SSE) with env model, grounded prompt, citations, rate limit, caps, guardrails, canned FAQ fallback                                                                                                                                            |
| 6     | `/playground/[slug]` routes, per-experiment OG, blurbs, source links, new GLSL shader experiment, implement the missing sculptor                                                                                                                                     |
| 7–8   | Metadata/OG/JSON-LD/sitemap/404, analytics + events, error boundaries, Playwright, GitHub Actions, README                                                                                                                                                            |
