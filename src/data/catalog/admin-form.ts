/**
 * Catalog form model and validation.
 *
 * The form works in plain strings so partially-filled records stay editable;
 * `validateProductForm` converts a form to a `ProductInput` row and returns
 * field-level errors. A record that fails validation is never saved.
 *
 * SEO defaults (slug, SEO title, meta description, canonical URL) are
 * *suggested* from the fields the owner has actually filled in — they are
 * always editable and never fabricate a claim about the product.
 */

import { slugify } from "./normalize";
import { findSubcategory, subcategoryName } from "./taxonomy";
import type { CategorySlug, Product, ProductInput, ProductStatus, StockStatus } from "./types";

export interface ImageDraft {
  url: string;
  alt: string;
}

export interface ProductForm {
  id: string;
  productName: string;
  slug: string;
  category: CategorySlug | "";
  subcategory: string;
  sku: string;
  shortDescription: string;
  fullDescription: string;

  price: string;
  compareAtPrice: string;
  currency: "INR";
  taxInclusive: boolean;

  stockStatus: StockStatus;
  stockQuantity: string;
  lowStockThreshold: string;

  material: string;
  colour: string;
  size: string;
  dimensions: string;
  weight: string;
  careInstructions: string;

  shippingInformation: string;
  returnInformation: string;

  status: ProductStatus;
  featured: boolean;
  newArrival: boolean;
  bestSeller: boolean;

  images: ImageDraft[];
  tags: string;

  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  canonicalUrl: string;
}

export type ProductFormErrors = Partial<Record<keyof ProductForm, string>>;

export function emptyProductForm(): ProductForm {
  return {
    id: "",
    productName: "",
    slug: "",
    category: "",
    subcategory: "",
    sku: "",
    shortDescription: "",
    fullDescription: "",
    price: "",
    compareAtPrice: "",
    currency: "INR",
    taxInclusive: true,
    stockStatus: "in-stock",
    stockQuantity: "",
    lowStockThreshold: "",
    material: "",
    colour: "",
    size: "",
    dimensions: "",
    weight: "",
    careInstructions: "",
    shippingInformation: "",
    returnInformation: "",
    status: "draft",
    featured: false,
    newArrival: false,
    bestSeller: false,
    images: [],
    tags: "",
    seoTitle: "",
    seoDescription: "",
    seoKeywords: "",
    canonicalUrl: "",
  };
}

export function formFromProduct(product: Product): ProductForm {
  const base = emptyProductForm();
  return {
    ...base,
    id: product.id,
    productName: product.name,
    slug: product.slug,
    category: product.category,
    subcategory: product.subcategory,
    sku: product.sku ?? "",
    shortDescription: product.shortDescription ?? "",
    fullDescription: product.description ?? "",
    price: product.price != null ? String(product.price) : "",
    compareAtPrice: product.compareAtPrice != null ? String(product.compareAtPrice) : "",
    taxInclusive: product.taxInclusive ?? true,
    stockStatus: product.stockStatus,
    stockQuantity: product.stockQuantity != null ? String(product.stockQuantity) : "",
    lowStockThreshold: product.lowStockThreshold != null ? String(product.lowStockThreshold) : "",
    material: product.material ?? "",
    colour: product.color ?? "",
    size: product.size ?? "",
    dimensions: product.dimensions ?? "",
    weight: product.weight ?? "",
    careInstructions: product.careInstructions ?? "",
    shippingInformation: product.shippingInformation ?? "",
    returnInformation: product.returnInformation ?? "",
    status: product.status,
    featured: product.featured,
    newArrival: product.newArrival,
    bestSeller: product.bestSeller,
    images: product.images.map((url, i) => ({ url, alt: product.imageAlts?.[i] ?? "" })),
    tags: (product.tags ?? []).join(", "),
    seoTitle: product.seoTitle ?? "",
    seoDescription: product.seoDescription ?? "",
    seoKeywords: (product.seoKeywords ?? []).join(", "),
    canonicalUrl: product.canonicalUrl ?? "",
  };
}

/* ------------------------------------------------------------------ */
/* SEO suggestions — editable defaults, never fabricated claims        */
/* ------------------------------------------------------------------ */

export function suggestSlug(form: ProductForm): string {
  return slugify(form.productName);
}

export function suggestSeoTitle(form: ProductForm): string {
  if (!form.productName) return "";
  const label = form.subcategory ? subcategoryName(form.subcategory) : "";
  return [form.productName, label, "Neha Lifestyle"].filter(Boolean).join(" | ");
}

export function suggestSeoDescription(form: ProductForm): string {
  if (form.shortDescription.trim()) return form.shortDescription.trim().slice(0, 158);
  if (!form.productName) return "";
  const label = form.subcategory ? subcategoryName(form.subcategory).toLowerCase() : "collection";
  return `${form.productName} from the ${label} edit at Neha Lifestyle.`.slice(0, 158);
}

export function suggestCanonicalUrl(form: ProductForm): string {
  const sub = findSubcategory(form.subcategory);
  const slug = form.slug || suggestSlug(form);
  if (!sub || !slug) return "";
  return `${sub.path}/${slug}`;
}

/* ------------------------------------------------------------------ */
/* Validation                                                          */
/* ------------------------------------------------------------------ */

