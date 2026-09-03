/**
 * CSV template, export and import helpers.
 *
 * The column set matches the field names the Phase 5 import layer already
 * understands, so a file exported here can be re-imported unchanged, and a
 * file produced by another system usually imports as-is.
 *
 * Limitations (surfaced in the UI too): values are comma-separated with
 * standard double-quote escaping, and multi-value columns (images, imageAlts,
 * tags, seoKeywords) use `|` between values.
 */

import type { Product, ProductInput } from "./types";
import { parseProductsCsv } from "./normalize";

export const CSV_COLUMNS = [
  "id",
  "productName",
  "slug",
  "category",
  "subcategory",
  "sku",
  "shortDescription",
  "fullDescription",
  "price",
  "compareAtPrice",
  "currency",
  "taxInclusive",
  "stockStatus",
  "stockQuantity",
  "lowStockThreshold",
  "material",
  "colour",
  "size",
  "dimensions",
  "weight",
  "careInstructions",
  "shippingInformation",
  "returnInformation",
  "status",
  "featured",
  "newArrival",
  "bestSeller",
  "images",
  "imageAlts",
  "tags",
  "seoTitle",
  "seoDescription",
  "seoKeywords",
  "canonicalUrl",
] as const;

function cell(value: unknown): string {
  if (value == null) return "";
  const raw = Array.isArray(value) ? value.join("|") : String(value);
  return /[",\n]/.test(raw) ? `"${raw.replace(/"/g, '""')}"` : raw;
}

/** Header row plus one commented-out guidance row — no invented product data. */
export function buildCsvTemplate(): string {
  return `${CSV_COLUMNS.join(",")}\n`;
}

export function exportCatalogCsv(products: Product[]): string {
  const rows = products.map((p) =>
    [
      p.id,
      p.name,
      p.slug,
      p.category,
      p.subcategory,
      p.sku,
      p.shortDescription,
      p.description,
      p.price,
      p.compareAtPrice,
      p.currency,
      p.taxInclusive,
      p.stockStatus,
      p.stockQuantity,
      p.lowStockThreshold,
      p.material,
      p.color,
      p.size,
      p.dimensions,
      p.weight,
      p.careInstructions,
      p.shippingInformation,
      p.returnInformation,
      p.status,
      p.featured,
      p.newArrival,
      p.bestSeller,
      p.images,
      p.imageAlts,
      p.tags,
      p.seoTitle,
      p.seoDescription,
      p.seoKeywords,
      p.canonicalUrl,
    ]
      .map(cell)
      .join(","),
  );
  return [CSV_COLUMNS.join(","), ...rows].join("\n");
}

export function exportCatalogJson(rows: ProductInput[]): string {
  return JSON.stringify({ products: rows }, null, 2);
}

export { parseProductsCsv };

/** Triggers a browser download without leaving the page. */
export function downloadFile(filename: string, contents: string, mime: string): void {
  if (typeof window === "undefined") return;
  const blob = new Blob([contents], { type: `${mime};charset=utf-8` });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
