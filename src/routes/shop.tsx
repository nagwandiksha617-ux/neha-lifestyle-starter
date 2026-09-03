import { createFileRoute } from "@tanstack/react-router";

import { CategoryListingPage } from "@/components/shop/CategoryListingPage";
import { SubcategoryCards } from "@/components/shop/SubcategoryCards";
import { allSubcategories, products } from "@/data/products";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/shop")({
  head: () =>
    pageHead({
      title: "Shop All | Neha Lifestyle",
      description:
        "Shop the full Neha Lifestyle edit across bags, clutches and jewellery. Search, filter and sort every category in one place.",
      path: "/shop",
      breadcrumbs: [{ name: "Shop", path: "/shop" }],
    }),
  component: ShopPage,
});

function ShopPage() {
  return (
    <CategoryListingPage
      eyebrow="Shop"
      title="Shop All"
      intro="Every Neha Lifestyle category in one place — bags, clutches and jewellery, filtered exactly how you like."
      breadcrumbs={[{ label: "Shop", to: "/shop" }]}
      products={products}
      showCategoryFilter
    >
      <SubcategoryCards heading="Browse by category" headingId="all-categories" items={allSubcategories} />
    </CategoryListingPage>
  );
}
