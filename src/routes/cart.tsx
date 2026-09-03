import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, Minus, Plus, Trash2 } from "lucide-react";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHeading } from "@/components/SectionHeading";
import { CouponField } from "@/components/checkout/CouponField";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { WhatsAppOrderButton } from "@/components/checkout/WhatsAppOrderButton";
import { ProductImage } from "@/components/shop/ProductImage";
import { useCartLines } from "@/components/shop/useCartLines";
import { formatPrice, productPath, subcategoryName } from "@/data/products";
import { calculateTotals } from "@/lib/commerce/pricing";
import { useShop } from "@/lib/shop-store";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/cart")({
  head: () =>
    pageHead({
      title: "Your Cart | Neha Lifestyle",
      description: "Review the pieces in your Neha Lifestyle cart before checkout.",
      path: "/cart",
      robots: "noindex, nofollow",
      breadcrumbs: [{ name: "Cart", path: "/cart" }],
    }),
  component: CartPage,
});

const iconButton =
  "grid h-10 w-10 place-items-center border border-gold/25 text-gold transition-colors hover:bg-gold hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none";

function CartPage() {
  const { setQuantity, removeFromCart, clearCart, toggleWishlist, isWishlisted, hydrated } = useShop();
  const { lines, subtotal } = useCartLines();
  const [coupon, setCoupon] = useState<{ code: string; discount: number } | null>(null);

  const discount = coupon ? Math.min(coupon.discount, subtotal) : 0;
  const totals = calculateTotals(subtotal, discount);

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
          <p className="text-[0.9rem] font-light text-muted-foreground">
            Your cart is empty. Discover bags, clutches and jewellery made to be kept.
          </p>
          <Link
            to="/shop"
            className="inline-flex min-h-12 items-center border border-gold/40 px-7 text-[0.65rem] font-medium tracking-[0.26em] text-gold uppercase transition-colors duration-500 hover:bg-gold hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-16">
          <div>
            <p aria-live="polite" className="sr-only">
              {lines.length} item{lines.length === 1 ? "" : "s"} in your cart. Total {formatPrice(totals.total)}.
            </p>
            <ul className="flex flex-col border-t border-gold/12">
              {lines.map(({ product, quantity, lineTotal }) => {
                const wished = isWishlisted(product.id);
                return (
                  <li key={product.id} className="flex gap-5 border-b border-gold/12 py-6">
                    <Link
                      to={productPath(product)}
                      className="w-24 shrink-0 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none sm:w-28"
                    >
                      <ProductImage product={product} />
                    </Link>

                    <div className="flex min-w-0 flex-1 flex-col gap-2">
                      <h2 className="min-w-0 font-display text-lg font-light tracking-[0.04em] text-ivory">
                        <Link
                          to={productPath(product)}
                          className="block truncate transition-colors hover:text-gold focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                        >
                          {product.name}
                        </Link>
                      </h2>
                      <p className="text-[0.6rem] font-light tracking-[0.24em] text-muted-foreground uppercase">
                        {subcategoryName(product.subcategory)}
                      </p>
                      <p className="text-[0.75rem] font-light text-muted-foreground">
                        {formatPrice(lineTotal / Math.max(quantity, 1), product.currency)} each
                      </p>

                      <div className="mt-2 flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            aria-label={`Decrease quantity of ${product.name}`}
                            disabled={quantity <= 1}
                            onClick={() => setQuantity(product.id, quantity - 1)}
                            className={`${iconButton} disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-gold`}
                          >
                            <Minus className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
                          </button>
                          <span className="min-w-8 text-center text-[0.85rem] font-light text-ivory">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            aria-label={`Increase quantity of ${product.name}`}
                            onClick={() => setQuantity(product.id, quantity + 1)}
                            className={iconButton}
                          >
                            <Plus className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleWishlist(product.id)}
                          aria-pressed={wished}
                          className="inline-flex min-h-10 items-center gap-2 text-[0.6rem] font-light tracking-[0.24em] text-muted-foreground uppercase transition-colors hover:text-gold focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                        >
                          <Heart
                            className={`h-3.5 w-3.5 ${wished ? "fill-gold text-gold" : ""}`}
                            strokeWidth={1.25}
                            aria-hidden="true"
                          />
                          {wished ? "In Wishlist" : "Save"}
                        </button>

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
                );
              })}
            </ul>

            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                to="/shop"
                className="inline-flex min-h-11 items-center text-[0.6rem] font-light tracking-[0.24em] text-gold uppercase transition-colors hover:text-gold-soft focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                Continue Shopping
              </Link>
              <button
                type="button"
                onClick={clearCart}
                className="inline-flex min-h-11 items-center text-[0.6rem] font-light tracking-[0.24em] text-muted-foreground uppercase transition-colors hover:text-gold focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                Clear Cart
              </button>
            </div>
          </div>

          <aside aria-labelledby="order-summary-heading" className="h-fit lg:sticky lg:top-28">
            <OrderSummary totals={totals} couponCode={coupon?.code ?? ""}>
              <CouponField
                subtotal={subtotal}
                appliedCode={coupon?.code ?? null}
                onApply={(code, value) => setCoupon({ code, discount: value })}
                onRemove={() => setCoupon(null)}
              />
              <Link
                to="/checkout"
                className="mt-6 inline-flex min-h-12 w-full items-center justify-center bg-gold px-6 text-[0.65rem] font-medium tracking-[0.26em] text-primary-foreground uppercase transition-colors duration-500 hover:bg-gold-soft focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                Proceed to Checkout
              </Link>
              <div className="mt-3">
                <WhatsAppOrderButton
                  lines={lines.map(({ product, quantity, lineTotal }) => ({
                    name: product.name,
                    quantity,
                    lineTotal,
                  }))}
                  total={totals.total}
                />
              </div>
            </OrderSummary>
          </aside>
        </div>
      )}
    </main>
  );
}
