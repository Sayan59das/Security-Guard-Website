import { Phone } from 'lucide-react';
import { contact, ctaBand, quoteCta } from '@/content/siteContent';
import { revealDelay } from '@/lib/reveal';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';

/**
 * A short navy band with a brass top edge: one sentence and the two actions, placed after the
 * testimonials, which is where a visitor who has read this far usually decides.
 */
export function CtaBand() {
  return (
    <section aria-labelledby="cta-heading" className="tone-dark border-t-4 border-brass-500 bg-ink-900 text-tone-fg">
      <Container className="grid gap-4 py-8 lg:grid-cols-12 lg:items-center lg:gap-8 lg:py-10">
        <div data-reveal className="lg:col-span-7">
          <h2 id="cta-heading" className="text-h2 text-tone-fg">
            {ctaBand.title}
          </h2>
          <p className="mt-2 max-w-prose text-lead text-tone-muted">{ctaBand.body}</p>
        </div>
        <div data-reveal style={revealDelay(1)} className="flex flex-col gap-1.5 xs:flex-row lg:col-span-5 lg:justify-end">
          <Button href={quoteCta.href} size="lg">
            {quoteCta.label}
          </Button>
          <Button href={`tel:${contact.phone.href}`} variant="secondary" size="lg">
            <Phone aria-hidden="true" strokeWidth={1.5} className="h-2 w-2" />
            Call {contact.phone.display}
          </Button>
        </div>
      </Container>
    </section>
  );
}
