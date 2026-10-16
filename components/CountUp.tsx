'use client';

import { useEffect, useRef, useState } from 'react';

interface CountUpProps {
  value: number;
  suffix?: string;
  /** Milliseconds the count takes. */
  duration?: number;
}

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const format = (n: number) => n.toLocaleString('en-IN');

/**
 * A number that counts up from 0 the first time it scrolls into view.
 *
 * Safe by construction: the server-rendered HTML (and a browser with no JavaScript, or a
 * visitor who prefers reduced motion) shows the real final number, never a 0. Screen readers
 * get the final number once, from a hidden span, instead of hearing it tick upwards.
 */
export function CountUp({ value, suffix = '', duration = 1600 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const element = ref.current;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!element || reduced || !('IntersectionObserver' in window)) return;

    let frame = 0;
    setShown(0);

    const run = () => {
      const start = performance.now();
      const step = (now: number) => {
        const progress = Math.min(1, (now - start) / duration);
        setShown(Math.round(value * easeOutCubic(progress)));
        frame = progress < 1 ? requestAnimationFrame(step) : 0;
      };
      frame = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        run();
      },
      { rootMargin: '0px 0px -10% 0px' },
    );
    observer.observe(element);

    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [value, duration]);

  return (
    <>
      <span ref={ref} aria-hidden="true" className="tabular-nums">
        {format(shown)}
        {suffix}
      </span>
      <span className="sr-only">
        {format(value)}
        {suffix}
      </span>
    </>
  );
}
