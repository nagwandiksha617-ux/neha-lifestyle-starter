import { createFileRoute } from "@tanstack/react-router";

import { CategoryListingPage } from "@/components/shop/CategoryListingPage";
import { SubcategoryCards } from "@/components/shop/SubcategoryCards";
import { travelBagSubcategories } from "@/data/products";
import { useProductsBySubcategory } from "@/hooks/useCatalog";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/travel-bags/sling-crossbody-bags/")({
  head: () =>
    pageHead({
      title: "Sling & Crossbody Travel Bags | Travel Bags | Neha Lifestyle",
      description:
        "Browse sling and crossbody travel bags at Neha Lifestyle. Filter by price, availability and colour to find the piece that suits you.",
      path: "/travel-bags/sling-crossbody-bags",
      breadcrumbs: [
        { name: "Travel Bags", path: "/travel-bags" },
        { name: "Sling & Crossbody Travel Bags", path: "/travel-bags/sling-crossbody-bags" },
      ],
    }),
  component: Page,
});

function Page() {
  const products = useProductsBySubcategory("sling-crossbody-bags");

  return (
    <CategoryListingPage
      eyebrow="Travel Bags Category"
      title="Sling & Crossbody Travel Bags"
      intro="Explore the sling and crossbody travel bags edit at Neha Lifestyle."
      breadcrumbs={[
        { label: "Travel Bags", to: "/travel-bags" },
        { label: "Sling & Crossbody Travel Bags", to: "/travel-bags/sling-crossbody-bags" },
      ]}
      products={products}
    >
      <SubcategoryCards
        heading="Other travel bag categories"
        headingId="related-categories"
        items={travelBagSubcategories.filter((s) => s.slug !== "sling-crossbody-bags")}
      />
    </CategoryListingPage>
  );
}
