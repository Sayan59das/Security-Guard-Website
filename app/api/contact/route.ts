import { NextResponse } from 'next/server';
import { contactSchema, type ContactApiResponse, type ContactFormValues } from '@/lib/contactSchema';
import { rateLimit } from '@/lib/rateLimit';
import { sendEnquiry } from '@/lib/sendEnquiry';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const MAX_BODY_BYTES = 10_000;
const RATE_LIMIT = { limit: 5, windowMs: 10 * 60 * 1000 }; // 5 requests per 10 minutes per IP

function reply(body: ContactApiResponse, status = 200, headers?: Record<string, string>) {
  return NextResponse.json(body, { status, headers });
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  return forwarded?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
}

/** Rejects cross-site browser posts. Requests with no Origin header (curl, server-to-server) pass. */
function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return true;
  const host = request.headers.get('x-forwarded-host') ?? request.headers.get('host');
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return reply({ ok: false, error: 'Request not allowed.' }, 403);
  }

  const limit = rateLimit(`contact:${clientIp(request)}`, RATE_LIMIT);
  if (!limit.ok) {
    return reply(
      { ok: false, error: 'Too many requests. Please wait a few minutes, or call us.' },
      429,
      { 'Retry-After': String(limit.retryAfterSeconds) },
    );
  }

  if (!request.headers.get('content-type')?.includes('application/json')) {
    return reply({ ok: false, error: 'Unsupported request.' }, 415);
  }

  let payload: unknown;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
      return reply({ ok: false, error: 'Your message is too long.' }, 413);
    }
    payload = JSON.parse(raw);
  } catch {
    return reply({ ok: false, error: 'We could not read that request.' }, 400);
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    const fieldErrors: Partial<Record<keyof ContactFormValues, string>> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as keyof ContactFormValues | undefined;
      if (field && !fieldErrors[field]) fieldErrors[field] = issue.message;
    }
    return reply({ ok: false, error: 'Please check the highlighted fields.', fieldErrors }, 400);
  }

  // Honeypot: a real visitor never sees this field. Pretend it worked and drop the message.
  if (parsed.data.website) {
    return reply({ ok: true });
  }

  const result = await sendEnquiry(parsed.data);
  if (!result.ok) {
    return reply(
      { ok: false, error: 'We could not send your request right now. Please call us.' },
      result.reason === 'not-configured' ? 503 : 502,
    );
  }

  return reply({ ok: true });
}

export function GET() {
  return reply({ ok: false, error: 'Method not allowed.' }, 405, { Allow: 'POST' });
}
