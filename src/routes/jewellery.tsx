import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/jewellery")({
  head: () => ({
    meta: [
      { title: "Jewellery — NEHA LIFESTYLE" },
      { name: "description", content: "Explore the Jewellery collection at NEHA LIFESTYLE." },
      { property: "og:title", content: "Jewellery — NEHA LIFESTYLE" },
      { property: "og:description", content: "Explore the Jewellery collection at NEHA LIFESTYLE." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: JewelleryPage,
});

function JewelleryPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">Jewellery</h1>
      <p className="mt-4 text-muted-foreground">Collection coming soon.</p>
    </main>
  );
}
