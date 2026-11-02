'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { SITE_CONFIG } from '@/data/content';
import { SplitReveal } from '@/components/ui/SplitReveal';
import { cn } from '@/lib/utils';

/** Glossy CSS objects that drift at different scroll speeds — 3D feel, zero WebGL cost. */
function FloatingObject({
  progress,
  speed,
  rotate,
  className,
  style,
}: {
  progress: MotionValue<number>;
  speed: number;
  rotate: number;
  className: string;
  style?: React.CSSProperties;
}) {
  const y = useTransform(progress, [0, 1], [speed, -speed]);
  const r = useTransform(progress, [0, 1], [-rotate, rotate]);
  return (
    <motion.div
      aria-hidden="true"
      style={{ y, rotate: r, ...style }}
      className={cn('pointer-events-none absolute', className)}
    />
  );
}

const gloss = (c: string) =>
  `radial-gradient(circle at 32% 28%, #ffffff 0%, ${c} 26%, ${c} 70%, rgba(0,0,0,0.25) 100%)`;

export function ProcessSection() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        });
      },
      { rootMargin: '-45% 0px -45% 0px' },
    );
    stepRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const steps = SITE_CONFIG.processSteps;

  return (
    <section
      ref={ref}
      id="process"
      aria-labelledby="process-title"
      className="section-inverted relative overflow-hidden py-28"
    >
      {!reduce && (
        <>
          <FloatingObject
            progress={scrollYProgress}
            speed={160}
            rotate={20}
            className="-left-10 top-24 h-40 w-40 rounded-full"
            style={{ background: gloss('#FF5A1F') }}
          />
          <FloatingObject
            progress={scrollYProgress}
            speed={260}
            rotate={60}
            className="right-[8%] top-[18%] h-48 w-20 rounded-full"
            style={{ background: gloss('#5B5BFF') }}
          />
          <FloatingObject
            progress={scrollYProgress}
            speed={120}
            rotate={90}
            className="bottom-24 right-[30%] h-28 w-28 rounded-full border-[18px] border-lime-500"
            style={{ boxShadow: 'inset 6px 6px 12px rgba(255,255,255,0.5), 0 10px 30px rgba(0,0,0,0.4)' }}
          />
          <FloatingObject
            progress={scrollYProgress}
            speed={200}
            rotate={45}
            className="bottom-10 left-[12%] h-16 w-16 rounded-2xl"
            style={{ background: gloss('#FFB8D6') }}
          />
        </>
      )}

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 sm:px-12 lg:grid-cols-12">
        <div className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
          <p className="eyebrow mb-3 text-orange-500">02 — Process</p>
          <SplitReveal
            lines={[
              <span key="a" id="process-title">
                How I take an idea
              </span>,
              <span key="b">
                to a <span className="accent-word text-lime-500">shipped</span> product.
              </span>,
            ]}
            className="type-h2 text-ink"
          />
          <p className="mt-5 max-w-md leading-relaxed text-muted">
            Six steps, each with a concrete artifact, so teammates always know where we are and what’s next.
          </p>
          <div
            className="mt-8 hidden rounded-2xl border border-line bg-surface p-5 lg:block"
            aria-live="polite"
          >
            <p className="font-mono text-[11px] uppercase tracking-wider text-muted">Deliverable</p>
            <p className="mt-1 font-display text-lg font-bold text-ink">
              <span className="text-orange-500">{steps[active].number}</span> {steps[active].artifact}
            </p>
          </div>
        </div>

        <ol className="lg:col-span-7">
          {steps.map((step, i) => (
            <li
              key={step.number}
              ref={(el) => {
                stepRefs.current[i] = el;
              }}
              data-index={i}
              className={cn(
                // Active state via accent rule + number colour, never opacity (dimmed text would fail contrast).
                'relative grid grid-cols-[3.5rem_1fr] gap-4 border-t border-line py-8 last:border-b',
                "before:absolute before:-top-px before:left-0 before:h-0.5 before:bg-orange-500 before:transition-[width] before:duration-500 before:content-['']",
                active === i ? 'before:w-full' : 'before:w-0',
              )}
            >
              <span
                className={cn(
                  'font-mono text-sm font-semibold',
                  active === i ? 'text-orange-500' : 'text-muted',
                )}
              >
                {step.number}
              </span>
              <div>
                <h3 className="type-h3 text-ink">{step.title}</h3>
                <p className="mt-1 font-mono text-xs text-lime-500">{step.tagline}</p>
                <p className="mt-3 max-w-lg leading-relaxed text-muted">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
