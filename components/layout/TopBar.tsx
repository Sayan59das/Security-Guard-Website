import { Clock, Mail, Phone } from 'lucide-react';
import { contact } from '@/content/siteContent';

/**
 * A thin strip above the header on large screens with the office hours, email and phone, so
 * the ways to reach the company are visible before anything else. It scrolls away; the header
 * below it stays.
 */
export function TopBar() {
  const office = contact.hours[0];

  return (
    <div className="tone-dark hidden border-b border-tone-rule bg-ink-950 text-sm text-tone-muted lg:block">
      <div className="mx-auto flex h-5 w-full max-w-container items-center justify-between gap-3 px-4">
        {office ? (
          <p className="flex items-center gap-1">
            <Clock aria-hidden="true" strokeWidth={1.5} className="h-2 w-2 text-tone-accent" />
            {office.label}: {office.value}
          </p>
        ) : (
          <span />
        )}
        <ul className="flex items-center gap-3">
          <li>
            <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-1 transition-colors hover:text-tone-fg">
              <Mail aria-hidden="true" strokeWidth={1.5} className="h-2 w-2 text-tone-accent" />
              {contact.email}
            </a>
          </li>
          <li>
            <a href={`tel:${contact.phone.href}`} className="inline-flex items-center gap-1 font-semibold text-tone-fg transition-colors hover:text-brass-300">
              <Phone aria-hidden="true" strokeWidth={1.5} className="h-2 w-2 text-tone-accent" />
              {contact.phone.display}
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
