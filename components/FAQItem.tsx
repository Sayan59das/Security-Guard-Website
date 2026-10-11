'use client';

import { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/cn';

interface FAQItemProps {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

/**
 * One accordion row. A real <button> inside a heading, with aria-expanded and aria-controls,
 * so it works with Enter and Space and is announced correctly by screen readers.
 * Closed answers are `invisible`, which also removes them from the tab order.
 */
export function FAQItem({ question, answer, defaultOpen = false }: FAQItemProps) {
  const [open, setOpen] = useState(defaultOpen);
  const uid = useId();
  const buttonId = `${uid}-question`;
  const panelId = `${uid}-answer`;

  return (
    <div className="border-t border-tone-rule">
      <h3>
        <button
          id={buttonId}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
          className="flex w-full items-center justify-between gap-3 py-3 text-left font-serif text-h3 text-tone-fg"
        >
          <span>{question}</span>
          <ChevronDown
            aria-hidden="true"
            strokeWidth={1.5}
            className={cn(
              'h-3 w-3 shrink-0 text-tone-accent transition-transform duration-500 motion-reduce:transition-none',
              open && 'rotate-180',
            )}
          />
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        data-open={open}
        className="collapsible"
      >
        <div className="overflow-hidden">
          <p className="max-w-prose pb-3 text-tone-muted">{answer}</p>
        </div>
      </div>
    </div>
  );
}
