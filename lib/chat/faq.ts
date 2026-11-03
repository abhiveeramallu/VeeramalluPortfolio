import { SITE_CONFIG } from '@/data/content';
import type { ChatSource } from './protocol';

/** Canned answers used when no API key is configured (or the API is down). Grounded in content.ts. */
interface FaqEntry {
  match: RegExp;
  answer: () => string;
  sources: ChatSource[];
}

const c = SITE_CONFIG;
const project = (slug: string) => {
  const p = c.projects.find((x) => x.slug === slug);
  if (!p) throw new Error(`FAQ references unknown project "${slug}"`);
  return p;
};
const src = (slug: string): ChatSource => ({ title: project(slug).title, href: `/work/${slug}` });

const FAQ: FaqEntry[] = [
  {
    match: /contact|email|reach|hire|hiring|intern|role|job|avail/i,
    answer: () =>
      `${c.shortName} is a Computer Science student at VIT Vellore (${c.status.toLowerCase()}). The quickest route is ${c.email} or the form on the contact page; the résumé is at /resume.pdf.`,
    sources: [{ title: 'Contact', href: '/contact' }],
  },
  {
    match: /routefusion|dispatch|hungarian|ride|parcel/i,
    answer: () => `${project('routefusion').summary} ${project('routefusion').currentStatus}`,
    sources: [src('routefusion')],
  },
  {
    match: /threatlens|bot|captcha|login/i,
    answer: () =>
      `${project('threatlens-ai').summary} Limitations: ${project('threatlens-ai').limitations.join(' ')}`,
    sources: [src('threatlens-ai')],
  },
  {
    match: /imageguard|forg|watermark|image/i,
    answer: () => project('imageguard').summary,
    sources: [src('imageguard')],
  },
  {
    match: /stm32|embedded|thermal|edge|hardware/i,
    answer: () =>
      `${project('edge-ai-thermal-management').summary} On unseen test data the model did not beat the simple persistence baseline, and the case study reports that.`,
    sources: [src('edge-ai-thermal-management')],
  },
  {
    match: /machine learning|\bml\b|\bai\b|model|forecast|rag|llm/i,
    answer: () =>
      `Machine-learning projects include ThreatLensAI (rule engine vs. XGBoost), VisionRAG-X (conflict-aware multimodal retrieval), Greenhouse Microclimate Forecasting (GRU ensemble) and Edge AI Thermal Management (Extra Trees forecasting).`,
    sources: [src('threatlens-ai'), src('visionrag-x'), src('greenhouse-microclimate-forecasting')],
  },
  {
    match: /security|honeypot|attack|mitre/i,
    answer: () =>
      `Security work: ThreatLensAI (bot detection with a measured evasion test), the Honeypot Attack Classifier (Cowrie logs → MITRE ATT&CK, Sigma drafts, IoC feed) and ImageGuard (image forensics).`,
    sources: [src('threatlens-ai'), src('honeypot-attack-classification'), src('imageguard')],
  },
  {
    match: /tool|stack|tech|skill|language|python|react|fastapi/i,
    answer: () =>
      `Skills used across the repositories: ${c.skills.map((g) => `${g.group} — ${g.items.join(', ')}`).join('; ')}.`,
    sources: [{ title: 'About', href: '/about' }],
  },
  {
    match: /best|strongest|favou?rite|project|work|portfolio/i,
    answer: () =>
      `Good starting points are RouteFusion (${project('routefusion').summary.split(',')[0].toLowerCase()}) and ThreatLensAI, both with live demos.`,
    sources: [src('routefusion'), src('threatlens-ai')],
  },
];

export function faqAnswer(question: string): { text: string; sources: ChatSource[] } {
  const hit = FAQ.find((f) => f.match.test(question));
  if (hit) return { text: hit.answer(), sources: hit.sources };
  return {
    text: `I can answer questions about ${c.shortName}'s projects, skills and education. Try “What does RouteFusion do?” — or email ${c.email}.`,
    sources: [{ title: 'All projects', href: '/work' }],
  };
}
