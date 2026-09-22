import { createFileRoute } from "@tanstack/react-router";

import { CategoryListingPage } from "@/components/shop/CategoryListingPage";
import { SubcategoryCards } from "@/components/shop/SubcategoryCards";
import { travelBagSubcategories } from "@/data/products";
import { useProductsByCategory } from "@/hooks/useCatalog";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/travel-bags/")({
  head: () =>
    pageHead({
      title: "Travel Bags | Neha Lifestyle",
      description:
        "Explore the Neha Lifestyle travel bags collection: trolley bags, travel backpacks, duffels, gym bags, sling bags and large travel bags.",
      path: "/travel-bags",
      breadcrumbs: [{ name: "Travel Bags", path: "/travel-bags" }],
    }),
  component: Page,
});

function Page() {
  const products = useProductsByCategory("travel-bags");

  return (
    <CategoryListingPage
      eyebrow="Collection"
      title="Travel Bags Collection"
      intro="Trolley bags, travel backpacks, duffels, gym bags, sling bags and large carryalls — chosen for the way you travel."
      breadcrumbs={[{ label: "Travel Bags", to: "/travel-bags" }]}
      products={products}
    >
      <SubcategoryCards
        heading="Browse travel bag categories"
        headingId="travel-bag-categories"
        items={travelBagSubcategories}
      />
    </CategoryListingPage>
  );
}
