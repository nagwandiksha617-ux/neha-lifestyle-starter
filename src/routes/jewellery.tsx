import { createFileRoute } from "@tanstack/react-router";
import { CollectionPlaceholderPage } from "@/components/CollectionPlaceholderPage";

export const Route = createFileRoute("/jewellery")({
  head: () => ({
    meta: [
      { title: "Jewellery Collection — NEHA LIFESTYLE" },
      { name: "description", content: "Earrings, rings, necklaces, bracelets, jewellery sets, pendants and watches at NEHA LIFESTYLE." },
      { property: "og:title", content: "Jewellery Collection — NEHA LIFESTYLE" },
      { property: "og:description", content: "Timeless jewellery to finish every look." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: JewelleryPage,
});

function JewelleryPage() {
  return (
    <CollectionPlaceholderPage
      title="Jewellery Collection"
      description="Category layout preview. Products and imagery will be added with the first drop."
      categories={[
        "Earrings",
        "Rings",
        "Necklaces",
        "Bracelets",
        "Jewellery Sets",
        "Pendants",
        "Watches",
      ]}
    />
  );
}