const SKU_PATTERN = /^[A-Za-z0-9][A-Za-z0-9-_]{1,31}$/;
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function parseAmount(value: string): number | undefined | "invalid" {
  const raw = value.trim();
  if (!raw) return undefined;
  const parsed = Number(raw);
  if (!Number.isFinite(parsed) || parsed < 0) return "invalid";
  return parsed;
}

export interface ValidationResult {
  errors: ProductFormErrors;
  row?: ProductInput;
}

/**
 * Validates a form against the taxonomy and the existing catalog.
 * `existing` is every current record, used for the duplicate-slug check.
 */
export function validateProductForm(form: ProductForm, existing: Product[]): ValidationResult {
  const errors: ProductFormErrors = {};

  const name = form.productName.trim();
  if (!name) errors.productName = "Product name is required.";

  if (!form.category) errors.category = "Choose a category.";
  const sub = findSubcategory(form.subcategory);
  if (!form.subcategory) errors.subcategory = "Choose a subcategory.";
  else if (!sub || (form.category && sub.category !== form.category))
    errors.subcategory = "That subcategory does not belong to the selected category.";

  const slug = (form.slug.trim() || slugify(name)).toLowerCase();
  if (!slug) errors.slug = "A URL slug is required.";
  else if (!SLUG_PATTERN.test(slug))
    errors.slug = "Use lowercase letters, numbers and single hyphens only.";
  else if (
    existing.some((p) => p.id !== form.id && p.subcategory === form.subcategory && p.slug === slug)
  )
    errors.slug = "Another product in this subcategory already uses this URL.";

  const sku = form.sku.trim();
  if (sku && !SKU_PATTERN.test(sku))
    errors.sku = "Use 2–32 letters, numbers, hyphens or underscores (e.g. NL-BAG-001).";
  else if (sku && existing.some((p) => p.id !== form.id && p.sku === sku))
    errors.sku = "Another product already uses this SKU.";

  const price = parseAmount(form.price);
  if (price === "invalid") errors.price = "Enter a valid amount, or leave blank.";
  const compareAt = parseAmount(form.compareAtPrice);
  if (compareAt === "invalid") errors.compareAtPrice = "Enter a valid amount, or leave blank.";
  if (
    typeof price === "number" &&
    typeof compareAt === "number" &&
    compareAt > 0 &&
    compareAt <= price
  )
    errors.compareAtPrice = "Compare-at price must be higher than the price.";

  const stockQuantity = parseAmount(form.stockQuantity);
  if (stockQuantity === "invalid") errors.stockQuantity = "Enter a whole number, or leave blank.";
  const lowStock = parseAmount(form.lowStockThreshold);
  if (lowStock === "invalid") errors.lowStockThreshold = "Enter a whole number, or leave blank.";

  if (form.canonicalUrl.trim() && !form.canonicalUrl.trim().startsWith("/"))
    errors.canonicalUrl = "Use a path that starts with / (e.g. /bags/handbags/my-product).";

  if (Object.keys(errors).length > 0) return { errors };

  const listValues = (value: string) =>
    value
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);

  const row: ProductInput = {
    id: form.id || `${form.subcategory}-${slug}`,
    slug,
    productName: name,
    category: form.category as CategorySlug,
    subcategory: form.subcategory,
    currency: "INR",
    status: form.status,
    stockStatus: form.stockStatus,
    featured: form.featured,
    newArrival: form.newArrival,
    bestSeller: form.bestSeller,
    taxInclusive: form.taxInclusive,
    images: form.images.map((i) => i.url.trim()).filter(Boolean),
    imageAlts: form.images.map((i) => i.alt.trim()),
  };

  const put = <K extends keyof ProductInput>(key: K, value: ProductInput[K] | undefined) => {
    if (value !== undefined && value !== "") row[key] = value;
  };

  put("sku", sku || undefined);
  put("shortDescription", form.shortDescription.trim() || undefined);
  put("fullDescription", form.fullDescription.trim() || undefined);
  put("price", typeof price === "number" ? price : undefined);
  put("compareAtPrice", typeof compareAt === "number" ? compareAt : undefined);
  put("stockQuantity", typeof stockQuantity === "number" ? stockQuantity : undefined);
  put("lowStockThreshold", typeof lowStock === "number" ? lowStock : undefined);
  put("material", form.material.trim() || undefined);
  put("colour", form.colour.trim() || undefined);
  put("size", form.size.trim() || undefined);
  put("dimensions", form.dimensions.trim() || undefined);
  put("weight", form.weight.trim() || undefined);
  put("careInstructions", form.careInstructions.trim() || undefined);
  put("shippingInformation", form.shippingInformation.trim() || undefined);
  put("returnInformation", form.returnInformation.trim() || undefined);
  put("seoTitle", form.seoTitle.trim() || undefined);
  put("seoDescription", form.seoDescription.trim() || undefined);
  put("canonicalUrl", form.canonicalUrl.trim() || undefined);

  const tags = listValues(form.tags);
  if (tags.length) row.tags = tags;
  const keywords = listValues(form.seoKeywords);
  if (keywords.length) row.seoKeywords = keywords;

  return { errors, row };
}
