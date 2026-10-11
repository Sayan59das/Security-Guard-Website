import type { CSSProperties } from 'react';

/**
 * Stagger for scroll reveals: pass a sibling's position and it starts 90ms after the one
 * before it. Use on an element with `data-reveal` (see app/globals.css).
 */
export function revealDelay(index: number): CSSProperties {
  return { '--reveal-index': index } as CSSProperties;
}
