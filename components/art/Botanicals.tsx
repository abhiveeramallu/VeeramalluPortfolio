/**
 * Flat, cut-paper botanical shapes that frame compositions. Each leaf sways from its own stem; the group
 * drifts with pointer parallax (`float-layer` + `--depth`). Purely decorative.
 */
export function Fronds({
  className,
  flip = false,
  depth = 14,
}: {
  className?: string;
  flip?: boolean;
  depth?: number;
}) {
  return (
    <div
      className={`float-layer pointer-events-none ${className ?? ''}`}
      style={{ ['--depth' as string]: depth }}
      aria-hidden
    >
      <svg
        viewBox="0 0 220 320"
        className="h-full w-full"
        style={{ transform: flip ? 'scaleX(-1)' : undefined }}
      >
        <path
          className="sway"
          style={{ ['--dur' as string]: '7s' }}
          d="M110 320 C 100 230, 40 190, 20 110 C 70 140, 110 190, 118 320 Z"
          fill="#328477"
        />
        <path
          className="sway"
          style={{ ['--dur' as string]: '6s', ['--delay' as string]: '-2s' }}
          d="M118 320 C 120 220, 150 140, 205 70 C 205 150, 160 220, 126 320 Z"
          fill="#20594f"
        />
        <path
          className="sway"
          style={{ ['--dur' as string]: '8s', ['--delay' as string]: '-4s' }}
          d="M112 320 C 105 240, 95 150, 110 20 C 135 120, 130 230, 120 320 Z"
          fill="#5fb3a3"
        />
        <circle
          className="drift"
          style={{ ['--dur' as string]: '9s' }}
          cx="40"
          cy="60"
          r="12"
          fill="#e5c542"
        />
      </svg>
    </div>
  );
}

/** Small floating paper shapes: a mustard star, a coral circle and a dusty-blue squiggle. */
export function Confetti({ className, depth = 24 }: { className?: string; depth?: number }) {
  return (
    <div
      className={`float-layer pointer-events-none ${className ?? ''}`}
      style={{ ['--depth' as string]: depth }}
      aria-hidden
    >
      <svg viewBox="0 0 200 200" className="h-full w-full">
        <path
          className="drift"
          style={{ ['--dur' as string]: '8s' }}
          d="M40 20 l8 18 20 2 -15 13 5 20 -18 -11 -18 11 5 -20 -15 -13 20 -2z"
          fill="#e5c542"
        />
        <circle
          className="drift"
          style={{ ['--dur' as string]: '6s', ['--delay' as string]: '-3s' }}
          cx="150"
          cy="60"
          r="16"
          fill="#e98b72"
        />
        <path
          className="drift"
          style={{ ['--dur' as string]: '10s', ['--delay' as string]: '-5s' }}
          d="M30 150 q 15 -20 30 0 t 30 0 t 30 0"
          stroke="#86b3cf"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </div>
  );
}
