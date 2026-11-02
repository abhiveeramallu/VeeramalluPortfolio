# Decisions & assumptions

Decisions made during the 2026-11 upgrade, so future-me (or a reviewer) knows _why_, not just _what_.

## Content & honesty

- **Unverified numbers are flagged, not deleted.** Every metric I couldn't verify carries `// TODO: verify` in `data/content.ts`. Claims a student portfolio can't support were removed outright: "12+ production client apps", "Awwwards nominee", "+42% brand recall", "adopted across 4 clients", "94% adoption".
- **Provenance labels** (`Shipped` / `Prototype` / `Self-initiated`) appear on every project card and case study. Recruiters discount _everything_ after one inflated claim; labelling concept work as concept work protects the real work.
- **Testimonials are placeholders that can't leak.** `placeholder: true` entries render only in development (with a visible badge). In production, zero real testimonials ⇒ no section. Fabricated quotes on a hiring site would be worse than none.
- **No client-logo row.** There are no verifiable clients yet, so the hero is followed by a "Currently building" ticker instead.
- **Secondary hero CTA** is "Download résumé" because no booking link exists. Setting `bookingUrl` in content switches it to "Book a call".
- Name used everywhere is "Sai Abhiram" (from the existing site). Availability "from January 2027" is assumed from the 2023–2027 B.Tech — **verify**.
- Project images: the case-study `MediaSlot` captions describe the _intended_ real screenshot. Until a file exists at `/public/projects/<slug>/<id>.webp`, a generated illustration renders with a visible "Illustration" tag.

## Design system

