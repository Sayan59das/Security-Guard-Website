'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import type { Testimonial } from '@/content/siteContent';
import { PlaceholderTag } from '@/components/ui/PlaceholderTag';
import { cn } from '@/lib/cn';

/**
 * A row of testimonial cards that scrolls sideways with snap points, so it works with a swipe,
 * a trackpad, the arrow keys (the row is focusable) and the Previous / Next buttons. On a wide
 * screen three cards fit and the buttons step through the rest; if everything fits, the buttons
 * go quiet. Nothing auto-plays, so there is nothing to pause.
 */
export function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const update = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    setCanPrev(track.scrollLeft > 2);
    setCanNext(track.scrollLeft < track.scrollWidth - track.clientWidth - 2);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;
    const onScroll = () => {
      if (!frame) {
        frame = requestAnimationFrame(() => {
          frame = 0;
          update();
        });
      }
    };

    update();
    track.addEventListener('scroll', onScroll, { passive: true });
    const resize = new ResizeObserver(update);
    resize.observe(track);
    return () => {
      track.removeEventListener('scroll', onScroll);
      resize.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [update]);

  const step = (direction: 1 | -1) => {
    const track = trackRef.current;
    const first = track?.children[0] as HTMLElement | undefined;
    const second = track?.children[1] as HTMLElement | undefined;
    if (!track || !first) return;
    // One card plus the gap between cards.
    const stride = second ? second.offsetLeft - first.offsetLeft : first.offsetWidth;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.scrollBy({ left: direction * stride, behavior: reduced ? 'auto' : 'smooth' });
  };

  const buttonClass =
    'inline-flex h-6 w-6 items-center justify-center rounded border border-tone-rule bg-white text-tone-fg transition-colors hover:border-tone-fg disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-tone-rule';

  return (
    <div role="group" aria-roledescription="carousel" aria-label="Client testimonials">
      <div className={cn('mb-2 flex justify-end gap-1', !canPrev && !canNext && 'invisible')}>
        <button type="button" onClick={() => step(-1)} disabled={!canPrev} className={buttonClass}>
          <ChevronLeft aria-hidden="true" strokeWidth={1.75} className="h-3 w-3" />
          <span className="sr-only">Previous testimonials</span>
        </button>
        <button type="button" onClick={() => step(1)} disabled={!canNext} className={buttonClass}>
          <ChevronRight aria-hidden="true" strokeWidth={1.75} className="h-3 w-3" />
          <span className="sr-only">Next testimonials</span>
        </button>
      </div>

      <ul
        ref={trackRef}
        tabIndex={0}
        aria-label="Testimonials, scroll sideways for more"
        className="flex snap-x snap-mandatory gap-2 overflow-x-auto overscroll-x-contain pb-1 [scrollbar-width:none] lg:gap-3 [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => (
          <li
            key={`${item.name}|${item.role}`}
            className="shrink-0 basis-[88%] snap-start sm:basis-[calc((100%_-_16px)/2)] lg:basis-[calc((100%_-_48px)/3)]"
          >
            <figure className="flex h-full flex-col rounded-lg border border-tone-rule bg-white p-3 lg:p-4">
              <Quote aria-hidden="true" strokeWidth={1.5} className="h-4 w-4 text-brass-500" />
              <blockquote className="mt-2 text-lead text-tone-fg">
                <p>{item.quote}</p>
              </blockquote>
              <figcaption className="mt-auto pt-3">
                <div className="flex flex-col items-start gap-1 border-t border-tone-rule pt-2">
                  <span>
                    <span className="block font-semibold text-tone-fg">{item.name}</span>
                    <span className="block text-sm text-tone-muted">{item.role}</span>
                  </span>
                  {item.placeholder ? <PlaceholderTag /> : null}
                </div>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </div>
  );
}
