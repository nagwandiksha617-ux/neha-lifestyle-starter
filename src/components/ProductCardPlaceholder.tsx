import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { ImagePlaceholder } from "./ImagePlaceholder";

interface ProductCardPlaceholderProps {
  /** Describes the catalog slot, e.g. "Bag slot 1". Never a fabricated product. */
  slotLabel: string;
  className?: string;
}

/**
 * Catalog layout preview. Intentionally contains no product names, prices or
 * ratings — every field is a visibly empty placeholder.
 */
export function ProductCardPlaceholder({
  slotLabel,
  className,
}: ProductCardPlaceholderProps) {
  return (
    <article
      className={cn(
        "group flex flex-col border border-gold/12 bg-card/40 transition-all duration-500 ease-out hover:-translate-y-1 hover:border-gold/40",
        className,
      )}
      aria-label={`Catalog layout preview — ${slotLabel}`}
    >
      <div className="relative overflow-hidden">
        <ImagePlaceholder label="Product Image" hint={slotLabel} ratio="portrait" />
        <button
          type="button"
          aria-label={`Add ${slotLabel} to wishlist (available once products are added)`}
          className="absolute top-4 right-4 grid h-11 w-11 shrink-0 place-items-center rounded-full border border-gold/30 bg-onyx/70 text-gold/90 backdrop-blur-sm transition-colors duration-500 hover:border-gold hover:bg-gold hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
        >
          <Heart className="h-4 w-4" strokeWidth={1.25} aria-hidden="true" />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-4 px-5 py-6 sm:px-6">
        <div className="flex flex-col gap-2">
          <span className="text-[0.55rem] font-light tracking-[0.32em] text-gold-soft/80 uppercase">
            Catalog preview
          </span>
          <h3 className="font-display text-xl leading-tight font-light tracking-[0.05em] text-ivory">
            Product Name
          </h3>
        </div>

        <div className="flex items-baseline gap-3">
          <span className="text-xs font-light tracking-[0.24em] text-gold uppercase">
            Price
          </span>
          <span className="text-[0.65rem] font-light tracking-[0.24em] text-muted-foreground/70 uppercase">
            Sale price
          </span>
        </div>

        <div className="flex items-center gap-2" aria-label="Rating placeholder — no ratings collected yet">
          <span aria-hidden="true" className="h-px w-6 bg-gold/30" />
          <span className="text-[0.55rem] font-light tracking-[0.28em] text-muted-foreground/80 uppercase">
            Rating placeholder
          </span>
        </div>

        <div className="mt-auto flex flex-col gap-2.5 pt-3">
          <button
            type="button"
            className="min-h-11 w-full border border-gold/40 px-5 py-3 text-[0.65rem] font-medium tracking-[0.28em] text-gold uppercase transition-colors duration-500 hover:bg-gold hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
          >
            Add to Cart
          </button>
          <button
            type="button"
            className="min-h-11 w-full bg-gold px-5 py-3 text-[0.65rem] font-medium tracking-[0.28em] text-primary-foreground uppercase transition-colors duration-500 hover:bg-gold-soft focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
          >
            Buy Now
          </button>
        </div>
      </div>
    </article>
  );
}
