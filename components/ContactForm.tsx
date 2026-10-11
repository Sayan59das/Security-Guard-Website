'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CircleAlert, CircleCheck, ChevronDown, LoaderCircle, Phone } from 'lucide-react';
import { contact, contactSection, serviceOptions } from '@/content/siteContent';
import {
  CONTACT_DEFAULTS,
  contactSchema,
  type ContactApiResponse,
  type ContactFormValues,
} from '@/lib/contactSchema';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const inputClasses =
  'block min-h-6 w-full rounded-md border bg-paper-50 px-2 py-1.5 text-base text-ink-900 placeholder:text-ink-500 transition-colors hover:border-ink-600 disabled:opacity-60';

interface FieldProps {
  id: string;
  label: string;
  optional?: boolean;
  hint?: string;
  error?: string;
  children: (control: {
    id: string;
    className: string;
    'aria-invalid': boolean;
    'aria-describedby'?: string;
  }) => ReactNode;
}

/** Label, control, hint and error, wired together with the right ARIA attributes. */
function Field({ id, label, optional, hint, error, children }: FieldProps) {
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy = [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(' ') || undefined;

  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm font-semibold text-ink-900">
        {label}
        {optional ? <span className="ml-1 font-normal text-tone-muted">(optional)</span> : null}
      </label>
      {children({
        id,
        className: cn(inputClasses, error ? 'border-danger' : 'border-ink-400'),
        'aria-invalid': Boolean(error),
        'aria-describedby': describedBy,
      })}
      {hint && !error ? (
        <p id={hintId} className="mt-1 text-sm text-tone-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} role="alert" className="mt-1 flex items-start gap-1 text-sm font-medium text-danger motion-safe:animate-fade-in">
          <CircleAlert aria-hidden="true" strokeWidth={1.75} className="mt-0.5 h-2 w-2 shrink-0" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const successRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: CONTACT_DEFAULTS,
    mode: 'onTouched',
  });

  // Move keyboard and screen-reader focus to the outcome message.
  useEffect(() => {
    if (status === 'success') successRef.current?.focus();
    if (status === 'error') errorRef.current?.focus();
  }, [status]);

  async function onSubmit(values: ContactFormValues) {
    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const result = (await response.json().catch(() => null)) as ContactApiResponse | null;

      if (response.ok && result?.ok) {
        reset(CONTACT_DEFAULTS);
        setStatus('success');
        return;
      }

      // The server found a problem the browser check missed: show it beside the field.
      if (result && !result.ok && result.fieldErrors) {
        const entries = Object.entries(result.fieldErrors) as Array<[keyof ContactFormValues, string]>;
        entries.forEach(([field, message], index) => {
          setError(field, { type: 'server', message }, { shouldFocus: index === 0 });
        });
        setStatus('idle');
        return;
      }

      setErrorMessage(result && !result.ok ? result.error : contactSection.errorBody);
      setStatus('error');
    } catch {
      setErrorMessage('We could not reach the server. Check your connection and try again, or call us.');
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="rounded-md border border-success bg-paper-50 p-3 outline-none motion-safe:animate-fade-in lg:p-4"
      >
        <CircleCheck aria-hidden="true" strokeWidth={1.5} className="h-5 w-5 text-success" />
        <h3 className="mt-2 text-h3 text-ink-900">{contactSection.successTitle}</h3>
        <p className="mt-1 text-tone-muted">{contactSection.successBody}</p>
        <div className="mt-3 flex flex-col gap-1.5 xs:flex-row">
          <Button href={`tel:${contact.phone.href}`}>
            <Phone aria-hidden="true" strokeWidth={1.5} className="h-2 w-2" />
            Call {contact.phone.display}
          </Button>
          <Button variant="secondary" onClick={() => setStatus('idle')}>
            Send another request
          </Button>
        </div>
      </div>
    );
  }

  const submitting = status === 'submitting';

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate aria-busy={submitting} className="space-y-3">
      <Field id="name" label="Your name" error={errors.name?.message}>
        {(control) => (
          <input {...control} type="text" autoComplete="name" placeholder="Full name" {...register('name')} />
        )}
      </Field>

      <div className="grid gap-3 sm:grid-cols-2">
        <Field id="phone" label="Phone number" error={errors.phone?.message}>
          {(control) => (
            <input
              {...control}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="98765 43210"
              {...register('phone')}
            />
          )}
        </Field>
        <Field id="email" label="Email" optional error={errors.email?.message}>
          {(control) => (
            <input
              {...control}
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="you@example.com"
              {...register('email')}
            />
          )}
        </Field>
      </div>

      <Field id="service" label="Service needed" error={errors.service?.message}>
        {(control) => (
          <div className="relative">
            <select {...control} defaultValue="" className={cn(control.className, 'pr-5')} {...register('service')}>
              <option value="" disabled>
                Choose a service
              </option>
              {serviceOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <ChevronDown
              aria-hidden="true"
              strokeWidth={1.5}
              className="pointer-events-none absolute right-2 top-1/2 h-2 w-2 -translate-y-1/2 text-ink-600"
            />
          </div>
        )}
      </Field>

      <Field
        id="location"
        label="Location of the site"
        hint="The area and city where you need guards."
        error={errors.location?.message}
      >
        {(control) => (
          <input {...control} type="text" autoComplete="off" placeholder="Area, city" {...register('location')} />
        )}
      </Field>

      <Field id="message" label="Anything we should know?" optional error={errors.message?.message}>
        {(control) => (
          <textarea
            {...control}
            rows={4}
            placeholder="For example: number of guards, shift timings, start date."
            className={cn(control.className, 'resize-y')}
            {...register('message')}
          />
        )}
      </Field>

      {/* Honeypot: hidden from people. Bots that fill every field give themselves away. */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register('website')} />
      </div>

      {status === 'error' ? (
        <div
          ref={errorRef}
          tabIndex={-1}
          role="alert"
          className="flex gap-1.5 rounded-md border border-danger bg-paper-50 p-2 outline-none motion-safe:animate-fade-in"
        >
          <CircleAlert aria-hidden="true" strokeWidth={1.75} className="mt-0.5 h-3 w-3 shrink-0 text-danger" />
          <div>
            <p className="font-semibold text-danger">{contactSection.errorTitle}</p>
            <p className="mt-0.5 text-sm text-ink-900">{errorMessage}</p>
            <a
              href={`tel:${contact.phone.href}`}
              className="mt-1 inline-block text-sm font-semibold text-brass-700 underline underline-offset-4"
            >
              Call {contact.phone.display}
            </a>
          </div>
        </div>
      ) : null}

      <div className="pt-1">
        <Button type="submit" size="lg" disabled={submitting} className="w-full sm:w-auto">
          {submitting ? (
            <>
              <LoaderCircle aria-hidden="true" strokeWidth={1.75} className="h-2 w-2 animate-spin motion-reduce:animate-none" />
              Sending&hellip;
            </>
          ) : (
            contactSection.submitLabel
          )}
        </Button>
        <p className="mt-2 text-sm text-tone-muted">{contactSection.formNote}</p>
      </div>

      <p role="status" aria-live="polite" className="sr-only">
        {submitting ? 'Sending your request.' : ''}
      </p>
    </form>
  );
}
