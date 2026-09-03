import { createFileRoute } from "@tanstack/react-router";

import { CollectionPlaceholderPage } from "@/components/CollectionPlaceholderPage";
import { pageHead } from "@/lib/seo";
import { bagCategoryLinks, topCollectionLinks } from "@/lib/catalog";

export const Route = createFileRoute("/bags/handbags")({
  head: () =>
    pageHead({
      title: "Hand Bags | Neha Lifestyle",
      description: "Browse the hand bags category at Neha Lifestyle. This bags category is being prepared and pieces will be listed here as they are added.",
      path: "/bags/handbags",
      breadcrumbs: [{ name: "Bags", path: "/bags" }, { name: "Hand Bags", path: "/bags/handbags" }],
    }),
  component: Page,
});

function Page() {
  return (
    <CollectionPlaceholderPage
      eyebrow="Bags Category"
      title="Hand Bags"
      description="This category is being prepared. Hand Bags will be listed here once the collection is added."
      breadcrumbs={[{ label: "Bags", to: "/bags" }, { label: "Hand Bags", to: "/bags/handbags" }]}
      subcategories={bagCategoryLinks.filter((c) => c.to !== "/bags/handbags")}
      subcategoriesHeading="Other bags categories"
      relatedLinks={topCollectionLinks}
    />
  );
}
