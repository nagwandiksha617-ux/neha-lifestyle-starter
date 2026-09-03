import { createFileRoute } from "@tanstack/react-router";

import { CategoryListingPage } from "@/components/shop/CategoryListingPage";
import { SubcategoryCards } from "@/components/shop/SubcategoryCards";
import { bagSubcategories, getProductsByCategory } from "@/data/products";
import { pageHead } from "@/lib/seo";

const PRODUCTS = getProductsByCategory("bags");

export const Route = createFileRoute("/bags/")({
  head: () =>
    pageHead({
      title: "Bags | Neha Lifestyle",
      description:
        "Explore the Neha Lifestyle bags collection: hand bags, gym bags, travel bags, shoulder bags, party bags and potli bags.",
      path: "/bags",
      breadcrumbs: [{ name: "Bags", path: "/bags" }],
    }),
  component: Page,
});

function Page() {
  return (
    <CategoryListingPage
      eyebrow="Collection"
      title="Bags Collection"
      intro="Hand bags, gym bags, travel bags, shoulder bags, party bags and potli bags — shaped for the way you actually carry them."
      breadcrumbs={[{ label: "Bags", to: "/bags" }]}
      products={PRODUCTS}
    >
      <SubcategoryCards heading="Browse bag categories" headingId="bag-categories" items={bagSubcategories} />
    </CategoryListingPage>
  );
}
