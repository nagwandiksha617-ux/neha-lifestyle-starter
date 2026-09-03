import { WHATSAPP_BUSINESS_NUMBER, isWhatsAppConfigured } from "@/config/business";
import { productPath, subcategoryName, type Product } from "@/data/products";

export interface WhatsAppOrderInput {
  product: Product;
  quantity: number;
  /** Absolute product URL. Falls back to the root-relative path during SSR. */
  url?: string;
}

/** Builds the plain-text order enquiry sent to the business on WhatsApp. */
export function buildWhatsAppOrderMessage({ product, quantity, url }: WhatsAppOrderInput): string {
  const link =
    url ??
    (typeof window !== "undefined"
      ? `${window.location.origin}${productPath(product)}`
      : productPath(product));

  return [
    "Hello Neha Lifestyle, I would like to order:",
    "",
    `Product: ${product.name}`,
    `Category: ${subcategoryName(product.subcategory)}`,
    `Quantity: ${quantity}`,
    `Link: ${link}`,
  ].join("\n");
}

/** Full wa.me URL, or null while no business number is configured. */
export function buildWhatsAppOrderUrl(input: WhatsAppOrderInput): string | null {
  if (!isWhatsAppConfigured()) return null;
  const text = encodeURIComponent(buildWhatsAppOrderMessage(input));
  return `https://wa.me/${WHATSAPP_BUSINESS_NUMBER}?text=${text}`;
}

/**
 * Opens WhatsApp with a prefilled order message.
 * Returns false (and does nothing) while the business number is unset.
 */
export function openWhatsAppOrder(input: WhatsAppOrderInput): boolean {
  const url = buildWhatsAppOrderUrl(input);
  if (!url) return false;
  window.open(url, "_blank", "noopener,noreferrer");
  return true;
}

export interface WhatsAppCartLine {
  name: string;
  quantity: number;
  lineTotal: number;
}

export interface WhatsAppCartInput {
  lines: WhatsAppCartLine[];
  total: number;
  formatAmount: (value: number) => string;
  customerName?: string;
  reference?: string;
  url?: string;
}

/** Builds the plain-text cart/checkout enquiry sent to the business. */
export function buildWhatsAppCartMessage({
  lines,
  total,
  formatAmount,
  customerName,
  reference,
  url,
}: WhatsAppCartInput): string {
  const link =
    url ?? (typeof window !== "undefined" ? window.location.href : "/cart");

  const parts = ["Hello Neha Lifestyle, I would like to order:", ""];
  if (customerName) parts.push(`Name: ${customerName}`);
  if (reference) parts.push(`Reference: ${reference}`);
  if (customerName || reference) parts.push("");
  for (const line of lines) {
    parts.push(`• ${line.name} × ${line.quantity} — ${formatAmount(line.lineTotal)}`);
  }
  parts.push("", `Total: ${formatAmount(total)}`, `Link: ${link}`);
  return parts.join("\n");
}

/** Full wa.me URL for a cart, or null while no business number is configured. */
export function buildWhatsAppCartUrl(input: WhatsAppCartInput): string | null {
  if (!isWhatsAppConfigured()) return null;
  return `https://wa.me/${WHATSAPP_BUSINESS_NUMBER}?text=${encodeURIComponent(
    buildWhatsAppCartMessage(input),
  )}`;
}

/** Opens WhatsApp with a prefilled cart message. False while unconfigured. */
export function openWhatsAppCartOrder(input: WhatsAppCartInput): boolean {
  const url = buildWhatsAppCartUrl(input);
  if (!url) return false;
  window.open(url, "_blank", "noopener,noreferrer");
  return true;
}
