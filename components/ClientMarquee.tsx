'use client';

import { useState } from 'react';
import { Pause, Play } from 'lucide-react';
import type { ClientItem } from '@/content/siteContent';
import { cn } from '@/lib/cn';

/**
 * A slow, endless row of client tiles.
 *
 * - The track holds two identical copies of the list and slides half its own width, so the loop
 *   has no seam. The second copy is hidden from screen readers.
 * - Anything that moves by itself for more than five seconds needs a way to stop it (WCAG 2.2.2),
 *   so there is a visible Pause button, and the row also pauses while the pointer is over it.
 * - Visitors who prefer reduced motion get a still, wrapped grid with a single copy and no button.
 */
export function ClientMarquee({ items }: { items: ClientItem[] }) {
  const [paused, setPaused] = useState(false);

  const list = (hidden: boolean) => (
    <ul
      aria-hidden={hidden || undefined}
      className={cn('flex shrink-0 gap-2 pr-2 motion-reduce:w-full motion-reduce:flex-wrap motion-reduce:pr-0', hidden && 'motion-reduce:hidden')}
    >
      {items.map((item) => (
        <li
          key={item.name}
          className="w-[13rem] shrink-0 rounded-lg border border-tone-rule bg-white px-3 py-2 motion-reduce:w-auto motion-reduce:min-w-[12rem]"
        >
          <p className="font-heading text-h4 font-semibold text-tone-fg">{item.name}</p>
          <p className="mt-0.5 text-sm text-tone-muted">{item.kind}</p>
        </li>
      ))}
    </ul>
  );

  return (
    <div>
      <div className="overflow-hidden [-webkit-mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)] [mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)] motion-reduce:[-webkit-mask-image:none] motion-reduce:[mask-image:none]">
        <div
          className={cn(
            'flex w-max motion-safe:animate-marquee motion-safe:hover:[animation-play-state:paused] motion-reduce:w-full',
            paused && 'motion-safe:[animation-play-state:paused]',
          )}
        >
          {list(false)}
          {list(true)}
        </div>
      </div>

      <div className="mt-2 flex justify-end motion-reduce:hidden">
        <button
          type="button"
          aria-pressed={paused}
          onClick={() => setPaused((value) => !value)}
          className="inline-flex min-h-5 items-center gap-1 rounded border border-tone-rule px-1.5 text-sm font-semibold text-tone-muted transition-colors hover:border-tone-muted hover:text-tone-fg"
        >
          {paused ? (
            <Play aria-hidden="true" strokeWidth={1.75} className="h-2 w-2" />
          ) : (
            <Pause aria-hidden="true" strokeWidth={1.75} className="h-2 w-2" />
          )}
          {paused ? 'Play' : 'Pause'}
          <span className="sr-only"> the moving client list</span>
        </button>
      </div>
    </div>
  );
}
