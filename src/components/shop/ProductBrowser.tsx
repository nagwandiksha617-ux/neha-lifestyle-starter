import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { SlidersHorizontal, X } from "lucide-react";

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { buildFacets, type Product } from "@/data/products";
import { FilterPanel } from "./FilterPanel";
import { ProductCard } from "./ProductCard";
import {
  applyFilters,
  countActiveFilters,
  emptyFilters,
  sortOptionsFor,
  type FilterState,
} from "./filters";

interface ProductBrowserProps {
  /** Products in scope for this page. */
  products: Product[];
  /** Show the category filter (only useful when the scope spans categories). */
  showCategoryFilter?: boolean;
  /** Accessible label for the listing region. */
  regionLabel: string;
  pageSize?: number;
}

const PAGE_SIZE = 12;

export function ProductBrowser({
  products,
  showCategoryFilter = false,
  regionLabel,
  pageSize = PAGE_SIZE,
}: ProductBrowserProps) {
  const [filters, setFilters] = useState<FilterState>(emptyFilters);
  const [visible, setVisible] = useState(pageSize);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const facets = useMemo(() => buildFacets(products), [products]);
  const sortOptions = useMemo(() => sortOptionsFor(facets), [facets]);
  const results = useMemo(() => applyFilters(products, filters), [products, filters]);

  const update = (next: FilterState) => {
    setFilters(next);
    setVisible(pageSize);
  };

  const activeCount = countActiveFilters(filters);
  const shown = results.slice(0, visible);

  const panel = (idPrefix: string) => (
    <FilterPanel
      filters={filters}
      onChange={update}
      facets={facets}
      showCategories={showCategoryFilter}
      idPrefix={idPrefix}
    />
  );

  return (
    <section aria-label={regionLabel} className="mt-14 grid gap-10 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-12">
      <aside className="hidden lg:block">
        <div className="sticky top-28 border border-gold/12 bg-card/30 p-6">{panel("d")}</div>
      </aside>

      <div className="min-w-0">
        <div className="flex flex-col gap-4 border-b border-gold/12 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex w-full flex-col gap-2 sm:max-w-xs">
            <label
              htmlFor="product-search"
              className="text-[0.6rem] font-light tracking-[0.32em] text-gold-soft uppercase"
            >
              Search products
            </label>
            <div className="relative">
              <input
                id="product-search"
                type="search"
                value={filters.query}
                onChange={(e) => update({ ...filters, query: e.target.value })}
                placeholder="Search by name, category or tag"
                className="min-h-11 w-full border border-gold/20 bg-transparent px-4 py-2.5 pr-10 text-[0.8rem] font-light text-ivory placeholder:text-muted-foreground/60 focus-visible:border-gold/50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              />
              {filters.query && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => update({ ...filters, query: "" })}
                  className="absolute top-1/2 right-2 grid h-8 w-8 -translate-y-1/2 place-items-center text-muted-foreground transition-colors hover:text-gold focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  <X className="h-4 w-4" strokeWidth={1.25} aria-hidden="true" />
                </button>
              )}
            </div>
          </div>

          <div className="flex items-end gap-3">
            <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  className="inline-flex min-h-11 items-center gap-2 border border-gold/30 px-4 text-[0.62rem] font-light tracking-[0.24em] text-gold uppercase transition-colors duration-500 hover:bg-gold hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none lg:hidden"
                >
                  <SlidersHorizontal className="h-4 w-4" strokeWidth={1.25} aria-hidden="true" />
                  Filters{activeCount > 0 ? ` (${activeCount})` : ""}
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[88vw] max-w-sm overflow-y-auto bg-onyx">
                <SheetHeader>
                  <SheetTitle className="font-display text-lg font-light tracking-[0.12em] text-ivory">
                    Filters
                  </SheetTitle>
                </SheetHeader>
                <div className="px-4 pb-10">{panel("m")}</div>
              </SheetContent>
            </Sheet>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="product-sort"
                className="text-[0.6rem] font-light tracking-[0.32em] text-gold-soft uppercase"
              >
                Sort by
              </label>
              <select
                id="product-sort"
                value={filters.sort}
                onChange={(e) => update({ ...filters, sort: e.target.value as FilterState["sort"] })}
                className="min-h-11 border border-gold/20 bg-onyx px-3 text-[0.78rem] font-light text-ivory focus-visible:border-gold/50 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <p aria-live="polite" className="mt-6 text-[0.7rem] font-light tracking-[0.22em] text-muted-foreground uppercase">
          {results.length} {results.length === 1 ? "product" : "products"}
        </p>

        {results.length === 0 ? (
          <div className="mt-10 border border-gold/15 bg-card/30 px-6 py-16 text-center">
            <p className="font-display text-xl font-light tracking-[0.05em] text-ivory">
              {products.length === 0
                ? "This collection is being prepared."
                : "Sorry, we couldn't find what you're looking for."}
            </p>
            <p className="mt-4 text-[0.82rem] font-light text-muted-foreground">
              {products.length === 0
                ? "Pieces will appear here as soon as the collection is published."
                : "Try a different search term or clear your filters."}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => update(emptyFilters)}
                className="min-h-11 border border-gold/40 px-6 text-[0.65rem] font-medium tracking-[0.26em] text-gold uppercase transition-colors duration-500 hover:bg-gold hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                Clear filters
              </button>
              <Link
                to="/shop"
                className="inline-flex min-h-11 items-center bg-gold px-6 text-[0.65rem] font-medium tracking-[0.26em] text-primary-foreground uppercase transition-colors duration-500 hover:bg-gold-soft focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3 xl:gap-8">
              {shown.map((product, i) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  imageLoading={i < 3 ? "eager" : "lazy"}
                />
              ))}
            </div>

            {visible < results.length && (
              <div className="mt-12 flex justify-center">
                <button
                  type="button"
                  onClick={() => setVisible((v) => v + pageSize)}
                  className="min-h-12 border border-gold/40 px-10 text-[0.65rem] font-medium tracking-[0.28em] text-gold uppercase transition-colors duration-500 hover:bg-gold hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  Load more
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
