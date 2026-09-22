import { createFileRoute } from "@tanstack/react-router";

import { CategoryListingPage } from "@/components/shop/CategoryListingPage";
import { SubcategoryCards } from "@/components/shop/SubcategoryCards";
import { travelBagSubcategories } from "@/data/products";
import { useProductsBySubcategory } from "@/hooks/useCatalog";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/travel-bags/travel-bags/")({
  head: () =>
    pageHead({
      title: "Travel Bags | Travel Bags | Neha Lifestyle",
      description:
        "Browse travel bags at Neha Lifestyle. Filter by price, availability and colour to find the piece that suits you.",
      path: "/travel-bags/travel-bags",
      breadcrumbs: [
        { name: "Travel Bags", path: "/travel-bags" },
        { name: "Travel Bags", path: "/travel-bags/travel-bags" },
      ],
    }),
  component: Page,
});

function Page() {
  const products = useProductsBySubcategory("travel-bags");

  return (
    <CategoryListingPage
      eyebrow="Travel Bags Category"
      title="Travel Bags"
      intro="Explore the travel bags edit at Neha Lifestyle."
      breadcrumbs={[
        { label: "Travel Bags", to: "/travel-bags" },
        { label: "Travel Bags", to: "/travel-bags/travel-bags" },
      ]}
      products={products}
    >
      <SubcategoryCards
        heading="Other travel bag categories"
        headingId="related-categories"
        items={travelBagSubcategories.filter((s) => s.slug !== "travel-bags")}
      />
    </CategoryListingPage>
  );
}
