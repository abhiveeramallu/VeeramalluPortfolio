/**
 * Single source of truth for every word on the site, the résumé PDF and the chat assistant's grounding.
 *
 * Editing rules:
 * - Any number that you have not personally verified carries a `// TODO: verify` comment. Remove the
 *   comment only once you can point at the source (analytics, test report, repo, letter).
 * - `placeholder: true` items never render in production (see components/home/Testimonials.tsx).
 * - Project images: drop files at /public/projects/<slug>/<media id>.webp and they replace the generated art.
 */

export type ProjectCategory = 'Product Design' | 'Design Systems' | 'Creative Dev' | 'Brand Identity';
export type Provenance = 'Shipped' | 'Prototype' | 'Self-initiated';
export type ProjectArt = 'routes' | 'radar' | 'document' | 'climate' | 'tokens' | 'kinetic';
export type SoftBg = 'pink' | 'blue' | 'yellow' | 'green' | 'purple';

export interface Metric {
  label: string;
  value: string;
  context?: string;
}

export interface MediaSlot {
  /** File name (without extension) looked up at /public/projects/<slug>/<id>.webp */
  id: string;
  caption: string;
  alt: string;
}

export type GalleryItem =
  | ({ kind: 'image'; span: 'full' | 'half' | 'third' } & MediaSlot)
  | { kind: 'before-after'; id: string; caption: string; beforeLabel: string; afterLabel: string }
  | { kind: 'token-inspector'; id: string; caption: string };

export interface Decision {
  title: string;
  chose: string;
  over: string;
  because: string;
}

