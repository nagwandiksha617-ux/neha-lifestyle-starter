import { createFileRoute } from "@tanstack/react-router";

import { CollectionPlaceholderPage } from "@/components/CollectionPlaceholderPage";
import { pageHead } from "@/lib/seo";
import { jewelleryCategoryLinks, topCollectionLinks } from "@/lib/catalog";

export const Route = createFileRoute("/jewellery/pendants")({
  head: () =>
    pageHead({
      title: "Pendants | Neha Lifestyle",
      description: "Browse the pendants category at Neha Lifestyle. This jewellery category is being prepared and pieces will be listed here as they are added.",
      path: "/jewellery/pendants",
      breadcrumbs: [{ name: "Jewellery", path: "/jewellery" }, { name: "Pendants", path: "/jewellery/pendants" }],
    }),
  component: Page,
});

function Page() {
  return (
    <CollectionPlaceholderPage
      eyebrow="Jewellery Category"
      title="Pendants"
      description="This category is being prepared. Pendants will be listed here once the collection is added."
      breadcrumbs={[{ label: "Jewellery", to: "/jewellery" }, { label: "Pendants", to: "/jewellery/pendants" }]}
      subcategories={jewelleryCategoryLinks.filter((c) => c.to !== "/jewellery/pendants")}
      subcategoriesHeading="Other jewellery categories"
      relatedLinks={topCollectionLinks}
    />
  );
}
