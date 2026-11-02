'use client';

import { useMemo, useState } from 'react';
import { contrastRatio, firstAccessibleStep, tonalRamp, wcagLevel } from '@/lib/contrast';
import { cn } from '@/lib/utils';

const PRESETS = ['#FF5A1F', '#5B5BFF', '#C6F432', '#E8457C', '#0EA5A4'];
const LIGHT_BG = '#F6F4EF';
const DARK_BG = '#111111';

export default function ContrastRamps() {
  const [base, setBase] = useState('#FF5A1F');
  const valid = /^#[0-9a-fA-F]{6}$/.test(base);
  const ramp = useMemo(() => (valid ? tonalRamp(base) : null), [base, valid]);
  const onLight = ramp ? firstAccessibleStep(ramp, LIGHT_BG) : null;
  const onDark = ramp ? firstAccessibleStep(ramp, DARK_BG) : null;

  return (
    <div>
      <div className="flex flex-wrap items-end gap-4">
        <div>
          <label htmlFor="base-colour" className="eyebrow mb-1.5 block text-muted">
            Brand colour
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={valid ? base : '#000000'}
              onChange={(e) => setBase(e.target.value.toUpperCase())}
              className="h-11 w-11 cursor-pointer rounded-lg border border-line"
              aria-label="Pick colour"
            />
            <input
              id="base-colour"
              value={base}
              onChange={(e) => setBase(e.target.value.trim())}
              className="h-11 w-32 rounded-lg border border-line bg-bg px-3 font-mono text-sm text-ink"
              aria-invalid={!valid}
            />
          </div>
        </div>
        <div className="flex gap-2" role="group" aria-label="Presets">
          {PRESETS.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setBase(p)}
              className="h-9 w-9 rounded-full border-2 border-surface shadow-soft"
              style={{ background: p }}
              aria-label={`Use ${p}`}
            />
          ))}
        </div>
      </div>

      {!valid && <p className="mt-4 text-sm text-orange-700">Enter a 6-digit hex colour like #FF5A1F.</p>}

      {ramp && (
        <>
          <ol className="mt-8 grid grid-cols-5 gap-2 sm:grid-cols-10">
            {Object.entries(ramp).map(([step, hex]) => {
              const light = contrastRatio(hex, LIGHT_BG);
              const dark = contrastRatio(hex, DARK_BG);
              const n = Number(step);
              return (
                <li key={step} className="overflow-hidden rounded-xl border border-line bg-surface">
                  <div
                    className="flex h-20 items-end p-2 font-mono text-[11px] font-semibold"
                    style={{
                      background: hex,
                      color: contrastRatio(hex, '#111111') > contrastRatio(hex, '#FFFFFF') ? '#111' : '#fff',
                    }}
                  >
                    {step}
                  </div>
                  <div className="space-y-0.5 p-2 font-mono text-[10px] text-muted">
                    <p className={cn(n === onLight && 'font-bold text-ink')}>{light.toFixed(1)} light</p>
                    <p className={cn(n === onDark && 'font-bold text-ink')}>{dark.toFixed(1)} dark</p>
                    <p className="truncate">{hex}</p>
                  </div>
                </li>
              );
            })}
          </ol>
          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              ['Body text on light', onLight, LIGHT_BG],
              ['Body text on dark', onDark, DARK_BG],
            ].map(([label, step, bg]) => (
              <div key={label as string} className="rounded-2xl p-5" style={{ background: bg as string }}>
                <dt className="font-mono text-xs" style={{ color: bg === DARK_BG ? '#A3A39C' : '#6B6B66' }}>
                  {label as string}
                </dt>
                <dd
                  className="mt-1 font-display text-xl font-bold"
                  style={{ color: step !== null ? ramp[step as number] : undefined }}
                >
                  {step === null
                    ? 'No step passes 4.5:1'
                    : `Use ${step} — ${contrastRatio(ramp[step as number], bg as string).toFixed(2)}:1 (${wcagLevel(contrastRatio(ramp[step as number], bg as string))})`}
                </dd>
              </div>
            ))}
          </dl>
        </>
      )}
    </div>
  );
}
