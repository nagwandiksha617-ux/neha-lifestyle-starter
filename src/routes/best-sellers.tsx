import { createFileRoute } from "@tanstack/react-router";

import { CollectionPlaceholderPage } from "@/components/CollectionPlaceholderPage";
import { topCollectionLinks } from "@/lib/catalog";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/best-sellers")({
  head: () =>
    pageHead({
      title: "Best Sellers | Neha Lifestyle",
      description:
        "The Neha Lifestyle best sellers page. Most-loved bags, clutches and jewellery will be ranked here once sales data exists.",
      path: "/best-sellers",
      breadcrumbs: [{ name: "Best Sellers", path: "/best-sellers" }],
    }),
  component: BestSellersPage,
});

function BestSellersPage() {
  return (
    <CollectionPlaceholderPage
      eyebrow="Most Loved"
      title="Best Sellers"
      description="This page will rank the most-loved pieces once the collection is live and orders are placed."
      breadcrumbs={[{ label: "Best Sellers", to: "/best-sellers" }]}
      relatedLinks={topCollectionLinks}
    />
  );
}
