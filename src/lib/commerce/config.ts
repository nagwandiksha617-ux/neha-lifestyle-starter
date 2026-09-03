/**
 * Commerce configuration.
 *
 * Every value here is a clearly-marked PLACEHOLDER. Nothing is invented:
 * shipping rules, coupons and payment gateways stay inactive until the real
 * business rules are supplied, and the UI states this openly to the customer.
 */

export const CURRENCY = "INR" as const;

/** Prefix for locally generated order references. */
export const ORDER_REFERENCE_PREFIX = "NL-LOCAL";

export interface ShippingConfig {
  /** Flip to true only once real shipping rules exist. */
  configured: boolean;
  /** Flat fee in the store currency, applied when `configured` is true. */
  flatRate: number;
  /** Order value at or above which shipping is free. `null` disables it. */
  freeAbove: number | null;
  /** Shown to the customer while `configured` is false. */
  unconfiguredLabel: string;
}

export const shippingConfig: ShippingConfig = {
  configured: false,
  flatRate: 0,
  freeAbove: null,
  unconfiguredLabel: "Calculated after confirmation",
};

export interface CouponConfig {
  code: string;
  /** "percent" of subtotal, or a flat "amount". */
  type: "percent" | "amount";
  value: number;
  minSubtotal?: number;
}

/**
 * No promo codes are invented. Add real ones here to switch coupon support on.
 */
export const activeCoupons: CouponConfig[] = [];

/** True once at least one real coupon has been configured above. */
export function couponsEnabled(): boolean {
  return activeCoupons.length > 0;
}
