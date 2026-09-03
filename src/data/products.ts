/**
 * Public catalog API.
 *
 * UI code imports only from this module — types, taxonomy and selectors — so
 * the underlying source (demo records today, a database or CMS tomorrow) can
 * change without touching a single component.
 */

export type {
  Availability,
  CategorySlug,
  CurrencyCode,
  Product,
  ProductInput,
  ProductStatus,
  RoutePath,
  SpecRow,
  StockStatus,
  Subcategory,
} from "./catalog/types";

export {
  allSubcategories,
  bagSubcategories,
  categories,
  categoryName,
  categoryPath,
  clutchSubcategories,
  findSubcategory,
  jewellerySubcategories,
  subcategoriesOf,
  subcategoryName,
} from "./catalog/taxonomy";

export {
  normalizeCatalog,
  normalizeProduct,
  parseProductsCsv,
  parseProductsJson,
  slugify,
  type ImportIssue,
  type ImportResult,
} from "./catalog/normalize";

export { catalogIssues, catalogRecords, isDemoCatalog } from "./catalog/source";

export {
  allProducts,
  catalogImportIssues,
  catalogRows,
  deleteProductRows,
  duplicateProductRow,
  hydrateCatalog,
  mergeImportedRows,
  patchProductRows,
  publishedProducts,
  replaceCatalogRows,
  resetCatalog,
  subscribeCatalog,
  upsertProductRow,
} from "./catalog/store";

export { catalogRepository, type CatalogRepository } from "./catalog/repository";

import { findSubcategory } from "./catalog/taxonomy";
import { publishedProducts } from "./catalog/store";
import type { CategorySlug, CurrencyCode, Product, RoutePath, StockStatus } from "./catalog/types";

/* ------------------------------------------------------------------ */
/* Selectors                                                           */
/* ------------------------------------------------------------------ */

export function getProductsByCategory(category: CategorySlug): Product[] {
  return publishedProducts().filter((p) => p.category === category);
}

export function getProductsBySubcategory(subcategory: string): Product[] {
  return publishedProducts().filter((p) => p.subcategory === subcategory);
}

export function getProductById(id: string): Product | undefined {
  return publishedProducts().find((p) => p.id === id);
}

/** Looks a product up inside a single subcategory, so URLs stay unambiguous. */
export function getProductBySlug(subcategory: string, slug: string): Product | undefined {
  return publishedProducts().find((p) => p.subcategory === subcategory && p.slug === slug);
}

export function getFeaturedProducts(limit?: number): Product[] {
  const list = publishedProducts().filter((p) => p.featured);
  return limit != null ? list.slice(0, limit) : list;
}

export function getNewArrivals(limit?: number): Product[] {
  const list = publishedProducts().filter((p) => p.newArrival);
  return limit != null ? list.slice(0, limit) : list;
}

export function getBestSellers(limit?: number): Product[] {
  const list = publishedProducts().filter((p) => p.bestSeller);
  return limit != null ? list.slice(0, limit) : list;
}

/* ------------------------------------------------------------------ */
/* Pricing                                                             */
/* ------------------------------------------------------------------ */

/** Price actually charged, or undefined when pricing is not configured. */
export function effectivePrice(product: Product): number | undefined {
  return product.salePrice ?? product.price;
}

export function hasPrice(product: Product): boolean {
  return effectivePrice(product) != null;
}

/** Safe numeric price for cart maths; unpriced items contribute nothing. */
export function priceValue(product: Product): number {
  return effectivePrice(product) ?? 0;
}

/** Struck-through comparison price, only when it is genuinely higher. */
export function comparePrice(product: Product): number | undefined {
  const current = effectivePrice(product);
  const compare = product.compareAtPrice ?? (product.salePrice != null ? product.price : undefined);
  if (current == null || compare == null || compare <= current) return undefined;
  return compare;
}

export function discountPercent(product: Product): number {
  const current = effectivePrice(product);
  const compare = comparePrice(product);
  if (current == null || compare == null) return 0;
  return Math.round(((compare - current) / compare) * 100);
}

