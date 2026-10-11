import { whyUs } from '@/content/siteContent';
import { revealDelay } from '@/lib/reveal';
import { Icon } from '@/components/ui/Icon';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { cn } from '@/lib/cn';

/**
 * Layout idea: five promises on navy. Four sit in quiet raised panels; the featured one (the
 * replacement guarantee, the promise worried clients care about most) spans two columns in
 * brass, so it is the one thing people remember from this section.
 */
export function WhyUs() {
  return (
    <Section id="why-us" tone="dark" labelledBy="why-heading">
      <SectionHeading id="why-heading" eyebrow={whyUs.eyebrow} title={whyUs.title} intro={whyUs.intro} />

      <ul className="mt-6 grid gap-2 md:grid-cols-2 lg:mt-8 lg:grid-cols-3 lg:gap-3">
        {whyUs.points.map((point, index) => {
          const featured = 'featured' in point && point.featured;
          return (
            <li
              key={point.title}
              data-reveal
              style={revealDelay(index % 3)}
              className={cn(
                'rounded-lg border p-3 lg:p-4',
                featured
                  ? 'border-brass-500 bg-brass-500 text-ink-950 md:col-span-2 lg:col-span-2'
                  : 'border-tone-rule bg-ink-800',
              )}
            >
              <Icon name={point.icon} className={cn('h-3 w-3', featured ? 'text-ink-950' : 'text-tone-accent')} />
              <h3 className={cn('mt-2', featured ? 'text-h2 text-ink-950' : 'text-h3 text-tone-fg')}>{point.title}</h3>
              <p className={cn('mt-1', featured ? 'max-w-prose text-lead text-ink-900' : 'text-tone-muted')}>
                {point.description}
              </p>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
