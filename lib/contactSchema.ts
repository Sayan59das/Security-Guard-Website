import { z } from 'zod';
import { serviceOptions } from '@/content/siteContent';

/**
 * One schema, used twice: React Hook Form validates with it in the browser, and the
 * /api/contact route validates the same shape again on the server. Never trust the
 * browser check on its own.
 */

// Indian mobile numbers: 10 digits starting 6-9, optionally prefixed with +91, 91 or 0.
const INDIAN_MOBILE = /^(?:\+?91|0)?[6-9]\d{9}$/;
const emailCheck = z.string().email();

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Please enter your name.')
    .max(80, 'That name is a little long. Please shorten it.'),
  phone: z
    .string()
    .trim()
    .min(1, 'Please enter a phone number we can call you on.')
    .max(20, 'That phone number is too long.')
    .refine(
      (value) => INDIAN_MOBILE.test(value.replace(/[\s\-().]/g, '')),
      'Enter a 10-digit mobile number, for example 98765 43210.',
    ),
  // Optional: a phone call is the main way we reply.
  email: z
    .string()
    .trim()
    .max(120, 'That email address is too long.')
    .refine((value) => value === '' || emailCheck.safeParse(value).success, 'Enter a valid email address, or leave this blank.'),
  service: z
    .string()
    .refine((value) => serviceOptions.includes(value), 'Please choose the service you need.'),
  location: z
    .string()
    .trim()
    .min(2, 'Tell us the area or city where you need guards.')
    .max(120, 'That location is too long. Please shorten it.'),
  message: z.string().trim().max(1000, 'Please keep your message under 1,000 characters.'),
  // Honeypot. Real visitors never see or fill this field. Bots usually do.
  // It is deliberately NOT validated here (no length limit either, the route's body-size cap
  // is enough): the API route checks it separately and pretends to succeed, so bots get no
  // signal that they were caught.
  website: z.string().optional(),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export const CONTACT_DEFAULTS: ContactFormValues = {
  name: '',
  phone: '',
  email: '',
  service: '',
  location: '',
  message: '',
  website: '',
};

/** Shape of the JSON the API route returns. */
export type ContactApiResponse =
  | { ok: true }
  | {
      ok: false;
      error: string;
      fieldErrors?: Partial<Record<keyof ContactFormValues, string>>;
    };
