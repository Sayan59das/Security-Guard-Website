import { servicesSection, services } from '@/content/siteContent';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ServiceCard } from '@/components/ServiceCard';

/**
 * Layout idea: a centred heading above an open, ruled 3 x 2 grid. Hairlines between the cells
 * instead of six floating cards, so it reads like a register page.
 */
export function Services() {
  return (
    <Section id="services" labelledBy="services-heading">
      <Reveal>
        <SectionHeading
          id="services-heading"
          eyebrow={servicesSection.eyebrow}
          title={servicesSection.title}
          intro={servicesSection.intro}
        />
      </Reveal>

      <ul className="mt-6 grid border-l border-t border-tone-rule sm:grid-cols-2 lg:mt-8 lg:grid-cols-3">
        {services.map((service, index) => (
          <li key={service.id} className="border-b border-r border-tone-rule">
            <Reveal delay={(index % 3) * 0.12} className="h-full">
              <ServiceCard service={service} index={index + 1} />
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
