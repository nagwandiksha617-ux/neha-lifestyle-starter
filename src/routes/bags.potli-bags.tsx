import { createFileRoute } from "@tanstack/react-router";

import { CollectionPlaceholderPage } from "@/components/CollectionPlaceholderPage";
import { pageHead } from "@/lib/seo";
import { bagCategoryLinks, topCollectionLinks } from "@/lib/catalog";

export const Route = createFileRoute("/bags/potli-bags")({
  head: () =>
    pageHead({
      title: "Potli Bags | Neha Lifestyle",
      description: "Browse the potli bags category at Neha Lifestyle. This bags category is being prepared and pieces will be listed here as they are added.",
      path: "/bags/potli-bags",
      breadcrumbs: [{ name: "Bags", path: "/bags" }, { name: "Potli Bags", path: "/bags/potli-bags" }],
    }),
  component: Page,
});

function Page() {
  return (
    <CollectionPlaceholderPage
      eyebrow="Bags Category"
      title="Potli Bags"
      description="This category is being prepared. Potli Bags will be listed here once the collection is added."
      breadcrumbs={[{ label: "Bags", to: "/bags" }, { label: "Potli Bags", to: "/bags/potli-bags" }]}
      subcategories={bagCategoryLinks.filter((c) => c.to !== "/bags/potli-bags")}
      subcategoriesHeading="Other bags categories"
      relatedLinks={topCollectionLinks}
    />
  );
}
