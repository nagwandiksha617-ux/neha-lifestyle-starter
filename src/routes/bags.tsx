import { createFileRoute } from "@tanstack/react-router";
import { CollectionPlaceholderPage } from "@/components/CollectionPlaceholderPage";

export const Route = createFileRoute("/bags")({
  head: () => ({
    meta: [
      { title: "Bags Collection — NEHA LIFESTYLE" },
      { name: "description", content: "Hand bags, gym bags, travel bags, shoulder bags, party bags, potli bags and clutches at NEHA LIFESTYLE." },
      { property: "og:title", content: "Bags Collection — NEHA LIFESTYLE" },
      { property: "og:description", content: "Statement bags for every occasion, curated by NEHA LIFESTYLE." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BagsPage,
});

function BagsPage() {
  return (
    <CollectionPlaceholderPage
      title="Bags Collection"
      description="Category layout preview. Products and imagery will be added with the first drop."
      categories={[
        "Hand Bags",
        "Gym Bags",
        "Travel Bags",
        "Shoulder Bags",
        "Party Bags",
        "Potli Bags",
        "Clutches",
      ]}
    />
  );
}
