import {
  effectivePrice,
  type Availability,
  type CategorySlug,
  type Product,
} from "@/data/products";

export type SortKey = "featured" | "newest" | "price-asc" | "price-desc" | "rating";

export const sortOptions: Array<{ value: SortKey; label: string }> = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Best Rated" },
];

export interface FilterState {
  query: string;
  categories: CategorySlug[];
  subcategories: string[];
  maxPrice: number | null;
  availability: Availability[];
  minRating: number | null;
  sort: SortKey;
}

export const emptyFilters: FilterState = {
  query: "",
  categories: [],
  subcategories: [],
  maxPrice: null,
  availability: [],
  minRating: null,
  sort: "featured",
};

/** Shared matcher — also used by the header search so results stay consistent. */
export function matchesQuery(product: Product, rawQuery: string): boolean {
  const q = rawQuery.trim().toLowerCase();
  if (!q) return true;
  return [product.name, product.category, product.subcategory.replace(/-/g, " ")]
    .join(" ")
    .toLowerCase()
    .includes(q);
}

export function applyFilters(source: Product[], filters: FilterState): Product[] {
  const filtered = source.filter((product) => {
    if (!matchesQuery(product, filters.query)) return false;
    if (filters.categories.length && !filters.categories.includes(product.category)) return false;
    if (filters.subcategories.length && !filters.subcategories.includes(product.subcategory))
      return false;
    if (filters.maxPrice != null && effectivePrice(product) > filters.maxPrice) return false;
    if (filters.availability.length && !filters.availability.includes(product.availability))
      return false;
    if (filters.minRating != null && product.rating < filters.minRating) return false;
    return true;
  });

  const sorted = [...filtered];
  switch (filters.sort) {
    case "price-asc":
      sorted.sort((a, b) => effectivePrice(a) - effectivePrice(b));
      break;
    case "price-desc":
      sorted.sort((a, b) => effectivePrice(b) - effectivePrice(a));
      break;
    case "rating":
      sorted.sort((a, b) => b.rating - a.rating);
      break;
    case "newest":
      sorted.sort((a, b) => Number(b.newArrival) - Number(a.newArrival));
      break;
    default:
      sorted.sort((a, b) => Number(b.featured) - Number(a.featured));
  }
  return sorted;
}

export function countActiveFilters(filters: FilterState): number {
  return (
    filters.categories.length +
    filters.subcategories.length +
    filters.availability.length +
    (filters.maxPrice != null ? 1 : 0) +
    (filters.minRating != null ? 1 : 0)
  );
}
