import { formatPrice } from "@/data/products";
import { shippingConfig } from "@/lib/commerce/config";
import type { Totals } from "@/lib/commerce/pricing";

interface Line {
  id: string;
  name: string;
  quantity: number;
  lineTotal: number;
}

interface OrderSummaryProps {
  totals: Totals;
  lines?: Line[];
  couponCode?: string;
  headingId?: string;
  title?: string;
  children?: React.ReactNode;
}

const rowLabel = "text-[0.7rem] font-light tracking-[0.08em] text-muted-foreground";
const rowValue = "text-[0.8rem] font-light text-ivory";

/** Shared money breakdown used by cart, checkout, review and confirmation. */
export function OrderSummary({
  totals,
  lines,
  couponCode,
  headingId = "order-summary-heading",
  title = "Order Summary",
  children,
}: OrderSummaryProps) {
  return (
    <div className="border border-gold/15 bg-card/40 p-6">
      <h2 id={headingId} className="text-[0.6rem] font-light tracking-[0.34em] text-gold-soft uppercase">
        {title}
      </h2>

      {lines && lines.length > 0 ? (
        <ul className="mt-5 flex flex-col divide-y divide-gold/10 border-y border-gold/10">
          {lines.map((line) => (
            <li key={line.id} className="flex items-baseline justify-between gap-4 py-3">
              <span className="min-w-0">
                <span className="block truncate text-[0.8rem] font-light text-ivory">{line.name}</span>
                <span className="text-[0.65rem] font-light text-muted-foreground">Qty {line.quantity}</span>
              </span>
              <span className="shrink-0 text-[0.8rem] font-light text-gold">{formatPrice(line.lineTotal)}</span>
            </li>
          ))}
        </ul>
      ) : null}

      <dl className="mt-5 flex flex-col gap-3">
        <div className="flex items-baseline justify-between gap-4">
          <dt className={rowLabel}>Subtotal</dt>
          <dd className={rowValue}>{formatPrice(totals.subtotal)}</dd>
        </div>

        <div className="flex items-baseline justify-between gap-4">
          <dt className={rowLabel}>Discount{couponCode ? ` (${couponCode})` : ""}</dt>
          <dd className={totals.discount > 0 ? rowValue : "text-[0.7rem] font-light text-muted-foreground"}>
            {totals.discount > 0 ? `− ${formatPrice(totals.discount)}` : "No discount applied"}
          </dd>
        </div>

        <div className="flex items-baseline justify-between gap-4">
          <dt className={rowLabel}>Shipping</dt>
          <dd className={totals.shipping != null ? rowValue : "text-right text-[0.7rem] font-light text-muted-foreground"}>
            {totals.shipping != null ? formatPrice(totals.shipping) : shippingConfig.unconfiguredLabel}
          </dd>
        </div>

        <div className="mt-2 flex items-baseline justify-between gap-4 border-t border-gold/12 pt-4">
          <dt className="text-[0.6rem] font-light tracking-[0.28em] text-gold-soft uppercase">Total</dt>
          <dd className="font-display text-2xl font-light text-gold">{formatPrice(totals.total)}</dd>
        </div>
      </dl>

      {totals.shipping == null ? (
        <p className="mt-4 text-[0.68rem] leading-relaxed font-light text-muted-foreground">
          Shipping charges are not configured yet, so they are not included in this total. They will be
          confirmed with you before dispatch.
        </p>
      ) : null}

      {children}
    </div>
  );
}
