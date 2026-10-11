import { whyUs } from '@/content/siteContent';
import { Icon } from '@/components/ui/Icon';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';

/**
 * Layout idea: a spec sheet on navy. A centred heading, then five ruled rows in a centred block:
 * the point as a label on the left, the explanation beside it.
 */
export function WhyUs() {
  return (
    <Section id="why-us" tone="dark" labelledBy="why-heading">
      <Reveal>
        <SectionHeading id="why-heading" eyebrow={whyUs.eyebrow} title={whyUs.title} intro={whyUs.intro} />
      </Reveal>

      <ul className="mx-auto mt-6 max-w-wide border-b border-tone-rule lg:mt-8">
        {whyUs.points.map((point, index) => (
          <li key={point.title} className="border-t border-tone-rule">
            <Reveal
              delay={Math.min(index, 2) * 0.08}
              className="grid gap-1.5 py-3 md:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)] md:gap-4 lg:py-4"
            >
              <div className="flex items-start gap-1.5">
                <Icon name={point.icon} className="mt-0.5 h-3 w-3 shrink-0 text-tone-accent" />
                <h3 className="text-h3 text-tone-fg">{point.title}</h3>
              </div>
              <p className="text-tone-muted">{point.description}</p>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
