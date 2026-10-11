/** Joins class names, skipping anything falsy. A tiny stand-in for clsx. */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}
