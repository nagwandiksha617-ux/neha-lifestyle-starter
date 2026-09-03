import { createFileRoute } from "@tanstack/react-router";

import { CategoryListingPage } from "@/components/shop/CategoryListingPage";
import { SubcategoryCards } from "@/components/shop/SubcategoryCards";
import { jewellerySubcategories, getProductsBySubcategory } from "@/data/products";
import { pageHead } from "@/lib/seo";

const PRODUCTS = getProductsBySubcategory("watches");

export const Route = createFileRoute("/jewellery/watches")({
  head: () =>
    pageHead({
      title: "Watches | Jewellery | Neha Lifestyle",
      description:
        "Browse watches at Neha Lifestyle. Filter by price, availability and rating to find the piece that suits you.",
      path: "/jewellery/watches",
      breadcrumbs: [{ name: "Jewellery", path: "/jewellery" }, { name: "Watches", path: "/jewellery/watches" }],
    }),
  component: Page,
});

function Page() {
  return (
    <CategoryListingPage
      eyebrow="Jewellery Category"
      title="Watches"
      intro="Explore the watches edit at Neha Lifestyle, refined for everyday wear and occasion dressing alike."
      breadcrumbs={[{ label: "Jewellery", to: "/jewellery" }, { label: "Watches", to: "/jewellery/watches" }]}
      products={PRODUCTS}
    >
      <SubcategoryCards
        heading="Other jewellery categories"
        headingId="related-categories"
        items={jewellerySubcategories.filter((s) => s.slug !== "watches")}
      />
    </CategoryListingPage>
  );
}
