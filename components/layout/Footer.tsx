import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import { company, contact, footer, nav, quoteCta, services } from '@/content/siteContent';
import { Container } from '@/components/ui/Container';
import { Logo } from '@/components/ui/Logo';

const columnHeading = 'font-sans text-eyebrow text-tone-accent';
const linkClass = 'text-sm text-tone-muted transition-colors hover:text-tone-fg';

export function Footer() {
  const year = new Date().getFullYear();
  const { address } = contact;
  // Only links that have a real address are shown, so nothing points nowhere.
  const social = footer.social.filter((item) => item.href.trim() !== '');

  return (
    <footer className="tone-dark bg-ink-950 text-tone-fg">
      <Container className="pb-12 pt-8 md:pb-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-12 lg:gap-4">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-2 max-w-narrow text-sm text-tone-muted">{footer.about}</p>
            <p className="mt-3 inline-flex rounded border border-tone-rule px-1.5 py-1 text-sm text-tone-muted">
              {company.licence.label}:&nbsp;<span className="text-tone-fg">{company.licence.value}</span>
            </p>
            {social.length > 0 ? (
              <ul aria-label="Social media" className="mt-3 flex flex-wrap gap-1">
                {social.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-5 items-center rounded border border-tone-rule px-1.5 text-sm font-semibold text-tone-muted transition-colors hover:border-tone-muted hover:text-tone-fg"
                    >
                      {item.label}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <nav aria-label="Footer" className="lg:col-span-2">
            <h2 className={columnHeading}>Quick links</h2>
            <ul className="mt-2 space-y-1">
              {[...nav, quoteCta].map((item) => (
                <li key={item.href + item.label}>
                  <a href={item.href} className={linkClass}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <h2 className={`${columnHeading} mt-4`}>Policy</h2>
            <ul className="mt-2 space-y-1">
              <li>
                <Link href="/privacy-policy" className={linkClass}>
                  Privacy policy
                </Link>
              </li>
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className={columnHeading}>Services</h2>
            <ul className="mt-2 space-y-1">
              {services.map((service) => (
                <li key={service.id}>
                  <a href="/#services" className={linkClass}>
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className={columnHeading}>Contact</h2>
            <ul className="mt-2 space-y-1.5 text-sm text-tone-muted">
              <li className="flex gap-1.5">
                <Phone aria-hidden="true" strokeWidth={1.5} className="mt-0.5 h-2 w-2 shrink-0 text-tone-accent" />
                <a href={`tel:${contact.phone.href}`} className="font-semibold text-tone-fg transition-colors hover:text-brass-300">
                  {contact.phone.display}
                </a>
              </li>
              <li className="flex gap-1.5">
                <Mail aria-hidden="true" strokeWidth={1.5} className="mt-0.5 h-2 w-2 shrink-0 text-tone-accent" />
                <a href={`mailto:${contact.email}`} className="break-all transition-colors hover:text-tone-fg">
                  {contact.email}
                </a>
              </li>
              <li className="flex gap-1.5">
                <MapPin aria-hidden="true" strokeWidth={1.5} className="mt-0.5 h-2 w-2 shrink-0 text-tone-accent" />
                <address className="not-italic">
                  {address.street}, {address.locality}
                  <br />
                  {address.region} {address.postalCode}
                </address>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-1 border-t border-tone-rule pt-3 text-sm text-tone-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {company.name}. All rights reserved.
          </p>
          <a href="#top" className="transition-colors hover:text-tone-fg">
            Back to top
          </a>
        </div>
      </Container>
    </footer>
  );
}
