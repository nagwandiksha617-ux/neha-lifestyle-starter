import { emptyCheckoutValues, type CheckoutFormValues } from "./validation";

const KEY = "nl.checkoutDraft.v1";

/**
 * Persists the non-sensitive delivery details so a refresh or back-navigation
 * mid-checkout never loses typed data.
 *
 * Payment credentials are NEVER collected or stored — no card numbers, CVV,
 * UPI PIN or banking passwords exist anywhere in this flow.
 */
export function readCheckoutDraft(): CheckoutFormValues {
  if (typeof window === "undefined") return emptyCheckoutValues;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return emptyCheckoutValues;
    const parsed = JSON.parse(raw) as Partial<CheckoutFormValues>;
    return { ...emptyCheckoutValues, ...parsed };
  } catch {
    return emptyCheckoutValues;
  }
}

export function writeCheckoutDraft(values: CheckoutFormValues): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(KEY, JSON.stringify(values));
  } catch {
    /* storage unavailable — the form still works in-memory */
  }
}

export function clearCheckoutDraft(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}
