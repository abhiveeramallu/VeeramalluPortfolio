'use client';

import { useEffect, useState } from 'react';
import { SITE_CONFIG } from '@/data/content';

const format = () =>
  new Date().toLocaleTimeString('en-GB', {
    timeZone: SITE_CONFIG.timezone,
    hour: '2-digit',
    minute: '2-digit',
  });

/** Minute-resolution clock (a per-second interval re-rendered the footer 60× a minute for nothing). */
export function LocalTime() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    setTime(format());
    const id = setInterval(() => setTime(format()), 30_000);
    return () => clearInterval(id);
  }, []);
  return <time suppressHydrationWarning>{time ?? '--:--'}</time>;
}
