/**
 * Business configuration placeholders.
 *
 * These values are intentionally EMPTY. Nothing here is invented — fill each
 * one in once the real detail is confirmed, and the features that depend on it
 * switch on automatically.
 */

/**
 * WhatsApp business number in international format WITHOUT "+" or spaces,
 * e.g. "919876543210". Leave empty until the real number is provided:
 * while empty, the "Order on WhatsApp" action stays visibly unavailable
 * instead of opening a wrong chat.
 */
export const WHATSAPP_BUSINESS_NUMBER = "";

/** True once a real WhatsApp number has been configured above. */
export function isWhatsAppConfigured(): boolean {
  return /^\d{8,15}$/.test(WHATSAPP_BUSINESS_NUMBER);
}
