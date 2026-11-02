'use client';

/** Tiny cross-island event bus so lazily loaded widgets (chat, palette) can be opened from anywhere. */
export type UiEvent = 'open-chat' | 'open-palette' | 'open-contact';

export function emit(event: UiEvent, detail?: string) {
  window.dispatchEvent(new CustomEvent(event, { detail }));
}

export function on(event: UiEvent, handler: (detail?: string) => void) {
  const listener = (e: Event) => handler((e as CustomEvent<string | undefined>).detail);
  window.addEventListener(event, listener);
  return () => window.removeEventListener(event, listener);
}
