import { createFileRoute } from "@tanstack/react-router";

import { CollectionPlaceholderPage } from "@/components/CollectionPlaceholderPage";
import { bagCategoryLinks, topCollectionLinks } from "@/lib/catalog";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/clutches")({
  head: () =>
    pageHead({
      title: "Clutches | Neha Lifestyle",
      description:
        "Browse the Neha Lifestyle clutches collection — occasion-ready styles listed here as each piece is added.",
      path: "/clutches",
      breadcrumbs: [{ name: "Clutches", path: "/clutches" }],
    }),
  component: ClutchesPage,
});

function ClutchesPage() {
  return (
    <CollectionPlaceholderPage
      eyebrow="Collection"
      title="Clutches"
      description="This collection is being prepared. Clutches will be listed here once pieces are added."
      breadcrumbs={[{ label: "Clutches", to: "/clutches" }]}
      subcategories={bagCategoryLinks}
      subcategoriesHeading="Browse bag categories"
      relatedLinks={topCollectionLinks}
    />
  );
}
