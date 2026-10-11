import { Phone } from 'lucide-react';
import { contact, faqSection, faqs } from '@/content/siteContent';
import { FAQItem } from '@/components/FAQItem';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';

/**
 * Layout idea: a single centred column. Heading above, accordion in a reading-width column,
 * and a direct phone link centred underneath.
 */
export function FAQ() {
  return (
    <Section id="faq" labelledBy="faq-heading">
      <Reveal>
        <SectionHeading id="faq-heading" eyebrow={faqSection.eyebrow} title={faqSection.title} intro={faqSection.intro} />
      </Reveal>

      <Reveal className="mx-auto mt-6 max-w-reading lg:mt-8">
        <div className="border-b border-tone-rule">
          {faqs.map((faq, index) => (
            <FAQItem key={faq.question} question={faq.question} answer={faq.answer} defaultOpen={index === 0} />
          ))}
        </div>
        <p className="mt-4 text-center">
          <a
            href={`tel:${contact.phone.href}`}
            className="inline-flex items-center gap-1 font-semibold text-tone-accent underline decoration-1 underline-offset-4 hover:decoration-2"
          >
            <Phone aria-hidden="true" strokeWidth={1.5} className="h-2 w-2" />
            {contact.phone.display}
          </a>
        </p>
      </Reveal>
    </Section>
  );
}
