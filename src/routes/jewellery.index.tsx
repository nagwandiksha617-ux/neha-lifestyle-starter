import { createFileRoute } from "@tanstack/react-router";

import { CollectionPlaceholderPage } from "@/components/CollectionPlaceholderPage";
import { pageHead } from "@/lib/seo";
import { jewelleryCategoryLinks, topCollectionLinks } from "@/lib/catalog";

export const Route = createFileRoute("/jewellery/")({
  head: () =>
    pageHead({
      title: "Jewellery | Neha Lifestyle",
      description: "Explore the Neha Lifestyle jewellery collection: earrings, rings, necklaces, bracelets, jewellery sets, pendants and watches.",
      path: "/jewellery",
      breadcrumbs: [{ name: "Jewellery", path: "/jewellery" }],
    }),
  component: Page,
});

function Page() {
  return (
    <CollectionPlaceholderPage
      eyebrow="Collection"
      title="Jewellery Collection"
      description="Earrings, rings, necklaces, bracelets, jewellery sets, pendants and watches. Pieces and photography are added as each category launches."
      breadcrumbs={[{ label: "Jewellery", to: "/jewellery" }]}
      subcategories={jewelleryCategoryLinks}
      subcategoriesHeading="Browse jewellery categories"
      relatedLinks={topCollectionLinks}
    />
  );
}
