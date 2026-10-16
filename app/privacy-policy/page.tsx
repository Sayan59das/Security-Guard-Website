import type { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import { contact, privacyPolicy } from '@/content/siteContent';
import { Container } from '@/components/ui/Container';
import { PlaceholderTag } from '@/components/ui/PlaceholderTag';

export const metadata: Metadata = {
  title: privacyPolicy.title,
  description: privacyPolicy.intro,
  alternates: { canonical: '/privacy-policy' },
};

export default function PrivacyPolicyPage() {
  return (
    <article aria-labelledby="privacy-heading" className="tone-light bg-tone-bg py-8 text-tone-fg lg:py-12">
      <Container>
        <div className="max-w-reading">
          <a
            href="/"
            className="mb-4 inline-flex items-center gap-1 text-sm font-semibold text-tone-accent underline underline-offset-4"
          >
            <ArrowLeft aria-hidden="true" strokeWidth={1.75} className="h-2 w-2" />
            Back to the home page
          </a>

          <p className="mb-1.5 flex items-center gap-1 text-eyebrow text-tone-accent">
            <span aria-hidden="true" className="h-[2px] w-3 bg-brass-500" />
            Policy
          </p>
          <h1 id="privacy-heading" className="text-h2 text-tone-fg">
            {privacyPolicy.title}
          </h1>
          <p className="mt-2 flex flex-wrap items-center gap-1 text-sm text-tone-muted">
            Last updated: {privacyPolicy.updated}
            {privacyPolicy.updated.startsWith('[') ? <PlaceholderTag label="Add the date" /> : null}
          </p>
          <p className="mt-3 text-lead text-tone-muted">{privacyPolicy.intro}</p>

          <div className="mt-5 space-y-5">
            {privacyPolicy.sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-h3 text-tone-fg">{section.title}</h2>
                <div className="mt-1 space-y-1.5 text-tone-muted">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <p className="mt-6 rounded-lg border border-tone-rule bg-white p-3 text-tone-fg">
            Phone:{' '}
            <a href={`tel:${contact.phone.href}`} className="font-semibold underline underline-offset-4">
              {contact.phone.display}
            </a>
            <br />
            Email:{' '}
            <a href={`mailto:${contact.email}`} className="break-all font-semibold underline underline-offset-4">
              {contact.email}
            </a>
          </p>
        </div>
      </Container>
    </article>
  );
}
