import { createFileRoute } from "@tanstack/react-router";

import { CategoryListingPage } from "@/components/shop/CategoryListingPage";
import { products } from "@/data/products";
import { pageHead } from "@/lib/seo";

const PRODUCTS = products.filter((p) => p.bestSeller);

export const Route = createFileRoute("/best-sellers")({
  head: () =>
    pageHead({
      title: "Best Sellers | Neha Lifestyle",
      description:
        "The most-loved Neha Lifestyle pieces across bags, clutches and jewellery, gathered into one edit.",
      path: "/best-sellers",
      breadcrumbs: [{ name: "Best Sellers", path: "/best-sellers" }],
    }),
  component: Page,
});

function Page() {
  return (
    <CategoryListingPage
      eyebrow="Signature"
      title="Best Sellers"
      intro="The pieces that define the collection — refined shapes that work season after season."
      breadcrumbs={[{ label: "Best Sellers", to: "/best-sellers" }]}
      products={PRODUCTS}
      showCategoryFilter
    />
  );
}
