/** Tiny brand-tinted SVG used as next/image's blur placeholder (no extra request, ~200 bytes). */
export function blurDataUrl(color: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 10"><rect width="16" height="10" fill="${color}" opacity="0.25"/></svg>`;
  return `data:image/svg+xml;base64,${typeof window === 'undefined' ? Buffer.from(svg).toString('base64') : btoa(svg)}`;
}
