/**
 * Minimal in-memory sliding-window rate limiter for the contact route.
 *
 * Honest limits: the counters live in the memory of one server instance. On Vercel
 * each serverless instance keeps its own counters and they reset on cold starts, so
 * this stops casual spam and accidental double-submits but not a determined attacker.
 * For stronger protection swap this file for a shared store (for example Upstash
 * Redis); the route only depends on the `rateLimit()` signature below.
 */

interface Options {
  /** Max requests allowed per window. */
  limit: number;
  /** Window length in milliseconds. */
  windowMs: number;
}

interface Result {
  ok: boolean;
  retryAfterSeconds: number;
}

const MAX_TRACKED_KEYS = 5_000;

// Stored on globalThis so the counters survive hot reloads in development.
const globalStore = globalThis as unknown as { __rateLimitHits?: Map<string, number[]> };
const hits = (globalStore.__rateLimitHits ??= new Map<string, number[]>());

export function rateLimit(key: string, { limit, windowMs }: Options): Result {
  const now = Date.now();
  const windowStart = now - windowMs;
  const recent = (hits.get(key) ?? []).filter((time) => time > windowStart);

  if (recent.length >= limit) {
    const oldest = recent[0] ?? now;
    hits.set(key, recent);
    return { ok: false, retryAfterSeconds: Math.max(1, Math.ceil((oldest + windowMs - now) / 1000)) };
  }

  recent.push(now);
  hits.set(key, recent);

  // Keep memory bounded: drop the oldest keys if the map grows too large.
  if (hits.size > MAX_TRACKED_KEYS) {
    const overflow = hits.size - MAX_TRACKED_KEYS;
    let removed = 0;
    for (const existingKey of hits.keys()) {
      hits.delete(existingKey);
      if (++removed >= overflow) break;
    }
  }

  return { ok: true, retryAfterSeconds: 0 };
}
