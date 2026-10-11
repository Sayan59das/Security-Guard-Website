'use client';

import { useEffect } from 'react';

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/**
 * Eases in-page link jumps (#services, #contact, "Back to top"...) instead of using the
 * browser's own smooth scroll, which starts and stops abruptly and is the same speed for a
 * 500px hop and a 10,000px one. Here the duration grows with the distance and the motion
 * accelerates and settles.
 *
 * Behaviour worth knowing:
 *  - Visitors who prefer reduced motion get an instant jump.
 *  - Touching, scrolling the wheel or pressing a key mid-scroll stops the animation at once.
 *  - The link still updates the URL, and the target section receives focus (without scrolling
 *    again) so keyboard and screen-reader users land where the page did.
 *  - Modified clicks (new tab, etc.) and links to missing ids are left to the browser.
 */
export function SmoothAnchors() {
  useEffect(() => {
    let frame = 0;
    const stop = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };

    const scrollTo = (to: number) => {
      stop();
      const from = window.scrollY;
      const distance = to - from;
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced || Math.abs(distance) < 2) {
        window.scrollTo(0, to);
        return;
      }
      const duration = Math.min(1400, 500 + Math.abs(distance) * 0.12);
      const startTime = performance.now();
      const step = (now: number) => {
        const progress = Math.min(1, (now - startTime) / duration);
        window.scrollTo(0, from + distance * easeInOutCubic(progress));
        frame = progress < 1 ? requestAnimationFrame(step) : 0;
      };
      frame = requestAnimationFrame(step);
    };

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      const hash = anchor?.getAttribute('href');
      if (!anchor || !hash || hash.length < 2) return;

      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (!target) return;

      event.preventDefault();
      const offset = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const to = Math.min(Math.max(target.getBoundingClientRect().top + window.scrollY - offset, 0), maxScroll);

      history.pushState(null, '', hash);
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
      scrollTo(to);
    };

    document.addEventListener('click', onClick);
    window.addEventListener('wheel', stop, { passive: true });
    window.addEventListener('touchstart', stop, { passive: true });
    window.addEventListener('keydown', stop);
    return () => {
      stop();
      document.removeEventListener('click', onClick);
      window.removeEventListener('wheel', stop);
      window.removeEventListener('touchstart', stop);
      window.removeEventListener('keydown', stop);
    };
  }, []);

  return null;
}
