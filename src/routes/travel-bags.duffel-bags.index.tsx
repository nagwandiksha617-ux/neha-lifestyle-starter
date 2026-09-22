import { createFileRoute } from "@tanstack/react-router";

import { CategoryListingPage } from "@/components/shop/CategoryListingPage";
import { SubcategoryCards } from "@/components/shop/SubcategoryCards";
import { travelBagSubcategories } from "@/data/products";
import { useProductsBySubcategory } from "@/hooks/useCatalog";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/travel-bags/duffel-bags/")({
  head: () =>
    pageHead({
      title: "Duffel Bags | Travel Bags | Neha Lifestyle",
      description:
        "Browse duffel bags at Neha Lifestyle. Filter by price, availability and colour to find the piece that suits you.",
      path: "/travel-bags/duffel-bags",
      breadcrumbs: [
        { name: "Travel Bags", path: "/travel-bags" },
        { name: "Duffel Bags", path: "/travel-bags/duffel-bags" },
      ],
    }),
  component: Page,
});

function Page() {
  const products = useProductsBySubcategory("duffel-bags");

  return (
    <CategoryListingPage
      eyebrow="Travel Bags Category"
      title="Duffel Bags"
      intro="Explore the duffel bags edit at Neha Lifestyle."
      breadcrumbs={[
        { label: "Travel Bags", to: "/travel-bags" },
        { label: "Duffel Bags", to: "/travel-bags/duffel-bags" },
      ]}
      products={products}
    >
      <SubcategoryCards
        heading="Other travel bag categories"
        headingId="related-categories"
        items={travelBagSubcategories.filter((s) => s.slug !== "duffel-bags")}
      />
    </CategoryListingPage>
  );
}
