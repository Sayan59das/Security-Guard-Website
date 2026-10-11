import { servicesSection, type Service } from '@/content/siteContent';
import { Icon } from '@/components/ui/Icon';
import { ServiceQuoteLink } from '@/components/ServiceQuoteLink';

interface ServiceCardProps {
  service: Service;
}

/**
 * One service: a navy icon tile (like a uniform patch), the title, a short description and a
 * link that opens the form with this service already chosen. The link stretches over the whole
 * card, so the card is one large click target; on hover the card lifts slightly and its border
 * turns brass, to show it can be clicked.
 */
export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="group relative flex h-full flex-col rounded-lg border border-tone-rule bg-white p-3 transition duration-300 hover:-translate-y-0.5 hover:border-brass-500 hover:shadow-lift has-[a:focus-visible]:border-brass-500 lg:p-4">
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-ink-900 text-brass-300 transition-colors duration-300 group-hover:bg-brass-500 group-hover:text-ink-950">
        <Icon name={service.icon} className="h-3 w-3" />
      </span>
      <h3 className="mt-3 text-h3 text-tone-fg">{service.title}</h3>
      <p className="mt-1 flex-1 text-tone-muted">{service.description}</p>
      <ServiceQuoteLink service={service.title} label={servicesSection.cardCta} />
    </article>
  );
}
