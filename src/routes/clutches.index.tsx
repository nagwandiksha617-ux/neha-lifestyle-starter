import { createFileRoute } from "@tanstack/react-router";

import { CategoryListingPage } from "@/components/shop/CategoryListingPage";
import { SubcategoryCards } from "@/components/shop/SubcategoryCards";
import { clutchSubcategories } from "@/data/products";
import { useProductsByCategory } from "@/hooks/useCatalog";
import { pageHead } from "@/lib/seo";

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
  const products = useProductsByCategory("clutches");

  return (
    <CategoryListingPage
      eyebrow="Collection"
      title="Clutches"
      intro="Compact, considered evening pieces — the finishing note to occasion dressing."
      breadcrumbs={[{ label: "Clutches", to: "/clutches" }]}
      products={products}
    >
      <SubcategoryCards
        heading="Explore clutches"
        headingId="clutch-categories"
        items={clutchSubcategories}
      />
    </CategoryListingPage>
  );
}
