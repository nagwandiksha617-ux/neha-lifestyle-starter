/**
 * React bindings for the catalog store.
 *
 * Public surfaces use the `use*` hooks below so a product added or edited in
 * the catalog manager appears immediately across the storefront in this
 * browser. Every hook here returns published records only; drafts are
 * available exclusively through `useAdminCatalog`.
 */

import { useCallback, useEffect, useMemo, useSyncExternalStore } from "react";

import {
  allProducts,
  catalogImportIssues,
  catalogRows,
  getCatalogState,
  getServerCatalogState,
  hydrateCatalog,
  publishedProducts,
  subscribeCatalog,
} from "@/data/catalog/store";
import { getRelatedProducts } from "@/data/products";
import type { CategorySlug, Product } from "@/data/catalog/types";

function useCatalogState() {
  useEffect(() => {
    hydrateCatalog();
  }, []);
  return useSyncExternalStore(subscribeCatalog, getCatalogState, getServerCatalogState);
}

/** All published products. */
export function useProducts(): Product[] {
  useCatalogState();
  return publishedProducts();
}

export function useProductsByCategory(category: CategorySlug): Product[] {
  const products = useProducts();
  return useMemo(() => products.filter((p) => p.category === category), [products, category]);
}

export function useProductsBySubcategory(subcategory: string): Product[] {
  const products = useProducts();
  return useMemo(
    () => products.filter((p) => p.subcategory === subcategory),
    [products, subcategory],
  );
}

export function useProductBySlug(subcategory: string, slug: string): Product | undefined {
  const products = useProducts();
  return useMemo(
    () => products.find((p) => p.subcategory === subcategory && p.slug === slug),
    [products, subcategory, slug],
  );
}

export function useProductById(id: string | undefined): Product | undefined {
  const products = useProducts();
  return useMemo(() => (id ? products.find((p) => p.id === id) : undefined), [products, id]);
}

export function useNewArrivals(): Product[] {
  const products = useProducts();
  return useMemo(() => products.filter((p) => p.newArrival), [products]);
}

export function useBestSellers(): Product[] {
  const products = useProducts();
  return useMemo(() => products.filter((p) => p.bestSeller), [products]);
}

export function useFeaturedProducts(limit?: number): Product[] {
  const products = useProducts();
  return useMemo(() => {
    const list = products.filter((p) => p.featured);
    return limit != null ? list.slice(0, limit) : list;
  }, [products, limit]);
}

export function useRelatedProducts(product: Product, limit = 4): Product[] {
  const products = useProducts();
  return useMemo(() => getRelatedProducts(product, limit), [products, product, limit]);
}

/**
 * Admin view of the catalog: every record including drafts, the raw rows used
 * for export, and any rows the import layer could not publish.
 */
export function useAdminCatalog() {
  const state = useCatalogState();
  const refresh = useCallback(() => hydrateCatalog(), []);
  return {
    products: allProducts(),
    rows: catalogRows(),
    issues: catalogImportIssues(),
    hydrated: state.hydrated,
    refresh,
  };
}
