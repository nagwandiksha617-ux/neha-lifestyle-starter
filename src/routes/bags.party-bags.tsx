import { createFileRoute } from "@tanstack/react-router";

import { CollectionPlaceholderPage } from "@/components/CollectionPlaceholderPage";
import { pageHead } from "@/lib/seo";
import { bagCategoryLinks, topCollectionLinks } from "@/lib/catalog";

export const Route = createFileRoute("/bags/party-bags")({
  head: () =>
    pageHead({
      title: "Party Bags | Neha Lifestyle",
      description: "Browse the party bags category at Neha Lifestyle. This bags category is being prepared and pieces will be listed here as they are added.",
      path: "/bags/party-bags",
      breadcrumbs: [{ name: "Bags", path: "/bags" }, { name: "Party Bags", path: "/bags/party-bags" }],
    }),
  component: Page,
});

function Page() {
  return (
    <CollectionPlaceholderPage
      eyebrow="Bags Category"
      title="Party Bags"
      description="This category is being prepared. Party Bags will be listed here once the collection is added."
      breadcrumbs={[{ label: "Bags", to: "/bags" }, { label: "Party Bags", to: "/bags/party-bags" }]}
      subcategories={bagCategoryLinks.filter((c) => c.to !== "/bags/party-bags")}
      subcategoriesHeading="Other bags categories"
      relatedLinks={topCollectionLinks}
    />
  );
}
