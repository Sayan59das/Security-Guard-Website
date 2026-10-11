import type { ReactNode } from 'react';
import { Clock, Mail, MapPin, Phone, type LucideIcon } from 'lucide-react';
import { contact, contactSection } from '@/content/siteContent';
import { revealDelay } from '@/lib/reveal';
import { ContactForm } from '@/components/ContactForm';
import { MapPlaceholder } from '@/components/MapPlaceholder';
import { SectionHeading } from '@/components/ui/SectionHeading';

/** One row of the details list. The icon tile lives inside the <dt> so the <dl> markup stays valid. */
function Detail({ icon: IconComponent, label, children }: { icon: LucideIcon; label: string; children: ReactNode }) {
  return (
    <div className="relative min-h-5 min-w-0 pl-7">
      <dt className="text-sm text-tone-muted">
        <span className="absolute left-0 top-0 inline-flex h-5 w-5 items-center justify-center rounded-md border border-tone-rule text-tone-accent">
          <IconComponent aria-hidden="true" strokeWidth={1.5} className="h-2 w-2" />
        </span>
        {label}
      </dt>
      <dd className="mt-0.5 text-tone-fg">{children}</dd>
    </div>
  );
}

/**
 * Layout idea: a true split. A navy panel with the details and map on the left, the form in a
 * raised white panel on the paper side. Each half runs to the edge of the screen, with padding
 * that lines up with the 1200px container (the --edge variable in globals.css).
 */
export function Contact() {
  const { address } = contact;

  return (
    <section id="contact" aria-labelledby="contact-heading" className="grid lg:grid-cols-2">
      <div className="tone-dark bg-tone-bg px-2 py-8 text-tone-fg sm:px-3 lg:py-12 lg:pl-edge lg:pr-8">
        <SectionHeading
          id="contact-heading"
          layout="stack"
          eyebrow={contactSection.eyebrow}
          title={contactSection.title}
          intro={contactSection.intro}
        />

        <dl data-reveal style={revealDelay(1)} className="mt-5 grid gap-3">
          <Detail icon={Phone} label="Phone">
            <a
              href={`tel:${contact.phone.href}`}
              className="font-heading text-h2 font-semibold text-tone-fg underline decoration-tone-rule decoration-1 underline-offset-8 transition-colors hover:decoration-tone-accent"
            >
              {contact.phone.display}
            </a>
          </Detail>
          <Detail icon={Mail} label="Email">
            <a href={`mailto:${contact.email}`} className="break-all underline underline-offset-4">
              {contact.email}
            </a>
          </Detail>
          <Detail icon={MapPin} label="Address">
            <address className="not-italic">
              {address.street}
              <br />
              {address.locality}, {address.region} {address.postalCode}
            </address>
          </Detail>
          <Detail icon={Clock} label="Hours">
            <span className="block space-y-0.5">
              {contact.hours.map((row) => (
                <span key={row.label} className="block">
                  <span className="text-tone-muted">{row.label}: </span>
                  {row.value}
                </span>
              ))}
            </span>
          </Detail>
        </dl>

        <div data-reveal style={revealDelay(2)}>
          <MapPlaceholder className="mt-5" />
        </div>
      </div>

      <div className="tone-light bg-tone-bg px-2 py-8 text-tone-fg sm:px-3 lg:py-12 lg:pl-8 lg:pr-edge">
        <div data-reveal style={revealDelay(1)} className="rounded-lg border border-tone-rule bg-white p-3 shadow-panel sm:p-4">
          <h3 className="text-h3 text-tone-fg">{contactSection.formTitle}</h3>
          <div className="mt-3">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
