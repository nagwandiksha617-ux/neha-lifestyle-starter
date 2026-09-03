import { createFileRoute } from "@tanstack/react-router";
import { CollectionPlaceholderPage } from "@/components/CollectionPlaceholderPage";

export const Route = createFileRoute("/clutches")({
  head: () => ({
    meta: [
      { title: "Clutches — NEHA LIFESTYLE" },
      { name: "description", content: "Evening and occasion clutches at NEHA LIFESTYLE." },
      { property: "og:title", content: "Clutches — NEHA LIFESTYLE" },
      { property: "og:description", content: "Evening and occasion clutches, curated by NEHA LIFESTYLE." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ClutchesPage,
});

function ClutchesPage() {
  return (
    <CollectionPlaceholderPage
      title="Clutches"
      description="Category layout preview. Products and imagery will be added with the first drop."
    />
  );
}
