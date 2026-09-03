import { createFileRoute } from "@tanstack/react-router";

import { CategoryListingPage } from "@/components/shop/CategoryListingPage";
import { SubcategoryCards } from "@/components/shop/SubcategoryCards";
import { bagSubcategories } from "@/data/products";
import { useProductsBySubcategory } from "@/hooks/useCatalog";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/bags/gym-bags/")({
  head: () =>
    pageHead({
      title: "Gym Bags | Bags | Neha Lifestyle",
      description:
        "Browse gym bags at Neha Lifestyle. Filter by price, availability and rating to find the piece that suits you.",
      path: "/bags/gym-bags",
      breadcrumbs: [{ name: "Bags", path: "/bags" }, { name: "Gym Bags", path: "/bags/gym-bags" }],
    }),
  component: Page,
});

function Page() {
  const products = useProductsBySubcategory("gym-bags");

  return (
    <CategoryListingPage
      eyebrow="Bags Category"
      title="Gym Bags"
      intro="Explore the gym bags edit at Neha Lifestyle, refined for everyday wear and occasion dressing alike."
      breadcrumbs={[{ label: "Bags", to: "/bags" }, { label: "Gym Bags", to: "/bags/gym-bags" }]}
      products={products}
    >
      <SubcategoryCards
        heading="Other bags categories"
        headingId="related-categories"
        items={bagSubcategories.filter((s) => s.slug !== "gym-bags")}
      />
    </CategoryListingPage>
  );
}
