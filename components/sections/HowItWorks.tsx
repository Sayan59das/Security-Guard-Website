import Image from 'next/image';
import { howItWorks } from '@/content/siteContent';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';

/**
 * Layout idea: a numbered process. Centred heading, a centred photo, then four equal columns,
 * each with a large serif numeral under a hairline. On a phone the four steps stack.
 */
export function HowItWorks() {
  return (
    <Section id="how-it-works" tone="sand" labelledBy="how-heading">
      <Reveal>
        <SectionHeading id="how-heading" eyebrow={howItWorks.eyebrow} title={howItWorks.title} intro={howItWorks.intro} />
      </Reveal>

      <Reveal className="mt-6 lg:mt-8">
        <div className="relative aspect-[16/9] overflow-hidden rounded-md border border-tone-rule bg-ink-800 sm:aspect-[2/1] lg:aspect-[5/2]">
          <Image
            src={howItWorks.image.src}
            alt={howItWorks.image.alt}
            fill
            sizes="(min-width: 1200px) 1136px, 100vw"
            className="object-cover"
          />
        </div>
      </Reveal>

      <ol className="mt-6 grid gap-x-4 gap-y-5 md:grid-cols-2 lg:mt-8 lg:grid-cols-4">
        {howItWorks.steps.map((step, index) => (
          <li key={step.title} className="border-t border-tone-fg pt-3">
            <Reveal delay={(index % 4) * 0.1}>
              <span aria-hidden="true" className="block font-serif text-display leading-none text-tone-accent">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-2 text-h3 text-tone-fg">{step.title}</h3>
              <p className="mt-1 text-tone-muted">{step.description}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
