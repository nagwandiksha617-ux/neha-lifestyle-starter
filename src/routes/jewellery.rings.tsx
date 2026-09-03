import { createFileRoute } from "@tanstack/react-router";

import { CollectionPlaceholderPage } from "@/components/CollectionPlaceholderPage";
import { pageHead } from "@/lib/seo";
import { jewelleryCategoryLinks, topCollectionLinks } from "@/lib/catalog";

export const Route = createFileRoute("/jewellery/rings")({
  head: () =>
    pageHead({
      title: "Rings | Neha Lifestyle",
      description: "Browse the rings category at Neha Lifestyle. This jewellery category is being prepared and pieces will be listed here as they are added.",
      path: "/jewellery/rings",
      breadcrumbs: [{ name: "Jewellery", path: "/jewellery" }, { name: "Rings", path: "/jewellery/rings" }],
    }),
  component: Page,
});

function Page() {
  return (
    <CollectionPlaceholderPage
      eyebrow="Jewellery Category"
      title="Rings"
      description="This category is being prepared. Rings will be listed here once the collection is added."
      breadcrumbs={[{ label: "Jewellery", to: "/jewellery" }, { label: "Rings", to: "/jewellery/rings" }]}
      subcategories={jewelleryCategoryLinks.filter((c) => c.to !== "/jewellery/rings")}
      subcategoriesHeading="Other jewellery categories"
      relatedLinks={topCollectionLinks}
    />
  );
}
