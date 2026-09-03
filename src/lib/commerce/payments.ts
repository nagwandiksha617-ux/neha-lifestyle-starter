/**
 * Payment abstraction layer.
 *
 * No gateway is connected and no credentials exist anywhere in this codebase.
 * Online methods deliberately cannot produce a "paid" order — they resolve to
 * a `gateway-required` outcome so the customer is never shown a false success.
 * A real provider slots in by implementing `startOnlinePayment` server-side.
 */

export type PaymentMethodId = "upi" | "netbanking" | "cod";

export interface PaymentMethod {
  id: PaymentMethodId;
  label: string;
  description: string;
  /** Online methods require a gateway; COD does not. */
  requiresGateway: boolean;
}

export const paymentMethods: PaymentMethod[] = [
  {
    id: "upi",
    label: "UPI",
    description: "Pay using any UPI app. Available once online payments are connected.",
    requiresGateway: true,
  },
  {
    id: "netbanking",
    label: "Net Banking",
    description: "Pay from your bank account. Available once online payments are connected.",
    requiresGateway: true,
  },
  {
    id: "cod",
    label: "Cash on Delivery",
    description: "Place the order now and pay when it is delivered.",
    requiresGateway: false,
  },
];

/**
 * No payment gateway is integrated yet. This stays false until a real provider
 * is configured server-side — the frontend never holds gateway secrets.
 */
export function isPaymentGatewayConfigured(): boolean {
  return false;
}

export type PlacementOutcome =
  | { kind: "ok" }
  | { kind: "gateway-required"; message: string }
  | { kind: "blocked"; message: string };

/** Decides whether an order may be placed with the chosen method. */
export function canPlaceOrder(method: PaymentMethodId | null): PlacementOutcome {
  if (!method) {
    return { kind: "blocked", message: "Select a payment method to continue." };
  }
  const config = paymentMethods.find((m) => m.id === method);
  if (!config) {
    return { kind: "blocked", message: "Select a valid payment method to continue." };
  }
  if (config.requiresGateway && !isPaymentGatewayConfigured()) {
    return {
      kind: "gateway-required",
      message:
        "Online payment is not connected yet, so this order has not been placed or paid. Choose Cash on Delivery, or order on WhatsApp.",
    };
  }
  return { kind: "ok" };
}
