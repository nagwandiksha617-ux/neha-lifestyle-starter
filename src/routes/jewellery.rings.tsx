import { createFileRoute } from "@tanstack/react-router";

import { CategoryListingPage } from "@/components/shop/CategoryListingPage";
import { SubcategoryCards } from "@/components/shop/SubcategoryCards";
import { jewellerySubcategories, getProductsBySubcategory } from "@/data/products";
import { pageHead } from "@/lib/seo";

const PRODUCTS = getProductsBySubcategory("rings");

export const Route = createFileRoute("/jewellery/rings")({
  head: () =>
    pageHead({
      title: "Rings | Jewellery | Neha Lifestyle",
      description:
        "Browse rings at Neha Lifestyle. Filter by price, availability and rating to find the piece that suits you.",
      path: "/jewellery/rings",
      breadcrumbs: [{ name: "Jewellery", path: "/jewellery" }, { name: "Rings", path: "/jewellery/rings" }],
    }),
  component: Page,
});

function Page() {
  return (
    <CategoryListingPage
      eyebrow="Jewellery Category"
      title="Rings"
      intro="Explore the rings edit at Neha Lifestyle, refined for everyday wear and occasion dressing alike."
      breadcrumbs={[{ label: "Jewellery", to: "/jewellery" }, { label: "Rings", to: "/jewellery/rings" }]}
      products={PRODUCTS}
    >
      <SubcategoryCards
        heading="Other jewellery categories"
        headingId="related-categories"
        items={jewellerySubcategories.filter((s) => s.slug !== "rings")}
      />
    </CategoryListingPage>
  );
}
