import { createFileRoute } from "@tanstack/react-router";

import { CollectionPlaceholderPage } from "@/components/CollectionPlaceholderPage";
import { pageHead } from "@/lib/seo";
import { bagCategoryLinks, topCollectionLinks } from "@/lib/catalog";

export const Route = createFileRoute("/bags/shoulder-bags")({
  head: () =>
    pageHead({
      title: "Shoulder Bags | Neha Lifestyle",
      description: "Browse the shoulder bags category at Neha Lifestyle. This bags category is being prepared and pieces will be listed here as they are added.",
      path: "/bags/shoulder-bags",
      breadcrumbs: [{ name: "Bags", path: "/bags" }, { name: "Shoulder Bags", path: "/bags/shoulder-bags" }],
    }),
  component: Page,
});

function Page() {
  return (
    <CollectionPlaceholderPage
      eyebrow="Bags Category"
      title="Shoulder Bags"
      description="This category is being prepared. Shoulder Bags will be listed here once the collection is added."
      breadcrumbs={[{ label: "Bags", to: "/bags" }, { label: "Shoulder Bags", to: "/bags/shoulder-bags" }]}
      subcategories={bagCategoryLinks.filter((c) => c.to !== "/bags/shoulder-bags")}
      subcategoriesHeading="Other bags categories"
      relatedLinks={topCollectionLinks}
    />
  );
}
