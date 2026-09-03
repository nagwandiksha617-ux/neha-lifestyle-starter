import { createFileRoute } from "@tanstack/react-router";

import { CategoryListingPage } from "@/components/shop/CategoryListingPage";
import { SubcategoryCards } from "@/components/shop/SubcategoryCards";
import { bagSubcategories, getProductsByCategory } from "@/data/products";
import { pageHead } from "@/lib/seo";

const PRODUCTS = getProductsByCategory("clutches");

export const Route = createFileRoute("/clutches/")({
  head: () =>
    pageHead({
      title: "Clutches | Neha Lifestyle",
      description:
        "Shop clutches at Neha Lifestyle — compact evening pieces for celebrations, dinners and occasion dressing.",
      path: "/clutches",
      breadcrumbs: [{ name: "Clutches", path: "/clutches" }],
    }),
  component: Page,
});

function Page() {
  return (
    <CategoryListingPage
      eyebrow="Collection"
      title="Clutches"
      intro="Compact, considered evening pieces — the finishing note to occasion dressing."
      breadcrumbs={[{ label: "Clutches", to: "/clutches" }]}
      products={PRODUCTS}
    >
      <SubcategoryCards heading="Explore bags" headingId="bag-categories" items={bagSubcategories} />
    </CategoryListingPage>
  );
}
