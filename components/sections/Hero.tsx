import Image from 'next/image';
import { Phone } from 'lucide-react';
import { contact, hero } from '@/content/siteContent';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { PlaceholderTag } from '@/components/ui/PlaceholderTag';
import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/lib/cn';

/** Staggered entrance for the hero text. `motion-safe:` keeps it off for reduced-motion visitors. */
const rise = 'motion-safe:animate-rise';

/**
 * Layout idea: one centred axis. Eyebrow, headline, supporting line and the two buttons are
 * centred; below them a wide photo sits inside an evenly spaced double frame (a brass line a
 * constant 8px outside the photo on every side); then three equal trust figures divided by
 * hairlines. The headline block animates in with CSS on load. The photo is deliberately not
 * animated, so the largest element paints as early as possible.
 */
export function Hero() {
  const hasSampleStats = hero.stats.some((stat) => stat.placeholder);

  return (
    <section id="top" aria-labelledby="hero-heading" className="tone-dark bg-tone-bg text-tone-fg">
      <Container className="pb-8 pt-8 lg:pb-10 lg:pt-12">
        <div className="mx-auto max-w-wide text-center">
          <p
            className={cn('mb-3 flex items-center justify-center gap-1.5 text-eyebrow uppercase text-tone-accent', rise)}
          >
            <span aria-hidden="true" className="h-px w-5 bg-tone-accent" />
            {hero.eyebrow}
            <span aria-hidden="true" className="h-px w-5 bg-tone-accent" />
          </p>
          <h1 id="hero-heading" className={cn('text-display text-tone-fg', rise)} style={{ animationDelay: '80ms' }}>
            {hero.headline}
          </h1>
          <p
            className={cn('mx-auto mt-3 max-w-measure text-lead text-tone-muted', rise)}
            style={{ animationDelay: '200ms' }}
          >
            {hero.supporting}
          </p>
          <div
            className={cn('mt-4 flex flex-col items-stretch justify-center gap-1.5 xs:flex-row xs:items-center', rise)}
            style={{ animationDelay: '320ms' }}
          >
            <Button href={hero.primaryCta.href} size="lg">
              {hero.primaryCta.label}
            </Button>
            <Button href={`tel:${contact.phone.href}`} variant="secondary" size="lg">
              <Phone aria-hidden="true" strokeWidth={1.5} className="h-2 w-2" />
              {hero.secondaryCta.label}
            </Button>
          </div>
        </div>

        <div className="mt-6 rounded-md border border-brass-500 p-1 lg:mt-8">
          <div className="relative aspect-[4/3] overflow-hidden rounded border border-tone-rule bg-ink-800 sm:aspect-[16/9] lg:aspect-[21/9]">
            <Image
              src={hero.image.src}
              alt={hero.image.alt}
              fill
              priority
              sizes="(min-width: 1200px) 1136px, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <Reveal className="mt-6 lg:mt-8">
          <dl className="grid grid-cols-3 border-y border-tone-rule">
            {hero.stats.map((stat, index) => (
              <div
                key={stat.label}
                className={cn('flex flex-col-reverse items-center justify-end px-1 py-3 text-center', index > 0 && 'border-l border-tone-rule')}
              >
                <dt className="mt-1 text-sm text-tone-muted">{stat.label}</dt>
                <dd className="font-serif text-stat text-tone-accent">{stat.value}</dd>
              </div>
            ))}
          </dl>
          {hasSampleStats ? (
            <p className="mt-2 flex flex-wrap items-center justify-center gap-1 text-center text-sm text-tone-muted">
              <PlaceholderTag label="Sample figures" />
              Replace these with your real numbers in content/siteContent.ts.
            </p>
          ) : null}
        </Reveal>
      </Container>
    </section>
  );
}
