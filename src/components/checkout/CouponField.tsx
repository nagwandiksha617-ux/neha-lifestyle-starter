import { useId, useState } from "react";

import { couponsEnabled } from "@/lib/commerce/config";
import { applyCoupon } from "@/lib/commerce/pricing";

interface CouponFieldProps {
  subtotal: number;
  appliedCode: string | null;
  onApply: (code: string, discount: number) => void;
  onRemove: () => void;
}

/** Coupon entry. No promo codes are invented — see `commerce/config.ts`. */
export function CouponField({ subtotal, appliedCode, onApply, onRemove }: CouponFieldProps) {
  const id = useId();
  const [code, setCode] = useState("");
  const [message, setMessage] = useState<string | null>(
    couponsEnabled() ? null : "No active coupon available.",
  );

  const handleApply = () => {
    const result = applyCoupon(code, subtotal);
    if (result.status === "applied") {
      onApply(result.coupon.code, result.discount);
      setMessage(`Coupon ${result.coupon.code} applied.`);
      return;
    }
    onRemove();
    setMessage(result.message);
  };

  return (
    <div className="mt-6 border-t border-gold/12 pt-5">
      <label
        htmlFor={id}
        className="text-[0.6rem] font-light tracking-[0.28em] text-muted-foreground uppercase"
      >
        Coupon code
      </label>
      <div className="mt-3 flex gap-2">
        <input
          id={id}
          type="text"
          inputMode="text"
          autoComplete="off"
          value={code}
          onChange={(event) => setCode(event.target.value)}
          disabled={!couponsEnabled()}
          aria-describedby={`${id}-status`}
          className="min-h-11 min-w-0 flex-1 border border-gold/25 bg-background/60 px-3 text-[0.8rem] font-light text-ivory placeholder:text-muted-foreground focus-visible:border-gold focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:opacity-50"
          placeholder={couponsEnabled() ? "Enter code" : "Not available"}
        />
        {appliedCode ? (
          <button
            type="button"
            onClick={() => {
              onRemove();
              setCode("");
              setMessage("Coupon removed.");
            }}
            className="min-h-11 shrink-0 border border-gold/30 px-4 text-[0.6rem] font-medium tracking-[0.22em] text-gold uppercase transition-colors hover:bg-gold hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            Remove
          </button>
        ) : (
          <button
            type="button"
            onClick={handleApply}
            disabled={!couponsEnabled()}
            className="min-h-11 shrink-0 border border-gold/30 px-4 text-[0.6rem] font-medium tracking-[0.22em] text-gold uppercase transition-colors hover:bg-gold hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            Apply
          </button>
        )}
      </div>
      <p
        id={`${id}-status`}
        role="status"
        aria-live="polite"
        className="mt-2 min-h-4 text-[0.68rem] font-light text-muted-foreground"
      >
        {message}
      </p>
    </div>
  );
}
