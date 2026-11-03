import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, FileDown, Sparkles } from 'lucide-react';
import { SITE_CONFIG } from '@/data/content';
import { breadcrumbJsonLd } from '@/lib/seo';
import { JsonLd } from '@/components/ui/JsonLd';
import { PrintButton } from '@/components/ui/PrintButton';

export const metadata: Metadata = {
  title: 'Resume',
  description: `Official resume of ${SITE_CONFIG.name} — B.Tech Computer Science student at VIT Vellore (CGPA 9.23). AI/ML, Full-Stack Engineering, and Cybersecurity.`,
  alternates: { canonical: '/resume' },
};

export default function ResumePage() {
  return (
    <div className="mx-auto max-w-[1440px] px-4 pb-28 pt-28 md:px-10 md:pt-36">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Resume', path: '/resume' },
        ])}
      />

      {/* Top Controls & Navigation Header */}
      <div className="no-print mx-auto mb-10 max-w-[850px] flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-ink transition-colors hover:text-accent"
        >
          <ArrowLeft size={15} aria-hidden /> Back to home
        </Link>
        <div className="flex items-center gap-3">
          <PrintButton />
          <a
            href="#download-section"
            className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full border-2 border-ink bg-[#ffedd5] px-4 py-2 font-mono text-xs font-bold text-[#c2410c] shadow-[2px_2px_0_0_rgb(var(--c-ink))] transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_rgb(var(--c-ink))]"
          >
            <FileDown size={15} aria-hidden />
            <span>Download link ↓</span>
          </a>
        </div>
      </div>

      {/* THE RESUME DOCUMENT SHEET: EXACT LATEX REPLICA */}
      <article
        id="resume-sheet"
        className="mx-auto max-w-[850px] rounded-2xl border-[2.5px] border-[#1f1d2b] bg-white p-7 text-[#111111] shadow-[8px_8px_0_0_#1f1d2b] sm:p-12 md:p-14 font-serif text-[13px] leading-relaxed select-text"
        style={{ fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif' }}
      >
        {/* Name Header */}
        <header className="text-center pb-2">
          <h1 className="text-2xl font-bold tracking-tight text-[#111] sm:text-3xl">
            Veeramallu Sai Abhiram
          </h1>
          <div className="mt-2 text-xs leading-normal text-[#222] sm:text-[13px]">
            <span>Visakhapatnam, Andhra Pradesh, India</span>
            <span className="mx-1.5 font-sans">|</span>
            <a href="tel:+918985986371" className="hover:underline text-[#111]">
              +91 89859 86371
            </a>
            <span className="mx-1.5 font-sans">|</span>
            <a href="mailto:abhiram97137@gmail.com" className="hover:underline text-[#111]">
              abhiram97137@gmail.com
            </a>
          </div>
          <div className="mt-1 text-xs leading-normal text-[#222] sm:text-[13px]">
            <a
              href="https://www.linkedin.com/in/veeramallu-sai-abhiram-28870928a/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0a66c2] hover:underline"
            >
              linkedin.com/in/veeramallu-sai-abhiram
            </a>
            <span className="mx-1.5 font-sans">|</span>
            <a
              href="https://github.com/abhiveeramallu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0a66c2] hover:underline"
            >
              github.com/abhiveeramallu
            </a>
            <span className="mx-1.5 font-sans">|</span>
            <a
              href="https://leetcode.com/u/abhi97137/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0a66c2] hover:underline"
            >
              leetcode.com/abhi97137
            </a>
          </div>
        </header>

        {/* SUMMARY */}
        <section className="mt-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#111] border-b border-[#111] pb-0.5">
            Summary
          </h2>
          <p className="mt-2 text-justify text-xs sm:text-[13px] leading-relaxed text-[#222]">
            Final-year B.Tech Computer Science student (CGPA: 9.23, graduating 2027) and Full Stack Developer intern with hands-on
            experience building and shipping full-stack applications using <strong>Python</strong>, <strong>React</strong>,{' '}
            <strong>TypeScript</strong>, and <strong>SQL</strong>. Experienced in frontend, integrating REST APIs, working in Agile teams,
            and building AI-powered features, backed by strong data structures and algorithms fundamentals and a habit of learning new tools quickly.
          </p>
        </section>

        {/* EDUCATION */}
        <section className="mt-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#111] border-b border-[#111] pb-0.5">
            Education
          </h2>
          <div className="mt-2 space-y-2">
            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-1">
                <span className="font-bold text-[#111]">Vellore Institute of Technology (VIT)</span>
                <span className="text-xs text-[#222] italic">Vellore, Tamil Nadu</span>
              </div>
              <div className="flex flex-wrap items-baseline justify-between gap-1 text-xs sm:text-[13px]">
                <span className="italic text-[#222]">Bachelor of Technology (B.Tech) in Computer Science; CGPA: 9.23/10</span>
                <span className="text-xs text-[#222] italic">July 2023 – May 2027</span>
              </div>
            </div>
            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-1">
                <span className="font-bold text-[#111]">Sri Chaitanya Junior College</span>
                <span className="text-xs text-[#222] italic">Visakhapatnam, Andhra Pradesh</span>
              </div>
              <div className="flex flex-wrap items-baseline justify-between gap-1 text-xs sm:text-[13px]">
                <span className="italic text-[#222]">Intermediate (Class XII), MPC; 96%</span>
                <span className="text-xs text-[#222] italic">Jun 2021 – May 2023</span>
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section className="mt-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#111] border-b border-[#111] pb-0.5">
            Experience
          </h2>
          <div className="mt-2">
            <div className="flex flex-wrap items-baseline justify-between gap-1">
              <div>
                <span className="font-bold text-[#111]">Full Stack Developer Intern</span>{' '}
                <a
                  href="https://drive.google.com/file/d/11BZy77DHONNhRFztxD88L74LbCySg4Ua/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#0a66c2] hover:underline"
                >
                  [Certificate]
                </a>
              </div>
              <span className="text-xs text-[#222] italic">May 2026 – Jul 2026</span>
            </div>
            <div className="flex flex-wrap items-baseline justify-between gap-1 text-xs sm:text-[13px]">
              <span className="italic text-[#222]">Watania Solutions Pvt. Ltd.</span>
              <span className="text-xs text-[#222] italic">Hyderabad, Telangana</span>
            </div>
            <ul className="mt-1.5 space-y-1 text-xs sm:text-[13px] leading-relaxed text-[#222]">
              <li className="flex items-start">
                <span className="mr-1.5 font-bold">–</span>
                <span>
                  Developed and shipped production <strong>React Native/TypeScript</strong> screens for the WSC HR Portal, translating UI/UX specs into reusable components reviewed and approved by senior engineers.
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-1.5 font-bold">–</span>
                <span>
                  Integrated and tested <strong>RESTful APIs</strong> for authentication, employee management, attendance, and leave workflows; wrote test cases that caught data-flow and error-handling regressions before release.
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-1.5 font-bold">–</span>
                <span>
                  Resolved cross-team integration issues by validating API contracts with backend engineers and tracing request failures across the stack in a fast-paced <strong>Scrum/Agile</strong> environment.
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-1.5 font-bold">–</span>
                <span>
                  Collaborated with design and backend teams through sprint planning, code reviews, and daily stand-ups, clearly communicating technical trade-offs.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* PROJECTS */}
        <section className="mt-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#111] border-b border-[#111] pb-0.5">
            Projects
          </h2>
          <div className="mt-2 space-y-3">
            {/* Project 1 */}
            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-1">
                <div>
                  <span className="font-bold text-[#111]">Unified Ride &amp; Parcel Route Optimization Platform</span>
                  <span className="mx-1.5 font-sans">|</span>
                  <a
                    href="https://github.com/abhiveeramallu/RouteFusion"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#0a66c2] hover:underline"
                  >
                    GitHub
                  </a>
                  <span className="mx-1.5 font-sans">|</span>
                  <a
                    href="https://route-fusion.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#0a66c2] hover:underline"
                  >
                    Live Demo
                  </a>
                </div>
                <span className="text-xs text-[#222] italic">Jun 2026</span>
              </div>
              <p className="text-xs sm:text-[12.5px] italic text-[#444]">
                Python, FastAPI, PostgreSQL, SQLAlchemy, React, TypeScript, JWT
              </p>
              <ul className="mt-1 space-y-1 text-xs sm:text-[13px] leading-relaxed text-[#222]">
                <li className="flex items-start">
                  <span className="mr-1.5 font-bold">–</span>
                  <span>
                    Solved a real-world optimization problem: implemented the <strong>Hungarian (Kuhn-Munkres)</strong> algorithm from scratch to assign captains to rides and bundle parcels, minimizing total cost using <strong>Haversine-based distance metrics</strong>.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-1.5 font-bold">–</span>
                  <span>
                    Built the <strong>FastAPI</strong> backend with <strong>SQLAlchemy</strong> and <strong>PostgreSQL</strong>, and a React/TypeScript front end, to dispatch combined passenger-ride and parcel requests across multiple captains.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-1.5 font-bold">–</span>
                  <span>
                    Prevented double-booking under simultaneous requests using <strong>optimistic concurrency control</strong>, version-checked atomic updates, and transactional acceptance.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-1.5 font-bold">–</span>
                  <span>
                    Implemented <strong>JWT authentication</strong> with access/refresh tokens and token revocation; deployed the app on <strong>Vercel</strong>.
                  </span>
                </li>
              </ul>
            </div>

            {/* Project 2 */}
            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-1">
                <div>
                  <span className="font-bold text-[#111]">AI Bot Detection Platform</span>
                  <span className="mx-1.5 font-sans">|</span>
                  <a
                    href="https://github.com/abhiveeramallu/ThreatlensAI"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#0a66c2] hover:underline"
                  >
                    GitHub
                  </a>
                  <span className="mx-1.5 font-sans">|</span>
                  <a
                    href="https://threatlensai-atzs.onrender.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#0a66c2] hover:underline"
                  >
                    Live Demo
                  </a>
                </div>
                <span className="text-xs text-[#222] italic">Apr 2026</span>
              </div>
              <p className="text-xs sm:text-[12.5px] italic text-[#444]">
                Python (scikit-learn, XGBoost, SHAP), Node.js, Express, PostgreSQL, Docker, Selenium, Playwright, Puppeteer
              </p>
              <ul className="mt-1 space-y-1 text-xs sm:text-[13px] leading-relaxed text-[#222]">
                <li className="flex items-start">
                  <span className="mr-1.5 font-bold">–</span>
                  <span>
                    Built an end-to-end machine learning bot-detection platform (<strong>Python, Node.js/Express, PostgreSQL, Docker</strong>) that scores sessions using browser behavior, automation signals, and honeypots, combining <strong>rule-based risk scoring</strong> with <strong>Logistic Regression and XGBoost</strong>.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-1.5 font-bold">–</span>
                  <span>
                    Created a <strong>105-session labeled dataset</strong> from real Selenium, Playwright, and Puppeteer bots plus synthetic human sessions; engineered features, then trained, evaluated, and compared <strong>Logistic Regression vs. XGBoost</strong> models.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-1.5 font-bold">–</span>
                  <span>
                    Used <strong>SHAP</strong> for model explainability and <strong>red-teamed</strong> the detector with Puppeteer Stealth, measuring a <strong>50% evasion rate</strong> and identifying weaknesses in client-side detection.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-1.5 font-bold">–</span>
                  <span>
                    Integrated <strong>Google Gemini</strong> to turn detection results into structured threat reports using <strong>versioned prompts</strong> and evidence-based output checks.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* TECHNICAL SKILLS */}
        <section className="mt-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#111] border-b border-[#111] pb-0.5">
            Technical Skills
          </h2>
          <div className="mt-2 space-y-1 text-xs sm:text-[13px] leading-relaxed text-[#222]">
            <p>
              <strong>Languages:</strong> Java, Python, SQL, JavaScript, TypeScript, C, C++, HTML5, CSS3
            </p>
            <p>
              <strong>Front End:</strong> React, React Native, Responsive UI, Reusable Components
            </p>
            <p>
              <strong>Back End &amp; Databases:</strong> FastAPI, Node.js, Express, REST APIs, JWT, PostgreSQL, SQLite, SQLAlchemy
            </p>
            <p>
              <strong>AI/ML:</strong> scikit-learn, XGBoost, Logistic Regression, SHAP, Google Gemini API (LLM integration)
            </p>
            <p>
              <strong>Tools &amp; Testing:</strong> Git, GitHub, Docker, Vercel, Postman, Agile/Scrum, API/Unit Testing, Selenium, Playwright
            </p>
            <p>
              <strong>Core CS:</strong> DSA, OOP, Operating Systems, Computer Networks, DBMS, Software Engineering, Cloud Architecture
            </p>
          </div>
        </section>

        {/* CERTIFICATIONS & ACHIEVEMENTS */}
        <section className="mt-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-[#111] border-b border-[#111] pb-0.5">
            Certifications &amp; Achievements
          </h2>
          <div className="mt-2 space-y-1 text-xs sm:text-[13px] leading-relaxed text-[#222]">
            <div className="flex flex-wrap items-baseline justify-between gap-1">
              <div>
                <span>IBM Generative AI Engineering Professional Certificate</span>{' '}
                <a
                  href="https://drive.google.com/file/d/17EBwSTkbC0IEkw9l3FkzzOl9P8pzaGKa/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#0a66c2] hover:underline"
                >
                  [Certificate]
                </a>
              </div>
              <span className="text-xs text-[#222] italic">June 2025</span>
            </div>
            <div className="flex flex-wrap items-baseline justify-between gap-1">
              <div>
                <span>VIT Merit Scholarship for Academic Excellence</span>{' '}
                <a
                  href="https://everify.vit.ac.in/validate/univ/services/2144eb504fe5311d50fad8c19b0ec5072a10da7b9609ac7a93afab300c660df55004d8113c322c6d3407bea55fb181b1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#0a66c2] hover:underline"
                >
                  [Certificate]
                </a>
              </div>
              <span className="text-xs text-[#222] italic">2023–2024</span>
            </div>
          </div>
        </section>
      </article>

      {/* THE ONLY DOWNLOAD OPTION: AT THE BOTTOM OF THE RESUME PAGE */}
      <section id="download-section" className="no-print mx-auto mt-14 max-w-[850px] text-center">
        <div className="rounded-3xl border-[3px] border-[#1f1d2b] bg-[#ffedd5] p-8 shadow-[6px_6px_0_0_#1f1d2b] sm:p-10">
          <div className="inline-flex items-center gap-1.5 rounded-full border-2 border-[#1f1d2b] bg-white px-3 py-1 font-mono text-xs font-bold text-[#c2410c] shadow-[2px_2px_0_0_#1f1d2b]">
            <Sparkles size={13} className="text-[#ea580c]" />
            OFFICIAL PDF COPY
          </div>
          <h2 className="type-h2 mt-4 text-[#1f1d2b] font-black">
            Download the official <span className="accent-word text-[#ea580c]">resume PDF</span>
          </h2>
          <p className="mx-auto mt-2 max-w-md font-mono text-xs text-[#1f1d2b]/80 leading-relaxed">
            Need an offline copy for ATS screeners or recruiter evaluations? Download the full PDF directly below.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/DigitalVeeramalluSaiAbhiram.pdf"
              download="Veeramallu_Sai_Abhiram_Resume.pdf"
              className="btn-primary inline-flex min-h-[50px] items-center gap-2.5 rounded-full border-[2.5px] border-[#1f1d2b] bg-[#ff5a1f] px-8 py-3.5 font-mono text-sm font-black uppercase tracking-wider text-white shadow-[4px_4px_0_0_#1f1d2b] transition-all duration-150 hover:-translate-y-1 hover:bg-[#e04a14] hover:shadow-[6px_6px_0_0_#1f1d2b] active:translate-y-0.5 active:shadow-[2px_2px_0_0_#1f1d2b]"
            >
              <FileDown size={18} aria-hidden />
              <span>Download Resume (PDF)</span>
            </a>
            <Link
              href="/contact"
              className="inline-flex min-h-[50px] items-center gap-2 rounded-full border-[2.5px] border-[#1f1d2b] bg-white px-7 py-3.5 font-mono text-sm font-black uppercase tracking-wider text-[#1f1d2b] shadow-[4px_4px_0_0_#1f1d2b] transition-all duration-150 hover:-translate-y-1 hover:bg-[#ffedd5] hover:shadow-[6px_6px_0_0_#1f1d2b] active:translate-y-0.5 active:shadow-[2px_2px_0_0_#1f1d2b]"
            >
              <span>Get in touch →</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
