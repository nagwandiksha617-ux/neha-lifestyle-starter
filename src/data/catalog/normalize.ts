/**
 * Import layer.
 *
 * Turns loosely-typed records (CSV rows, JSON exports, API/database results)
 * into validated `Product` objects. Everything downstream — cards, detail
 * pages, listings, filters, search, related products, SEO, sitemap — is driven
 * by the output of this function, so importing a real catalog requires no
 * component changes.
 *
 * Nothing is invented here: a field that is missing stays missing, and the UI
 * renders a neutral state for it.
 */

import type { CategorySlug, Product, ProductInput, ProductStatus, StockStatus } from "./types";
import { findSubcategory } from "./taxonomy";

const CATEGORY_SLUGS: CategorySlug[] = ["bags", "clutches", "jewellery"];
const STOCK_STATUSES: StockStatus[] = [
  "in-stock",
  "out-of-stock",
  "pre-order",
  "made-to-order",
];

export interface ImportIssue {
  index: number;
  identifier: string;
  reason: string;
}

export interface ImportResult {
  products: Product[];
  issues: ImportIssue[];
}

/**
 * Publication state. Records without an explicit status stay published so
 * existing exports and API rows keep behaving exactly as before.
 */
function parseStatus(raw: ProductInput): ProductStatus {
  const value = typeof raw.status === "string" ? raw.status.trim().toLowerCase() : "";
  if (value === "draft" || value === "unpublished") return "draft";
  if (value === "published" || value === "active") return "published";
  if (raw.published !== undefined) {
    const flag = String(raw.published).trim().toLowerCase();
    if (flag) return ["false", "0", "no", "draft"].includes(flag) ? "draft" : "published";
  }
  return "published";
}

