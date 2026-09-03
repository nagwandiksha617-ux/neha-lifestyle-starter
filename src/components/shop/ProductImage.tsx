import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { cn } from "@/lib/utils";
import { subcategoryName, type Product } from "@/data/products";

interface ProductImageProps {
  product: Product;
  className?: string;
  /** Below-the-fold images stay lazy; the first row can opt into eager. */
  loading?: "lazy" | "eager";
}

/**
 * Renders the real product photograph when one exists, otherwise an
 * aspect-ratio-matched placeholder. Swapping in real imagery is just a matter
 * of populating `product.images` (or `thumbnailImage`) — no layout shift, no
 * component changes.
 */
export function ProductImage({ product, className, loading = "lazy" }: ProductImageProps) {
  const src = product.thumbnailImage ?? product.images[0];
  const alt = `${product.name} — ${subcategoryName(product.subcategory)}`;

  if (!src) {
    return (
      <ImagePlaceholder
        label={`${product.name} photograph`}
        hint="Product image to be added"
        ratio="portrait"
        className={className ?? ""}
      />
    );
  }

  return (
    <div className={cn("relative aspect-[4/5] w-full overflow-hidden bg-onyx", className)}>
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        sizes="(min-width: 1280px) 24rem, (min-width: 640px) 45vw, 92vw"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />
    </div>
  );
}
