import { createFileRoute } from "@tanstack/react-router";

import { CollectionPlaceholderPage } from "@/components/CollectionPlaceholderPage";
import { pageHead } from "@/lib/seo";
import { jewelleryCategoryLinks, topCollectionLinks } from "@/lib/catalog";

export const Route = createFileRoute("/jewellery/earrings")({
  head: () =>
    pageHead({
      title: "Earrings | Neha Lifestyle",
      description: "Browse the earrings category at Neha Lifestyle. This jewellery category is being prepared and pieces will be listed here as they are added.",
      path: "/jewellery/earrings",
      breadcrumbs: [{ name: "Jewellery", path: "/jewellery" }, { name: "Earrings", path: "/jewellery/earrings" }],
    }),
  component: Page,
});

function Page() {
  return (
    <CollectionPlaceholderPage
      eyebrow="Jewellery Category"
      title="Earrings"
      description="This category is being prepared. Earrings will be listed here once the collection is added."
      breadcrumbs={[{ label: "Jewellery", to: "/jewellery" }, { label: "Earrings", to: "/jewellery/earrings" }]}
      subcategories={jewelleryCategoryLinks.filter((c) => c.to !== "/jewellery/earrings")}
      subcategoriesHeading="Other jewellery categories"
      relatedLinks={topCollectionLinks}
    />
  );
}
