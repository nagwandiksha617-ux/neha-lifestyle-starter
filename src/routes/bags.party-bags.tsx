import { createFileRoute } from "@tanstack/react-router";

import { CategoryListingPage } from "@/components/shop/CategoryListingPage";
import { SubcategoryCards } from "@/components/shop/SubcategoryCards";
import { bagSubcategories, getProductsBySubcategory } from "@/data/products";
import { pageHead } from "@/lib/seo";

const PRODUCTS = getProductsBySubcategory("party-bags");

export const Route = createFileRoute("/bags/party-bags")({
  head: () =>
    pageHead({
      title: "Party Bags | Bags | Neha Lifestyle",
      description:
        "Browse party bags at Neha Lifestyle. Filter by price, availability and rating to find the piece that suits you.",
      path: "/bags/party-bags",
      breadcrumbs: [{ name: "Bags", path: "/bags" }, { name: "Party Bags", path: "/bags/party-bags" }],
    }),
  component: Page,
});

function Page() {
  return (
    <CategoryListingPage
      eyebrow="Bags Category"
      title="Party Bags"
      intro="Explore the party bags edit at Neha Lifestyle, refined for everyday wear and occasion dressing alike."
      breadcrumbs={[{ label: "Bags", to: "/bags" }, { label: "Party Bags", to: "/bags/party-bags" }]}
      products={PRODUCTS}
    >
      <SubcategoryCards
        heading="Other bags categories"
        headingId="related-categories"
        items={bagSubcategories.filter((s) => s.slug !== "party-bags")}
      />
    </CategoryListingPage>
  );
}
