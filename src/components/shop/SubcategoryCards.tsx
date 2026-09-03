import { Link } from "@tanstack/react-router";

import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import type { Subcategory } from "@/data/products";

interface SubcategoryCardsProps {
  items: Subcategory[];
  headingId: string;
  heading: string;
}

/** Editorial category cards — cover-style imagery, one Explore action each. */
export function SubcategoryCards({ items, headingId, heading }: SubcategoryCardsProps) {
  return (
    <section aria-labelledby={headingId} className="mt-16">
      <h2 id={headingId} className="text-[0.6rem] font-light tracking-[0.36em] text-gold-soft uppercase">
        {heading}
      </h2>

      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {items.map((item) => (
          <li key={item.slug}>
            <article className="group flex h-full flex-col border border-gold/12 bg-card/40 transition-all duration-500 ease-out hover:-translate-y-1 hover:border-gold/40">
              <ImagePlaceholder
                label={`${item.name} category image`}
                hint="Category image to be added"
                ratio="landscape"
              />
              <div className="flex flex-1 flex-col gap-3 px-5 py-6 sm:px-6">
                <h3 className="font-display text-xl leading-tight font-light tracking-[0.05em] text-ivory">
                  {item.name}
                </h3>
                <p className="text-[0.8rem] leading-relaxed font-light text-muted-foreground">
                  {item.shortDescription}
                </p>
                <Link
                  to={item.path}
                  aria-label={`Explore ${item.name}`}
                  className="mt-auto inline-flex min-h-11 items-center justify-center border border-gold/40 px-5 pt-3 text-[0.62rem] font-medium tracking-[0.26em] text-gold uppercase transition-colors duration-500 hover:bg-gold hover:text-primary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none"
                  style={{ paddingBottom: "0.75rem" }}
                >
                  Explore
                </Link>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
