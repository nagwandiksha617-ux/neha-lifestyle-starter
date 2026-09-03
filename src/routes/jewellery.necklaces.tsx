import { createFileRoute } from "@tanstack/react-router";

import { CategoryListingPage } from "@/components/shop/CategoryListingPage";
import { SubcategoryCards } from "@/components/shop/SubcategoryCards";
import { jewellerySubcategories, getProductsBySubcategory } from "@/data/products";
import { pageHead } from "@/lib/seo";

const PRODUCTS = getProductsBySubcategory("necklaces");

export const Route = createFileRoute("/jewellery/necklaces")({
  head: () =>
    pageHead({
      title: "Necklaces | Jewellery | Neha Lifestyle",
      description:
        "Browse necklaces at Neha Lifestyle. Filter by price, availability and rating to find the piece that suits you.",
      path: "/jewellery/necklaces",
      breadcrumbs: [{ name: "Jewellery", path: "/jewellery" }, { name: "Necklaces", path: "/jewellery/necklaces" }],
    }),
  component: Page,
});

function Page() {
  return (
    <CategoryListingPage
      eyebrow="Jewellery Category"
      title="Necklaces"
      intro="Explore the necklaces edit at Neha Lifestyle, refined for everyday wear and occasion dressing alike."
      breadcrumbs={[{ label: "Jewellery", to: "/jewellery" }, { label: "Necklaces", to: "/jewellery/necklaces" }]}
      products={PRODUCTS}
    >
      <SubcategoryCards
        heading="Other jewellery categories"
        headingId="related-categories"
        items={jewellerySubcategories.filter((s) => s.slug !== "necklaces")}
      />
    </CategoryListingPage>
  );
}
