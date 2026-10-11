import Image from 'next/image';
import { howItWorks } from '@/content/siteContent';
import { revealDelay } from '@/lib/reveal';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';

/**
 * Layout idea: the photo on the left (it stays in view on large screens), and the four steps on
 * the right as a numbered timeline joined by a line, because this content really is a sequence.
 */
export function HowItWorks() {
  const lastIndex = howItWorks.steps.length - 1;

  return (
    <Section id="how-it-works" tone="sand" labelledBy="how-heading">
      <SectionHeading id="how-heading" eyebrow={howItWorks.eyebrow} title={howItWorks.title} intro={howItWorks.intro} />

      <div className="mt-6 grid gap-6 lg:mt-8 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-12">
            <div data-reveal className="relative aspect-[4/3] overflow-hidden rounded-lg border border-tone-rule bg-ink-800">
              <Image
                src={howItWorks.image.src}
                alt={howItWorks.image.alt}
                fill
                sizes="(min-width: 1200px) 460px, (min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <ol className="lg:col-span-7">
          {howItWorks.steps.map((step, index) => (
            <li key={step.title} data-reveal style={revealDelay(index)} className="relative flex gap-3 pb-5 last:pb-0">
              {index < lastIndex ? (
                <span aria-hidden="true" className="absolute bottom-0 left-3 top-6 w-[2px] -translate-x-1/2 bg-paper-300" />
              ) : null}
              <span
                aria-hidden="true"
                className="relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink-900 font-heading text-h4 font-semibold text-brass-300"
              >
                {index + 1}
              </span>
              <div className="pt-1">
                <h3 className="text-h3 text-tone-fg">{step.title}</h3>
                <p className="mt-1 max-w-prose text-tone-muted">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
