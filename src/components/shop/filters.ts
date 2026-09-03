import {
  buildFacets,
  effectivePrice,
  type CatalogFacets,
  type CategorySlug,
  type Product,
  type StockStatus,
} from "@/data/products";

export type SortKey =
  | "featured"
  | "newest"
  | "price-asc"
  | "price-desc"
  | "name-asc"
  | "rating";

const allSortOptions: Array<{ value: SortKey; label: string }> = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A–Z" },
  { value: "rating", label: "Best Rated" },
];

/** Price and rating sorts are hidden when the scope has no such data. */
export function sortOptionsFor(facets: CatalogFacets) {
  return allSortOptions.filter((opt) => {
    if (!facets.hasPrices && (opt.value === "price-asc" || opt.value === "price-desc")) return false;
    if (!facets.hasRatings && opt.value === "rating") return false;
    return true;
  });
}

export interface FilterState {
  query: string;
  categories: CategorySlug[];
  subcategories: string[];
  colors: string[];
  materials: string[];
  maxPrice: number | null;
  stockStatuses: StockStatus[];
  newArrivalOnly: boolean;
  bestSellerOnly: boolean;
  minRating: number | null;
  sort: SortKey;
}

export const emptyFilters: FilterState = {
  query: "",
  categories: [],
  subcategories: [],
  colors: [],
  materials: [],
  maxPrice: null,
  stockStatuses: [],
  newArrivalOnly: false,
  bestSellerOnly: false,
  minRating: null,
  sort: "featured",
};

/**
 * Shared matcher — used by listing search and the header overlay so results
 * stay consistent. Matches name, category, subcategory, tags, SKU and, as a
 * last resort, description copy.
 */
export function matchesQuery(product: Product, rawQuery: string): boolean {
  const q = rawQuery.trim().toLowerCase();
  if (!q) return true;
  const haystack = [
    product.name,
    product.category,
    product.subcategory.replace(/-/g, " "),
    product.sku ?? "",
    product.color ?? "",
    product.material ?? "",
    (product.tags ?? []).join(" "),
    product.shortDescription ?? "",
    product.description ?? "",
  ]
    .join(" ")
    .toLowerCase();
  return q.split(/\s+/).every((term) => haystack.includes(term));
}

export function applyFilters(source: Product[], filters: FilterState): Product[] {
  const filtered = source.filter((product) => {
    if (!matchesQuery(product, filters.query)) return false;
    if (filters.categories.length && !filters.categories.includes(product.category)) return false;
    if (filters.subcategories.length && !filters.subcategories.includes(product.subcategory))
      return false;
    if (filters.colors.length && !(product.color && filters.colors.includes(product.color)))
      return false;
    if (
      filters.materials.length &&
      !(product.material && filters.materials.includes(product.material))
    )
      return false;
    if (filters.maxPrice != null) {
      const price = effectivePrice(product);
      // Unpriced products are never excluded by a price ceiling.
      if (price != null && price > filters.maxPrice) return false;
    }
    if (filters.stockStatuses.length && !filters.stockStatuses.includes(product.stockStatus))
      return false;
    if (filters.newArrivalOnly && !product.newArrival) return false;
    if (filters.bestSellerOnly && !product.bestSeller) return false;
    if (filters.minRating != null && (product.rating ?? 0) < filters.minRating) return false;
    return true;
  });

  const sorted = [...filtered];
  const byName = (a: Product, b: Product) => a.name.localeCompare(b.name);
  // Unpriced items always sort last, whichever price direction is chosen.
  const priced = (p: Product, fallback: number) => effectivePrice(p) ?? fallback;

  switch (filters.sort) {
    case "price-asc":
      sorted.sort((a, b) => priced(a, Number.POSITIVE_INFINITY) - priced(b, Number.POSITIVE_INFINITY));
      break;
    case "price-desc":
      sorted.sort((a, b) => priced(b, Number.NEGATIVE_INFINITY) - priced(a, Number.NEGATIVE_INFINITY));
      break;
    case "name-asc":
      sorted.sort(byName);
      break;
    case "rating":
      sorted.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
      break;
    case "newest":
      sorted.sort((a, b) => Number(b.newArrival) - Number(a.newArrival) || byName(a, b));
      break;
    default:
      sorted.sort((a, b) => Number(b.featured) - Number(a.featured) || byName(a, b));
  }
  return sorted;
}

export function countActiveFilters(filters: FilterState): number {
  return (
    filters.categories.length +
    filters.subcategories.length +
    filters.colors.length +
    filters.materials.length +
    filters.stockStatuses.length +
    (filters.maxPrice != null ? 1 : 0) +
    (filters.minRating != null ? 1 : 0) +
    (filters.newArrivalOnly ? 1 : 0) +
    (filters.bestSellerOnly ? 1 : 0)
  );
}

export function clearFacetFilters(filters: FilterState): FilterState {
  return {
    ...filters,
    categories: [],
    subcategories: [],
    colors: [],
    materials: [],
    maxPrice: null,
    stockStatuses: [],
    newArrivalOnly: false,
    bestSellerOnly: false,
    minRating: null,
  };
}

export { buildFacets };
export type { CatalogFacets };
