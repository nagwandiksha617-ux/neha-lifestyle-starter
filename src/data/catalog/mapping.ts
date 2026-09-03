/**
 * Database mapping.
 *
 * Converts between the catalog's `ProductInput` rows and the `products` /
 * `product_images` tables. Nothing is invented here: a column that is null
 * stays undefined on the row, and the UI keeps rendering its neutral state.
 */

import type { ProductInput } from "./types";

export interface ProductDbRow {
  id: string;
  product_name: string;
  slug: string;
  category: string;
  subcategory: string;
  sku: string | null;
  short_description: string | null;
  full_description: string | null;
  price: number | string | null;
  compare_at_price: number | string | null;
  currency: string | null;
  tax_inclusive: boolean | null;
  stock_status: string | null;
  stock_quantity: number | null;
  low_stock_threshold: number | null;
  material: string | null;
  colour: string | null;
  size: string | null;
  dimensions: string | null;
  weight: string | null;
  care_instructions: string | null;
  shipping_information: string | null;
  return_information: string | null;
  tags: string[] | null;
  featured: boolean | null;
  new_arrival: boolean | null;
  best_seller: boolean | null;
  status: string | null;
  seo_title: string | null;
  seo_description: string | null;
  seo_keywords: string[] | null;
  canonical_url: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface ProductImageDbRow {
  id?: string;
  product_id: string;
  image_url: string;
  alt_text: string | null;
  sort_order: number | null;
  is_primary: boolean | null;
}

function opt<T>(value: T | null | undefined): T | undefined {
  return value === null || value === undefined ? undefined : value;
}

function amount(value: number | string | null | undefined): number | undefined {
  if (value === null || value === undefined || value === "") return undefined;
  const parsed = typeof value === "number" ? value : Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function whole(value: unknown): number | null {
  if (value === null || value === undefined || value === "") return null;
  const parsed = typeof value === "number" ? value : Number(String(value).replace(/[^0-9.-]/g, ""));
  return Number.isFinite(parsed) ? Math.round(parsed) : null;
}

function money(value: unknown): number | null {
  if (value === null || value === undefined || value === "") return null;
  const parsed = typeof value === "number" ? value : Number(String(value).replace(/[^0-9.-]/g, ""));
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
}

function str(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function strList(value: unknown): string[] {
  if (Array.isArray(value)) return value.map((v) => String(v).trim()).filter(Boolean);
  if (typeof value === "string")
    return value
      .split(/[|;,]/)
      .map((v) => v.trim())
      .filter(Boolean);
  return [];
}

function flag(value: unknown, fallback = false): boolean {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    const raw = value.trim().toLowerCase();
    if (!raw) return fallback;
    return ["true", "yes", "1", "y"].includes(raw);
  }
  return fallback;
}

/** Database record (plus its image rows) → catalog row. */
export function rowFromDb(row: ProductDbRow, images: ProductImageDbRow[] = []): ProductInput {
  const ordered = [...images].sort((a, b) => {
    if (a.is_primary !== b.is_primary) return a.is_primary ? -1 : 1;
    return (a.sort_order ?? 0) - (b.sort_order ?? 0);
  });

  const input: ProductInput = {
    id: row.id,
    slug: row.slug,
    productName: row.product_name,
    category: row.category,
    subcategory: row.subcategory,
    status: row.status ?? "draft",
    stockStatus: row.stock_status ?? "in-stock",
    currency: row.currency ?? "INR",
    featured: row.featured ?? false,
    newArrival: row.new_arrival ?? false,
    bestSeller: row.best_seller ?? false,
    taxInclusive: row.tax_inclusive ?? true,
    images: ordered.map((i) => i.image_url),
    imageAlts: ordered.map((i) => i.alt_text ?? ""),
  };

  const put = <K extends keyof ProductInput>(key: K, value: ProductInput[K] | undefined) => {
    if (value !== undefined) input[key] = value;
  };

  put("sku", opt(row.sku));
  put("shortDescription", opt(row.short_description));
  put("fullDescription", opt(row.full_description));
  put("price", amount(row.price));
  put("compareAtPrice", amount(row.compare_at_price));
  put("stockQuantity", opt(row.stock_quantity));
  put("lowStockThreshold", opt(row.low_stock_threshold));
  put("material", opt(row.material));
  put("colour", opt(row.colour));
  put("size", opt(row.size));
  put("dimensions", opt(row.dimensions));
  put("weight", opt(row.weight));
  put("careInstructions", opt(row.care_instructions));
  put("shippingInformation", opt(row.shipping_information));
  put("returnInformation", opt(row.return_information));
  put("seoTitle", opt(row.seo_title));
  put("seoDescription", opt(row.seo_description));
  put("canonicalUrl", opt(row.canonical_url));
  put("updatedAt", opt(row.updated_at));

  if (row.tags?.length) input.tags = row.tags;
  if (row.seo_keywords?.length) input.seoKeywords = row.seo_keywords;

  return input;
}

/** Catalog row → `products` column values. */
export function dbFromRow(row: ProductInput): Record<string, unknown> {
  return {
    product_name: str(row.productName ?? row.name) ?? "",
    slug: str(row.slug) ?? "",
    category: str(row.category) ?? "",
    subcategory: str(row.subcategory) ?? "",
    sku: str(row.sku),
    short_description: str(row.shortDescription),
    full_description: str(row.fullDescription ?? row.description),
    price: money(row.price),
    compare_at_price: money(row.compareAtPrice),
    currency: str(row.currency) ?? "INR",
    tax_inclusive: flag(row.taxInclusive, true),
    stock_status: str(row.stockStatus) ?? "in-stock",
    stock_quantity: whole(row.stockQuantity),
    low_stock_threshold: whole(row.lowStockThreshold),
    material: str(row.material),
    colour: str(row.colour ?? row.color),
    size: str(row.size),
    dimensions: str(row.dimensions),
    weight: str(row.weight),
    care_instructions: str(row.careInstructions),
    shipping_information: str(row.shippingInformation),
    return_information: str(row.returnInformation),
    tags: strList(row.tags),
    featured: flag(row.featured),
    new_arrival: flag(row.newArrival),
    best_seller: flag(row.bestSeller),
    status: str(row.status) === "published" ? "published" : "draft",
    seo_title: str(row.seoTitle),
    seo_description: str(row.seoDescription),
    seo_keywords: strList(row.seoKeywords),
    canonical_url: str(row.canonicalUrl),
  };
}

/** Catalog row → `product_images` rows for one product. */
export function imageRowsFromRow(row: ProductInput, productId: string): ProductImageDbRow[] {
  const urls = Array.isArray(row.images) ? row.images.map((u) => String(u).trim()) : [];
  const alts = Array.isArray(row.imageAlts) ? row.imageAlts : [];
  return urls
    .filter(Boolean)
    .map((url, index) => ({
      product_id: productId,
      image_url: url,
      alt_text: str(alts[index]),
      sort_order: index,
      is_primary: index === 0,
    }));
}

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function isDatabaseId(value: unknown): value is string {
  return typeof value === "string" && UUID.test(value);
}
