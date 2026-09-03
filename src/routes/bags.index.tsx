import { createFileRoute } from "@tanstack/react-router";

import { CollectionPlaceholderPage } from "@/components/CollectionPlaceholderPage";
import { pageHead } from "@/lib/seo";
import { bagCategoryLinks, topCollectionLinks } from "@/lib/catalog";

export const Route = createFileRoute("/bags")({
  head: () =>
    pageHead({
      title: "Bags | Neha Lifestyle",
      description: "Explore the Neha Lifestyle bags collection: hand bags, gym bags, travel bags, shoulder bags, party bags and potli bags.",
      path: "/bags",
      breadcrumbs: [{ name: "Bags", path: "/bags" }],
    }),
  component: Page,
});

function Page() {
  return (
    <CollectionPlaceholderPage
      eyebrow="Collection"
      title="Bags Collection"
      description="Hand bags, gym bags, travel bags, shoulder bags, party bags and potli bags. Pieces and photography are added as each category launches."
      breadcrumbs={[{ label: "Bags", to: "/bags" }]}
      subcategories={bagCategoryLinks}
      subcategoriesHeading="Browse bag categories"
      relatedLinks={topCollectionLinks}
    />
  );
}
