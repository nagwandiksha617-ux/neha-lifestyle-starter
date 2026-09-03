import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  /** Used in the control's accessible labels. */
  itemLabel: string;
  id?: string;
}

/** Accessible minus/plus quantity stepper. Never goes below `min` (default 1). */
export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
  itemLabel,
  id = "quantity",
}: QuantitySelectorProps) {
  const clamp = (n: number) => Math.min(max, Math.max(min, n));

  return (
    <div className="flex items-center gap-4">
      <span id={`${id}-label`} className="text-[0.6rem] font-light tracking-[0.28em] text-muted-foreground uppercase">
        Quantity
      </span>
      <div
        role="group"
        aria-labelledby={`${id}-label`}
        className="inline-flex items-center border border-gold/25"
      >
        <button
          type="button"
          onClick={() => onChange(clamp(value - 1))}
          disabled={value <= min}
          aria-label={`Decrease quantity of ${itemLabel}`}
          className="grid h-11 w-11 place-items-center text-gold transition-colors duration-300 hover:bg-gold hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-gold"
        >
          <Minus className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
        </button>
        <output
          htmlFor={`${id}-label`}
          aria-live="polite"
          className="min-w-12 text-center text-[0.9rem] font-light text-ivory"
        >
          {value}
        </output>
        <button
          type="button"
          onClick={() => onChange(clamp(value + 1))}
          disabled={value >= max}
          aria-label={`Increase quantity of ${itemLabel}`}
          className="grid h-11 w-11 place-items-center text-gold transition-colors duration-300 hover:bg-gold hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-gold"
        >
          <Plus className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
