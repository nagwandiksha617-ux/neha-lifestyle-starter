import { createFileRoute } from "@tanstack/react-router";

import { CollectionPlaceholderPage } from "@/components/CollectionPlaceholderPage";
import { pageHead } from "@/lib/seo";
import { jewelleryCategoryLinks, topCollectionLinks } from "@/lib/catalog";

export const Route = createFileRoute("/jewellery/jewellery-sets")({
  head: () =>
    pageHead({
      title: "Jewellery Sets | Neha Lifestyle",
      description: "Browse the jewellery sets category at Neha Lifestyle. This jewellery category is being prepared and pieces will be listed here as they are added.",
      path: "/jewellery/jewellery-sets",
      breadcrumbs: [{ name: "Jewellery", path: "/jewellery" }, { name: "Jewellery Sets", path: "/jewellery/jewellery-sets" }],
    }),
  component: Page,
});

function Page() {
  return (
    <CollectionPlaceholderPage
      eyebrow="Jewellery Category"
      title="Jewellery Sets"
      description="This category is being prepared. Jewellery Sets will be listed here once the collection is added."
      breadcrumbs={[{ label: "Jewellery", to: "/jewellery" }, { label: "Jewellery Sets", to: "/jewellery/jewellery-sets" }]}
      subcategories={jewelleryCategoryLinks.filter((c) => c.to !== "/jewellery/jewellery-sets")}
      subcategoriesHeading="Other jewellery categories"
      relatedLinks={topCollectionLinks}
    />
  );
}
