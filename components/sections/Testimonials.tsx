import { Quote } from 'lucide-react';
import { testimonials, testimonialsSection } from '@/content/siteContent';
import { revealDelay } from '@/lib/reveal';
import { PlaceholderTag } from '@/components/ui/PlaceholderTag';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';

/**
 * Layout idea: three equal white panels on sand, the attribution pinned to the bottom so the
 * three line up. Quotes are PLACEHOLDERS until `placeholder: false` in the content file.
 */
export function Testimonials() {
  return (
    <Section id="testimonials" tone="sand" labelledBy="testimonials-heading">
      <SectionHeading id="testimonials-heading" eyebrow={testimonialsSection.eyebrow} title={testimonialsSection.title} />

      <div className="mt-6 grid gap-2 md:grid-cols-3 lg:mt-8 lg:gap-3">
        {testimonials.map((item, index) => (
          <figure
            key={`${item.name}|${item.role}`}
            data-reveal
            style={revealDelay(index)}
            className="flex h-full flex-col rounded-lg border border-tone-rule bg-white p-3 lg:p-4"
          >
            <Quote aria-hidden="true" strokeWidth={1.5} className="h-4 w-4 text-brass-500" />
            <blockquote className="mt-2 text-lead text-tone-fg">
              <p>{item.quote}</p>
            </blockquote>
            <figcaption className="mt-auto pt-3">
              <div className="flex flex-col items-start gap-1 border-t border-tone-rule pt-2">
                <span>
                  <span className="block font-semibold text-tone-fg">{item.name}</span>
                  <span className="block text-sm text-tone-muted">{item.role}</span>
                </span>
                {item.placeholder ? <PlaceholderTag /> : null}
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