export interface ProjectItem {
  slug: string;
  title: string;
  client?: string;
  category: ProjectCategory;
  provenance: Provenance;
  year: string;
  tagline: string;
  description: string;
  role: string;
  team: string;
  timeline: string;
  tools: string[];
  color: string;
  softBg: SoftBg;
  art: ProjectArt;
  featured: boolean;
  metrics: Metric[];
  problem: string;
  constraints: string[];
  process: { step: string; detail: string; media?: MediaSlot }[];
  decisions: Decision[];
  solution: string;
  gallery: GalleryItem[];
  outcome: { summary: string; metrics: Metric[] };
  retro: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export interface Experiment {
  slug: string;
  title: string;
  tagline: string;
  kind: 'Browser game' | 'Tool' | 'Sound toy' | '3D toy' | 'Shader';
  year: string;
  color: string;
  softBg: SoftBg;
  howIBuiltIt: string[];
  stack: string[];
  sourcePath: string;
  isNew?: boolean;
}

export interface ProcessStep {
  number: string;
  title: string;
  tagline: string;
  description: string;
  artifact: string;
}

export interface TimelineEntry {
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  highlights: string[];
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  /** Placeholders render only in development, with a visible "replace me" badge. */
  placeholder: boolean;
}

export const SITE_CONFIG = {
  name: 'Sai Abhiram',
  shortName: 'Abhiram',
  initials: 'SA',
  brandName: 'abhiram.design',
  role: 'Product Designer & Design Engineer',
  location: 'Bengaluru, India',
  timezone: 'Asia/Kolkata',
  tagline: 'I design products and build them in code, so the details survive to production.',
  subline:
    'Product designer and front-end engineer. I take messy, algorithm-heavy problems — dispatch, fraud signals, private AI — and turn them into interfaces people understand in one glance.',
  status: 'Available for full-time roles',
  availability: 'from January 2027', // TODO: verify start date
  email: 'hello@abhiram.design', // TODO: verify this inbox receives mail
  bookingUrl: '', // Add a Cal.com / Calendly link to turn the secondary hero CTA into "Book a call".

  socials: {
    linkedin: 'https://linkedin.com/in/abhiramveeramallu',
    github: 'https://github.com/abhiveeramallu',
    behance: 'https://behance.net/abhiramdesign', // TODO: verify profile exists
  },

  heroStats: [
    { value: '3+', label: 'years designing & shipping in code' }, // TODO: verify (freelance since 2022)
    { value: '6', label: 'products taken from research to build' },
    { value: '<120ms', label: 'p95 match time I designed around in RouteFusion' }, // TODO: verify
  ] as Metric[],

  /** Shown in the "Currently building" ticker under the hero (no client logos yet — this is honest). */
  currentlyBuilding: [
    'RouteFusion v2 — live driver heat-maps', // TODO: verify
    'A GLSL playground for this site',
    'Figma variables → Tailwind token sync',
    'ThreatLens: replay mode for analysts', // TODO: verify
    'Reading: “Inclusive Components”',
  ],

  heroTransliterations: ['ABHIRAM', 'अभिराम', 'アビラム', '아비람', 'அபிராம்', 'అభిరామ్', 'অভিরাম'],

  tools: [
    { name: 'Figma', category: 'Design' },
    { name: 'Framer', category: 'Prototyping' },
    { name: 'React / Next.js', category: 'Engineering' },
    { name: 'TypeScript', category: 'Engineering' },
    { name: 'Three.js / R3F', category: '3D & WebGL' },
    { name: 'Tailwind CSS', category: 'Styling' },
    { name: 'Python / FastAPI', category: 'Back-end' },
    { name: 'Claude API', category: 'AI prototyping' },
  ],

  skillsRow1: [
    'Product design',
    'Design systems',
    'Design engineering',
    'Three.js & WebGL',
    'Motion design',
    'Prototyping in code',
    'Next.js App Router',
    'Data-dense UI',
  ],
  skillsRow2: [
    'User research',
    'Information architecture',
    'Design tokens',
    'Accessibility (WCAG 2.2 AA)',
    'FastAPI',
    'LLM product UX',
    'Usability testing',
    'Shipping',
  ],

  processSteps: [
    {
      number: '01',
      title: 'Research',
      tagline: 'Find the real problem behind the brief',
      description:
        'Ride-alongs, interviews and log reading. I look for the moment people hesitate — that is where the product is.',
      artifact: 'Field notes + a one-page problem statement',
    },
    {
      number: '02',
      title: 'Frame',
      tagline: 'Agree on what “better” means',
      description:
        'Jobs-to-be-done, constraints and one success metric per flow, written down before I draw a rectangle.',
      artifact: 'Success metrics + design principles',
    },
    {
      number: '03',
      title: 'Sketch',
      tagline: 'Test structure while it is cheap',
      description: 'Paper and grey boxes. I put the riskiest flow in front of a user in the first week.',
      artifact: 'Low-fi flows tested with 3–5 people',
    },
    {
      number: '04',
      title: 'System',
      tagline: 'Tokens before screens',
      description:
        'Colour, type and spacing as tokens with contrast checks in CI, so the tenth screen is as consistent as the first.',
      artifact: 'Token set + core components',
    },
    {
      number: '05',
      title: 'Prototype',
      tagline: 'Build it in the real medium',
      description:
        'React prototypes with real data and real latency. Springs, states and errors are designed, not left to chance.',
      artifact: 'Coded prototype on a shareable URL',
    },
    {
      number: '06',
      title: 'Ship',
      tagline: 'Measure, then polish',
      description:
        'I pair on the production build, check performance and accessibility budgets, and iterate on what the numbers say.',
      artifact: 'Release + a short metrics readout',
    },
  ] as ProcessStep[],

  projects: [
    {
      slug: 'routefusion',
      title: 'RouteFusion',
      client: 'University engineering showcase',
      category: 'Product Design',
      provenance: 'Shipped',
      year: '2024',
      tagline: 'One dispatch screen for rides and parcels, matched in under 120 ms.',
      description:
        'A dispatch platform that pools passenger rides with parcel deliveries on the same route. I designed the driver and operator experience and built the front end.',
      role: 'Product designer & front-end lead',
      team: '4 people: me, 2 back-end engineers, 1 ML engineer', // TODO: verify
      timeline: '4 months',
      tools: ['Figma', 'Next.js', 'TypeScript', 'Mapbox', 'FastAPI'],
      color: '#FF5A1F',
      softBg: 'yellow',
      art: 'routes',
      featured: true,
      metrics: [
        { label: 'Match time', value: '<120ms', context: 'p95, simulated load' }, // TODO: verify
        { label: 'Empty kilometres', value: '−28%', context: '1,400-trip simulation' }, // TODO: verify
        { label: 'Taps to accept a pooled job', value: '3', context: 'down from 7' }, // TODO: verify
      ],
      problem:
        'Couriers and ride-hail drivers cover the same corridors with empty seats and empty boots. Pooling them needs a matching engine — and a driver screen that explains a combined pickup-and-drop route in a two-second glance at 40 km/h.',
      constraints: [
        'Drivers glance, they do not read: every decision had to fit a 2-second look.',
        'Matching re-runs whenever a request lands, so the UI could never assume a stable plan.',
        'Phones mounted in direct sunlight, used one-handed.',
        'Four months, four students, no production fleet to test on.',
      ],
      process: [
        {
          step: 'Ride-alongs',
          detail:
            'I rode with couriers for two weekends and timed how long they looked at their phones. Median glance: 1.8 s. That number became the design budget.', // TODO: verify
          media: {
            id: 'process-1',
            caption: 'Glance-time notes from the ride-alongs',
            alt: 'Notebook sketch of glance timings per screen',
          },
        },
        {
          step: 'Mapbox prototype',
          detail:
            'Built a clickable React + Mapbox prototype fed by a surge simulator so we could feel what a re-plan does to the screen mid-drive.',
          media: {
            id: 'process-2',
            caption: 'Surge simulator driving the prototype',
            alt: 'Map with simulated orders appearing in bursts',
          },
        },
        {
          step: 'Explaining the match',
          detail:
            'The Hungarian matcher is optimal but opaque. I visualised each assignment as a single coloured corridor so drivers see “why me” without numbers.',
          media: {
            id: 'process-3',
            caption: 'Corridor view: one colour per matched job',
            alt: 'Route corridors drawn in orange and indigo',
          },
        },
        {
          step: 'Daylight tokens',
          detail:
            'A high-contrast daylight palette with every text pair at WCAG AA or better, checked in CI.',
        },
      ],
      decisions: [
        {
          title: 'One route, not two jobs',
          chose: 'A single merged route with stops in order',
          over: 'Separate ride and parcel cards',
          because:
            'Two cards meant drivers had to merge them mentally. Merged routes cut accept time in hallway tests.', // TODO: verify
        },
        {
          title: 'Batch matching every 2 s',
          chose: 'Hungarian assignment over small time batches',
          over: 'Greedy nearest-driver',
          because:
            'Greedy stranded far parcels. Batching costs up to 2 s of latency, which we hid behind the accept animation.',
        },
        {
          title: 'Daylight-first map',
          chose: 'Light basemap with heavy route strokes',
          over: 'The fashionable dark map',
          because: 'Dark maps wash out in sunlight. Drivers picked the light version 9 times out of 10.', // TODO: verify
        },
      ],
      solution:
        'A driver app that shows one route with numbered stops, a 3-tap accept flow, and an operator canvas where corridors light up as the matcher assigns them.',
      gallery: [
        {
          kind: 'image',
          id: 'gallery-1',
          span: 'full',
          caption: 'Operator canvas during a simulated rush hour',
          alt: 'Dispatch map with dozens of coloured route corridors',
        },
        {
          kind: 'before-after',
          id: 'accept-flow',
          caption: 'Accept flow: v1 (7 taps) → v3 (3 taps)',
          beforeLabel: 'v1 · two cards',
          afterLabel: 'v3 · merged route',
        },
        {
          kind: 'image',
          id: 'gallery-2',
          span: 'half',
          caption: 'Driver view, mounted',
          alt: 'Phone showing a merged route with three stops',
        },
        {
          kind: 'image',
          id: 'gallery-3',
          span: 'half',
          caption: 'Stop list with pickup and drop types',
          alt: 'List of stops with passenger and parcel icons',
        },
      ],
      outcome: {
        summary:
          'RouteFusion won the university engineering showcase and ran 1,400 simulated fleet journeys. The live demo is public.', // TODO: verify
        metrics: [
          { label: 'Delivery cost per trip', value: '−22%', context: 'vs. unpooled baseline, simulated' }, // TODO: verify
          { label: 'Empty kilometres', value: '−28%' }, // TODO: verify
          { label: 'Showcase result', value: '1st place' }, // TODO: verify
        ],
      },
      retro: [
        'Test on real roads earlier — the simulator was too kind about GPS drift.',
        'Instrument the accept flow from day one instead of reconstructing timings from logs.',
      ],
      liveUrl: 'https://route-fusion.vercel.app/',
      githubUrl: 'https://github.com/abhiveeramallu/RouteFusion',
    },
    {
      slug: 'threatlens-ai',
      title: 'ThreatLens AI',
      client: 'Research prototype',
      category: 'Creative Dev',
      provenance: 'Prototype',
      year: '2024',
      tagline: 'Bot detection that never shows a human a CAPTCHA.',
      description:
        'A behavioural bot-detection prototype that scores pointer movement, timing and headers invisibly, plus an analyst console that makes the model’s reasoning visible.',
      role: 'Design engineer',
      team: '3 people; I owned the console and the signal visualisations', // TODO: verify
      timeline: '3 months',
      tools: ['Figma', 'React', 'Three.js', 'Node.js', 'Python', 'XGBoost'],
      color: '#5B5BFF',
      softBg: 'blue',
      art: 'radar',
      featured: true,
      metrics: [
        { label: 'Classification accuracy', value: '99.1%', context: 'held-out test set' }, // TODO: verify
        { label: 'Scoring time', value: '14ms', context: 'per session, server-side' }, // TODO: verify
        { label: 'Challenges shown to humans', value: '0', context: 'in the test cohort' }, // TODO: verify
      ],
      problem:
        'CAPTCHAs tax every real visitor to stop a few bots, and modern headless browsers solve them anyway. Analysts also had no way to see why a session was flagged.',
      constraints: [
        'No visible challenge for humans — detection had to be invisible.',
        'Analysts triage hundreds of sessions an hour, so the console had to be dense but calm.',
        'Model features are numeric vectors; the UI had to make them legible to non-ML people.',
      ],
      process: [
        {
          step: 'Signal mapping',
          detail:
            'Interviewed two security analysts about their triage routine and mapped which signals they actually trust.', // TODO: verify
          media: {
            id: 'process-1',
            caption: 'Signals analysts trust, ranked',
            alt: 'Card sort of detection signals',
          },
        },
        {
          step: 'Visualising pointer paths',
          detail:
            'Plotted real vs. scripted pointer paths. Bots move in straight lines at constant speed — the picture explains the model better than any score.',
          media: {
            id: 'process-2',
            caption: 'Human curve vs. scripted line',
            alt: 'Two pointer traces, one curved, one straight',
          },
        },
        {
          step: 'Console system',
          detail:
            'A compact component set: monospace tables, three status colours, and nothing else that blinks.',
        },
      ],
      decisions: [
        {
          title: 'Explain, then score',
          chose: 'Show the top three signals before the risk score',
          over: 'A single 0–100 risk number',
          because: 'Analysts overrode bare scores constantly; with reasons attached they trusted the call.',
        },
        {
          title: '3D radar kept small',
          chose: 'A small Three.js radar as an overview only',
          over: 'A full-screen 3D view',
          because: 'It looked great in demos and slowed real triage down. 3D earned a corner, not the page.',
        },
      ],
      solution:
        'An invisible client-side sensor feeding an XGBoost classifier, and an analyst console that pairs every verdict with the pointer trace and the signals behind it.',
      gallery: [
        {
          kind: 'image',
          id: 'gallery-1',
          span: 'full',
          caption: 'Analyst console with live session stream',
          alt: 'Dark console with session table and radar',
        },
        {
          kind: 'before-after',
          id: 'challenge',
          caption: 'From challenge wall to invisible check',
          beforeLabel: 'Before · CAPTCHA',
          afterLabel: 'After · invisible',
        },
        {
          kind: 'image',
          id: 'gallery-2',
          span: 'half',
          caption: 'Pointer-trace inspector',
          alt: 'Pointer path with speed colouring',
        },
        {
          kind: 'image',
          id: 'gallery-3',
          span: 'half',
          caption: 'Signal breakdown for one session',
          alt: 'Bar list of signal contributions',
        },
      ],
      outcome: {
        summary:
          'A working prototype with a reproducible evaluation in the repo. Humans in the test cohort never saw a challenge.', // TODO: verify
        metrics: [
          { label: 'Accuracy', value: '99.1%' }, // TODO: verify
          { label: 'False positives', value: '0.4%' }, // TODO: verify
          { label: 'Median scoring', value: '14ms' }, // TODO: verify
        ],
      },
      retro: [
        'I would test the console with analysts weekly, not just at the start.',
        'The 3D radar took a week I should have spent on keyboard shortcuts.',
      ],
      githubUrl: 'https://github.com/abhiveeramallu/ThreatlensAI',
    },
    {
      slug: 'smart-document-ai',
      title: 'DocuSense AI',
      client: 'Self-initiated',
      category: 'Product Design',
      provenance: 'Prototype',
      year: '2024',
      tagline: 'Ask questions about private contracts without a single byte leaving the laptop.',
      description:
        'A document reader that answers questions about PDFs using a local LLM (Ollama) and highlights the exact clause it relied on.',
      role: 'Product designer & full-stack prototyper',
      team: 'Solo',
      timeline: '2 months',
      tools: ['Figma', 'React', 'FastAPI', 'Ollama', 'Tailwind CSS'],
      color: '#8FB30A',
      softBg: 'green',
      art: 'document',
      featured: true,
      metrics: [
        { label: 'Data sent to the cloud', value: '0 bytes', context: 'runs fully offline' },
        { label: 'Median answer time', value: '1.4s', context: 'M1 laptop, 8B model' }, // TODO: verify
        { label: 'Answers with a source citation', value: '100%' },
      ],
      problem:
        'People reviewing leases, NDAs and offer letters can’t paste them into cloud chatbots — and when an AI does answer, they can’t tell which clause it read.',
      constraints: [
        'Everything local: no API calls, no telemetry.',
        'Small local models are slower and less accurate, so the UI had to make uncertainty visible.',
        'Readers must be able to verify every answer in one click.',
      ],
      process: [
        {
          step: 'Watching people read contracts',
          detail:
            'I watched classmates review their internship offer letters. Everyone used Ctrl+F and still missed clauses.', // TODO: verify
          media: {
            id: 'process-1',
            caption: 'Where readers lost their place',
            alt: 'Annotated contract page',
          },
        },
        {
          step: 'Citations as anchors',
          detail:
            'Every answer links to a bounding box in the source PDF; clicking it scrolls and flashes the clause.',
          media: {
            id: 'process-2',
            caption: 'Answer → clause anchor',
            alt: 'Split screen with linked highlight',
          },
        },
      ],
      decisions: [
        {
          title: 'Split screen, always',
          chose: 'Document and answers side by side',
          over: 'A chat-first layout',
          because: 'The document is the source of truth; chat is the index into it.',
        },
        {
          title: 'Local model, honest speed',
          chose: 'Stream tokens with a visible “reading pages 3–5” status',
          over: 'A spinner',
          because: 'At 1–2 s per answer, showing what the model is doing made the wait feel shorter.',
        },
      ],
      solution:
        'A calm, editorial reader with linked citations, table-to-JSON export, and a local-model status bar that shows exactly what is running.',
      gallery: [
        {
          kind: 'image',
          id: 'gallery-1',
          span: 'full',
          caption: 'Reader with linked citation',
          alt: 'Contract on the left, answer with highlight on the right',
        },
        {
          kind: 'image',
          id: 'gallery-2',
          span: 'half',
          caption: 'Table extraction',
          alt: 'PDF table converted into JSON',
        },
        {
          kind: 'image',
          id: 'gallery-3',
          span: 'half',
          caption: 'Local model status',
          alt: 'Status bar reading model name and memory',
        },
      ],
      outcome: {
        summary:
          'In hallway tests people found the relevant clause faster than with Ctrl+F, and trusted answers more because they could check them.', // TODO: verify
        metrics: [
          { label: 'Time to find a clause', value: '−60%', context: 'vs. Ctrl+F, n=5' }, // TODO: verify
          { label: 'Cloud calls', value: '0' },
        ],
      },
      retro: ['I’d run a proper usability study with more than five people before claiming the speed-up.'],
      githubUrl: 'https://github.com/abhiveeramallu', // TODO: link the specific repository
    },
    {
      slug: 'greenhouse-telemetry',
      title: 'Aura Flora',
      client: 'Self-initiated',
      category: 'Design Systems',
      provenance: 'Self-initiated',
      year: '2024',
      tagline: 'A greenhouse dashboard that warns growers 12 hours before frost.',
      description:
        'Micro-climate forecasting (GRU vs. BiLSTM) paired with a dashboard whose colour system maps directly to plant comfort.',
      role: 'Lead UI/UX & creative technologist',
      team: '2 people; I owned the design system and front end', // TODO: verify
      timeline: '3 months',
      tools: ['Figma', 'Python', 'GRU / BiLSTM', 'Next.js', 'Chart.js'],
      color: '#FF5A1F',
      softBg: 'pink',
      art: 'climate',
      featured: true,
      metrics: [
        { label: 'Forecast horizon', value: '12h' },
        { label: 'Forecast error', value: '0.6°C', context: 'MAE, GRU, test split' }, // TODO: verify
        { label: 'Earlier vent actions', value: '4h', context: 'replayed 2023 data' }, // TODO: verify
      ],
      problem:
        'Greenhouses react after the temperature has already spiked or dropped, stressing crops and burning energy on emergency heating.',
      constraints: [
        'Growers check the dashboard on a phone in the greenhouse — gloves, glare, no patience.',
        'Forecasts are uncertain; the UI had to show confidence without a statistics lesson.',
      ],
      process: [
        {
          step: 'Comfort-band colour tokens',
          detail:
            'A temperature scale from cool mint to warm apricot, where the colour itself tells you if plants are comfortable.',
          media: {
            id: 'process-1',
            caption: 'Comfort-band token scale',
            alt: 'Gradient swatches from mint to apricot',
          },
        },
        {
          step: 'Confidence bands',
          detail: 'Layered forecast bands that widen with uncertainty, tested against a plain line chart.',
        },
      ],
      decisions: [
        {
          title: 'Semantic colour over raw degrees',
          chose: 'Tokens named by plant comfort (too-cold → ideal → too-hot)',
          over: 'A generic blue-to-red heat scale',
          because: 'Growers act on “is this OK?”, not on a number.',
        },
      ],
      solution:
        'A dashboard with comfort-coloured zones, a 12-hour forecast with confidence bands, and threshold sliders that schedule vents ahead of weather fronts.',
      gallery: [
        {
          kind: 'image',
          id: 'gallery-1',
          span: 'full',
          caption: 'Zone overview at dawn',
          alt: 'Dashboard with greenhouse zones coloured by comfort',
        },
        { kind: 'token-inspector', id: 'tokens', caption: 'Explore the comfort-band tokens' },
      ],
      outcome: {
        summary:
          'On replayed 2023 sensor data the system would have opened vents about 4 hours before the old rule-based controller.', // TODO: verify
        metrics: [
          { label: 'Earlier actions', value: '4h' }, // TODO: verify
          { label: 'HVAC energy (simulated)', value: '−19%' }, // TODO: verify
        ],
      },
      retro: ['Next time I’d put it in front of a working grower before tuning the model.'],
      githubUrl: 'https://github.com/abhiveeramallu', // TODO: link the specific repository
    },
    {
      slug: 'lumina-design-system',
      title: 'Lumina Tokens',
      client: 'Open source',
      category: 'Design Systems',
      provenance: 'Self-initiated',
      year: '2023',
      tagline: 'One Figma source, three platforms, zero hand-copied hex codes.',
      description:
        'A token pipeline that turns Figma variables into CSS, Swift and Jetpack Compose themes, with a contrast check that blocks inaccessible colours in CI.',
      role: 'Design systems engineer',
      team: 'Solo',
      timeline: '5 months',
      tools: ['Figma variables', 'Style Dictionary', 'TypeScript', 'GitHub Actions', 'Tailwind CSS'],
      color: '#5B5BFF',
      softBg: 'purple',
      art: 'tokens',
      featured: false,
      metrics: [
        { label: 'Tokens', value: '480+' }, // TODO: verify
        { label: 'Platforms from one source', value: '3' },
        { label: 'Minimum text contrast, enforced', value: '4.5:1' },
      ],
      problem:
        'Teams copy hex codes from Figma into web, iOS and Android by hand. Brands drift, and inaccessible colours ship because nobody checks.',
      constraints: [
        'Designers keep working in Figma — no new tool to learn.',
        'Output must be idiomatic on each platform, not a lowest-common-denominator JSON.',
      ],
      process: [
        {
          step: 'Three tiers',
          detail: 'Global → semantic → component tokens, so a rebrand changes a dozen values, not hundreds.',
        },
        {
          step: 'Contrast gate',
          detail:
            'A CI step computes WCAG contrast for every text/background pair and fails the PR below 4.5:1.',
          media: {
            id: 'process-2',
            caption: 'Failing contrast check in CI',
            alt: 'GitHub check output listing a failing colour pair',
          },
        },
      ],
      decisions: [
        {
          title: 'Aliases, not copies',
          chose: 'Semantic tokens that reference global ones',
          over: 'Flat token lists',
          because: 'Dark mode became a remap of one tier instead of a second palette.',
        },
      ],
      solution:
        'A zero-touch pipeline: change a variable in Figma, get a pull request with updated themes for all three platforms.',
      gallery: [
        { kind: 'token-inspector', id: 'tokens', caption: 'Inspect how a component token resolves' },
        {
          kind: 'before-after',
          id: 'drift',
          caption: 'Hand-copied hex vs. generated tokens',
          beforeLabel: 'Before · drift',
          afterLabel: 'After · tokens',
        },
      ],
      outcome: {
        summary: 'Dark mode for the demo app took one afternoon: remap the semantic tier, regenerate, done.',
        metrics: [
          { label: 'Dark mode time', value: '1 afternoon' },
          { label: 'Manual colour edits', value: '0' },
        ],
      },
      retro: ['I over-built the Swift output before anyone needed it. Ship web first, then follow demand.'],
      githubUrl: 'https://github.com/abhiveeramallu', // TODO: link the specific repository
    },
    {
      slug: 'kinetic-craft',
      title: 'Kinetic Craft',
      client: 'Concept identity',
      category: 'Brand Identity',
      provenance: 'Self-initiated',
      year: '2023',
      tagline: 'A studio identity where the logo is a physics simulation.',
      description:
        'A concept identity for a creative studio built from soft-body simulations: glossy objects that squash, bounce and settle into the wordmark.',
      role: 'Brand designer & 3D artist',
      team: 'Solo',
      timeline: '2 months',
      tools: ['Blender', 'Three.js', 'Figma', 'After Effects'],
      color: '#FF5A1F',
      softBg: 'yellow',
      art: 'kinetic',
      featured: false,
      metrics: [
        { label: 'Simulations explored', value: '40+' },
        { label: 'Web hero payload', value: '180kB', context: 'Draco-compressed GLB' },
        { label: 'Frame rate', value: '60fps', context: '2019 MacBook Air' }, // TODO: verify
      ],
      problem:
        'Studio sites all look the same: a grotesk wordmark, a black background and a reel. Nothing you can feel.',
      constraints: [
        'The 3D had to load fast enough for a hero (<200 kB).',
        'The identity had to work as a flat SVG too.',
      ],
      process: [
        {
          step: 'Physics sketches',
          detail:
            'Forty-plus soft-body loops in Blender to find motion that felt like the studio: heavy, then playful.',
        },
        {
          step: 'Web pipeline',
          detail: 'Baked lighting, Draco compression and instancing got the hero to 180 kB.',
        },
      ],
      decisions: [
        {
          title: 'Bake, don’t simulate live',
          chose: 'Pre-baked animation clips',
          over: 'Real-time physics in the browser',
          because: 'Same look at a tenth of the CPU, and it plays identically on every device.',
        },
      ],
      solution: 'A wordmark, a motion system and a WebGL hero that share the same glossy objects.',
      gallery: [
        {
          kind: 'image',
          id: 'gallery-1',
          span: 'full',
          caption: 'Wordmark settling',
          alt: 'Glossy shapes forming a wordmark',
        },
        {
          kind: 'image',
          id: 'gallery-2',
          span: 'half',
          caption: 'Flat SVG version',
          alt: 'Flat logo lockup',
        },
        {
          kind: 'image',
          id: 'gallery-3',
          span: 'half',
          caption: 'Motion stills',
          alt: 'Frames of a bouncing object',
        },
      ],
      outcome: {
        summary: 'A complete concept identity and the technical recipe I reused for this site’s hero.',
        metrics: [{ label: 'Hero payload', value: '180kB' }],
      },
      retro: ['I’d test the identity at favicon size on day one — two shapes didn’t survive it.'],
      githubUrl: 'https://github.com/abhiveeramallu', // TODO: link the specific repository
    },
  ] as ProjectItem[],

  experiments: [
    {
      slug: 'flow-gradient',
      title: 'Flow Field Gradient',
      tagline: 'A raw-GLSL gradient you can push around with your cursor.',
      kind: 'Shader',
      year: '2026',
      color: '#5B5BFF',
      softBg: 'purple',
      isNew: true,
      howIBuiltIt: [
        'A full-screen plane with a custom drei shaderMaterial — no post-processing.',
        'Domain-warped simplex noise drives the colour mix between the four brand hues.',
        'The pointer injects a decaying “stir” uniform, so the field swirls where you move and settles back.',
      ],
      stack: ['GLSL', 'React Three Fiber', 'drei shaderMaterial'],
      sourcePath: 'components/playground/FlowGradient.tsx',
    },
    {
      slug: 'hungarian-matrix',
      title: 'Hungarian Matrix Lab',
      tagline: 'Beat the algorithm that powers RouteFusion’s dispatch.',
      kind: 'Browser game',
      year: '2024',
      color: '#FF5A1F',
      softBg: 'yellow',
      howIBuiltIt: [
        'A real Hungarian (Kuhn–Munkres) solver in TypeScript computes the optimum for every random board.',
        'You assign drivers to orders; the game compares your total with the optimum and shows the gap.',
      ],
      stack: ['TypeScript', 'React'],
      sourcePath: 'components/playground/HungarianGame.tsx',
    },
    {
      slug: 'contrast-ramps',
      title: 'Contrast Ramp Generator',
      tagline: 'Pick a brand colour, get a 50–900 ramp with honest WCAG ratios.',
      kind: 'Tool',
      year: '2023',
      color: '#8FB30A',
      softBg: 'green',
      howIBuiltIt: [
        'Uses the same contrast maths as this site’s token tests (lib/contrast.ts).',
        'Flags the first step in the ramp that is safe for body text on light and dark backgrounds.',
      ],
      stack: ['TypeScript', 'WCAG 2.2'],
      sourcePath: 'components/playground/ContrastRamps.tsx',
    },
    {
      slug: 'chroma-synth',
      title: 'Chroma Beat Synth',
      tagline: 'A pentatonic pad you can play with your keyboard.',
      kind: 'Sound toy',
      year: '2023',
      color: '#5B5BFF',
      softBg: 'blue',
      howIBuiltIt: [
        'Web Audio oscillators with a short attack/decay envelope — no samples.',
        'Keys A–J play notes; a single shared AudioContext keeps latency low.',
      ],
      stack: ['Web Audio API', 'React'],
      sourcePath: 'components/playground/ChromaSynth.tsx',
    },
    {
      slug: 'clay-sculptor',
      title: 'Pastel Clay Sculptor',
      tagline: 'Tune clearcoat, roughness and colour on a soft 3D object.',
      kind: '3D toy',
      year: '2024',
      color: '#FF5A1F',
      softBg: 'pink',
      howIBuiltIt: [
        'MeshPhysicalMaterial with clearcoat under a Lightformer studio — the same rig as the home hero.',
        'Sliders write straight to material uniforms, so nothing re-renders in React.',
      ],
      stack: ['React Three Fiber', 'drei', 'three.js'],
      sourcePath: 'components/playground/ClaySculptor.tsx',
    },
  ] as Experiment[],

  testimonials: [
    {
      quote:
        'Replace me with two sentences from a RouteFusion teammate about how you handled the dispatch UI under deadline.',
      name: 'Teammate name',
      role: 'Back-end engineer, RouteFusion',
      placeholder: true,
    },
    {
      quote: 'Replace me with a line from a professor or mentor about your design-engineering range.',
      name: 'Mentor name',
      role: 'Faculty, VIT',
      placeholder: true,
    },
    {
      quote: 'Replace me with a freelance client’s note on speed, communication or outcome.',
      name: 'Client name',
      role: 'Founder, early-stage startup',
      placeholder: true,
    },
  ] as Testimonial[],

  journey: [
    {
      period: '2023 — 2027',
      role: 'B.Tech, Computer Science',
      company: 'Vellore Institute of Technology',
      location: 'Vellore, India',
      description:
        'Human–computer interaction, algorithms and machine learning — and most of my evenings in Figma and VS Code.',
      highlights: ['Merit scholarship', 'RouteFusion: 1st at the engineering showcase'], // TODO: verify both
    },
    {
      period: '2024',
      role: 'Generative AI Engineering certificate',
      company: 'IBM',
      location: 'Remote',
      description:
        'LLMs, retrieval-augmented generation, vector search and deployment. Applied directly in DocuSense.',
      highlights: ['RAG systems', 'Local model inference'],
    },
    {
      period: '2022 — 2023',
      role: 'Independent design engineer',
      company: 'Freelance',
      location: 'Bengaluru, India',
      description: 'Landing pages, component libraries and small product builds for early-stage teams.',
      highlights: ['Design + build, end to end'], // TODO: add client count once verified
    },
  ] as TimelineEntry[],

  values: [
    {
      title: 'Feel over flash',
      description:
        'Springs, weight and sound make software feel crafted. I add delight only where it helps someone understand.',
    },
    {
      title: 'Make the maths obvious',
      description:
        'Matching algorithms and classifiers are invisible. My job is to make their decisions legible in one glance.',
    },
    {
      title: 'Design in the material',
      description: 'I prototype in code, so constraints show up in week one instead of in QA.',
    },
  ],

  chatSuggestions: [
    'What’s your design process?',
    'Show me your best 3D work',
    'Are you available?',
    'What did you do on RouteFusion?',
  ],
};

export type SiteConfig = typeof SITE_CONFIG;

export const getProject = (slug: string) => SITE_CONFIG.projects.find((p) => p.slug === slug);
export const getExperiment = (slug: string) => SITE_CONFIG.experiments.find((e) => e.slug === slug);
