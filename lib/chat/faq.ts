import { SITE_CONFIG } from '@/data/content';
import type { ChatSource } from './protocol';

/** Canned answers used when no API key is configured (or the API is down). Grounded in content.ts. */
interface FaqEntry {
  match: RegExp;
  answer: () => string;
  sources: ChatSource[];
}

const c = SITE_CONFIG;
const featured = c.projects.filter((p) => p.featured);
const project = (slug: string) => c.projects.find((p) => p.slug === slug)!;
const src = (slug: string): ChatSource => ({ title: project(slug).title, href: `/work/${slug}` });

const FAQ: FaqEntry[] = [
  {
    match: /avail|hire|hiring|role|job|open to|start|freelance|full[- ]?time/i,
    answer: () =>
      `${c.shortName} is ${c.status.toLowerCase()} ${c.availability}, focused on product design and design engineering roles. The quickest route is ${c.email} or the form on the contact page; the résumé is at /resume.pdf.`,
    sources: [{ title: 'Contact', href: '/contact' }],
  },
  {
    match: /process|approach|how (do|does) (you|he)|method|workflow/i,
    answer: () =>
      `${c.shortName} works in six steps: ${c.processSteps.map((s) => s.title.toLowerCase()).join(', ')}. Each step ends in a concrete artifact — for example a coded prototype on a shareable URL before anything is final.`,
    sources: [src('routefusion')],
  },
  {
    match: /3d|three|webgl|shader|glsl|r3f|creative/i,
    answer: () =>
      `The strongest 3D work is Kinetic Craft (a physics-driven identity with a 180 kB WebGL hero), the ThreatLens analyst radar, and this site's own hero and GLSL Flow Field Gradient in the playground.`,
    sources: [src('kinetic-craft'), { title: 'Flow Field Gradient', href: '/playground/flow-gradient' }],
  },
  {
    match: /routefusion|dispatch|logistic|hungarian/i,
    answer: () =>
      `On RouteFusion ${c.shortName} was ${project('routefusion').role.toLowerCase()}. ${project('routefusion').solution}`,
    sources: [src('routefusion')],
  },
  {
    match: /threatlens|bot|captcha|security/i,
    answer: () =>
      `ThreatLens AI is ${project('threatlens-ai').tagline.toLowerCase()} ${project('threatlens-ai').solution}`,
    sources: [src('threatlens-ai')],
  },
  {
    match: /design system|token|lumina/i,
    answer: () =>
      `Lumina Tokens turns Figma variables into CSS, Swift and Compose themes with a CI contrast gate; Aura Flora uses comfort-band colour tokens. Both case studies include an interactive token inspector.`,
    sources: [src('lumina-design-system'), src('greenhouse-telemetry')],
  },
  {
    match: /tool|stack|tech|figma|react|next/i,
    answer: () =>
      `Core toolkit: ${c.tools.map((t) => t.name).join(', ')}. ${c.shortName} prototypes in code so constraints show up early.`,
    sources: [],
  },
  {
    match: /best|strongest|favou?rite|project|work|portfolio/i,
    answer: () =>
      `Start with ${featured[0].title} (${featured[0].tagline.toLowerCase()}) and ${featured[1].title} (${featured[1].tagline.toLowerCase()}).`,
    sources: [src(featured[0].slug), src(featured[1].slug)],
  },
];

export function faqAnswer(question: string): { text: string; sources: ChatSource[] } {
  const hit = FAQ.find((f) => f.match.test(question));
  if (hit) return { text: hit.answer(), sources: hit.sources };
  return {
    text: `I can answer questions about ${c.shortName}'s projects, process, tools and availability. Try “What did you do on RouteFusion?” — or email ${c.email}.`,
    sources: [{ title: 'All work', href: '/work' }],
  };
}
