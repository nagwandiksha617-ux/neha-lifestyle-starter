import { useMemo } from "react";

import { useShop } from "@/lib/shop-store";
import { effectivePrice, getProductById, type Product } from "@/data/products";

export interface ResolvedCartLine {
  product: Product;
  quantity: number;
  lineTotal: number;
}

/** Joins persisted cart lines to catalog records and computes the subtotal. */
export function useCartLines() {
  const { cart } = useShop();

  return useMemo(() => {
    const lines: ResolvedCartLine[] = [];
    for (const line of cart) {
      const product = getProductById(line.productId);
      if (!product) continue; // product removed from the catalog
      lines.push({
        product,
        quantity: line.quantity,
        lineTotal: effectivePrice(product) * line.quantity,
      });
    }
    const subtotal = lines.reduce((sum, l) => sum + l.lineTotal, 0);
    return { lines, subtotal };
  }, [cart]);
}
