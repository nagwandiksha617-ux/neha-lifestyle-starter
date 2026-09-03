import { createFileRoute } from "@tanstack/react-router";

import { InfoPage } from "@/components/InfoPage";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/blog")({
  head: () =>
    pageHead({
      title: "Journal | Neha Lifestyle",
      description:
        "The Neha Lifestyle journal: styling notes, care guides and collection stories for bags, clutches and jewellery.",
      path: "/blog",
      breadcrumbs: [{ name: "Journal", path: "/blog" }],
    }),
  component: BlogPage,
});

function BlogPage() {
  return (
    <InfoPage
      eyebrow="Journal"
      title="The Neha Lifestyle Journal"
      description="Styling notes, care guides and collection stories. Articles are published here as they are written."
      breadcrumbs={[{ label: "Journal", to: "/blog" }]}
      sections={[
        {
          heading: "Styling notes",
          body: "How to build looks around a statement bag or a single piece of jewellery.",
        },
        {
          heading: "Care guides",
          body: "Practical guidance on keeping bags and jewellery in good condition.",
        },
        {
          heading: "Collection stories",
          body: "The thinking behind each edit, published as collections launch.",
        },
      ]}
    />
  );
}
