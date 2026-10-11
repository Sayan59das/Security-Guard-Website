import { Phone } from 'lucide-react';
import { contact, faqSection, faqs } from '@/content/siteContent';
import { revealDelay } from '@/lib/reveal';
import { FAQItem } from '@/components/FAQItem';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';

/**
 * Layout idea: heading and a direct phone line on the left (they stay in view on large
 * screens), the questions on the right in one white panel.
 */
export function FAQ() {
  return (
    <Section id="faq" labelledBy="faq-heading">
      <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-12">
            <SectionHeading
              id="faq-heading"
              layout="stack"
              eyebrow={faqSection.eyebrow}
              title={faqSection.title}
              intro={faqSection.intro}
            />
            <div data-reveal style={revealDelay(1)} className="mt-4 rounded-lg bg-ink-900 p-3 text-paper-100">
              <p className="text-sm text-ink-300">{faqSection.callLabel}</p>
              <a
                href={`tel:${contact.phone.href}`}
                className="tone-dark mt-0.5 inline-flex items-center gap-1 font-heading text-h3 font-semibold text-brass-300 underline decoration-ink-600 decoration-1 underline-offset-4 transition-colors hover:decoration-brass-300"
              >
                <Phone aria-hidden="true" strokeWidth={1.5} className="h-2 w-2" />
                {contact.phone.display}
              </a>
            </div>
          </div>
        </div>

        <div
          data-reveal
          style={revealDelay(1)}
          className="divide-y divide-tone-rule rounded-lg border border-tone-rule bg-white px-3 lg:col-span-8 lg:px-4"
        >
          {faqs.map((faq, index) => (
            <FAQItem key={faq.question} question={faq.question} answer={faq.answer} defaultOpen={index === 0} />
          ))}
        </div>
      </div>
    </Section>
  );
}
