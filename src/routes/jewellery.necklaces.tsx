import { createFileRoute } from "@tanstack/react-router";

import { CollectionPlaceholderPage } from "@/components/CollectionPlaceholderPage";
import { pageHead } from "@/lib/seo";
import { jewelleryCategoryLinks, topCollectionLinks } from "@/lib/catalog";

export const Route = createFileRoute("/jewellery/necklaces")({
  head: () =>
    pageHead({
      title: "Necklaces | Neha Lifestyle",
      description: "Browse the necklaces category at Neha Lifestyle. This jewellery category is being prepared and pieces will be listed here as they are added.",
      path: "/jewellery/necklaces",
      breadcrumbs: [{ name: "Jewellery", path: "/jewellery" }, { name: "Necklaces", path: "/jewellery/necklaces" }],
    }),
  component: Page,
});

function Page() {
  return (
    <CollectionPlaceholderPage
      eyebrow="Jewellery Category"
      title="Necklaces"
      description="This category is being prepared. Necklaces will be listed here once the collection is added."
      breadcrumbs={[{ label: "Jewellery", to: "/jewellery" }, { label: "Necklaces", to: "/jewellery/necklaces" }]}
      subcategories={jewelleryCategoryLinks.filter((c) => c.to !== "/jewellery/necklaces")}
      subcategoriesHeading="Other jewellery categories"
      relatedLinks={topCollectionLinks}
    />
  );
}
