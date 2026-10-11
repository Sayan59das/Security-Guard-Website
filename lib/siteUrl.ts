/**
 * Public URL of the site, without a trailing slash. Used for canonical links, Open Graph
 * tags, the sitemap and structured data.
 *
 * Order of preference:
 *   1. NEXT_PUBLIC_SITE_URL (set this to your real domain, see .env.example)
 *   2. Vercel's production URL, which Vercel provides automatically
 *   3. http://localhost:3000 for local development
 */
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || (vercelUrl ? `https://${vercelUrl}` : 'http://localhost:3000')
).replace(/\/+$/, '');
