'use client';

import type Lenis from 'lenis';

let instance: Lenis | null = null;
let locks = 0;

export const setLenis = (lenis: Lenis | null) => {
  instance = lenis;
};

/** Scroll to an element and move keyboard focus there once the scroll settles. */
export function scrollToTarget(target: HTMLElement, offset = -88) {
  const focus = () => {
    if (!target.hasAttribute('tabindex') && !/^(A|BUTTON|INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) {
      target.setAttribute('tabindex', '-1');
    }
    target.focus({ preventScroll: true });
  };
  if (instance) {
    instance.scrollTo(target, { offset, onComplete: focus });
  } else {
    target.scrollIntoView({ behavior: 'auto', block: 'start' });
    focus();
  }
}

/** Reference-counted scroll lock shared by modals, chat and the command palette. */
export function lockScroll(lock: boolean) {
  locks = Math.max(0, locks + (lock ? 1 : -1));
  const locked = locks > 0;
  document.documentElement.style.overflow = locked ? 'hidden' : '';
  if (instance) {
    if (locked) instance.stop();
    else instance.start();
  }
}
