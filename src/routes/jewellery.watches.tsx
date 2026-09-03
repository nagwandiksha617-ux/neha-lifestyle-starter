import { createFileRoute } from "@tanstack/react-router";

import { CollectionPlaceholderPage } from "@/components/CollectionPlaceholderPage";
import { pageHead } from "@/lib/seo";
import { jewelleryCategoryLinks, topCollectionLinks } from "@/lib/catalog";

export const Route = createFileRoute("/jewellery/watches")({
  head: () =>
    pageHead({
      title: "Watches | Neha Lifestyle",
      description: "Browse the watches category at Neha Lifestyle. This jewellery category is being prepared and pieces will be listed here as they are added.",
      path: "/jewellery/watches",
      breadcrumbs: [{ name: "Jewellery", path: "/jewellery" }, { name: "Watches", path: "/jewellery/watches" }],
    }),
  component: Page,
});

function Page() {
  return (
    <CollectionPlaceholderPage
      eyebrow="Jewellery Category"
      title="Watches"
      description="This category is being prepared. Watches will be listed here once the collection is added."
      breadcrumbs={[{ label: "Jewellery", to: "/jewellery" }, { label: "Watches", to: "/jewellery/watches" }]}
      subcategories={jewelleryCategoryLinks.filter((c) => c.to !== "/jewellery/watches")}
      subcategoriesHeading="Other jewellery categories"
      relatedLinks={topCollectionLinks}
    />
  );
}
