import { createFileRoute } from "@tanstack/react-router";

import { CollectionPlaceholderPage } from "@/components/CollectionPlaceholderPage";
import { bagCategoryLinks, jewelleryCategoryLinks, topCollectionLinks } from "@/lib/catalog";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/shop")({
  head: () =>
    pageHead({
      title: "Shop All | Neha Lifestyle",
      description:
        "Shop the full Neha Lifestyle edit across bags, clutches and jewellery, with every category in one place.",
      path: "/shop",
      breadcrumbs: [{ name: "Shop", path: "/shop" }],
    }),
  component: ShopPage,
});

function ShopPage() {
  return (
    <CollectionPlaceholderPage
      eyebrow="Shop"
      title="Shop All"
      description="Every Neha Lifestyle category in one place. Products appear here as each collection is added."
      breadcrumbs={[{ label: "Shop", to: "/shop" }]}
      subcategories={[...topCollectionLinks, ...bagCategoryLinks, ...jewelleryCategoryLinks]}
      subcategoriesHeading="Browse all categories"
    />
  );
}
