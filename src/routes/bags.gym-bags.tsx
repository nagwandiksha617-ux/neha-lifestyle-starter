import { createFileRoute } from "@tanstack/react-router";

import { CollectionPlaceholderPage } from "@/components/CollectionPlaceholderPage";
import { pageHead } from "@/lib/seo";
import { bagCategoryLinks, topCollectionLinks } from "@/lib/catalog";

export const Route = createFileRoute("/bags/gym-bags")({
  head: () =>
    pageHead({
      title: "Gym Bags | Neha Lifestyle",
      description: "Browse the gym bags category at Neha Lifestyle. This bags category is being prepared and pieces will be listed here as they are added.",
      path: "/bags/gym-bags",
      breadcrumbs: [{ name: "Bags", path: "/bags" }, { name: "Gym Bags", path: "/bags/gym-bags" }],
    }),
  component: Page,
});

function Page() {
  return (
    <CollectionPlaceholderPage
      eyebrow="Bags Category"
      title="Gym Bags"
      description="This category is being prepared. Gym Bags will be listed here once the collection is added."
      breadcrumbs={[{ label: "Bags", to: "/bags" }, { label: "Gym Bags", to: "/bags/gym-bags" }]}
      subcategories={bagCategoryLinks.filter((c) => c.to !== "/bags/gym-bags")}
      subcategoriesHeading="Other bags categories"
      relatedLinks={topCollectionLinks}
    />
  );
}
