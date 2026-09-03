import { createFileRoute } from "@tanstack/react-router";

import { CollectionPlaceholderPage } from "@/components/CollectionPlaceholderPage";
import { pageHead } from "@/lib/seo";
import { bagCategoryLinks, topCollectionLinks } from "@/lib/catalog";

export const Route = createFileRoute("/bags/travel-bags")({
  head: () =>
    pageHead({
      title: "Travel Bags | Neha Lifestyle",
      description: "Browse the travel bags category at Neha Lifestyle. This bags category is being prepared and pieces will be listed here as they are added.",
      path: "/bags/travel-bags",
      breadcrumbs: [{ name: "Bags", path: "/bags" }, { name: "Travel Bags", path: "/bags/travel-bags" }],
    }),
  component: Page,
});

function Page() {
  return (
    <CollectionPlaceholderPage
      eyebrow="Bags Category"
      title="Travel Bags"
      description="This category is being prepared. Travel Bags will be listed here once the collection is added."
      breadcrumbs={[{ label: "Bags", to: "/bags" }, { label: "Travel Bags", to: "/bags/travel-bags" }]}
      subcategories={bagCategoryLinks.filter((c) => c.to !== "/bags/travel-bags")}
      subcategoriesHeading="Other bags categories"
      relatedLinks={topCollectionLinks}
    />
  );
}
