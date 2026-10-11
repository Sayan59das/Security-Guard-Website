import type { Metadata, Viewport } from 'next';
import { Fraunces, Instrument_Sans } from 'next/font/google';
import { company, seo } from '@/content/siteContent';
import { SITE_URL } from '@/lib/siteUrl';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileActionBar } from '@/components/layout/MobileActionBar';
import { SmoothAnchors } from '@/components/SmoothAnchors';
import { JsonLd } from '@/components/JsonLd';
import './globals.css';

// Headings: Fraunces, a serif with real character. The optical-size axis lets it
// tighten up at large sizes; WONK is included so it can be switched off in CSS.
const fraunces = Fraunces({
  subsets: ['latin'],
  axes: ['opsz', 'WONK'],
  variable: '--font-fraunces',
  display: 'swap',
});

// Body and UI: Instrument Sans, clean and slightly warm, and not Inter.
const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-instrument',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: seo.title, template: `%s | ${company.name}` },
  description: seo.description,
  keywords: [...seo.keywords],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: '/',
    siteName: company.name,
    title: seo.title,
    description: seo.description,
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: `${company.name}: security guard services` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: seo.title,
    description: seo.description,
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#101B27',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${fraunces.variable} ${instrumentSans.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-[100] focus:rounded focus:bg-brass-500 focus:px-3 focus:py-1.5 focus:font-semibold focus:text-ink-950"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileActionBar />
        <SmoothAnchors />
        <JsonLd />
      </body>
    </html>
  );
}
