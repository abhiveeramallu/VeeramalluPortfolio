'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error('[page error]', error.digest ?? error.message);
  }, [error]);

  return (
    <div className="mx-auto max-w-3xl px-6 pb-24 pt-40 text-center">
      <p className="eyebrow text-orange-600">Something broke</p>
      <h1 className="type-h2 mt-3 text-ink">
        That’s on me, not <span className="accent-word text-orange-600">you.</span>
      </h1>
      <p className="mt-4 text-muted">
        This page hit an unexpected error. Try again, or head back to the work.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <button type="button" onClick={reset} className="btn-primary">
          Try again
        </button>
        <Link href="/work" className="btn-secondary">
          See the work
        </Link>
      </div>
    </div>
  );
}
