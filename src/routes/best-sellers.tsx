import { createFileRoute } from "@tanstack/react-router";
import { CollectionPlaceholderPage } from "@/components/CollectionPlaceholderPage";

export const Route = createFileRoute("/best-sellers")({
  head: () => ({
    meta: [
      { title: "Best Sellers — NEHA LIFESTYLE" },
      { name: "description", content: "The most-loved pieces from the NEHA LIFESTYLE collection." },
      { property: "og:title", content: "Best Sellers — NEHA LIFESTYLE" },
      { property: "og:description", content: "The most-loved pieces from the NEHA LIFESTYLE collection." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BestSellersPage,
});

function BestSellersPage() {
  return (
    <CollectionPlaceholderPage
      title="Best Sellers"
      description="Catalog layout preview. Best sellers will be listed once orders begin."
    />
  );
}
