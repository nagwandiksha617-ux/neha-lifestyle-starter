import { createFileRoute } from "@tanstack/react-router";

import { CollectionPlaceholderPage } from "@/components/CollectionPlaceholderPage";
import { topCollectionLinks } from "@/lib/catalog";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/new-arrivals")({
  head: () =>
    pageHead({
      title: "New Arrivals | Neha Lifestyle",
      description:
        "See what has just landed at Neha Lifestyle. The newest bags, clutches and jewellery are listed here as they are added.",
      path: "/new-arrivals",
      breadcrumbs: [{ name: "New Arrivals", path: "/new-arrivals" }],
    }),
  component: NewArrivalsPage,
});

function NewArrivalsPage() {
  return (
    <CollectionPlaceholderPage
      eyebrow="Just In"
      title="New Arrivals"
      description="Reserved for the newest pieces. Products appear here as soon as the first drop is added."
      breadcrumbs={[{ label: "New Arrivals", to: "/new-arrivals" }]}
      relatedLinks={topCollectionLinks}
    />
  );
}
