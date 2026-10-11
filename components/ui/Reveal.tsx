'use client';

import type { ReactNode } from 'react';
import { LazyMotion, m, useReducedMotion } from 'framer-motion';

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Seconds to wait before the animation starts. Use it to stagger a few siblings. */
  delay?: number;
}

// Framer Motion's features are fetched after the page is interactive (see motionFeatures.ts).
const loadFeatures = () => import('./motionFeatures').then((module) => module.default);

// A gentle ease: starts softly, settles slowly. (A very sharp ease-out reads as "popping in".)
const EASE = [0.25, 0.1, 0.25, 1] as const;

/**
 * The only scroll animation on the site: a soft fade-up the first time a block comes into view.
 * It starts 48px before the block reaches the screen edge, so it is already settling as it arrives
 * instead of appearing after the visitor has seen the empty space.
 * Under prefers-reduced-motion the duration is zero, so content simply appears.
 * Do not wrap above-the-fold content in this (it would start hidden) or giant containers.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <LazyMotion features={loadFeatures} strict>
      <m.div
        className={className}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 'some', margin: '0px 0px 48px 0px' }}
        transition={{ duration: reduceMotion ? 0 : 0.9, delay: reduceMotion ? 0 : delay, ease: EASE }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