- **Tonal scales (50–900)** for orange, indigo and lime were generated in OKLCH with the brand value pinned at 500 (lime's 500 is very light, so its 50–400 steps are hand-tuned to stay monotonic).
- **Contrast fixes.** Measured against WCAG 2.2:
  - orange-500 text on off-white = 2.84:1 ✗ → text uses **orange-600** (4.98:1).
  - white text on orange-500 buttons = 3.12:1 ✗ → primary button is **ink on orange** (6.06:1).
  - indigo-500 text on off-white = 4.36:1 ✗ → text uses **indigo-600** (4.99:1).
  - lime is never text on light; it's a fill with ink text (14.7:1), or text on ink (14.7:1).
  - Inverted sections: muted `#A3A39C` on ink = 7.44:1.
    The full pairing matrix is a unit test (`tests/unit/contrast.test.ts`), so a token change that breaks contrast fails CI.
- **Inverted sections** (`.section-inverted`) remap the same CSS variables, so components need no dark variants. Used for Process, Contact and the case-study "Next project" band.
- **Dark theme** exists only as an opt-in from the command palette (`data-theme="dark"`, remembered in `localStorage`). The brand is light; the toggle is there because the brief asked for it.
- **Fluid type**: `--step--1 … --step-5` with `clamp()`; headline classes `.type-display/.type-h1/.type-h2/.type-h3` (not `.h-1`, which collides with Tailwind's `h-1`).
- **One italic-serif accent word per section headline.** Exception: case-study and experiment H1s are proper nouns (project names) and stay plain; their section headings carry the accent.
- **No emoji as icons.** The asterisk mark is an SVG (`components/ui/Asterisk.tsx`).

## Signature 3D — Option B (abstract object system)

- Chosen over Option A (stylised GLB bust) because A depends on a commissioned, rigged model that doesn't exist; a placeholder bust would read as a toy again. B is fully achievable at high quality with code alone and expresses "design engineer" directly.
- Thirteen glossy objects (rounded cubes, torus knot, asterisks, pills, torus, spheres; one transmission sphere) assemble into **"A"** with staggered, underdamped custom springs (no physics engine dependency). Cursor repels objects; click (or the visible "Click to scatter" button for keyboard users) explodes and reforms them.
- **Lighting**: drei `<Environment>` built from `<Lightformer>`s and baked once (`frames={1}`) — a studio look with zero network requests, instead of `preset="studio"`, which downloads a remote HDRI at runtime.
- `PerformanceMonitor` adapts DPR between 1 and 2 and lowers ContactShadows resolution on decline; `frameloop="demand"` when the canvas is offscreen.
- **Loading**: the server-rendered SVG (`HeroFallback`, same composition) is the first paint and the permanent state for reduced-motion, Save-Data and no-WebGL visitors. The WebGL chunk loads on the **first interaction** (pointer, touch, key or scroll), then cross-fades in. Loading on idle instead cost 8 s of TBT in Lighthouse; interaction-loading means bounce visitors never pay GPU cost.
- No `scripts/optimize-glb.md`: that deliverable belongs to Option A.

## Motion

- `lib/motion.ts` holds every easing, duration, spring and stagger; CSS mirrors the easings as `--ease-out` / `--ease-in-out`.
- **Hero entrance is CSS**, not Framer, so it runs from first paint. The H1 only translates (never starts at `opacity: 0`) so it can be the LCP element at first paint.
- **Page transitions** (`app/template.tsx`) animate only client-side navigations. The first page view renders at full opacity from the server (an earlier version faded the whole page in after hydration and hurt LCP).
- **Preloader** is decided by an inline `<head>` script (first page view per session, never with reduced motion), runs purely in CSS, is capped at 1.2 s, and is skipped by any key, click or wheel. A/B-measured: it does not change LCP.
- **Lenis + Framer**: Lenis drives native scroll position, Framer's `useScroll` reads it, so they don't fight. Anchor clicks go through Lenis and then move keyboard focus to the target; `data-lenis-prevent` keeps inner scroll areas (chat, palette) working. A shared ref-counted `lockScroll` stops Lenis under modals.

## AI assistant

- **Model**: `CLAUDE_MODEL` env var, default `claude-opus-5-5` (current default Claude model). Effort is `low` because this is short-form chat. For a cheaper deployment set `CLAUDE_MODEL=claude-haiku-5-5` — a cost/quality call for the site owner.
- **Server-side refusal fallback** (`fallbacks: "default"`, beta `server-side-fallback-2026-07-01`) is on for models that support it, so a classifier decline is retried on Anthropic's recommended model instead of failing.
- **Grounding**: the system prompt is built from `content.ts` (deterministic, so it's prompt-cache friendly, `cache_control: ephemeral`). It instructs the model to answer only from that data, quote numbers exactly, and point to case-study URLs. Sources are attached by matching project names / paths in the final answer.
- **Guardrails**: input capped at 500 chars; history validated (roles, alternation, 6 turns, 1,200 chars each); delimiter tags stripped; obvious injection patterns short-circuit without calling the model; per-IP rate limit 20/hour (Upstash Redis if configured, else in-memory per instance).
- **No API key / API down** → a canned FAQ grounded in the same content streams through the same SSE protocol, so the UI is identical.

## Contact

- The old API returned `success` even when nothing was sent. Now it returns `delivered: false` when Resend isn't configured or fails, and the form offers a pre-filled `mailto:` instead of a fake confirmation. Validation is shared client/server; honeypot field; 5 messages/hour per IP.

## Performance

- `next/font` self-hosts fonts. Only Space Grotesk and Instrument Serif _italic_ (the two hero fonts) are preloaded; Inter and JetBrains Mono load without preload so they don't compete with the LCP.
- Chat, command palette and analytics are lazy client islands (`components/ui/ClientIslands.tsx`), outside the first-load budget.
- Experiments load per route; the playground index uses CSS thumbnails, never canvases.

## Analytics (privacy-friendly event plan)

Vercel Analytics + Speed Insights mount only when `NEXT_PUBLIC_ENABLE_ANALYTICS=true`. Cookieless; no PII in event properties.

| Event                   | Fired when                  | Props                                       |
| ----------------------- | --------------------------- | ------------------------------------------- |
| `cta_click`             | Hire pill, Book a call      | `location`                                  |
| `resume_download`       | Any résumé link             | `location`                                  |
| `chat_open`             | Chat opened                 | `source` (button / event)                   |
| `chat_message`          | Question sent               | —                                           |
| `contact_submit`        | Form accepted by API        | `delivered`                                 |
| `email_copy`            | Email copied                | `source`                                    |
| `command_palette_open`  | Palette opened              | `source` (shortcut / `?` / konami / button) |
| `case_study_live_click` | "Live site" on a case study | `slug`                                      |

## Process note

All phases were implemented in one pass and verified together (build, lint, typecheck, 53 unit tests, 18 Playwright smoke tests, Lighthouse). The history is split into per-phase commits for review; intermediate commits were not individually build-verified — the final commit is.
