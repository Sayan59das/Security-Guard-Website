import { impact } from '@/content/siteContent';
import { revealDelay } from '@/lib/reveal';
import { CountUp } from '@/components/CountUp';
import { Icon } from '@/components/ui/Icon';
import { PlaceholderTag } from '@/components/ui/PlaceholderTag';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';

/**
 * Layout idea: six figures in white tiles on sand, each with a navy icon tile and a number that
 * counts up as the section scrolls into view. The figures are placeholders until the content file
 * says otherwise, and a visible note says so.
 */
export function Impact() {
  const hasSampleStats = impact.stats.some((stat) => stat.placeholder);

  return (
    <Section id="impact" tone="sand" labelledBy="impact-heading">
      <SectionHeading id="impact-heading" eyebrow={impact.eyebrow} title={impact.title} intro={impact.intro} />

      <dl className="mt-6 grid grid-cols-2 gap-2 lg:mt-8 lg:grid-cols-3 lg:gap-3">
        {impact.stats.map((stat, index) => (
          <div
            key={stat.label}
            data-reveal
            style={revealDelay(index % 3)}
            className="flex flex-col rounded-lg border border-tone-rule bg-white p-3 lg:p-4"
          >
            {/* The figure is shown first and the label under it, but the label stays first in the
                markup, as a definition list needs. */}
            <dt className="order-2 mt-0.5 text-tone-muted">{stat.label}</dt>
            <dd className="order-1">
              <span
                aria-hidden="true"
                className="mb-2 inline-flex h-5 w-5 items-center justify-center rounded-md bg-ink-900 text-brass-300"
              >
                <Icon name={stat.icon} className="h-2 w-2" />
              </span>
              <span className="block font-heading text-display text-tone-fg">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </span>
            </dd>
          </div>
        ))}
      </dl>

      {hasSampleStats ? (
        <p className="mt-3 flex flex-wrap items-center gap-1 text-sm text-tone-muted">
          <PlaceholderTag label="Sample figures" />
          Replace these with your real numbers in content/siteContent.ts.
        </p>
      ) : null}
    </Section>
  );
}
