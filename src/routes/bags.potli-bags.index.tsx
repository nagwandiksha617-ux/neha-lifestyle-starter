import { createFileRoute } from "@tanstack/react-router";

import { CategoryListingPage } from "@/components/shop/CategoryListingPage";
import { SubcategoryCards } from "@/components/shop/SubcategoryCards";
import { bagSubcategories, getProductsBySubcategory } from "@/data/products";
import { pageHead } from "@/lib/seo";

const PRODUCTS = getProductsBySubcategory("potli-bags");

export const Route = createFileRoute("/bags/potli-bags/")({
  head: () =>
    pageHead({
      title: "Potli Bags | Bags | Neha Lifestyle",
      description:
        "Browse potli bags at Neha Lifestyle. Filter by price, availability and rating to find the piece that suits you.",
      path: "/bags/potli-bags",
      breadcrumbs: [{ name: "Bags", path: "/bags" }, { name: "Potli Bags", path: "/bags/potli-bags" }],
    }),
  component: Page,
});

function Page() {
  return (
    <CategoryListingPage
      eyebrow="Bags Category"
      title="Potli Bags"
      intro="Explore the potli bags edit at Neha Lifestyle, refined for everyday wear and occasion dressing alike."
      breadcrumbs={[{ label: "Bags", to: "/bags" }, { label: "Potli Bags", to: "/bags/potli-bags" }]}
      products={PRODUCTS}
    >
      <SubcategoryCards
        heading="Other bags categories"
        headingId="related-categories"
        items={bagSubcategories.filter((s) => s.slug !== "potli-bags")}
      />
    </CategoryListingPage>
  );
}
