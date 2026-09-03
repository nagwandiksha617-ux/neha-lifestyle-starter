import { useEffect, useState } from "react";

import { ProductCard } from "@/components/shop/ProductCard";
import { getProductById, type Product } from "@/data/products";
import { pushRecentlyViewed } from "@/lib/recently-viewed";

interface RecentlyViewedProps {
  /** The product being viewed — recorded, and excluded from the list. */
  currentProductId: string;
}

/**
 * Renders the pieces viewed before this one. Reads localStorage after mount so
 * server and client markup match.
 */
export function RecentlyViewed({ currentProductId }: RecentlyViewedProps) {
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    const previous = pushRecentlyViewed(currentProductId);
    const resolved = previous
      .filter((id) => id !== currentProductId)
      .map(getProductById)
      .filter((p): p is Product => p !== undefined)
      .slice(0, 4);
    setItems(resolved);
  }, [currentProductId]);

  if (items.length === 0) return null;

  return (
    <section aria-labelledby="recently-viewed" className="mt-20">
      <h2
        id="recently-viewed"
        className="font-display text-2xl font-light tracking-[0.08em] text-ivory sm:text-3xl"
      >
        Recently Viewed
      </h2>
      <span aria-hidden="true" className="mt-4 block h-px w-16 bg-gold/40" />

      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {items.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </section>
  );
}
