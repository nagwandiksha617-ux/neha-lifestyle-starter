import { isPaymentGatewayConfigured, paymentMethods, type PaymentMethodId } from "@/lib/commerce/payments";

interface PaymentMethodSelectProps {
  value: PaymentMethodId | null;
  onChange: (value: PaymentMethodId) => void;
  error?: string;
}

/** Accessible radio group for the payment method. No gateway is connected. */
export function PaymentMethodSelect({ value, onChange, error }: PaymentMethodSelectProps) {
  const gatewayReady = isPaymentGatewayConfigured();

  return (
    <fieldset
      className="border-0 p-0"
      aria-describedby={error ? "payment-method-error" : undefined}
      aria-invalid={error ? true : undefined}
    >
      <legend className="font-display text-xl font-light tracking-[0.04em] text-ivory">
        Payment Method
      </legend>
      <p className="mt-2 text-[0.72rem] leading-relaxed font-light text-muted-foreground">
        Online payments are not connected yet. Cash on Delivery can be completed now.
      </p>

      <div className="mt-5 flex flex-col gap-3">
        {paymentMethods.map((method) => {
          const selected = value === method.id;
          const pending = method.requiresGateway && !gatewayReady;
          return (
            <label
              key={method.id}
              className={`flex cursor-pointer items-start gap-3 border p-4 transition-colors duration-300 focus-within:ring-2 focus-within:ring-ring ${
                selected ? "border-gold/60 bg-card/60" : "border-gold/15 bg-card/25 hover:border-gold/35"
              }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value={method.id}
                checked={selected}
                onChange={() => onChange(method.id)}
                className="mt-1 h-4 w-4 shrink-0 accent-[var(--gold)] focus-visible:outline-none"
              />
              <span className="min-w-0">
                <span className="block text-[0.85rem] font-light tracking-[0.04em] text-ivory">
                  {method.label}
                  {pending ? (
                    <span className="ml-2 border border-gold/30 px-2 py-0.5 text-[0.55rem] tracking-[0.2em] text-gold-soft uppercase">
                      Setup required
                    </span>
                  ) : null}
                </span>
                <span className="mt-1 block text-[0.7rem] leading-relaxed font-light text-muted-foreground">
                  {method.description}
                </span>
              </span>
            </label>
          );
        })}
      </div>

      {error ? (
        <p id="payment-method-error" role="alert" className="mt-3 text-[0.72rem] font-light text-ivory">
          <span aria-hidden="true">⚠ </span>
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}
