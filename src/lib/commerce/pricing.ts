import { activeCoupons, couponsEnabled, shippingConfig, type CouponConfig } from "./config";

export interface Totals {
  subtotal: number;
  discount: number;
  /** null while no shipping rules are configured. */
  shipping: number | null;
  total: number;
}

/** Applies the configured shipping rules. Returns null while unconfigured. */
export function calculateShipping(subtotal: number): number | null {
  if (!shippingConfig.configured) return null;
  if (shippingConfig.freeAbove != null && subtotal >= shippingConfig.freeAbove) return 0;
  return shippingConfig.flatRate;
}

export type CouponResult =
  | { status: "none-configured"; message: string }
  | { status: "invalid"; message: string }
  | { status: "below-minimum"; message: string }
  | { status: "applied"; coupon: CouponConfig; discount: number };

/** Validates a coupon code against the configured list. Never invents codes. */
export function applyCoupon(code: string, subtotal: number): CouponResult {
  if (!couponsEnabled()) {
    return { status: "none-configured", message: "No active coupon available." };
  }
  const coupon = activeCoupons.find((c) => c.code.toLowerCase() === code.trim().toLowerCase());
  if (!coupon) {
    return { status: "invalid", message: "This code is not valid." };
  }
  if (coupon.minSubtotal != null && subtotal < coupon.minSubtotal) {
    return { status: "below-minimum", message: "This code does not apply to your cart yet." };
  }
  const discount =
    coupon.type === "percent"
      ? Math.round((subtotal * coupon.value) / 100)
      : Math.min(coupon.value, subtotal);
  return { status: "applied", coupon, discount };
}

export function calculateTotals(subtotal: number, discount = 0): Totals {
  const shipping = calculateShipping(subtotal);
  const total = Math.max(0, subtotal - discount) + (shipping ?? 0);
  return { subtotal, discount, shipping, total };
}
