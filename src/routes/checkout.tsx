import { createFileRoute, Link } from "@tanstack/react-router";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHeading } from "@/components/SectionHeading";
import { useCartLines } from "@/components/shop/useCartLines";
import { formatPrice } from "@/data/products";
import { useShop } from "@/lib/shop-store";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/checkout")({
  head: () =>
    pageHead({
      title: "Checkout | Neha Lifestyle",
      description: "Review your Neha Lifestyle order before payment.",
      path: "/checkout",
      robots: "noindex, follow",
      breadcrumbs: [{ name: "Checkout", path: "/checkout" }],
    }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { hydrated } = useShop();
  const { lines, subtotal } = useCartLines();

  return (
    <main className="mx-auto w-full max-w-[64rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
      <Breadcrumbs items={[{ label: "Cart", to: "/cart" }, { label: "Checkout", to: "/checkout" }]} />
      <SectionHeading
        as="h1"
        eyebrow="Checkout"
        title="Order Review"
        description="Payment is not connected yet. Your order summary is shown below."
      />

      {!hydrated ? null : lines.length === 0 ? (
        <div className="mt-16 flex flex-col items-center gap-6 text-center">
          <p className="text-[0.9rem] font-light text-muted-foreground">
            There is nothing to check out yet.
          </p>
          <Link
            to="/shop"
            className="inline-flex min-h-12 items-center border border-gold/40 px-7 text-[0.65rem] font-medium tracking-[0.26em] text-gold uppercase transition-colors duration-500 hover:bg-gold hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="mt-14 border border-gold/15 bg-card/40 p-6 sm:p-8">
          <h2 className="text-[0.6rem] font-light tracking-[0.34em] text-gold-soft uppercase">
            Order Summary
          </h2>
          <ul className="mt-6 flex flex-col divide-y divide-gold/10 border-y border-gold/10">
            {lines.map(({ product, quantity, lineTotal }) => (
              <li key={product.id} className="flex items-baseline justify-between gap-4 py-4">
                <span className="min-w-0 text-[0.85rem] font-light text-ivory">
                  <span className="block truncate">{product.name}</span>
                  <span className="text-[0.65rem] text-muted-foreground">Qty {quantity}</span>
                </span>
                <span className="shrink-0 text-[0.85rem] font-light text-gold">
                  {formatPrice(lineTotal, product.currency)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex items-baseline justify-between">
            <span className="text-[0.7rem] font-light tracking-[0.24em] text-muted-foreground uppercase">
              Subtotal
            </span>
            <span className="font-display text-2xl font-light text-gold">{formatPrice(subtotal)}</span>
          </div>

          <p className="mt-8 border-t border-gold/12 pt-6 text-[0.78rem] leading-relaxed font-light text-muted-foreground">
            Secure online payment is being set up. Once it is connected, you will be able to complete
            your order on this page.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/cart"
              className="inline-flex min-h-12 items-center border border-gold/40 px-7 text-[0.65rem] font-medium tracking-[0.26em] text-gold uppercase transition-colors duration-500 hover:bg-gold hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              Back to Cart
            </Link>
            <Link
              to="/shop"
              className="inline-flex min-h-12 items-center px-2 text-[0.62rem] font-light tracking-[0.24em] text-muted-foreground uppercase transition-colors duration-500 hover:text-gold focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}
