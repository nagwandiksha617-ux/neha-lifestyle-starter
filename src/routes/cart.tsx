import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHeading } from "@/components/SectionHeading";
import { ProductImage } from "@/components/shop/ProductImage";
import { useCartLines } from "@/components/shop/useCartLines";
import { formatPrice } from "@/data/products";
import { useShop } from "@/lib/shop-store";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/cart")({
  head: () =>
    pageHead({
      title: "Your Cart | Neha Lifestyle",
      description: "Review the pieces in your Neha Lifestyle cart before checkout.",
      path: "/cart",
      robots: "noindex, follow",
      breadcrumbs: [{ name: "Cart", path: "/cart" }],
    }),
  component: CartPage,
});

function CartPage() {
  const { setQuantity, removeFromCart, clearCart, hydrated } = useShop();
  const { lines, subtotal } = useCartLines();

  return (
    <main className="mx-auto w-full max-w-[84rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
      <Breadcrumbs items={[{ label: "Cart", to: "/cart" }]} />
      <SectionHeading
        as="h1"
        eyebrow="Cart"
        title="Your Cart"
        description="Adjust quantities, remove pieces, or continue browsing the collection."
      />

      {!hydrated ? null : lines.length === 0 ? (
        <div className="mt-16 flex flex-col items-center gap-6 text-center">
          <p className="text-[0.9rem] font-light text-muted-foreground">Your cart is empty.</p>
          <Link
            to="/shop"
            className="inline-flex min-h-12 items-center border border-gold/40 px-7 text-[0.65rem] font-medium tracking-[0.26em] text-gold uppercase transition-colors duration-500 hover:bg-gold hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16">
          <ul className="flex flex-col border-t border-gold/12">
            {lines.map(({ product, quantity, lineTotal }) => (
              <li key={product.id} className="flex gap-5 border-b border-gold/12 py-6">
                <div className="w-24 shrink-0 sm:w-28">
                  <ProductImage product={product} />
                </div>

                <div className="flex min-w-0 flex-1 flex-col gap-2">
                  <h2 className="truncate font-display text-lg font-light tracking-[0.04em] text-ivory">
                    {product.name}
                  </h2>
                  <p className="text-[0.6rem] font-light tracking-[0.24em] text-muted-foreground uppercase">
                    {product.subcategory.replace(/-/g, " ")}
                  </p>

                  <div className="mt-2 flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        aria-label={`Decrease quantity of ${product.name}`}
                        onClick={() => setQuantity(product.id, quantity - 1)}
                        className="grid h-10 w-10 place-items-center border border-gold/25 text-gold transition-colors hover:bg-gold hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                      >
                        <Minus className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
                      </button>
                      <span aria-live="polite" className="min-w-8 text-center text-[0.85rem] font-light text-ivory">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        aria-label={`Increase quantity of ${product.name}`}
                        onClick={() => setQuantity(product.id, quantity + 1)}
                        className="grid h-10 w-10 place-items-center border border-gold/25 text-gold transition-colors hover:bg-gold hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                      >
                        <Plus className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeFromCart(product.id)}
                      className="inline-flex min-h-10 items-center gap-2 text-[0.6rem] font-light tracking-[0.24em] text-muted-foreground uppercase transition-colors hover:text-gold focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                    >
                      <Trash2 className="h-3.5 w-3.5" strokeWidth={1.25} aria-hidden="true" />
                      Remove
                    </button>
                  </div>
                </div>

                <p className="shrink-0 text-[0.9rem] font-light text-gold">
                  {formatPrice(lineTotal, product.currency)}
                </p>
              </li>
            ))}
          </ul>

          <aside aria-labelledby="order-summary" className="h-fit border border-gold/15 bg-card/40 p-6 lg:sticky lg:top-28">
            <h2
              id="order-summary"
              className="text-[0.6rem] font-light tracking-[0.34em] text-gold-soft uppercase"
            >
              Order Summary
            </h2>
            <div className="mt-6 flex items-baseline justify-between border-t border-gold/12 pt-5">
              <span className="text-[0.7rem] font-light text-muted-foreground">Subtotal</span>
              <span className="font-display text-2xl font-light text-gold">{formatPrice(subtotal)}</span>
            </div>
            <p className="mt-3 text-[0.7rem] leading-relaxed font-light text-muted-foreground">
              Shipping and taxes are calculated at checkout.
            </p>
            <Link
              to="/checkout"
              className="mt-6 inline-flex min-h-12 w-full items-center justify-center bg-gold px-6 text-[0.65rem] font-medium tracking-[0.26em] text-primary-foreground uppercase transition-colors duration-500 hover:bg-gold-soft focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              Proceed to Checkout
            </Link>
            <button
              type="button"
              onClick={clearCart}
              className="mt-3 inline-flex min-h-11 w-full items-center justify-center text-[0.6rem] font-light tracking-[0.24em] text-muted-foreground uppercase transition-colors hover:text-gold focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              Clear Cart
            </button>
          </aside>
        </div>
      )}
    </main>
  );
}
