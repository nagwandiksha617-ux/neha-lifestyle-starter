import { MessageCircle } from "lucide-react";
import { toast } from "sonner";

import { isWhatsAppConfigured } from "@/config/business";
import { formatPrice } from "@/data/products";
import { openWhatsAppCartOrder, type WhatsAppCartLine } from "@/lib/whatsapp";

interface WhatsAppOrderButtonProps {
  lines: WhatsAppCartLine[];
  total: number;
  customerName?: string;
  reference?: string;
  className?: string;
}

/** Optional "Order on WhatsApp" action; inert until the number is configured. */
export function WhatsAppOrderButton({
  lines,
  total,
  customerName,
  reference,
  className = "",
}: WhatsAppOrderButtonProps) {
  const ready = isWhatsAppConfigured();

  return (
    <button
      type="button"
      aria-disabled={!ready}
      title={ready ? undefined : "WhatsApp ordering is not configured yet"}
      onClick={() => {
        const opened = openWhatsAppCartOrder({
          lines,
          total,
          formatAmount: (value) => formatPrice(value),
          ...(customerName ? { customerName } : {}),
          ...(reference ? { reference } : {}),
        });
        if (!opened) {
          toast("WhatsApp ordering is not configured yet.", {
            description: "The business WhatsApp number will be added soon.",
          });
        }
      }}
      className={`inline-flex min-h-12 w-full items-center justify-center gap-2.5 border border-gold/35 px-6 text-[0.62rem] font-medium tracking-[0.24em] text-gold uppercase transition-colors duration-500 hover:bg-gold hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none ${
        ready ? "" : "opacity-50"
      } ${className}`}
    >
      <MessageCircle className="h-4 w-4" strokeWidth={1.4} aria-hidden="true" />
      Order on WhatsApp
    </button>
  );
}
