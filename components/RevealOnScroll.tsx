'use client';

import { useEffect } from 'react';

/**
 * Drives the scroll reveal described in app/globals.css: every `[data-reveal]` block eases into
 * place the first time it scrolls into view, then is left alone.
 *
 * - Visitors who prefer reduced motion get nothing hidden and nothing animated.
 * - Blocks already on screen when the page becomes interactive are marked revealed straight
 *   away, so nothing the visitor is looking at disappears and comes back.
 * - One shared IntersectionObserver for the whole page; no per-frame work.
 */
export function RevealOnScroll() {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !('IntersectionObserver' in window)) return;

    const blocks = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    const viewportBottom = window.innerHeight;
    for (const block of blocks) {
      const { top, bottom } = block.getBoundingClientRect();
      if (top < viewportBottom && bottom > 0) block.classList.add('is-revealed');
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      },
      // Start as the block's top passes 8% above the bottom of the screen.
      { rootMargin: '0px 0px -8% 0px', threshold: 0 },
    );
    for (const block of blocks) {
      if (!block.classList.contains('is-revealed')) observer.observe(block);
    }
    root.classList.add('reveal-ready');

    return () => {
      observer.disconnect();
      root.classList.remove('reveal-ready');
    };
  }, []);

  return null;
}
