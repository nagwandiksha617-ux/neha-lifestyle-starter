import type { PaymentMethodId } from "./payments";
import { CURRENCY, ORDER_REFERENCE_PREFIX } from "./config";

export interface CustomerInfo {
  fullName: string;
  email: string;
  mobile: string;
}

export interface ShippingAddress {
  line1: string;
  street: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  subcategory: string;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
}

export type PaymentStatus = "not-required-yet" | "pending" | "unpaid-cod";
export type OrderStatus = "placed-locally" | "awaiting-payment";

export interface Order {
  orderId: string;
  createdAt: string;
  customer: CustomerInfo;
  shippingAddress: ShippingAddress;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  currency: typeof CURRENCY;
  paymentMethod: PaymentMethodId;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  /** Coupon code applied, when coupons are configured. */
  couponCode?: string;
}

/**
 * Local order reference generator.
 *
 * Deliberately namespaced and timestamp+random based so it can never collide
 * with a future backend's real order numbering. Change the prefix in
 * `config.ts` when a real numbering scheme exists.
 */
export function generateOrderReference(now: Date = new Date()): string {
  const stamp = now.toISOString().replace(/[-:TZ.]/g, "").slice(2, 14);
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `${ORDER_REFERENCE_PREFIX}-${stamp}-${random}`;
}

const ORDERS_KEY = "nl.orders.v1";
const MAX_STORED_ORDERS = 20;

/**
 * Orders are stored locally only. This module is the single seam a real
 * backend replaces — swap these four functions for API calls.
 *
 * Nothing sensitive is ever stored: no card numbers, CVV, UPI PIN or banking
 * credentials are collected anywhere in the app.
 */
export function saveOrder(order: Order): boolean {
  if (typeof window === "undefined") return false;
  try {
    const all = listOrders();
    window.localStorage.setItem(
      ORDERS_KEY,
      JSON.stringify([order, ...all.filter((o) => o.orderId !== order.orderId)].slice(0, MAX_STORED_ORDERS)),
    );
    return true;
  } catch {
    return false;
  }
}

export function listOrders(): Order[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(ORDERS_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? (parsed as Order[]) : [];
  } catch {
    return [];
  }
}

export function getOrder(orderId: string): Order | undefined {
  return listOrders().find((o) => o.orderId === orderId);
}
