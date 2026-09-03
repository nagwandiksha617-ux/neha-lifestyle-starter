import type { ReactNode } from "react";

import { Breadcrumbs, type Crumb } from "@/components/Breadcrumbs";
import { SectionHeading } from "@/components/SectionHeading";
import type { Product } from "@/data/products";
import { ProductBrowser } from "./ProductBrowser";

interface CategoryListingPageProps {
  /** The page's single H1. */
  title: string;
  eyebrow?: string;
  intro: string;
  breadcrumbs: Crumb[];
  products: Product[];
  showCategoryFilter?: boolean;
  /** Optional content rendered between the heading and the listing. */
  children?: ReactNode;
}

export function CategoryListingPage({
  title,
  eyebrow = "Collection",
  intro,
  breadcrumbs,
  products,
  showCategoryFilter = false,
  children,
}: CategoryListingPageProps) {
  return (
    <main className="mx-auto w-full max-w-[84rem] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24">
      <Breadcrumbs items={breadcrumbs} />

      <SectionHeading as="h1" eyebrow={eyebrow} title={title} description={intro} className="mx-auto" />

      {children}

      <ProductBrowser
        products={products}
        showCategoryFilter={showCategoryFilter}
        regionLabel={`${title} product listing`}
      />
    </main>
  );
}