export function slugify(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function text(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function num(value: unknown): number | undefined {
  if (typeof value === "number") return Number.isFinite(value) ? value : undefined;
  const raw = text(value);
  if (!raw) return undefined;
  const parsed = Number(raw.replace(/[^0-9.-]/g, ""));
  return Number.isFinite(parsed) ? parsed : undefined;
}

function bool(value: unknown): boolean {
  if (typeof value === "boolean") return value;
  const raw = text(value)?.toLowerCase();
  return raw === "true" || raw === "yes" || raw === "1" || raw === "y";
}

function list(value: unknown): string[] {
  if (Array.isArray(value)) return value.map((v) => String(v).trim()).filter(Boolean);
  const raw = text(value);
  if (!raw) return [];
  return raw
    .split(/[|;,]/)
    .map((v) => v.trim())
    .filter(Boolean);
}

/**
 * Converts one raw record into a `Product`, or returns the reason it could not
 * be published. Category, subcategory and a name are the only hard
 * requirements — without them a product has no route and no label.
 */
export function normalizeProduct(
  raw: ProductInput,
  index = 0,
): { product: Product } | { error: ImportIssue } {
  const name = text(raw.name) ?? text(raw.productName);
  const categoryRaw = text(raw.category)?.toLowerCase();
  const subcategoryRaw = text(raw.subcategory)?.toLowerCase();
  const identifier = text(raw.id) ?? text(raw.slug) ?? name ?? `row ${index + 1}`;

  const fail = (reason: string) => ({ error: { index, identifier, reason } });

  if (!name) return fail("Missing product name.");
  if (!categoryRaw || !CATEGORY_SLUGS.includes(categoryRaw as CategorySlug)) {
    return fail(`Unknown category "${categoryRaw ?? ""}". Expected one of ${CATEGORY_SLUGS.join(", ")}.`);
  }
  const category = categoryRaw as CategorySlug;

  if (!subcategoryRaw) return fail("Missing subcategory.");
  const subcategory = findSubcategory(subcategoryRaw);
  if (!subcategory) return fail(`Unknown subcategory "${subcategoryRaw}".`);
  if (subcategory.category !== category) {
    return fail(`Subcategory "${subcategoryRaw}" does not belong to category "${category}".`);
  }

  const slug = text(raw.slug) ? slugify(text(raw.slug)!) : slugify(name);
  if (!slug) return fail("Could not derive a URL slug from the product name.");

  const stockRaw = (text(raw.stockStatus) ?? text(raw.availability) ?? "").toLowerCase();
  const stockStatus: StockStatus = STOCK_STATUSES.includes(stockRaw as StockStatus)
    ? (stockRaw as StockStatus)
    : "in-stock";

  const images = list(raw.images);
  const price = num(raw.price);
  const salePrice = num(raw.salePrice);
  const compareAtPrice = num(raw.compareAtPrice);
  const rating = num(raw.rating);
  const reviewCount = num(raw.reviewCount);

  const product: Product = {
    id: text(raw.id) ?? `${subcategory.slug}-${slug}`,
    slug,
    name,
    category,
    subcategory: subcategory.slug,
    currency: "INR",
    stockStatus,
    status: parseStatus(raw),
    images,
    featured: bool(raw.featured),
    newArrival: bool(raw.newArrival),
    bestSeller: bool(raw.bestSeller),
  };

  const shortDescription = text(raw.shortDescription);
  const description = text(raw.description) ?? text(raw.fullDescription);
  const sku = text(raw.sku);
  const stockQuantity = num(raw.stockQuantity);
  const thumbnailImage = text(raw.thumbnailImage);
  const material = text(raw.material);
  const color = text(raw.color) ?? text(raw.colour);
  const size = text(raw.size);
  const dimensions = text(raw.dimensions);
  const weight = text(raw.weight);
  const careInstructions = text(raw.careInstructions) ?? text(raw.care);
  const shippingInformation = text(raw.shippingInformation);
  const returnInformation = text(raw.returnInformation);
  const relatedProducts = list(raw.relatedProducts);
  const tags = list(raw.tags);
  const seoTitle = text(raw.seoTitle);
  const seoDescription = text(raw.seoDescription);
  const seoKeywords = list(raw.seoKeywords);
  const canonicalUrl = text(raw.canonicalUrl);

  if (shortDescription) product.shortDescription = shortDescription;
  if (description) product.description = description;
  if (price != null && price > 0) product.price = price;
  if (salePrice != null && salePrice > 0) product.salePrice = salePrice;
  if (compareAtPrice != null && compareAtPrice > 0) product.compareAtPrice = compareAtPrice;
  if (sku) product.sku = sku;
  if (stockQuantity != null) product.stockQuantity = stockQuantity;
  if (thumbnailImage) product.thumbnailImage = thumbnailImage;
  if (material) product.material = material;
  if (color) product.color = color;
  if (size) product.size = size;
  if (dimensions) product.dimensions = dimensions;
  if (weight) product.weight = weight;
  if (careInstructions) product.careInstructions = careInstructions;
  if (shippingInformation) product.shippingInformation = shippingInformation;
  if (returnInformation) product.returnInformation = returnInformation;
  if (raw.specifications?.length) product.specifications = raw.specifications;
  if (relatedProducts.length) product.relatedProducts = relatedProducts;
  if (tags.length) product.tags = tags;
  // Ratings are only published when they come from real aggregated reviews.
  if (rating != null && reviewCount != null && reviewCount > 0) {
    product.rating = rating;
    product.reviewCount = reviewCount;
  }
  if (seoTitle) product.seoTitle = seoTitle;
  if (seoDescription) product.seoDescription = seoDescription;
  if (seoKeywords.length) product.seoKeywords = seoKeywords;
  if (canonicalUrl) product.canonicalUrl = canonicalUrl;

  const imageAlts = list(raw.imageAlts);
  const lowStockThreshold = num(raw.lowStockThreshold);
  const updatedAt = text(raw.updatedAt);
  if (imageAlts.length) product.imageAlts = imageAlts;
  if (lowStockThreshold != null) product.lowStockThreshold = lowStockThreshold;
  if (raw.taxInclusive !== undefined && text(String(raw.taxInclusive ?? "")) !== undefined) {
    product.taxInclusive = bool(raw.taxInclusive);
  }
  if (updatedAt) product.updatedAt = updatedAt;

  return { product };
}

/** Normalizes a whole catalog, dropping (and reporting) unusable rows. */
export function normalizeCatalog(rows: ProductInput[]): ImportResult {
  const products: Product[] = [];
  const issues: ImportIssue[] = [];
  const seen = new Set<string>();

  rows.forEach((row, index) => {
    const result = normalizeProduct(row, index);
    if ("error" in result) {
      issues.push(result.error);
      return;
    }
    const key = `${result.product.subcategory}/${result.product.slug}`;
    if (seen.has(key)) {
      issues.push({
        index,
        identifier: result.product.name,
        reason: `Duplicate URL "${key}" — slugs must be unique within a subcategory.`,
      });
      return;
    }
    seen.add(key);
    products.push(result.product);
  });

  return { products, issues };
}

/** Parses a JSON catalog export (array, or `{ products: [...] }`). */
export function parseProductsJson(json: string): ImportResult {
  let data: unknown;
  try {
    data = JSON.parse(json);
  } catch {
    return { products: [], issues: [{ index: 0, identifier: "file", reason: "Invalid JSON." }] };
  }
  const rows = Array.isArray(data)
    ? data
    : Array.isArray((data as { products?: unknown }).products)
      ? (data as { products: unknown[] }).products
      : null;
  if (!rows) {
    return {
      products: [],
      issues: [{ index: 0, identifier: "file", reason: "Expected an array of products." }],
    };
  }
  return normalizeCatalog(rows as ProductInput[]);
}

function splitCsvLine(line: string): string[] {
  const cells: string[] = [];
  let current = "";
  let quoted = false;
  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    if (quoted) {
      if (char === '"' && line[i + 1] === '"') {
        current += '"';
        i += 1;
      } else if (char === '"') {
        quoted = false;
      } else {
        current += char;
      }
    } else if (char === '"') {
      quoted = true;
    } else if (char === ",") {
      cells.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  cells.push(current);
  return cells.map((c) => c.trim());
}

/**
 * Parses a CSV catalog export. Header names map directly to `ProductInput`
 * keys; multi-value columns (images, tags, seoKeywords, relatedProducts) accept
 * `|`, `;` or `,` separated values inside a quoted cell.
 */
export function parseProductsCsv(csv: string): ImportResult {
  const lines = csv.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length < 2) {
    return {
      products: [],
      issues: [{ index: 0, identifier: "file", reason: "CSV needs a header row and at least one product." }],
    };
  }
  const headers = splitCsvLine(lines[0]!);
  const rows = lines.slice(1).map((line) => {
    const cells = splitCsvLine(line);
    const row: Record<string, string> = {};
    headers.forEach((header, i) => {
      if (header) row[header] = cells[i] ?? "";
    });
    return row as ProductInput;
  });
  return normalizeCatalog(rows);
}
