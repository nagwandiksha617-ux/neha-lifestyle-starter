import { createFileRoute } from "@tanstack/react-router";

import { CategoryListingPage } from "@/components/shop/CategoryListingPage";
import { SubcategoryCards } from "@/components/shop/SubcategoryCards";
import { travelBagSubcategories } from "@/data/products";
import { useProductsBySubcategory } from "@/hooks/useCatalog";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/travel-bags/gym-bags/")({
  head: () =>
    pageHead({
      title: "Gym Bags | Travel Bags | Neha Lifestyle",
      description:
        "Browse gym bags at Neha Lifestyle. Filter by price, availability and colour to find the piece that suits you.",
      path: "/travel-bags/gym-bags",
      breadcrumbs: [
        { name: "Travel Bags", path: "/travel-bags" },
        { name: "Gym Bags", path: "/travel-bags/gym-bags" },
      ],
    }),
  component: Page,
});

function Page() {
  const products = useProductsBySubcategory("travel-gym-bags");

  return (
    <CategoryListingPage
      eyebrow="Travel Bags Category"
      title="Gym Bags"
      intro="Explore the gym bags edit at Neha Lifestyle."
      breadcrumbs={[
        { label: "Travel Bags", to: "/travel-bags" },
        { label: "Gym Bags", to: "/travel-bags/gym-bags" },
      ]}
      products={products}
    >
      <SubcategoryCards
        heading="Other travel bag categories"
        headingId="related-categories"
        items={travelBagSubcategories.filter((s) => s.slug !== "travel-gym-bags")}
      />
    </CategoryListingPage>
  );
}
