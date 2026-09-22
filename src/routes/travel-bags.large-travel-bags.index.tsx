import { createFileRoute } from "@tanstack/react-router";

import { CategoryListingPage } from "@/components/shop/CategoryListingPage";
import { SubcategoryCards } from "@/components/shop/SubcategoryCards";
import { travelBagSubcategories } from "@/data/products";
import { useProductsBySubcategory } from "@/hooks/useCatalog";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/travel-bags/large-travel-bags/")({
  head: () =>
    pageHead({
      title: "Large Travel Bags | Travel Bags | Neha Lifestyle",
      description:
        "Browse large travel bags at Neha Lifestyle. Filter by price, availability and colour to find the piece that suits you.",
      path: "/travel-bags/large-travel-bags",
      breadcrumbs: [
        { name: "Travel Bags", path: "/travel-bags" },
        { name: "Large Travel Bags", path: "/travel-bags/large-travel-bags" },
      ],
    }),
  component: Page,
});

function Page() {
  const products = useProductsBySubcategory("large-travel-bags");

  return (
    <CategoryListingPage
      eyebrow="Travel Bags Category"
      title="Large Travel Bags"
      intro="Explore the large travel bags edit at Neha Lifestyle."
      breadcrumbs={[
        { label: "Travel Bags", to: "/travel-bags" },
        { label: "Large Travel Bags", to: "/travel-bags/large-travel-bags" },
      ]}
      products={products}
    >
      <SubcategoryCards
        heading="Other travel bag categories"
        headingId="related-categories"
        items={travelBagSubcategories.filter((s) => s.slug !== "large-travel-bags")}
      />
    </CategoryListingPage>
  );
}
