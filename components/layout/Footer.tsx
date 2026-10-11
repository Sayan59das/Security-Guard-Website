import { Mail, MapPin, Phone } from 'lucide-react';
import { company, contact, footer, nav, quoteCta } from '@/content/siteContent';
import { Container } from '@/components/ui/Container';
import { Logo } from '@/components/ui/Logo';

export function Footer() {
  const year = new Date().getFullYear();
  const { address } = contact;

  return (
    <footer className="tone-dark bg-ink-950 text-tone-fg">
      <Container className="pb-12 pt-8 md:pb-6">
        <div className="grid gap-6 md:grid-cols-3 md:gap-4">
          <div>
            <Logo />
            <p className="mt-2 max-w-narrow text-sm text-tone-muted">{footer.about}</p>
            <p className="mt-3 text-sm text-tone-muted">
              {company.licence.label}: <span className="text-tone-fg">{company.licence.value}</span>
            </p>
          </div>

          <nav aria-label="Footer">
            <h2 className="font-sans text-eyebrow uppercase text-tone-accent">Quick links</h2>
            <ul className="mt-2 space-y-1">
              {[...nav, quoteCta].map((item) => (
                <li key={item.href + item.label}>
                  <a href={item.href} className="text-sm text-tone-muted transition-colors hover:text-tone-fg">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-sans text-eyebrow uppercase text-tone-accent">Contact</h2>
            <ul className="mt-2 space-y-1.5 text-sm text-tone-muted">
              <li className="flex gap-1.5">
                <Phone aria-hidden="true" strokeWidth={1.5} className="mt-0.5 h-2 w-2 shrink-0 text-tone-accent" />
                <a href={`tel:${contact.phone.href}`} className="transition-colors hover:text-tone-fg">
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
