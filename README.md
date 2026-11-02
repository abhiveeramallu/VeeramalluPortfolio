# Personal Portfolio — Design Engineer & Creative Developer

A production-ready personal portfolio website built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, **Lenis**, and **Three.js (React Three Fiber + Drei)**.

Designed in a **playful-premium, clean, confident, light-theme** visual language with tactile micro-interactions, soft pastel 3D materials, editorial typography, and full SEO.

---

## 🎨 Design Tokens & Color Palette

All colors are controlled via CSS variables in `app/globals.css` and extended in `tailwind.config.ts`:

- `--bg: #F6F4EF` (warm off-white foundation)
- `--surface: #FFFFFF` (clean card elevation)
- `--ink: #111111` (high-contrast primary text)
- `--muted: #6B6B66` (subtle secondary text)
- `--line: #E4E0D8` (1px delicate borders)
- `--accent: #FF5A1F` (vivid orange: CTAs, cursor, highlights)
- `--accent-2: #5B5BFF` (electric indigo: links & 3D accents)
- `--accent-3: #C6F432` (lime: badges & hover flashes)
- `--soft-pink: #FFD6E8` & `--soft-blue: #D6E6FF` (pastel card backgrounds)

### Typography
- **Display:** Space Grotesk (clamp 48px to 160px, tight tracking)
- **Body:** Inter (relaxed leading, 16–18px)
- **Mono:** JetBrains Mono (uppercase small labels, years, tags)
- **Serif Italic:** Instrument Serif (for the accent word in major headlines)

---

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── layout.tsx             # Root layout with fonts, JSON-LD Person schema, Lenis, Cursor & AI drawer
│   ├── page.tsx               # Home Page (all 7 sections in exact order)
│   ├── globals.css            # CSS variables, custom scrollbar, grain texture & print styles
│   ├── sitemap.ts             # Dynamic XML sitemap generator
│   ├── robots.ts              # Search engine robots configuration
│   ├── not-found.tsx          # Custom 404 page
│   ├── about/
│   │   └── page.tsx           # Journey page (timeline, story, values, 3D portrait, tools)
│   ├── work/
│   │   ├── page.tsx           # Filterable projects grid (All, Product, Systems, Creative, Brand)
│   │   └── [slug]/
│   │       └── page.tsx       # Dynamic case study template (hero, problem, solution, process, next project)
│   ├── playground/
│   │   └── page.tsx           # Interactive labs (Hungarian matrix game, WCAG palette tool, audio pad)
│   ├── contact/
│   │   └── page.tsx           # Direct transmission form with validation & copy email
│   └── api/
│       ├── chat/
│       │   └── route.ts       # AI chat route with Claude API integration + context engine
│       └── contact/
│           └── route.ts       # Contact submission route with Resend API support
├── components/
│   ├── 3d/
│   │   ├── SoftAvatar.tsx     # MeshPhysicalMaterial soft glossy 3D avatar & satellites
│   │   ├── HeroAvatarScene.tsx # R3F Canvas with mouse parallax & viewport pausing
│   │   └── SceneWrapper.tsx   # Lazy dynamic import with prefers-reduced-motion fallback
│   ├── ui/
│   │   ├── CustomCursor.tsx   # Morphing cursor (pointer-hand SVG, click ripple, label pills)
│   │   ├── Navbar.tsx         # Floating pill navbar (shrinks/blurs on scroll, active indicator)
│   │   ├── Footer.tsx         # Live local time (IST), copy email with toast, social links
│   │   ├── AskMeChat.tsx      # Floating "Ask me" AI chat drawer
│   │   ├── SmoothScroll.tsx   # Lenis smooth scroll provider
│   │   ├── ContactModal.tsx   # Animated modal contact form
│   │   └── GrainOverlay.tsx   # Subtle tactile noise texture
│   └── home/
│       ├── HeroSection.tsx    # Multi-script name marquee + 3D avatar + H1
│       ├── SkillsMarquee.tsx  # Opposite scrolling pills (pauses on hover, flashes lime)
│       ├── ExperienceStrip.tsx# "4+ years..." with floating tool logos
│       ├── SelectedProjects.tsx# 2-column pastel cards with 3D tilt
│       ├── ProcessSection.tsx # Sticky scroll-driven 7-step process
│       ├── SideProjects.tsx   # Bento grid of toys, tools & games
│       └── ContactCTA.tsx     # Big "Open to roles" CTA + transmission modal
├── data/
│   └── content.ts             # SINGLE SOURCE OF TRUTH: edit all content, projects & bio here!
├── lib/
│   └── utils.ts               # cn helper (clsx + tailwind-merge)
├── public/                    # Static assets
├── next.config.mjs            # Next.js 14 config with transpiled Three.js packages
├── tailwind.config.ts         # Tailwind design tokens
├── tsconfig.json              # Strict TypeScript config with @/ path aliases
└── package.json
```

---

## ⚡ Setup & Local Development

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build for production (pre-renders all 18 pages)
npm run build

# 4. Run production server
npm run start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚀 Vercel Deployment

1. Push this repository to GitHub or GitLab.
2. Import the repository in [Vercel](https://vercel.com/).
3. Framework Preset: **Next.js**.
4. (Optional) Set environment variables:
   - `ANTHROPIC_API_KEY`: For real-time Claude 3 Haiku answers in the "Ask Me" drawer (works with zero-config built-in intelligent fallback if not set).
   - `RESEND_API_KEY`: For sending real emails from the contact form (logs and falls back gracefully if not set).
5. Click **Deploy**.

---

## 📋 Single Source of Truth (`data/content.ts`)

To customize the entire website with your own information, edit **only** [`data/content.ts`](file:///Users/vabhiram/Documents/portfolio/data/content.ts):
- Name, brand name, role, location, tagline, subline
- Status & availability
- Email & social links
- Transliterations for the hero marquee
- 6 Selected Projects (title, slug, category, year, metrics, problem, solution, process, outcomes)
- 4 Side projects / experiments
- Experience journey entries & core values

---

## 📦 Assets to Supply (Optional Customization)

1. **Favicon / Logo:** Replace default SVGs in `public/favicon.ico`.
2. **Open Graph Image:** Add a 1200×630px banner at `public/og-image.png`.
3. **Project Screenshots:** Replace placeholder mockups with screenshots in `public/projects/`.
4. **Custom 3D GLB Model:** If you want a custom Draco-compressed model instead of the procedural `SoftAvatar.tsx`, place your `.glb` in `public/models/` and load it via `useGLTF`.
