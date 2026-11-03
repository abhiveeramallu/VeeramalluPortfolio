/**
 * Single source of truth for every word on the site, the chat assistant's grounding and the résumé PDF.
 *
 * Honesty rules (see docs/DECISIONS.md):
 * - Every project fact was read from that project's own GitHub repository (README, docs, reports, package
 *   manifests) in November 2026. Numbers carry the repository file they came from in `facts`.
 * - No invented users, clients, deployments, awards, team sizes or benchmarks. Synthetic or simulated data
 *   is labelled as such, and weak results are reported as they are.
 * - Every featured repository has a single contributor (checked via the GitHub API), so "contribution"
 *   means designed and built end to end, solo.
 */

export type ProjectStatus = 'Live demo' | 'Working prototype' | 'Research prototype' | 'In development';

export type ProjectKind =
  | 'Personal project'
  | 'Academic project'
  | 'Research prototype'
  | 'Engineering project';

/** Which 3D illustration represents the project (components/art/scenes.tsx). */
export type IllustrationKind =
  | 'city'
  | 'radar'
  | 'fracture'
  | 'frames'
  | 'network'
  | 'board'
  | 'greenhouse'
  | 'sheets'
  | 'racks';

/** A number shown on the site, with the repository file it was copied from. */
export interface Fact {
  label: string;
  value: string;
  source: string;
}

export interface ProjectItem {
  slug: string;
  title: string;
  kind: ProjectKind;
  category: string;
  status: ProjectStatus;
  /** Repository created → last push, from the GitHub API. */
  period: string;
  summary: string;
  stack: string[];
  illustration: IllustrationKind;
  repoUrl: string;
  liveUrl?: string;

  overview: string;
  problem: string;
  whyItMatters: string;
  goals: string[];
  constraints: string[];
  contribution: string;
  architecture: { summary: string; flow: string[] };
  implementation: { title: string; body: string }[];
  decisions: { decision: string; because: string }[];
  challenges: string[];
  currentStatus: string;
  facts: Fact[];
  limitations: string[];
  learned: string[];
}

export interface ArchiveRepo {
  name: string;
  description: string;
  stack: string;
  url: string;
  liveUrl?: string;
}

export interface TimelineEntry {
  period: string;
  title: string;
  org: string;
  description: string;
}

const GH = 'https://github.com/abhiveeramallu';

