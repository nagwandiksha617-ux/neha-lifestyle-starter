import { SectionHeading } from "./SectionHeading";
import { ProductCardPlaceholder } from "./ProductCardPlaceholder";

interface CollectionPlaceholderPageProps {
  title: string;
  description: string;
  categories?: string[];
}

export function CollectionPlaceholderPage({
  title,
  description,
  categories,
}: CollectionPlaceholderPageProps) {
  return (
    <main className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Collection" title={title} description={description} className="mx-auto" />

      {categories && categories.length > 0 && (
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((name) => (
            <li
              key={name}
              className="rounded-sm border border-gold/20 bg-card px-5 py-4 text-sm tracking-[0.14em] text-ivory uppercase"
            >
              {name}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <ProductCardPlaceholder key={i} slotLabel={`${title} slot ${i}`} />
        ))}
      </div>
    </main>
  );
}
