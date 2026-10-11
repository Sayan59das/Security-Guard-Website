import { servicesSection, services } from '@/content/siteContent';
import { revealDelay } from '@/lib/reveal';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ServiceCard } from '@/components/ServiceCard';

/** Layout idea: a split heading over a 3 x 2 grid of white service cards. */
export function Services() {
  return (
    <Section id="services" labelledBy="services-heading">
      <SectionHeading
        id="services-heading"
        eyebrow={servicesSection.eyebrow}
        title={servicesSection.title}
        intro={servicesSection.intro}
      />

      <ul className="mt-6 grid gap-2 sm:grid-cols-2 lg:mt-8 lg:grid-cols-3 lg:gap-3">
        {services.map((service, index) => (
          <li key={service.id} data-reveal style={revealDelay(index % 3)}>
            <ServiceCard service={service} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
