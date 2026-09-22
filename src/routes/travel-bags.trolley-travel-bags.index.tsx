import { createFileRoute } from "@tanstack/react-router";

import { CategoryListingPage } from "@/components/shop/CategoryListingPage";
import { SubcategoryCards } from "@/components/shop/SubcategoryCards";
import { travelBagSubcategories } from "@/data/products";
import { useProductsBySubcategory } from "@/hooks/useCatalog";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/travel-bags/trolley-travel-bags/")({
  head: () =>
    pageHead({
      title: "Wheeled & Trolley Travel Bags | Travel Bags | Neha Lifestyle",
      description:
        "Browse wheeled and trolley travel bags at Neha Lifestyle. Filter by price, availability and colour to find the piece that suits you.",
      path: "/travel-bags/trolley-travel-bags",
      breadcrumbs: [
        { name: "Travel Bags", path: "/travel-bags" },
        { name: "Wheeled & Trolley Travel Bags", path: "/travel-bags/trolley-travel-bags" },
      ],
    }),
  component: Page,
});

function Page() {
  const products = useProductsBySubcategory("trolley-travel-bags");

  return (
    <CategoryListingPage
      eyebrow="Travel Bags Category"
      title="Wheeled & Trolley Travel Bags"
      intro="Explore the wheeled and trolley travel bags edit at Neha Lifestyle."
      breadcrumbs={[
        { label: "Travel Bags", to: "/travel-bags" },
        { label: "Wheeled & Trolley Travel Bags", to: "/travel-bags/trolley-travel-bags" },
      ]}
      products={products}
    >
      <SubcategoryCards
        heading="Other travel bag categories"
        headingId="related-categories"
        items={travelBagSubcategories.filter((s) => s.slug !== "trolley-travel-bags")}
      />
    </CategoryListingPage>
  );
}
