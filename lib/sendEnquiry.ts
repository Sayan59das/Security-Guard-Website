import { Resend } from 'resend';
import { company } from '@/content/siteContent';
import type { ContactFormValues } from '@/lib/contactSchema';

export type DeliveryResult =
  | { ok: true; mode: 'sent' | 'logged' }
  | { ok: false; reason: 'not-configured' | 'send-failed' };

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

/** Strips line breaks so user input can never inject extra email headers. */
const oneLine = (value: string) => value.replace(/[\r\n]+/g, ' ').trim();

function buildMessage(data: ContactFormValues) {
  const rows: Array<[string, string]> = [
    ['Name', data.name],
    ['Phone', data.phone],
    ['Email', data.email || 'Not given'],
    ['Service needed', data.service],
    ['Location', data.location],
    ['Message', data.message || 'None'],
  ];

  const text = rows.map(([label, value]) => `${label}: ${value}`).join('\n');
  const html = `<table cellpadding="8" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:15px">${rows
    .map(
      ([label, value]) =>
        `<tr><td style="border:1px solid #ddd;font-weight:bold;vertical-align:top">${escapeHtml(label)}</td><td style="border:1px solid #ddd;white-space:pre-wrap">${escapeHtml(value)}</td></tr>`,
    )
    .join('')}</table>`;

  return { text, html };
}

/**
 * Sends the enquiry by email through Resend.
 *
 * - No RESEND_API_KEY in development: prints the enquiry to the server console so the
 *   whole form flow can be tested locally without an account.
 * - No RESEND_API_KEY in production: fails on purpose, so a misconfigured deployment
 *   is noticed immediately instead of quietly losing leads.
 */
export async function sendEnquiry(data: ContactFormValues): Promise<DeliveryResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const recipients = (process.env.CONTACT_TO_EMAIL ?? '')
    .split(',')
    .map((address) => address.trim())
    .filter(Boolean);
  const from = process.env.CONTACT_FROM_EMAIL?.trim() || 'onboarding@resend.dev';
  const { text, html } = buildMessage(data);

  if (!apiKey) {
    if (process.env.NODE_ENV === 'production') {
      console.error('[contact] RESEND_API_KEY is not set. The enquiry was not delivered.');
      return { ok: false, reason: 'not-configured' };
    }
    console.log(
      '\n[contact] RESEND_API_KEY is not set, so this enquiry is logged instead of emailed:\n' +
        '------------------------------------------------------------\n' +
        `${text}\n` +
        '------------------------------------------------------------\n',
    );
    return { ok: true, mode: 'logged' };
  }

  if (recipients.length === 0) {
    console.error('[contact] CONTACT_TO_EMAIL is not set. The enquiry was not delivered.');
    return { ok: false, reason: 'not-configured' };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: recipients,
      replyTo: data.email || undefined,
      subject: oneLine(`New quote request: ${data.service} (${data.name})`).slice(0, 150),
      text: `${company.name} website enquiry\n\n${text}`,
      html,
    });

    if (error) {
      console.error('[contact] Resend rejected the email:', error.message);
      return { ok: false, reason: 'send-failed' };
    }
    return { ok: true, mode: 'sent' };
  } catch (error) {
    console.error('[contact] Sending the email failed:', error instanceof Error ? error.message : error);
    return { ok: false, reason: 'send-failed' };
  }
}
