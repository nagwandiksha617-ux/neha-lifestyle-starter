import { createFileRoute } from "@tanstack/react-router";

import { CategoryListingPage } from "@/components/shop/CategoryListingPage";
import { SubcategoryCards } from "@/components/shop/SubcategoryCards";
import { travelBagSubcategories } from "@/data/products";
import { useProductsBySubcategory } from "@/hooks/useCatalog";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/travel-bags/travel-backpacks/")({
  head: () =>
    pageHead({
      title: "Travel Backpacks | Travel Bags | Neha Lifestyle",
      description:
        "Browse travel backpacks at Neha Lifestyle. Filter by price, availability and colour to find the piece that suits you.",
      path: "/travel-bags/travel-backpacks",
      breadcrumbs: [
        { name: "Travel Bags", path: "/travel-bags" },
        { name: "Travel Backpacks", path: "/travel-bags/travel-backpacks" },
      ],
    }),
  component: Page,
});

function Page() {
  const products = useProductsBySubcategory("travel-backpacks");

  return (
    <CategoryListingPage
      eyebrow="Travel Bags Category"
      title="Travel Backpacks"
      intro="Explore the travel backpacks edit at Neha Lifestyle."
      breadcrumbs={[
        { label: "Travel Bags", to: "/travel-bags" },
        { label: "Travel Backpacks", to: "/travel-bags/travel-backpacks" },
      ]}
      products={products}
    >
      <SubcategoryCards
        heading="Other travel bag categories"
        headingId="related-categories"
        items={travelBagSubcategories.filter((s) => s.slug !== "travel-backpacks")}
      />
    </CategoryListingPage>
  );
}
