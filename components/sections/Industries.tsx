import { industries } from '@/content/siteContent';
import { revealDelay } from '@/lib/reveal';
import { Icon } from '@/components/ui/Icon';
import { Section } from '@/components/ui/Section';
import { SectionHeading } from '@/components/ui/SectionHeading';

/** Layout idea: ten compact tiles (five a row on large screens), each an icon, a name and a one-line note. */
export function Industries() {
  return (
    <Section id="industries" labelledBy="industries-heading">
      <SectionHeading
        id="industries-heading"
        eyebrow={industries.eyebrow}
        title={industries.title}
        intro={industries.intro}
      />

      <ul className="mt-6 grid gap-2 sm:grid-cols-2 lg:mt-8 lg:grid-cols-5">
        {industries.items.map((item, index) => (
          <li key={item.name} data-reveal style={revealDelay(index % 5)} className="flex flex-col rounded-lg border border-tone-rule bg-white p-3">
            <Icon name={item.icon} className="h-3 w-3 text-tone-accent" />
            <h3 className="mt-2 text-h4 text-tone-fg">{item.name}</h3>
            <p className="mt-0.5 text-sm text-tone-muted">{item.note}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
