import { createFileRoute } from "@tanstack/react-router";

import { CategoryListingPage } from "@/components/shop/CategoryListingPage";
import { SubcategoryCards } from "@/components/shop/SubcategoryCards";
import { bagSubcategories } from "@/data/products";
import { useProductsByCategory } from "@/hooks/useCatalog";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/bags/")({
  head: () =>
    pageHead({
      title: "Bags | Neha Lifestyle",
      description:
        "Explore the Neha Lifestyle bags collection: hand bags, gym bags, travel bags, shoulder bags, party bags and potli bags.",
      path: "/bags",
      breadcrumbs: [{ name: "Bags", path: "/bags" }],
    }),
  component: Page,
});

function Page() {
  const products = useProductsByCategory("bags");

  return (
    <CategoryListingPage
      eyebrow="Collection"
      title="Bags Collection"
      intro="Hand bags, gym bags, travel bags, shoulder bags, party bags and potli bags — shaped for the way you actually carry them."
      breadcrumbs={[{ label: "Bags", to: "/bags" }]}
      products={products}
    >
      <SubcategoryCards heading="Browse bag categories" headingId="bag-categories" items={bagSubcategories} />
    </CategoryListingPage>
  );
}
