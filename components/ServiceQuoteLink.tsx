'use client';

import { pickService } from '@/lib/servicePick';

interface ServiceQuoteLinkProps {
  service: string;
  label: string;
}

/**
 * Jumps to the contact form with this service already chosen in the "Service needed" field.
 * Its ::after covers the whole card (the card is `relative`), so anywhere on the card clicks it.
 */
export function ServiceQuoteLink({ service, label }: ServiceQuoteLinkProps) {
  return (
    <a
      href="#contact"
      onClick={() => pickService(service)}
      className="mt-3 inline-flex self-start border-b-2 border-brass-500 pb-0.5 text-sm font-semibold text-tone-fg transition-colors after:absolute after:inset-0 after:rounded-lg after:content-[''] group-hover:border-tone-fg"
    >
      {label}
      <span className="sr-only">: {service}</span>
    </a>
  );
}
