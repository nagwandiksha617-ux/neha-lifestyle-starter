import { useState } from "react";
import { Expand } from "lucide-react";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { cn } from "@/lib/utils";
import { subcategoryName, type Product } from "@/data/products";

interface ProductGalleryProps {
  product: Product;
}

const THUMB_COUNT = 5;

/**
 * Primary image + thumbnail rail. Real photographs render when
 * `product.images` is populated; until then every slot is a fixed-ratio
 * placeholder, so there is no layout shift and never a broken image.
 */
export function ProductGallery({ product }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);

  const images =
    product.images.length > 0
      ? product.images
      : product.thumbnailImage
        ? [product.thumbnailImage]
        : [];
  const slotCount = Math.max(images.length, THUMB_COUNT);
  const slots = Array.from({ length: slotCount }, (_, i) => images[i]);
  const activeSrc = slots[active];
  const altBase = `${product.name} — ${subcategoryName(product.subcategory)}`;

  return (
    <section aria-label={`${product.name} images`} className="flex flex-col gap-4">
      <div className="group relative">
        {activeSrc ? (
          <div className="relative aspect-[4/5] w-full overflow-hidden border border-gold/15 bg-onyx">
            <img
              src={activeSrc}
              alt={`${altBase}, view ${active + 1} of ${slotCount}`}
              className="absolute inset-0 h-full w-full object-contain"
              decoding="async"
            />
          </div>
        ) : (
          <ImagePlaceholder
            label={`${altBase} photograph`}
            hint="Product image to be added"
            ratio="portrait"
            editorial
            zoomOnHover={false}
          />
        )}

        {activeSrc && (
          <button
            type="button"
            onClick={() => setZoomOpen(true)}
            aria-label={`View larger image of ${product.name}`}
            className="absolute top-4 right-4 grid h-11 w-11 place-items-center border border-gold/30 bg-onyx/80 text-gold backdrop-blur-sm transition-colors duration-300 hover:bg-gold hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <Expand className="h-4 w-4" strokeWidth={1.25} aria-hidden="true" />
          </button>
        )}
      </div>

      <ul
        className="grid grid-cols-5 gap-2 sm:gap-3"
        aria-label={`${product.name} image thumbnails`}
      >
        {slots.slice(0, THUMB_COUNT).map((src, index) => (
          <li key={index}>
            <button
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Show image ${index + 1} of ${product.name}`}
              aria-current={active === index}
              className={cn(
                "block w-full border transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none",
                active === index ? "border-gold/70" : "border-gold/15 hover:border-gold/40",
              )}
            >
              {src ? (
                <span className="relative block aspect-square w-full overflow-hidden bg-onyx">
                  <img
                    src={src}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-contain"
                  />
                </span>
              ) : (
                <ImagePlaceholder
                  label={`${altBase} thumbnail ${index + 1}`}
                  ratio="square"
                  zoomOnHover={false}
                  hideCaption
                />
              )}
            </button>
          </li>
        ))}
      </ul>

      <Dialog open={zoomOpen} onOpenChange={setZoomOpen}>
        <DialogContent className="max-w-3xl border-gold/20 bg-onyx">
          <DialogTitle className="font-display text-lg font-light tracking-[0.08em] text-ivory">
            {product.name}
          </DialogTitle>
          {activeSrc && (
            <img
              src={activeSrc}
              alt={`${altBase}, enlarged view`}
              className="max-h-[75vh] w-full object-contain"
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
