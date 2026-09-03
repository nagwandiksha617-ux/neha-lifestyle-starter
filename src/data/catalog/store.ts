/**
 * Reactive catalog store.
 *
 * Holds the working record set (published *and* draft) and notifies React via
 * `useSyncExternalStore`. Server rendering and the first client render both
 * use the build-time source records, so hydration is stable; the locally saved
 * catalog is merged in after mount by `hydrateCatalog()`.
 *
 * Reads for public surfaces go through `publishedProducts()`, which never
 * returns a draft — that single filter is what keeps drafts out of listings,
 * search, collections, related products, structured data and the sitemap.
 */

import { normalizeCatalog, type ImportIssue } from "./normalize";
import { catalogRepository } from "./repository";
import { catalogRecords } from "./source";
import type { Product, ProductInput } from "./types";

interface CatalogState {
  rows: ProductInput[];
  products: Product[];
  issues: ImportIssue[];
  /** True once the locally saved catalog has been read in the browser. */
  hydrated: boolean;
}

function build(rows: ProductInput[], hydrated: boolean): CatalogState {
  const { products, issues } = normalizeCatalog(rows);
  return { rows, products, issues, hydrated };
}

const serverState: CatalogState = build(catalogRecords, false);
let state: CatalogState = serverState;

const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

function setRows(rows: ProductInput[], persist = true) {
  state = build(rows, true);
  if (persist) catalogRepository.write(rows);
  emit();
}

export function subscribeCatalog(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getCatalogState(): CatalogState {
  return state;
}

export function getServerCatalogState(): CatalogState {
  return serverState;
}

/** Reads the saved catalog once, in the browser, after hydration. */
export function hydrateCatalog(): void {
  if (state.hydrated) return;
  const stored = catalogRepository.read();
  state = build(stored ?? catalogRecords, true);
  emit();
}

/* ------------------------------------------------------------------ */
/* Reads                                                               */
/* ------------------------------------------------------------------ */

/** Every record, drafts included. Admin surfaces only. */
export function allProducts(): Product[] {
  return state.products;
}

/** Published records only — the single source for every public surface. */
export function publishedProducts(): Product[] {
  return state.products.filter((p) => p.status === "published");
}

export function catalogRows(): ProductInput[] {
  return state.rows;
}

export function catalogImportIssues(): ImportIssue[] {
  return state.issues;
}

/* ------------------------------------------------------------------ */
/* Writes                                                              */
/* ------------------------------------------------------------------ */

function rowId(row: ProductInput, index: number): string {
  return row.id ?? `${row.subcategory ?? "product"}-${row.slug ?? index}`;
}

export function upsertProductRow(row: ProductInput): void {
  const rows = [...state.rows];
  const index = rows.findIndex((r, i) => rowId(r, i) === row.id);
  const stamped = { ...row, updatedAt: new Date().toISOString() };
  if (index >= 0) rows[index] = stamped;
  else rows.push(stamped);
  setRows(rows);
}

export function deleteProductRows(ids: string[]): void {
  const remove = new Set(ids);
  setRows(state.rows.filter((r, i) => !remove.has(rowId(r, i))));
}

export function duplicateProductRow(id: string): string | undefined {
  const index = state.rows.findIndex((r, i) => rowId(r, i) === id);
  if (index < 0) return undefined;
  const original = state.rows[index]!;
  const suffix = Date.now().toString(36).slice(-4);
  const { name: _ignoredName, ...rest } = original;
  const copy: ProductInput = {
    ...rest,
    id: `${id}-copy-${suffix}`,
    slug: `${original.slug ?? "product"}-copy-${suffix}`,
    productName: `${original.productName ?? original.name ?? "Product"} (copy)`,
    status: "draft",
    updatedAt: new Date().toISOString(),
  };
  const rows = [...state.rows];
  rows.splice(index + 1, 0, copy);
  setRows(rows);
  return copy.id;
}

/** Bulk field patch — powers publish / unpublish / flag actions. */
export function patchProductRows(ids: string[], patch: Partial<ProductInput>): void {
  const target = new Set(ids);
  setRows(
    state.rows.map((r, i) =>
      target.has(rowId(r, i)) ? { ...r, ...patch, updatedAt: new Date().toISOString() } : r,
    ),
  );
}

/** Adds imported rows, replacing any existing row with the same id. */
export function mergeImportedRows(incoming: ProductInput[]): void {
  const rows = [...state.rows];
  for (const row of incoming) {
    const index = rows.findIndex((r, i) => rowId(r, i) === row.id);
    if (index >= 0) rows[index] = row;
    else rows.push(row);
  }
  setRows(rows);
}

export function replaceCatalogRows(rows: ProductInput[]): void {
  setRows(rows);
}

/** Clears local edits and returns to the build-time source records. */
export function resetCatalog(): void {
  catalogRepository.clear();
  state = build(catalogRecords, true);
  emit();
}
