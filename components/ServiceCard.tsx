import type { Service } from '@/content/siteContent';
import { Icon } from '@/components/ui/Icon';

interface ServiceCardProps {
  service: Service;
  /** 1-based position, shown as 01, 02 ... like entries in a register. */
  index: number;
}

/**
 * One cell of the services grid. It has no box of its own: the hairlines come from the
 * grid it sits in, so the six services read as one ruled ledger rather than six cards.
 */
export function ServiceCard({ service, index }: ServiceCardProps) {
  return (
    <article className="h-full p-3 lg:p-4">
      <div className="flex items-center justify-between">
        <span className="inline-flex h-6 w-6 items-center justify-center rounded border border-tone-rule text-tone-accent">
          <Icon name={service.icon} className="h-3 w-3" />
        </span>
        <span aria-hidden="true" className="font-serif text-h3 text-tone-muted">
          {String(index).padStart(2, '0')}
        </span>
      </div>
      <h3 className="mt-3 text-h3 text-tone-fg sm:min-h-8">{service.title}</h3>
      <p className="mt-1 text-tone-muted">{service.description}</p>
    </article>
  );
}
