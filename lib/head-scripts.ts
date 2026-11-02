/**
 * Inline scripts that must run in <head> before first paint. Kept in a plain (non-"use client") module so the
 * server layout receives the actual strings.
 */

/** Restores the opt-in dark theme without a flash. */
export const THEME_SCRIPT = `(function(){try{if(localStorage.getItem('theme')==='dark')document.documentElement.setAttribute('data-theme','dark')}catch(e){}})();`;

/**
 * Shows the preloader only on the first page view of a session and never for reduced-motion users.
 * The sequence is pure CSS (globals.css) and capped at 1.2 s, so it never blocks hydration or the LCP paint.
 */
export const PRELOADER_SCRIPT = `(function(){try{var d=document.documentElement;if(sessionStorage.getItem('pl'))return;if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;sessionStorage.setItem('pl','1');d.setAttribute('data-preload','');setTimeout(function(){d.removeAttribute('data-preload')},1200)}catch(e){}})();`;
