export interface ProjectItem {
  slug: string;
  title: string;
  client?: string;
  category: 'Product Design' | 'Design Systems' | 'Creative Dev' | 'Brand Identity';
  year: string;
  tagline: string;
  description: string;
  role: string;
  timeline: string;
  tools: string[];
  color: string;
  softBg: 'pink' | 'blue' | 'yellow' | 'green' | 'purple';
  featured: boolean;
  metrics: { label: string; value: string }[];
  problem: string;
  solution: string;
  process: { step: string; detail: string }[];
  outcome: string;
  liveUrl?: string;
  githubUrl?: string;
}

export interface SideProjectItem {
  id: string;
  title: string;
  tagline: string;
  tag: 'Browser game' | 'Pixel art' | 'Freelance tool' | '3D Toy' | 'Audio Visualizer';
  year: string;
  href: string;
  badge?: string;
  color: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  tagline: string;
  description: string;
  icon: string;
}

export interface TimelineEntry {
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  highlights: string[];
}

export const SITE_CONFIG = {
  // Identity
  name: "Sai Abhiram",
  brandName: "abhiram.design",
  role: "Product Designer & Design Engineer",
  location: "Bengaluru / Vellore, India",
  tagline: "I turn complex problems into products that feel obvious.",
  subline: "Bridging the gap between tactile interface design, systems architecture, and soft creative 3D computing.",
  status: "Open to full-time roles & selective freelance",
  availability: "Q4 2026",
  yearsExperience: "4+",

  // Contact & Socials
  email: "hello@abhiram.design",
  socials: {
    linkedin: "https://linkedin.com/in/abhiramveeramallu",
    github: "https://github.com/abhiveeramallu",
    behance: "https://behance.net/abhiramdesign",
    twitter: "https://twitter.com/abhiram_design",
  },

  // Transliterations for the looping hero marquee background
  heroTransliterations: [
    { script: "English", text: "ABHIRAM" },
    { script: "Hindi", text: "अभिराम" },
    { script: "Japanese", text: "アビラム" },
    { script: "Korean", text: "아비람" },
    { script: "Tamil", text: "அபிராம்" },
    { script: "Telugu", text: "అభిరామ్" },
    { script: "Bengali", text: "অভিরাম" },
    { script: "Russian", text: "АБХИРАМ" },
    { script: "Chinese", text: "阿比拉姆" },
  ],

  // Primary Tool Stack with tags
  tools: [
    { name: "Figma", category: "Design", icon: "figma" },
    { name: "Framer", category: "Interactive", icon: "framer" },
    { name: "React / Next.js", category: "Engineering", icon: "react" },
    { name: "TypeScript", category: "Code", icon: "typescript" },
    { name: "Three.js / R3F", category: "3D Graphics", icon: "three" },
    { name: "Tailwind CSS", category: "Styling", icon: "tailwind" },
    { name: "Claude API", category: "AI Prototyping", icon: "claude" },
    { name: "Adobe Suite", category: "Brand & Motion", icon: "adobe" },
  ],

  // Skills Marquee Rows
  skillsRow1: [
    "Design Systems",
    "Product Design",
    "Creative Development",
    "Three.js & WebGL",
    "Motion Choreography",
    "Tactile Micro-interactions",
    "Prototyping",
    "Next.js App Router",
  ],
  skillsRow2: [
    "User Research",
    "Wireframing",
    "Brand Architecture",
    "FastAPI & Microservices",
    "Design Engineering",
    "Accessibility (WCAG AA)",
    "Figma Tokens",
    "Shipping It",
  ],

  // 7-step Process Section
  processSteps: [
    {
      number: "01",
      title: "Research",
      tagline: "Uncover the real problem behind the brief",
      description: "User interviews, behavioral telemetry, competitive teardowns, and friction analysis to isolate high-leverage opportunities.",
      icon: "Search",
    },
    {
      number: "02",
      title: "Framing",
      tagline: "Define user narratives and success metrics",
      description: "Establishing job-to-be-done statements, boundary conditions, and design principles before drawing a single rectangle.",
      icon: "Target",
    },
    {
      number: "03",
      title: "Wireframes",
      tagline: "Test structural information hierarchy early",
      description: "Rapid low-fidelity explorations focusing exclusively on layout rhythm, user paths, and cognitive load reduction.",
      icon: "Layout",
    },
    {
      number: "04",
      title: "Systems",
      tagline: "Build scalable tokens, typography and components",
      description: "Rigorous design token architecture, accessible color contrasts, and flexible autolayout primitives in Figma and Tailwind.",
      icon: "Layers",
    },
    {
      number: "05",
      title: "Prototype",
      tagline: "Make it tactile, responsive and expressive",
      description: "Functional React / Framer prototypes with physics-based springs, live states, and micro-audio feedback to feel real.",
      icon: "Sparkles",
    },
    {
      number: "06",
      title: "Handoff",
      tagline: "Zero ambiguity engineering specifications",
      description: "Token mapping, edge case handling, responsive breakpoint guides, and interactive storybooks that engineers love.",
      icon: "Share2",
    },
    {
      number: "07",
      title: "Shipping",
      tagline: "Iterate with production analytics and delight",
      description: "Production verification, Lighthouse 95+ optimization, semantic SEO, and continuous polish based on real usage.",
      icon: "Rocket",
    },
  ] as ProcessStep[],

  // 6 Selected Projects
  projects: [
    {
      slug: "routefusion",
      title: "RouteFusion",
      client: "Urban Logistics Lab",
      category: "Product Design",
      year: "2024",
      tagline: "Unified ride and parcel dispatch platform driven by Hungarian bipartite matching.",
      description: "A dual-sided logistics interface that pairs passenger journeys with parcel co-loading, cutting redundant urban vehicle miles while guaranteeing sub-minute driver dispatch.",
      role: "Lead Product Designer & Frontend Architect",
      timeline: "4 Months",
      tools: ["Figma", "Next.js", "TypeScript", "Tailwind CSS", "FastAPI"],
      color: "#FF5A1F",
      softBg: "yellow",
      featured: true,
      metrics: [
        { label: "Dispatch Latency", value: "<120ms" },
        { label: "Deadhead Miles Saved", value: "-28%" },
        { label: "User Task Completion", value: "98.4%" },
      ],
      problem: "Urban transit is fragmented: couriers and ride-hail cars drive identical street corridors with half-empty trunks and empty seats, multiplying traffic and fuel burn.",
      solution: "Designed a clean geospatial dispatch canvas with intuitive drag-and-drop route corridors, live bipartite matching indicators, and real-time passenger detour controls.",
      process: [
        { step: "Driver Field Studies", detail: "Rode with 12 couriers to map cognitive friction points in rapid pickup acceptance." },
        { step: "Interactive Prototyping", detail: "Built interactive Mapbox + React prototype simulating high-density order surges." },
        { step: "Design Token Architecture", detail: "Created high-contrast daylight palette with AA WCAG accessible navigation modes." },
      ],
      outcome: "Deployed in pilot testing with over 1,400 simulated fleet journeys, reducing average delivery costs by 22% and winning the university engineering showcase.",
      liveUrl: "https://route-fusion.vercel.app/",
      githubUrl: "https://github.com/abhiveeramallu/RouteFusion",
    },
    {
      slug: "threatlens-ai",
      title: "ThreatLens AI",
      client: "Cybersecurity Sentinel",
      category: "Creative Dev",
      year: "2024",
      tagline: "Real-time behavioral biometric bot detection with zero CAPTCHA friction.",
      description: "A dark-mode enterprise security console visualizing client interaction dynamics, mouse curvature velocities, and real-time anomaly telemetry.",
      role: "Design Engineer",
      timeline: "3 Months",
      tools: ["Figma", "React", "Node.js", "Python", "XGBoost", "Three.js"],
      color: "#5B5BFF",
      softBg: "blue",
      featured: true,
      metrics: [
        { label: "Detection Accuracy", value: "99.1%" },
        { label: "Human Verification Latency", value: "14ms" },
        { label: "User Drop-off", value: "0.2%" },
      ],
      problem: "Traditional CAPTCHAs frustrate legitimate human users and cause 12% funnel abandonment, while automated modern scrapers easily bypass static challenges.",
      solution: "Designed an ambient telemetry dashboard that monitors mouse dynamics and network packet headers invisibly, providing security analysts with instant visual threat triage.",
      process: [
        { step: "Biometric Data Visualization", detail: "Explored 3D radar and particle graphs to translate dense mathematical classification vectors." },
        { step: "Design System", detail: "Built a high-density cybernetic component library with neon status indicators and monospace tables." },
      ],
      outcome: "Eliminated user verification loops for 99.8% of genuine visitors while classifying automated malicious headless browsers with sub-20ms latency.",
      githubUrl: "https://github.com/abhiveeramallu/ThreatlensAI",
    },
    {
      slug: "smart-document-ai",
      title: "DocuSense AI",
      client: "Enterprise Knowledge Ops",
      category: "Product Design",
      year: "2024",
      tagline: "Private, on-premise document synthesis powered by local Ollama LLMs.",
      description: "An intuitive reader and intelligence workspace that parses confidential multi-page contracts, PDF tables, and scanned receipts without third-party cloud exfiltration.",
      role: "Product Designer & Full-Stack Prototyper",
      timeline: "2 Months",
      tools: ["Figma", "FastAPI", "React", "Ollama", "Tailwind CSS"],
      color: "#C6F432",
      softBg: "green",
      featured: true,
      metrics: [
        { label: "Cloud Exfiltration", value: "0 Bytes" },
        { label: "Parsing Accuracy", value: "96.8%" },
        { label: "Average Query Time", value: "1.4s" },
      ],
      problem: "Legal and financial institutions cannot paste proprietary contracts into cloud LLMs due to strict GDPR, HIPAA, and corporate confidentiality compliance.",
      solution: "Crafted a distraction-free editorial reader with side-by-side citation highlights, instant table-to-JSON transforms, and local-model status indicators.",
      process: [
        { step: "Contextual Inquiry", detail: "Shadowed legal analysts reviewing 80-page procurement contracts to map annotation habits." },
        { step: "Split-Screen Architecture", detail: "Engineered interactive document anchors linking AI synthesis directly to source PDF bounding boxes." },
      ],
      outcome: "Adopted by internal teams for processing sensitive NDA reviews with complete offline reliability.",
      githubUrl: "https://github.com/abhiveeramallu",
    },
    {
      slug: "greenhouse-telemetry",
      title: "Aura Flora",
      client: "Precision Agrotech",
      category: "Design Systems",
      year: "2024",
      tagline: "Predictive micro-climate forecasting and closed-loop greenhouse automation.",
      description: "A sensory agricultural control panel comparing GRU and BiLSTM recurrent forecasts to preempt thermal shock and frost before temperature drops occur.",
      role: "Lead UI/UX & Creative Technologist",
      timeline: "3 Months",
      tools: ["Figma", "Python", "GRU/BiLSTM", "Next.js", "Chart.js"],
      color: "#FF5A1F",
      softBg: "pink",
      featured: true,
      metrics: [
        { label: "Predictive Horizon", value: "12 Hours" },
        { label: "HVAC Energy Saved", value: "-19%" },
        { label: "Crop Yield Stability", value: "+14%" },
      ],
      problem: "Traditional commercial greenhouses react after internal temperature spikes occur, leading to crop thermal stress and massive HVAC energy surges.",
      solution: "Created an organic dashboard with soft ambient temperature gradients, intuitive weather trend forecasts, and automated actuator threshold sliders.",
      process: [
        { step: "Color Temperature System", detail: "Developed a color palette that subtly shifts from warm apricot to cool mint based on target comfort bands." },
        { step: "Time-Series Visuals", detail: "Designed multi-layer confidence bands allowing growers to understand predictive uncertainties at a glance." },
      ],
      outcome: "Empowered farm operators to proactively automate ventilation louvers 4 hours ahead of outdoor weather fronts.",
      githubUrl: "https://github.com/abhiveeramallu",
    },
    {
      slug: "lumina-design-system",
      title: "Lumina Tokens",
      client: "Open Source Initiative",
      category: "Design Systems",
      year: "2023",
      tagline: "Multi-brand design token system connecting Figma variables with Tailwind v4.",
      description: "An accessible, automated token pipeline that generates CSS variables, iOS Swift colors, and Android Compose themes straight from Figma variable collections.",
      role: "Design Systems Engineer",
      timeline: "5 Months",
      tools: ["Figma Tokens", "TypeScript", "Style Dictionary", "Tailwind CSS"],
      color: "#5B5BFF",
      softBg: "purple",
      featured: false,
      metrics: [
        { label: "Component Adoption", value: "94%" },
        { label: "Dark Mode Time-to-Ship", value: "1 Day" },
        { label: "Token Count", value: "480+" },
      ],
      problem: "Engineering teams were manually duplicating Figma hex codes into three separate platform repositories, causing brand drift and accessibility failures.",
      solution: "Architected a zero-touch CI/CD token transform pipeline using Style Dictionary and automated GitHub Actions pull requests.",
      process: [
        { step: "Semantic Hierarchy", detail: "Structured 3-tier token taxonomy: Global -> Semantic -> Component specific." },
        { step: "Automated Contrast Checks", detail: "Built custom linter blocking token commits with under 4.5:1 WCAG contrast." },
      ],
      outcome: "Adopted across 4 multi-platform web and mobile clients with zero manual color bugs in production.",
      githubUrl: "https://github.com/abhiveeramallu",
    },
    {
      slug: "kinetic-craft",
      title: "Kinetic Craft",
      client: "Interactive Studio",
      category: "Brand Identity",
      year: "2023",
      tagline: "Dynamic visual identity and generative 3D branding system for modern creative studios.",
      description: "An expressive visual language driven by fluid physics, procedural geometry generators, and tactile physics-based typography.",
      role: "Brand Designer & 3D Artist",
      timeline: "2 Months",
      tools: ["Blender", "Three.js", "Figma", "After Effects"],
      color: "#FF5A1F",
      softBg: "yellow",
      featured: false,
      metrics: [
        { label: "Brand Recall", value: "+42%" },
        { label: "Website Engagement", value: "3m 48s" },
        { label: "Awwwards Nominee", value: "Featured" },
      ],
      problem: "Modern digital studios all use identical minimalist sans-serif typography with no distinctive tactile or memorable motion character.",
      solution: "Crafted a reactive brand identity with soft glossy physical objects, generative SVG patterns, and dynamic audio-tactile responses.",
      process: [
        { step: "Physics Experiments", detail: "Prototyped 40+ soft-body simulation loops in Blender to establish studio brand signature motion." },
        { step: "Web Integration", detail: "Optimized GLTF assets to under 180kB with Draco compression for instant page load." },
      ],
      outcome: "Received widespread recognition in design communities and was featured on multiple design inspiration galleries.",
      githubUrl: "https://github.com/abhiveeramallu",
    },
  ] as ProjectItem[],

  // 4 Side Projects / Toys / Tools / Games
  sideProjects: [
    {
      id: "hungarian-grid",
      title: "Hungarian Matrix Lab",
      tagline: "Interactive game exploring combinatorial bipartite assignment algorithms.",
      tag: "Browser game",
      year: "2024",
      href: "/playground#hungarian-grid",
      badge: "Playable",
      color: "#FF5A1F",
    },
    {
      id: "soft-sculptor",
      title: "Pastel Mesh Sculptor",
      tagline: "Play with soft 3D clay materials, clearcoat reflection and studio lights in R3F.",
      tag: "3D Toy",
      year: "2024",
      href: "/playground#soft-sculptor",
      badge: "Interactive",
      color: "#5B5BFF",
    },
    {
      id: "token-palettes",
      title: "WCAG Contrast Generator",
      tagline: "Micro-tool to generate accessible color ramps with perceived luminance curves.",
      tag: "Freelance tool",
      year: "2023",
      href: "/playground#token-palettes",
      badge: "Utility",
      color: "#C6F432",
    },
    {
      id: "audio-synth-reactive",
      title: "Chroma Beat Synth",
      tagline: "Web Audio oscillator matrix with tactile retro synth pads and SVG visuals.",
      tag: "Audio Visualizer",
      year: "2023",
      href: "/playground#audio-synth-reactive",
      badge: "Sound Toy",
      color: "#FFD6E8",
    },
  ] as SideProjectItem[],

  // Experience Timeline for /about Journey
  journey: [
    {
      period: "2023 — Present",
      role: "B.Tech Computer Science & Creative Engineering",
      company: "Vellore Institute of Technology (VIT)",
      location: "Vellore, India",
      description: "Undergraduate degree focusing on human-computer interaction, distributed systems, combinatorial algorithms, and machine intelligence.",
      highlights: [
        "VIT Merit Scholarship recipient for top competitive academic standing",
        "Architecting open-source systems: RouteFusion, ThreatLens AI, and local LLM pipelines",
        "Bridging rigorous engineering fundamentals with expressive design craft",
      ],
    },
    {
      period: "2024",
      role: "IBM Generative AI Engineering Professional",
      company: "IBM Credential",
      location: "Remote",
      description: "Comprehensive professional credential in Large Language Models, prompt orchestration, vector databases, RAG architecture, and deployment.",
      highlights: [
        "Certified in production RAG systems and context window optimization",
        "Applied local quantized model inference (Ollama) to private data extraction",
      ],
    },
    {
      period: "2022 — 2023",
      role: "Design Engineer & Independent Creator",
      company: "Studio Abhiram",
      location: "Bengaluru, India",
      description: "Crafting multi-brand design systems, interactive 3D WebGL experiences, and high-conversion product interfaces for startups and indie makers.",
      highlights: [
        "Shipped 12+ production client web apps and component libraries",
        "Created open-source UI design engineering experiments with 40k+ views",
      ],
    },
  ] as TimelineEntry[],

  // Values
  values: [
    {
      title: "Tactile over Generic",
      description: "Software should feel like a crafted physical object. Soft physics, subtle spring damping, and thoughtful audio give digital tools weight and soul.",
    },
    {
      title: "Clarity over Complexity",
      description: "The most sophisticated algorithms—like Hungarian bipartite matching or gradient boosting—should feel effortless and intuitive on screen.",
    },
    {
      title: "Design with Code",
      description: "Prototypes built in code discover constraints early. Knowing how the DOM, WebGL shaders, and flexboxes actually behave makes for better designers.",
    },
  ],
};