export const SITE_CONFIG = {
  name: 'Veeramallu Sai Abhiram',
  shortName: 'Abhiram',
  displayName: 'ABHIRAM',
  initials: 'VSA',
  resumeUrl: '/DigitalVeeramalluSaiAbhiram.pdf',
  brandName: 'abhiram.design',
  role: 'Computer Science student & software engineer',
  location: 'Vellore, India',
  timezone: 'Asia/Kolkata',
  tagline: 'I build AI systems, full-stack products and the odd thing that talks to hardware.',
  subline:
    'Computer Science student at VIT Vellore, graduating in 2027. I work across machine learning, full-stack engineering, security and embedded systems — and I document what my projects can and cannot do.',
  status: 'Expected graduation 2027',
  /** The address on my public GitHub commits. */
  email: 'abhiram97137@gmail.com',

  socials: {
    github: GH,
    /** Empty until the profile URL is confirmed; empty links are never rendered. */
    linkedin: '',
  },

  interests: [
    'Machine learning systems',
    'Full-stack engineering',
    'Security engineering',
    'Embedded & edge AI',
  ],

  /** Every item is used in at least one repository below. */
  skills: [
    { group: 'Languages', items: ['Python', 'TypeScript', 'JavaScript', 'SQL'] },
    {
      group: 'Machine learning',
      items: ['PyTorch', 'scikit-learn', 'XGBoost', 'SHAP', 'Pandas · NumPy', 'Ollama'],
    },
    { group: 'Computer vision', items: ['OpenCV', 'PyWavelets', 'YOLOv8'] },
    {
      group: 'Back end',
      items: ['FastAPI', 'Express', 'SQLAlchemy 2.0', 'PostgreSQL', 'SQLite', 'JWT auth'],
    },
    {
      group: 'Front end',
      items: ['React', 'Next.js', 'Vite', 'Tailwind CSS', 'Three.js · R3F', 'Framer Motion'],
    },
    {
      group: 'Quality',
      items: ['Pytest', 'Jest · Supertest', 'Vitest', 'Playwright', 'Docker Compose', 'GitHub Actions'],
    },
    { group: 'Embedded', items: ['STM32 Nucleo-F446RE', 'UART · pyserial', 'PWM control'] },
  ],

  /** Areas named on the about page; each maps to repositories below. */
  focus: [
    {
      code: 'ML',
      title: 'Intelligent systems',
      body: 'Classifiers, forecasters and retrieval pipelines, evaluated against baselines and published with their caveats.',
    },
    {
      code: 'FS',
      title: 'Full-stack products',
      body: 'FastAPI, Express and React applications with real auth, persistence, concurrency control and tests.',
    },
    {
      code: 'SEC',
      title: 'Security engineering',
      body: 'Bot detection, honeypot analysis and image forensics, with threat models and measured failure cases.',
    },
    {
      code: 'EDGE',
      title: 'Edge & embedded',
      body: 'Host-side forecasting that drives an STM32 microcontroller over UART to control a cooling fan.',
    },
  ],

  projects: [
    {
      slug: 'routefusion',
      title: 'RouteFusion',
      kind: 'Personal project',
      category: 'Full-stack · Optimisation',
      status: 'Live demo',
      period: 'Jul – Sep 2026',
      summary:
        'Combines a passenger ride and a parcel delivery into one trip, using a from-scratch Hungarian (Kuhn–Munkres) assignment solver and explaining every recommendation.',
      stack: [
        'FastAPI',
        'SQLAlchemy 2.0',
        'React',
        'TypeScript',
        'Vite',
        'Tailwind CSS',
        'PostgreSQL / SQLite',
        'JWT',
      ],
      illustration: 'city',
      repoUrl: `${GH}/RouteFusion`,
      liveUrl: 'https://route-fusion.vercel.app',
      overview:
        'A captain (driver) sees one recommendation — accept both, accept just the ride, accept just the parcel, or reject — together with the constraints that passed or failed. The back end decides with an optimal-assignment algorithm rather than a heuristic score.',
      problem:
        'A driver carrying a passenger often passes parcel pickups. Bundling the two saves distance only if the detour is small, the passenger is not delayed, and two drivers cannot claim the same job at the same moment.',
      whyItMatters:
        'Matching drivers to rides and parcels is a three-dimensional assignment problem, NP-hard in general. A dispatcher still has to answer quickly, explain itself, and stay correct under concurrent accepts.',
      goals: [
        'Recommend accept-both only when it is genuinely efficient, and show why.',
        'Use an exact assignment algorithm where the problem allows one.',
        'Guarantee that only one captain can win a contested ride or parcel.',
      ],
      constraints: [
        'Demo-first: runs with no external database (transient in-memory SQLite); PostgreSQL is supported for persistence.',
        'Thresholds are defined once in the back end and sent to the UI, which never recomputes them.',
      ],
      contribution:
        'Sole author: data model, two-stage assignment engine, concurrency control, REST API, React front end and the architecture documentation.',
      architecture: {
        summary:
          'Monorepo: a React + Vite SPA and a FastAPI back end over a JSON REST API with JWT auth (access, refresh and a revocation blacklist).',
        flow: [
          'React pages talk only to one shared RouteFusionContext',
          'FastAPI routes: auth · ride · parcel · captain · dashboard · demo',
          'Services: assignment_engine · hungarian · spatial_grid · route_optimizer · concurrency · pricing',
          'SQLite (in-memory by default) or PostgreSQL via SQLAlchemy 2.0 + Alembic',
        ],
      },
      implementation: [
        {
          title: 'Two-stage Hungarian assignment',
          body: 'The driver × ride × parcel problem is split into two 2-D problems, each solved optimally by a hand-written O(n³) Kuhn–Munkres implementation: drivers × rides by haversine pickup distance, then (driver, ride) × parcels by the cheapest extra distance over the six valid stop orderings.',
        },
        {
          title: 'Explainable accept-both rule',
          body: 'Accept-both requires efficiency ≥ 75, extra time ≤ 12 minutes and passenger delay ≤ 3 km; otherwise the optimizer considers passenger-first or parcel-first (≥ 55%) or rejects. Every constraint is returned with its actual value and pass/fail state.',
        },
        {
          title: 'Optimistic locking',
          body: "Claims use a conditional UPDATE … WHERE status='open' AND version=n. Zero rows affected returns 409 instead of double-booking, and accept-both rolls back the ride claim if the parcel claim fails.",
        },
        {
          title: 'Per-captain broadcast',
          body: "Each captain's recommendation is computed independently (nearest suitable ride within 15 km, then the cheapest parcel to bundle), so several captains can be offered the same job; the fleet-wide Hungarian solve powers the dashboard's optimal-vs-greedy analytics.",
        },
      ],
      decisions: [
        {
          decision: 'Decompose into two sequential optimal assignments.',
          because:
            'Each stage stays exact and tractable; the README documents that the result is optimal within each stage but not guaranteed globally optimal.',
        },
        {
          decision: 'Optimistic locking with a version column instead of SELECT … FOR UPDATE.',
          because:
            'It needs only an atomic conditional update, so it behaves the same on SQLite and PostgreSQL.',
        },
        {
          decision: 'Spatial-grid pruning is reported, not enforced.',
          because:
            'At the demo cap of 200 candidates an exhaustive cost matrix is cheap, and excluding candidates could silently miss the optimum.',
        },
      ],
      challenges: [
        'Mixed-decision races, e.g. one captain accepting a bundle while another accepts the same parcel alone.',
        "Thread safety of one shared in-memory SQLite connection under FastAPI's thread pool, solved by serialising sessions behind a lock on SQLite only.",
      ],
      currentStatus:
        'Deployed as a public demo. A /demo/stress/concurrency endpoint fires simultaneous accepts at one ride and reports one success and N conflicts.',
      facts: [
        {
          label: 'Accept-both thresholds',
          value: '≥75 · ≤12 min · ≤3 km',
          source: 'README.md · Core workflows',
        },
        { label: 'Pickup suitability cap', value: '15 km', source: 'README.md · System design' },
        { label: 'Stop orderings evaluated', value: '6', source: 'README.md · System design' },
      ],
      limitations: [
        'The two-stage decomposition is not guaranteed to be globally optimal.',
        'Runs on seeded demo data (named captains around Vellore), not real fleet traffic; no production performance is claimed.',
      ],
      learned: [
        'Separating "what one driver sees" from "what an optimal fleet would do" kept both the UX and the analytics honest.',
        'Concurrency fixes are easiest to trust when the app can stress-test itself on demand.',
      ],
    },
    {
      slug: 'threatlens-ai',
      title: 'ThreatLensAI',
      kind: 'Personal project',
      category: 'Security · Machine learning',
      status: 'Live demo',
      period: 'Jun – Sep 2026',
      summary:
        'Bot-detection and threat-intelligence platform that scores logins with a rule engine and a trained classifier side by side — and publishes its own measured evasion rate.',
      stack: [
        'Node.js',
        'Express',
        'scikit-learn',
        'XGBoost',
        'SHAP',
        'Gemini API',
        'PostgreSQL',
        'Docker Compose',
        'Jest',
      ],
      illustration: 'radar',
      repoUrl: `${GH}/ThreatlensAI`,
      liveUrl: 'https://threatlensai-atzs.onrender.com/',
      overview:
        'Detects suspicious login activity from timing, typing, mouse and browser-fingerprint signals, applies an adaptive response (allow, CAPTCHA, OTP or block), and writes an analyst-style report.',
      problem:
        'Automated logins from Selenium, Playwright and Puppeteer look human at the HTTP level. A binary allow/deny check either blocks real people or lets scripted sessions through.',
      whyItMatters:
        'Credential stuffing and scripted sign-ups are routine; a useful detector has to explain its score and be honest about how easily it can be evaded.',
      goals: [
        'Score each session 0–100 with a threat level and explainability signals.',
        'Compare a hand-written rule engine with a trained model instead of silently swapping one for the other.',
        'Measure evasion with real automation tools and publish the result.',
      ],
      constraints: [
        'No real user data was available, so human sessions are synthetic — disclosed in ml/README.md.',
        'Must keep working when the Gemini key or the ML service is unavailable (local fallback report).',
      ],
      contribution:
        'Sole author: rule engine, ML pipeline, adaptive response, Gemini analyst layer with an evidence guardrail, STRIDE threat model, tests, CI and Docker setup.',
      architecture: {
        summary:
          'Express back end with a rule-based scorer; an optional Python ml/serve.py service returns a second score; Docker Compose wires the app to PostgreSQL and the ML service.',
        flow: [
          'Browser telemetry: timing, typing cadence, mouse movement, WebDriver markers',
          'Rule engine (weighted heuristics) ‖ ML scorer (logistic regression / XGBoost)',
          'Adaptive response: ALLOW_ACCESS · SHOW_CAPTCHA · REQUIRE_OTP · BLOCK_SESSION',
          'Gemini analyst report with an evidence guardrail, or a local fallback template',
        ],
      },
      implementation: [
        {
          title: 'Signals',
          body: 'WebDriver and headless markers, automation-framework fingerprints, suspicious user agents, mouse-movement scarcity, rapid submission timing, typing cadence and honeypot-trap interactions.',
        },
        {
          title: 'Rule engine vs. trained model',
          body: 'A logistic-regression baseline and an XGBoost classifier trained with a stratified split and SHAP artifacts; both scores appear side by side in the analyst panel and the session log.',
        },
        {
          title: 'LLM evaluation harness',
          body: 'An automated rubric checks generated threat reports and flags claims that reference signals not present in the input; runs that only exercised the fallback template are disclosed as such.',
        },
        {
          title: 'Adversarial test',
          body: 'Real Selenium, Playwright and Puppeteer sessions, plus puppeteer-extra-plugin-stealth to measure how often a public evasion tool gets through.',
        },
      ],
      decisions: [
        {
          decision: 'Keep the rule engine and the ML model side by side.',
          because:
            'A documented comparison is more useful than a swap when the training data is small and partly synthetic.',
        },
        {
          decision: 'Publish the bad number.',
          because: 'ADVERSARIAL_TEST.md reports the measured stealth-evasion rate instead of hiding it.',
        },
      ],
      challenges: [
        'A perfect score on a small, easily separable dataset proves little; METRICS.md carries that caveat.',
        'Keeping the threat model current: admin authentication was built and later removed for local-demo convenience, and THREAT_MODEL.md says so.',
      ],
      currentStatus:
        'Deployed as a public demo on Render. The admin dashboard is currently not behind authentication, as documented in THREAT_MODEL.md.',
      facts: [
        { label: 'Stealth-plugin evasion rate', value: '50% (4 of 8)', source: 'ADVERSARIAL_TEST.md' },
        { label: 'ML evaluation dataset', value: '105 sessions', source: 'METRICS.md' },
        {
          label: 'Held-out precision / recall',
          value: '1.000 (small, separable data)',
          source: 'METRICS.md',
        },
      ],
      limitations: [
        'Human sessions are synthetic; scores on 105 sessions do not predict real-world accuracy.',
        'Half of the stealth-plugin sessions evaded detection in the adversarial test.',
        'Admin authentication is currently removed.',
      ],
      learned: [
        'An evaluation harness is part of an LLM feature, not an afterthought.',
        'Red-teaming your own detector produces the number that actually matters.',
      ],
    },
    {
      slug: 'imageguard',
      title: 'ImageGuard',
      kind: 'Personal project',
      category: 'Computer vision · Security',
      status: 'Working prototype',
      period: 'Oct 2026',
      summary:
        'Image-integrity platform: classical forgery screening (ORB copy-move, Error Level Analysis, wavelet noise residuals) plus visible and invisible DCT watermarking with HMAC-signed payloads.',
      stack: [
        'FastAPI',
        'OpenCV',
        'PyWavelets',
        'NumPy',
        'React',
        'TypeScript',
        'Vite',
        'Tailwind CSS',
        'Pytest',
        'Vitest',
      ],
      illustration: 'fracture',
      repoUrl: `${GH}/Image_Guard`,
      overview:
        'A forgery-detection suite and a watermark studio in one app. Detection highlights candidate regions for a person to review; watermarking embeds provenance that can be verified later.',
      problem:
        'Copy-move and splicing edits are easy to make and hard to spot, and ownership metadata disappears the moment an image is re-saved.',
      whyItMatters:
        'Screening tools tell an analyst where to look, and a signed, embedded payload survives where EXIF metadata does not.',
      goals: [
        'Detect cloned regions within one image and spliced regions from another source.',
        'Embed and verify an invisible, signed provenance payload.',
        'Be explicit that results are screening indicators, not forensic proof.',
      ],
      constraints: [
        'Classical computer vision only — no trained forgery model — so every result is explainable.',
        'Upload limits of 10 MB and 16 MP, enforced before processing.',
      ],
      contribution:
        'Sole author: detection services, watermarking services, REST API, React front end, evaluation scripts and tests.',
      architecture: {
        summary:
          'Stateless FastAPI back end with an in-memory LRU artifact store; React + TypeScript SPA with detection, watermark and how-it-works pages.',
        flow: [
          'Upload → payload and dimension validation',
          'Copy-move: ORB → Hamming matching → DBSCAN clustering → affine RANSAC',
          'Splicing: JPEG ELA (q=95) + db2 wavelet noise residuals (MAD z-scores)',
          'Watermarks: visible compositing, or 8×8 DCT-QIM embedding signed with HMAC-SHA256',
        ],
      },
      implementation: [
        {
          title: 'Copy-move detection',
          body: 'ORB keypoints matched as mutual nearest neighbours, background textures filtered, clusters segmented with DBSCAN, and affine RANSAC used to discard spurious matches from repetitive textures.',
        },
        {
          title: 'Splicing screening',
          body: 'Error Level Analysis re-compresses at JPEG quality 95 and compares per channel; Daubechies (db2) wavelet residuals estimate local noise variance to reveal regions with a different sensor-noise footprint.',
        },
        {
          title: 'Invisible watermark',
          body: 'Owner ID, asset ID, permissions and a timestamp are signed with HMAC-SHA256 and embedded into mid-frequency luminance DCT coefficients with quantisation index modulation; verification reports PSNR, SSIM, NCC and bit-error rate.',
        },
      ],
      decisions: [
        {
          decision: 'Report clean / inconclusive / candidate regions found.',
          because:
            'Heuristics produce indicators; a three-state result avoids implying certainty the methods cannot give.',
        },
        {
          decision: 'Sign the embedded payload.',
          because:
            'A CRC detects corruption, but only an HMAC shows the payload was written by the key holder.',
        },
      ],
      challenges: [
        'Repetitive textures such as foliage and windows produce false copy-move matches; geometric consistency checks filter most of them.',
        'Balancing watermark robustness against visual quality, tracked with PSNR and SSIM.',
      ],
      currentStatus:
        'Runs locally via the backend and frontend scripts; deployment configuration (render.yaml, vercel.json) is in the repository, with no public demo yet.',
      facts: [],
      limitations: [
        'The README carries an explicit forensic disclaimer: outputs are screening indicators, not evidence.',
        'Evaluation uses synthetic manipulations rather than a standard forensic benchmark.',
      ],
      learned: [
        'Writing the disclaimer first shaped every API response that followed.',
        'Classical pipelines are easy to explain because every stage produces an inspectable intermediate image.',
      ],
    },
    {
      slug: 'visionrag-x',
      title: 'VisionRAG-X',
      kind: 'Research prototype',
      category: 'AI / ML · Retrieval',
      status: 'Research prototype',
      period: 'Aug – Oct 2026',
      summary:
        'Conflict-aware multimodal retrieval for lecture videos: aligns speech, slide text, formulas and code, detects when they disagree, and abstains when the evidence is insufficient.',
      stack: ['Python', 'FastAPI', 'React', 'BM25', 'Vector search', 'Graph retrieval'],
      illustration: 'frames',
      repoUrl: `${GH}/visionRag`,
      overview:
        "An end-to-end RAG framework for educational videos that keeps each modality's provenance, detects speech-versus-slide contradictions, tracks corrections over time, and cites seekable timestamps.",
      problem:
        'Standard RAG flattens a lecture into a transcript: it ignores equations and code on slides, misses when the speaker contradicts the slide, and presents a corrected statement as if it were still true.',
      whyItMatters:
        'Students search lectures for exact answers; a confident wrong answer with no timestamp is worse than no answer.',
      goals: [
        'Keep independent provenance for speech, slide text, formulas, code and visual scenes.',
        'Flag cross-modal conflicts and resolve superseded claims at retrieval time.',
        'Abstain on unanswerable questions instead of hallucinating.',
      ],
      constraints: [
        "Research prototype: evaluation runs on the project's own reproducible set, not a public leaderboard.",
      ],
      contribution: 'Sole author of the framework, back end, front end and evaluation scripts.',
      architecture: {
        summary:
          'FastAPI back end with modality extractors, a conflict detector and a knowledge-evolution graph; React front end with seekable citations.',
        flow: [
          'Ingest: speech (ASR), slide OCR, formulas, code, visual scenes — time-aligned',
          'Cross-modal conflict detector over sliding temporal windows',
          'Versioned knowledge-evolution graph for supersession and errata',
          'Strategy router: semantic · BM25 · graph walk · temporal · hybrid',
          'Evidence-sufficiency gate → cited answer or abstention',
        ],
      },
      implementation: [
        {
          title: 'Conflict detection',
          body: 'Compares spoken and on-slide statements within sliding time windows and marks disagreements it cannot resolve as explicit unresolved conflicts.',
        },
        {
          title: 'Knowledge-evolution graph',
          body: 'A directed multigraph records which claims supersede which, so a later correction wins at retrieval time.',
        },
        {
          title: 'Anti-hallucination gate',
          body: 'Checks evidence sufficiency with stemmed token overlap and timestamp bounds before answering, and returns citations that seek to the moment in the video.',
        },
      ],
      decisions: [
        {
          decision: 'Route each query to a retrieval strategy.',
          because:
            'Exact-term questions, "when did they say" questions and conceptual questions need different retrievers.',
        },
      ],
      challenges: ['Aligning modalities that arrive at different granularities: words, slides and scenes.'],
      currentStatus:
        'Research prototype with backend and frontend test suites and a reproducible evaluation script.',
      facts: [],
      limitations: [
        'Query-to-strategy classification is heuristic.',
        "Results come from the project's own evaluation set; the README lists threats to validity.",
      ],
      learned: [
        'Abstaining is a feature: the evidence gate makes the system more trustworthy than a higher answer rate would.',
      ],
    },
    {
      slug: 'honeypot-attack-classification',
      title: 'Honeypot Attack Classifier',
      kind: 'Engineering project',
      category: 'Security · Data pipeline',
      status: 'Working prototype',
      period: 'Sep – Oct 2026',
      summary:
        'Turns Cowrie SSH/Telnet honeypot logs into sessions, tags them with MITRE ATT&CK techniques, and produces a dashboard, Sigma rule drafts and an IoC feed.',
      stack: ['Python', 'Pandas', 'scikit-learn', 'TF-IDF', 'SQLite', 'Parquet', 'Streamlit', 'Sigma'],
      illustration: 'network',
      repoUrl: `${GH}/Honeypot-Attack-Classification`,
      overview:
        'An end-to-end pipeline from raw honeypot events to analyst- and SIEM-facing output, with a deterministic rule engine and an optional ML classifier that falls back to rules when it is not confident.',
      problem:
        'A honeypot produces thousands of interleaved JSON events. Analysts need sessions, techniques and indicators, not raw lines.',
      whyItMatters:
        'Mapping attacker behaviour to ATT&CK techniques and exporting detections turns a research honeypot into something a security team can use.',
      goals: [
        'Group events into sessions robustly despite malformed lines, terminal escapes and duplicates.',
        'Tag ATT&CK techniques with rules, and with ML when confidence is high enough.',
        'Export Sigma drafts and an IoC CSV of IPs, URLs and SHA-256 hashes.',
      ],
      constraints: [
        'The bundled log file is synthetic; a real honeypot must run on an isolated network.',
        'No human-labelled ground truth yet, so the bootstrapped model is a smoke-test model.',
      ],
      contribution:
        'Sole author: ETL, rule catalogue, feature extraction, training pipeline, dashboard, deployment and log-shipping scripts.',
      architecture: {
        summary:
          'Batch pipeline (run_pipeline.py) writing to SQLite and Parquet, read by a Streamlit dashboard.',
        flow: [
          'Cowrie JSON logs → rsync or Filebeat shipping',
          'ETL: group by session, strip escapes, dedupe consecutive commands',
          'Rule engine (regex + login-attempt rules) ‖ ML (flags + metrics + TF-IDF → Random Forest / calibrated SVM)',
          'Confidence threshold → ML prediction or per-session rule fallback',
          'SQLite / Parquet → Streamlit dashboard, Sigma drafts, IoC feed',
        ],
      },
      implementation: [
        {
          title: 'Rules as the baseline',
          body: 'Brute force (T1110) is emitted at three or more login attempts; command techniques come from a regex catalogue.',
        },
        {
          title: 'Features',
          body: 'Boolean critical-command flags, session metrics and word-level TF-IDF unigrams and bigrams; the fitted vectoriser is persisted so inference uses the same columns.',
        },
        {
          title: 'Detections',
          body: 'Techniques repeated across a minimum number of sessions become experimental Sigma rules; source IPs, download URLs and hashes become an IoC CSV.',
        },
      ],
      decisions: [
        {
          decision: 'Fall back to rules per session below a confidence threshold.',
          because:
            'Without labelled data the model cannot be trusted alone; rules stay deterministic and auditable.',
        },
      ],
      challenges: [
        'Interleaved events from concurrent sessions and noisy terminal output inside captured commands.',
      ],
      currentStatus:
        'Runs end to end on bundled synthetic logs; deployment and log-shipping files for a real, isolated honeypot are included.',
      facts: [],
      limitations: [
        'Sample data is synthetic and suitable for tests and smoke runs only.',
        'The ML model is bootstrapped from rule output until real sessions are human-labelled.',
      ],
      learned: ['Designing the labelling workflow early matters more than the choice of classifier.'],
    },
    {
      slug: 'edge-ai-thermal-management',
      title: 'Edge AI Thermal Management',
      kind: 'Academic project',
      category: 'Embedded · Machine learning',
      status: 'Working prototype',
      period: 'Oct 2026',
      summary:
        'Forecasts laptop CPU temperature five seconds ahead from ten seconds of history and sends the result over UART to an STM32 Nucleo-F446RE that drives a cooling fan with PWM.',
      stack: ['Python', 'scikit-learn', 'Pandas', 'pyserial', 'STM32 Nucleo-F446RE', 'UART', 'HWiNFO'],
      illustration: 'board',
      repoUrl: `${GH}/EdgeAiThermalManagementUsingStm32`,
      overview:
        'A predictive thermal controller: telemetry is sampled at about 1 Hz, an Extra Trees regressor forecasts the temperature 5 s ahead, and the host sends a control packet to the microcontroller.',
      problem:
        'Reactive fan control responds only after the temperature crosses a threshold, causing thermal lag and fan hunting under bursty workloads.',
      whyItMatters: 'Acting a few seconds early can smooth fan behaviour and avoid temperature spikes.',
      goals: [
        'Forecast CPU temperature 5 s ahead from temperature and usage history.',
        'Evaluate without temporal leakage.',
        'Drive a real fan from the forecast through an STM32 board.',
      ],
      constraints: [
        'Inference runs on the host PC, not on the STM32; the microcontroller is the real-time actuator.',
        'The embedded firmware source (UART parser, PWM timer, watchdog) is not in the repository.',
      ],
      contribution:
        'Sole author: data cleaning, training and evaluation scripts, live prediction and the UART bridge.',
      architecture: {
        summary:
          'Host-side Python pipeline with a USB-UART link (115200 baud, 8-N-1) to the microcontroller.',
        flow: [
          'HWiNFO telemetry at ~1 Hz: CPU Tctl/Tdie + core usage',
          '10-sample window → Extra Trees regressor (n=300) → temperature at t + 5 s',
          'Fan duty cycle from thresholds with hysteresis',
          'UART packet → STM32 Nucleo-F446RE → timer PWM → fan',
        ],
      },
      implementation: [
        {
          title: 'Leakage-safe split',
          body: "Chronological 70/15/15 split inside each workload session with a 15-sample guard gap at every boundary; since a window spans 14 s, no input window overlaps another split's targets.",
        },
        {
          title: 'Model selection on validation only',
          body: 'Candidates were compared on the validation set, where the tuned Extra Trees model beat the persistence baseline (MAE 0.96 °C vs 1.04 °C).',
        },
        {
          title: 'Live bridge',
          body: 'live_uart.py separates live hardware mode from simulation, supports a dry run, and refuses to resend stale sensor readings.',
        },
      ],
      decisions: [
        {
          decision: 'Report the unseen test result even though the baseline won.',
          because:
            "On the test set the model's MAE (1.36 °C) was higher than the latest-temperature baseline (1.26 °C); the training summary records this.",
        },
      ],
      challenges: [
        'Idle sessions are dominated by persistence: the latest reading is already an excellent predictor.',
        'A sudden idle-temperature jump in the raw data needed its own diagnosis script.',
      ],
      currentStatus:
        'Host pipeline, model and UART bridge are complete; the embedded firmware is flashed separately and is not part of the repository.',
      facts: [
        {
          label: 'Cleaned samples across gaming / normal / idle',
          value: '8,870',
          source: 'training_summary.txt',
        },
        {
          label: 'Test MAE — model vs. persistence',
          value: '1.36 °C vs 1.26 °C',
          source: 'training_summary.txt',
        },
        { label: 'Forecast horizon', value: '5 s', source: 'outputs/model_metadata.json' },
      ],
      limitations: [
        'On unseen test data the model does not beat the simple persistence baseline overall.',
        'Data comes from a single laptop, so results may not transfer to other hardware.',
      ],
      learned: ['Always compare against the simplest possible baseline — here it was hard to beat.'],
    },
    {
      slug: 'greenhouse-microclimate-forecasting',
      title: 'Greenhouse Microclimate Forecasting',
      kind: 'Academic project',
      category: 'AI / ML · Forecasting',
      status: 'Live demo',
      period: 'Mar – Jul 2026',
      summary:
        'Forecasts greenhouse temperature from historical CSV data with a GRU and three classical models, combines them by inverse-RMSE weighting, and simulates fan and spray control.',
      stack: ['Python', 'PyTorch (GRU)', 'scikit-learn', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn'],
      illustration: 'greenhouse',
      repoUrl: `${GH}/GreenHouseMicroClimateForcastingModel`,
      liveUrl: 'https://green-house-micro-climate-forcastin.vercel.app',
      overview:
        'A software-only forecasting framework: data management, parallel models, an ensemble coordinator, threshold-based control simulation and a reporting dashboard.',
      problem:
        'Greenhouse climate control is reactive; a forecast lets fans or sprays act before temperatures leave the comfortable range.',
      whyItMatters: 'Crops are sensitive to temperature excursions, and earlier action can reduce them.',
      goals: [
        'Forecast temperature per crop type (SA, SB, SC, TA, TB, TC).',
        'Weight models by their measured error.',
        'Generate an actuator timeline from the forecast.',
      ],
      constraints: [
        'Software-side only: CSV data and simulated actuation, no live sensors.',
        'Aligned with a published reference paper (DOI 10.1038/s41598-025-15615-3).',
      ],
      contribution: 'Sole author of the pipeline, models, ensemble, control simulation and dashboard.',
      architecture: {
        summary: 'Five modules from ingestion to reporting.',
        flow: [
          'Data management: CSV ingest, cleaning, scaling, sliding-window sequences',
          'Parallel models: Linear Regression · Random Forest · Gradient Boosting · GRU (PyTorch, 50 units)',
          'Ensemble: weight = 1 / RMSE, normalised across models',
          'Control simulation: below 18 °C fan on, above 28 °C spray on, otherwise off',
          'Dashboard, comparison charts and CSV / JSON exports',
        ],
      },
      implementation: [
        {
          title: 'Inverse-RMSE ensemble',
          body: "Each model's weight is the reciprocal of its RMSE, normalised across models, so the most accurate model dominates without discarding the others.",
        },
        {
          title: 'LSTM → GRU',
          body: 'The primary network moved from LSTM to a 50-unit GRU in March 2026 to reduce computational cost.',
        },
      ],
      decisions: [
        {
          decision: 'Keep a linear-regression baseline in the comparison.',
          because: 'It shows whether the neural model is adding anything.',
        },
      ],
      challenges: ['Building sequences per crop type without leaking future values across windows.'],
      currentStatus: 'Complete as a software-side system, with a public dashboard demo.',
      facts: [],
      limitations: [
        'Control actions are simulated from thresholds; no actuators or live sensors are connected.',
        'Historical CSV data only.',
      ],
      learned: [
        'Weighted ensembles are a simple, explainable way to combine models with different strengths.',
      ],
    },
    {
      slug: 'smart-document-intelligence',
      title: 'Smart Document Intelligence',
      kind: 'Personal project',
      category: 'AI / ML · Privacy',
      status: 'Working prototype',
      period: 'Feb – Apr 2026',
      summary:
        'Local-only document analysis: upload PDF, DOCX, text or images; extract entities, summarise, compare versions and export — with a local LLM through Ollama and no cloud APIs.',
      stack: ['FastAPI', 'SQLite', 'React', 'Vite', 'Ollama (llama3.2)'],
      illustration: 'sheets',
      repoUrl: `${GH}/Smart-Document-Intelligence`,
      overview:
        'A privacy-first document workspace. Files stay on disk, metadata and analyses stay in a local SQLite database, and inference runs on a local Ollama endpoint.',
      problem:
        'Summarising sensitive documents with cloud AI services sends their contents to a third party.',
      whyItMatters:
        'Offer letters, contracts and records are exactly the documents people should not upload anywhere.',
      goals: [
        'Analyse and summarise documents without any external API.',
        'Summaries at three levels: brief, detailed and bullets.',
        'Compare document versions and export structured data.',
      ],
      constraints: [
        'Everything runs locally and requires Ollama on the same machine.',
        'Document chat, templates, workflows and notifications were deliberately removed from scope.',
      ],
      contribution:
        'Sole author of the FastAPI back end, the parsing and analysis pipeline, and the React workspace.',
      architecture: {
        summary:
          'React + Vite front end; FastAPI back end with SQLite; local Ollama for language and vision models.',
        flow: [
          'Upload (PDF, DOCX, TXT, PNG, JPG) → local file store',
          'Parser → extracted text',
          'Intelligence engine → Ollama → entities + summary, cached in SQLite',
          'Workspace: summary, compare (similarity %), export (JSON / CSV / Markdown report)',
        ],
      },
      implementation: [
        {
          title: 'Cached summaries',
          body: 'Summaries are generated on request at the chosen level and cached in SQLite, so repeat views do not call the model again.',
        },
        {
          title: 'Version comparison',
          body: 'A compare endpoint returns a similarity percentage between document versions, shown in the compare panel.',
        },
      ],
      decisions: [
        {
          decision: 'Cut document chat and workflows from scope.',
          because: 'A smaller, finished feature set was more useful than many partial ones.',
        },
      ],
      challenges: [
        'Local model setup issues (port conflicts, Apple MLX loading), documented in the troubleshooting guide.',
      ],
      currentStatus:
        'Runs locally with the back end, Ollama and front end started separately; no hosted demo, by design.',
      facts: [],
      limitations: ['Output quality depends on the local model; no accuracy evaluation is published.'],
      learned: ['Scoping down is a design decision worth writing into the README.'],
    },
    {
      slug: 'stockmind',
      title: 'StockMind',
      kind: 'Personal project',
      category: 'Full-stack · Vision · Optimisation',
      status: 'In development',
      period: 'Nov 2026',
      summary:
        'Warehouse inventory platform combining YOLOv8 shelf auditing, demand forecasting, EOQ-based replenishment and an OR-Tools linear program for inter-warehouse transfers.',
      stack: [
        'FastAPI',
        'PostgreSQL',
        'React',
        'TypeScript',
        'YOLOv8',
        'OpenCV',
        'XGBoost',
        'Google OR-Tools',
      ],
      illustration: 'racks',
      repoUrl: `${GH}/StockMind`,
      overview:
        'Brings shelf images, demand history and stock ledgers into one system that flags discrepancies and suggests reorders and transfers.',
      problem: 'Manual counts and reactive reorder rules lead to ghost inventory and stock-outs.',
      whyItMatters:
        'Inventory errors compound across warehouses; catching them early avoids both shortages and over-ordering.',
      goals: [
        'Count stock from rack images and reconcile against the ledger.',
        'Forecast demand against simple baselines.',
        'Optimise transfers between warehouses as a minimum-cost flow problem.',
      ],
      constraints: [
        "Started in November 2026; results in the README come from the project's own experiments.",
      ],
      contribution:
        'My own repository, built end to end: the FastAPI service and data model, the vision, forecasting and optimisation modules, and the React front end.',
      architecture: {
        summary:
          'FastAPI service layer with JWT and role-based access, a PostgreSQL ledger and a React front end.',
        flow: [
          'Vision: YOLOv8n + OpenCV rack-tier segmentation → SKU counts',
          'Discrepancy reconciliation with human sign-off',
          'Forecasting: seasonal naive vs. Random Forest vs. XGBoost',
          'Replenishment: Wilson EOQ + dynamic reorder point',
          'Network optimisation: OR-Tools GLOP minimum-cost flow',
        ],
      },
      implementation: [
        {
          title: 'Minimum-cost flow transfers',
          body: 'Regional deficits are resolved by a linear program, solved with OR-Tools GLOP, that prefers inter-hub transfers to new procurement when they are cheaper.',
        },
        {
          title: 'Audit with sign-off',
          body: 'Vision counts that disagree with the ledger are flagged with confidence-aware filtering and need a person to confirm them.',
        },
      ],
      decisions: [
        {
          decision: 'Benchmark forecasting against seasonal naive.',
          because: 'A learned model has to beat the obvious baseline to justify itself.',
        },
      ],
      challenges: ['Combining vision, forecasting and optimisation outputs into one consistent ledger.'],
      currentStatus: 'In active development; a prototype, not a deployed product.',
      facts: [],
      limitations: [
        "Experiments use the project's own data; there is no deployment or real warehouse usage.",
      ],
      learned: ['Optimisation only becomes useful once its inputs — counts and forecasts — are trustworthy.'],
    },
  ] as ProjectItem[],

  /** Smaller or earlier repositories, linked without case studies. */
  archive: [
    {
      name: 'Ticket Booking System',
      description:
        'Seat holds with automatic expiry, FIFO waitlist offers, QR tickets and live seat maps over WebSockets. Payments are mocked.',
      stack: 'Python · WebSockets · JWT',
      url: `${GH}/Tickbooking`,
      liveUrl: 'https://tickbooking-13s574d7i-abhis-projects-4750c1f6.vercel.app/',
    },
    {
      name: 'Secure Messaging — Signal-inspired clone',
      description:
        'Educational full-stack messaging app with contacts, direct and group chats. It does not implement the Signal Protocol, and says so.',
      stack: 'Next.js · FastAPI · SQLAlchemy',
      url: `${GH}/SignalAppClone`,
      liveUrl: 'https://signal-app-clone.vercel.app',
    },
    {
      name: 'GreenTwin AI',
      description:
        'Greenhouse digital twin driven by live or simulated weather and heat-transfer equations, predicting 10 minutes to 2 hours ahead.',
      stack: 'Python · Weather APIs',
      url: `${GH}/GreenTwin`,
      liveUrl: 'https://green-twin-25eo.vercel.app',
    },
    {
      name: 'Regret Forecaster',
      description:
        'Next.js app that streams a structured analysis of a decision and the cognitive biases involved.',
      stack: 'Next.js · Supabase · LLM APIs',
      url: `${GH}/RegretForecaster`,
      liveUrl: 'https://regret-forecaster.vercel.app',
    },
    {
      name: 'AI-Assisted Access Policy Management',
      description:
        'AI recommends access policies, a person must approve them, and files are encrypted before storage.',
      stack: 'JavaScript · Node.js',
      url: `${GH}/AI-AssistedPolicyManagementSystem`,
    },
    {
      name: 'ShadowHunter',
      description: 'Python tool that discovers and monitors devices on a local network using Scapy.',
      stack: 'Python · Scapy',
      url: `${GH}/ShadowHunter-Network-Monitoring-Tool`,
    },
  ] as ArchiveRepo[],

  journey: [
    {
      period: '2023 – 2027 (expected)',
      title: 'B.Tech, Computer Science',
      org: 'Vellore Institute of Technology, Vellore',
      description:
        'Coursework and projects across machine learning, software engineering, security and embedded systems.',
    },
    {
      period: 'Certification',
      title: 'Generative AI Engineering Professional Certificate',
      org: 'IBM',
      description: 'Large language models, retrieval-augmented generation and model deployment.',
    },
  ] as TimelineEntry[],

  chatSuggestions: [
    'What does RouteFusion do?',
    'Which projects use machine learning?',
    "What are ThreatLensAI's limitations?",
    'How can I contact you?',
  ],
};

export type SiteConfig = typeof SITE_CONFIG;

export const getProject = (slug: string) => SITE_CONFIG.projects.find((p) => p.slug === slug);
