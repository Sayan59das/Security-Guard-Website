import { clients, clientsSection } from '@/content/siteContent';
import { ClientMarquee } from '@/components/ClientMarquee';
import { Container } from '@/components/ui/Container';
import { PlaceholderTag } from '@/components/ui/PlaceholderTag';

/**
 * A slim band between Industries and Testimonials: the people who already rely on the company.
 * Same paper tone as Industries, with hairlines above and below so it reads as its own strip.
 */
export function Clients() {
  const hasSampleClients = clients.some((client) => client.placeholder);

  return (
    <section
      id="clients"
      aria-labelledby="clients-heading"
      className="tone-light border-y border-tone-rule bg-tone-bg py-6 text-tone-fg lg:py-8"
    >
      <Container>
        <div data-reveal className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <p className="mb-1 flex items-center gap-1 text-eyebrow text-tone-accent">
              <span aria-hidden="true" className="h-[2px] w-3 bg-brass-500" />
              {clientsSection.eyebrow}
            </p>
            <h2 id="clients-heading" className="text-h3 text-tone-fg">
              {clientsSection.title}
            </h2>
          </div>
          {hasSampleClients ? <PlaceholderTag label="Placeholder client names" /> : null}
        </div>
      </Container>

      <div data-reveal className="mx-auto mt-4 w-full max-w-container px-2 sm:px-3 lg:px-4">
        <ClientMarquee items={clients} />
      </div>
    </section>
  );
}
