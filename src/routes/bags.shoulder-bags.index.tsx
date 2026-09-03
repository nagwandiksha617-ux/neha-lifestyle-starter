import { createFileRoute } from "@tanstack/react-router";

import { CategoryListingPage } from "@/components/shop/CategoryListingPage";
import { SubcategoryCards } from "@/components/shop/SubcategoryCards";
import { bagSubcategories, getProductsBySubcategory } from "@/data/products";
import { pageHead } from "@/lib/seo";

const PRODUCTS = getProductsBySubcategory("shoulder-bags");

export const Route = createFileRoute("/bags/shoulder-bags/")({
  head: () =>
    pageHead({
      title: "Shoulder Bags | Bags | Neha Lifestyle",
      description:
        "Browse shoulder bags at Neha Lifestyle. Filter by price, availability and rating to find the piece that suits you.",
      path: "/bags/shoulder-bags",
      breadcrumbs: [{ name: "Bags", path: "/bags" }, { name: "Shoulder Bags", path: "/bags/shoulder-bags" }],
    }),
  component: Page,
});

function Page() {
  return (
    <CategoryListingPage
      eyebrow="Bags Category"
      title="Shoulder Bags"
      intro="Explore the shoulder bags edit at Neha Lifestyle, refined for everyday wear and occasion dressing alike."
      breadcrumbs={[{ label: "Bags", to: "/bags" }, { label: "Shoulder Bags", to: "/bags/shoulder-bags" }]}
      products={PRODUCTS}
    >
      <SubcategoryCards
        heading="Other bags categories"
        headingId="related-categories"
        items={bagSubcategories.filter((s) => s.slug !== "shoulder-bags")}
      />
    </CategoryListingPage>
  );
}
