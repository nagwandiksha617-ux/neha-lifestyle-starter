import { Link, type LinkProps } from "@tanstack/react-router";

import { Breadcrumbs, type Crumb } from "./Breadcrumbs";
import { SectionHeading } from "./SectionHeading";
import { ProductCardPlaceholder } from "./ProductCardPlaceholder";

export interface CollectionLink {
  name: string;
  to: NonNullable<LinkProps["to"]>;
  /** Short, factual descriptor used for the accessible link name. */
  blurb?: string;
}

interface CollectionPlaceholderPageProps {
  /** The page's single H1. */
  title: string;
  eyebrow?: string;
  description: string;
  breadcrumbs: Crumb[];
  /** Child categories or sibling collections, linked with descriptive anchors. */
  subcategories?: CollectionLink[];
  subcategoriesHeading?: string;
  /** Additional cross-links, e.g. back to a parent collection. */
  relatedLinks?: CollectionLink[];
  relatedHeading?: string;
  /** Number of catalog layout slots to preview. */
  slots?: number;
}

export function CollectionPlaceholderPage({
  title,
  eyebrow = "Collection",
  description,
  breadcrumbs,
  subcategories,
  subcategoriesHeading = "Browse categories",
  relatedLinks,
  relatedHeading = "Continue browsing",
  slots = 4,
}: CollectionPlaceholderPageProps) {
  return (
    <main className="mx-auto w-full max-w-[84rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
      <Breadcrumbs items={breadcrumbs} />

      <SectionHeading
        as="h1"
        eyebrow={eyebrow}
        title={title}
        description={description}
        className="mx-auto"
      />

      {subcategories && subcategories.length > 0 && (
        <section aria-labelledby="subcategories-heading" className="mt-16">
          <h2
            id="subcategories-heading"
            className="text-[0.6rem] font-light tracking-[0.36em] text-gold-soft uppercase"
          >
            {subcategoriesHeading}
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {subcategories.map((item) => (
              <li key={String(item.to)}>
                <Link
                  to={item.to}
                  className="group flex min-h-14 items-center justify-between gap-4 border border-gold/15 bg-card/40 px-5 py-4 transition-colors duration-500 hover:border-gold/40 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
                >
                  <span className="text-[0.72rem] font-light tracking-[0.2em] text-ivory/85 uppercase transition-colors duration-500 group-hover:text-gold">
                    {item.blurb ?? item.name}
                  </span>
                  <span
                    aria-hidden="true"
                    className="h-px w-5 shrink-0 bg-gold/40 transition-all duration-500 group-hover:w-8 group-hover:bg-gold"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section aria-labelledby="catalog-preview-heading" className="mt-16">
        <h2
          id="catalog-preview-heading"
          className="text-[0.6rem] font-light tracking-[0.36em] text-gold-soft uppercase"
        >
          Catalog layout preview
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {Array.from({ length: slots }, (_, i) => (
            <ProductCardPlaceholder key={i} slotLabel={`${title} slot ${i + 1}`} />
          ))}
        </div>
      </section>

      {relatedLinks && relatedLinks.length > 0 && (
        <section aria-labelledby="related-heading" className="mt-16">
          <h2
            id="related-heading"
            className="text-[0.6rem] font-light tracking-[0.36em] text-gold-soft uppercase"
          >
            {relatedHeading}
          </h2>
          <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
            {relatedLinks.map((item) => (
              <li key={String(item.to)}>
                <Link
                  to={item.to}
                  className="inline-flex min-h-11 items-center text-[0.72rem] font-light tracking-[0.18em] text-ivory/75 uppercase transition-colors duration-500 hover:text-gold focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
                >
                  {item.blurb ?? item.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
