/**
 * Public catalog server function.
 *
 * Called from the root route loader so the storefront renders real published
 * products on the server (correct metadata, structured data and first paint)
 * before any client-side query runs.
 */

import { createServerFn } from "@tanstack/react-start";

import type { ProductInput } from "@/data/catalog/types";

export const fetchPublishedCatalog = createServerFn({ method: "GET" }).handler(
  async (): Promise<ProductInput[]> => {
    const { readPublishedCatalog } = await import("./catalog.server");
    try {
      return await readPublishedCatalog();
    } catch {
      // A backend hiccup must never blank the storefront shell.
      return [];
    }
  },
);
