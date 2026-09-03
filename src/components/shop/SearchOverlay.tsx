import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";

import { priceLabel, productRoutePattern, subcategoryName } from "@/data/products";
import { useProducts } from "@/hooks/useCatalog";
import { matchesQuery } from "./filters";

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Client-side search across product name, category, subcategory, tags, SKU
 * and description copy.
 * The matcher is shared with the listing filters, so swapping in a
 * server-side search later means replacing only the results source.
 */
export function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const products = useProducts();
  const results = useMemo(() => {
    if (!query.trim()) return [];
    return products.filter((p) => matchesQuery(p, query)).slice(0, 8);
  }, [products, query]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search products"
      className="border-t border-gold/15 bg-onyx"
    >
      <div className="mx-auto w-full max-w-[84rem] px-5 py-6 sm:px-8 lg:px-12">
        <label htmlFor="site-search" className="sr-only">
          Search products
        </label>
        <div className="relative">
          <input
            ref={inputRef}
            id="site-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search bags, clutches, jewellery…"
            className="min-h-12 w-full border-b border-gold/25 bg-transparent pr-12 pb-3 font-display text-lg font-light tracking-[0.06em] text-ivory placeholder:text-muted-foreground/60 focus-visible:border-gold focus-visible:outline-none"
          />
          <button
            type="button"
            onClick={() => (query ? setQuery("") : onClose())}
            aria-label={query ? "Clear search" : "Close search"}
            className="absolute top-1/2 right-0 grid h-11 w-11 -translate-y-1/2 place-items-center text-muted-foreground transition-colors hover:text-gold focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <X className="h-5 w-5" strokeWidth={1.25} aria-hidden="true" />
          </button>
        </div>

        {query.trim() !== "" && (
          <div className="mt-6" aria-live="polite">
            {results.length === 0 ? (
              <div className="py-6">
                <p className="text-[0.9rem] font-light text-ivory">
                  Sorry, we couldn't find what you're looking for.
                </p>
                <Link
                  to="/shop"
                  onClick={onClose}
                  className="mt-5 inline-flex min-h-11 items-center border border-gold/40 px-6 text-[0.65rem] font-medium tracking-[0.26em] text-gold uppercase transition-colors duration-500 hover:bg-gold hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <ul className="flex flex-col divide-y divide-gold/10">
                {results.map((product) => (
                  <li key={product.id}>
                    <Link
                      to={productRoutePattern(product)}
                      params={{ slug: product.slug }}
                      onClick={onClose}
                      className="flex min-h-14 items-center justify-between gap-4 py-3 text-left transition-colors duration-300 hover:text-gold focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                    >
                      <span className="min-w-0">
                        <span className="block truncate text-[0.85rem] font-light text-ivory/90">
                          {product.name}
                        </span>
                        <span className="block text-[0.6rem] font-light tracking-[0.24em] text-muted-foreground uppercase">
                          {subcategoryName(product.subcategory)}
                        </span>
                      </span>
                      <span className="shrink-0 text-[0.78rem] font-light text-gold">
                        {priceLabel(product)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
