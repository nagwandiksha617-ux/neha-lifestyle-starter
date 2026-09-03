/**
 * Catalog type layer.
 *
 * `Product` is the single canonical record every UI surface reads — product
 * cards, detail pages, listings, filters, search, related products, SEO and
 * the sitemap. Only the fields required to place a product in the store are
 * mandatory; everything descriptive is optional so a record can be published
 * with whatever information genuinely exists and enriched later.
 *
 * `ProductInput` is the permissive shape accepted by the import layer (CSV /
 * JSON / API / database rows). It carries common field aliases so an export
 * from another system can usually be ingested without renaming columns.
 */

import type { LinkProps } from "@tanstack/react-router";

export type RoutePath = NonNullable<LinkProps["to"]>;

export type CategorySlug = "bags" | "clutches" | "jewellery";

export type StockStatus = "in-stock" | "out-of-stock" | "pre-order" | "made-to-order";

/** Historical alias kept so existing imports continue to compile. */
export type Availability = StockStatus;

export type CurrencyCode = "INR";

/** Publication state. Only "published" records reach any public surface. */
export type ProductStatus = "draft" | "published";

export interface SpecRow {
  label: string;
  value: string;
}

export interface Product {
  /** Stable unique identifier (cart, wishlist and related-product references). */
  id: string;
  /** URL segment; unique within its subcategory. */
  slug: string;
  /** Display name (`productName` on import). */
  name: string;
  category: CategorySlug;
  /** Route-matching subcategory slug, e.g. "handbags". */
  subcategory: string;

  /** One-line summary shown on cards and above the fold. */
  shortDescription?: string;
  /** Long-form copy (`fullDescription` on import). */
  description?: string;

  /** Selling price. Omitted when pricing is not configured yet. */
  price?: number;
  /** Original price shown struck through; only rendered when above `price`. */
  compareAtPrice?: number;
  /** Explicit offer price; takes precedence over `price` when set. */
  salePrice?: number;
  currency: CurrencyCode;

  sku?: string;
  stockStatus: StockStatus;
  stockQuantity?: number;

  /** Draft records are hidden from every public surface. */
  status: ProductStatus;
  featured: boolean;
  newArrival: boolean;
  bestSeller: boolean;

  /** Whether the stored price already includes tax. */
  taxInclusive?: boolean;
  /** Quantity at which the admin list flags low stock. */
  lowStockThreshold?: number;

  /** Ordered gallery images. Empty renders a labelled placeholder. */
  images: string[];
  /** Alt text per gallery image, positionally aligned with `images`. */
  imageAlts?: string[];
  /** ISO timestamp of the last catalog edit. */
  updatedAt?: string;
  /** Optional card/thumbnail override; defaults to the first gallery image. */
  thumbnailImage?: string;

  material?: string;
  /** British spelling accepted on import as `colour`. */
  color?: string;
  size?: string;
  dimensions?: string;
  weight?: string;

  careInstructions?: string;
  shippingInformation?: string;
  returnInformation?: string;

  /** Extra label/value rows rendered in Product Details. */
  specifications?: SpecRow[];
  /** Explicit related-product ids; falls back to category/tag affinity. */
  relatedProducts?: string[];
  tags?: string[];

  /** Only ever set from genuine aggregated review data. */
  rating?: number;
  reviewCount?: number;

  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  /** Root-relative canonical override; derived from the slug when absent. */
  canonicalUrl?: string;
}

/** Back-compat alias: the pre-Phase-5 field name for `stockStatus`. */
export type ProductWithAvailability = Product & { availability: StockStatus };

/**
 * Permissive record accepted by the import layer. Every field is optional so
 * partial rows can be reported as errors rather than crashing a build.
 */
export interface ProductInput {
  id?: string;
  slug?: string;
  name?: string;
  productName?: string;
  category?: string;
  subcategory?: string;

  shortDescription?: string;
  description?: string;
  fullDescription?: string;

  price?: number | string;
  compareAtPrice?: number | string;
  salePrice?: number | string;
  currency?: string;

  sku?: string;
  stockStatus?: string;
  availability?: string;
  stockQuantity?: number | string;

  status?: string;
  published?: boolean | string;
  taxInclusive?: boolean | string;
  lowStockThreshold?: number | string;
  imageAlts?: string[] | string;
  updatedAt?: string;

  featured?: boolean | string;
  newArrival?: boolean | string;
  bestSeller?: boolean | string;

  images?: string[] | string;
  thumbnailImage?: string;

  material?: string;
  color?: string;
  colour?: string;
  size?: string;
  dimensions?: string;
  weight?: string;

  care?: string;
  careInstructions?: string;
  shippingInformation?: string;
  returnInformation?: string;

  specifications?: SpecRow[];
  relatedProducts?: string[] | string;
  tags?: string[] | string;

  rating?: number | string;
  reviewCount?: number | string;

  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[] | string;
  canonicalUrl?: string;
}

export interface Subcategory {
  name: string;
  slug: string;
  category: CategorySlug;
  /** Listing route for this subcategory. */
  path: RoutePath;
  /** Product detail route pattern, e.g. "/bags/handbags/$slug". */
  productPattern: RoutePath;
  shortDescription: string;
}
