/**
 * Lightweight "recently viewed" tracking.
 * Only product ids are stored — no personal or behavioural data.
 */

const KEY = "nl.recentlyViewed.v1";
const LIMIT = 8;

export function readRecentlyViewed(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === "string") : [];
  } catch {
    return [];
  }
}

/** Pushes an id to the front of the list and returns the previous list. */
export function pushRecentlyViewed(productId: string): string[] {
  const previous = readRecentlyViewed();
  if (typeof window === "undefined") return previous;
  const next = [productId, ...previous.filter((id) => id !== productId)].slice(0, LIMIT);
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* storage unavailable — tracking is non-essential */
  }
  return previous;
}
