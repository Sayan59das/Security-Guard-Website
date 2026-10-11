import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { contact, contactSection } from '@/content/siteContent';
import { ContactForm } from '@/components/ContactForm';
import { MapPlaceholder } from '@/components/MapPlaceholder';
import { SectionHeading } from '@/components/ui/SectionHeading';

/**
 * Layout idea: a true split. A navy panel with the details and map on the left, the paper
 * form on the right. Each half runs to the edge of the screen, with padding that lines up
 * with the 1200px container (the --edge variable in globals.css).
 */
export function Contact() {
  const { address } = contact;

  return (
    <section id="contact" aria-labelledby="contact-heading" className="grid lg:grid-cols-2">
      <div className="tone-dark bg-tone-bg px-2 py-8 text-tone-fg sm:px-3 lg:py-12 lg:pl-edge lg:pr-8">
        <SectionHeading
          id="contact-heading"
          align="left"
          eyebrow={contactSection.eyebrow}
          title={contactSection.title}
          intro={contactSection.intro}
        />

        <dl className="mt-5 grid gap-x-4 gap-y-3 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <dt className="flex items-center gap-1 text-eyebrow uppercase text-tone-accent">
              <Phone aria-hidden="true" strokeWidth={1.5} className="h-2 w-2" />
              Phone
            </dt>
            <dd className="mt-1">
              <a
                href={`tel:${contact.phone.href}`}
                className="font-serif text-h2 text-tone-fg underline decoration-tone-rule decoration-1 underline-offset-8 transition-colors hover:decoration-tone-accent"
              >
                {contact.phone.display}
              </a>
            </dd>
          </div>
          <div>
            <dt className="flex items-center gap-1 text-eyebrow uppercase text-tone-accent">
              <Mail aria-hidden="true" strokeWidth={1.5} className="h-2 w-2" />
              Email
            </dt>
            <dd className="mt-1">
              <a href={`mailto:${contact.email}`} className="break-all text-tone-fg underline underline-offset-4">
                {contact.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="flex items-center gap-1 text-eyebrow uppercase text-tone-accent">
              <MapPin aria-hidden="true" strokeWidth={1.5} className="h-2 w-2" />
              Address
            </dt>
            <dd className="mt-1 text-tone-fg">
              <address className="not-italic">
                {address.street}
                <br />
                {address.locality}, {address.region} {address.postalCode}
              </address>
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="flex items-center gap-1 text-eyebrow uppercase text-tone-accent">
              <Clock aria-hidden="true" strokeWidth={1.5} className="h-2 w-2" />
              Hours
            </dt>
            <dd className="mt-1 space-y-0.5 text-tone-fg">
              {contact.hours.map((row) => (
                <p key={row.label}>
                  <span className="text-tone-muted">{row.label}: </span>
                  {row.value}
                </p>
              ))}
            </dd>
          </div>
        </dl>

        <MapPlaceholder className="mt-5" />
      </div>

      <div className="tone-light bg-tone-bg px-2 py-8 text-tone-fg sm:px-3 lg:py-12 lg:pl-8 lg:pr-edge">
        <h3 className="text-h3 text-tone-fg">{contactSection.formTitle}</h3>
        <div className="mt-3">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
