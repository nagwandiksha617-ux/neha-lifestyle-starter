import { createFileRoute } from "@tanstack/react-router";
import { CollectionPlaceholderPage } from "@/components/CollectionPlaceholderPage";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop All — NEHA LIFESTYLE" },
      { name: "description", content: "Browse the full NEHA LIFESTYLE edit of bags, clutches and jewellery." },
      { property: "og:title", content: "Shop All — NEHA LIFESTYLE" },
      { property: "og:description", content: "The full NEHA LIFESTYLE edit of bags, clutches and jewellery." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  return (
    <CollectionPlaceholderPage
      title="Shop All"
      description="Catalog layout preview across every category. Products will appear here once added."
      categories={["Bags", "Clutches", "Jewellery"]}
    />
  );
}
