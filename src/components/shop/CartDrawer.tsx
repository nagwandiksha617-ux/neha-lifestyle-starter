import { Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useShop } from "@/lib/shop-store";
import { useCartLines } from "./useCartLines";
import { formatPrice } from "@/data/products";

export function CartDrawer() {
  const { cartOpen, setCartOpen, setQuantity, removeFromCart } = useShop();
  const { lines, subtotal } = useCartLines();

  return (
    <Sheet open={cartOpen} onOpenChange={setCartOpen}>
      <SheetContent side="right" className="flex w-[92vw] max-w-md flex-col bg-onyx">
        <SheetHeader>
          <SheetTitle className="font-display text-xl font-light tracking-[0.1em] text-ivory">
            Your Cart
          </SheetTitle>
        </SheetHeader>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
            <p className="text-[0.85rem] font-light text-muted-foreground">
              Your cart is empty.
            </p>
            <Link
              to="/shop"
              onClick={() => setCartOpen(false)}
              className="inline-flex min-h-11 items-center border border-gold/40 px-6 text-[0.65rem] font-medium tracking-[0.26em] text-gold uppercase transition-colors duration-500 hover:bg-gold hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto px-4">
              {lines.map(({ product, quantity, lineTotal }) => (
                <li key={product.id} className="flex gap-4 border-b border-gold/10 py-5">
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-display text-[0.98rem] font-light tracking-[0.04em] text-ivory">
                      {product.name}
                    </p>
                    <p className="mt-1 text-[0.6rem] font-light tracking-[0.24em] text-muted-foreground uppercase">
                      {product.subcategory.replace(/-/g, " ")}
                    </p>

                    <div className="mt-3 flex items-center gap-2">
                      <button
                        type="button"
                        aria-label={`Decrease quantity of ${product.name}`}
                        onClick={() => setQuantity(product.id, quantity - 1)}
                        className="grid h-9 w-9 place-items-center border border-gold/25 text-gold transition-colors hover:bg-gold hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                      >
                        <Minus className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
                      </button>
                      <span aria-live="polite" className="min-w-8 text-center text-[0.8rem] font-light text-ivory">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        aria-label={`Increase quantity of ${product.name}`}
                        onClick={() => setQuantity(product.id, quantity + 1)}
                        className="grid h-9 w-9 place-items-center border border-gold/25 text-gold transition-colors hover:bg-gold hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                      >
                        <Plus className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        aria-label={`Remove ${product.name} from cart`}
                        onClick={() => removeFromCart(product.id)}
                        className="ml-auto grid h-9 w-9 place-items-center text-muted-foreground transition-colors hover:text-gold focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                      >
                        <Trash2 className="h-4 w-4" strokeWidth={1.25} aria-hidden="true" />
                      </button>
                    </div>
                  </div>

                  <p className="shrink-0 text-[0.85rem] font-light text-gold">
                    {formatPrice(lineTotal, product.currency)}
                  </p>
                </li>
              ))}
            </ul>

            <div className="border-t border-gold/15 px-4 py-6">
              <div className="flex items-baseline justify-between">
                <span className="text-[0.62rem] font-light tracking-[0.28em] text-muted-foreground uppercase">
                  Subtotal
                </span>
                <span className="font-display text-xl font-light text-gold">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <div className="mt-5 flex flex-col gap-2.5">
                <Link
                  to="/checkout"
                  onClick={() => setCartOpen(false)}
                  className="inline-flex min-h-12 items-center justify-center bg-gold px-6 text-[0.65rem] font-medium tracking-[0.26em] text-primary-foreground uppercase transition-colors duration-500 hover:bg-gold-soft focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  Proceed to Checkout
                </Link>
                <Link
                  to="/cart"
                  onClick={() => setCartOpen(false)}
                  className="inline-flex min-h-12 items-center justify-center border border-gold/40 px-6 text-[0.65rem] font-medium tracking-[0.26em] text-gold uppercase transition-colors duration-500 hover:bg-gold hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  View Cart
                </Link>
                <Link
                  to="/shop"
                  onClick={() => setCartOpen(false)}
                  className="inline-flex min-h-11 items-center justify-center text-[0.62rem] font-light tracking-[0.24em] text-muted-foreground uppercase transition-colors duration-500 hover:text-gold focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
