import { createFileRoute } from "@tanstack/react-router";

import { CategoryListingPage } from "@/components/shop/CategoryListingPage";
import { SubcategoryCards } from "@/components/shop/SubcategoryCards";
import { jewellerySubcategories, getProductsBySubcategory } from "@/data/products";
import { pageHead } from "@/lib/seo";

const PRODUCTS = getProductsBySubcategory("pendants");

export const Route = createFileRoute("/jewellery/pendants")({
  head: () =>
    pageHead({
      title: "Pendants | Jewellery | Neha Lifestyle",
      description:
        "Browse pendants at Neha Lifestyle. Filter by price, availability and rating to find the piece that suits you.",
      path: "/jewellery/pendants",
      breadcrumbs: [{ name: "Jewellery", path: "/jewellery" }, { name: "Pendants", path: "/jewellery/pendants" }],
    }),
  component: Page,
});

function Page() {
  return (
    <CategoryListingPage
      eyebrow="Jewellery Category"
      title="Pendants"
      intro="Explore the pendants edit at Neha Lifestyle, refined for everyday wear and occasion dressing alike."
      breadcrumbs={[{ label: "Jewellery", to: "/jewellery" }, { label: "Pendants", to: "/jewellery/pendants" }]}
      products={PRODUCTS}
    >
      <SubcategoryCards
        heading="Other jewellery categories"
        headingId="related-categories"
        items={jewellerySubcategories.filter((s) => s.slug !== "pendants")}
      />
    </CategoryListingPage>
  );
}
