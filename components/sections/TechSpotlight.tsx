import { CircleCheck, FileCheck } from 'lucide-react';
import { techSpotlight } from '@/content/siteContent';
import { revealDelay } from '@/lib/reveal';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { PlaceholderTag } from '@/components/ui/PlaceholderTag';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';

/**
 * Layout idea: a featured block, like a product spotlight. The pitch and four short points on the
 * left, and on the right a white "sample shift report" card, so the visitor can picture what they
 * would actually receive. The card is an illustration and says so.
 */
export function TechSpotlight() {
  const { sample } = techSpotlight;

  return (
    <Section id="technology" labelledBy="technology-heading">
      <div className="grid gap-6 lg:grid-cols-12 lg:items-start lg:gap-8">
        <div className="lg:col-span-7">
          <SectionHeading
            id="technology-heading"
            layout="stack"
            eyebrow={techSpotlight.eyebrow}
            title={techSpotlight.title}
            intro={techSpotlight.intro}
          />

          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {techSpotlight.points.map((point, index) => (
              <li key={point.title} data-reveal style={revealDelay(index % 2)} className="flex gap-2">
                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-ink-900 text-brass-300">
                  <Icon name={point.icon} className="h-3 w-3" />
                </span>
                <div>
                  <h3 className="text-h4 text-tone-fg">{point.title}</h3>
                  <p className="mt-0.5 text-sm text-tone-muted">{point.description}</p>
                </div>
              </li>
            ))}
          </ul>

          <div data-reveal className="mt-5">
            <Button href={techSpotlight.cta.href}>{techSpotlight.cta.label}</Button>
          </div>
        </div>

        <div className="lg:col-span-5">
          <figure
            data-reveal
            style={revealDelay(1)}
            className="rounded-lg border border-tone-rule bg-white p-3 lg:sticky lg:top-12 lg:p-4"
          >
            <figcaption className="flex flex-wrap items-center justify-between gap-1 border-b border-tone-rule pb-2">
              <span className="flex items-center gap-1 font-heading text-h4 font-semibold text-tone-fg">
                <FileCheck aria-hidden="true" strokeWidth={1.5} className="h-3 w-3 text-tone-accent" />
                {sample.title}
              </span>
              <PlaceholderTag label="Sample" />
            </figcaption>

            <dl className="mt-2 space-y-1 text-sm">
              {sample.rows.map((row) => (
                <div key={row.label} className="flex justify-between gap-2">
                  <dt className="text-tone-muted">{row.label}</dt>
                  <dd className="text-right font-semibold text-tone-fg">{row.value}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-3 text-eyebrow text-tone-accent">Patrol rounds</p>
            <ol className="mt-1 space-y-1">
              {sample.rounds.map((round, index) => (
                <li
                  key={`${round.place}-${index}`}
                  className="flex items-center justify-between gap-2 rounded-md bg-paper-50 px-1.5 py-1 text-sm"
                >
                  <span className="flex items-center gap-1 text-tone-fg">
                    <CircleCheck aria-hidden="true" strokeWidth={1.75} className="h-2 w-2 text-success" />
                    {round.place}
                  </span>
                  <span className="tabular-nums text-tone-muted">{round.time}</span>
                </li>
              ))}
            </ol>

            <p className="mt-2 text-sm text-tone-fg">
              <span className="font-semibold">Incidents: </span>
              {sample.incidents}
            </p>
            <p className="mt-2 border-t border-tone-rule pt-2 text-sm text-tone-muted">{sample.note}</p>
          </figure>
        </div>
      </div>
    </Section>
  );
}
