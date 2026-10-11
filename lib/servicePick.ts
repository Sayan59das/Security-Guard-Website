/**
 * Lets a "Get a quote" link on a service card pre-select that service in the contact form.
 * The link announces the pick with a window event; the form listens for it. This keeps the
 * two components independent (no shared React state or context needed).
 */
export const SERVICE_PICK_EVENT = 'quote:service-pick';

export function pickService(service: string) {
  window.dispatchEvent(new CustomEvent<string>(SERVICE_PICK_EVENT, { detail: service }));
}
