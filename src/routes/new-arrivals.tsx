import { createFileRoute } from "@tanstack/react-router";

import { CategoryListingPage } from "@/components/shop/CategoryListingPage";
import { products } from "@/data/products";
import { pageHead } from "@/lib/seo";

const PRODUCTS = products.filter((p) => p.newArrival);

export const Route = createFileRoute("/new-arrivals")({
  head: () =>
    pageHead({
      title: "New Arrivals | Neha Lifestyle",
      description:
        "See what has just landed at Neha Lifestyle — the newest bags, clutches and jewellery across the collection.",
      path: "/new-arrivals",
      breadcrumbs: [{ name: "New Arrivals", path: "/new-arrivals" }],
    }),
  component: Page,
});

function Page() {
  return (
    <CategoryListingPage
      eyebrow="Just In"
      title="New Arrivals"
      intro="The latest additions across bags, clutches and jewellery, gathered in one place."
      breadcrumbs={[{ label: "New Arrivals", to: "/new-arrivals" }]}
      products={PRODUCTS}
      showCategoryFilter
    />
  );
}
