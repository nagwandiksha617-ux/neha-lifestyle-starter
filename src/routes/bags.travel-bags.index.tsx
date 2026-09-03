import { createFileRoute } from "@tanstack/react-router";

import { CategoryListingPage } from "@/components/shop/CategoryListingPage";
import { SubcategoryCards } from "@/components/shop/SubcategoryCards";
import { bagSubcategories, getProductsBySubcategory } from "@/data/products";
import { pageHead } from "@/lib/seo";

const PRODUCTS = getProductsBySubcategory("travel-bags");

export const Route = createFileRoute("/bags/travel-bags/")({
  head: () =>
    pageHead({
      title: "Travel Bags | Bags | Neha Lifestyle",
      description:
        "Browse travel bags at Neha Lifestyle. Filter by price, availability and rating to find the piece that suits you.",
      path: "/bags/travel-bags",
      breadcrumbs: [{ name: "Bags", path: "/bags" }, { name: "Travel Bags", path: "/bags/travel-bags" }],
    }),
  component: Page,
});

function Page() {
  return (
    <CategoryListingPage
      eyebrow="Bags Category"
      title="Travel Bags"
      intro="Explore the travel bags edit at Neha Lifestyle, refined for everyday wear and occasion dressing alike."
      breadcrumbs={[{ label: "Bags", to: "/bags" }, { label: "Travel Bags", to: "/bags/travel-bags" }]}
      products={PRODUCTS}
    >
      <SubcategoryCards
        heading="Other bags categories"
        headingId="related-categories"
        items={bagSubcategories.filter((s) => s.slug !== "travel-bags")}
      />
    </CategoryListingPage>
  );
}
