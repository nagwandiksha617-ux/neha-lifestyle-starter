import { createFileRoute } from "@tanstack/react-router";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { SectionHeading } from "@/components/SectionHeading";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — NEHA LIFESTYLE" },
      { name: "description", content: "The story behind NEHA LIFESTYLE: statement bags and timeless jewellery for everyday elegance." },
      { property: "og:title", content: "About — NEHA LIFESTYLE" },
      { property: "og:description", content: "The story behind NEHA LIFESTYLE." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Our Story"
        title="Elevate Your Everyday"
        description="Where Elegance Becomes Your Signature."
        className="mx-auto"
      />
      <div className="mt-12 grid items-center gap-10 lg:grid-cols-2">
        <ImagePlaceholder label="Brand Image" hint="Editorial brand image to be added" ratio="landscape" />
        <div className="flex flex-col gap-4 text-sm leading-relaxed text-muted-foreground">
          <p>
            NEHA LIFESTYLE begins with a simple idea: the pieces you reach for
            every day should feel considered. Bags with presence, jewellery with
            quiet confidence.
          </p>
          <p>
            The collection is being prepared with that intent. Each edit will
            stay deliberately small, so every piece earns its place.
          </p>
        </div>
      </div>
    </main>
  );
}
