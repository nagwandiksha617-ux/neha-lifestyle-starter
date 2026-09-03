/**
 * Reactive catalog store.
 *
 * Holds the working record set and notifies React via `useSyncExternalStore`.
 * Records come from the cloud database: the root route loader seeds the
 * published catalog so server rendering, SEO and hydration all see the same
 * data, and the admin area refreshes the store with the full record set
 * (drafts included) once an administrator is signed in.
 *
 * Reads for public surfaces go through `publishedProducts()`, which never
 * returns a draft — that single filter is what keeps drafts out of listings,
 * search, collections, related products, structured data and the sitemap.
 */

import { normalizeCatalog, type ImportIssue } from "./normalize";
import { catalogRepository } from "./repository";
import type { Product, ProductInput } from "./types";

interface CatalogState {
  rows: ProductInput[];
  products: Product[];
  issues: ImportIssue[];
  /** True once records have been read from the backend. */
  hydrated: boolean;
  loading: boolean;
  error: string | null;
}

function build(rows: ProductInput[], patch: Partial<CatalogState> = {}): CatalogState {
  const { products, issues } = normalizeCatalog(rows);
  return {
    rows,
    products,
    issues,
    hydrated: true,
    loading: false,
    error: null,
    ...patch,
  };
}

let serverState: CatalogState = build([], { hydrated: false });
let state: CatalogState = serverState;

const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

function setState(next: CatalogState) {
  state = next;
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

/**
 * Seeds the store with rows fetched outside React (the root loader).
 * Server and first client render therefore agree, so hydration is stable.
 */
export function seedCatalog(rows: ProductInput[]): void {
  serverState = build(rows);
  state = serverState;
  emit();
}

let inflight: Promise<void> | null = null;

/** Re-reads the catalog the current visitor is allowed to see. */
export function refreshCatalog(): Promise<void> {
  if (inflight) return inflight;
  setState({ ...state, loading: true, error: null });
  inflight = catalogRepository
    .list()
    .then((rows) => {
      setState(build(rows));
    })
    .catch((error: unknown) => {
      setState({
        ...state,
        loading: false,
        hydrated: true,
        error: error instanceof Error ? error.message : "The catalog could not be loaded.",
      });
    })
    .finally(() => {
      inflight = null;
    });
  return inflight;
}

/** Reads the catalog once in the browser if the loader did not seed it. */
export function hydrateCatalog(): void {
  if (typeof window === "undefined") return;
  if (state.hydrated || state.loading) return;
  void refreshCatalog();
}

/* ------------------------------------------------------------------ */
/* Reads                                                               */
/* ------------------------------------------------------------------ */

/** Every record the caller can see, drafts included. Admin surfaces only. */
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
/* Writes — every one goes to the database, then refreshes the store   */
/* ------------------------------------------------------------------ */

export async function upsertProductRow(row: ProductInput): Promise<void> {
  await catalogRepository.save(row);
  await refreshCatalog();
}

export async function deleteProductRows(ids: string[]): Promise<void> {
  await catalogRepository.remove(ids);
  await refreshCatalog();
}

export async function duplicateProductRow(id: string): Promise<string | undefined> {
  const original = state.rows.find((r) => r.id === id);
  if (!original) return undefined;
  const suffix = Date.now().toString(36).slice(-4);
  const {
    id: _ignoredId,
    name: _ignoredName,
    updatedAt: _ignoredAt,
    sku: _ignoredSku,
    ...rest
  } = original;
  const copy: ProductInput = {
    ...rest,
    slug: `${original.slug ?? "product"}-copy-${suffix}`,
    productName: `${original.productName ?? original.name ?? "Product"} (copy)`,
    status: "draft",
  };
  const saved = await catalogRepository.save(copy);
  await refreshCatalog();
  return saved.id;
}

/** Drops the id so the database assigns one. */
function withoutId(row: ProductInput): ProductInput {
  const { id: _ignored, ...rest } = row;
  return rest as ProductInput;
}

/** Bulk field patch — powers publish / unpublish / flag actions. */
export async function patchProductRows(
  ids: string[],
  patch: Partial<ProductInput>,
): Promise<void> {
  await catalogRepository.patch(ids, patch);
  await refreshCatalog();
}

/** Adds imported rows one by one so a single bad row cannot lose the rest. */
export async function mergeImportedRows(
  incoming: ProductInput[],
): Promise<{ saved: number; failures: { identifier: string; reason: string }[] }> {
  const failures: { identifier: string; reason: string }[] = [];
  let saved = 0;

  for (const row of incoming) {
    const existing = state.rows.find(
      (r) => r.subcategory === row.subcategory && r.slug === row.slug,
    );
    try {
      await catalogRepository.save(existing?.id ? { ...row, id: existing.id } : withoutId(row));
      saved += 1;
    } catch (error) {
      failures.push({
        identifier: String(row.productName ?? row.slug ?? "row"),
        reason: error instanceof Error ? error.message : "Could not be saved.",
      });
    }
  }

  await refreshCatalog();
  return { saved, failures };
}
