'use client';

/** Light is the brand default; dark is an opt-in from the command palette, remembered per browser. */
export function toggleTheme() {
  const root = document.documentElement;
  const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  if (next === 'dark') root.setAttribute('data-theme', 'dark');
  else root.removeAttribute('data-theme');
  try {
    localStorage.setItem('theme', next);
  } catch {
    // Private mode: the toggle still works for this page view.
  }
}
