/**
 * Catalog repository seam.
 *
 * Every read and write in the catalog manager goes through a
 * `CatalogRepository`. The active implementation is
 * `SupabaseCatalogRepository`, which stores products in the project's cloud
 * database. Row-level security decides what each caller can read: signed-out
 * visitors only ever receive published products, administrators receive
 * drafts as well.
 *
 * `LocalCatalogRepository` is retained purely as the migration path for
 * catalogs that were saved in a browser before the backend existed.
 */

import { supabase } from "@/integrations/supabase/client";

import { dbFromRow, imageRowsFromRow, isDatabaseId, rowFromDb } from "./mapping";
import type { ProductDbRow, ProductImageDbRow } from "./mapping";
import type { ProductInput } from "./types";

export interface CatalogRepository {
  /** Human label shown in the admin UI so the storage mode is never implied. */
  readonly label: string;
  /** True when writes survive only in the current browser. */
  readonly isLocalOnly: boolean;
  /** Rows the caller is allowed to read. */
  list(): Promise<ProductInput[]>;
  /** Creates or updates one record and returns the stored row. */
  save(row: ProductInput): Promise<ProductInput>;
  /** Deletes records by id. */
  remove(ids: string[]): Promise<void>;
  /** Applies the same field patch to several records. */
  patch(ids: string[], patch: Partial<ProductInput>): Promise<void>;
}

const PRODUCT_COLUMNS = "*";

/* ------------------------------------------------------------------ */
/* Cloud database                                                      */
/* ------------------------------------------------------------------ */

export class SupabaseCatalogRepository implements CatalogRepository {
  readonly label = "Cloud database";
  readonly isLocalOnly = false;

  async list(): Promise<ProductInput[]> {
    const { data, error } = await supabase
      .from("products")
      .select(PRODUCT_COLUMNS)
      .order("created_at", { ascending: true });
    if (error) throw new Error(error.message);

    const rows = (data ?? []) as unknown as ProductDbRow[];
    if (rows.length === 0) return [];

    const { data: imageData, error: imageError } = await supabase
      .from("product_images")
      .select("id, product_id, image_url, alt_text, sort_order, is_primary")
      .in(
        "product_id",
        rows.map((r) => r.id),
      )
      .order("sort_order", { ascending: true });
    if (imageError) throw new Error(imageError.message);

    const images = (imageData ?? []) as unknown as ProductImageDbRow[];
    const byProduct = new Map<string, ProductImageDbRow[]>();
    for (const image of images) {
      const list = byProduct.get(image.product_id) ?? [];
      list.push(image);
      byProduct.set(image.product_id, list);
    }

    return rows.map((row) => rowFromDb(row, byProduct.get(row.id) ?? []));
  }

  async save(row: ProductInput): Promise<ProductInput> {
    const values = dbFromRow(row);
    const id = isDatabaseId(row.id) ? row.id : undefined;

    const query = id
      ? supabase.from("products").update(values as never).eq("id", id).select(PRODUCT_COLUMNS).single()
      : supabase.from("products").insert(values as never).select(PRODUCT_COLUMNS).single();

    const { data, error } = await query;
    if (error) throw new Error(error.message);
    const saved = data as unknown as ProductDbRow;

    await this.replaceImages(saved.id, row);

    const { data: imageData } = await supabase
      .from("product_images")
      .select("id, product_id, image_url, alt_text, sort_order, is_primary")
      .eq("product_id", saved.id)
      .order("sort_order", { ascending: true });

    return rowFromDb(saved, (imageData ?? []) as unknown as ProductImageDbRow[]);
  }

  private async replaceImages(productId: string, row: ProductInput): Promise<void> {
    const { error: deleteError } = await supabase
      .from("product_images")
      .delete()
      .eq("product_id", productId);
    if (deleteError) throw new Error(deleteError.message);

    const images = imageRowsFromRow(row, productId);
    if (images.length === 0) return;
    const { error } = await supabase.from("product_images").insert(images as never);
    if (error) throw new Error(error.message);
  }

  async remove(ids: string[]): Promise<void> {
    const target = ids.filter(isDatabaseId);
    if (target.length === 0) return;
    const { error } = await supabase.from("products").delete().in("id", target);
    if (error) throw new Error(error.message);
  }

  async patch(ids: string[], patch: Partial<ProductInput>): Promise<void> {
    const target = ids.filter(isDatabaseId);
    if (target.length === 0) return;

    const values: Record<string, unknown> = {};
    if (patch.status !== undefined)
      values['status'] = patch.status === "published" ? "published" : "draft";
    if (patch.featured !== undefined) values['featured'] = Boolean(patch.featured);
    if (patch.newArrival !== undefined) values['new_arrival'] = Boolean(patch.newArrival);
    if (patch.bestSeller !== undefined) values['best_seller'] = Boolean(patch.bestSeller);
    if (Object.keys(values).length === 0) return;

    const { error } = await supabase.from("products").update(values as never).in("id", target);
    if (error) throw new Error(error.message);
  }
}

/* ------------------------------------------------------------------ */
/* Legacy browser storage — migration source only                      */
/* ------------------------------------------------------------------ */

const STORAGE_KEY = "neha-lifestyle.catalog.v1";

export class LocalCatalogRepository {
  readonly label = "This browser (local storage)";
  readonly isLocalOnly = true;

  read(): ProductInput[] | null {
    if (typeof window === "undefined") return null;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) && parsed.length > 0 ? (parsed as ProductInput[]) : null;
    } catch {
      return null;
    }
  }

  clear(): void {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(STORAGE_KEY);
  }
}

/** Catalog saved in this browser before the backend existed, if any. */
export const legacyLocalCatalog = new LocalCatalogRepository();

/** Active repository. */
export const catalogRepository: CatalogRepository = new SupabaseCatalogRepository();
