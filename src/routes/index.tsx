import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NEHA LIFESTYLE — Premium Fashion" },
      { name: "description", content: "Discover curated Bags, Clutches, and Jewellery at NEHA LIFESTYLE." },
      { property: "og:title", content: "NEHA LIFESTYLE — Premium Fashion" },
      { property: "og:description", content: "Discover curated Bags, Clutches, and Jewellery at NEHA LIFESTYLE." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const categories = [
  { name: "Bags", to: "/bags" },
  { name: "Clutches", to: "/clutches" },
  { name: "Jewellery", to: "/jewellery" },
];

function Index() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 py-24 text-center">
      <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground">
        Coming Soon
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
        NEHA LIFESTYLE
      </h1>
      <p className="mt-6 max-w-md text-base text-muted-foreground">
        A curated destination for Bags, Clutches, and Jewellery. The collection is being prepared.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        {categories.map((category) => (
          <Link
            key={category.to}
            to={category.to}
            className="inline-flex min-w-[8rem] items-center justify-center rounded-md border border-border bg-background px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            {category.name}
          </Link>
        ))}
      </div>
    </main>
  );
}
