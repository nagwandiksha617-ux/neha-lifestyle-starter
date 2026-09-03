/**
 * Server-side catalog reads.
 *
 * Uses the publishable key with no session, so row-level security returns
 * published products only — this is the data used for server rendering, page
 * metadata, structured data and the sitemap.
 */

import { createClient } from "@supabase/supabase-js";

import { rowFromDb, type ProductDbRow, type ProductImageDbRow } from "@/data/catalog/mapping";
import type { ProductInput } from "@/data/catalog/types";

function publicClient() {
  const url = process.env['SUPABASE_URL'];
  const key = process.env['SUPABASE_PUBLISHABLE_KEY'];
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
  });
}

export async function readPublishedCatalog(): Promise<ProductInput[]> {
  const client = publicClient();
  if (!client) return [];

  const { data, error } = await client
    .from("products")
    .select("*")
    .eq("status", "published")
    .order("created_at", { ascending: true });
  if (error || !data) return [];

  const rows = data as unknown as ProductDbRow[];
  if (rows.length === 0) return [];

  const { data: imageData } = await client
    .from("product_images")
    .select("id, product_id, image_url, alt_text, sort_order, is_primary")
    .in(
      "product_id",
      rows.map((r) => r.id),
    )
    .order("sort_order", { ascending: true });

  const images = (imageData ?? []) as unknown as ProductImageDbRow[];
  const byProduct = new Map<string, ProductImageDbRow[]>();
  for (const image of images) {
    const list = byProduct.get(image.product_id) ?? [];
    list.push(image);
    byProduct.set(image.product_id, list);
  }

  return rows.map((row) => rowFromDb(row, byProduct.get(row.id) ?? []));
}
