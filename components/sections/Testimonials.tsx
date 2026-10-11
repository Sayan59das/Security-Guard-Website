import { Quote } from 'lucide-react';
import { testimonials, testimonialsSection } from '@/content/siteContent';
import { PlaceholderTag } from '@/components/ui/PlaceholderTag';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';

/**
 * Layout idea: three equal columns, each a quote under a hairline with the attribution pinned
 * to the bottom so the three line up. Quotes are PLACEHOLDERS until `placeholder: false`
 * in the content file.
 */
export function Testimonials() {
  return (
    <Section id="testimonials" tone="sand" labelledBy="testimonials-heading">
      <Reveal>
        <SectionHeading
          id="testimonials-heading"
          eyebrow={testimonialsSection.eyebrow}
          title={testimonialsSection.title}
        />
      </Reveal>

      <div className="mt-6 grid gap-5 md:grid-cols-3 md:gap-4 lg:mt-8 lg:gap-6">
        {testimonials.map((item, index) => (
          <Reveal key={item.role} delay={index * 0.12} className="h-full">
            <figure className="flex h-full flex-col border-t border-tone-fg pt-3">
              <Quote aria-hidden="true" strokeWidth={1.5} className="h-4 w-4 text-tone-accent" />
              <blockquote className="mt-2 font-serif text-h3 text-tone-fg">
                <p>{item.quote}</p>
              </blockquote>
              <figcaption className="mt-auto flex flex-col items-start gap-1 pt-3">
                <span>
                  <span className="block font-semibold text-tone-fg">{item.name}</span>
                  <span className="block text-sm text-tone-muted">{item.role}</span>
                </span>
                {item.placeholder ? <PlaceholderTag /> : null}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
