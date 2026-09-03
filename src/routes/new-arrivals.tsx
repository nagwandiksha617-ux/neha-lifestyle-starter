import { createFileRoute } from "@tanstack/react-router";
import { CollectionPlaceholderPage } from "@/components/CollectionPlaceholderPage";

export const Route = createFileRoute("/new-arrivals")({
  head: () => ({
    meta: [
      { title: "New Arrivals — NEHA LIFESTYLE" },
      { name: "description", content: "The newest bags and jewellery joining the NEHA LIFESTYLE edit." },
      { property: "og:title", content: "New Arrivals — NEHA LIFESTYLE" },
      { property: "og:description", content: "The newest pieces joining the NEHA LIFESTYLE edit." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NewArrivalsPage,
});

function NewArrivalsPage() {
  return (
    <CollectionPlaceholderPage
      title="New Arrivals"
      description="Catalog layout preview reserved for the newest pieces."
    />
  );
}
