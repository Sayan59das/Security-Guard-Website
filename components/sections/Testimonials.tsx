import { testimonials, testimonialsSection } from '@/content/siteContent';
import { TestimonialCarousel } from '@/components/TestimonialCarousel';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';

/**
 * Layout idea: white panels on sand in a sideways-scrolling row (three visible on a wide screen,
 * Previous / Next buttons for the rest). Quotes are PLACEHOLDERS until `placeholder: false` in the
 * content file.
 */
export function Testimonials() {
  return (
    <Section id="testimonials" tone="sand" labelledBy="testimonials-heading">
      <SectionHeading id="testimonials-heading" eyebrow={testimonialsSection.eyebrow} title={testimonialsSection.title} />

      <div data-reveal className="mt-4 lg:mt-5">
        <TestimonialCarousel items={testimonials} />
      </div>
    </Section>
  );
}
