import { createFileRoute } from "@tanstack/react-router";

import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { SectionHeading } from "@/components/SectionHeading";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () =>
    pageHead({
      title: "About Neha Lifestyle | Our Story",
      description:
        "Learn about Neha Lifestyle, a premium label bringing together statement bags and timeless jewellery for everyday elegance.",
      path: "/about",
      breadcrumbs: [{ name: "About", path: "/about" }],
    }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-[84rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
      <Breadcrumbs items={[{ label: "About", to: "/about" }]} />

      <SectionHeading
        as="h1"
        eyebrow="Our Story"
        title="About Neha Lifestyle"
        description="Where Elegance Becomes Your Signature."
        className="mx-auto"
      />

      <div className="mt-16 grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <ImagePlaceholder
          label="Brand Image"
          hint="Editorial brand image to be added"
          ratio="landscape"
        />
        <div className="flex flex-col gap-5">
          <h2 className="font-display text-2xl font-light tracking-[0.06em] text-ivory">
            Elevate Your Everyday
          </h2>
          <p className="text-[0.88rem] leading-[1.95] font-light text-muted-foreground">
            Neha Lifestyle begins with a simple idea: the pieces you reach for
            every day should feel considered. Bags with presence, jewellery with
            quiet confidence.
          </p>
          <p className="text-[0.88rem] leading-[1.95] font-light text-muted-foreground">
            The collection is being prepared with that intent. Each edit will
            stay deliberately small, so every piece earns its place.
          </p>
        </div>
      </div>
    </main>
  );
}
