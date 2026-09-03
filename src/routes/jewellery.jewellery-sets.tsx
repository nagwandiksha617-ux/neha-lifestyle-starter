import { createFileRoute } from "@tanstack/react-router";

import { CategoryListingPage } from "@/components/shop/CategoryListingPage";
import { SubcategoryCards } from "@/components/shop/SubcategoryCards";
import { jewellerySubcategories, getProductsBySubcategory } from "@/data/products";
import { pageHead } from "@/lib/seo";

const PRODUCTS = getProductsBySubcategory("jewellery-sets");

export const Route = createFileRoute("/jewellery/jewellery-sets")({
  head: () =>
    pageHead({
      title: "Jewellery Sets | Jewellery | Neha Lifestyle",
      description:
        "Browse jewellery sets at Neha Lifestyle. Filter by price, availability and rating to find the piece that suits you.",
      path: "/jewellery/jewellery-sets",
      breadcrumbs: [{ name: "Jewellery", path: "/jewellery" }, { name: "Jewellery Sets", path: "/jewellery/jewellery-sets" }],
    }),
  component: Page,
});

function Page() {
  return (
    <CategoryListingPage
      eyebrow="Jewellery Category"
      title="Jewellery Sets"
      intro="Explore the jewellery sets edit at Neha Lifestyle, refined for everyday wear and occasion dressing alike."
      breadcrumbs={[{ label: "Jewellery", to: "/jewellery" }, { label: "Jewellery Sets", to: "/jewellery/jewellery-sets" }]}
      products={PRODUCTS}
    >
      <SubcategoryCards
        heading="Other jewellery categories"
        headingId="related-categories"
        items={jewellerySubcategories.filter((s) => s.slug !== "jewellery-sets")}
      />
    </CategoryListingPage>
  );
}