export function formatPrice(value: number, currency: CurrencyCode = "INR"): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

/** Neutral label used everywhere a price is not configured. */
export const PRICE_UNAVAILABLE_LABEL = "Price on request";

export function priceLabel(product: Product): string {
  const value = effectivePrice(product);
  return value == null ? PRICE_UNAVAILABLE_LABEL : formatPrice(value, product.currency);
}

/* ------------------------------------------------------------------ */
/* Stock                                                               */
/* ------------------------------------------------------------------ */

export const stockStatusLabels: Record<StockStatus, string> = {
  "in-stock": "In stock",
  "out-of-stock": "Out of stock",
  "pre-order": "Pre-order",
  "made-to-order": "Made to order",
};

export function isPurchasable(product: Product): boolean {
  return product.stockStatus !== "out-of-stock";
}

/* ------------------------------------------------------------------ */
/* Routing                                                             */
/* ------------------------------------------------------------------ */

/** Typed route pattern for <Link to=...>; falls back to the shop listing. */
export function productRoutePattern(product: Product): RoutePath {
  return findSubcategory(product.subcategory)?.productPattern ?? "/shop";
}

/** Root-relative URL of a product page — used for canonical, OG and sharing. */
export function productPath(product: Product): string {
  if (product.canonicalUrl) return product.canonicalUrl;
  const base = findSubcategory(product.subcategory)?.path ?? "/shop";
  return `${base}/${product.slug}`;
}

/* ------------------------------------------------------------------ */
/* Related products                                                    */
/* ------------------------------------------------------------------ */

/**
 * Related pieces, in priority order: explicit `relatedProducts` ids, then the
 * same subcategory, then shared tags inside the same category, then the wider
 * category. Never the product itself, never an unrelated category.
 */
export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const picked: Product[] = [];
  const seen = new Set<string>([product.id]);

  const push = (candidate: Product | undefined) => {
    if (!candidate || seen.has(candidate.id) || picked.length >= limit) return;
    seen.add(candidate.id);
    picked.push(candidate);
  };

  for (const id of product.relatedProducts ?? []) push(getProductById(id));
  const catalog = publishedProducts();
  for (const p of catalog) if (p.subcategory === product.subcategory) push(p);

  const tags = new Set(product.tags ?? []);
  if (tags.size > 0) {
    for (const p of catalog) {
      if (p.category !== product.category) continue;
      if ((p.tags ?? []).some((t) => tags.has(t))) push(p);
    }
  }
  for (const p of catalog) if (p.category === product.category) push(p);

  return picked;
}

/* ------------------------------------------------------------------ */
/* Facets — filters render only when the data supports them            */
/* ------------------------------------------------------------------ */

export interface CatalogFacets {
  categories: CategorySlug[];
  subcategories: string[];
  colors: string[];
  materials: string[];
  stockStatuses: StockStatus[];
  hasPrices: boolean;
  priceCeiling: number;
  hasNewArrivals: boolean;
  hasBestSellers: boolean;
  hasRatings: boolean;
}

export function buildFacets(scope: Product[]): CatalogFacets {
  const prices = scope.map(effectivePrice).filter((v): v is number => v != null);
  const unique = (values: Array<string | undefined>) =>
    Array.from(new Set(values.filter((v): v is string => !!v))).sort((a, b) => a.localeCompare(b));

  return {
    categories: Array.from(new Set(scope.map((p) => p.category))),
    subcategories: Array.from(new Set(scope.map((p) => p.subcategory))),
    colors: unique(scope.map((p) => p.color)),
    materials: unique(scope.map((p) => p.material)),
    stockStatuses: Array.from(new Set(scope.map((p) => p.stockStatus))),
    hasPrices: prices.length > 0,
    priceCeiling: prices.length > 0 ? Math.max(...prices) : 0,
    hasNewArrivals: scope.some((p) => p.newArrival),
    hasBestSellers: scope.some((p) => p.bestSeller),
    hasRatings: scope.some((p) => (p.reviewCount ?? 0) > 0),
  };
}
