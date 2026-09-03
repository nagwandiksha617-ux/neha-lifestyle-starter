import { createFileRoute } from "@tanstack/react-router";

import { CollectionPlaceholderPage } from "@/components/CollectionPlaceholderPage";
import { pageHead } from "@/lib/seo";
import { jewelleryCategoryLinks, topCollectionLinks } from "@/lib/catalog";

export const Route = createFileRoute("/jewellery/bracelets")({
  head: () =>
    pageHead({
      title: "Bracelets | Neha Lifestyle",
      description: "Browse the bracelets category at Neha Lifestyle. This jewellery category is being prepared and pieces will be listed here as they are added.",
      path: "/jewellery/bracelets",
      breadcrumbs: [{ name: "Jewellery", path: "/jewellery" }, { name: "Bracelets", path: "/jewellery/bracelets" }],
    }),
  component: Page,
});

function Page() {
  return (
    <CollectionPlaceholderPage
      eyebrow="Jewellery Category"
      title="Bracelets"
      description="This category is being prepared. Bracelets will be listed here once the collection is added."
      breadcrumbs={[{ label: "Jewellery", to: "/jewellery" }, { label: "Bracelets", to: "/jewellery/bracelets" }]}
      subcategories={jewelleryCategoryLinks.filter((c) => c.to !== "/jewellery/bracelets")}
      subcategoriesHeading="Other jewellery categories"
      relatedLinks={topCollectionLinks}
    />
  );
}
