import { industries } from '@/content/siteContent';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';

/**
 * Layout idea: pure typography. A centred heading above a two-column ruled list (five rows a
 * side) where each row is a serif name with a one-line note. No boxes, no icons.
 */
export function Industries() {
  return (
    <Section id="industries" labelledBy="industries-heading">
      <Reveal>
        <SectionHeading
          id="industries-heading"
          eyebrow={industries.eyebrow}
          title={industries.title}
          intro={industries.intro}
        />
      </Reveal>

      <ul className="mt-6 grid border-b border-tone-rule md:grid-cols-2 md:gap-x-8 lg:mt-8 lg:gap-x-12">
        {industries.items.map((item, index) => (
          <li key={item.name} className="border-t border-tone-rule py-3">
            <Reveal delay={(index % 2) * 0.08}>
              <h3 className="text-h3 text-tone-fg">{item.name}</h3>
              <p className="mt-0.5 text-tone-muted">{item.note}</p>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
