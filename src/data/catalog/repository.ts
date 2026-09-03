/**
 * Catalog repository seam.
 *
 * Every read and write in the catalog manager goes through a
 * `CatalogRepository`. Today the only implementation is
 * `LocalCatalogRepository`, which keeps records in this browser's
 * localStorage — that is a single-device, single-user store with no
 * authentication behind it.
 *
 * To move the catalog to Lovable Cloud, Firebase, Shopify, WooCommerce or a
 * custom API later, implement this interface against that backend and swap the
 * instance exported at the bottom of the file. No component, route, filter,
 * SEO helper or sitemap entry has to change.
 */

import type { ProductInput } from "./types";

export interface CatalogRepository {
  /** Human label shown in the admin UI so the storage mode is never implied. */
  readonly label: string;
  /** True when writes survive only in the current browser. */
  readonly isLocalOnly: boolean;
  /** Returns stored rows, or null when nothing has been saved yet. */
  read(): ProductInput[] | null;
  /** Persists the full record set. */
  write(rows: ProductInput[]): void;
  /** Removes everything this repository has stored. */
  clear(): void;
}

const STORAGE_KEY = "neha-lifestyle.catalog.v1";

export class LocalCatalogRepository implements CatalogRepository {
  readonly label = "This browser (local storage)";
  readonly isLocalOnly = true;

  read(): ProductInput[] | null {
    if (typeof window === "undefined") return null;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? (parsed as ProductInput[]) : null;
    } catch {
      return null;
    }
  }

  write(rows: ProductInput[]): void {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(rows));
    } catch {
      // Quota or private-mode failures are surfaced by the caller's UI copy,
      // never by throwing during a render.
    }
  }

  clear(): void {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(STORAGE_KEY);
  }
}

/** Active repository. Replace this line when a backend is connected. */
export const catalogRepository: CatalogRepository = new LocalCatalogRepository();
