import type { Metadata, Viewport } from 'next';
import { Archivo, Instrument_Sans } from 'next/font/google';
import { company, seo } from '@/content/siteContent';
import { SITE_URL } from '@/lib/siteUrl';
import { TopBar } from '@/components/layout/TopBar';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { MobileActionBar } from '@/components/layout/MobileActionBar';
import { SmoothAnchors } from '@/components/SmoothAnchors';
import { RevealOnScroll } from '@/components/RevealOnScroll';
import { JsonLd } from '@/components/JsonLd';
import './globals.css';

// Headings: Archivo, a sturdy grotesk. The width axis is loaded so headings can be set a
// little wide (see globals.css), which gives them the solid, badge-like feel of the trade.
const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  variable: '--font-archivo',
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
    <html lang="en-IN" className={`${archivo.variable} ${instrumentSans.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-[100] focus:rounded focus:bg-brass-500 focus:px-3 focus:py-1.5 focus:font-semibold focus:text-ink-950"
        >
          Skip to main content
        </a>
        <TopBar />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileActionBar />
        <SmoothAnchors />
        <RevealOnScroll />
        <JsonLd />
      </body>
    </html>
  );
}
