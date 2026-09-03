import { createFileRoute, Link } from "@tanstack/react-router";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHeading } from "@/components/SectionHeading";
import { ProductCard } from "@/components/shop/ProductCard";
import { getProductById } from "@/data/products";
import { useShop } from "@/lib/shop-store";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/wishlist")({
  head: () =>
    pageHead({
      title: "Wishlist | Neha Lifestyle",
      description: "The Neha Lifestyle pieces you have saved for later.",
      path: "/wishlist",
      robots: "noindex, follow",
      breadcrumbs: [{ name: "Wishlist", path: "/wishlist" }],
    }),
  component: WishlistPage,
});

function WishlistPage() {
  const { wishlist, hydrated } = useShop();
  const items = wishlist.map(getProductById).filter((p) => p !== undefined);

  return (
    <main className="mx-auto w-full max-w-[84rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
      <Breadcrumbs items={[{ label: "Wishlist", to: "/wishlist" }]} />
      <SectionHeading
        as="h1"
        eyebrow="Saved"
        title="Your Wishlist"
        description="Pieces you have saved. Move them to your cart whenever you are ready."
      />

      {!hydrated ? null : items.length === 0 ? (
        <div className="mt-16 flex flex-col items-center gap-6 text-center">
          <p className="text-[0.9rem] font-light text-muted-foreground">
            Your wishlist is empty. Tap the heart on any piece to save it here.
          </p>
          <Link
            to="/shop"
            className="inline-flex min-h-12 items-center border border-gold/40 px-7 text-[0.65rem] font-medium tracking-[0.26em] text-gold uppercase transition-colors duration-500 hover:bg-gold hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4">
          {items.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
