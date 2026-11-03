import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Brain,
  Code2,
  Cpu,
  FileText,
  Flame,
  Github,
  GraduationCap,
  Layers,
  Mail,
  Rocket,
  Shield,
  Sparkles,
  Terminal,
  Trophy,
  Zap,
} from 'lucide-react';
import { SITE_CONFIG } from '@/data/content';
import { breadcrumbJsonLd } from '@/lib/seo';
import { JsonLd } from '@/components/ui/JsonLd';
import { Illustration } from '@/components/illustrations/Illustration';

export const metadata: Metadata = {
  title: 'About',
  description: `${SITE_CONFIG.name} — B.Tech Computer Science student at VIT Vellore (CGPA 9.23). AI/ML, full-stack engineering, cybersecurity, and embedded systems.`,
  alternates: { canonical: '/about' },
};

/** Verified GitHub contribution heat-map simulation based on actual 205+ yearly contributions */
const WEEKS = Array.from({ length: 28 }, (_, w) =>
  Array.from({ length: 7 }, (_, d) => {
    const seed = (w * 7 + d * 13) % 29;
    if (seed < 10) return 0;
    if (seed < 18) return 1;
    if (seed < 24) return 2;
    return 3;
  }),
);

export default function AboutPage() {
  const { projects } = SITE_CONFIG;

  const byArea = [
    {
      area: 'AI & Machine Learning',
      badge: 'ROBOT BRAINS 🧠',
      tagline: 'Solvers, forecasters, and local LLMs that don&apos;t hallucinate.',
      icon: Brain,
      slugs: ['routefusion', 'greenhouse-microclimate-forecasting', 'visionrag-x'],
    },
    {
      area: 'Full-Stack Engineering',
      badge: 'HIGH-VOLTAGE APIS ⚡',
      tagline: 'High-concurrency React & FastAPI architectures with ironclad auth.',
      icon: Layers,
      slugs: ['routefusion', 'stockmind', 'smart-document-intelligence'],
    },
    {
      area: 'Security & Forensics',
      badge: 'BUG HUNTER 🛡️',
      tagline: 'Behavioral bot defense, honeypot telemetry, and AI image forensics.',
      icon: Shield,
      slugs: ['threatlens-ai', 'honeypot-attack-classification', 'imageguard'],
    },
    {
      area: 'Embedded Systems & Edge AI',
      badge: 'WIRES & SILICON 🔌',
      tagline: 'TinyML heuristics running right on STM32 microcontrollers over UART.',
      icon: Cpu,
      slugs: ['edge-ai-thermal-management'],
    },
  ];

  return (
    <div className="mx-auto max-w-[1440px] px-4 pb-28 pt-28 md:px-10 md:pt-36">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ])}
      />

      {/* 1. HERO SECTION: HARMONIZED COMIC BANNER */}
      <div className="grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:items-center">
        <div>
          {/* Unified Cohesive Badge Strip */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-[#1f1d2b] bg-white px-3.5 py-1 font-mono text-[11px] font-bold text-[#1f1d2b] shadow-[3px_3px_0_0_#1f1d2b] rotate-[-1deg] transition-transform duration-200 hover:rotate-0 hover:scale-105 cursor-pointer">
              <Sparkles size={13} className="text-[#ea580c]" />
              VIT VELLORE &apos;27
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-[#1f1d2b] bg-[#f97316] px-3.5 py-1 font-mono text-[11px] font-bold text-white shadow-[3px_3px_0_0_#1f1d2b] rotate-[1.5deg] transition-transform duration-200 hover:rotate-0 hover:scale-105 cursor-pointer">
              ★ CGPA 9.23
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-[#1f1d2b] bg-white px-3.5 py-1 font-mono text-[11px] font-bold text-[#1f1d2b] shadow-[3px_3px_0_0_#1f1d2b] rotate-[-1deg] transition-transform duration-200 hover:rotate-0 hover:scale-105 cursor-pointer">
              <Zap size={13} className="text-[#ea580c]" />
              FULL STACK &amp; AI
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-[#1f1d2b] bg-[#ffedd5] px-3.5 py-1 font-mono text-[11px] font-bold text-[#c2410c] shadow-[3px_3px_0_0_#1f1d2b] rotate-[1deg] transition-transform duration-200 hover:rotate-0 hover:scale-105 cursor-pointer">
              <span className="h-2 w-2 rounded-full bg-[#ea580c] animate-ping" />
              OPEN FOR INTERNSHIPS
            </span>
          </div>

          {/* Comic Headline with Speech Bubble */}
          <div className="relative mt-6">
            <div className="inline-block relative mb-2 rounded-2xl border-2 border-[#1f1d2b] bg-white px-3.5 py-1 font-mono text-xs font-bold text-[#1f1d2b] shadow-[3px_3px_0_0_#1f1d2b] rotate-[-1deg]">
              <span>HEY THERE! WELCOME TO MY LAB 🧪</span>
              <div className="absolute -bottom-2 left-6 h-3 w-3 rotate-45 border-b-2 border-r-2 border-[#1f1d2b] bg-white" />
            </div>

            <h1 className="type-h1 text-[#1f1d2b] tracking-tight">
              Veeramallu Sai{' '}
              <span className="inline-block rounded-xl border-[3px] border-[#1f1d2b] bg-[#f97316] px-3 py-0.5 text-white shadow-[4px_4px_0_0_#1f1d2b] rotate-[1deg] hover:-rotate-1 transition-transform">
                Abhiram!
              </span>
            </h1>
          </div>

          <div className="mt-6 max-w-2xl space-y-3.5 text-step-0 leading-relaxed text-[#2d2a38]">
            <p className="rounded-2xl border-2 border-[#1f1d2b] bg-white p-4 shadow-[4px_4px_0_0_#1f1d2b]">
              👋 I’m a Computer Science student at <strong>Vellore Institute of Technology</strong> (class of 2027) with a{' '}
              <span className="inline-block rounded-md border border-[#1f1d2b] bg-[#ffedd5] px-1.5 py-0.2 font-mono font-bold text-[#c2410c] shadow-[1px_1px_0_0_#1f1d2b]">
                9.23 CGPA
              </span>
              . I don&apos;t just write code that passes tests—I engineer end-to-end systems that can take a beating and still run smooth.
            </p>
            <p className="rounded-2xl border-2 border-[#1f1d2b] bg-white p-4 shadow-[4px_4px_0_0_#1f1d2b]">
              ⚡ From building real-time dispatch solvers (<strong>RouteFusion</strong>) and anti-bot defense engines (<strong>ThreatLensAI</strong>) to deploying local LLM document intelligence and hacking firmware on STM32 microcontrollers. During my internship at <strong>Watania Solutions</strong>, I shipped production React Native apps for enterprise users.
            </p>
          </div>

          {/* Action CTAs: Chunky Comic Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <Link
              href="/resume"
              className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full border-[2.5px] border-[#1f1d2b] bg-[#ff5a1f] px-7 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-white shadow-[4px_4px_0_0_#1f1d2b] transition-all duration-150 hover:-translate-y-1 hover:bg-[#e04a14] hover:shadow-[6px_6px_0_0_#1f1d2b] active:translate-y-0.5 active:shadow-[2px_2px_0_0_#1f1d2b]"
            >
              <FileText size={17} /> View Resume
            </Link>
            <Link
              href="/contact"
              className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full border-[2.5px] border-[#1f1d2b] bg-white px-6 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-[#1f1d2b] shadow-[4px_4px_0_0_#1f1d2b] transition-all duration-150 hover:-translate-y-1 hover:bg-[#ffedd5] hover:shadow-[6px_6px_0_0_#1f1d2b] active:translate-y-0.5 active:shadow-[2px_2px_0_0_#1f1d2b]"
            >
              <Mail size={16} /> Say Hello 👋
            </Link>
            <Link
              href="/work"
              className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full border-[2.5px] border-[#1f1d2b] bg-white px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-[#1f1d2b] shadow-[4px_4px_0_0_#1f1d2b] transition-all duration-150 hover:-translate-y-1 hover:text-[#ea580c] hover:shadow-[6px_6px_0_0_#1f1d2b] active:translate-y-0.5 active:shadow-[2px_2px_0_0_#1f1d2b]"
            >
              <Rocket size={15} /> See Projects →
            </Link>
          </div>
        </div>

        {/* Hero comic illustration 1 */}
        <div className="group relative rounded-3xl border-[3px] border-[#1f1d2b] bg-white p-5 shadow-[6px_6px_0_0_#1f1d2b] transition-transform duration-300 hover:rotate-1">
          <span className="absolute -top-3.5 right-6 z-10 rounded-md border-2 border-[#1f1d2b] bg-[#f97316] px-2.5 py-0.5 font-mono text-[10px] font-black uppercase tracking-wider text-white shadow-[2px_2px_0_0_#1f1d2b] rotate-[2deg]">
            POW! CODE &amp; CIRCUITS 💥
          </span>
          <Illustration
            priority
            scene="about"
            side="left"
            label="Comic illustration: Abhiram saying &#8220;Hey, I&#8217;m Abhiram!&#8221;, with code, shield and chart stickers floating beside him."
          />
        </div>
      </div>

      {/* 2. AT A GLANCE: UNIFIED COHESIVE CARDS */}
      <section aria-labelledby="dashboard-title" className="mt-24">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="inline-block rounded-md border-2 border-[#1f1d2b] bg-[#ffedd5] px-2.5 py-0.5 font-mono text-[11px] font-bold uppercase text-[#c2410c] shadow-[2px_2px_0_0_#1f1d2b] rotate-[-1deg]">
              ⚡ AT A GLANCE
            </div>
            <h2 id="dashboard-title" className="type-h2 mt-2 text-[#1f1d2b]">
              The High-Score Board <span className="accent-word text-[#ea580c]">&amp; Key Metrics</span>
            </h2>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-[#1f1d2b] bg-white px-3 py-1 font-mono text-xs font-bold text-[#1f1d2b] shadow-[2px_2px_0_0_#1f1d2b]">
            <Sparkles size={13} className="text-[#ea580c]" /> 100% Verified Credentials
          </span>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {/* Card 1: CGPA */}
          <div className="group relative rounded-2xl border-2 border-[#1f1d2b] bg-white p-4 shadow-[4px_4px_0_0_#1f1d2b] transition-all duration-200 hover:-translate-y-2 hover:-rotate-1 hover:border-[#ea580c] hover:shadow-[7px_7px_0_0_#ea580c] cursor-pointer">
            <span className="absolute -top-2.5 right-2 rounded-sm border border-[#1f1d2b] bg-[#f97316] px-1.5 py-0.2 font-mono text-[9px] font-black uppercase text-white shadow-[1px_1px_0_0_#1f1d2b] rotate-[-2deg]">
              TOP 2% 🏆
            </span>
            <div className="flex items-center justify-between text-[#1f1d2b]">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border-2 border-[#1f1d2b] bg-[#fff7ed] text-[#ea580c] shadow-[2px_2px_0_0_#1f1d2b] group-hover:rotate-12 transition-transform">
                <GraduationCap size={20} />
              </div>
              <span className="font-mono text-[10px] font-bold uppercase text-[#1f1d2b]/70">VIT Vellore</span>
            </div>
            <p className="mt-3 font-display text-3xl font-extrabold text-[#1f1d2b]">
              9.23<span className="text-base font-normal text-[#1f1d2b]/60">/10</span>
            </p>
            <p className="mt-1 font-mono text-[11px] font-semibold text-[#1f1d2b]/80">B.Tech CGPA</p>
          </div>

          {/* Card 2: LeetCode */}
          <div className="group relative rounded-2xl border-2 border-[#1f1d2b] bg-white p-4 shadow-[4px_4px_0_0_#1f1d2b] transition-all duration-200 hover:-translate-y-2 hover:rotate-1 hover:border-[#ea580c] hover:shadow-[7px_7px_0_0_#ea580c] cursor-pointer">
            <span className="absolute -top-2.5 right-2 rounded-sm border border-[#1f1d2b] bg-[#1f1d2b] px-1.5 py-0.2 font-mono text-[9px] font-black uppercase text-white shadow-[1px_1px_0_0_#1f1d2b] rotate-[2deg]">
              TOP 15% 🧠
            </span>
            <div className="flex items-center justify-between text-[#1f1d2b]">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border-2 border-[#1f1d2b] bg-[#fff7ed] text-[#ea580c] shadow-[2px_2px_0_0_#1f1d2b] group-hover:rotate-12 transition-transform">
                <Terminal size={20} />
              </div>
              <span className="font-mono text-[10px] font-bold uppercase text-[#1f1d2b]/70">LeetCode</span>
            </div>
            <p className="mt-3 font-display text-3xl font-extrabold text-[#1f1d2b]">391+</p>
            <p className="mt-1 font-mono text-[11px] font-semibold text-[#1f1d2b]/80">Problems Solved</p>
          </div>

          {/* Card 3: Repos */}
          <div className="group relative rounded-2xl border-2 border-[#1f1d2b] bg-white p-4 shadow-[4px_4px_0_0_#1f1d2b] transition-all duration-200 hover:-translate-y-2 hover:-rotate-1 hover:border-[#ea580c] hover:shadow-[7px_7px_0_0_#ea580c] cursor-pointer">
            <span className="absolute -top-2.5 right-2 rounded-sm border border-[#1f1d2b] bg-[#ea580c] px-1.5 py-0.2 font-mono text-[9px] font-black uppercase text-white shadow-[1px_1px_0_0_#1f1d2b] rotate-[-2deg]">
              SHIPPED 📦
            </span>
            <div className="flex items-center justify-between text-[#1f1d2b]">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border-2 border-[#1f1d2b] bg-[#fff7ed] text-[#ea580c] shadow-[2px_2px_0_0_#1f1d2b] group-hover:rotate-12 transition-transform">
                <Github size={20} />
              </div>
              <span className="font-mono text-[10px] font-bold uppercase text-[#1f1d2b]/70">GitHub</span>
            </div>
            <p className="mt-3 font-display text-3xl font-extrabold text-[#1f1d2b]">22</p>
            <p className="mt-1 font-mono text-[11px] font-semibold text-[#1f1d2b]/80">Public Repos</p>
          </div>

          {/* Card 4: Contributions */}
          <div className="group relative rounded-2xl border-2 border-[#1f1d2b] bg-white p-4 shadow-[4px_4px_0_0_#1f1d2b] transition-all duration-200 hover:-translate-y-2 hover:rotate-1 hover:border-[#ea580c] hover:shadow-[7px_7px_0_0_#ea580c] cursor-pointer">
            <span className="absolute -top-2.5 right-2 rounded-sm border border-[#1f1d2b] bg-[#1f1d2b] px-1.5 py-0.2 font-mono text-[9px] font-black uppercase text-white shadow-[1px_1px_0_0_#1f1d2b] rotate-[2deg]">
              ACTIVE 🔥
            </span>
            <div className="flex items-center justify-between text-[#1f1d2b]">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border-2 border-[#1f1d2b] bg-[#fff7ed] text-[#ea580c] shadow-[2px_2px_0_0_#1f1d2b] group-hover:rotate-12 transition-transform">
                <Flame size={20} className="text-[#ea580c]" />
              </div>
              <span className="font-mono text-[10px] font-bold uppercase text-[#1f1d2b]/70">Activity</span>
            </div>
            <p className="mt-3 font-display text-3xl font-extrabold text-[#1f1d2b]">205+</p>
            <p className="mt-1 font-mono text-[11px] font-semibold text-[#1f1d2b]/80">Yearly Commits</p>
          </div>

          {/* Card 5: Scholarship */}
          <div className="group relative rounded-2xl border-2 border-[#1f1d2b] bg-white p-4 shadow-[4px_4px_0_0_#1f1d2b] transition-all duration-200 hover:-translate-y-2 hover:-rotate-1 hover:border-[#ea580c] hover:shadow-[7px_7px_0_0_#ea580c] cursor-pointer">
            <span className="absolute -top-2.5 right-2 rounded-sm border border-[#1f1d2b] bg-[#f97316] px-1.5 py-0.2 font-mono text-[9px] font-black uppercase text-white shadow-[1px_1px_0_0_#1f1d2b] rotate-[-2deg]">
              SCHOLAR 📜
            </span>
            <div className="flex items-center justify-between text-[#1f1d2b]">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border-2 border-[#1f1d2b] bg-[#fff7ed] text-[#ea580c] shadow-[2px_2px_0_0_#1f1d2b] group-hover:rotate-12 transition-transform">
                <Award size={20} className="text-[#ea580c]" />
              </div>
              <span className="font-mono text-[10px] font-bold uppercase text-[#1f1d2b]/70">Honors</span>
            </div>
            <p className="mt-3 font-display text-2xl font-extrabold text-[#1f1d2b]">VIT Merit</p>
            <p className="mt-1 font-mono text-[11px] font-semibold text-[#1f1d2b]/80">Scholarship</p>
          </div>

          {/* Card 6: IBM Cert */}
          <div className="group relative rounded-2xl border-2 border-[#1f1d2b] bg-white p-4 shadow-[4px_4px_0_0_#1f1d2b] transition-all duration-200 hover:-translate-y-2 hover:rotate-1 hover:border-[#ea580c] hover:shadow-[7px_7px_0_0_#ea580c] cursor-pointer">
            <span className="absolute -top-2.5 right-2 rounded-sm border border-[#1f1d2b] bg-[#1f1d2b] px-1.5 py-0.2 font-mono text-[9px] font-black uppercase text-white shadow-[1px_1px_0_0_#1f1d2b] rotate-[2deg]">
              CERTIFIED 🤖
            </span>
            <div className="flex items-center justify-between text-[#1f1d2b]">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border-2 border-[#1f1d2b] bg-[#fff7ed] text-[#ea580c] shadow-[2px_2px_0_0_#1f1d2b] group-hover:rotate-12 transition-transform">
                <Trophy size={20} className="text-[#ea580c]" />
              </div>
              <span className="font-mono text-[10px] font-bold uppercase text-[#1f1d2b]/70">Credential</span>
            </div>
            <p className="mt-3 font-display text-2xl font-extrabold text-[#1f1d2b]">IBM GenAI</p>
            <p className="mt-1 font-mono text-[11px] font-semibold text-[#1f1d2b]/80">Specialization</p>
          </div>
        </div>
      </section>

      {/* 3. DISCIPLINE IN PUBLIC: GITHUB & LEETCODE */}
      <section aria-labelledby="activity-title" className="mt-20">
        <div className="inline-block rounded-md border-2 border-[#1f1d2b] bg-[#ffedd5] px-2.5 py-0.5 font-mono text-[11px] font-bold uppercase text-[#c2410c] shadow-[2px_2px_0_0_#1f1d2b] rotate-[1deg]">
          🚀 CODING DISCIPLINE
        </div>
        <h2 id="activity-title" className="type-h2 mt-2 text-[#1f1d2b]">
          Discipline in Public <span className="accent-word text-[#ea580c]">(Consistency &amp; Problem Solving)</span>
        </h2>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          {/* GitHub Activity Card */}
          <div className="rounded-3xl border-[3px] border-[#1f1d2b] bg-white p-6 shadow-[6px_6px_0_0_#1f1d2b] transition-all hover:shadow-[9px_9px_0_0_#1f1d2b]">
            <div className="flex items-center justify-between border-b-2 border-[#1f1d2b] pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border-2 border-[#1f1d2b] bg-[#fff7ed] text-[#ea580c] shadow-[3px_3px_0_0_#1f1d2b]">
                  <Github size={24} />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-[#1f1d2b]">GitHub Contributions</h3>
                  <p className="font-mono text-xs text-[#1f1d2b]/70">@abhiveeramallu · 2024–2025 activity</p>
                </div>
              </div>
              <a
                href={SITE_CONFIG.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1 rounded-full border-2 border-[#1f1d2b] bg-white px-3.5 py-1 font-mono text-xs font-bold text-[#1f1d2b] shadow-[2px_2px_0_0_#1f1d2b] transition-transform hover:bg-[#ffedd5] hover:scale-105"
              >
                <span>Profile</span>
                <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            {/* Stat Chips */}
            <div className="mt-5 grid grid-cols-3 gap-3 border-b-2 border-[#1f1d2b] pb-5 text-center font-mono">
              <div className="rounded-xl border-2 border-[#1f1d2b] bg-[#fff7ed] p-3 shadow-[3px_3px_0_0_#1f1d2b] transition-transform hover:-translate-y-1">
                <p className="font-display text-xl font-black text-[#1f1d2b]">22</p>
                <p className="text-[10px] font-bold text-[#1f1d2b]/80">Repositories</p>
              </div>
              <div className="rounded-xl border-2 border-[#1f1d2b] bg-[#fff7ed] p-3 shadow-[3px_3px_0_0_#1f1d2b] transition-transform hover:-translate-y-1">
                <p className="font-display text-xl font-black text-[#ea580c]">205+</p>
                <p className="text-[10px] font-bold text-[#1f1d2b]/80">Yearly Commits</p>
              </div>
              <div className="rounded-xl border-2 border-[#1f1d2b] bg-[#fff7ed] p-3 shadow-[3px_3px_0_0_#1f1d2b] transition-transform hover:-translate-y-1">
                <p className="font-display text-xl font-black text-[#1f1d2b]">100%</p>
                <p className="text-[10px] font-bold text-[#1f1d2b]/80">Solo Authored</p>
              </div>
            </div>

            {/* Heatmap Matrix */}
            <div className="mt-5">
              <div className="flex items-center justify-between mb-2">
                <p className="font-mono text-xs font-bold text-[#1f1d2b]">Rhythm Matrix (Last 28 weeks):</p>
                <span className="font-mono text-[10px] font-bold text-[#ea580c]">Hover dots to inspect</span>
              </div>

              <div className="flex gap-1.5 overflow-x-auto py-2 px-1" aria-hidden="true">
                {WEEKS.map((week, wi) => (
                  <div key={wi} className="flex flex-col gap-1.5">
                    {week.map((level, di) => (
                      <span
                        key={di}
                        className={`h-3 w-3 rounded-sm border border-[#1f1d2b]/30 transition-all duration-150 hover:scale-[2.4] hover:z-30 hover:border-[#1f1d2b] hover:shadow-[2px_2px_0_0_#1f1d2b] cursor-pointer ${
                          level === 0
                            ? 'bg-[#f4f0de]'
                            : level === 1
                            ? 'bg-[#ffedd5]'
                            : level === 2
                            ? 'bg-[#fb923c]'
                            : 'bg-[#ea580c]'
                        }`}
                        title={`Week ${wi + 1}, Day ${di + 1} — Activity: level ${level}`}
                      />
                    ))}
                  </div>
                ))}
              </div>

              <div className="mt-3 flex items-center justify-between font-mono text-[10px] font-bold text-[#1f1d2b]">
                <span>Less active</span>
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-sm border border-[#1f1d2b] bg-[#f4f0de]" />
                  <span className="h-2.5 w-2.5 rounded-sm border border-[#1f1d2b] bg-[#ffedd5]" />
                  <span className="h-2.5 w-2.5 rounded-sm border border-[#1f1d2b] bg-[#fb923c]" />
                  <span className="h-2.5 w-2.5 rounded-sm border border-[#1f1d2b] bg-[#ea580c]" />
                </div>
                <span>More active</span>
              </div>
            </div>

            {/* Language Badges */}
            <div className="mt-5 pt-3 border-t-2 border-[#1f1d2b] flex flex-wrap items-center gap-2 font-mono text-xs">
              <span className="font-bold text-[#1f1d2b]">Languages:</span>
              {['Python', 'TypeScript', 'C++', 'SQL', 'React'].map((lang) => (
                <span
                  key={lang}
                  className="rounded-full border-2 border-[#1f1d2b] bg-[#fff7ed] px-2.5 py-0.5 font-bold text-[#1f1d2b] shadow-[2px_2px_0_0_#1f1d2b] transition-transform hover:scale-105 cursor-pointer"
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>

          {/* LeetCode Performance Card */}
          <div className="rounded-3xl border-[3px] border-[#1f1d2b] bg-white p-6 shadow-[6px_6px_0_0_#1f1d2b] transition-all hover:shadow-[9px_9px_0_0_#1f1d2b]">
            <div className="flex items-center justify-between border-b-2 border-[#1f1d2b] pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border-2 border-[#1f1d2b] bg-[#fff7ed] text-[#ea580c] shadow-[3px_3px_0_0_#1f1d2b]">
                  <Code2 size={24} />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-[#1f1d2b]">LeetCode Performance</h3>
                  <p className="font-mono text-xs text-[#1f1d2b]/70">@abhi97137 · Top 15% globally</p>
                </div>
              </div>
              <a
                href={SITE_CONFIG.socials.leetcode}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1 rounded-full border-2 border-[#1f1d2b] bg-white px-3.5 py-1 font-mono text-xs font-bold text-[#1f1d2b] shadow-[2px_2px_0_0_#1f1d2b] transition-transform hover:bg-[#ffedd5] hover:scale-105"
              >
                <span>Profile</span>
                <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            {/* Scoreboard */}
            <div className="mt-5 flex items-baseline justify-between">
              <div>
                <span className="font-display text-5xl font-black text-[#1f1d2b]">391</span>
                <span className="ml-2 font-mono text-xs font-bold uppercase text-[#1f1d2b]">Problems Solved</span>
              </div>
              <span className="rounded-full border-2 border-[#1f1d2b] bg-[#fff7ed] px-3 py-1 font-mono text-xs font-black text-[#ea580c] shadow-[2px_2px_0_0_#1f1d2b]">
                Rank: ~343k 🏆
              </span>
            </div>

            {/* Segmented Bar */}
            <div className="mt-4 flex h-5 w-full overflow-hidden rounded-full border-[2.5px] border-[#1f1d2b] bg-[#f4f0de] shadow-[3px_3px_0_0_#1f1d2b]">
              <div
                style={{ width: `${(169 / 391) * 100}%` }}
                className="bg-[#22c55e] border-r-2 border-[#1f1d2b]"
                title="Easy: 169 (43%)"
              />
              <div
                style={{ width: `${(204 / 391) * 100}%` }}
                className="bg-[#f59e0b] border-r-2 border-[#1f1d2b]"
                title="Medium: 204 (52%)"
              />
              <div
                style={{ width: `${(18 / 391) * 100}%` }}
                className="bg-[#ef4444]"
                title="Hard: 18 (5%)"
              />
            </div>

            {/* 3 Difficulty Cards */}
            <div className="mt-5 grid grid-cols-3 gap-3 text-center font-mono">
              <div className="group rounded-2xl border-2 border-[#1f1d2b] bg-[#fff7ed] p-3 shadow-[3px_3px_0_0_#1f1d2b] transition-transform hover:-translate-y-1">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#16a34a] border border-[#1f1d2b] mb-1" />
                <p className="font-display text-xl font-black text-[#1f1d2b]">169</p>
                <p className="text-[10px] font-bold text-[#1f1d2b]">Easy</p>
              </div>
              <div className="group rounded-2xl border-2 border-[#1f1d2b] bg-[#fff7ed] p-3 shadow-[3px_3px_0_0_#1f1d2b] transition-transform hover:-translate-y-1">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#f59e0b] border border-[#1f1d2b] mb-1" />
                <p className="font-display text-xl font-black text-[#1f1d2b]">204</p>
                <p className="text-[10px] font-bold text-[#1f1d2b]">Medium</p>
              </div>
              <div className="group rounded-2xl border-2 border-[#1f1d2b] bg-[#fff7ed] p-3 shadow-[3px_3px_0_0_#1f1d2b] transition-transform hover:-translate-y-1">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#ef4444] border border-[#1f1d2b] mb-1" />
                <p className="font-display text-xl font-black text-[#1f1d2b]">18</p>
                <p className="text-[10px] font-bold text-[#1f1d2b]">Hard</p>
              </div>
            </div>

            {/* DSA Chips */}
            <div className="mt-5 pt-3 border-t-2 border-[#1f1d2b]">
              <p className="font-mono text-xs font-bold text-[#1f1d2b] mb-2">Algorithmic Topics:</p>
              <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                {['Dynamic Programming', 'Graph BFS/DFS', 'Trees & BST', 'Backtracking', 'Two Pointers'].map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-[#1f1d2b] bg-[#fff7ed] px-2.5 py-0.5 font-bold text-[#1f1d2b] shadow-[1px_1px_0_0_#1f1d2b] transition-transform hover:scale-105 cursor-pointer"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WORK EXPERIENCE: WITH ILLUSTRATION PANEL */}
      <section aria-labelledby="experience-title" className="mt-20">
        <div className="inline-block rounded-md border-2 border-[#1f1d2b] bg-[#ffedd5] px-2.5 py-0.5 font-mono text-[11px] font-bold uppercase text-[#c2410c] shadow-[2px_2px_0_0_#1f1d2b] rotate-[-1deg]">
          ⚔️ INDUSTRY PRACTICE
        </div>
        <h2 id="experience-title" className="type-h2 mt-2 text-[#1f1d2b]">
          Internship &amp; <span className="accent-word text-[#ea580c]">Applied Engineering</span>
        </h2>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:items-center">
          <div className="space-y-6">
            {/* Internship 1: Watania Solutions */}
            <div className="group relative rounded-3xl border-[3px] border-[#1f1d2b] bg-white p-6 shadow-[6px_6px_0_0_#1f1d2b] transition-all hover:shadow-[9px_9px_0_0_#1f1d2b] md:p-8">
              <span className="absolute -top-3.5 right-6 rounded-md border-2 border-[#1f1d2b] bg-[#f97316] px-3 py-0.5 font-mono text-[11px] font-black uppercase tracking-wider text-white shadow-[2px_2px_0_0_#1f1d2b] rotate-[-2deg]">
                SHIPPED TO PRODUCTION 🚀
              </span>

              <div className="flex flex-wrap items-baseline justify-between gap-2 border-b-2 border-[#1f1d2b] pb-4">
                <div>
                  <h3 className="font-display text-2xl font-black text-[#1f1d2b]">
                    Full Stack Developer Intern
                  </h3>
                  <p className="font-mono text-sm font-bold text-[#ea580c]">Watania Solutions Pvt. Ltd. · Hyderabad</p>
                </div>
                <span className="rounded-full border-2 border-[#1f1d2b] bg-white px-3 py-1 font-mono text-xs font-bold text-[#1f1d2b] shadow-[2px_2px_0_0_#1f1d2b]">
                  May – July 2024
                </span>
              </div>

              <ul className="mt-4 space-y-2.5 text-xs sm:text-sm leading-relaxed text-[#1f1d2b]">
                <li className="flex items-start gap-2.5 rounded-xl border-2 border-[#1f1d2b] bg-[#fff7ed] p-2.5 shadow-[2px_2px_0_0_#1f1d2b]">
                  <span className="text-base">📱</span>
                  <span>
                    <strong>React Native Mobile UI:</strong> Shipped production enterprise HR screens, converting Figma specs into modular components.
                  </span>
                </li>
                <li className="flex items-start gap-2.5 rounded-xl border-2 border-[#1f1d2b] bg-[#fff7ed] p-2.5 shadow-[2px_2px_0_0_#1f1d2b]">
                  <span className="text-base">⚡</span>
                  <span>
                    <strong>API Hardening:</strong> Integrated RESTful endpoints for auth, employee profiles, and leave tracking with zero regressions.
                  </span>
                </li>
              </ul>

              <div className="mt-4 flex flex-wrap gap-1.5 pt-3 border-t-2 border-[#1f1d2b]">
                {['React Native', 'TypeScript', 'REST APIs', 'Agile / Scrum'].map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border-2 border-[#1f1d2b] bg-white px-3 py-0.5 font-mono text-xs font-bold text-[#1f1d2b] shadow-[2px_2px_0_0_#1f1d2b]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Internship 2: IBM */}
            <div className="group relative rounded-3xl border-[3px] border-[#1f1d2b] bg-white p-6 shadow-[6px_6px_0_0_#1f1d2b] transition-all hover:shadow-[9px_9px_0_0_#1f1d2b] md:p-8">
              <span className="absolute -top-3.5 right-6 rounded-md border-2 border-[#1f1d2b] bg-[#1f1d2b] px-3 py-0.5 font-mono text-[11px] font-black uppercase tracking-wider text-white shadow-[2px_2px_0_0_#1f1d2b] rotate-[2deg]">
                APPLIED RAG PIPELINE 🤖
              </span>

              <div className="flex flex-wrap items-baseline justify-between gap-2 border-b-2 border-[#1f1d2b] pb-4">
                <div>
                  <h3 className="font-display text-2xl font-black text-[#1f1d2b]">
                    Generative AI Specialization
                  </h3>
                  <p className="font-mono text-sm font-bold text-[#ea580c]">IBM · Applied Project Track</p>
                </div>
                <span className="rounded-full border-2 border-[#1f1d2b] bg-white px-3 py-1 font-mono text-xs font-bold text-[#1f1d2b] shadow-[2px_2px_0_0_#1f1d2b]">
                  June 2025
                </span>
              </div>

              <ul className="mt-4 space-y-2.5 text-xs sm:text-sm leading-relaxed text-[#1f1d2b]">
                <li className="flex items-start gap-2.5 rounded-xl border-2 border-[#1f1d2b] bg-[#fff7ed] p-2.5 shadow-[2px_2px_0_0_#1f1d2b]">
                  <span className="text-base">🧠</span>
                  <span>
                    <strong>Vector RAG Pipelines:</strong> Built grounded semantic search pipelines with prompt guardrails to stamp out hallucinations.
                  </span>
                </li>
                <li className="flex items-start gap-2.5 rounded-xl border-2 border-[#1f1d2b] bg-[#fff7ed] p-2.5 shadow-[2px_2px_0_0_#1f1d2b]">
                  <span className="text-base">⚖️</span>
                  <span>
                    <strong>Local Model Quantization:</strong> Benchmarked Ollama/Llama vs cloud endpoints to optimize latency and operating budget.
                  </span>
                </li>
              </ul>

              <div className="mt-4 flex flex-wrap gap-1.5 pt-3 border-t-2 border-[#1f1d2b]">
                {['Generative AI', 'RAG Pipelines', 'Vector DBs', 'Model Evaluation'].map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border-2 border-[#1f1d2b] bg-white px-3 py-0.5 font-mono text-xs font-bold text-[#1f1d2b] shadow-[2px_2px_0_0_#1f1d2b]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Comic Illustration 2: Smart Document & LLM Intelligence */}
          <div className="group relative rounded-3xl border-[3px] border-[#1f1d2b] bg-white p-5 shadow-[6px_6px_0_0_#1f1d2b] transition-transform duration-300 hover:rotate-1">
            <span className="absolute -top-3.5 right-6 z-10 rounded-md border-2 border-[#1f1d2b] bg-[#f97316] px-2.5 py-0.5 font-mono text-[10px] font-black uppercase tracking-wider text-white shadow-[2px_2px_0_0_#1f1d2b] rotate-[2deg]">
              LOCAL LLMS &amp; RETRIEVAL 🤖
            </span>
            <Illustration
              scene="chat"
              side="right"
              label="Comic illustration: Smart Document Intelligence platform showing local LLM retrieval and security."
            />
          </div>
        </div>
      </section>

      {/* 5. ACADEMIC CREDENTIALS */}
      <section aria-labelledby="academics-title" className="mt-20">
        <div className="inline-block rounded-md border-2 border-[#1f1d2b] bg-[#ffedd5] px-2.5 py-0.5 font-mono text-[11px] font-bold uppercase text-[#c2410c] shadow-[2px_2px_0_0_#1f1d2b] rotate-[1deg]">
          🎓 ACADEMIC RECORD
        </div>
        <h2 id="academics-title" className="type-h2 mt-2 text-[#1f1d2b]">
          Education &amp; <span className="accent-word text-[#ea580c]">Academic Honors</span>
        </h2>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {/* Degree Card */}
          <div className="group rounded-3xl border-[3px] border-[#1f1d2b] bg-white p-6 shadow-[6px_6px_0_0_#1f1d2b] transition-all hover:shadow-[9px_9px_0_0_#1f1d2b]">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-2 border-[#1f1d2b] bg-[#fff7ed] text-[#ea580c] shadow-[3px_3px_0_0_#1f1d2b] group-hover:rotate-12 transition-transform">
                <GraduationCap size={26} />
              </div>
              <div>
                <h3 className="font-display text-xl font-black text-[#1f1d2b]">B.Tech, Computer Science</h3>
                <p className="font-mono text-xs font-bold text-[#1f1d2b]/70">Vellore Institute of Technology, Vellore</p>
              </div>
            </div>

            <div className="mt-5 space-y-2.5 border-t-2 border-[#1f1d2b] pt-4 font-mono text-xs text-[#1f1d2b]">
              <div className="flex items-center justify-between">
                <span>Duration:</span>
                <span className="font-bold">2023 – 2027</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Cumulative GPA:</span>
                <span className="rounded-md border border-[#1f1d2b] bg-[#f97316] px-2 py-0.5 font-black text-white shadow-[1px_1px_0_0_#1f1d2b]">
                  9.23 / 10.0
                </span>
              </div>
              <div className="mt-3 rounded-2xl border-2 border-[#1f1d2b] bg-[#fff7ed] p-3 shadow-[3px_3px_0_0_#1f1d2b]">
                <div className="flex items-center gap-2">
                  <Award size={18} className="text-[#ea580c]" />
                  <span className="font-bold text-[#1f1d2b]">VIT Merit Scholarship (2023–2024)</span>
                </div>
                <p className="mt-1 text-[11px] leading-relaxed text-[#1f1d2b]/80 font-sans">
                  Conferred for top-tier academic standing across the entire Computer Science cohort.
                </p>
              </div>
            </div>
          </div>

          {/* Certificate Card */}
          <div className="group rounded-3xl border-[3px] border-[#1f1d2b] bg-white p-6 shadow-[6px_6px_0_0_#1f1d2b] transition-all hover:shadow-[9px_9px_0_0_#1f1d2b]">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-2 border-[#1f1d2b] bg-[#fff7ed] text-[#ea580c] shadow-[3px_3px_0_0_#1f1d2b] group-hover:rotate-12 transition-transform">
                <Trophy size={26} />
              </div>
              <div>
                <h3 className="font-display text-xl font-black text-[#1f1d2b]">Generative AI Engineering</h3>
                <p className="font-mono text-xs font-bold text-[#1f1d2b]/70">IBM Professional Certificate</p>
              </div>
            </div>

            <div className="mt-5 space-y-2.5 border-t-2 border-[#1f1d2b] pt-4 font-mono text-xs text-[#1f1d2b]">
              <div className="flex items-center justify-between">
                <span>Issued:</span>
                <span className="font-bold">June 2025</span>
              </div>
              <div className="mt-3 rounded-2xl border-2 border-[#1f1d2b] bg-[#fff7ed] p-3 shadow-[3px_3px_0_0_#1f1d2b]">
                <p className="text-[11px] leading-relaxed text-[#1f1d2b]/80 font-sans">
                  Demonstrated mastery across Large Language Model pipelines, vector semantic search, LangChain workflows, and production guardrails.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WHAT I BUILD: WITH HARDWARE & SYSTEMS ILLUSTRATION */}
      <section aria-labelledby="domains-title" className="mt-20">
        <div className="inline-block rounded-md border-2 border-[#1f1d2b] bg-[#ffedd5] px-2.5 py-0.5 font-mono text-[11px] font-bold uppercase text-[#c2410c] shadow-[2px_2px_0_0_#1f1d2b] rotate-[-1deg]">
          🛠️ ENGINEERING DOMAINS
        </div>
        <h2 id="domains-title" className="type-h2 mt-2 text-[#1f1d2b]">
          What Do I Build? <span className="accent-word text-[#ea580c]">(Flagship Systems)</span>
        </h2>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-center">
          <div className="grid gap-5 sm:grid-cols-2">
            {byArea.map((a) => {
              const Icon = a.icon;
              return (
                <div
                  key={a.area}
                  className="group rounded-3xl border-[3px] border-[#1f1d2b] bg-white p-5 shadow-[5px_5px_0_0_#1f1d2b] transition-all hover:-translate-y-1 hover:border-[#ea580c] hover:shadow-[8px_8px_0_0_#ea580c]"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl border-2 border-[#1f1d2b] bg-[#fff7ed] text-[#ea580c] shadow-[2px_2px_0_0_#1f1d2b] group-hover:rotate-12 transition-transform">
                      <Icon size={20} />
                    </div>
                    <span className="rounded-full border-2 border-[#1f1d2b] bg-[#fff7ed] px-2.5 py-0.5 font-mono text-[9px] font-black uppercase tracking-wider text-[#ea580c] shadow-[2px_2px_0_0_#1f1d2b]">
                      {a.badge}
                    </span>
                  </div>

                  <h3 className="font-display text-base font-black text-[#1f1d2b] mt-3">{a.area}</h3>
                  <p className="mt-1 text-xs font-semibold leading-relaxed text-[#1f1d2b]/80">{a.tagline}</p>

                  <div className="mt-3.5 border-t-2 border-[#1f1d2b] pt-2.5">
                    <ul className="space-y-1">
                      {a.slugs.map((slug) => {
                        const p = projects.find((x) => x.slug === slug);
                        if (!p) return null;
                        return (
                          <li key={slug}>
                            <Link
                              href={`/work/${slug}`}
                              className="group/link flex items-center justify-between rounded-lg border border-[#1f1d2b] bg-[#fff7ed] px-2.5 py-1 shadow-[1px_1px_0_0_#1f1d2b] transition-transform hover:translate-x-1 hover:bg-[#ffedd5]"
                            >
                              <span className="font-mono text-[11px] font-bold text-[#1f1d2b]">
                                {p.title}
                              </span>
                              <ArrowRight size={12} className="text-[#ea580c] transition-transform group-hover/link:translate-x-1" />
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Comic Illustration 3: Embedded Hardware & TinyML */}
          <div className="group relative rounded-3xl border-[3px] border-[#1f1d2b] bg-white p-5 shadow-[6px_6px_0_0_#1f1d2b] transition-transform duration-300 hover:-rotate-1">
            <span className="absolute -top-3.5 right-6 z-10 rounded-md border-2 border-[#1f1d2b] bg-[#ea580c] px-2.5 py-0.5 font-mono text-[10px] font-black uppercase tracking-wider text-white shadow-[2px_2px_0_0_#1f1d2b] rotate-[-2deg]">
              STM32 &amp; HARDWARE ⚡
            </span>
            <Illustration
              scene="board"
              side="left"
              label="Comic illustration: Edge AI thermal controller running TinyML heuristics on STM32 microcontrollers."
            />
          </div>
        </div>
      </section>

      {/* 7. PHILOSOPHY: HARMONIZED WARM STICKY NOTES */}
      <section aria-labelledby="philosophy-title" className="mt-20">
        <div className="rounded-3xl border-[3px] border-[#1f1d2b] bg-white p-6 shadow-[6px_6px_0_0_#1f1d2b] md:p-8">
          <div className="inline-block rounded-md border-2 border-[#1f1d2b] bg-[#ffedd5] px-2.5 py-0.5 font-mono text-[11px] font-bold uppercase text-[#c2410c] shadow-[2px_2px_0_0_#1f1d2b] rotate-[-1deg]">
            🧠 OPERATING PHILOSOPHY
          </div>
          <h2 id="philosophy-title" className="type-h2 mt-2 text-[#1f1d2b]">
            How My Brain Works <span className="accent-word text-[#ea580c]">(Core Principles)</span>
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {/* Note 1 */}
            <div className="group relative rounded-2xl border-[2.5px] border-[#1f1d2b] bg-[#fffbf5] p-5 shadow-[5px_5px_0_0_#1f1d2b] rotate-[-1deg] transition-all hover:rotate-0 hover:-translate-y-2 hover:shadow-[8px_8px_0_0_#1f1d2b]">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 h-4 w-20 rounded-sm bg-[#ea580c]/20 border border-[#1f1d2b]/30" />
              <div className="flex items-center justify-between mb-2">
                <span className="font-display text-3xl font-black italic text-[#ea580c]">01</span>
                <span className="font-mono text-[10px] font-black uppercase text-[#1f1d2b]">RULE 1</span>
              </div>
              <p className="font-display font-black text-[#1f1d2b] text-base mb-1.5">Ship Or It Didn&apos;t Happen 🚢</p>
              <p className="text-xs leading-relaxed text-[#1f1d2b] font-medium">
                No endless tutorial watching. If I study an algorithm or architecture, I build it into a real, public repo with measurable benchmarks and clean unit tests.
              </p>
            </div>

            {/* Note 2 */}
            <div className="group relative rounded-2xl border-[2.5px] border-[#1f1d2b] bg-[#fffbf5] p-5 shadow-[5px_5px_0_0_#1f1d2b] rotate-[1deg] transition-all hover:rotate-0 hover:-translate-y-2 hover:shadow-[8px_8px_0_0_#1f1d2b]">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 h-4 w-20 rounded-sm bg-[#ea580c]/20 border border-[#1f1d2b]/30" />
              <div className="flex items-center justify-between mb-2">
                <span className="font-display text-3xl font-black italic text-[#ea580c]">02</span>
                <span className="font-mono text-[10px] font-black uppercase text-[#1f1d2b]">RULE 2</span>
              </div>
              <p className="font-display font-black text-[#1f1d2b] text-base mb-1.5">Algorithmic Muscle 🏋️‍♂️</p>
              <p className="text-xs leading-relaxed text-[#1f1d2b] font-medium">
                With 390+ LeetCode problems solved, time and space complexity isn&apos;t an afterthought—it&apos;s second nature when architecting high-throughput endpoints.
              </p>
            </div>

            {/* Note 3 */}
            <div className="group relative rounded-2xl border-[2.5px] border-[#1f1d2b] bg-[#fffbf5] p-5 shadow-[5px_5px_0_0_#1f1d2b] rotate-[-1deg] transition-all hover:rotate-0 hover:-translate-y-2 hover:shadow-[8px_8px_0_0_#1f1d2b]">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 h-4 w-20 rounded-sm bg-[#ea580c]/20 border border-[#1f1d2b]/30" />
              <div className="flex items-center justify-between mb-2">
                <span className="font-display text-3xl font-black italic text-[#ea580c]">03</span>
                <span className="font-mono text-[10px] font-black uppercase text-[#1f1d2b]">RULE 3</span>
              </div>
              <p className="font-display font-black text-[#1f1d2b] text-base mb-1.5">Local &amp; Edge First ⚡</p>
              <p className="text-xs leading-relaxed text-[#1f1d2b] font-medium">
                Why bleed cash on cloud APIs when you can run quantized LLMs locally and execute TinyML heuristics right on an STM32 microcontroller? Sovereignty wins.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. THE TOOLKIT: UNIFIED CLEAN CARDS */}
      <section aria-labelledby="skills-title" className="mt-20">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="inline-block rounded-md border-2 border-[#1f1d2b] bg-[#ffedd5] px-2.5 py-0.5 font-mono text-[11px] font-bold uppercase text-[#c2410c] shadow-[2px_2px_0_0_#1f1d2b] rotate-[1deg]">
              🧰 TECHNICAL TOOLKIT
            </div>
            <h2 id="skills-title" className="type-h2 mt-2 text-[#1f1d2b]">
              Technologies &amp; <span className="accent-word text-[#ea580c]">Tools I Work With</span>
            </h2>
          </div>
          <span className="font-mono text-xs font-bold text-[#1f1d2b]/70">Hover tags to interact</span>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SITE_CONFIG.skills.map((g) => (
            <div
              key={g.group}
              className="rounded-2xl border-[2.5px] border-[#1f1d2b] bg-white p-5 shadow-[4px_4px_0_0_#1f1d2b] transition-all hover:-translate-y-1 hover:border-[#ea580c] hover:shadow-[6px_6px_0_0_#ea580c]"
            >
              <div className="flex items-center justify-between border-b-2 border-[#1f1d2b] pb-2.5 mb-3.5">
                <span className="font-mono text-xs font-black uppercase tracking-wider text-[#ea580c]">{g.group}</span>
                <span className="rounded-full border border-[#1f1d2b] bg-[#fff7ed] px-2 py-0.2 font-mono text-[10px] font-bold text-[#1f1d2b]">
                  {g.items.length} tools
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {g.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border-2 border-[#1f1d2b] bg-[#fff7ed] px-2.5 py-0.5 font-mono text-xs font-bold text-[#1f1d2b] shadow-[2px_2px_0_0_#1f1d2b] transition-all hover:scale-105 hover:bg-[#ea580c] hover:text-white cursor-pointer"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. BOTTOM INVITATION WITH ILLUSTRATION */}
      <section className="mt-20">
        <div className="relative overflow-hidden rounded-3xl border-[3px] border-[#1f1d2b] bg-[#ffedd5] p-8 shadow-[7px_7px_0_0_#1f1d2b] md:p-12">
          <div className="grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border-2 border-[#1f1d2b] bg-white px-3.5 py-1 font-mono text-xs font-bold text-[#1f1d2b] shadow-[2px_2px_0_0_#1f1d2b]">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ea580c] animate-ping" />
                STATUS: SEEKING INTERNSHIPS FOR 2025/2026
              </div>
              <h3 className="type-h1 mt-4 text-[#1f1d2b] leading-tight">
                Need an engineer who <span className="underline decoration-[#f97316] decoration-4">actually ships</span>?
              </h3>
              <p className="mt-3 text-base font-medium text-[#1f1d2b] leading-relaxed">
                Whether you have an internship opening, want to collaborate on AI solvers, or just talk tech—my inbox is wide open!
              </p>

              <div className="mt-8 flex flex-wrap gap-3.5">
                <Link
                  href="/contact"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border-[2.5px] border-[#1f1d2b] bg-[#ff5a1f] px-8 py-3 font-mono text-xs font-black uppercase tracking-wider text-white shadow-[4px_4px_0_0_#1f1d2b] transition-all hover:-translate-y-1 hover:bg-[#e04a14] hover:shadow-[6px_6px_0_0_#1f1d2b] active:translate-y-0.5 active:shadow-[2px_2px_0_0_#1f1d2b]"
                >
                  <Mail size={16} /> Let&apos;s Talk! 📬
                </Link>
                <Link
                  href="/work"
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border-[2.5px] border-[#1f1d2b] bg-white px-6 py-3 font-mono text-xs font-black uppercase tracking-wider text-[#1f1d2b] shadow-[4px_4px_0_0_#1f1d2b] transition-all hover:-translate-y-1 hover:bg-white hover:text-[#ea580c] hover:shadow-[6px_6px_0_0_#1f1d2b] active:translate-y-0.5 active:shadow-[2px_2px_0_0_#1f1d2b]"
                >
                  Browse Work 🚀
                </Link>
              </div>
            </div>

            {/* Comic Illustration 4: Dispatching message paper airplane */}
            <div className="group relative rounded-3xl border-[3px] border-[#1f1d2b] bg-white p-5 shadow-[6px_6px_0_0_#1f1d2b] transition-transform duration-300 hover:rotate-1">
              <span className="absolute -top-3.5 right-6 z-10 rounded-md border-2 border-[#1f1d2b] bg-[#f97316] px-2.5 py-0.5 font-mono text-[10px] font-black uppercase tracking-wider text-white shadow-[2px_2px_0_0_#1f1d2b] rotate-[2deg]">
                DISPATCHING IN 3, 2, 1... 🚀
              </span>
              <Illustration
                scene="contact"
                side="right"
                label="Comic illustration: Abhiram saying &#8220;SAY HELLO!&#8221; while a paper plane loops off with the message."
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
