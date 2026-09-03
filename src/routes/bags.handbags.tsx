import { createFileRoute } from "@tanstack/react-router";

import { CategoryListingPage } from "@/components/shop/CategoryListingPage";
import { SubcategoryCards } from "@/components/shop/SubcategoryCards";
import { bagSubcategories, getProductsBySubcategory } from "@/data/products";
import { pageHead } from "@/lib/seo";

const PRODUCTS = getProductsBySubcategory("handbags");

export const Route = createFileRoute("/bags/handbags")({
  head: () =>
    pageHead({
      title: "Hand Bags | Bags | Neha Lifestyle",
      description:
        "Browse hand bags at Neha Lifestyle. Filter by price, availability and rating to find the piece that suits you.",
      path: "/bags/handbags",
      breadcrumbs: [{ name: "Bags", path: "/bags" }, { name: "Hand Bags", path: "/bags/handbags" }],
    }),
  component: Page,
});

function Page() {
  return (
    <CategoryListingPage
      eyebrow="Bags Category"
      title="Hand Bags"
      intro="Explore the hand bags edit at Neha Lifestyle, refined for everyday wear and occasion dressing alike."
      breadcrumbs={[{ label: "Bags", to: "/bags" }, { label: "Hand Bags", to: "/bags/handbags" }]}
      products={PRODUCTS}
    >
      <SubcategoryCards
        heading="Other bags categories"
        headingId="related-categories"
        items={bagSubcategories.filter((s) => s.slug !== "handbags")}
      />
    </CategoryListingPage>
  );
}
