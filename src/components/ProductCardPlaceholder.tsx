import { Heart, Star } from "lucide-react";
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
        "group flex flex-col overflow-hidden rounded-sm border border-gold/20 bg-card transition-colors duration-300 hover:border-gold/50",
        className,
      )}
      aria-label={`Catalog layout preview — ${slotLabel}`}
    >
      <div className="relative">
        <ImagePlaceholder label="Product Image" hint={slotLabel} ratio="portrait" />
        <button
          type="button"
          aria-label={`Add ${slotLabel} to wishlist (available once products are added)`}
          className="absolute top-3 right-3 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gold/40 bg-background/70 text-gold transition-colors duration-300 hover:bg-gold hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
        >
          <Heart className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="font-display text-lg tracking-wide text-ivory">Product Name</h3>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium tracking-wide text-gold">Price</span>
          <span className="text-xs tracking-wide text-muted-foreground line-through">
            Sale price
          </span>
        </div>

        <div className="flex items-center gap-1" aria-label="Rating placeholder — no ratings yet">
          {[0, 1, 2, 3, 4].map((i) => (
            <Star key={i} className="h-3.5 w-3.5 text-gold/35" aria-hidden="true" />
          ))}
          <span className="ml-1 text-[0.65rem] tracking-[0.14em] text-muted-foreground uppercase">
            Rating placeholder
          </span>
        </div>

        <div className="mt-auto flex flex-col gap-2 pt-2 sm:flex-row">
          <button
            type="button"
            className="flex-1 rounded-sm border border-gold/50 px-4 py-2.5 text-xs font-medium tracking-[0.18em] text-gold uppercase transition-colors duration-300 hover:bg-gold hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            Add to Cart
          </button>
          <button
            type="button"
            className="flex-1 rounded-sm bg-gold px-4 py-2.5 text-xs font-medium tracking-[0.18em] text-primary-foreground uppercase transition-colors duration-300 hover:bg-gold-soft focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            Buy Now
          </button>
        </div>
      </div>
    </article>
  );
}
