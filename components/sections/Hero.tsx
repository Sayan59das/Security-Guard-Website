import Image from 'next/image';
import { Phone } from 'lucide-react';
import { contact, hero } from '@/content/siteContent';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { PlaceholderTag } from '@/components/ui/PlaceholderTag';
import { cn } from '@/lib/cn';

/** Staggered entrance for the hero text. `motion-safe:` keeps it off for reduced-motion visitors. */
const rise = 'motion-safe:animate-rise';

/**
 * Layout idea: a clean split on plain navy, where nothing sits on top of anything else. The
 * headline, one supporting line and the two actions on the left; the photo in its own frame on
 * the right (a brass line a constant 8px outside it); a row of trust figures underneath.
 * On phones the photo follows the buttons. Entrance: the text rises in a stagger while the
 * photo fades in and settles from very slightly larger; both start within 120ms of first paint.
 */
export function Hero() {
  const hasSampleStats = hero.stats.some((stat) => stat.placeholder);

  return (
    <section id="top" aria-labelledby="hero-heading" className="tone-dark bg-tone-bg text-tone-fg">
      <Container className="grid items-center gap-6 pb-8 pt-6 lg:grid-cols-12 lg:gap-8 lg:pb-10 lg:pt-10">
        <div className="lg:col-span-7">
          <p className={cn('mb-3 flex items-center gap-1 text-eyebrow text-tone-accent', rise)}>
            <span aria-hidden="true" className="h-[2px] w-3 bg-brass-500" />
            {hero.eyebrow}
          </p>
          <h1 id="hero-heading" className={cn('max-w-[15em] text-display text-tone-fg', rise)} style={{ animationDelay: '80ms' }}>
            {hero.headline}
          </h1>
          <p className={cn('mt-3 max-w-measure text-lead text-tone-muted', rise)} style={{ animationDelay: '200ms' }}>
            {hero.supporting}
          </p>
          <div
            className={cn('mt-4 flex flex-col items-stretch gap-1.5 xs:flex-row xs:items-center', rise)}
            style={{ animationDelay: '320ms' }}
          >
            <Button href={hero.primaryCta.href} size="lg">
              {hero.primaryCta.label}
            </Button>
            <Button href={`tel:${contact.phone.href}`} variant="secondary" size="lg">
              <Phone aria-hidden="true" strokeWidth={1.5} className="h-2 w-2" />
              <span className="lg:hidden">{hero.secondaryCta.label}</span>
              <span className="hidden lg:inline">Call {contact.phone.display}</span>
            </Button>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-lg border border-brass-500 p-1 motion-safe:animate-fade-in" style={{ animationDelay: '120ms' }}>
            <div className="relative aspect-[16/10] overflow-hidden rounded-md bg-ink-800 lg:aspect-[4/5]">
              <Image
                src={hero.image.src}
                alt={hero.image.alt}
                fill
                priority
                sizes="(min-width: 1200px) 440px, (min-width: 1024px) 38vw, 100vw"
                className="object-cover motion-safe:animate-settle"
                style={{ animationDelay: '120ms' }}
              />
            </div>
          </div>
        </div>
      </Container>

      <div className="border-t border-tone-rule bg-ink-950">
        <Container className="py-3">
          <dl className="grid grid-cols-3">
            {hero.stats.map((stat, index) => (
              <div
                key={stat.label}
                className={cn('flex flex-col-reverse gap-0.5 px-1 sm:px-3', index > 0 && 'border-l border-tone-rule', index === 0 && 'pl-0 sm:pl-0')}
              >
                <dt className="text-sm text-tone-muted">{stat.label}</dt>
                <dd className="font-heading text-stat font-semibold text-tone-accent">{stat.value}</dd>
              </div>
            ))}
          </dl>
          {hasSampleStats ? (
            <p className="mt-2 flex flex-wrap items-center gap-1 text-sm text-tone-muted">
              <PlaceholderTag label="Sample figures" />
              Replace these with your real numbers in content/siteContent.ts.
            </p>
          ) : null}
        </Container>
      </div>
    </section>
  );
}
